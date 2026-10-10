import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const root = resolve(import.meta.dirname, "..");
const home = readFileSync(resolve(root, "client/src/pages/Home.tsx"), "utf8");
const css = readFileSync(resolve(root, "client/src/index.css"), "utf8");
const gallery = home.slice(home.indexOf('<div className="garden-atmosphere-gallery">'), home.indexOf("// ── Events"));

describe("Garden photos without cropping", () => {
  it("preserves all three original photographs and their intrinsic sizes", () => {
    expect(gallery.match(/<img /g)).toHaveLength(3);
    expect(gallery).toContain("oliven-board_169d2816.webp");
    expect(gallery).toContain("wein-anstossen_719ab057.webp");
    expect(gallery).toContain("20260802_214909_f13ce581.jpg");
    expect(gallery.match(/width=\{533\}/g)).toHaveLength(2);
    expect(gallery.match(/height=\{800\}/g)).toHaveLength(2);
    expect(gallery).toContain("width={4000}");
    expect(gallery).toContain("height={3000}");
    expect(gallery).not.toContain("object-cover");
    expect(gallery).not.toContain('height: "280px"');
  });
  it("uses natural image heights and proportional desktop columns", () => {
    expect(css).toMatch(/\.garden-atmosphere-gallery\s*\{[^}]*grid-template-columns: 533fr 533fr 1066\.666667fr;/s);
    expect(css).toMatch(/\.garden-atmosphere-gallery img\s*\{[^}]*height: auto;[^}]*object-fit: contain;/s);
    expect(css).toMatch(/\.garden-atmosphere-gallery img:last-child\s*\{[^}]*grid-column: 1 \/ -1;/s);
  });
});
