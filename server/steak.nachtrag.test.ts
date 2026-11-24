import { readFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { STEAK_EVENING_MENU_URL } from "../client/src/lib/steakEvening";

const root = resolve(import.meta.dirname, "..");
const archive = resolve(root, "references/karten/2026-11-24-nachtrag");

describe("Steak-Nachtrag 24.11.2026", () => {
  it("uses the newest two-page PDF and keeps the replaced morning PDF out of the active link", () => {
    expect(STEAK_EVENING_MENU_URL).toBe("/manus-storage/petit-joujou-steakkarte-do-so-mit-wein-2026-11-24-v2_858ccdd5.pdf");
    expect(readFileSync(resolve(root, "client/src/lib/steakEvening.ts"), "utf8")).not.toContain("2026-11-24_68f59eb8.pdf");
    const proof = JSON.parse(readFileSync(resolve(archive, "pdf-treue.json"), "utf8"));
    expect(proof.pages).toHaveLength(2);
    expect(proof.pages.every((page: { pixel_equal: boolean }) => page.pixel_equal)).toBe(true);
    expect(proof.sha256).toBe("25035385fa50224870c15e2d2c895a707748426fda546c76487428cb469f0f3c");
    for (const page of proof.pages) expect(existsSync(resolve(archive, "originale", page.original))).toBe(true);
    expect(existsSync(resolve(archive, proof.pdf))).toBe(true);
  });
});
