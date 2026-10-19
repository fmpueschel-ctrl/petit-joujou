import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { afterAll, describe, expect, it, vi } from "vitest";
import AGB from "../client/src/pages/AGB";
import Datenschutz from "../client/src/pages/Datenschutz";
import Barrierefreiheit from "../client/src/pages/Barrierefreiheit";

vi.stubGlobal("React", React);
afterAll(() => vi.unstubAllGlobals());
vi.mock("../client/src/hooks/usePageMeta", () => ({ usePageMeta: () => {} }));
vi.mock("wouter", () => ({ Link: ({ children, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => React.createElement("a", props, children) }));
const root = resolve(import.meta.dirname, "..");
const read = (p: string) => readFileSync(resolve(root, p), "utf8");
const plain = (html: string) => html.replace(/<br\s*\/?\s*>|<\/(?:h1|h2|p|div)>/gi, " ").replace(/<[^>]*>/g, "").replace(/&quot;/g, '"').replace(/&#x27;|&#39;/g, "'").replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/\s+/g, " ").trim();

describe("Approved legal cleanup 2026-10-10", () => {
  const home = read("client/src/pages/Home.tsx");
  const agb = renderToStaticMarkup(React.createElement(AGB));
  const privacy = renderToStaticMarkup(React.createElement(Datenschutz));
  const accessibility = renderToStaticMarkup(React.createElement(Barrierefreiheit));
  it("copies the complete original AGB main text verbatim including all twelve headings", () => {
    const original = read("server/fixtures/joujou-agb-2026-10.html");
    const main = agb.match(/<main[^>]*>([\s\S]*?)<\/main>/)![1];
    expect(plain(main)).toBe(plain(original));
    expect(main.match(/<h2(?:\s[^>]*)?>/g)).toHaveLength(12);
    for (const fragment of ["14 Tage", "13 bis 7 Tage", "ab 6 Tagen", "50 Prozent des Preises", "der volle Preis", "Stand: Oktober 2026"]) expect(plain(main)).toContain(fragment);
  });
  it("uses the local AGB title and removes shop terms and withdrawal links", () => {
    expect(read("client/src/pages/AGB.tsx")).toContain('title: "Allgemeine Geschäftsbedingungen — petit joujou"');
    for (const old of ["Shop Pay", "Checkout", "Eigentumsvorbehalt", "href=\"/widerruf\""]) expect(agb).not.toContain(old);
    expect(read("client/src/App.tsx")).not.toContain('path={"/widerruf"}');
    expect(read("server/_core/index.ts")).not.toContain('loc: "/widerruf"');
    expect(home).not.toContain("joujou-pfalz.de/agb");
    expect(home.slice(home.indexOf("function Footer()"))).toContain('href="/agb"');
    expect(read("client/src/pages/Impressum.tsx")).toContain('href="/agb"');
  });
  it("preserves the voucher withdrawal instructions including Sie address, phone and source anchors", () => {
    expect(agb).toContain('<h2 id="widerruf">7. Widerruf beim Kauf von Gutscheinen</h2>');
    expect(agb).toContain('<h2 id="storno">');
    expect(agb).toContain('<h2 id="veranstaltungen">');
    for (const fragment of ["Widerrufsbelehrung", "Muster-Widerrufsformular", "Sie haben das Recht, binnen vierzehn Tagen", "Telefon +49 6322 7906693", "Unterschrift des/der Verbraucher(s) (nur bei Mitteilung auf Papier)", "(*) Unzutreffendes streichen."]) expect(plain(agb)).toContain(fragment);
    expect(plain(agb)).toContain("Reservieren kannst du über unser Reservierungsfenster oder per E-Mail.");
    expect(plain(agb)).toContain("Wenn es später wird, sag uns kurz Bescheid — dann halten wir ihn, so gut es geht.");
    expect(plain(agb)).not.toContain("per E-Mail oder am Telefon");
  });
  it("removes obsolete privacy services and the inactive cart storage notice", () => {
    for (const old of ["Shopify", "Spreadconnect", "Stripe"]) expect(privacy).not.toContain(old);
    for (const remaining of ["Manus", "Umami", "Gastronovi", "rapidmail", "CaptchaFox"]) expect(privacy).toContain(remaining);
    expect(privacy).not.toContain("commerce:cart-id");
    expect(privacy).not.toContain("9. Technisch notwendige Speicherung");
    expect(read("client/src/main.tsx")).not.toContain("CartProvider");
  });
  it("shows company, address and email but no phone in the footer", () => {
    const footer = home.slice(home.indexOf("function Footer()"), home.indexOf("// ── Page"));
    expect(footer).toContain("Joujou GmbH<br />");
    expect(footer).toContain("Hauptstraße 34, 67098 Bad Dürkheim");
    expect(footer).toContain('href="mailto:hallo@joujou-pfalz.de"');
    expect(home).not.toContain('href="tel:');
    expect(read("client/src/pages/Impressum.tsx")).toContain("Telefon: +49 6322 7906693");
  });
  it("restores Maps to the house address and Instagram without reintroducing the phone link", () => {
    const footer = home.slice(home.indexOf("function Footer()"), home.indexOf("// ── Page"));
    expect(footer).toContain('href="https://maps.google.com/?q=Hauptstra%C3%9Fe+34,+67098+Bad+D%C3%BCrkheim" target="_blank" rel="noopener noreferrer"');
    expect(footer).toContain("Route in Google Maps");
    expect(footer).toContain('href="https://www.instagram.com/joujou.bistro" target="_blank" rel="noopener noreferrer"');
    expect(footer).not.toContain('href="tel:');
  });
  it("names both linked siblings and unlinked The One while preserving the umbrella and Instagram", () => {
    const footer = home.slice(home.indexOf("function Footer()"), home.indexOf("// ── Page"));
    expect(footer).toContain('href="https://thepurebakery.shop" target="_blank" rel="noopener noreferrer"');
    expect(footer).toContain('href="https://joujou.restaurant" target="_blank" rel="noopener noreferrer"');
    expect(footer).toContain('<span>The One — bald</span>');
    expect(footer).not.toMatch(/href=["'][^"']*theone\.shop/);
    expect(footer).toContain('href="https://www.joujou-pfalz.de"');
    expect(footer).toContain('href="https://www.instagram.com/joujou.bistro"');
    expect(footer).toContain('href="https://www.tiktok.com/@thepurebakery" target="_blank" rel="noopener noreferrer"');
    expect(footer).toContain("TikTok @thepurebakery");
  });
  it("places the complete supplied physical accessibility notice next to parking information", () => {
    const footer = home.slice(home.indexOf("function Footer()"), home.indexOf("// ── Page"));
    expect(footer).toContain('href="/barrierefreiheit"');
    expect(footer).toContain("Unser historisches Haus ist leider nicht barrierefrei.");
    expect(footer).toContain("Wer mit dem Online-Reservierungsfenster nicht zurechtkommt, schreibt uns einfach — Tisch und Gutschein legen wir von Hand an.");
    expect(footer.indexOf("Unser historisches Haus ist leider nicht barrierefrei.")).toBeGreaterThan(footer.indexOf("Parkplätze direkt am Haus. Anfahrt über die B271."));
    expect(footer.indexOf("Unser historisches Haus ist leider nicht barrierefrei.")).toBeLessThan(footer.indexOf("{/* Newsletter Signup */}"));
  });
  it("adds exactly the three approved review links and no Facebook link", () => {
    const footer = home.slice(home.indexOf("function Footer()"), home.indexOf("// ── Page"));
    for (const href of ["https://de.restaurantguru.com/Joujou-Bad-Durkheim", "https://www.tripadvisor.com/Restaurant_Review-g198626-d23851573-Reviews-Joujou-Bad_Durkheim_Rhineland_Palatinate.html", "https://www.google.com/maps?cid=16096501785747683906"]) expect(footer).toContain(href);
    expect(footer).not.toContain("facebook.com");
  });
  it("updates the events link, permits zoom and describes the orange hand", () => {
    expect(home).not.toContain("joujou-pfalz.de/events");
    expect(read("client/index.html")).toContain('content="width=device-width, initial-scale=1"');
    expect(read("client/index.html")).not.toContain("maximum-scale");
    expect(home).toContain('alt="Orange Hand schenkt Wein in ein Glas ein"');
  });
});
