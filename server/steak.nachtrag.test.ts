import { readFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const root = resolve(import.meta.dirname, "..");
const archive = resolve(root, "references/karten/2026-11-24-nachtrag");

describe("Historischer Steak-Nachtrag 24.11.2026", () => {
  it("bewahrt den historischen Pixel-Gleichheitsnachweis der 24.11-Herkunfts-PDF, ohne sie als aktuell zu behaupten", () => {
    const proof = JSON.parse(readFileSync(resolve(archive, "pdf-treue.json"), "utf8"));
    expect(proof.pdf).toBe("petit-joujou-steakkarte-do-so-mit-wein-2026-11-24-v2.pdf");
    expect(proof.pages).toHaveLength(2);
    expect(proof.pages.every((page: { pixel_equal: boolean }) => page.pixel_equal)).toBe(true);
    expect(proof.sha256).toBe("25035385fa50224870c15e2d2c895a707748426fda546c76487428cb469f0f3c");
    for (const page of proof.pages) expect(existsSync(resolve(archive, "originale", page.original))).toBe(true);
    expect(existsSync(resolve(archive, proof.pdf))).toBe(true);
  });
});
