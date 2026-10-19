import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const root = resolve(import.meta.dirname, "..");
const home = readFileSync(resolve(root, "client/src/pages/Home.tsx"), "utf8");
const css = readFileSync(resolve(root, "client/src/index.css"), "utf8");
const section = home.slice(home.indexOf('<div id="reservierung-widget">'), home.indexOf('{/* RIGHT: Euer Abend'));
const widgetUrl = "https://services.gastronovi.com/restaurants/68135/reservation/widget/entry/reservation?area=Joujou+Weinbar";
const text = (html: string) => html.replace(/<[^>]+>/g, "").replace(/&amp;/g, "&").replace(/\s+/g, " ").trim();

const steps = [
  'Bereich wählen. „Joujou Weinbar" für euren Tisch hier. „Joujou Restaurant" (Brunch & Dinner, joujou.restaurant) und „Yoga & Brunch" sind die anderen Bereiche im selben Fenster.',
  'Personenzahl, Tag und Uhrzeit wählen. Ist eure Wunschzeit belegt, schlägt euch das Fenster andere Zeiten und den nächsten freien Tag vor.',
  'Namen und Kontakt eintragen. Besonderheiten wie Unverträglichkeiten oder Hund gehört ins Feld „Anmerkung" — dann wissen wir es vorher.',
  'Bestätigung abwarten. Ihr bekommt sie sofort per E-Mail, mit Termin zum Eintragen in den Kalender. Kommt nichts an, schaut in den Spam-Ordner.',
];
const hints = [
  'Drinnen oder draußen: Wir setzen euch nach Wetter und Besetzung, feste Zusagen gibt es nicht. Schreibt uns, was euch lieber wäre.',
  'Veranstaltungen: Besondere Abende finden derzeit im Joujou Restaurant statt — Termine und Tickets auf joujou.restaurant.',
  'Brot und Kuchen für daheim: Backwaren aus unserer Bio-Backmanufaktur bestellt ihr am besten vorab zur Abholung im Onlineshop der Pure Bakery.',
  'Große Runden und Feiern: Ab acht Personen oder für einen eigenen Abend schreibt uns lieber direkt an hallo@joujou-pfalz.de.',
];

describe("Final shared Joujou reservation explanation", () => {
  it("shows the quiet cold-days note after the heading and before the steps", () => {
    const prefix = section.slice(0, section.indexOf('<ol className="schritte font-body">'));
    expect(prefix).toContain("Tisch reservieren");
    expect(prefix).toContain("An kühleren Tagen findet die Weinbar im Restaurantbereich statt — im Erdgeschoss des Restaurants, gemütlich beieinander.");
    expect(section).not.toContain("Alles läuft über ein Fenster.");
    const markers = ["Tisch reservieren", "An kühleren Tagen findet die Weinbar", '<ol className="schritte font-body">', "Drinnen oder draußen:", "Veranstaltungen:", "Brot und Kuchen für daheim:", "Große Runden und Feiern:", "Donnerstag und Freitag ab 16 Uhr", "{iframeConsent ? (", "Außerdem im selben Fenster: Gutschein kaufen", "Ohne das Fenster geht es auch:", "Wenn etwas dazwischenkommt"];
    const indices = markers.map(marker => section.indexOf(marker));
    expect(indices.every(index => index >= 0)).toBe(true);
    expect(indices).toEqual([...indices].sort((a, b) => a - b));
  });
  it("uses exactly the four final steps and four hints", () => {
    expect([...section.matchAll(/<li>(.*?)<\/li>/g)].map(match => text(match[1]))).toEqual(steps);
    expect([...section.matchAll(/<p className="hinweis font-body">(.*?)<\/p>/g)].map(match => text(match[1]))).toEqual(hints);
    expect(section.match(/<strong>/g)).toHaveLength(8);
    expect(section).not.toContain("oder ruft uns an");
  });
  it("links the restaurant twice, the bakery and the house email", () => {
    expect(section.split('href="https://joujou.restaurant"')).toHaveLength(3);
    expect(section).toContain('href="https://thepurebakery.shop/"');
    expect(section).toContain('href="mailto:hallo@joujou-pfalz.de"');
    expect(section).not.toContain('href="https://joujou-pfalz.de/events"');
    expect(section).not.toContain('href="#gesellschaften"');
    expect(section).toContain('href="/datenschutz"');
    expect(section).toContain('href="/agb"');
  });
  it("preserves state-based consent, both Weinbar entry paths and cancellation", () => {
    expect(home).toContain("const [iframeConsent, setIframeConsent] = useState(false)");
    expect(section).toContain("{iframeConsent ? (");
    expect(section).toContain("onClick={() => setIframeConsent(true)}");
    expect(section.split(widgetUrl)).toHaveLength(3);
    expect(section).toContain("Reservierung laden");
    expect(section).toContain("In neuem Tab öffnen");
    expect(section).toContain("30 Euro pro Person beim Brunch, 50 Euro am Abend.");
  });
  it("preserves hours and offers only the voucher in the post-window line", () => {
    expect(section).toContain("Donnerstag und Freitag ab 16 Uhr · Samstag und Sonntag ab 12 Uhr · Montag bis Mittwoch geschlossen");
    const voucher = section.slice(section.indexOf("Außerdem im selben Fenster:"), section.indexOf("Wenn etwas dazwischenkommt"));
    expect(voucher).toContain("Gutschein kaufen");
    expect(voucher).not.toContain("Veranstaltungen");
    expect(section).toContain("Ohne das Fenster geht es auch: Einen Tisch und Gutscheine bekommt ihr genauso per E-Mail an");
    expect(section).toContain("Wir legen sie von Hand an und schicken euch die Bestätigung.");
  });
  it("keeps the supplied counter spacing and visible links", () => {
    for (const rule of ["counter-reset: schritt;", "counter-increment: schritt;", "content: counter(schritt);", "padding-left: 40px;", "max-width: 640px;", "#reservierung-widget .schritte a,"]) expect(css).toContain(rule);
  });
});
