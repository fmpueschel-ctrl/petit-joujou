import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const root = resolve(import.meta.dirname, "..");
const read = (path: string) => readFileSync(resolve(root, path), "utf8");

describe("petit-joujou briefing 2026-09-24", () => {
  const home = read("client/src/pages/Home.tsx");
  const app = read("client/src/App.tsx");
  const comingSoon = read("client/src/pages/ComingSoon.tsx");
  const theOne = read("client/src/components/TheOneComingSoonContent.tsx");
  const rapidmail = read("client/src/components/RapidmailSignup.tsx");
  const css = read("client/src/index.css");
  const indexHtml = read("client/index.html");
  const serverIndex = read("server/_core/index.ts");

  it("removes Shop from navigation while keeping one intentional hero link", () => {
    expect(home.match(/href="\/shop"/g)).toHaveLength(1);
    expect(home).not.toMatch(/nav-cta-hide-mobile[^\n]*>Shop<\/a>/);
    expect(app).toContain('<Route path={"/shop"} component={ComingSoon} />');
    expect(app).toContain('<Route path={"/shop/:handle"} component={ComingSoon} />');
  });

  it("uses the approved shared The One copy and official rapidmail form 2274", () => {
    expect(theOne).toContain("Shop | The One — bald");
    expect(theOne).toContain("Bald wird aus unserem Shop etwas Eigenes");
    expect(theOne).toContain("Sei dabei, wenn The One öffnet.");
    expect(theOne).toContain("bald unter theone.shop");
    expect(theOne).toContain("<RapidmailSignup compact eager={eagerNewsletter} />");
    expect(comingSoon).toContain('canonical: "https://www.petit-joujou.de/shop"');
    expect(comingSoon).toContain("eagerNewsletter");
    expect(rapidmail).toContain("/237/2274/257bdcff21/subscribe/form.html");
    expect(rapidmail).toContain("Newsletter-Anmeldung über rapidmail");
  });

  it("keeps only the upcoming Herbstmarkt in visible and structured event data", () => {
    for (const expired of ["BEATS petit joujou", "TAVOLA BEATS", "Joujou Groovt"]) {
      expect(home).not.toContain(expired);
      expect(indexHtml).not.toContain(expired);
    }
    expect(home).toContain("Herbstmarkt");
    expect(home).toContain("Alle Events & Tickets findest du auf");
    expect(home).not.toContain("shop?tab=events");

    const jsonLdBlocks = [...indexHtml.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)]
      .map(match => JSON.parse(match[1]));
    const events = jsonLdBlocks.find(block => Array.isArray(block));
    expect(events).toHaveLength(1);
    expect(events[0].name).toContain("Herbstmarkt");
  });

  it("uses stable WebDev copies of both current Weinbar menus", () => {
    expect(home).toContain("/manus-storage/petit-joujou-speisekarte-weinbar-2026-09_fe3d9398.pdf");
    expect(home).toContain("/manus-storage/petit-joujou-getraenkekarte-weinbar-2026-09_bd5bcde3.pdf");
  });

  it("keeps product URLs out of the sitemap while the shop is coming soon", () => {
    expect(serverIndex).not.toContain('import("./shopify")');
    expect(serverIndex).not.toContain("product.handle");
    expect(serverIndex).toContain('{ loc: "/shop", priority: "0.9", freq: "weekly" }');
  });

  it("uses the requested responsive size for the hero hand icon", () => {
    expect(css).toContain("width: clamp(120px, 13vw, 168px);");
    expect(css).not.toContain("width: 45px;");
  });
});
