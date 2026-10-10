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
    expect(comingSoon).toContain('className="tos-nav"');
    expect(comingSoon).toContain('className="tos-wordmark"');
    expect(comingSoon).toContain('className="tos-nav-back"');
    expect(comingSoon).toContain("← Zurück zur Weinbar");
    expect(comingSoon).toContain("position:fixed;top:0;left:0;right:0");
  });

  it("removes expired events while preserving the event section and its follow link", () => {
    for (const expired of ["BEATS petit joujou", "TAVOLA BEATS", "Joujou Groovt", "Herbstmarkt"]) {
      expect(home).not.toContain(expired);
      expect(indexHtml).not.toContain(expired);
    }
    expect(home).toContain('id="events"');
    expect(home).toContain("Events & Abende");
    expect(home).toContain("Alle Termine und Tickets auf");
    expect(home).not.toContain("shop?tab=events");

    const jsonLdBlocks = [...indexHtml.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)]
      .map(match => JSON.parse(match[1]));
    expect(jsonLdBlocks).toHaveLength(1);
    expect(jsonLdBlocks[0]["@type"]).toBe("Restaurant");
    expect(home).not.toContain('className="events-card-wrap"');
    expect(css).toContain("grid-template-columns: minmax(0, 1.15fr) minmax(280px, 0.85fr);");
    expect(css).toContain("padding: clamp(72px, 6vw, 112px) 0;");
    expect(css).toContain("scroll-margin-top: 84px;");
  });

  it("points visitors to the three approved Restaurant events and their ticket overview", () => {
    const events = home.slice(home.indexOf("function EventsSection()"), home.indexOf("function ReservierungUndGesellschaftenSection()"));
    expect(events).toContain("Aktuell finden besondere Abende im Joujou Restaurant statt:");
    expect(events).toContain("Pilates & Brunch (17.10.)");
    expect(events).toContain("Joujou × Vinaturel – Österreich im Glas (04.11.)");
    expect(events).toContain("Allie’s Kitchen meets Joujou (29.11.)");
    expect(events).toContain('href="https://joujou-pfalz.de/events" target="_blank" rel="noopener noreferrer"');
    expect(events).toContain("Ausgesuchte Abende mit ausgesuchten Winzern.");
    expect(events).not.toContain("instagram.com");
  });

  it("keeps Friday-only afternoon opening and weekend hours consistent everywhere", () => {
    expect(home).toContain("Fr ab 16:00 Uhr · Sa & So ab 12:00 Uhr · Mo–Do geschlossen");
    const footer = home.slice(home.indexOf("function Footer()"));
    expect(footer).toContain('["Fr", "ab 16:00 Uhr"]');
    expect(footer).toContain('["Sa & So", "ab 12:00 Uhr"]');
    expect(footer).toContain('["Mo–Do", "geschlossen"]');
    expect(home).not.toContain("Do & Fr ab");
    const business = JSON.parse(indexHtml.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)![1]);
    expect(business.openingHoursSpecification.map((hours: { dayOfWeek: string[]; opens: string }) => ({ days: hours.dayOfWeek, opens: hours.opens }))).toEqual([
      { days: ["Friday"], opens: "16:00" },
      { days: ["Saturday", "Sunday"], opens: "12:00" },
    ]);
    expect(indexHtml).not.toContain("Do–Fr ab 16");
    expect(read("client/src/hooks/usePageMeta.ts")).not.toContain("Do–Fr ab 16");
  });

  it("keeps the complete reservation explanation and cancellation rules on the page", () => {
    expect(home).toContain("Für die Weinbar bucht ihr hier euren Tisch.");
    expect(home).toContain("darunter eure IP-Adresse");
    expect(home).toContain("Wenn etwas dazwischenkommt");
    expect(home).toContain("30 Euro pro Person beim Brunch, 50 Euro am Abend.");
    expect(home).toContain("Stornierungsbedingungen laut AGB");
    expect(home).toContain('href="/agb"');
  });

  it("keeps the fullscreen navigation usable and contrasted at every viewport size", () => {
    expect(home).toContain('className="site-menu-overlay winebar-paper"');
    expect(home).toContain('className="font-display site-menu-link"');
    expect(home).toContain('aria-label={open ? "Menü schließen" : "Menü öffnen"}');
    expect(home).toContain('className="nav-menu-close-label"');
    expect(home).toContain('className="font-body site-menu-return"');
    expect(home).toContain("Zurück zur Seite");
    expect(home).toContain("document.body.style.overflow = \"hidden\"");
    expect(css).toContain("height: calc(100dvh - 60px);");
    expect(css).toContain("font-size: clamp(22px, 4vh, 44px) !important;");
    expect(css).toMatch(/\.nav-menu-close\s*\{[^}]*color:\s*#fff;/s);
    expect(css).toContain("min-width: 112px;");
  });

  it("keeps the pale events layer opaque above the preceding photo strip", () => {
    expect(css).toMatch(/\.events-section\s*\{[^}]*isolation:\s*isolate;/s);
    expect(css).toMatch(/\.events-section\s*\{[^}]*overflow:\s*hidden;/s);
    expect(css).toContain("background-color: #F5F0E6 !important;");
  });

  it("starts a plain reload at the hero while preserving intentional hash targets", () => {
    expect(indexHtml).toContain('navigation?.type !== "reload" || window.location.hash');
    expect(indexHtml).toContain('history.scrollRestoration = "manual"');
    expect(indexHtml).toContain("window.scrollTo(0, 0)");
    expect(indexHtml).toContain('history.scrollRestoration = "auto"');
    expect(home).toContain("document.getElementById(targetId)?.scrollIntoView()");
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
    expect(css).toContain("width: clamp(190px, 24vw, 320px);");
    expect(css).toContain("align-self: center;");
    expect(css).not.toContain("width: 45px;");
    expect(css).not.toMatch(/\.weinbar-icon\s*\{[^}]*position:\s*absolute/s);
    expect(home).toContain('/manus-storage/petit-joujou-hand-static_f02c319e.svg');
  });

  it("uses the Joujou family typography while preserving the petit wordmark", () => {
    expect(css).toContain('--font-display: "Clash Display", Arial, sans-serif;');
    expect(css).toContain('--font-body: "Archivo", system-ui, sans-serif;');
    expect(css).toContain('--font-script: "Dancing Script", cursive;');
    expect(indexHtml).toContain("clash-display@600&f[]=archivo@300,400");
    expect(home).toContain('aria-label="klein. fein. wein."');
    expect(home).not.toContain("metallic-bronze");
    expect(home.match(/organic wine bar &middot; pfalz/g)).toHaveLength(2);
    expect(home).not.toContain('organic wine bar &middot; Pfalz');
    expect(home).not.toContain("Weinbar &middot; Bad Dürkheim &middot; Pfalz");
    expect(indexHtml).toContain("Weinbar Bad Dürkheim Pfalz");
  });

  it("keeps split content readable on large and ultrawide screens", () => {
    expect(css).toMatch(/\.split-section \.split-content > :not\(\.weinbar-icon\):not\(\.sr-only\) \{\s*width: 100%;/);
    expect(css).toContain("max-width: 680px;");
    expect(css).toContain("@media (min-width: 1800px)");
    expect(css).toContain("font-size: clamp(18px, 0.94vw, 36px);");
    expect(css).toContain("max-width: clamp(680px, 31vw, 1200px);");
    expect(css).toContain("max-width: clamp(1440px, 52vw, 2000px);");
  });
});
