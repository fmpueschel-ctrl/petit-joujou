
## Barrierefreiheit, Karten und Reservierung — 19.10.2026
- [x] Kalt-Tage-Hinweis als ruhige Zeile direkt unter der Hero-Einleitung ergänzt; Hinweis in der Scheune bleibt unverändert bestehen.
- [x] Neue Seite `/barrierefreiheit`: aktuelle Restaurantvorlage mit sechs Abschnitten übernommen; ausschließlich die drei freigegebenen Weinbar-Anpassungen vorgenommen, MLBF-Pflichtangabe vollständig erhalten.
- [x] `/barrierefreiheit` aus Fuß, Impressum, Datenschutz und AGB verlinkt sowie in die Sitemap aufgenommen; E-Mail-Alternativweg unter Reservierung und Fuß-Hinweis ergänzt.
- [x] Kartenleiste: bisherige Getränkekarte korrekt als `GETRÄNKEKARTE` bezeichnet; 15-seitige Original-PDF `Joujou_Flaschenweinkarte.pdf` unverändert in manus-storage gehostet und als `WEINKARTE` vor der Getränkekarte eingesetzt.
- [x] Restaurant Guru, Tripadvisor und Google-Bewertungen als kleine, zugängliche Bewertungs-Signets im Fuß ergänzt; kein Facebook und keine Partnerlogo-Kombi eingebunden.

## Steak-Signature-Flyer — 19.10.2026
- [x] Bisherigen zweitseitigen Flyer „Das wahrscheinlich beste Steak der Pfalz“ als einseitigen DIN-A4-Einleger neu gesetzt.
- [x] Sämtliche Preis- und Mengenangaben aus der neuen Fassung entfernt; Rindillustration, Herkunft, #tierglück und Zubereitungshinweis beibehalten.
- [x] Preisfreie PDF in `manus-storage` hochgeladen und den Link „Mehr erfahren“ in der Steak-Signature darauf umgestellt.

## Kartenstand November 2026 — umgesetzt am 30.10.2026

- **Weinkarte:** neue Flaschenweinkarte im Joujou-Design (Novemberfassung) hinter dem Hero-Knopf.
- **Offene Weine:** neuer Hero-Knopf direkt neben Weinkarte; verlinkt auf „Aus dem Wingert“.
- **Getränkekarte:** Novemberfassung verlinkt; enthält die nicht-weinbezogenen Getränke einschließlich Schorle.
- **Steak-Karte:** Hero-Knopf und Banner „Zur Karte“ führen auf die einseitige Karte für alle Weinbartage. Die neue Käseauswahl ist übernommen; Weinseite, Tageskopf und Verweis auf eine Folgeseite sind entfernt.
- **Flaschenfreunde:** Herbstfassung auf `/flaschenfreunde`, einschließlich Seite-1-Vorschau, Herbst-Alt-Text und neuer Meta-Beschreibung für Preise zum Mitnehmen und vor Ort.
- **Unverändert:** Kleine Karte / Speisekarte sowie Premium-Entrecôte-Einleger; Restaurantkarten aus dem Upload wurden nicht übernommen.

Originale und Zuordnungen: `references/karten/2026-10-30/README.md`.

## Steak-Karte ohne Weinseite — umgesetzt am 30.10.2026

- Die gelieferte Steak-Karte mit geänderter Käseauswahl ersetzt die vorherige zweitseitige Steak- und Weinseiten-PDF.
- Der Hero-Knopf **Steak-Karte** und der Bannerlink **Zur Karte** verwenden dieselbe einseitige Karte für alle Weinbartage.

## Kartenupdate und Eis & Süßes — 24.11.2026

- [x] Ausgangsstand 80146250 unabhängig mit GitHub main abgeglichen: identisch.
- [x] Alle acht neuen Original-PDFs unter `references/karten/2026-11-24/originale` archiviert.
- [x] Sechs eindeutig zugeordnete PDFs unverändert gehostet und verlinkt: Speisekarte, Offene Weine, Getränkekarte, Premium-Entrecôte, Eis & Süßes, Flaschenfreunde.
- [x] Neue Seite-1-Vorschau für Flaschenfreunde erzeugt; Alt-Text und Beschreibung unverändert.
- [x] Eis & Süßes direkt nach Steak-Karte ergänzt; Shop | The One bleibt ausgeblendet.
- [x] Frank hat die große Flaschenweinkarte nachgereicht und Wein nach Lust als Steak-Weinseite bestätigt. Normale A4-Flaschenweinkarte (15 Seiten) bytegleich übernommen; Broschüren nur archiviert. Steak-Seite und Weinseite unverändert zusammengeführt, beide Seiten pixelgleich geprüft.
- [x] Weinkarte, Steak-Karte und Banner Zur Karte auf die neuen gemeinsamen Ziele umgestellt.
- [x] Abnahme: 66 Tests bestanden, 1 externer Test bewusst übersprungen; TypeScript, Build, git diff --check erfolgreich. 112 Browserprüfungen bei 390/1440px bestanden; alle zehn Zielpfade exakt bestätigt. Alle acht PDFs und die Vorschau über die öffentliche Speicherroute bytegleich ausgeliefert.
- [x] Vollständiger Funktions-Checkpoint cbadfc2c3340b9c63b37e9859eb7e48612600108 gesichert. GitHub main unabhängig gefetcht und auf exakt dieselbe SHA geprüft; Arbeitsbaum zum Zeitpunkt dieses Abgleichs sauber.
- [ ] Veröffentlichen und alle zehn Ziele auf der öffentlichen Domain prüfen.

Live-Stichprobe am 24.11.2026 um 13:06 Uhr: Die öffentliche Seite zeigt noch die bisherigen PDF-/Bildziele; Eis & Süßes fehlt dort noch. Es gibt in dieser Sitzung kein direktes Publish-Werkzeug. Nächster Schritt: Frank veröffentlicht den neuen Checkpoint über „Veröffentlichen“, danach werden die zehn öffentlichen Ziele separat geprüft. Keine Warteschleife und keine Gleichsetzung von Checkpoint/GitHub mit Veröffentlichung.

Zuordnung und Speicherpfade: `references/karten/2026-11-24/README.md`.
