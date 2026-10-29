import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import SteakAnnouncement from "../client/src/components/SteakAnnouncement";
import { STEAK_EVENING_MENU_URL } from "../client/src/lib/steakEvening";
import { BOTTLE_WINE_MENU_URL } from "../client/src/lib/wineCards";

const root = resolve(import.meta.dirname, "..");
const read = (path: string) => readFileSync(resolve(root, path), "utf8");
const key = "petit-joujou:steak-announcement:2026-10-22";
const render = (menuHref: string | null = STEAK_EVENING_MENU_URL) => renderToStaticMarkup(React.createElement(SteakAnnouncement, { menuHref }));

beforeEach(() => vi.stubGlobal("React", React));
afterEach(() => vi.unstubAllGlobals());

describe("Steak-Karte an allen Weinbartagen", () => {
  it("shows the all-days announcement, an accessible close control and the current Do–So menu", () => {
    const html = render();
    expect(STEAK_EVENING_MENU_URL).toBe("/manus-storage/petit-joujou-steakkarte-do-so-2026-10-29_0e43560d.pdf");
    expect(html).toContain("Neu: Steak im petit joujou — an allen Weinbartagen.");
    expect(html).not.toContain("donnerstags Steak-Abend");
    expect(html).toContain('aria-label="Steak-Ankündigung schließen"');
    expect(html).toContain(`href="${STEAK_EVENING_MENU_URL}"`);
    expect(html).toContain("Zur Karte");
    expect(html).toContain('rel="noopener noreferrer"');
    expect(html).not.toContain('role="dialog"');
  });
  it("does not render fake menu links or unsafe protocols", () => {
    for (const href of [null, "", "javascript:alert(1)", "data:text/html,test"]) {
      expect(render(href)).not.toContain("Zur Karte");
    }
  });
  it("honours a saved dismissal and reads only the announcement preference", () => {
    const getItem = vi.fn(() => "dismissed");
    vi.stubGlobal("window", { localStorage: { getItem } });
    expect(render()).toBe("");
    expect(getItem).toHaveBeenCalledWith(key);
  });
  it("still shows the announcement when localStorage is blocked", () => {
    vi.stubGlobal("window", { get localStorage() { throw new Error("SecurityError"); } });
    expect(render()).toContain("Neu: Steak im petit joujou");
    const source = read("client/src/components/SteakAnnouncement.tsx");
    expect(source).toContain("setIsDismissed(true)");
    expect(source).toContain('window.localStorage.setItem(STORAGE_KEY, "dismissed")');
    expect(source.match(/catch \{/g)?.length).toBeGreaterThanOrEqual(2);
  });
  it("places the banner above the navigation and adapts hero/menu/anchors to its changing height", () => {
    const home = read("client/src/pages/Home.tsx");
    expect(home.indexOf("<SteakAnnouncement menuHref={STEAK_EVENING_MENU_URL} />")).toBeLessThan(home.indexOf('className="winebar-brandmark"'));
    expect(home).toContain("new ResizeObserver(updateHeight)");
    expect(home).toContain("Steak-Karte");
    expect(home).not.toContain("Donnerstag · Steak-Abend");
    expect(home).not.toContain("Jetzt jeden Donnerstag: Steak-Abend.");
    expect(home).toContain("href={STEAK_EVENING_MENU_URL}");
    const css = read("client/src/index.css");
    expect(css).toContain("padding-top: var(--winebar-header-height, 60px)");
    expect(css).toContain("scroll-margin-top: calc(var(--winebar-header-height, 60px) + 24px)");
    expect(css).toContain("height: calc(100dvh - var(--winebar-header-height, 60px))");
    const bannerCss = read("client/src/components/SteakAnnouncement.css");
    expect(bannerCss).toContain("background: #C9573B");
    expect(bannerCss).toContain("font-size: 19px");
    expect(bannerCss).toContain("font-weight: 700");
    expect(bannerCss).not.toMatch(/position:\s*(fixed|absolute)/);
  });
  it("uses the delivered bottle-wine menu before the beverage card and never substitutes the old Flaschenfreunde PDF", () => {
    const home = read("client/src/pages/Home.tsx");
    expect(BOTTLE_WINE_MENU_URL).toBe("/manus-storage/Joujou_Flaschenweinkarte_b6c08177.pdf");
    expect(home).toContain('import { BOTTLE_WINE_MENU_URL } from "@/lib/wineCards"');
    expect(home.indexOf("{BOTTLE_WINE_MENU_URL && (")).toBeLessThan(home.indexOf("petit-joujou-getraenkekarte-weinbar-2026-09"));
    expect(home).toContain("Getränkekarte");
    expect(read("client/src/lib/wineCards.ts")).toContain("Original-PDF vom 19.10.2026: 15 A4-Seiten");
  });

  it("links the Steak-Signature only to the current one-page premium Entrecôte flyer", () => {
    const home = read("client/src/pages/Home.tsx");
    expect(home).toContain('/manus-storage/petit-joujou-premium-entrecote-2026-10-29_a6caaf10.pdf');
    expect(home).toContain("Dry-Aged Entrecôte · Bio-Angus von Land.Luft · 300 g · Signature Cut");
    expect(home).not.toContain('/manus-storage/petit-joujou-das-beste-steak-der-pfalz-ohne-preis-a4_776c943e.pdf');
    expect(home).not.toContain('/manus-storage/einleger_entrecote_c0034170.pdf');
    expect(existsSync(resolve(root, "references/karten/2026-10-29/petit-joujou-premium-entrecote-2026-10-29.pdf"))).toBe(true);
  });

  it("uses the delivered Kleine Karte and removes all three superseded menu URLs from product code", () => {
    const home = read("client/src/pages/Home.tsx");
    expect(home).toContain('/manus-storage/petit-joujou-kleine-karte-2026-10-29_205b6758.pdf');
    expect(home).not.toContain('/manus-storage/petit-joujou-speisekarte-weinbar-2026-09_fe3d9398.pdf');
    expect(home).not.toContain('/manus-storage/petit-joujou-steak-karte-alle-weinbartage-2026-10-27_89b83cf6.pdf');
    expect(existsSync(resolve(root, "references/karten/2026-10-29/petit-joujou-kleine-karte-2026-10-29.pdf"))).toBe(true);
    expect(existsSync(resolve(root, "references/karten/2026-10-29/petit-joujou-steakkarte-do-so-2026-10-29.pdf"))).toBe(true);
  });
});
