# Zwei Korrekturen — 25.11.2026

## Steak-Karte

Quelle: `originale/petit-joujou-steakkarte-do-so-mit-wein-2026-11-24-v2.pdf` (aktueller, zweitseitiger Stand vom 24.11.).

Neue Datei: `petit-joujou-steakkarte-do-so-2026-11-25.pdf`.

Dauerhafter Speicherpfad für **Steak-Karte** im Hero und **Zur Karte** im Banner:

`/manus-storage/petit-joujou-steakkarte-do-so-2026-11-25_a6f5afea.pdf`

Entfernt wurden ausschließlich Seite 2 „Wein nach Lust“ und auf Seite 1 der eigenständige Textblock „Weinkarte mit passenden Weinen auf der nächsten Seite.“. Die verbleibenden PDF-Inhaltsoperationen, der übrige extrahierte Text und das Seitenformat sind identisch. Ein Bildvergleich bei 150 dpi zeigt ausschließlich das Entfernen dieser einen Textzeile; keine anderen Pixel wurden geändert. Es wurde nichts neu gesetzt und kein Inhalt verschoben.

`correct_steak_card.py` dokumentiert die reproduzierbare Korrektur; `pdf-korrektur.json` enthält den technischen Nachweis. SHA-256 der neuen PDF: `b04e2789e159db602016cea59703fc8c499c53513a4cd7f79b18c74c0c9c0670`.

## Events

Neuer Wortlaut mit unverändertem End-Link auf https://joujou.restaurant:

> Aktuell im Joujou Restaurant: Pilates & Brunch am 28.11., der Yoga-Brunch an jedem ersten Samstag im Monat, die Christmas Kitchenparty am 21.12. und das Weihnachtsmenü an beiden Feiertagen. Alle Termine und Tickets auf joujou.restaurant

Alle übrigen Karten, Flaschenfreunde-PDF und Vorschau, Texte, Gestaltung, Öffnungszeiten, Reservierung, Newsletter und Rechtstexte bleiben unverändert.

## Abnahme und Veröffentlichung

Preview-Prüfung und exakter Zielpfadvergleich werden in `abnahme.json` dokumentiert. Der tatsächliche öffentliche Stand wird nach dem Checkpoint separat geprüft. Ein Checkpoint oder GitHub-Abgleich allein bestätigt keine Veröffentlichung.
