import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { BEVERAGE_MENU_URL } from "../client/src/lib/wineCards";

const archive = resolve(import.meta.dirname, "../references/karten/2026-11-25-getraenkekarte");

describe("Getränkekarte Nachtrag 25.11.2026", () => {
  it("uses the new beverage PDF byte-identically without modifying the supplied original", () => {
    const proof = JSON.parse(readFileSync(resolve(archive, "pdf-abnahme.json"), "utf8"));
    const original = readFileSync(resolve(archive, "originale", proof.source));
    const output = readFileSync(resolve(archive, proof.output));
    expect(output.equals(original)).toBe(true);
    expect(proof.original_byte_equal).toBe(true);
    expect(proof.pages).toBe(1);
    expect(proof.content_type).toBe("application/pdf");
    expect(proof.http_status).toBe(200);
    expect(createHash("sha256").update(output).digest("hex")).toBe("ff8e3e753d979d3e1ffdc792914abd823a761b3d3d171aed7a8309a6ff531644");
    expect(BEVERAGE_MENU_URL).toBe(proof.path);
  });
});
