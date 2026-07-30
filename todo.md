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
- [x] Nature One: Flaschenbild hochgeladen
- [x] Weinkarte-Seitenname: bleibt "Flaschenfreunde" (entschieden)

## Claude-Audit v3 — Briefing Manus (26.07.2026)
- [x] M1: Warenkorb-Button + Zähler auf Produktdetailseiten (CartNavButton)
- [x] M2: Versandhinweis bei Tickets: "kein Versand — Eintritt vor Ort" statt "zzgl. Versandkosten"
- [x] M13: Sticky Navigation Startseite (war bereits vorhanden: fixed top-0, Zeile 47)
- [x] M3–M11: Bereits in vorheriger Session umgesetzt (Weinkarte, Gastronovi, Datenschutz, Newsletter, Sitemap, www-Redirect, Mobile, Skip-Link)
- [x] M12: Produktbilder hochladen — erledigt durch einzelne Uploads (Grauburgunder, Pink Otto, Spätburgunder Dorf, Schorle-Riesling 6er, Sommerglück, Tavola Beats)
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
- [x] Sommerglück-Paket: Zusammensetzung ändern (Pink Otto + Fleur de Rosé 2025 + Zeter Sauvignon Blanc)
- [x] Sommerglück-Paket: Gruppenbild hochladen
- [x] Sommerabend-Paket: Gruppenbild hochladen
- [x] Nature One: Neues Sandstein-Foto hochladen (bessere Qualität)
- [x] Neues Produkt: Sauvignon Blanc Croix d'Or 2024 (Oliver Zeter) angelegt, 13€
- [x] Sommerglück-Paket: Fumé → Croix d'Or 2024 (Beschreibung + Gruppenbild aktualisiert)
- [x] Nature One: Preis von 20€ auf 24€ angepasst
- [x] Pink Otto: Preis von 25€ auf 21€ korrigiert
- [x] Sauvignon Blanc: "Croix d'Or" aus Produktname entfernt
- [x] Sommerglück: Beschreibung korrigiert (Joujou/Kraus, kein Croix d'Or, kein 10% Rabatt), Preis 96€
- [x] Sommerabend: 10% Rabatt entfernt, Preis 140€
- [x] Riesling Total: 10% Rabatt entfernt, Preis 224€
- [x] Shop: Sortierung aus "Weine"-Kollektion (weiß → rosé → rot → pakete)
- [x] Mobile Nav: Logo-Text nowrap + clamp, Buttons auf <480px ausgeblendet
- [x] Orange Icon: Position korrigiert (top:70px, right:15px, unterhalb Nav)
- [x] Feral: "Hat jemand alkoholfrei gesagt?" als Beschreibungs-Einleitung
- [x] Orange Icon: Mobile-Fix (CSS-Klasse .weinbar-icon, auf Mobile kleiner + oben rechts ohne Text-Überlappung)
- [x] Shop: Dual-Query-Fix (alle Produkte + Weine-Kollektion laden, mergen für korrekte Sortierung + Events/Joujou sichtbar)

### Ausstehend (Nutzer-Input nötig)
- [x] Spätburgunder Dorf N/V (Durst): Flaschenfoto hochgeladen
- [x] Riesling Total 6er Paket: auf Draft gesetzt (nicht aktiv im Shop, aber erhalten)
- [x] Weinkarte-Seitenname: bleibt "Flaschenfreunde"
- [x] Sauvignon Blanc fumé (Zeter): komplett aus Shop entfernen (Produkt unpublishen + aus Weine-Kollektion entfernen)
- [x] Sauvignon Blanc 2024 (Zeter): archivieren + aus Weine-Kollektion entfernen
- [x] Grauburgunder 2024 (Oliver Zeter): neues Produkt anlegen, 13€, Foto hochladen
- [x] Sommerglück-Paket: Beschreibung aktualisieren (Grauburgunder statt Sauvignon Blanc) + neues Gruppenbild
- [x] Spätburgunder Dorf N/V (Durst): Flaschenfoto hochladen
- [x] Schorle-Riesling 6er Paket (Egon Schmitt): Gruppenfoto hochladen (altes webp-Bild ersetzt)
- [x] Isegrim Blanc de Noir: Preis korrigiert 22€ → 12€
- [x] Sommerabend-Paket: Preis korrigiert 140€ → 120€ (Chardonnay 18 + Isegrim 12 + Cabernet 30 = 60×2)
- [x] Riesling Total: falsch hochgeladenes Schmitt-Foto wieder entfernt (Paket bleibt ohne Bild)
- [x] Flaschenfreunde-Karte: Sauvignon Blanc fumé → Grauburgunder 2024 (13€) ersetzt
- [x] Flaschenfreunde-Karte: Isegrim Blanc de Noir Preis 22€ → 12€ korrigiert
- [x] Neue Flaschenfreunde PDF hochgeladen (PetitJoujou_Flaschenfreunde_A4_FINAL-2)
- [x] Fleur de Rosé: Jahrgang 2025 → 2024 korrigiert (Shop + Flaschenfreunde)
- [x] Rosé Sekt brut nature (Eppelmann): auf Draft gesetzt, aus Flaschenfreunde entfernt
- [x] Pink Otto Rosé Crémant: als Einzelprodukt angelegt (21€), in Weine-Kollektion (Rosé-Sektion) eingefügt
- [x] Pink Otto: Flaschenfoto hochgeladen
- [x] Flaschenfreunde-Seite: alle Weingut-Namen an finale PDF angepasst (Reibold, Revelette/Provence, Domaine l'enclos, Wasem Doppelstück, etc.)
- [x] Flaschenfreunde PDF FINAL-2 erneut hochgeladen (identischer Dateiname, neuer Storage-Pfad)
- [x] Pink Otto: Einzelfoto als Shopify-Produktbild hochgeladen
- [x] Tavola Beats: neues Bild (Bella Italia Flyer) auf Homepage, im Shop-Produkt und Events-Sektion eingebaut
- [x] Events-Sektion: Link zum Shop (/shop?tab=events) hinzugefügt
- [x] Bug: Tavola Beats "Ticket kaufen" Link auf Homepage führt zu "Produkt nicht gefunden" — Fix: ProductDetail fetcht jetzt alle Produkte, nicht nur Weine-Kollektion
- [x] Bug: Tavola Beats Bild zu klein — Fix: Event-Tickets bekommen 4:5 Aspect Ratio mit object-fit:cover statt 1:1 mit contain
- [x] Shop-Bilder Optimierung: Shopify CDN width-Parameter (Kacheln: 800px + srcset 400/600/800, Detail: 1200px + srcset 600/900/1200, Cart: 128px)
- [x] Shop: Fette Rebsorte/Typ-Kategorie über Weinnamen in Produktkacheln (Weißburgunder, Chardonnay, Chablis, Weißweincuvée, Riesling Kabinett, Riesling GG, Riesling Natur, Grauburgunder, Weißwein alkoholfrei, Blanc de Noir, Rosé, Rosé Crémant, Cabernet Sauvignon, Spätburgunder)
- [x] Flaschenfreunde: PDF-Bild im Speisekarten-Design eingebunden (rosa Streifen); Mengenrabatt bleibt in PDF (Nutzer-Entscheidung: gilt für Vor-Ort-Gäste)
- [x] Bug: Weinkategorie-Labels (Rosé, Spätburgunder, Riesling Natur, Blanc de Noir) fehlten im Shop — Fix: WINE_CATEGORY-Mapping korrigiert (Shopify Storefront API nutzt andere Handles: ae statt ä, anderer Vintage-Suffix, kein N/V-Suffix)
- [x] Shop: Claim "es kann nur eines geben" unter "The One" als Untertitel ergänzen
- [ ] Nature One Riesling: Preis +10€ (von 24€ auf 34€)
- [ ] Schorle-Riesling 6er: Preis +1€ (von 42€ auf 43€)

### Memo (tbd — später)
- [ ] DHL-Account anbinden (eigener Versand-Account)
- [ ] Versandverpackung: Nur 6er-Kartons für alle Weine?
- [ ] Positionierung: „Wir sind nicht billig. Auch keine Winzer. Wir sind Kuratoren."
- [ ] Nature One Riesling: Preis +10€ (von 24€ auf 34€)
- [ ] Schorle-Riesling 6er: Preis +1€ (von 42€ auf 43€)
- [ ] Sommerabend-Paket: Preis +10€ (von 120€ auf 130€) wegen Nature One Preiserhöhung

### Memo (tbd — später)
- [ ] DHL-Account anbinden (eigener Versand-Account)
- [ ] Versandverpackung: Nur 6er-Kartons für alle Weine?
- [ ] Positionierung: „Wir sind nicht billig. Auch keine Winzer. Wir sind Kuratoren."
- [x] Nature One Riesling: Preis +10€ (von 24€ auf 34€)
- [x] Schorle-Riesling 6er: Preis +6€ (von 42€ auf 48€, je Flasche +1€)
- [x] Sommerabend-Paket: Preis +10€ (von 120€ auf 130€) wegen Nature One Preiserhöhung

### Memo (tbd — später)
- [ ] DHL-Account anbinden (eigener Versand-Account)
- [ ] Versandverpackung: Nur 6er-Kartons für alle Weine?
- [ ] Positionierung: „Wir sind nicht billig. Auch keine Winzer. Wir sind Kuratoren."
