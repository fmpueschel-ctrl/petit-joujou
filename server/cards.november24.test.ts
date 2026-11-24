import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const root = resolve(import.meta.dirname, "..");
const read = (path: string) => readFileSync(resolve(root, path), "utf8");
const archive = "references/karten/2026-11-24";
const copies = [
  ["Joujou_Flaschenweinkarte_A4.pdf", "petit-joujou-flaschenweinkarte-2026-11-24.pdf"],
  ["Petit_Joujou_Kleine_Karte_NOV26.pdf", "petit-joujou-kleine-karte-2026-11-24.pdf"],
  ["Petit_Joujou_Aus_dem_Wingert_A4.pdf", "petit-joujou-offene-weine-aus-dem-wingert-2026-11-24.pdf"],
  ["Petit_Joujou_Getraenkekarte_A4.pdf", "petit-joujou-getraenkekarte-2026-11-24.pdf"],
  ["Petit_Joujou_Premium_Entrecote_NOV26.pdf", "petit-joujou-premium-entrecote-2026-11-24.pdf"],
  ["Petit_Joujou_Eiskarte_A4.pdf", "petit-joujou-eis-und-suesses-2026-11-24.pdf"],
  ["Flaschenfreunde_Herbst_Petit_Joujou_Leistadt_A4.pdf", "petit-joujou-flaschenfreunde-herbst-2026-11-24.pdf"],
];

describe("Kartenupdate 24.11.2026", () => {
  it("places Eis & Süßes immediately after Steak-Karte with the existing menu styling and secure new tab", () => {
    const home = read("client/src/pages/Home.tsx");
    const end = home.indexOf("Steak-Karte\n");
    const iceAnchor = home.slice(end, home.indexOf("{/* Zwei Pillars */}", end));
    expect(iceAnchor).toContain('href="/manus-storage/petit-joujou-eis-und-suesses-2026-11-24_680b0097.pdf"');
    expect(iceAnchor.match(/<a\s/g)).toHaveLength(1);
    expect(iceAnchor).toContain('target="_blank"');
    expect(iceAnchor).toContain('rel="noopener noreferrer"');
    expect(iceAnchor).toContain('className="font-body"');
    expect(iceAnchor).toContain('padding: "0.75rem 2rem"');
    expect(iceAnchor).toContain('border: `1px solid ${C.ink}`');
    expect(iceAnchor).toContain("Eis & Süßes");
    expect(home).toContain('gap: "1rem", flexWrap: "wrap"');
    expect(home).not.toContain('href="/shop"');
  });

  it("does not link the superseded replaced PDFs and preview in active client code", () => {
    const active = ["client/src/pages/Home.tsx", "client/src/pages/Flaschenfreunde.tsx", "client/src/lib/wineCards.ts", "client/src/lib/steakEvening.ts"].map(read).join("\n");
    for (const obsolete of [
      "petit-joujou-flaschenweinkarte-2026-11_08b4c73b.pdf",
      "petit-joujou-steakkarte-alle-weinbartage-2026-10-30_f3db5117.pdf",
      "petit-joujou-kleine-karte-2026-10-29_205b6758.pdf",
      "petit-joujou-premium-entrecote-2026-10-29_a6caaf10.pdf",
      "petit-joujou-offene-weine-aus-dem-wingert-2026-11_06de8222.pdf",
      "petit-joujou-getraenkekarte-2026-11_bba0ccfd.pdf",
      "petit-joujou-flaschenfreunde-herbst-2026-11_8f4fc429.pdf",
      "petit-joujou-flaschenfreunde-herbst-2026-11-vorschau_a2a91771.webp",
      "petit-joujou-flaschenfreunde-herbst-2026-11-24_6415c3a1.pdf",
      "petit-joujou-flaschenfreunde-herbst-2026-11-24-vorschau_926d2ac7.webp",
    ]) expect(active).not.toContain(obsolete);
  });

  it("archives the seven individual PDFs byte-for-byte without text or design edits", () => {
    for (const [original, publishedName] of copies) {
      const source = readFileSync(resolve(root, archive, "originale", original));
      const destination = readFileSync(resolve(root, archive, publishedName));
      expect(destination.equals(source), original).toBe(true);
      expect(destination.subarray(0, 5).toString()).toBe("%PDF-");
    }
    expect(existsSync(resolve(root, archive, "originale/Petit_Joujou_Steakkarte_Do-So_NOV26.pdf"))).toBe(true);
    expect(existsSync(resolve(root, archive, "originale/Petit_Joujou_Wein_nach_Lust_Leistadt_A4.pdf"))).toBe(true);
  });
});
