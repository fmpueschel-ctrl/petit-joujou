import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { afterAll, describe, expect, it, vi } from "vitest";
import AGB from "../client/src/pages/AGB";
import Datenschutz from "../client/src/pages/Datenschutz";

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
  it("copies the complete original AGB main text verbatim including all eleven headings", () => {
    const original = read("server/fixtures/joujou-agb-2026-10.html");
    const main = agb.match(/<main[^>]*>([\s\S]*?)<\/main>/)![1];
    expect(plain(main)).toBe(plain(original));
    expect(main.match(/<h2>/g)).toHaveLength(11);
    for (const fragment of ["14 Tage", "13 bis 7 Tage", "ab 6 Tagen", "50 Prozent des Preises", "der volle Preis", "Stand: Oktober 2026"]) expect(plain(main)).toContain(fragment);
  });
  it("uses the local AGB title and removes shop terms and withdrawal links", () => {
    expect(read("client/src/pages/AGB.tsx")).toContain('title: "Allgemeine Geschäftsbedingungen — petit joujou"');
    for (const old of ["Shop Pay", "Checkout", "Eigentumsvorbehalt", "Widerrufsbelehrung", "href=\"/widerruf\""]) expect(agb).not.toContain(old);
    expect(read("client/src/App.tsx")).not.toContain('path={"/widerruf"}');
    expect(read("server/_core/index.ts")).not.toContain('loc: "/widerruf"');
    expect(home).not.toContain("joujou-pfalz.de/agb");
    expect(home.slice(home.indexOf("function Footer()"))).toContain('href="/agb"');
    expect(read("client/src/pages/Impressum.tsx")).toContain('href="/agb"');
  });
  it("removes only obsolete privacy services while retaining the still-coded cart storage notice", () => {
    for (const old of ["Shopify", "Spreadconnect", "Stripe"]) expect(privacy).not.toContain(old);
    for (const remaining of ["Manus", "Umami", "Gastronovi", "rapidmail", "CaptchaFox", "commerce:cart-id"]) expect(privacy).toContain(remaining);
    expect(read("client/src/contexts/CartContext.tsx")).toContain("window.localStorage.setItem(CART_STORAGE_KEY, value)");
    expect(read("client/src/main.tsx")).toContain("<CartProvider>");
  });
  it("shows company, address and email but no phone in the footer", () => {
    const footer = home.slice(home.indexOf("function Footer()"), home.indexOf("// ── Page"));
    expect(footer).toContain("Joujou GmbH<br />");
    expect(footer).toContain("Hauptstraße 34, 67098 Bad Dürkheim");
    expect(footer).toContain('href="mailto:hallo@joujou-pfalz.de"');
    expect(home).not.toContain('href="tel:');
    expect(read("client/src/pages/Impressum.tsx")).toContain("Telefon: +49 6322 7906693");
  });
  it("updates the events link, permits zoom and describes the orange hand", () => {
    expect(home).not.toContain("joujou-pfalz.de/events");
    expect(read("client/index.html")).toContain('content="width=device-width, initial-scale=1"');
    expect(read("client/index.html")).not.toContain("maximum-scale");
    expect(home).toContain('alt="Orange Hand schenkt Wein in ein Glas ein"');
  });
});
