import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { createHash } from "node:crypto";
import { describe, expect, it } from "vitest";

const root = resolve(import.meta.dirname, "..");
const read = (path: string) => readFileSync(resolve(root, path), "utf8");
const archive = "references/karten/2026-11-24-flaschenfreunde-v2";

describe("Flaschenfreunde Herbst 2026 — Nachtrag 24.11.", () => {
  it("uses the newest PDF and first-page preview with unchanged alt text and meta description", () => {
    const page = read("client/src/pages/Flaschenfreunde.tsx");
    expect(page).toContain('/manus-storage/petit-joujou-flaschenfreunde-herbst-2026-11-24-v2_7f88474f.pdf');
    expect(page).toContain('/manus-storage/petit-joujou-flaschenfreunde-herbst-2026-11-24-v2-vorschau_a6005d20.webp');
    expect(page).toContain('alt="Petit Joujou Flaschenfreunde — Flaschenweinkarte für den Herbst"');
    expect(page).toContain("Unsere Flaschenfreunde: Die besten Weine ihrer jeweiligen Art, kuratiert vom petit joujou. Preise zum Mitnehmen und vor Ort.");
    for (const obsolete of [
      "flaschenfreunde_karte-1_925590f9.png",
      "PetitJoujou_Flaschenfreunde_A4_FINAL-2_49e8acbc.pdf",
      "petit-joujou-flaschenfreunde-herbst-2026-11_8f4fc429.pdf",
      "petit-joujou-flaschenfreunde-herbst-2026-11-vorschau_a2a91771.webp",
      "petit-joujou-flaschenfreunde-herbst-2026-11-24_6415c3a1.pdf",
      "petit-joujou-flaschenfreunde-herbst-2026-11-24-vorschau_926d2ac7.webp",
    ]) expect(page).not.toContain(obsolete);
  });
  it("archives the new PDF unchanged together with its regenerated preview", () => {
    const source = readFileSync(resolve(root, archive, "originale/Flaschenfreunde_Herbst_Petit_Joujou_Leistadt_A4-1.pdf"));
    const pdf = readFileSync(resolve(root, archive, "petit-joujou-flaschenfreunde-herbst-2026-11-24-v2.pdf"));
    expect(pdf.equals(source)).toBe(true);
    expect(createHash("sha256").update(pdf).digest("hex")).toBe("d48551b5dc3e969647dee3ae6797ecb83288a843d50e5ab9603fc9deaf75c187");
    expect(existsSync(resolve(root, archive, "petit-joujou-flaschenfreunde-herbst-2026-11-24-v2-vorschau.webp"))).toBe(true);
  });
});
