import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const root = resolve(import.meta.dirname, "..");
const home = readFileSync(resolve(root, "client/src/pages/Home.tsx"), "utf8");
const css = readFileSync(resolve(root, "client/src/index.css"), "utf8");
const section = home.slice(home.indexOf('<div id="reservierung-widget">'), home.indexOf('{/* RIGHT: Euer Abend'));
const widgetUrl = "https://services.gastronovi.com/restaurants/68135/reservation/widget/entry/reservation?area=Joujou+Weinbar";

describe("Shared Joujou reservation explanation", () => {
  it("places introduction, hours, four steps and four hints before consent and cancellation", () => {
    const markers = ["Alles läuft über ein Fenster.", "Freitag ab 16 Uhr", '<ol className="schritte font-body">', "Drinnen oder draußen:", "Veranstaltungen:", "Brot und Kuchen für daheim:", "Große Runden und Feiern:", "{iframeConsent ? (", "Wenn etwas dazwischenkommt"];
    const indices = markers.map(marker => section.indexOf(marker));
    expect(indices.every(index => index >= 0)).toBe(true);
    expect(indices).toEqual([...indices].sort((a, b) => a - b));
    expect(section.match(/<li>/g)).toHaveLength(4);
    expect(section.match(/className="hinweis font-body"/g)).toHaveLength(4);
    expect(section).not.toContain("Für die Weinbar bucht ihr hier euren Tisch.");
  });
  it("retains every supplied step and bold hint prefix", () => {
    for (const copy of [
      "Bereich wählen.", "Wählt „Joujou Weinbar\".", "Personenzahl, Tag und Uhrzeit wählen.",
      "andere Zeiten und den nächsten freien Tag vor.", "Namen und Kontakt eintragen.",
      "Besonderheiten wie Unverträglichkeiten oder Hund gehören ins Feld „Anmerkung\"",
      "Bestätigung abwarten.", "schaut in den Spam-Ordner oder ruft uns an.",
      "Garten oder drinnen ist ein Wunsch, keine feste Zusage", "bei schlechtem Wetter sitzt niemand draußen.",
      "Besondere Abende finden derzeit im Joujou Restaurant statt", "vorab im",
      "zur Abholung bestellen.", "ab acht Personen lieber direkt",
    ]) expect(section).toContain(copy);
    expect(section.match(/<strong>/g)).toHaveLength(8);
  });
  it("links hints to events, bakery, local enquiry form and house email", () => {
    for (const target of ["https://joujou-pfalz.de/events", "https://thepurebakery.shop/", "#gesellschaften", "mailto:hallo@joujou-pfalz.de"]) {
      expect(section).toContain(`href="${target}"`);
    }
    expect(section).toContain('href="/datenschutz"');
    expect(section).toContain('href="/agb"');
  });
  it("preserves state-based consent and the Weinbar URL in both entry paths", () => {
    expect(home).toContain("const [iframeConsent, setIframeConsent] = useState(false)");
    expect(section).toContain("{iframeConsent ? (");
    expect(section).toContain("onClick={() => setIframeConsent(true)}");
    expect(section.split(widgetUrl)).toHaveLength(3);
    expect(section).toContain("Reservierung laden");
    expect(section).toContain("In neuem Tab öffnen");
    expect(section).toContain("30 Euro pro Person beim Brunch, 50 Euro am Abend.");
  });
  it("uses the supplied counter, spacing and readable text sizes within the reservation scope", () => {
    expect(css).toContain("#reservierung-widget .schritte");
    expect(css).toContain("counter-reset: schritt;");
    expect(css).toContain("counter-increment: schritt;");
    expect(css).toContain("content: counter(schritt);");
    expect(css).toContain("padding-left: 40px;");
    expect(css).toContain("max-width: 640px;");
  });
});
