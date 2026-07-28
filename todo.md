# Project TODO

## Abgeschlossen (Archiv)
- [x] SEO: Meta-Tags, Schema.org, Sitemap, robots.txt
- [x] Domain petit-joujou.de eingerichtet
- [x] Split-Layout Redesign aller Sections
- [x] Hero-Section, Galerie, Farbschema Pastellgrün
- [x] Shopify Integration (Commerce Router, Cart, Checkout)
- [x] Shop: Produktdarstellung, Preisformat, Compliance
- [x] Rechtsseiten: Datenschutz, AGB, Widerruf, Versand, Impressum
- [x] Spreadconnect T-Shirt (Varianten-Picker, Bildwechsel)
- [x] Flaschenfreunde: 14 Weine + 3 Pakete in Shopify
- [x] Flaschenfreunde: Weinkarte-Seite mit Korkgeld
- [x] Shop: Kategorie-Tabs (Wein/Events/Joujou)
- [x] Shop: URL-Parameter Deep-Linking
- [x] Homepage: Shop-Teaser (TheOneSection)
- [x] aggregateRating entfernt
- [x] Metro GastroPreis präzisiert
- [x] Canonical/Title/Description pro Route (usePageMeta)
- [x] Product JSON-LD im Shop
- [x] 404-Seite auf Deutsch
- [x] Abgelaufene Event-Termine entfernt
- [x] Sitemap auf 7 Einträge erweitert

## Claude-Audit v2 — 26.07.2026

### TEIL 1 — Blockierend (vor Newsletter/Kampagne 08.08.)
- [x] 1.1 Warenkorb: "Warenkorb"-Label neben Zähler + Toast-Feedback beim Hinzufügen
- [x] 1.2 Zeilenumbrüche in Produktbeschreibungen (white-space: pre-line)
- [x] 1.3 Filter "Alle" als Standard im Shop (statt nur Wein)
- [x] 1.4 Shop-Einleitungstext neu (3 Absätze, Frank-freigegeben)
- [x] 1.4b Startseite: "nur bio" → "bio" (Wort "nur" streichen, 2 Stellen)
- [x] 1.5 Weinhinweise (Sulfite, Jugendschutz) nur bei Wein-Produkten anzeigen

### TEIL 2 — Startseite
- [x] 2.1 Adresse: Hauptstr. 34, 67098 Bad Dürkheim + Google Maps Link
- [x] 2.2 Weinkarte-Button → /flaschenfreunde + Einordnungssatz
- [x] 2.3 Sticky-Navigation auf Startseite (bereits vorhanden)
- [x] 2.4 Telefonnummer: +49 6322 7906693 (einheitlich)

### TEIL 3 — Recht und Datenschutz
- [x] 3.1 Gastronovi-Iframe: Zwei-Klick-Lösung
- [x] 3.2 Datenschutzhinweis unter Anfrageformular
- [x] 3.3 Newsletter: Double-Opt-in, DB, Footer-Formular, Admin-Export
- [x] 3.4 Widerspruchshinweis bei Formular + Newsletter

### TEIL 4 — Auffindbarkeit und Technik
- [x] 4.1 Sitemap: /flaschenfreunde + Produktseiten ergänzt
- [x] 4.2 non-www → www: 301-Redirect (server-side)
- [x] 4.3 Mobile: Fließtext 15px min, Klickziele 40px min
- [x] 4.4 Skip-Link "Zum Inhalt springen"

### Ausstehend (Frank-Input nötig)
- [ ] Nature One: Echtes Flaschenbild (Nutzer liefert)
- [ ] Weinkarte-Seitenname: Alternative zu "Flaschenfreunde" (offen)

## Claude-Audit v3 — Briefing Manus (26.07.2026)
- [x] M1: Warenkorb-Button + Zähler auf Produktdetailseiten (CartNavButton)
- [x] M2: Versandhinweis bei Tickets: "kein Versand — Eintritt vor Ort" statt "zzgl. Versandkosten"
- [x] M13: Sticky Navigation Startseite (war bereits vorhanden: fixed top-0, Zeile 47)
- [x] M3–M11: Bereits in vorheriger Session umgesetzt (Weinkarte, Gastronovi, Datenschutz, Newsletter, Sitemap, www-Redirect, Mobile, Skip-Link)
- [ ] M12: Produktbilder hochladen (wird separat erledigt, keine Code-Änderung nötig)
- [x] Beef Crudo Top-Down-Foto in Essen-Sektion (ersetzt Käsebild)
- [x] Bug: Warenkorb-Button auf Produktdetailseite navigierte zu /shop/warenkorb (404) — jetzt öffnet er den Cart-Drawer
- [x] Versandkosten aktualisieren: 5,99€ Standard, 9,99€ Express, kein Gratisversand, Spreadconnect-Hinweis beim T-Shirt
- [x] Spreadconnect/Spreadshirt als Auftragsverarbeiter in Datenschutzerklärung
- [x] Sticky Navigation auf Startseite (Nav-Komponente war definiert aber nicht gerendert)
- [x] Sitemap: dynamisch aus echten Shopify-Handles generieren (server-route)
- [x] Nature One Sandstein-Foto in Shopify hochladen
- [x] Grundpreis aus Shopify-API (unitPriceMeasurement) statt hardcoded Berechnung (PAngV-konform)
- [x] Hardcoded Schorle-Daten (Alkoholgehalt, Weingut, Inhalt) von Produktdetailseite entfernt — Infos kommen jetzt aus Shopify-Beschreibung
- [x] Shop-Einleitung ergänzt: "und beim Verschenken das Grübeln"
- [x] Produktbilder korrigiert: Feral, Durst, Messmer Schlossgarten (Tablett-Fotos ersetzt durch Winzer-Website-Bilder)
- [x] "Kein Formular-Friedhof" Text entfernt
- [x] Weinflaschen-Icon: overflow auf Mobile gefixt (right: 0px statt -20px)
- [x] Mobile: padding-top 60px auf Hero für fixed Nav
