/* ============================================================
   petit joujou — Weinbar · Leistadt, Pfalz
   klein. fein. wein.
   ============================================================ */

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { trpc } from "@/lib/trpc";
import RapidmailSignup from "@/components/RapidmailSignup";
import TheOneComingSoonContent from "@/components/TheOneComingSoonContent";
import SteakAnnouncement from "@/components/SteakAnnouncement";
import { STEAK_EVENING_MENU_URL } from "@/lib/steakEvening";
import { BOTTLE_WINE_MENU_URL } from "@/lib/wineCards";

import { WINEBAR_THEME as C } from "@/lib/winebarTheme";

// ── Nav ──────────────────────────────────────────────────────
function Nav() {
  const [open, setOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  useLayoutEffect(() => {
    const header = headerRef.current;
    if (!header) return;
    const root = document.documentElement;
    const previousHeight = root.style.getPropertyValue("--winebar-header-height");
    const updateHeight = () => {
      root.style.setProperty("--winebar-header-height", `${header.getBoundingClientRect().height}px`);
    };
    updateHeight();
    const observer = new ResizeObserver(updateHeight);
    observer.observe(header);
    return () => {
      observer.disconnect();
      if (previousHeight) root.style.setProperty("--winebar-header-height", previousHeight);
      else root.style.removeProperty("--winebar-header-height");
    };
  }, []);
  const links = [
    { label: "Weinkeller", href: "#weinkeller" },
    { label: "Scheune", href: "#scheune" },
    { label: "Essen", href: "#essen" },
    { label: "Garten", href: "#garten" },
    { label: "Events", href: "#events" },
    { label: "Reservierung", href: "#reservierung" },
    { label: "Gesellschaften", href: "#gesellschaften" },
  ];

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [open]);

  return (
    <>
      <nav
        ref={headerRef}
        className="fixed top-0 left-0 right-0 z-50"
        style={{
          backgroundColor: "rgba(34,48,42,0.96)",
          backdropFilter: "blur(14px)",
          borderBottom: "1px solid rgba(255,255,255,0.15)",
        }}
      >
        <SteakAnnouncement menuHref={STEAK_EVENING_MENU_URL} />
        <div className="container flex items-center justify-between" style={{ height: "60px" }}>
          <a href="#" className="winebar-brandmark" onClick={() => setOpen(false)} style={{ textDecoration: "none", flexShrink: 0 }}>
            <span className="font-script" style={{ fontSize: "clamp(1.2rem, 4vw, 1.7rem)", color: "#ffffff", letterSpacing: "0.02em", whiteSpace: "nowrap" }}>
              petit joujou
            </span>
            <span className="winebar-brand-subtitle">organic wine bar</span>
          </a>
          <div className="flex items-center" style={{ gap: "0.4rem", flexShrink: 0 }}>
            <a href="#reservierung" className="font-body nav-cta-hide-mobile" style={{ padding: "0.4rem 0.8rem", backgroundColor: "rgba(255,255,255,0.15)", color: "#fff", fontSize: "0.65rem", letterSpacing: "0.08em", textTransform: "uppercase", textDecoration: "none", border: "1px solid rgba(255,255,255,0.3)", whiteSpace: "nowrap" }}>Reservieren</a>
          <button
            type="button"
            onClick={() => setOpen(current => !current)}
            className={`nav-menu-toggle${open ? " is-open" : ""}`}
            style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(255,255,255,0.8)", padding: "0.5rem", display: "flex", flexDirection: "column", gap: "5px", alignItems: "center", justifyContent: "center" }}
            aria-label={open ? "Menü schließen" : "Menü öffnen"}
            aria-expanded={open}
          >
            {open ? (
              <>
                <span className="nav-menu-close-label">Schließen</span>
                <span className="nav-menu-close" aria-hidden="true">✕</span>
              </>
            ) : (
              <>
                <span style={{ display: "block", width: "22px", height: "1.5px", backgroundColor: "rgba(255,255,255,0.8)" }} />
                <span style={{ display: "block", width: "22px", height: "1.5px", backgroundColor: "rgba(255,255,255,0.8)" }} />
                <span style={{ display: "block", width: "22px", height: "1.5px", backgroundColor: "rgba(255,255,255,0.8)" }} />
              </>
            )}
          </button>
          </div>
        </div>
      </nav>
      {/* Fullscreen overlay menu */}
      {open && (
        <div
          className="site-menu-overlay winebar-paper"
          style={{
            position: "fixed", inset: 0, zIndex: 49,
            backgroundColor: C.paper,
          }}
        >
          <div className="site-menu-list">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="font-display site-menu-link"
                style={{ color: C.ink, textDecoration: "none", letterSpacing: "0.03em" }}
              >
                {l.label}
              </a>
            ))}
            <a
              href="#gesellschaften"
              onClick={() => setOpen(false)}
              className="font-body site-menu-cta"
              style={{ backgroundColor: C.accentStrong, color: "#fff", textDecoration: "none", letterSpacing: "0.15em", textTransform: "uppercase" }}
            >
              Anfragen
            </a>
            <button
              type="button"
              className="font-body site-menu-return"
              onClick={() => setOpen(false)}
            >
              Zurück zur Seite
            </button>
          </div>
        </div>
      )}
    </>
  );
}

// ── Hero (Split-Layout: Bild links, Content rechts) ─────────
function Hero() {
  return (
    <section className="winebar-paper" style={{ backgroundColor: C.paper, padding: "0" }}>
      <div className="split-section hero-split">
        {/* Links: Bar-Bild mit Overlay */}
        <div className="split-image" style={{ position: "relative", overflow: "hidden" }}>
          <picture style={{ width: "100%", height: "100%", display: "block" }}>
            <source media="(max-width: 767px)" srcSet="/manus-storage/bar-hochkant_633f0b00.webp" />
            <source media="(min-width: 768px)" srcSet="/manus-storage/bar-quer_ae6538a9.webp" />
            <img
              src="/manus-storage/bar-quer_ae6538a9.webp"
              alt="petit joujou — Die Bar mit Weinregalen und warmem Licht"
              style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 65%", display: "block" }}
            />
          </picture>
          {/* Text-Overlay — im dunklen Zwischenraum zwischen Glasregal und Flaschenspitzen */}
          <div style={{ position: "absolute", top: "58%", left: 0, right: 0, transform: "translateY(-50%)", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", padding: "0 1.5rem" }}>
            <span className="font-script" style={{ fontSize: "clamp(2.2rem, 5vw, 3.5rem)", color: "#fff", lineHeight: 1.1, textShadow: "0 2px 12px rgba(0,0,0,0.5)" }}>
              petit joujou
            </span>
            <span className="font-body" style={{ fontSize: "0.7rem", letterSpacing: "0.2em", color: "rgba(255,255,255,0.85)", marginTop: "0.5rem", textShadow: "0 1px 6px rgba(0,0,0,0.5)" }}>
              organic wine bar &middot; pfalz
            </span>
          </div>
        </div>

        {/* Rechts: Content + CTAs */}
        <div className="split-content winebar-paper" style={{ backgroundColor: C.paper, justifyContent: "center", alignItems: "flex-start", position: "relative" }}>
          {/* SEO H1 — visually hidden but accessible */}
          <h1 className="sr-only">petit joujou — Weinbar in Bad Dürkheim, Pfalz</h1>
          {/* Originale Petit-Joujou-Illustration — zeichnet sich beim Laden, im Hausorange */}
          <img
            src="/manus-storage/petit-joujou-self-drawing_744a37eb.svg"
            alt="Orange Hand schenkt Wein in ein Glas ein"
            className="weinbar-icon"
          />

          {/* Kurzbeschreibung */}
          <p className="font-body" style={{ fontSize: "1rem", color: C.inkMuted, lineHeight: 1.85, marginBottom: "1rem", maxWidth: "380px" }}>
            <span style={{ fontWeight: 700, color: C.ink }}>Die Weinbar im Joujou.</span> Wir möchten euch verzaubern. Schnappt euch eine Flasche Wein, genießt die Sharing-Kreationen von Chef Franz und vergesst einfach die Zeit.
          </p>
          <p className="hero-season-note font-body" style={{ fontSize: "0.84rem", color: C.inkMuted, lineHeight: 1.7, maxWidth: "430px", marginBottom: "2.5rem", paddingLeft: "0.9rem", borderLeft: `2px solid ${C.accentStrong}` }}>
            An kühleren Tagen findet die Weinbar im Restaurantbereich statt — im Erdgeschoss des Restaurants, gemütlich beieinander.
          </p>

          {/* CTAs */}
          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            <a
              href="#reservierung"
              className="font-body"
              style={{
                display: "inline-block",
                padding: "0.75rem 2rem",
                backgroundColor: C.accentStrong,
                color: "#fff",
                fontSize: "0.78rem",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                textDecoration: "none",
              }}
            >
              Reservieren
            </a>
            <a
              href="/manus-storage/petit-joujou-speisekarte-weinbar-2026-09_fe3d9398.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="font-body"
              style={{
                display: "inline-block",
                padding: "0.75rem 2rem",
                border: `1px solid ${C.ink}`,
                color: C.ink,
                fontSize: "0.78rem",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                textDecoration: "none",
              }}
            >
              Speisekarte
            </a>
            {BOTTLE_WINE_MENU_URL && (
              <a
                href={BOTTLE_WINE_MENU_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="font-body"
                style={{ display: "inline-block", padding: "0.75rem 2rem", border: `1px solid ${C.ink}`, color: C.ink, fontSize: "0.78rem", letterSpacing: "0.12em", textTransform: "uppercase", textDecoration: "none" }}
              >
                Weinkarte
              </a>
            )}
            <a
              href="/manus-storage/petit-joujou-getraenkekarte-weinbar-2026-09_bd5bcde3.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="font-body"
              style={{
                display: "inline-block",
                padding: "0.75rem 2rem",
                border: `1px solid ${C.ink}`,
                color: C.ink,
                fontSize: "0.78rem",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                textDecoration: "none",
              }}
            >
              Getränkekarte
            </a>
            {STEAK_EVENING_MENU_URL && (
              <a
                href={STEAK_EVENING_MENU_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="font-body steak-evening-menu-button"
                style={{ padding: "0.75rem 2rem", border: `1px solid ${C.accentStrong}`, color: C.accentStrong, fontSize: "0.78rem", letterSpacing: "0.12em", textTransform: "uppercase", textDecoration: "none" }}
              >
                Donnerstag · Steak-Abend
              </a>
            )}
            <a
              href="/shop"
              className="font-body"
              style={{
                display: "inline-block",
                padding: "0.75rem 2rem",
                border: `1px solid ${C.ink}`,
                color: C.ink,
                fontSize: "0.78rem",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                textDecoration: "none",
              }}
            >
              Shop | The One
            </a>
          </div>

          {/* Zwei Pillars */}
          <div className="intro-pillars" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "0", marginTop: "3rem", borderTop: `1px solid ${C.border}`, width: "100%" }}>
            {[
              { title: "500 Weine — bio", text: "Begehbare Weinkarte im Gewölbekeller. Für überraschende Geschmackserlebnisse. Come in and wine out." },
              { title: "Essen ständig neu gedacht", text: "Raffinierte Sharing-Kreationen, Entrecôte-Streifen sowie Manna Palatina Pinsa — bio & saisonal." },
            ].map((p) => (
              <div key={p.title} style={{ padding: "1.5rem 1.2rem 1.5rem 0", borderRight: `1px solid ${C.border}` }}>
                <div className="font-display" style={{ fontSize: "0.9rem", color: C.ink, marginBottom: "0.5rem", letterSpacing: "0.03em" }}>{p.title}</div>
                <div className="font-body" style={{ fontSize: "0.78rem", color: C.inkMuted, lineHeight: 1.7 }}>{p.text}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Weinkeller ────────────────────────────────────────────────
function WeinkellerSection() {
  return (
    <section id="weinkeller" className="winebar-dark" style={{ backgroundColor: C.dark, padding: "0" }}>
      <div className="split-section">
        {/* Links: Grosses Weinregal-Bild */}
        <img loading="lazy"
          src="/manus-storage/wine-shelf-buerklin_0ac797ee.webp"
          alt="Weinkeller — Dr. Bürklin-Wolf Riesling im Regal"
          className="split-image"
          style={{ objectPosition: "center 30%" }}
        />

        {/* Rechts: Text */}
        <div className="split-content winebar-dark" style={{ backgroundColor: C.dark }}>
          <p className="font-body" style={{ fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase", color: C.accentLight, marginBottom: "1rem" }}>
            Der Weinkeller
          </p>
          <h2 className="font-display" style={{ fontSize: "clamp(2rem, 4vw, 2.8rem)", color: "#fff", marginBottom: "1.25rem", lineHeight: 1.15 }}>
            Leidenschaftlich kuratiert.
          </h2>
          <p className="font-body" style={{ fontSize: "0.95rem", color: "rgba(245,240,230,0.84)", lineHeight: 1.85, marginBottom: "2rem" }}>
            Mareile & Frank gehen für euch ans Limit — für das spannendste Weinangebot.
          </p>
          {[
            "500 Weine & Bubbles",
            "Pfalz, Rheinhessen, Österreich, Frankreich — fertig",
            "Klassisch oder freak-show",
            "No chemical pesticides — bio",
            "Mitnehmen zu Kellerpreisen — oder hier trinken (10 € Korkgeld)",
            "Großes & spannendes Sortiment alkoholfrei und alkoholreduziert",
            "Hat jemand alkoholfrei gesagt?",
          ].map((item) => (
            <div key={item} style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem", marginBottom: "0.75rem" }}>
              <span style={{ color: C.accentLight, fontSize: "0.9rem", marginTop: "0.05rem", flexShrink: 0 }}>→</span>
              <span className="font-body" style={{ fontSize: "0.9rem", color: "rgba(245,240,230,0.84)", lineHeight: 1.6 }}>{item}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Scheune ───────────────────────────────────────────────────
function ScheuneSection() {
  return (
    <section id="scheune" className="winebar-dark" style={{ backgroundColor: C.dark, padding: "0" }}>
      <div className="split-section" style={{ direction: "rtl" }}>
        {/* Rechts: Grosses Scheune-Bild */}
        <img loading="lazy"
          src="/manus-storage/scheune_innen_tisch_48ac2208.webp"
          alt="Scheune — gedeckter Tisch unter historischem Dachstuhl"
          className="split-image"
          style={{ objectPosition: "center 25%" }}
        />

        {/* Links: Text */}
        <div className="split-content winebar-dark" style={{ backgroundColor: C.dark, direction: "ltr" }}>
          <p className="font-body" style={{ fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase", color: C.accentLight, marginBottom: "1rem" }}>
            Drinnen
          </p>
          <h2 className="font-display" style={{ fontSize: "clamp(2rem, 4vw, 2.8rem)", color: "#fff", marginBottom: "1.5rem", lineHeight: 1.15 }}>
            Die Scheune.<br />Euer Abend.
          </h2>
          <p className="font-body" style={{ fontSize: "1rem", color: "rgba(245,240,230,0.84)", lineHeight: 1.85 }}>
            Alte Balken, flackerndes Kerzenlicht, Stimmengewirr und diese Stimmung, die man nicht planen kann — sie passiert einfach.
          </p>
          <p className="font-body barn-season-note" style={{ fontSize: "0.85rem", color: "rgba(245,240,230,0.82)", lineHeight: 1.8, marginTop: "1.75rem", paddingTop: "1.25rem", borderTop: `1px solid ${C.accentStrong}` }}>
            An kühleren Tagen findet die Weinbar im Restaurantbereich statt — im Erdgeschoss des Restaurants, gemütlich beieinander.
          </p>
        </div>
      </div>
    </section>
  );
}

// ── Garten ────────────────────────────────────────────────────
function GartenSection() {
  return (
    <section id="garten" className="winebar-dark" style={{ backgroundColor: C.dark, padding: "0" }}>
      {/* Top: Split layout — image left, text right */}
      <div className="split-section">
        {/* Links: Gäste am Tisch im Garten */}
        <img loading="lazy"
          src="/manus-storage/gaeste-garten_6e5dcfea.webp"
          alt="Gäste genießen das Essen im sonnigen Garten"
          className="split-image"
          style={{ objectPosition: "center 40%" }}
        />

        {/* Rechts: Text */}
        <div className="split-content winebar-dark" style={{ backgroundColor: C.dark }}>
          <p className="font-body" style={{ fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase", color: C.accentLight, marginBottom: "1rem" }}>
            Draußen
          </p>
          <h2 className="font-display" style={{ fontSize: "clamp(2rem, 4vw, 2.8rem)", color: "#fff", marginBottom: "1.5rem", lineHeight: 1.15 }}>
            Wein unter freiem Himmel
          </h2>
          <p className="font-body" style={{ fontSize: "1rem", color: "rgba(245,240,230,0.84)", lineHeight: 1.85, marginBottom: "1.5rem", fontStyle: "italic" }}>
            „Die beiden Gärten haben etwas Magisches. Manch ein Gast genießt die Ruhe und liest ein Buch. Andere sitzen versteckt im Eck und schauen sich verliebt in die Augen. Gruppen an Freunden, die lachen, und am langen Hochtisch lernen sich Leute kennen und werden Freunde. Für einen Tag oder ein ganzes Leben. Wein fließt, das Essen fasziniert — und ihr vergesst die Zeit."
          </p>
          <p className="font-body" style={{ fontSize: "0.85rem", color: "#fff", marginBottom: "2rem" }}>
            — Frank
          </p>
          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            {["Hunde willkommen", "Weinfreaks auch"].map((tag) => (
              <span key={tag} className="font-body" style={{ padding: "0.4rem 0.9rem", backgroundColor: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.85)", fontSize: "0.72rem", letterSpacing: "0.06em", border: "1px solid rgba(255,255,255,0.2)" }}>
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Full photos in their original proportions — no narrow cropped strip. */}
      <div className="garden-atmosphere-gallery">
        <img loading="lazy"
          src="/manus-storage/oliven-board_169d2816.webp"
          alt="Oliven-Board und Snacks zum Teilen"
          width={533}
          height={800}
        />
        <img loading="lazy"
          src="/manus-storage/wein-anstossen_719ab057.webp"
          alt="Zwei Gläser Wein anstoßen im Grünen"
          width={533}
          height={800}
        />
        <img loading="lazy"
          src="/manus-storage/petit-joujou-lampenreihe_cda90d12.webp"
          alt="Warme Korbleuchten in einer Reihe entlang der Steinwand im Joujou-Hof am Abend"
          width={1600}
          height={1200}
        />
      </div>
    </section>
  );
}


// ── Events ────────────────────────────────────────────────────
function EventsSection() {
  return (
    <section id="events" className="events-section winebar-paper" style={{ backgroundColor: C.paper }}>
      <div className="container">
        <div className="events-intro" style={{ textAlign: "center" }}>
          <p className="font-body" style={{ fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase", color: C.accentStrong, marginBottom: "0.75rem" }}>
            Was passiert
          </p>
          <h2 className="font-display" style={{ fontSize: "clamp(2rem, 4vw, 2.8rem)", color: C.ink }}>
            Events & Abende
          </h2>
          <p className="font-body" style={{ fontSize: "0.95rem", color: C.inkMuted, marginTop: "1rem", maxWidth: "500px", margin: "1rem auto 0" }}>
            Ausgesuchte Abende mit ausgesuchten Winzern.
            Tickets sind begrenzt.
          </p>
        </div>

        <div className="events-follow" style={{ textAlign: "center" }}>
          <p className="font-body" style={{ fontSize: "0.95rem", color: C.inkMuted, maxWidth: "680px", margin: "0 auto", lineHeight: 1.8 }}>
            Aktuell finden besondere Abende im Joujou Restaurant statt: Pilates & Brunch (17.10.), Joujou × Vinaturel – Österreich im Glas (04.11.) und Allie’s Kitchen meets Joujou (29.11.). Alle Termine und Tickets auf{" "}
            <a href="https://joujou.restaurant" target="_blank" rel="noopener noreferrer" style={{ color: C.accentStrong, textDecoration: "underline", textUnderlineOffset: "3px", fontWeight: 600 }}>
              joujou.restaurant
            </a>.
          </p>
        </div>
      </div>
    </section>
  );
}

// ── Reservierung & Gesellschaften (Combined Split Layout) ────────
function ReservierungUndGesellschaftenSection() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", anlass: "", gaeste: "", datum: "", budget: "", nachricht: "" });
  const [sent, setSent] = useState(false);
  const [iframeConsent, setIframeConsent] = useState(false);

  const anfrageMutation = trpc.gesellschaft.anfrage.useMutation({
    onSuccess: () => {
      setSent(true);
      toast("Anfrage gesendet! Wir melden uns innerhalb von 24 Stunden.");
    },
    onError: () => {
      toast.error("Etwas ist schiefgelaufen. Bitte versucht es nochmal oder schreibt uns direkt.");
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    anfrageMutation.mutate(form);
  };

  return (
    <section id="reservierung" className="winebar-paper" style={{ backgroundColor: C.paperRaised, padding: "6rem 0" }}>
      <div className="container">
        {/* Split: Reservierung LEFT | Euer Abend RIGHT */}
        <div className="reservierung-split" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "3rem", alignItems: "start" }}>

          {/* LEFT: Reservierung */}
          <div id="reservierung-widget">
            <div style={{ marginBottom: "2rem" }}>
              <h2 className="font-display" style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.4rem)", color: C.ink }}>
                Tisch reservieren
              </h2>
            </div>
            <ol className="schritte font-body">
              <li><strong>Bereich wählen.</strong> „Joujou Weinbar" für euren Tisch hier. „Joujou Restaurant" (Brunch &amp; Dinner, <a href="https://joujou.restaurant" target="_blank" rel="noopener noreferrer">joujou.restaurant</a>) und „Yoga &amp; Brunch" sind die anderen Bereiche im selben Fenster.</li>
              <li><strong>Personenzahl, Tag und Uhrzeit wählen.</strong> Ist eure Wunschzeit belegt, schlägt euch das Fenster andere Zeiten und den nächsten freien Tag vor.</li>
              <li><strong>Namen und Kontakt eintragen.</strong> Besonderheiten wie Unverträglichkeiten oder Hund gehört ins Feld „Anmerkung" — dann wissen wir es vorher.</li>
              <li><strong>Bestätigung abwarten.</strong> Ihr bekommt sie sofort per E-Mail, mit Termin zum Eintragen in den Kalender. Kommt nichts an, schaut in den Spam-Ordner.</li>
            </ol>
            <p className="hinweis font-body"><strong>Drinnen oder draußen:</strong> Wir setzen euch nach Wetter und Besetzung, feste Zusagen gibt es nicht. Schreibt uns, was euch lieber wäre.</p>
            <p className="hinweis font-body"><strong>Veranstaltungen:</strong> Besondere Abende finden derzeit im Joujou Restaurant statt — Termine und Tickets auf <a href="https://joujou.restaurant" target="_blank" rel="noopener noreferrer">joujou.restaurant</a>.</p>
            <p className="hinweis font-body"><strong>Brot und Kuchen für daheim:</strong> Backwaren aus unserer Bio-Backmanufaktur bestellt ihr am besten vorab zur Abholung im <a href="https://thepurebakery.shop/" target="_blank" rel="noopener noreferrer">Onlineshop der Pure Bakery</a>.</p>
            <p className="hinweis font-body"><strong>Große Runden und Feiern:</strong> Ab acht Personen oder für einen eigenen Abend schreibt uns lieber direkt an <a href="mailto:hallo@joujou-pfalz.de">hallo@joujou-pfalz.de</a>.</p>
            <p className="font-body" style={{ fontSize: "0.9rem", color: C.inkMuted, marginTop: "1.5rem", marginBottom: "1.5rem", lineHeight: 1.7 }}>
              Donnerstag und Freitag ab 16 Uhr · Samstag und Sonntag ab 12 Uhr · Montag bis Mittwoch geschlossen
            </p>
            <div style={{ backgroundColor: C.paper, border: `1px solid ${C.border}`, overflow: "hidden" }}>
              {iframeConsent ? (
                <iframe
                  src="https://services.gastronovi.com/restaurants/68135/reservation/widget/entry/reservation?area=Joujou+Weinbar"
                  title="Gastronovi Reservierung — Joujou Weinbar"
                  style={{ width: "100%", height: "550px", border: "none" }}
                />
              ) : (
                <div style={{ padding: "3rem 2rem", textAlign: "center", minHeight: "300px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "1rem" }}>
                  <p className="font-display" style={{ fontSize: "1.2rem", color: C.ink, margin: 0 }}>
                    Reservierung über Gastronovi
                  </p>
                  <p className="font-body" style={{ fontSize: "0.82rem", color: C.inkMuted, margin: 0, maxWidth: "360px", lineHeight: 1.7 }}>
                    Beim Laden werden Daten an services.gastronovi.com übertragen, darunter eure IP-Adresse. Näheres in unserer{" "}
                    <a href="/datenschutz" style={{ color: C.accentStrong, textDecoration: "underline", textUnderlineOffset: "3px" }}>
                      Datenschutzerklärung
                    </a>.
                  </p>
                  <button
                    onClick={() => setIframeConsent(true)}
                    className="font-body"
                    style={{
                      padding: "0.7rem 1.8rem", backgroundColor: C.accentStrong, color: "#fff",
                      border: "none", cursor: "pointer", fontSize: "0.8rem",
                      letterSpacing: "0.08em", textTransform: "uppercase", fontWeight: 600,
                    }}
                  >
                    Reservierung laden
                  </button>
                </div>
              )}
            </div>
            <p className="font-body" style={{ fontSize: "0.72rem", color: C.inkSoft, marginTop: "1rem" }}>
              Reservierung via Gastronovi.{" "}
              <a
                href="https://services.gastronovi.com/restaurants/68135/reservation/widget/entry/reservation?area=Joujou+Weinbar"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: C.accentStrong, textDecoration: "none" }}
              >
                In neuem Tab öffnen
              </a>
            </p>
            <p className="font-body" style={{ fontSize: "0.82rem", color: C.inkMuted, marginTop: "0.75rem", lineHeight: 1.7 }}>
              Außerdem im selben Fenster: Gutschein kaufen
            </p>
            <p className="font-body reservation-email-alternative" style={{ fontSize: "0.82rem", color: C.inkMuted, marginTop: "1rem", lineHeight: 1.7 }}>
              Ohne das Fenster geht es auch: Einen Tisch und Gutscheine bekommt ihr genauso per E-Mail an <a href="mailto:hallo@joujou-pfalz.de" style={{ color: C.accentStrong, textDecoration: "underline", textUnderlineOffset: "3px" }}>hallo@joujou-pfalz.de</a>. Wir legen sie von Hand an und schicken euch die Bestätigung.
            </p>
            <div style={{ marginTop: "2rem", padding: "1.5rem", backgroundColor: C.paper, borderLeft: `4px solid ${C.accentStrong}` }}>
              <h3 className="font-display" style={{ fontSize: "1.2rem", color: C.ink, marginBottom: "0.75rem" }}>
                Wenn etwas dazwischenkommt
              </h3>
              <p className="font-body" style={{ fontSize: "0.82rem", color: C.inkMuted, lineHeight: 1.75, marginBottom: "0.75rem" }}>
                Wir kochen und backen jeden Morgen frisch, für die Zahl der Gäste, die angemeldet sind. Bleibt ein Tisch leer, ist die Arbeit trotzdem getan. Deshalb berechnen wir eine Gebühr, wenn ihr nicht kommt, erst in den letzten 24 Stunden absagt oder kurzfristig mit weniger Personen erscheint: <strong style={{ color: C.ink }}>30 Euro pro Person beim Brunch, 50 Euro am Abend.</strong>
              </p>
              <p className="font-body" style={{ fontSize: "0.82rem", color: C.inkMuted, lineHeight: 1.75, margin: 0 }}>
                Absagen dürft ihr trotzdem jederzeit, und ihr dürft euren Tisch auch weitergeben. Wird der Platz noch besetzt, entfällt die Gebühr; dass kein oder ein kleinerer Schaden entstanden ist, könnt ihr immer nachweisen. Es gelten unsere{" "}
                <a href="/agb" style={{ color: C.accentStrong, textDecoration: "underline", textUnderlineOffset: "3px" }}>
                  Stornierungsbedingungen laut AGB
                </a>.
              </p>
            </div>
          </div>

          {/* RIGHT: Euer Abend / Unsere Bühne */}
          <div id="gesellschaften">
            <div style={{ marginBottom: "2rem" }}>
              <p className="font-body" style={{ fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase", color: C.accentStrong, marginBottom: "0.75rem" }}>
                Private Abende
              </p>
              <h2 className="font-display" style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.4rem)", color: C.ink, lineHeight: 1.25 }}>
                Euer Abend.<br />Unsere Bühne.
              </h2>
              <p className="font-body" style={{ fontSize: "0.9rem", color: C.inkMuted, marginTop: "0.75rem", lineHeight: 1.7 }}>
                Euer Geburtstag im Kerzenschein, ein Firmenabend, der kein Firmenabend sein soll, oder einfach ein Grund zum Feiern.
              </p>
            </div>

            {/* Occasion types */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem", marginBottom: "1.5rem" }}>
              {[
                { label: "Weinabende", sub: "Privat & exklusiv" },
                { label: "Geburtstage", sub: "Kleine Runden" },
                { label: "Firmen", sub: "Teamabende & Dinners" },
                { label: "Hochzeiten", sub: "Auf Anfrage" },
              ].map((o) => (
                <div key={o.label} style={{ backgroundColor: C.paper, padding: "1rem", borderLeft: `3px solid ${C.accentStrong}` }}>
                  <div className="font-display" style={{ fontSize: "0.85rem", color: C.ink }}>{o.label}</div>
                  <div className="font-body" style={{ fontSize: "0.7rem", color: C.inkSoft }}>{o.sub}</div>
                </div>
              ))}
            </div>

            {/* Key promise */}
            <div style={{ backgroundColor: C.paper, padding: "1.25rem", borderLeft: `4px solid ${C.accentStrong}`, marginBottom: "2rem" }}>
              <p className="font-body" style={{ fontSize: "0.85rem", color: C.inkMuted, lineHeight: 1.7, fontStyle: "italic" }}>
                „Wir lieben Feiern und gesellige Runden. Sprecht uns super gerne einfach an.“
              </p>
            </div>

            {/* Form */}
            <div style={{ backgroundColor: C.paper, padding: "1.5rem" }}>
              {sent ? (
                <div style={{ textAlign: "center", padding: "2rem 1rem" }}>
                  <div style={{ width: "3rem", height: "2px", backgroundColor: C.accentStrong, margin: "0 auto 1.5rem" }} />
                  <h3 className="font-display" style={{ fontSize: "1.4rem", color: C.ink, marginBottom: "0.75rem" }}>
                    Anfrage erhalten.
                  </h3>
                  <p className="font-body" style={{ fontSize: "0.9rem", color: C.inkMuted, lineHeight: 1.7 }}>
                    Wir melden uns innerhalb von 24 Stunden.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <h3 className="font-display" style={{ fontSize: "1.2rem", color: C.ink, marginBottom: "0.4rem" }}>
                    Anfrage stellen
                  </h3>


                  {/* Name + Email */}
                  <div className="form-2col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem", marginBottom: "0.75rem" }}>
                    <div>
                      <label htmlFor="ges-name" className="font-body" style={{ fontSize: "0.65rem", letterSpacing: "0.1em", textTransform: "uppercase", color: C.inkMuted, display: "block", marginBottom: "0.3rem" }}>Name *</label>
                      <input
                        id="ges-name"
                        required
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        style={{ width: "100%", padding: "0.6rem 0.8rem", border: `1px solid ${C.border}`, backgroundColor: C.paperRaised, fontSize: "0.85rem", color: C.ink, outline: "none", fontFamily: "inherit" }}
                        placeholder="Euer Name"
                      />
                    </div>
                    <div>
                      <label htmlFor="ges-email" className="font-body" style={{ fontSize: "0.65rem", letterSpacing: "0.1em", textTransform: "uppercase", color: C.inkMuted, display: "block", marginBottom: "0.3rem" }}>E-Mail *</label>
                      <input
                        id="ges-email"
                        required
                        type="email"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        style={{ width: "100%", padding: "0.6rem 0.8rem", border: `1px solid ${C.border}`, backgroundColor: C.paperRaised, fontSize: "0.85rem", color: C.ink, outline: "none", fontFamily: "inherit" }}
                        placeholder="email@beispiel.de"
                      />
                    </div>
                  </div>

                  {/* Anlass + Gäste */}
                  <div className="form-2col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem", marginBottom: "0.75rem" }}>
                    <div>
                      <label htmlFor="ges-anlass" className="font-body" style={{ fontSize: "0.65rem", letterSpacing: "0.1em", textTransform: "uppercase", color: C.inkMuted, display: "block", marginBottom: "0.3rem" }}>Anlass</label>
                      <select
                        id="ges-anlass"
                        value={form.anlass}
                        onChange={(e) => setForm({ ...form, anlass: e.target.value })}
                        style={{ width: "100%", padding: "0.6rem 0.8rem", border: `1px solid ${C.border}`, backgroundColor: C.paperRaised, fontSize: "0.85rem", color: form.anlass ? C.ink : C.inkSoft, outline: "none", fontFamily: "inherit" }}
                      >
                        <option value="">Wählen...</option>
                        <option value="hochzeit">Hochzeit</option>
                        <option value="geburtstag">Geburtstag</option>
                        <option value="firmenevent">Firmenevent</option>
                        <option value="weinabend">Privater Weinabend</option>
                        <option value="sonstiges">Sonstiges</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="ges-gaeste" className="font-body" style={{ fontSize: "0.65rem", letterSpacing: "0.1em", textTransform: "uppercase", color: C.inkMuted, display: "block", marginBottom: "0.3rem" }}>Gästeanzahl</label>
                      <select
                        id="ges-gaeste"
                        value={form.gaeste}
                        onChange={(e) => setForm({ ...form, gaeste: e.target.value })}
                        style={{ width: "100%", padding: "0.6rem 0.8rem", border: `1px solid ${C.border}`, backgroundColor: C.paperRaised, fontSize: "0.85rem", color: form.gaeste ? C.ink : C.inkSoft, outline: "none", fontFamily: "inherit" }}
                      >
                        <option value="">Anzahl...</option>
                        <option value="bis20">Bis 20 Personen</option>
                        <option value="bis40">21–40 Personen</option>
                        <option value="bis60">41–60 Personen</option>
                        <option value="bis100">61–100 Personen</option>
                      </select>
                    </div>
                  </div>

                  {/* Datum + Telefon */}
                  <div className="form-2col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem", marginBottom: "0.75rem" }}>
                    <div>
                      <label htmlFor="ges-datum" className="font-body" style={{ fontSize: "0.65rem", letterSpacing: "0.1em", textTransform: "uppercase", color: C.inkMuted, display: "block", marginBottom: "0.3rem" }}>Wunschdatum</label>
                      <input
                        id="ges-datum"
                        type="date"
                        value={form.datum}
                        onChange={(e) => setForm({ ...form, datum: e.target.value })}
                        style={{ width: "100%", padding: "0.6rem 0.8rem", border: `1px solid ${C.border}`, backgroundColor: C.paperRaised, fontSize: "0.85rem", color: C.ink, outline: "none", fontFamily: "inherit" }}
                      />
                    </div>
                    <div>
                      <label htmlFor="ges-telefon" className="font-body" style={{ fontSize: "0.65rem", letterSpacing: "0.1em", textTransform: "uppercase", color: C.inkMuted, display: "block", marginBottom: "0.3rem" }}>Telefon</label>
                      <input
                        id="ges-telefon"
                        type="tel"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        style={{ width: "100%", padding: "0.6rem 0.8rem", border: `1px solid ${C.border}`, backgroundColor: C.paperRaised, fontSize: "0.85rem", color: C.ink, outline: "none", fontFamily: "inherit" }}
                        placeholder="+49..."
                      />
                    </div>
                  </div>

                  {/* Nachricht */}
                  <div style={{ marginBottom: "1.25rem" }}>
                    <label htmlFor="ges-nachricht" className="font-body" style={{ fontSize: "0.65rem", letterSpacing: "0.1em", textTransform: "uppercase", color: C.inkMuted, display: "block", marginBottom: "0.3rem" }}>Eure Wünsche & Budget</label>
                    <textarea
                      id="ges-nachricht"
                      value={form.nachricht}
                      onChange={(e) => setForm({ ...form, nachricht: e.target.value })}
                      rows={3}
                      style={{ width: "100%", padding: "0.6rem 0.8rem", border: `1px solid ${C.border}`, backgroundColor: C.paperRaised, fontSize: "0.85rem", color: C.ink, outline: "none", fontFamily: "inherit", resize: "vertical" }}
                      placeholder="Was stellt ihr euch vor?"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={anfrageMutation.isPending}
                    className="font-body"
                    style={{ width: "100%", padding: "0.9rem", backgroundColor: anfrageMutation.isPending ? C.accentStrong : C.accentStrong, color: "#fff", border: "none", fontSize: "0.75rem", letterSpacing: "0.12em", textTransform: "uppercase", cursor: anfrageMutation.isPending ? "not-allowed" : "pointer" }}
                  >
                    {anfrageMutation.isPending ? "Wird gesendet..." : "Anfrage absenden"}
                  </button>
                  <p className="font-body" style={{ fontSize: "0.72rem", color: C.inkSoft, marginTop: "1rem", lineHeight: 1.7 }}>
                    Wir verwenden deine Angaben ausschließlich zur Bearbeitung deiner Anfrage.
                    Näheres in unserer{" "}
                    <a href="/datenschutz" style={{ color: C.accentStrong, textDecoration: "underline", textUnderlineOffset: "2px" }}>Datenschutzerklärung</a>.
                  </p>
                  <p className="font-body" style={{ fontSize: "0.72rem", color: C.inkSoft, marginTop: "0.5rem", lineHeight: 1.7 }}>
                    Wir informieren dich gelegentlich per E-Mail über eigene Angebote.
                    Du kannst dem jederzeit kostenfrei widersprechen.
                  </p>
                </form>
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

// ── Essen ───────────────────────────────────────────────────
function EssenSection() {
  return (
    <section id="essen" className="relative winebar-paper" style={{ backgroundColor: C.paperRaised, paddingTop: "6rem", paddingBottom: "6rem" }}>
      <div className="container max-w-6xl">

        {/* Section Header */}
        <div className="text-center" style={{ marginBottom: "4rem" }}>
          <p className="font-body uppercase tracking-widest" style={{ fontSize: "0.75rem", color: C.accentStrong, marginBottom: "0.75rem", letterSpacing: "0.2em" }}>
            Küche
          </p>
          <h2 className="font-display" style={{ fontSize: "clamp(2.2rem,5vw,3.2rem)", color: C.ink, marginBottom: "1rem" }}>
            Sharing Purely
          </h2>
          <p className="font-body mx-auto" style={{ maxWidth: "38rem", fontSize: "1.05rem", color: C.inkMuted, lineHeight: 1.8 }}>
            Saisonale Gerichte zum Teilen — puristisch, ehrlich, auf den Punkt.
            Keine Titel nötig, das Erlebnis spricht für sich.
          </p>
        </div>

        {/* Image Grid — no dish titles, just visual storytelling */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4" style={{ marginBottom: "4rem" }}>
          {/* Kartoffel-Kräuter-Gericht — warm, erdig */}
          <div className="overflow-hidden" style={{ borderRadius: "2px" }}>
            <img
src="/manus-storage/20260725_203546_1de1a1ad.jpg"
               alt="Kartoffel-Kräuter-Gericht mit Schnittlauch und Microgreens"
              className="w-full h-full object-cover"
              style={{ aspectRatio: "3/4" }}
              loading="lazy"
            />
          </div>
          {/* Beef Crudo — top-down, Fleisch-Highlight */}
          <div className="overflow-hidden" style={{ borderRadius: "2px" }}>
            <img
              src="/manus-storage/20260725_203611_a452b770.jpg"
              alt="Beef Crudo mit Gemüsechips und Kräutern"
              className="w-full h-full object-cover"
              style={{ aspectRatio: "3/4" }}
              loading="lazy"
            />
          </div>
          {/* Zucchini vegetarisch — variety */}
          <div className="overflow-hidden col-span-2 md:col-span-1" style={{ borderRadius: "2px" }}>
            <img
              src="/manus-storage/zucchini-vegetarisch_e453b004.webp"
              alt="Vegetarisches Gericht"
              className="w-full h-full object-cover"
              style={{ aspectRatio: "3/4" }}
              loading="lazy"
            />
          </div>
        </div>

        {/* Entrecôte Signature — gets its own spotlight */}
        <div className="relative overflow-hidden" style={{ borderRadius: "2px", border: `1px solid ${C.border}` }}>
          <div className="flex flex-col md:flex-row">
            <div className="w-full md:w-1/2">
              <img
                src="/manus-storage/entrecote_zoom_d4e27da5.webp"
                alt="Dry-Aged Entrecôte — Signature Cut"
                className="w-full h-full object-cover"
                style={{ aspectRatio: "3/4", maxHeight: "500px" }}
                loading="lazy"
              />
            </div>
            <div className="w-full md:w-1/2 flex flex-col justify-center" style={{ padding: "2.5rem 2rem" }}>
              <p className="font-body uppercase tracking-widest" style={{ fontSize: "0.7rem", color: C.accentStrong, marginBottom: "0.5rem", letterSpacing: "0.2em" }}>
                Signature
              </p>
              <h3 className="font-display" style={{ fontSize: "clamp(1.8rem,3vw,2.4rem)", color: C.ink, marginBottom: "1rem" }}>
                Das wahrscheinlich beste Steak der Pfalz.
              </h3>
              <p className="font-body" style={{ fontSize: "0.95rem", color: C.inkMuted, lineHeight: 1.8, marginBottom: "1.5rem" }}>
                Dry-Aged Entrecôte · puristisch · 100-Gramm-weise · Signature Cut
              </p>
              <p className="font-body" style={{ fontSize: "0.95rem", color: C.accentStrong, fontWeight: 600, marginBottom: "1.5rem" }}>
                Jetzt jeden Donnerstag: Steak-Abend.
              </p>
              <a href="/manus-storage/einleger_entrecote_c0034170.pdf" target="_blank" rel="noopener noreferrer" className="font-body" style={{ fontSize: "0.85rem", color: C.accentStrong, textDecoration: "underline", textUnderlineOffset: "4px", letterSpacing: "0.05em" }}>
                Mehr erfahren
              </a>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}


// ── Galerie ───────────────────────────────────────────────────
function GalerieSection() {
  const photos = [
    { src: "/manus-storage/pj-keller-innen3-sharp_214c0cfa.webp", alt: "Weinkeller", caption: "Weinkeller" },
    { src: "/manus-storage/weinglaeserfass_fix_9b22d6a7.webp", alt: "Weingläser auf dem Fass", caption: "Atmosphäre" },
    { src: "/manus-storage/garten_lounge2_920a5dfa.webp", alt: "Garten Lounge", caption: "Garten" },
    { src: "/manus-storage/eingang_schnee_6c82eeca.webp", alt: "Eingang bei Schnee", caption: "Eingang" },
    { src: "/manus-storage/joujou_schild_fix_12020ddf.webp", alt: "joujou Schild", caption: "joujou" },
  ];

  return (
    <section className="winebar-paper" style={{ backgroundColor: C.paper, padding: "5rem 0" }}>
      <div className="container">
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <h2 className="font-display" style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.5rem)", color: C.ink }}>
            Einblicke
          </h2>
          <div style={{ width: "3rem", height: "1px", backgroundColor: C.accentStrong, margin: "1rem auto 0" }} />
        </div>
        <div className="galerie-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "0.5rem", maxWidth: "900px", margin: "0 auto" }}>
          {photos.map((p, i) => (
            <div key={i} style={{ position: "relative", overflow: "hidden" }}>
              <img loading="lazy"
                src={p.src}
                alt={p.alt}
                className={i >= 3 ? "galerie-small-img" : ""}
                style={{ width: "100%", height: i < 3 ? "300px" : "200px", objectFit: "cover", objectPosition: i === 2 ? "center bottom" : "center", display: "block", filter: "saturate(0.85)" }}
              />
              <div style={{ position: "absolute", bottom: "0.75rem", left: "0.75rem", backgroundColor: "rgba(245,240,230,0.96)", padding: "0.2rem 0.65rem" }}>
                <span className="font-body" style={{ fontSize: "0.62rem", letterSpacing: "0.1em", textTransform: "uppercase", color: C.accentStrong }}>
                  {p.caption}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Footer ────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="winebar-paper" style={{ backgroundColor: C.paper, padding: "4rem 0 3rem" }}>
      <div className="container">
        <div className="footer-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "3rem", marginBottom: "3rem" }}>
          <div>
            <span className="font-script" style={{ fontSize: "2rem", color: C.accentStrong }}>
              petit joujou
            </span>
            <p className="font-body" style={{ fontSize: "0.85rem", color: C.inkMuted, marginTop: "0.75rem", lineHeight: 1.7 }}>
              organic wine bar &middot; pfalz<br />
              Eine Marke von Joujou Pfalz
            </p>
          </div>
          <div>
            <p className="font-body" style={{ fontSize: "0.7rem", letterSpacing: "0.15em", textTransform: "uppercase", color: C.inkSoft, marginBottom: "1rem" }}>
              Öffnungszeiten
            </p>
            {[
              ["Do & Fr", "ab 16:00 Uhr"],
              ["Sa & So", "ab 12:00 Uhr"],
              ["Mo–Mi", "geschlossen"],
            ].map(([day, time]) => (
              <div key={day} style={{ display: "flex", gap: "0.75rem", marginBottom: "0.4rem" }}>
                <span className="font-body" style={{ fontSize: "0.85rem", color: C.inkMuted, minWidth: "5rem" }}>{day}</span>
                <span className="font-body" style={{ fontSize: "0.85rem", color: C.accentStrong }}>{time}</span>
              </div>
            ))}
          </div>
          <div>
            <p className="font-body" style={{ fontSize: "0.7rem", letterSpacing: "0.15em", textTransform: "uppercase", color: C.inkSoft, marginBottom: "1rem" }}>
              Kontakt
            </p>
            <p className="font-body" style={{ fontSize: "0.85rem", color: C.inkMuted, lineHeight: 1.8 }}>
              Joujou GmbH<br />
              Hauptstraße 34, 67098 Bad Dürkheim<br />
              <a href="https://maps.google.com/?q=Hauptstra%C3%9Fe+34,+67098+Bad+D%C3%BCrkheim" target="_blank" rel="noopener noreferrer" style={{ color: C.accentStrong, textDecoration: "none", fontSize: "0.78rem" }}>
                Route in Google Maps →
              </a><br />
              <a href="mailto:hallo@joujou-pfalz.de" style={{ color: C.accentStrong, textDecoration: "none" }}>
                hallo@joujou-pfalz.de
              </a><br />
              <a href="https://www.instagram.com/joujou.bistro" target="_blank" rel="noopener noreferrer" style={{ color: C.accentStrong, textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "0.35rem" }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
                joujou.bistro
              </a>{" · "}
              <a href="https://www.tiktok.com/@thepurebakery" target="_blank" rel="noopener noreferrer" style={{ color: C.accentStrong, textDecoration: "none" }}>
                TikTok @thepurebakery
              </a>
            </p>
            <p className="font-body" style={{ display: "flex", gap: "0.45rem", flexWrap: "wrap", marginTop: "0.65rem" }}>
              {[
                { label: "Restaurant Guru", initials: "RG", href: "https://de.restaurantguru.com/Joujou-Bad-Durkheim" },
                { label: "Tripadvisor", initials: "TA", href: "https://www.tripadvisor.com/Restaurant_Review-g198626-d23851573-Reviews-Joujou-Bad_Durkheim_Rhineland_Palatinate.html" },
                { label: "Google-Bewertungen", initials: "G", href: "https://www.google.com/maps?cid=16096501785747683906" },
              ].map(({ label, initials, href }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label} title={label} className="review-link">
                  <span aria-hidden="true">{initials}</span>
                </a>
              ))}
            </p>
            <p className="font-body" style={{ fontSize: "0.78rem", color: C.inkSoft, marginTop: "0.75rem", lineHeight: 1.6 }}>
              Parkplätze direkt am Haus. Anfahrt über die B271.
            </p>
            <p className="font-body" style={{ fontSize: "0.78rem", color: C.inkMuted, marginTop: "0.75rem", lineHeight: 1.7 }}>
              <a href="/barrierefreiheit" style={{ color: C.accentStrong, textDecoration: "underline", textUnderlineOffset: "3px" }}>Barrierefreiheit</a>: Unser historisches Haus ist leider nicht barrierefrei. An den Eingängen gibt es Stufen oder kleine Schwellen, der Gewölbekeller ist nur über eine Treppe erreichbar, und unsere Toiletten sind nicht rollstuhlgerecht (enge Türen). Kommt ihr mit eingeschränkter Mobilität, meldet euch vorher kurz bei uns — wir helfen, wo wir können, und finden gemeinsam die beste Lösung. Wer mit dem Online-Reservierungsfenster nicht zurechtkommt, schreibt uns einfach — Tisch und Gutschein legen wir von Hand an.
            </p>
          </div>
        </div>
        {/* Newsletter Signup */}
        <NewsletterFooter />

        <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: "1.5rem", textAlign: "center" }}>
          <p className="font-body" style={{ fontSize: "0.72rem", color: C.inkSoft, letterSpacing: "0.05em" }}>
            © 2026 petit joujou · Joujou Pfalz ·{" "}
            <a href="/impressum" style={{ color: C.accentStrong, textDecoration: "none" }}>Impressum</a>{" · "}
            <a href="/datenschutz" style={{ color: C.accentStrong, textDecoration: "none" }}>Datenschutz</a>{" · "}
            <a href="/agb" style={{ color: C.accentStrong, textDecoration: "none" }}>AGB</a>
            {" · "}<a href="/barrierefreiheit" style={{ color: C.accentStrong, textDecoration: "none" }}>Barrierefreiheit</a>
          </p>
          <p className="font-body" style={{ fontSize: "0.72rem", color: C.inkSoft, letterSpacing: "0.05em", marginTop: "0.5rem" }}>
            Unsere weiteren Angebote findest du auf:{" "}
            <a href="https://www.joujou-pfalz.de" target="_blank" rel="noopener noreferrer" style={{ color: C.accentStrong, textDecoration: "none" }}>www.joujou-pfalz.de</a>
          </p>
          <p className="font-body" style={{ fontSize: "0.72rem", color: C.inkSoft, letterSpacing: "0.05em", marginTop: "0.5rem", lineHeight: 1.8 }}>
            <a href="https://thepurebakery.shop" target="_blank" rel="noopener noreferrer" style={{ color: C.accentStrong, textDecoration: "none" }}>The Pure Bakery</a>{" · "}
            <a href="https://joujou.restaurant" target="_blank" rel="noopener noreferrer" style={{ color: C.accentStrong, textDecoration: "none" }}>Joujou Restaurant</a>{" · "}
            <span>The One — bald</span>
          </p>
        </div>
      </div>
    </footer>
  );
}

// ── Page ──────────────────────────────────────────────────────
// ── Newsletter Footer ─────────────────────────────────────────
function NewsletterFooter() {
  return (
    <div style={{ borderTop: `1px solid ${C.border}`, padding: "2rem 0", marginBottom: "1.5rem", textAlign: "center" }}>
      <p className="font-display" style={{ fontSize: "1rem", color: C.ink, marginBottom: "0.5rem" }}>
        Newsletter
      </p>
      <p className="font-body" style={{ fontSize: "0.82rem", color: C.inkMuted, marginBottom: "1rem", maxWidth: "400px", margin: "0 auto 1rem" }}>
        Neue Weine, Events und Angebote.
      </p>
      <RapidmailSignup compact />
    </div>
  );
}

// ── Siegel-Leiste ────────────────────────────────────────────
function SiegelSection() {
  const siegel = [
    { src: "/manus-storage/slowfood-genussfuehrer_bcdf713f.jpg", alt: "Slow Food Deutschland — Genussführer", label: "Slow Food Genussführer" },
    { src: "/manus-storage/nachhaltiges-reiseziel_b134e42a.png", alt: "Nachhaltiges Reiseziel — Partner", label: "Natürlich — Nachhaltiges Reiseziel" },
    { src: "/manus-storage/happycow-logo_b801cec6.png", alt: "HappyCow — gelistet", label: "Happy Cow" },
  ];

  return (
    <section className="winebar-paper" style={{ backgroundColor: C.paper, padding: "5rem 0", borderTop: `1px solid ${C.border}` }}>
      <div className="container">
        <p className="font-body" style={{ fontSize: "0.85rem", letterSpacing: "0.2em", textTransform: "uppercase", color: C.inkMuted, textAlign: "center", marginBottom: "2.5rem" }}>
          Unsere Werte & Zertifikate
        </p>
        <div className="siegel-grid" style={{ gap: "3rem" }}>
          {siegel.map((s, i) => (
            <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.75rem" }}>
              <img loading="lazy" src={s.src} alt={s.alt} title={s.label} style={{ maxHeight: "5rem" }} />
              <span className="font-body" style={{ fontSize: "0.72rem", letterSpacing: "0.1em", textTransform: "uppercase", color: C.inkMuted }}>{s.label}</span>
            </div>
          ))}
        </div>

        {/* Metro Gastropreis */}
        <div style={{ textAlign: "center", marginTop: "3rem", paddingTop: "2.5rem", borderTop: `1px solid ${C.border}` }}>
          <p className="font-display" style={{ fontSize: "clamp(1.1rem, 2vw, 1.4rem)", color: C.ink, marginBottom: "0.5rem" }}>
            METRO GastroPreis 2024 — Sieger Kategorie Nachhaltigkeit
          </p>
          <p className="font-body" style={{ fontSize: "0.8rem", color: C.inkMuted, lineHeight: 1.6 }}>
            Ausgezeichnet für bio-zertifizierte Küche, regionale Lieferketten & Zero-Waste-Konzept
          </p>
        </div>

        <p className="font-body" style={{ fontSize: "0.9rem", color: C.inkMuted, textAlign: "center", marginTop: "2.5rem", lineHeight: 1.7 }}>
          Biozertifiziert (DE-ÖKO-037) · AHVV Tierwohl · 100% Weiderind · Regional & Saisonal
        </p>
      </div>
    </section>
  );
}

// ── The One — Shop Teaser ─────────────────────────────────────
function TheOneSection() {
  return (
    <section className="winebar-dark" style={{ backgroundColor: C.dark, padding: "5rem 0" }}>
      <div className="container">
        <TheOneComingSoonContent />
      </div>
    </section>
  );
}

export default function Home() {
  useEffect(() => {
    const hash = window.location.hash;
    if (!hash) return;

    const targetId = decodeURIComponent(hash.slice(1));
    const scrollToTarget = () => {
      document.getElementById(targetId)?.scrollIntoView();
    };
    const firstFrame = requestAnimationFrame(scrollToTarget);
    const observer = new ResizeObserver(scrollToTarget);
    observer.observe(document.body);
    const stopObserving = window.setTimeout(() => observer.disconnect(), 2000);
    window.addEventListener("load", scrollToTarget, { once: true });
    document.fonts?.ready.then(scrollToTarget);

    return () => {
      cancelAnimationFrame(firstFrame);
      window.clearTimeout(stopObserving);
      observer.disconnect();
      window.removeEventListener("load", scrollToTarget);
    };
  }, []);

  return (
    <div className="winebar-home" style={{ backgroundColor: C.paper, minHeight: "100vh" }}>
      <Nav />
      <main>
        <Hero />
        {/* Shared Joujou family slogan — petit wording, restaurant typography */}
        <div className="winebar-paper" style={{ backgroundColor: C.paper, textAlign: "center", padding: "2.5rem 1.5rem" }}>
          <div className="family-slogan" aria-label="klein. fein. wein.">
            <span>klein.</span>
            <span>fein.</span>
            <span>wein.</span>
          </div>
        </div>
        <WeinkellerSection />
        <EssenSection />
        <GartenSection />
        <EventsSection />
        <ScheuneSection />
        <ReservierungUndGesellschaftenSection />
        <TheOneSection />
        <SiegelSection />
        <GalerieSection />
      </main>
      <Footer />
    </div>
  );
}
