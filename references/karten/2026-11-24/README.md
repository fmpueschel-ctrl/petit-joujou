# Weinbar-Karten — Stand 24.11.2026

Die neuen freigegebenen Karten wurden ohne Inhalts- oder Designbearbeitung übernommen. Frank reichte die große Flaschenweinkarte nach und bestätigte „Wein nach Lust“ als Weinseite der Steak-Karte. Alle gelieferten Originale liegen unter `originale/`; die beiden Broschüren-Druckfassungen der großen Karte sind nur archiviert und werden nicht online verlinkt.

| Original | Verwendung | Manus-Storage-Pfad |
| --- | --- | --- |
| Petit_Joujou_Kleine_Karte_NOV26.pdf | Speisekarte | `/manus-storage/petit-joujou-kleine-karte-2026-11-24_ca5a0fe6.pdf` |
| Joujou_Flaschenweinkarte_A4.pdf | Weinkarte, 15 Seiten in normaler Lesereihenfolge | `/manus-storage/petit-joujou-flaschenweinkarte-2026-11-24_23db203e.pdf` |
| Petit_Joujou_Aus_dem_Wingert_A4.pdf | Offene Weine | `/manus-storage/petit-joujou-offene-weine-aus-dem-wingert-2026-11-24_f23b2314.pdf` |
| Petit_Joujou_Getraenkekarte_A4.pdf | Getränkekarte | `/manus-storage/petit-joujou-getraenkekarte-2026-11-24_83eef494.pdf` |
| Petit_Joujou_Steakkarte_Do-So_NOV26.pdf + Petit_Joujou_Wein_nach_Lust_Leistadt_A4.pdf | Steak-Karte und Banner Zur Karte, 2 Seiten | `/manus-storage/petit-joujou-steakkarte-do-so-mit-wein-2026-11-24_68f59eb8.pdf` |
| Petit_Joujou_Premium_Entrecote_NOV26.pdf | Signature – Mehr erfahren | `/manus-storage/petit-joujou-premium-entrecote-2026-11-24_07ffeb34.pdf` |
| Petit_Joujou_Eiskarte_A4.pdf | Neuer Hero-Knopf Eis & Süßes direkt nach Steak-Karte | `/manus-storage/petit-joujou-eis-und-suesses-2026-11-24_680b0097.pdf` |
| Flaschenfreunde_Herbst_Petit_Joujou_Leistadt_A4.pdf | /flaschenfreunde – PDF | `/manus-storage/petit-joujou-flaschenfreunde-herbst-2026-11-24_6415c3a1.pdf` |

## PDF-Treue und Vorschau

Sieben Einzeldokumente sind byte-gleich mit den gelieferten Quellen. Die Steak-PDF verbindet die beiden gelieferten einseitigen Originale unverändert: zuerst Steak-Karte, danach Wein nach Lust. Beide Seiten wurden bei 100 dpi gerendert und als pixelgleich mit ihren jeweiligen Quellen überprüft. Reproduzierbare Zusammenführung: `build_steakkarte.py` (benötigt Python, pypdf, Pillow und pdftoppm).

SHA-256 der zweitseitigen Steak-PDF: `813c627e6cd8fe6eeb77f3cde0254e6c6143b0143f865286a4fc6aad10a7f952`.

Die neue Vorschau wurde ausschließlich aus Seite 1 der Flaschenfreunde-PDF erzeugt, vollständig ohne Beschnitt: 1600 × 2265 px, WebP, 179468 Bytes.

`/manus-storage/petit-joujou-flaschenfreunde-herbst-2026-11-24-vorschau_926d2ac7.webp`

## Unverändert

Bestehende Knopf-Beschriftungen, Banner, Öffnungszeiten, Termin-Satz, Farben, Reservierung/Gastronovi, Newsletter und Rechtstexte. Der am 30.10. entfernte Hero-Knopf Shop | The One bleibt ausgeblendet. Alt-Text und Beschreibung von /flaschenfreunde sind unverändert.

Sämtliche ersetzten alten PDFs und die alte Flaschenfreunde-Vorschau werden im Produktivcode nicht mehr referenziert. Frühere Fassungen bleiben ausschließlich als nachvollziehbares Archiv erhalten.

Ein Checkpoint und GitHub-Backup sind keine Veröffentlichung. Die öffentliche Domain muss nach dem Veröffentlichen separat auf die acht PDF-Ziele und die neue Vorschau geprüft werden.

## Live-Abnahme — 24.11.2026, 13:08 Uhr

Nach der Veröffentlichungsbestätigung wurde `https://www.petit-joujou.de` frisch geprüft. Homepage und Flaschenfreunde-Seite haben bei 390 und 1440 Pixeln insgesamt 112 Browserprüfungen bestanden. Alle zehn angeforderten Link- und Bildziele stimmen exakt mit `links.json` überein. Alle neun eindeutigen Speicherziele liefern HTTP 200 und den passenden PDF-/Bild-Inhaltstyp. Die zuvor separat geprüfte Speicherauslieferung war bytegleich mit den acht finalen PDFs und der Vorschau.

Die neue Schaltfläche Eis & Süßes ist live direkt nach Steak-Karte sichtbar; kein horizontaler Überlauf. Shop | The One bleibt im Hero ausgeblendet. Events, Banner, Öffnungszeiten, sichere PDF-Tabs und das Gastronovi-Zwei-Klick-Prinzip wurden auch live bestätigt.

Der vollständige Kartenstand und die Originale wurden auf GitHub gesichert; Funktionscheckpoint `cbadfc2c3340b9c63b37e9859eb7e48612600108` und Dokumentationscheckpoint `dcf9e7a121adfa3763e1e055a17472a527cb0817` wurden jeweils unabhängig identisch mit GitHub main bestätigt. Dieser Live-Nachweis wird anschließend ebenfalls gesichert.
