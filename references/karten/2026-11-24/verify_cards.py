#!/usr/bin/env python3
"""Read-only Kartenupdate-QA für petit-joujou.de, Stand 24.11.2026.

Aufruf:
  python3 verify_cards_2026_11_24.py
  python3 verify_cards_2026_11_24.py --base https://www.petit-joujou.de
  python3 verify_cards_2026_11_24.py --check-assets --output /tmp/cards-qa.json

Benötigt vorhandenes Python Playwright und /usr/bin/chromium; installiert nichts.
requests wird ausschließlich bei --check-assets benötigt. Keine Klicks, keine
Reservierungen, keine Formulare, keine PDF-Ansicht oder Textextraktion. Screenshots
entstehen erst beim Ausführen. Stdout enthält genau ein JSON-Dokument; Exitcodes:
0 = alle Prüfungen bestanden, 1 = QA-Fehler, 2 = Abhängigkeit/Laufzeit/Output-Fehler.
Die eingefrorenen Textwerte stammen aus dem Source VOR dem Kartenupdate und werden
zur Laufzeit bewusst NICHT neu aus Projektdateien gelesen. Karten-URLs sind dynamisch.
"""

import argparse
import importlib.util
import json
import re
import sys
from datetime import datetime, timezone
from pathlib import Path
from urllib.parse import urljoin, urlsplit

SCREENSHOT_DIR = Path('/home/ubuntu/screenshots/cards-2026-11-24')
CHROMIUM = Path('/usr/bin/chromium')
CARD_LABELS = [
    'Speisekarte', 'Weinkarte', 'Offene Weine', 'Getränkekarte',
    'Steak-Karte', 'Eis & Süßes',
]
BASELINE = {
    'source_files': [
        '/home/ubuntu/fire400/client/src/pages/Home.tsx',
        '/home/ubuntu/fire400/client/src/pages/Flaschenfreunde.tsx',
        '/home/ubuntu/fire400/client/src/components/SteakAnnouncement.tsx',
    ],
    'events': [
        'Was passiert',
        'Events & Abende',
        'Ausgesuchte Abende mit ausgesuchten Winzern. Tickets sind begrenzt.',
        'Aktuell im Joujou Restaurant: der Adventsmarkt „Markt der achtsamen Dinge“ '
        'am Samstag 21. und Sonntag 22.11., jeweils 12 bis 18 Uhr, und der '
        'Pop-up-Abend Allie’s Kitchen meets Joujou (29.11.). Alle Termine und '
        'Tickets auf joujou.restaurant.',
    ],
    'events_url': 'https://joujou.restaurant',
    'banner': 'Neu: Entrecôte im petit joujou — an allen Weinbartagen.',
    'opening_rows': [
        ['Do & Fr', 'ab 16:00 Uhr'],
        ['Sa & So', 'ab 12:00 Uhr'],
        ['Mo–Mi', 'geschlossen'],
    ],
    'reservation_hours': 'Donnerstag und Freitag ab 16 Uhr · Samstag und Sonntag '
                         'ab 12 Uhr · Montag bis Mittwoch geschlossen',
    'flaschenfreunde_alt': 'Petit Joujou Flaschenfreunde — Flaschenweinkarte für den Herbst',
    'flaschenfreunde_description': 'Unsere Flaschenfreunde: Die besten Weine ihrer '
        'jeweiligen Art, kuratiert vom petit joujou. Preise zum Mitnehmen und vor Ort.',
}

LINKS_JS = r"""nodes => nodes.map(a => {
  const r = a.getBoundingClientRect();
  const style = getComputedStyle(a);
  return {
    text: (a.textContent || '').replace(/\s+/g, ' ').trim(),
    href: a.getAttribute('href'), url: a.href,
    target: a.getAttribute('target'), rel: a.getAttribute('rel') || '',
    visible: r.width > 0 && r.height > 0 && style.visibility !== 'hidden' && style.display !== 'none',
    rect: {x: r.x, y: r.y, width: r.width, height: r.height}
  };
})"""

OVERFLOW_JS = r"""() => {
  const width = document.documentElement.clientWidth;
  const docWidth = document.documentElement.scrollWidth;
  const bodyWidth = document.body ? document.body.scrollWidth : 0;
  const offenders = [...document.querySelectorAll('body *')].map(el => {
    const r = el.getBoundingClientRect();
    return {tag: el.tagName, id: el.id, class: String(el.className || '').slice(0, 160),
            left: r.left, right: r.right, width: r.width};
  }).filter(r => r.width > 0 && (r.left < -1 || r.right > width + 1)).slice(0, 20);
  return {viewport_width: innerWidth, client_width: width,
          document_scroll_width: docWidth, body_scroll_width: bodyWidth,
          overflow_px: Math.max(0, docWidth - width, bodyWidth - width), offenders};
}"""


def normalize(value):
    return re.sub(r'\s+', ' ', value or '').strip()


def add_check(result, name, ok, actual=None, expected=None):
    entry = {'name': name, 'ok': bool(ok)}
    if actual is not None:
        entry['actual'] = actual
    if expected is not None:
        entry['expected'] = expected
    result['checks'].append(entry)
    return entry


def is_pdf(url):
    return bool(url) and urlsplit(url).path.lower().endswith('.pdf')


def is_gastronovi(url):
    host = (urlsplit(url).hostname or '').lower()
    return host == 'gastronovi.com' or host.endswith('.gastronovi.com')


def safe_pdf_link(result, name, link):
    ok = bool(link and is_pdf(link.get('url')) and link.get('target') == '_blank'
              and 'noopener' in link.get('rel', '').lower().split())
    add_check(result, name, ok, link,
              {'href': 'PDF-Pfad', 'target': '_blank', 'rel_token': 'noopener'})


def settle(page):
    # Keine networkidle-Abhängigkeit: Tracker/Streaming können diese blockieren.
    page.wait_for_load_state('domcontentloaded')
    page.evaluate('() => document.fonts.ready.then(() => true)')
    page.wait_for_timeout(700)


def capture(result, name, action):
    path = SCREENSHOT_DIR / name
    try:
        action(str(path))
        result['screenshots'].append(str(path))
        add_check(result, 'screenshot:' + name, True)
    except Exception as exc:
        add_check(result, 'screenshot:' + name, False, str(exc))


def overflow_check(page, result, stage):
    data = page.evaluate(OVERFLOW_JS)
    # Ein Pixel Rundungstoleranz für CSS-Subpixel; im JSON ist der Messwert sichtbar.
    add_check(result, 'no_horizontal_overflow:' + stage,
              data['overflow_px'] <= 1, data, 'maximal 1 CSS-Pixel Rundungstoleranz')


def gastronovi_state(page, requests_seen):
    return {
        'iframe_sources': [src for src in page.locator('iframe').evaluate_all(
            "nodes => nodes.map(el => el.getAttribute('src') || '')")
            if is_gastronovi(urljoin(page.url, src))],
        'loaded_frame_urls': [frame.url for frame in page.frames if is_gastronovi(frame.url)],
        'network_requests': list(requests_seen),
    }


def privacy_check(page, result, requests_seen, stage):
    state = gastronovi_state(page, requests_seen)
    add_check(result, 'no_gastronovi_before_consent:' + stage,
              not any(state.values()), state,
              'Kein Gastronovi-iframe, -Frame oder -Netzwerkrequest ohne Einwilligung')


def only_link(result, name, links):
    add_check(result, 'one_link:' + name, len(links) == 1, len(links), 1)
    return links[0] if len(links) == 1 else None


def home_checks(page, result, width, requests_seen):
    page.locator('.hero-split').wait_for(state='visible')
    settle(page)
    # Diese Prüfung erfolgt vor Scrolls, Screenshots oder jeglicher Interaktion.
    privacy_check(page, result, requests_seen, 'initial')
    overflow_check(page, result, 'initial')
    hero = page.locator('.hero-split')
    links = hero.locator('a[href]').evaluate_all(LINKS_JS)
    cards = [link for link in links if link['text'] in CARD_LABELS]
    result['links']['hero'] = links
    result['links']['cards'] = cards
    labels = [link['text'] for link in cards]
    add_check(result, 'card_order_dom', labels == CARD_LABELS, labels, CARD_LABELS)
    add_check(result, 'all_cards_visible', len(cards) == 6 and all(
        link['visible'] for link in cards),
        [{'text': link['text'], 'visible': link['visible']} for link in cards])
    # Zusätzlich zur DOM-Reihenfolge die tatsächliche Lese-Reihenfolge der Knöpfe.
    # y-Rundung verhindert instabile Reihenfolge durch minimale Subpixel-Unterschiede.
    visual = sorted(cards, key=lambda link: (round(link['rect']['y'] / 4), link['rect']['x']))
    visual_labels = [link['text'] for link in visual]
    add_check(result, 'card_order_visual', visual_labels == CARD_LABELS,
              visual_labels, CARD_LABELS)
    shop_links = [link for link in links if urlsplit(link['url']).path.rstrip('/') == '/shop']
    add_check(result, 'no_shop_hero_link', not shop_links, shop_links, [])
    for label in CARD_LABELS:
        link = only_link(result, label, [item for item in cards if item['text'] == label])
        safe_pdf_link(result, 'pdf_link:' + label, link)

    banner_links = page.locator('.steak-announcement a[href]').evaluate_all(LINKS_JS)
    banner = only_link(result, 'Zur Karte Banner', [link for link in banner_links
                                                   if link['text'] == 'Zur Karte'])
    signature_links = page.locator('#essen a[href]').evaluate_all(LINKS_JS)
    signature = only_link(result, 'Mehr erfahren Signature', [link for link in signature_links
                                                              if link['text'] == 'Mehr erfahren'])
    result['links']['banner'] = banner_links
    result['links']['signature'] = signature_links
    safe_pdf_link(result, 'pdf_link:Zur Karte Banner', banner)
    safe_pdf_link(result, 'pdf_link:Mehr erfahren Signature', signature)
    steak_links = [link for link in cards if link['text'] == 'Steak-Karte']
    steak = steak_links[0] if len(steak_links) == 1 else None
    add_check(result, 'steak_equals_banner', bool(steak and banner and
              steak['url'] == banner['url']),
              {'steak': steak['url'] if steak else None,
               'banner': banner['url'] if banner else None})
    # Alle PDF-Anker der Homepage ebenfalls auf sichere Tab-Attribute prüfen.
    all_links = page.locator('a[href]').evaluate_all(LINKS_JS)
    pdf_links = [link for link in all_links if is_pdf(link['url'])]
    result['links']['all_home_pdf_links'] = pdf_links
    for index, link in enumerate(pdf_links):
        safe_pdf_link(result, 'all_home_pdf_links:' + str(index), link)

    events = page.locator('#events').evaluate(
        "el => [...el.querySelectorAll('p, h2')].map(n => (n.textContent || '').replace(/\\s+/g, ' ').trim())")
    result['texts']['events'] = events
    add_check(result, 'events_text_unchanged', events == BASELINE['events'], events, BASELINE['events'])
    event_links = page.locator('#events a[href]').evaluate_all(LINKS_JS)
    add_check(result, 'events_destination_unchanged',
              len(event_links) == 1 and event_links[0]['url'].rstrip('/') == BASELINE['events_url'],
              event_links, BASELINE['events_url'])
    banner_texts = page.locator('.steak-announcement__text').all_text_contents()
    banner_texts = [normalize(text) for text in banner_texts]
    result['texts']['banner'] = banner_texts
    add_check(result, 'banner_text_unchanged', banner_texts == [BASELINE['banner']],
              banner_texts, [BASELINE['banner']])
    opening = page.locator('footer .footer-grid').evaluate(r"""root => {
      const block = [...root.children].find(el => [...el.querySelectorAll('p')].some(
        p => (p.textContent || '').trim() === 'Öffnungszeiten'));
      if (!block) return null;
      return [...block.children].filter(el => el.tagName === 'DIV').map(el =>
        [...el.querySelectorAll('span')].map(n => (n.textContent || '').replace(/\s+/g, ' ').trim()));
    }""")
    result['texts']['opening_rows'] = opening
    add_check(result, 'opening_hours_unchanged', opening == BASELINE['opening_rows'],
              opening, BASELINE['opening_rows'])
    reservation_paragraphs = page.locator('#reservierung-widget p').all_text_contents()
    hour_candidates = [normalize(text) for text in reservation_paragraphs
                       if 'Donnerstag' in text or 'Montag bis Mittwoch' in text]
    result['texts']['reservation_hours'] = hour_candidates
    add_check(result, 'reservation_hours_unchanged',
              hour_candidates == [BASELINE['reservation_hours']], hour_candidates,
              [BASELINE['reservation_hours']])
    consent = page.get_by_role('button', name='Reservierung laden', exact=True)
    add_check(result, 'reservation_consent_button_present', consent.count() == 1)

    # Nur Hero/Karten aufnehmen; keine PDF öffnen und keine vollständige Seite sichten.
    page.evaluate('() => window.scrollTo(0, 0)')
    capture(result, 'home-hero-' + str(width) + '.png',
            lambda path: hero.screenshot(path=path, animations='disabled'))
    card_anchor = hero.get_by_role('link', name='Speisekarte', exact=True)
    if card_anchor.count() == 1:
        # Der unmittelbare Parent ist laut Baseline der gemeinsame CTA-Container.
        ctas = card_anchor.locator('..')
        capture(result, 'home-karten-' + str(width) + '.png',
                lambda path: ctas.screenshot(path=path, animations='disabled'))
    else:
        add_check(result, 'screenshot:home-karten-' + str(width) + '.png', False,
                  'Speisekarte-Link fehlt oder ist nicht eindeutig')
    overflow_check(page, result, 'after_screenshots')
    privacy_check(page, result, requests_seen, 'after_screenshots')


def flaschenfreunde_checks(page, result, width, requests_seen):
    pdf_locator = page.get_by_role('link', name='Karte als PDF', exact=True)
    pdf_locator.wait_for(state='visible')
    settle(page)
    privacy_check(page, result, requests_seen, 'initial')
    overflow_check(page, result, 'initial')
    links = pdf_locator.evaluate_all(LINKS_JS)
    result['links']['flaschenfreunde_pdf'] = links
    pdf = only_link(result, 'Flaschenfreunde PDF', links)
    safe_pdf_link(result, 'pdf_link:Flaschenfreunde', pdf)
    # Nicht per erwartetem Alt auswählen: Auch ein geänderter Alt wird so berichtet.
    images = page.locator('img').evaluate_all(r"""nodes => nodes.map(img => ({
      src: img.getAttribute('src'), current_src: img.currentSrc, url: img.src,
      alt: img.getAttribute('alt'), complete: img.complete,
      naturalWidth: img.naturalWidth, naturalHeight: img.naturalHeight
    }))""")
    add_check(result, 'one_flaschenfreunde_image', len(images) == 1, len(images), 1)
    if len(images) == 1:
        image = page.locator('img')
        image.scroll_into_view_if_needed()
        try:
            page.wait_for_function(
                '() => {const img = document.querySelector("img"); return img && img.complete;}',
                timeout=30000)
        except Exception as exc:
            add_check(result, 'flaschenfreunde_image_load_wait', False, str(exc))
        info = image.evaluate(r"""img => ({src: img.getAttribute('src'),
          current_src: img.currentSrc, url: img.src, alt: img.getAttribute('alt'),
          complete: img.complete, naturalWidth: img.naturalWidth, naturalHeight: img.naturalHeight})""")
        result['image'] = info
        add_check(result, 'flaschenfreunde_alt_unchanged',
                  info['alt'] == BASELINE['flaschenfreunde_alt'], info['alt'],
                  BASELINE['flaschenfreunde_alt'])
        add_check(result, 'flaschenfreunde_image_loaded',
                  info['complete'] and info['naturalWidth'] > 0, info,
                  'complete=true und naturalWidth>0')
    else:
        result['images'] = images
    descriptions = page.locator('meta[name="description"]').evaluate_all(
        "nodes => nodes.map(n => n.getAttribute('content'))")
    result['texts']['meta_descriptions'] = descriptions
    add_check(result, 'flaschenfreunde_meta_description_unchanged',
              descriptions == [BASELINE['flaschenfreunde_description']], descriptions,
              [BASELINE['flaschenfreunde_description']])
    page.evaluate('() => window.scrollTo(0, 0)')
    # Viewport, nicht die ganze lange Kartenabbildung.
    capture(result, 'flaschenfreunde-' + str(width) + '.png',
            lambda path: page.screenshot(path=path, full_page=False, animations='disabled'))
    overflow_check(page, result, 'after_screenshot')
    privacy_check(page, result, requests_seen, 'after_screenshot')


def run_page(browser, base, width, route, timeout):
    result = {'route': route, 'viewport': {'width': width, 'height': 844 if width == 390 else 900},
              'checks': [], 'links': {}, 'texts': {}, 'screenshots': [],
              'page_errors': [], 'console_errors': [], 'errors': []}
    context = browser.new_context(viewport=result['viewport'], device_scale_factor=1,
                                  locale='de-DE', service_workers='block')
    try:
        page = context.new_page()
        page.set_default_timeout(timeout)
        page.set_default_navigation_timeout(timeout)
        gastronovi_requests = []
        page.on('request', lambda request: gastronovi_requests.append(
            {'url': request.url, 'resource_type': request.resource_type})
            if is_gastronovi(request.url) else None)
        page.on('pageerror', lambda error: result['page_errors'].append(str(error)))
        page.on('console', lambda message: result['console_errors'].append(message.text)
                if message.type == 'error' else None)
        response = page.goto(urljoin(base + '/', route.lstrip('/')), wait_until='domcontentloaded')
        result['final_url'] = page.url
        result['http_status'] = response.status if response else None
        add_check(result, 'page_http_success', bool(response and 200 <= response.status < 300),
                  result['http_status'], 'HTTP 2xx')
        add_check(result, 'expected_route',
                  urlsplit(page.url).path.rstrip('/') == route.rstrip('/'),
                  urlsplit(page.url).path, route)
        if route == '/':
            home_checks(page, result, width, gastronovi_requests)
        else:
            flaschenfreunde_checks(page, result, width, gastronovi_requests)
    except Exception as exc:
        result['errors'].append(str(exc))
        add_check(result, 'page_execution_complete', False, str(exc))
    finally:
        context.close()
    result['ok'] = all(check['ok'] for check in result['checks']) and not result['errors']
    return result


def collect_assets(pages):
    assets = {}
    for page in pages:
        for group, links in page['links'].items():
            for link in links:
                url = link.get('url')
                if is_pdf(url):
                    entry = assets.setdefault(url, {'url': url, 'kind': 'pdf', 'sources': []})
                    source = {'route': page['route'], 'width': page['viewport']['width'],
                              'group': group, 'label': link['text'], 'href': link.get('href')}
                    if source not in entry['sources']:
                        entry['sources'].append(source)
        image = page.get('image')
        if image:
            url = image.get('current_src') or image.get('url')
            if url:
                entry = assets.setdefault(url, {'url': url, 'kind': 'image', 'sources': []})
                entry['sources'].append({'route': page['route'], 'width': page['viewport']['width'],
                                         'src': image.get('src')})
    return list(assets.values())


def asset_checks(assets):
    import requests
    results = []
    with requests.Session() as session:
        session.headers['User-Agent'] = 'petit-joujou-cards-qa/2026-11-24'
        for asset in assets:
            item = dict(asset)
            try:
                if urlsplit(asset['url']).scheme not in ('http', 'https'):
                    raise ValueError('Asset ist keine HTTP(S)-URL')
                # GET stream statt HEAD: SPA-Fallbacks und Fehlerseiten erkennen.
                # Nur den Anfang lesen, kein vollständiger PDF-Download/Review.
                with session.get(asset['url'], stream=True, allow_redirects=True,
                                 timeout=(10, 30)) as response:
                    prefix = b''
                    for chunk in response.iter_content(chunk_size=16):
                        prefix += chunk
                        if len(prefix) >= 16:
                            break
                    content_type = response.headers.get('Content-Type', '').split(';', 1)[0].strip().lower()
                    status_ok = 200 <= response.status_code < 300
                    type_ok = (content_type == 'application/pdf' if asset['kind'] == 'pdf'
                               else content_type.startswith('image/'))
                    magic_ok = prefix.startswith(b'%PDF') if asset['kind'] == 'pdf' else bool(prefix)
                    item.update({'final_url': response.url, 'status': response.status_code,
                                 'content_type': content_type, 'prefix_hex': prefix[:16].hex(),
                                 'status_ok': status_ok, 'content_type_ok': type_ok,
                                 'pdf_magic_ok': magic_ok if asset['kind'] == 'pdf' else None,
                                 'ok': status_ok and type_ok and magic_ok})
            except Exception as exc:
                item.update({'ok': False, 'error': str(exc)})
            results.append(item)
    return results


def main():
    parser = argparse.ArgumentParser(description=__doc__,
                                     formatter_class=argparse.RawDescriptionHelpFormatter)
    parser.add_argument('--base', default='http://localhost:3000', help='Basis-URL, ohne Unterpfad')
    parser.add_argument('--output', type=Path, help='JSON zusätzlich an diesen Pfad schreiben')
    parser.add_argument('--check-assets', action='store_true',
                        help='PDFs/Bild zusätzlich mit requests prüfen (streamed GET, nur Anfangsbytes)')
    parser.add_argument('--timeout', type=int, default=30000, help='Browser-Timeout in Millisekunden')
    args = parser.parse_args()
    base = args.base.rstrip('/')
    report = {'qa': 'cards-2026-11-24', 'timestamp_utc': datetime.now(timezone.utc).isoformat(),
              'base': base, 'baseline': BASELINE, 'card_order_expected': CARD_LABELS,
              'chromium': str(CHROMIUM), 'screenshots_directory': str(SCREENSHOT_DIR),
              'asset_checks_enabled': args.check_assets, 'pages': [], 'assets': [],
              'asset_checks': [], 'errors': [], 'ok': False}
    exit_code = 0
    try:
        parsed = urlsplit(base)
        if parsed.scheme not in ('http', 'https') or not parsed.netloc or parsed.path not in ('', '/') or parsed.query or parsed.fragment:
            raise ValueError('--base muss eine HTTP(S)-Origin ohne Unterpfad, Query oder Fragment sein')
        if args.timeout <= 0:
            raise ValueError('--timeout muss größer als 0 sein')
        if importlib.util.find_spec('playwright') is None:
            raise RuntimeError('Python playwright ist nicht installiert; es wurde nichts installiert')
        if not CHROMIUM.is_file():
            raise RuntimeError('/usr/bin/chromium fehlt')
        if args.check_assets and importlib.util.find_spec('requests') is None:
            raise RuntimeError('requests fehlt für --check-assets; es wurde nichts installiert')
        # Keine Projektdateien verändern; Verzeichnis erst beim tatsächlichen Lauf erstellen.
        SCREENSHOT_DIR.mkdir(parents=True, exist_ok=True)
        from playwright.sync_api import sync_playwright
        with sync_playwright() as playwright:
            browser = playwright.chromium.launch(executable_path=str(CHROMIUM), headless=True,
                                                  args=['--no-sandbox', '--disable-dev-shm-usage'])
            try:
                for width in (390, 1440):
                    for route in ('/', '/flaschenfreunde'):
                        report['pages'].append(run_page(browser, base, width, route, args.timeout))
            finally:
                browser.close()
        report['assets'] = collect_assets(report['pages'])
        if args.check_assets:
            report['asset_checks'] = asset_checks(report['assets'])
        else:
            report['asset_checks_note'] = 'Übersprungen; für Content-Type und %PDF-Prüfung --check-assets verwenden.'
        report['ok'] = (len(report['pages']) == 4 and all(page['ok'] for page in report['pages'])
                        and all(asset['ok'] for asset in report['asset_checks']))
        exit_code = 0 if report['ok'] else 1
    except Exception as exc:
        report['errors'].append(str(exc))
        exit_code = 2
    checks = [check for page in report['pages'] for check in page['checks']]
    report['summary'] = {'pages': len(report['pages']), 'checks': len(checks),
                         'passed': sum(check['ok'] for check in checks),
                         'failed': sum(not check['ok'] for check in checks),
                         'unique_assets': len(report['assets']),
                         'asset_checks_failed': sum(not item['ok'] for item in report['asset_checks'])}
    if args.output:
        try:
            args.output.parent.mkdir(parents=True, exist_ok=True)
            args.output.write_text(json.dumps(report, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
        except Exception as exc:
            report['errors'].append('JSON-Ausgabe konnte nicht geschrieben werden: ' + str(exc))
            report['ok'] = False
            exit_code = 2
    report['exit_code'] = exit_code
    # Nach gesetztem Exitcode auch die optionale Datei mit identischem Inhalt finalisieren.
    text = json.dumps(report, ensure_ascii=False, indent=2) + '\n'
    if args.output and not any(error.startswith('JSON-Ausgabe konnte nicht') for error in report['errors']):
        try:
            args.output.write_text(text, encoding='utf-8')
        except Exception as exc:
            report['errors'].append('JSON-Ausgabe konnte nicht finalisiert werden: ' + str(exc))
            report['ok'] = False
            report['exit_code'] = exit_code = 2
            text = json.dumps(report, ensure_ascii=False, indent=2) + '\n'
    sys.stdout.write(text)
    return exit_code


if __name__ == '__main__':
    raise SystemExit(main())
