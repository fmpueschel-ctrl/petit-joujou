import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import SteakAnnouncement from "../client/src/components/SteakAnnouncement";
import { STEAK_EVENING_MENU_URL } from "../client/src/lib/steakEvening";

const root = resolve(import.meta.dirname, "..");
const read = (path: string) => readFileSync(resolve(root, path), "utf8");
const key = "petit-joujou:steak-announcement:2026-10-22";
const render = (menuHref: string | null = STEAK_EVENING_MENU_URL) => renderToStaticMarkup(React.createElement(SteakAnnouncement, { menuHref }));

beforeEach(() => vi.stubGlobal("React", React));
afterEach(() => vi.unstubAllGlobals());

describe("Donnerstag-Steak-Abend ab 22.10.2026", () => {
  it("shows the exact announcement, an accessible close control and the real two-page menu", () => {
    const html = render();
    expect(STEAK_EVENING_MENU_URL).toBe("/manus-storage/petit-joujou-donnerstag-steak-abend-2026-10-19_6ef6ba7d.pdf");
    expect(html).toContain("Neu: donnerstags Steak-Abend im petit joujou — Weinbar geöffnet.");
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
    expect(render()).toContain("Neu: donnerstags Steak-Abend");
    const source = read("client/src/components/SteakAnnouncement.tsx");
    expect(source).toContain("setIsDismissed(true)");
    expect(source).toContain('window.localStorage.setItem(STORAGE_KEY, "dismissed")');
    expect(source.match(/catch \{/g)?.length).toBeGreaterThanOrEqual(2);
  });
  it("places the banner above the navigation and adapts hero/menu/anchors to its changing height", () => {
    const home = read("client/src/pages/Home.tsx");
    expect(home.indexOf("<SteakAnnouncement menuHref={STEAK_EVENING_MENU_URL} />")).toBeLessThan(home.indexOf('className="winebar-brandmark"'));
    expect(home).toContain("new ResizeObserver(updateHeight)");
    expect(home).toContain("Donnerstag · Steak-Abend");
    expect(home).toContain("Jetzt jeden Donnerstag: Steak-Abend.");
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
});
