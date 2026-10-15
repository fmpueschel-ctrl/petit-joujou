import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const root = resolve(import.meta.dirname, "..");
const home = readFileSync(resolve(root, "client/src/pages/Home.tsx"), "utf8");
const css = readFileSync(resolve(root, "client/src/index.css"), "utf8");
const gallery = home.slice(home.indexOf('<div className="garden-atmosphere-gallery">'), home.indexOf("// ── Events"));

describe("Garden photos without cropping", () => {
  it("preserves the two garden photographs and shows the selected lamp row in full", () => {
    expect(gallery.match(/<img /g)).toHaveLength(3);
    expect(gallery).toContain("oliven-board_169d2816.webp");
    expect(gallery).toContain("wein-anstossen_719ab057.webp");
    expect(gallery).toContain("petit-joujou-lampenreihe_cda90d12.webp");
    expect(gallery).toContain("Warme Korbleuchten in einer Reihe entlang der Steinwand im Joujou-Hof am Abend");
    expect(gallery).not.toContain("20260802_214909_f13ce581.jpg");
    expect(gallery.match(/width=\{533\}/g)).toHaveLength(2);
    expect(gallery.match(/height=\{800\}/g)).toHaveLength(2);
    expect(gallery).toContain("width={1600}");
    expect(gallery).toContain("height={1200}");
    expect(gallery).not.toContain("object-cover");
    expect(gallery).not.toContain('height: "280px"');
  });
  it("keeps the established hero and does not add the proposed new bar interior", () => {
    expect(home).toContain("bar-quer_ae6538a9.webp");
    expect(home).not.toContain("203347");
  });
  it("uses natural image heights and proportional desktop columns", () => {
    expect(css).toMatch(/\.garden-atmosphere-gallery\s*\{[^}]*grid-template-columns: 533fr 533fr 1066\.666667fr;/s);
    expect(css).toMatch(/\.garden-atmosphere-gallery img\s*\{[^}]*height: auto;[^}]*object-fit: contain;/s);
    expect(css).toMatch(/\.garden-atmosphere-gallery img:last-child\s*\{[^}]*grid-column: 1 \/ -1;/s);
  });
});
