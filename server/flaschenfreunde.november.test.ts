import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const root = resolve(import.meta.dirname, "..");
const read = (path: string) => readFileSync(resolve(root, path), "utf8");

describe("Flaschenfreunde Herbst 2026 — Stand 24.11.", () => {
  it("uses the approved autumn PDF, its first-page preview, unchanged alt text and meta description", () => {
    const page = read("client/src/pages/Flaschenfreunde.tsx");
    expect(page).toContain('/manus-storage/petit-joujou-flaschenfreunde-herbst-2026-11-24_6415c3a1.pdf');
    expect(page).toContain('/manus-storage/petit-joujou-flaschenfreunde-herbst-2026-11-24-vorschau_926d2ac7.webp');
    expect(page).toContain('alt="Petit Joujou Flaschenfreunde — Flaschenweinkarte für den Herbst"');
    expect(page).toContain("Unsere Flaschenfreunde: Die besten Weine ihrer jeweiligen Art, kuratiert vom petit joujou. Preise zum Mitnehmen und vor Ort.");
    for (const obsolete of [
      "flaschenfreunde_karte-1_925590f9.png",
      "PetitJoujou_Flaschenfreunde_A4_FINAL-2_49e8acbc.pdf",
      "petit-joujou-flaschenfreunde-herbst-2026-11_8f4fc429.pdf",
      "petit-joujou-flaschenfreunde-herbst-2026-11-vorschau_a2a91771.webp",
    ]) expect(page).not.toContain(obsolete);
    expect(existsSync(resolve(root, "references/karten/2026-11-24/petit-joujou-flaschenfreunde-herbst-2026-11-24.pdf"))).toBe(true);
  });
});
