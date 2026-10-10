import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { WINEBAR_THEME as C } from "../client/src/lib/winebarTheme";

const root = resolve(import.meta.dirname, "..");
const read = (path: string) => readFileSync(resolve(root, path), "utf8");
const home = read("client/src/pages/Home.tsx");
const css = read("client/src/index.css");
const comingSoon = read("client/src/pages/ComingSoon.tsx");
const teaser = read("client/src/components/TheOneComingSoonContent.tsx");

function luminance(hex: string) {
  const channels = [1, 3, 5].map(offset => parseInt(hex.slice(offset, offset + 2), 16) / 255)
    .map(value => value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4);
  return channels[0] * 0.2126 + channels[1] * 0.7152 + channels[2] * 0.0722;
}
function contrast(a: string, b: string) {
  const values = [luminance(a), luminance(b)].sort((x, y) => x - y);
  return (values[1] + 0.05) / (values[0] + 0.05);
}

describe("Joujou family style 2026-10-10", () => {
  it("adds exactly the approved seasonal explanation below the existing barn copy", () => {
    const barn = home.slice(home.indexOf("function ScheuneSection()"), home.indexOf("function GartenSection()"));
    const original = "Alte Balken, flackerndes Kerzenlicht, Stimmengewirr und diese Stimmung, die man nicht planen kann — sie passiert einfach.";
    const note = "An kühleren Tagen findet die Weinbar im Restaurantbereich statt — im Erdgeschoss des Restaurants, gemütlich beieinander.";
    expect(barn).toContain(original);
    expect(barn).toContain(note);
    expect(barn.indexOf(note)).toBeGreaterThan(barn.indexOf(original));
    expect(barn).toContain("barn-season-note");
    expect(barn).not.toContain("Sagt bei der Reservierung gern Bescheid, wir setzen euch passend.");
  });

  it("uses family paper, ink and a single orange house accent without legacy pink/green accents", () => {
    expect(C.paper).toBe("#F5F0E6");
    expect(C.ink).toBe("#22302A");
    expect(C.accent).toBe("#C9573B");
    expect(home).toContain('WINEBAR_THEME as C');
    expect(teaser).toContain('WINEBAR_THEME as C');
    expect(comingSoon).toContain('WINEBAR_THEME as C');
    for (const old of ["#f2f7f4", "#2a4a3e", "#d4688a", "#3a6a5a", "#ed7846"]) {
      expect(home.toLowerCase()).not.toContain(old);
      expect(css.toLowerCase()).not.toContain(old);
    }
  });

  it("applies paper texture to surfaces rather than a fixed overlay over content or photographs", () => {
    expect(css).toContain("--winebar-paper-grain:");
    expect(css).toMatch(/\.winebar-paper\s*\{[^}]*background-image:\s*var\(--winebar-paper-grain\)/s);
    expect(home).toContain('className="events-section winebar-paper"');
    expect(home).toContain('className="split-content winebar-paper"');
    expect(comingSoon).toContain('className="tos-root winebar-paper"');
    expect(comingSoon).not.toContain('className="tos-grain"');
  });

  it("keeps warm candlelit dark sections with readable headings and body text", () => {
    expect(C.dark).toBe("#22302A");
    for (const id of ["weinkeller", "garten", "scheune"]) {
      expect(home).toContain(`id="${id}" className="winebar-dark"`);
    }
    expect(home).toContain("rgba(245,240,230,0.84)");
    expect(contrast(C.paper, C.dark)).toBeGreaterThan(7);
    expect(contrast(C.accentLight, C.dark)).toBeGreaterThan(4.5);
    expect(contrast(C.accentStrong, C.paper)).toBeGreaterThan(4.5);
    expect(contrast("#ffffff", C.accentStrong)).toBeGreaterThan(4.5);
  });

  it("adds the discreet restaurant-style header subtitle and consistent three-word spelling", () => {
    const nav = home.slice(home.indexOf("function Nav()"), home.indexOf("function Hero()"));
    expect(nav).toContain('className="winebar-brand-subtitle">organic wine bar</span>');
    expect(css).toMatch(/\.winebar-brandmark\s*\{[^}]*align-items: baseline;[^}]*gap: 10px;/s);
    expect(css).toMatch(/\.winebar-brand-subtitle\s*\{[^}]*font-size: 11px !important;[^}]*letter-spacing: 0.16em;[^}]*text-transform: uppercase;/s);
    expect(home.match(/organic wine bar &middot; pfalz/g)).toHaveLength(2);
    expect(home).not.toContain("organic winebar");
    expect(css).not.toContain("#29231F");
    expect(nav).toContain("rgba(34,48,42,0.96)");
  });

  it("restores the original self-drawing orange hand without changing its layout", () => {
    expect(home).toContain("/manus-storage/petit-joujou-self-drawing_744a37eb.svg");
    expect(home).not.toContain("petit-joujou-hand-static");
    expect(css).not.toContain("pj-draw");
  });

  it("retains links, opening times, official newsletter and reservation consent", () => {
    expect(home).toContain('href="https://joujou.restaurant"');
    expect(home).toContain("Freitag ab 16 Uhr · Samstag und Sonntag ab 12 Uhr · Montag bis Donnerstag geschlossen");
    expect(home).toContain("services.gastronovi.com/restaurants/68135/reservation/widget/entry/reservation?area=Joujou+Weinbar");
    expect(home).toContain("{iframeConsent ? (");
    expect(home).toContain("<RapidmailSignup compact />");
    expect(teaser).toContain("Shop | The One — bald");
    expect(teaser).toContain("<RapidmailSignup compact eager={eagerNewsletter} />");
    expect(comingSoon).toContain("← Zurück zur Weinbar");
  });
});
