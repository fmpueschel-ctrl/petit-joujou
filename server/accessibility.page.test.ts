import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { afterAll, describe, expect, it, vi } from "vitest";
import Barrierefreiheit from "../client/src/pages/Barrierefreiheit";

vi.stubGlobal("React", React);
afterAll(() => vi.unstubAllGlobals());
vi.mock("../client/src/hooks/usePageMeta", () => ({ usePageMeta: () => {} }));
vi.mock("wouter", () => ({ Link: ({ children, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => React.createElement("a", props, children) }));

const root = resolve(import.meta.dirname, "..");
const read = (path: string) => readFileSync(resolve(root, path), "utf8");
const plain = (html: string) => html.replace(/<br\s*\/?\s*>|<\/(?:h1|h2|p|div)>/gi, " ").replace(/<[^>]*>/g, "").replace(/&amp;/g, "&").replace(/\s+/g, " ").trim();

describe("Barrierefreiheit — petit joujou", () => {
  const rendered = renderToStaticMarkup(React.createElement(Barrierefreiheit));
  const content = plain(rendered.match(/<main[^>]*>([\s\S]*?)<\/main>/)![1]);

  it("keeps all six sections and the mandatory MLBF authority verbatim", () => {
    const fixture = read("server/fixtures/joujou-barrierefreiheit-2026-10.html");
    for (const heading of ["Der kürzeste Weg", "Unser Haus", "Diese Webseite", "Das Buchungsfenster", "Wenn euch etwas auffällt", "Zuständige Marktüberwachungsbehörde"]) expect(content).toContain(heading);
    for (const mandatory of ["Marktüberwachungsstelle der Länder für die Barrierefreiheit von Produkten und Dienstleistungen (MLBF AöR)", "Carl-Miller-Straße 6, 39112 Magdeburg", "Telefon +49 391 289 230 23", "kontakt@mlbf-barrierefrei.de"]) expect(content).toContain(mandatory);
    expect(plain(fixture)).toContain("Stand: Oktober 2026. Diese Erklärung betrifft die Dienstleistungen, die wir über diese Webseite anbieten, und wird ergänzt, sobald uns neue Angaben vorliegen.");
    expect(content).toContain("Stand: Oktober 2026. Diese Erklärung betrifft die Dienstleistungen, die wir über diese Webseite anbieten, und wird ergänzt, sobald uns neue Angaben vorliegen.");
  });

  it("matches the restaurant main text exactly after only the three approved Weinbar replacements", () => {
    const fixture = read("server/fixtures/joujou-barrierefreiheit-2026-10.html");
    const originalMain = fixture.match(/<main>[\s\S]*?<div class="wrap">([\s\S]*?)<\/div>\s*<\/main>/)![1];
    const expected = plain(originalMain)
      .replace("Tisch, Platz bei einer Veranstaltung, Gutschein", "Tisch und Gutschein")
      .replace("Reservierungen, Plätze bei Veranstaltungen und Gutscheine", "Reservierungen und Gutscheine")
      .replace("um bei uns zu essen, zu feiern oder einen Gutschein zu verschenken.", "um bei uns einen Tisch zu buchen oder einen Gutschein zu verschenken.");
    expect(content).toBe(expected);
  });

  it("makes only the three approved Weinbar copy changes", () => {
    expect(content).toContain("Tisch und Gutschein — all das legen wir von Hand an und schicken euch die Bestätigung.");
    expect(content).toContain("Reservierungen und Gutscheine laufen über ein Fenster der Gastronovi GmbH");
    expect(content).toContain("Niemand muss das Fenster benutzen, um bei uns einen Tisch zu buchen oder einen Gutschein zu verschenken.");
    for (const restaurantOnly of ["Tisch, Platz bei einer Veranstaltung, Gutschein", "Reservierungen, Plätze bei Veranstaltungen und Gutscheine", "um bei uns zu essen, zu feiern oder einen Gutschein zu verschenken"]) expect(content).not.toContain(restaurantOnly);
  });

  it("uses petit joujou metadata and links every mandated legal location", () => {
    const app = read("client/src/App.tsx");
    const sitemap = read("server/_core/index.ts");
    const home = read("client/src/pages/Home.tsx");
    for (const page of ["client/src/pages/AGB.tsx", "client/src/pages/Impressum.tsx", "client/src/pages/Datenschutz.tsx"]) expect(read(page)).toContain('href="/barrierefreiheit"');
    expect(read("client/src/pages/Barrierefreiheit.tsx")).toContain('title: "Barrierefreiheit — petit joujou"');
    expect(rendered).toContain("petit joujou");
    expect(rendered).toContain("organic wine bar");
    expect(app).toContain('path={"/barrierefreiheit"}');
    expect(sitemap).toContain('loc: "/barrierefreiheit"');
    expect(home).toContain('href="/barrierefreiheit"');
  });
});
