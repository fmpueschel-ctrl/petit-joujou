import { createHash } from "node:crypto";
import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const root = resolve(import.meta.dirname, "..");
const archive = resolve(root, "references/karten/2026-11-25");
const proofPath = resolve(archive, "pdf-korrektur.json");
const pdfPath = resolve(archive, "petit-joujou-steakkarte-do-so-2026-11-25.pdf");

describe("Aktuelle Steak-Karten-Korrektur 25.11.2026", () => {
  it("weist die Entfernung genau einer Textzeile aus der Zwei-Seiten-Karte nach", () => {
    expect(existsSync(proofPath)).toBe(true);
    expect(existsSync(pdfPath)).toBe(true);
    const proof = JSON.parse(readFileSync(proofPath, "utf8"));
    expect(proof.pages_before).toBe(2);
    expect(proof.pages_after).toBe(1);
    expect(proof.removed_text).toBe("Weinkarte mit passenden Weinen auf der nächsten Seite.");
    expect(proof.removed_operations).toEqual([1821, 1931]);
    expect(proof.all_remaining_content_operations_identical).toBe(true);
    expect(proof.all_remaining_extracted_text_identical).toBe(true);
    expect(proof.page_size_unchanged).toBe(true);
    expect(proof.only_single_text_line_removed).toBe(true);
    expect(proof.sha256).toBe("b04e2789e159db602016cea59703fc8c499c53513a4cd7f79b18c74c0c9c0670");
    expect(createHash("sha256").update(readFileSync(pdfPath)).digest("hex")).toBe(proof.sha256);
  });
});
