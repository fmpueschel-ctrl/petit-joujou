/* ============================================================
   petit joujou — Weinbar · Leistadt, Pfalz
   klein · fein · wein
   ============================================================ */

import { useState } from "react";
import { toast } from "sonner";
import { trpc } from "@/lib/trpc";

// ── Weinbar-Palette (petit joujou) ──────────────────────────
// Neue Palette: Orange #ed7846 · Weinrot #7a1f2e · Anthrazit #2a2a2a
const C = {
  bg:          "#ffffff",   // reines Weiß
  bgSage:      "#f5f0ea",   // zartes Warm-Beige
  bgPeach:     "#fdf4ee",   // sehr helles Orange-Hauch
  bgLavender:  "#f5f0ea",   // Beige
  bgCream:     "#faf8f5",   // Cremeweiß
  ink:         "#2a2a2a",   // Anthrazit — Haupttext
  inkMid:      "#5a5550",   // Mittleres Warm-Grau
  inkLight:    "#9a9590",   // Helles Warm-Grau
  sage:        "#f0e8e0",   // sehr helles Beige
  sageDark:    "#ed7846",   // Orange — Hauptakzent (aus Illustration)
  peach:       "#f5c4a8",   // helles Orange
  peachDark:   "#ed7846",   // Orange — Akzentfarbe
  lavender:    "#fdf4ee",   // Orange-Hauch
  rose:        "#7a1f2e",   // Weinrot — zweiter Akzent
  hotpink:     "#ed7846",   // Orange (ersetzt Magenta)
  border:      "#e8ddd5",   // Warm-Beige-Border
  borderSage:  "#d4c8bc",   // Etwas dunklere Border
};

// ── Nav ──────────────────────────────────────────────────────
function Nav() {
  const [open, setOpen] = useState(false);
  const links = [
    { label: "Weinkeller", href: "#weinkeller" },
    { label: "Scheune", href: "#scheune" },
    { label: "Essen", href: "#essen" },
    { label: "Garten", href: "#garten" },
    { label: "Events", href: "#events" },
    { label: "Reservierung", href: "#reservierung" },
    { label: "Gesellschaften", href: "#gesellschaften" },
  ];
  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-50"
        style={{
          backgroundColor: "rgba(20,15,10,0.55)",
          backdropFilter: "blur(14px)",
          borderBottom: "1px solid rgba(255,255,255,0.1)",
        }}
      >
        <div className="container flex items-center justify-between" style={{ height: "60px" }}>
          <a href="#" style={{ textDecoration: "none" }}>
            <span className="font-script" style={{ fontSize: "1.7rem", color: "#ffffff", letterSpacing: "0.02em" }}>
              petit joujou
            </span>
          </a>

          <button
            onClick={() => setOpen(!open)}
            style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(255,255,255,0.8)", padding: "0.5rem", display: "flex", flexDirection: "column", gap: "5px", alignItems: "center", justifyContent: "center" }}
            aria-label="Menü"
          >
            {open ? (
              <span style={{ fontSize: "1.3rem", color: C.inkMid, lineHeight: 1 }}>✕</span>
            ) : (
              <>
                <span style={{ display: "block", width: "22px", height: "1.5px", backgroundColor: "rgba(255,255,255,0.8)" }} />
                <span style={{ display: "block", width: "22px", height: "1.5px", backgroundColor: "rgba(255,255,255,0.8)" }} />
                <span style={{ display: "block", width: "22px", height: "1.5px", backgroundColor: "rgba(255,255,255,0.8)" }} />
              </>
            )}
          </button>
        </div>
      </nav>
      {/* Fullscreen overlay menu */}
      {open && (
        <div
          style={{
            position: "fixed", inset: 0, zIndex: 49,
            backgroundColor: C.bg,
            display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center",
            gap: "2.5rem",
          }}
        >
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="font-display"
              style={{ fontSize: "clamp(1.8rem, 5vw, 2.8rem)", color: C.ink, textDecoration: "none", letterSpacing: "0.05em" }}
            >
              {l.label}
            </a>
          ))}
          <a
            href="#gesellschaften"
            onClick={() => setOpen(false)}
            className="font-body"
            style={{ marginTop: "1rem", padding: "0.85rem 2.5rem", backgroundColor: C.sageDark, color: "#fff", textDecoration: "none", fontSize: "0.8rem", letterSpacing: "0.15em", textTransform: "uppercase" }}
          >
            Anfragen
          </a>
        </div>
      )}
    </>
  );
}

// ── Hero (Split-Layout: Bild links, Content rechts) ─────────
function Hero() {
  return (
    <section style={{ backgroundColor: C.bg, padding: "0" }}>
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
          {/* Text-Overlay */}
          <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "3rem 2rem 2rem", background: "linear-gradient(to top, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.3) 50%, transparent 100%)", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
            <span className="font-script" style={{ fontSize: "clamp(2.2rem, 5vw, 3.5rem)", color: "#fff", lineHeight: 1.1 }}>
              petit joujou
            </span>
            <span className="font-body" style={{ fontSize: "0.7rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "rgba(255,255,255,0.8)", marginTop: "0.5rem" }}>
              Weinbar &middot; Leistadt &middot; Pfalz
            </span>
          </div>
        </div>

        {/* Rechts: klein · fein · wein + CTAs */}
        <div className="split-content" style={{ backgroundColor: C.bg, justifyContent: "center", alignItems: "flex-start" }}>
          {/* SEO H1 — visually hidden but accessible */}
          <h1 className="sr-only">petit joujou — Weinbar in Leistadt, Pfalz</h1>
          {/* klein · fein · wein — PROMINENT */}
          <div style={{ display: "flex", alignItems: "center", gap: "1.2rem", marginBottom: "2.5rem", flexWrap: "wrap" }}>
            <span className="font-script" style={{ fontSize: "clamp(2.5rem, 5.5vw, 4.2rem)", color: C.ink, lineHeight: 1 }}>klein</span>
            <span style={{ display: "inline-block", width: "6px", height: "6px", borderRadius: "50%", backgroundColor: C.ink, flexShrink: 0 }} />
            <span className="font-script" style={{ fontSize: "clamp(2.5rem, 5.5vw, 4.2rem)", color: C.peachDark, lineHeight: 1 }}>fein</span>
            <span style={{ display: "inline-block", width: "6px", height: "6px", borderRadius: "50%", backgroundColor: C.ink, flexShrink: 0 }} />
            <span className="font-script" style={{ fontSize: "clamp(2.5rem, 5.5vw, 4.2rem)", color: "#722F37", lineHeight: 1 }}>wein</span>
          </div>

          {/* Kurzbeschreibung */}
          <p className="font-body" style={{ fontSize: "1rem", color: C.inkMid, lineHeight: 1.85, marginBottom: "2.5rem", maxWidth: "380px" }}>
            Die Weinbar im Joujou. Wir möchten euch verzaubern. Schnappt euch eine Flasche Wein, genießt die Sharing-Kreationen von Chef Franz und vergesst einfach die Zeit.
          </p>

          {/* CTAs */}
          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            <a
              href="#reservierung"
              className="font-body"
              style={{
                display: "inline-block",
                padding: "0.75rem 2rem",
                backgroundColor: C.sageDark,
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
              href="/manus-storage/PetitJoujou_Speisekarte_Final5_eaf6392f.pdf"
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
          </div>

          {/* Zwei Pillars */}
          <div className="intro-pillars" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "0", marginTop: "3rem", borderTop: `1px solid ${C.border}`, width: "100%" }}>
            {[
              { title: "500 Weine — nur bio", text: "Begehbare Weinkarte im Gewölbekeller. Für überraschende Geschmackserlebnisse. Come in and wine out." },
              { title: "Essen ständig neu gedacht", text: "Raffinierte Sharing-Kreationen, Entrecôte-Streifen sowie Manna Palatina Pinsa — bio & saisonal." },
            ].map((p) => (
              <div key={p.title} style={{ padding: "1.5rem 1.2rem 1.5rem 0", borderRight: `1px solid ${C.border}` }}>
                <div className="font-display" style={{ fontSize: "0.9rem", color: C.ink, marginBottom: "0.5rem", letterSpacing: "0.03em" }}>{p.title}</div>
                <div className="font-body" style={{ fontSize: "0.78rem", color: C.inkMid, lineHeight: 1.7 }}>{p.text}</div>
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
    <section id="weinkeller" style={{ backgroundColor: "#1a1210", padding: "0" }}>
      <div className="split-section">
        {/* Links: Grosses Weinregal-Bild */}
        <img loading="lazy"
          src="/manus-storage/wine-shelf-buerklin_0ac797ee.webp"
          alt="Weinkeller — Dr. Bürklin-Wolf Riesling im Regal"
          className="split-image"
          style={{ objectPosition: "center 30%" }}
        />

        {/* Rechts: Text */}
        <div className="split-content" style={{ backgroundColor: "#1a1210" }}>
          <p className="font-body" style={{ fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase", color: C.sageDark, marginBottom: "1rem" }}>
            Der Keller
          </p>
          <h2 className="font-display" style={{ fontSize: "clamp(2rem, 4vw, 2.8rem)", color: "#f5f0ea", marginBottom: "1.25rem", lineHeight: 1.15 }}>
            Leidenschaftlich kuratiert.
          </h2>
          <p className="font-body" style={{ fontSize: "0.95rem", color: "rgba(245,240,234,0.7)", lineHeight: 1.85, marginBottom: "2rem" }}>
            Mareile & Frank gehen für euch ans Limit — für das spannendste Weinangebot.
          </p>
          {[
            "500 Weine & Bubbles",
            "Pfalz, Rheinhessen, Österreich, Frankreich — fertig",
            "Klassisch oder freak-show",
            "No chemical pesticides — nur bio",
            "Mitnehmen zu Kellerpreisen — oder hier trinken (10 € Korkgeld)",
            "Großes & spannendes Sortiment alkoholfrei und alkoholreduziert",
            "Hat jemand alkoholfrei gesagt?",
          ].map((item) => (
            <div key={item} style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem", marginBottom: "0.75rem" }}>
              <span style={{ color: C.sageDark, fontSize: "0.9rem", marginTop: "0.05rem", flexShrink: 0 }}>→</span>
              <span className="font-body" style={{ fontSize: "0.9rem", color: "rgba(245,240,234,0.7)", lineHeight: 1.6 }}>{item}</span>
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
    <section id="scheune" style={{ backgroundColor: C.bgSage, padding: "0" }}>
      <div className="split-section" style={{ direction: "rtl" }}>
        {/* Rechts: Grosses Scheune-Bild */}
        <img loading="lazy"
          src="/manus-storage/scheune_innen_tisch_48ac2208.webp"
          alt="Scheune — gedeckter Tisch unter historischem Dachstuhl"
          className="split-image"
          style={{ objectPosition: "center 25%" }}
        />

        {/* Links: Text */}
        <div className="split-content" style={{ backgroundColor: C.bgSage, direction: "ltr" }}>
          <p className="font-body" style={{ fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase", color: C.peachDark, marginBottom: "1rem" }}>
            Drinnen
          </p>
          <h2 className="font-display" style={{ fontSize: "clamp(2rem, 4vw, 2.8rem)", color: C.ink, marginBottom: "1.5rem", lineHeight: 1.15 }}>
            Die Scheune.<br />Euer Abend.
          </h2>
          <p className="font-body" style={{ fontSize: "1rem", color: C.inkMid, lineHeight: 1.85 }}>
            Alte Balken, flackerndes Kerzenlicht, Stimmengewirr und diese Stimmung, die man nicht planen kann — sie passiert einfach.
          </p>
        </div>
      </div>
    </section>
  );
}

// ── Garten ────────────────────────────────────────────────────
function GartenSection() {
  return (
    <section id="garten" style={{ backgroundColor: C.bgSage, padding: "0" }}>
      <div className="split-section">
        {/* Links: Grosses Terrassen-Bild mit Gästen */}
        <img loading="lazy"
          src="/manus-storage/garden-terrace_ece44896.webp"
          alt="Garten — Terrasse voller Gäste unter Sonnenschirmen mit Zypressen"
          className="split-image"
          style={{ objectPosition: "center 70%" }}
        />

        {/* Rechts: Text */}
        <div className="split-content" style={{ backgroundColor: C.bgSage }}>
          <p className="font-body" style={{ fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase", color: C.peachDark, marginBottom: "1rem" }}>
            Draußen
          </p>
          <h2 className="font-display" style={{ fontSize: "clamp(2rem, 4vw, 2.8rem)", color: C.ink, marginBottom: "1.5rem", lineHeight: 1.15 }}>
            Wein unter freiem Himmel
          </h2>
          <p className="font-body" style={{ fontSize: "1rem", color: C.inkMid, lineHeight: 1.85, marginBottom: "1.5rem", fontStyle: "italic" }}>
            „Die beiden Gärten haben etwas Magisches. Manch ein Gast genießt die Ruhe und liest ein Buch. Andere sitzen versteckt im Eck und schauen sich verliebt in die Augen. Gruppen an Freunden, die lachen, und am langen Hochtisch lernen sich Leute kennen und werden Freunde. Für einen Tag oder ein ganzes Leben. Wein fließt, das Essen fasziniert — und ihr vergesst die Zeit.“
          </p>
          <p className="font-body" style={{ fontSize: "0.85rem", color: C.ink, marginBottom: "2rem" }}>
            — Frank
          </p>
          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            {["Hunde willkommen", "Weinfreaks auch"].map((tag) => (
              <span key={tag} className="font-body" style={{ padding: "0.4rem 0.9rem", backgroundColor: C.sage, color: C.ink, fontSize: "0.72rem", letterSpacing: "0.06em" }}>
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Events ────────────────────────────────────────────────────
function EventsSection() {
  return (
    <section id="events" style={{ backgroundColor: "#1a1210", padding: "6rem 0" }}>
      <div className="container">
        <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
          <p className="font-body" style={{ fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase", color: C.sageDark, marginBottom: "0.75rem" }}>
            Was passiert
          </p>
          <h2 className="font-display" style={{ fontSize: "clamp(2rem, 4vw, 2.8rem)", color: "#f5f0ea" }}>
            Events & Abende
          </h2>
          <p className="font-body" style={{ fontSize: "0.95rem", color: "rgba(245,240,234,0.7)", marginTop: "1rem", maxWidth: "500px", margin: "1rem auto 0" }}>
            Ausgesuchte Abende mit ausgesuchten Winzern.
            Tickets sind begrenzt.
          </p>
        </div>

        {/* Aktuelle Events */}
        <div className="events-grid" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "2rem" }}>

          {/* BEATS petit joujou */}
          <div style={{ backgroundColor: "#2a1e1a", overflow: "hidden" }}>
            <img loading="lazy"
              src="/manus-storage/screenshot_beats_8be8965a.webp"
              alt="BEATS petit joujou — DJ Marcel Ullrich"
              className="event-img"
              style={{ width: "100%", height: "360px", objectFit: "cover", objectPosition: "center top", display: "block" }}
            />
            <div style={{ padding: "1.25rem 1.5rem" }}>
              <p className="font-body" style={{ fontSize: "0.65rem", letterSpacing: "0.15em", textTransform: "uppercase", color: C.sageDark, marginBottom: "0.4rem" }}>Joujou After Work · ab 18:00 Uhr</p>
              <p className="font-display" style={{ fontSize: "1.3rem", color: "#f5f0ea", marginBottom: "0.3rem" }}>BEATS petit joujou</p>
              <p className="font-body" style={{ fontSize: "0.85rem", color: "rgba(245,240,234,0.6)", marginBottom: "0.5rem" }}>DJ Marcel Ullrich</p>
              <p className="font-body" style={{ fontSize: "0.82rem", color: C.peachDark, fontWeight: 600 }}>11.06. · 16.07. · 13.08.2026</p>
              <p className="font-body" style={{ fontSize: "0.78rem", color: "rgba(245,240,234,0.5)", marginTop: "0.3rem" }}>Kostenlos · Eintritt frei</p>
            </div>
          </div>

          {/* TAVOLA BEATS */}
          <div style={{ backgroundColor: "#2a1e1a", overflow: "hidden" }}>
            <img loading="lazy"
              src="/manus-storage/tavola_beats_70e575c5.webp"
              alt="TAVOLA BEATS — Apéro, Wines, Food & Italo Beats"
              className="event-img"
              style={{ width: "100%", height: "420px", objectFit: "contain", objectPosition: "center center", display: "block", backgroundColor: "#fddde0" }}
            />
            <div style={{ padding: "1.25rem 1.5rem" }}>
              <p className="font-body" style={{ fontSize: "0.65rem", letterSpacing: "0.15em", textTransform: "uppercase", color: C.sageDark, marginBottom: "0.4rem" }}>Sa, 08. August · 16:00–22:00 Uhr</p>
              <p className="font-display" style={{ fontSize: "1.3rem", color: "#f5f0ea", marginBottom: "0.3rem" }}>TAVOLA BEATS</p>
              <p className="font-body" style={{ fontSize: "0.82rem", color: C.peachDark, fontWeight: 600, marginBottom: "0.5rem" }}>59 € p.P. · inkl. Aperitif, Food & Wines</p>
              <a href="https://services.gastronovi.com/restaurants/68135/reservierung/widget?entry=ordering#1" target="_blank" rel="noopener noreferrer"
                style={{ display: "inline-block", padding: "0.6rem 1.4rem", backgroundColor: C.sageDark, color: "#fddde0", fontSize: "0.75rem", letterSpacing: "0.12em", textTransform: "uppercase", textDecoration: "none", fontFamily: "inherit" }}>
                Tickets buchen
              </a>
            </div>
          </div>

          {/* Joujou Groovt */}
          <div style={{ backgroundColor: "#2a1e1a", overflow: "hidden" }}>
            <div style={{ height: "280px", backgroundColor: "#3a2820", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "2rem", textAlign: "center" }}>
              <p className="font-body" style={{ fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(245,240,234,0.6)", marginBottom: "0.75rem" }}>Jeden letzten Donnerstag · 18:00–21:30 Uhr</p>
              <p className="font-display" style={{ fontSize: "clamp(1.6rem, 3vw, 2.2rem)", color: "#f5f0ea", lineHeight: 1.1, marginBottom: "0.5rem" }}>Joujou Groovt</p>
              <p className="font-body" style={{ fontSize: "0.85rem", color: "rgba(245,240,234,0.7)", fontStyle: "italic", marginBottom: "1rem" }}>Live-Musik & Genuss</p>
              <p className="font-body" style={{ fontSize: "0.82rem", color: C.peachDark, fontWeight: 600 }}>30.07. · 27.08.2026</p>
            </div>
            <div style={{ padding: "1.25rem 1.5rem" }}>
              <p className="font-body" style={{ fontSize: "0.8rem", color: "rgba(245,240,234,0.65)", marginBottom: "0.75rem" }}>Live-Musik-Acts, Spritz, Schorle, Wein — entspannte Sommerabende im Joujou.</p>
              <a href="https://services.gastronovi.com/restaurants/68135/reservation/widget/entry/reservation" target="_blank" rel="noopener noreferrer"
                style={{ display: "inline-block", padding: "0.6rem 1.4rem", backgroundColor: C.peachDark, color: "#fff", fontSize: "0.75rem", letterSpacing: "0.12em", textTransform: "uppercase", textDecoration: "none", fontFamily: "inherit" }}>
                Tisch reservieren
              </a>
            </div>
          </div>

          {/* Herbstmarkt */}
          <div style={{ backgroundColor: "#2a1e1a", overflow: "hidden" }}>
            <div style={{ height: "280px", backgroundColor: "#c8a96e", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "2rem", textAlign: "center" }}>
              <p className="font-body" style={{ fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.75)", marginBottom: "0.75rem" }}>03.10. + 04.10.2026 · ab 12:00 Uhr</p>
              <p className="font-display" style={{ fontSize: "clamp(1.6rem, 3vw, 2.2rem)", color: "#fff", lineHeight: 1.1, marginBottom: "0.5rem" }}>Herbstmarkt</p>
              <p className="font-body" style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.85)", fontStyle: "italic" }}>Markt der achtsamen Dinge</p>
            </div>
            <div style={{ padding: "1.25rem 1.5rem" }}>
              <p className="font-body" style={{ fontSize: "0.8rem", color: "rgba(245,240,234,0.65)", marginBottom: "0.75rem" }}>Regionale Aussteller, Handwerkskunst, Bio-Leckereien und musikalische Begleitung — zwei Tage Herbstzauber.</p>
              <p className="font-body" style={{ fontSize: "0.78rem", color: C.sageDark, fontWeight: 600 }}>Eintritt frei</p>
            </div>
          </div>

        </div>

        <div style={{ textAlign: "center", marginTop: "2.5rem" }}>
          <p className="font-body" style={{ fontSize: "0.85rem", color: "rgba(245,240,234,0.6)" }}>
            Aktuelle Events & Tickets auf{" "}
            <a href="https://www.instagram.com/joujou.bistro" target="_blank" rel="noopener noreferrer" style={{ color: C.peachDark, textDecoration: "none", fontWeight: 600, display: "inline-flex", alignItems: "center", gap: "0.35rem" }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
              joujou.bistro
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}

// ── Reservierung ─────────────────────────────────────────────
function ReservierungSection() {
  return (
    <section id="reservierung" style={{ backgroundColor: C.bgCream, padding: "6rem 0" }}>
      <div className="container">
        <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
          <p className="font-body" style={{ fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase", color: C.sageDark, marginBottom: "0.75rem" }}>
            Tisch reservieren
          </p>
          <h2 className="font-display" style={{ fontSize: "clamp(2rem, 4vw, 2.8rem)", color: C.ink }}>
            Weinbar
          </h2>
          <p className="font-body" style={{ fontSize: "0.95rem", color: C.inkMid, marginTop: "1rem", maxWidth: "500px", margin: "1rem auto 0" }}>
            Do & Fr ab 16:00 Uhr · Sa & So ab 12:00 Uhr. Reserviert euren Platz.
          </p>
        </div>

        <div style={{ maxWidth: "700px", margin: "0 auto", backgroundColor: C.bg, border: `1px solid ${C.border}`, overflow: "hidden" }}>
          <iframe
            src="https://services.gastronovi.com/restaurants/68135/reservation/widget/entry/reservation?area=Joujou+Weinbar"
            title="Gastronovi Reservierung — Joujou Weinbar"
            style={{ width: "100%", height: "600px", border: "none" }}
            loading="lazy"
          />
        </div>

        <p className="font-body" style={{ fontSize: "0.75rem", color: C.inkLight, textAlign: "center", marginTop: "1.5rem" }}>
          Reservierung via Gastronovi. Alternativ:{" "}
          <a
            href="https://services.gastronovi.com/restaurants/68135/reservation/widget/entry/reservation?area=Joujou+Weinbar"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: C.sageDark, textDecoration: "none" }}
          >
            In neuem Tab öffnen
          </a>
        </p>
      </div>
    </section>
  );
}

// ── Gesellschaften ────────────────────────────────────────────
function GesellschaftenSection() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", anlass: "", gaeste: "", datum: "", budget: "", nachricht: "" });
  const [sent, setSent] = useState(false);

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
    <section id="gesellschaften" className="split-section">
      {/* Left: Chef Franz Rank Bild */}
      <div className="split-image">
        <img loading="lazy"
          src="/manus-storage/chef-franz-rank_43086e69.webp"
          alt="Chef Franz Rank beim Joujou BBQ-Event"
          style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 30%", transform: "scale(1.3)", transformOrigin: "center 30%" }}
        />
        <p className="font-body" style={{ position: "absolute", bottom: 0, left: 0, right: 0, fontSize: "0.7rem", color: C.bg, fontStyle: "italic", margin: 0, padding: "0.5rem 1rem", background: "linear-gradient(transparent, rgba(0,0,0,0.5))" }}>
          Chef Franz Rank beim Joujou BBQ-Event
        </p>
      </div>

      {/* Right: Content + Form */}
      <div className="split-content" style={{ backgroundColor: C.bgLavender }}>
        <div style={{ maxWidth: "32rem" }}>
          <p className="font-body" style={{ fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase", color: C.sageDark, marginBottom: "1rem" }}>
            Private Abende
          </p>
          <h2 className="font-display" style={{ fontSize: "clamp(2rem, 4vw, 2.8rem)", color: C.ink, marginBottom: "1.5rem", lineHeight: 1.25 }}>
            Euer Abend.<br />Unsere Bühne.
          </h2>
          <p className="font-body" style={{ fontSize: "1rem", color: C.inkMid, lineHeight: 1.85, marginBottom: "2rem" }}>
            Euer Geburtstag im Kerzenschein, ein Firmenabend, der kein Firmenabend sein soll, oder einfach ein Grund zum Feiern. Schreibt uns — wir machen den Rest.
          </p>

          {/* Occasion types */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "2rem" }}>
            {[
              { label: "Weinabende", sub: "Privat & exklusiv" },
              { label: "Geburtstage", sub: "Kleine Runden" },
              { label: "Firmen", sub: "Teamabende & Dinners" },
              { label: "Hochzeiten", sub: "Auf Anfrage" },
            ].map((o) => (
              <div key={o.label} style={{ backgroundColor: C.bg, padding: "1.25rem", borderLeft: `3px solid ${C.sageDark}` }}>
                <div>
                  <div className="font-display" style={{ fontSize: "0.95rem", color: C.ink }}>{o.label}</div>
                  <div className="font-body" style={{ fontSize: "0.75rem", color: C.inkLight }}>{o.sub}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Key promise */}
          <div style={{ backgroundColor: C.bg, padding: "1.5rem", borderLeft: `4px solid ${C.sageDark}`, marginBottom: "2.5rem" }}>
            <p className="font-body" style={{ fontSize: "0.9rem", color: C.inkMid, lineHeight: 1.7, fontStyle: "italic" }}>
              „Wir lieben Feiern und gesellige Runden. Wir versuchen immer, unser Angebot an eure Möglichkeiten und Wünsche anzupassen. Sprecht uns super gerne einfach an."
            </p>
          </div>

          {/* Form */}
          <div style={{ backgroundColor: C.bg, padding: "2rem" }}>
            {sent ? (
              <div style={{ textAlign: "center", padding: "3rem 1rem" }}>
                <div style={{ width: "3rem", height: "2px", backgroundColor: C.sageDark, margin: "0 auto 1.5rem" }} />
                <h3 className="font-display" style={{ fontSize: "1.6rem", color: C.ink, marginBottom: "1rem" }}>
                  Anfrage erhalten.
                </h3>
                <p className="font-body" style={{ fontSize: "0.95rem", color: C.inkMid, lineHeight: 1.7 }}>
                  Wir melden uns innerhalb von 24 Stunden bei euch. Versprochen.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <h3 className="font-display" style={{ fontSize: "1.4rem", color: C.ink, marginBottom: "0.5rem" }}>
                  Anfrage stellen
                </h3>
                <p className="font-body" style={{ fontSize: "0.82rem", color: C.inkLight, marginBottom: "2rem" }}>
                  Kein Formular-Friedhof — nur das Wichtigste.
                </p>

                {/* Name + Email */}
                <div className="form-2col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1rem" }}>
                  <div>
                    <label htmlFor="ges-name" className="font-body" style={{ fontSize: "0.68rem", letterSpacing: "0.1em", textTransform: "uppercase", color: C.inkMid, display: "block", marginBottom: "0.4rem" }}>Name *</label>
                    <input
                      id="ges-name"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      style={{ width: "100%", padding: "0.7rem 0.9rem", border: `1px solid ${C.border}`, backgroundColor: C.bgCream, fontSize: "0.9rem", color: C.ink, outline: "none", fontFamily: "inherit" }}
                      placeholder="Euer Name"
                    />
                  </div>
                  <div>
                    <label htmlFor="ges-email" className="font-body" style={{ fontSize: "0.68rem", letterSpacing: "0.1em", textTransform: "uppercase", color: C.inkMid, display: "block", marginBottom: "0.4rem" }}>E-Mail *</label>
                    <input
                      id="ges-email"
                      required
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      style={{ width: "100%", padding: "0.7rem 0.9rem", border: `1px solid ${C.border}`, backgroundColor: C.bgCream, fontSize: "0.9rem", color: C.ink, outline: "none", fontFamily: "inherit" }}
                      placeholder="email@beispiel.de"
                    />
                  </div>
                </div>

                {/* Anlass + Gäste */}
                <div className="form-2col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1rem" }}>
                  <div>
                    <label htmlFor="ges-anlass" className="font-body" style={{ fontSize: "0.68rem", letterSpacing: "0.1em", textTransform: "uppercase", color: C.inkMid, display: "block", marginBottom: "0.4rem" }}>Anlass</label>
                    <select
                      id="ges-anlass"
                      value={form.anlass}
                      onChange={(e) => setForm({ ...form, anlass: e.target.value })}
                      style={{ width: "100%", padding: "0.7rem 0.9rem", border: `1px solid ${C.border}`, backgroundColor: C.bgCream, fontSize: "0.9rem", color: form.anlass ? C.ink : C.inkLight, outline: "none", fontFamily: "inherit" }}
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
                    <label htmlFor="ges-gaeste" className="font-body" style={{ fontSize: "0.68rem", letterSpacing: "0.1em", textTransform: "uppercase", color: C.inkMid, display: "block", marginBottom: "0.4rem" }}>Gästeanzahl</label>
                    <select
                      id="ges-gaeste"
                      value={form.gaeste}
                      onChange={(e) => setForm({ ...form, gaeste: e.target.value })}
                      style={{ width: "100%", padding: "0.7rem 0.9rem", border: `1px solid ${C.border}`, backgroundColor: C.bgCream, fontSize: "0.9rem", color: form.gaeste ? C.ink : C.inkLight, outline: "none", fontFamily: "inherit" }}
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
                <div className="form-2col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1rem" }}>
                  <div>
                    <label htmlFor="ges-datum" className="font-body" style={{ fontSize: "0.68rem", letterSpacing: "0.1em", textTransform: "uppercase", color: C.inkMid, display: "block", marginBottom: "0.4rem" }}>Wunschdatum</label>
                    <input
                      id="ges-datum"
                      type="date"
                      value={form.datum}
                      onChange={(e) => setForm({ ...form, datum: e.target.value })}
                      style={{ width: "100%", padding: "0.7rem 0.9rem", border: `1px solid ${C.border}`, backgroundColor: C.bgCream, fontSize: "0.9rem", color: C.ink, outline: "none", fontFamily: "inherit" }}
                    />
                  </div>
                  <div>
                    <label htmlFor="ges-telefon" className="font-body" style={{ fontSize: "0.68rem", letterSpacing: "0.1em", textTransform: "uppercase", color: C.inkMid, display: "block", marginBottom: "0.4rem" }}>Telefon</label>
                    <input
                      id="ges-telefon"
                      type="tel"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      style={{ width: "100%", padding: "0.7rem 0.9rem", border: `1px solid ${C.border}`, backgroundColor: C.bgCream, fontSize: "0.9rem", color: C.ink, outline: "none", fontFamily: "inherit" }}
                      placeholder="+49..."
                    />
                  </div>
                </div>

                {/* Nachricht */}
                <div style={{ marginBottom: "1.5rem" }}>
                  <label htmlFor="ges-nachricht" className="font-body" style={{ fontSize: "0.68rem", letterSpacing: "0.1em", textTransform: "uppercase", color: C.inkMid, display: "block", marginBottom: "0.4rem" }}>Eure Wünsche & Budget-Vorstellung</label>
                  <textarea
                    id="ges-nachricht"
                    value={form.nachricht}
                    onChange={(e) => setForm({ ...form, nachricht: e.target.value })}
                    rows={4}
                    style={{ width: "100%", padding: "0.7rem 0.9rem", border: `1px solid ${C.border}`, backgroundColor: C.bgCream, fontSize: "0.9rem", color: C.ink, outline: "none", fontFamily: "inherit", resize: "vertical" }}
                    placeholder="Was stellt ihr euch vor?"
                  />
                </div>

                <button
                  type="submit"
                  disabled={anfrageMutation.isPending}
                  className="font-body"
                  style={{ width: "100%", padding: "1rem", backgroundColor: anfrageMutation.isPending ? C.sage : C.peachDark, color: C.bg, border: "none", fontSize: "0.8rem", letterSpacing: "0.12em", textTransform: "uppercase", cursor: anfrageMutation.isPending ? "not-allowed" : "pointer" }}
                >
                  {anfrageMutation.isPending ? "Wird gesendet..." : "Anfrage absenden"}
                </button>

              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Essen ───────────────────────────────────────────────────
function EssenSection() {
  const gerichte = [
    {
      label: "Weinbegleiter",
      name: "Dirty Date",
      desc: "Dattel · Speck · Salzmandel",
      img: "/manus-storage/dirty_date_6050d05f.webp",
    },
    {
      label: "Weinbegleiter",
      name: "Happy Fried Mushroom",
      desc: "Gegrillter Romanasalat · Limette",
      img: "/manus-storage/happy_fried_mushroom_dac2adf9.webp",
    },
    {
      label: "Weinbegleiter",
      name: "Wurst Case",
      desc: "Dürkheimer Wildwurst-Cubes · Tomatensauce",
      img: "/manus-storage/wurst_case_33c8e650.webp",
    },
  ];

  return (
    <section id="essen" style={{ backgroundColor: "#1a1210", padding: "7rem 0" }}>
      <div className="container">

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "5rem" }}>
          <p className="font-body" style={{ fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase", color: C.peachDark, marginBottom: "1rem" }}>
            Alles bio. Alles echt.
          </p>
          <h2 className="font-display" style={{ fontSize: "clamp(2rem, 4vw, 2.8rem)", color: "#f5f0ea", marginBottom: "1rem" }}>
            Zum Teilen, Sattwerden & <span style={{ color: C.peachDark, fontStyle: "italic" }}>Staunen</span>
          </h2>
          <p className="font-body" style={{ fontSize: "1rem", color: "rgba(245,240,234,0.7)", maxWidth: "560px", margin: "0 auto 2rem", lineHeight: 1.8 }}>
            Franz erschafft ständig raffinierte saisonale Kreationen. Der Aha-Moment ist bei uns normal. Weil wir Genuss & das Außergewöhnliche beim Essen genauso lieben wie beim Wein. Bonne dégustation.
          </p>
          <a
            href="/manus-storage/PetitJoujou_Speisekarte_Final5_eaf6392f.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="font-body"
            style={{
              display: "inline-block",
              padding: "0.65rem 1.8rem",
              border: `1px solid ${C.sageDark}`,
              color: C.sageDark,
              fontSize: "0.78rem",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              textDecoration: "none",
            }}
          >
            Speisekarte ansehen
          </a>
        </div>

        {/* Sharing-Kreationen — 3 Gerichte nebeneinander */}
        <p className="font-body" style={{ fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(245,240,234,0.5)", textAlign: "center", marginBottom: "2.5rem" }}>
          Eine Auswahl
        </p>
        <div className="essen-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "2.5rem", marginBottom: "6rem" }}>
          {gerichte.map((g) => (
            <div key={g.name}>
              <div style={{ overflow: "hidden", marginBottom: "1.25rem" }}>
                <img loading="lazy"
                  src={g.img}
                  alt={g.name}
                  style={{ width: "100%", height: "320px", objectFit: "cover", objectPosition: "center", display: "block" }}
                />
              </div>
              <p className="font-body" style={{ fontSize: "0.65rem", letterSpacing: "0.18em", textTransform: "uppercase", color: C.peachDark, marginBottom: "0.4rem" }}>
                {g.label}
              </p>
              <h3 className="font-display" style={{ fontSize: "1.4rem", color: "#f5f0ea", marginBottom: "0.4rem" }}>
                {g.name}
              </h3>
              <p className="font-body" style={{ fontSize: "0.85rem", color: "rgba(245,240,234,0.7)", lineHeight: 1.7, marginBottom: "0.6rem" }}>
                {g.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Drei Hauptgerichte — gleichberechtigtes 3er-Grid */}
        <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: "5rem" }}>
          <div className="hauptgerichte-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "2.5rem" }}>
            {/* Sharing-Kreationen */}
            <div>
              <div style={{ overflow: "hidden", marginBottom: "1.5rem" }}>
                <img loading="lazy"
                  src="/manus-storage/sharing-plate_c60cc98c.webp"
                  alt="Sharing-Teller mit Weinglas — saisonale Kreation auf Keramik"
                  style={{ width: "100%", height: "320px", objectFit: "cover", objectPosition: "center center", display: "block" }}
                />
              </div>
              <p className="font-body" style={{ fontSize: "0.65rem", letterSpacing: "0.18em", textTransform: "uppercase", color: C.peachDark, marginBottom: "0.5rem" }}>
                Aus der Küche
              </p>
              <h3 className="font-display" style={{ fontSize: "clamp(1.4rem, 2.5vw, 1.8rem)", color: "#f5f0ea", marginBottom: "0.75rem", lineHeight: 1.15 }}>
                Sharing-Kreationen
              </h3>
              <p className="font-body" style={{ fontSize: "0.9rem", color: "rgba(245,240,234,0.7)", lineHeight: 1.75 }}>
                Saisonale Teller zum Teilen — raffiniert, bio, auf den Punkt.
              </p>
            </div>

            {/* Manna Palatina Pinsa */}
            <div>
              <div style={{ overflow: "hidden", marginBottom: "1.5rem" }}>
                <img loading="lazy"
                  src="/manus-storage/pinsa-pastrami-notable_48b3aa52.webp"
                  alt="Manna Palatina Pinsa — knusprig vom Holzbrett"
                  style={{ width: "100%", height: "320px", objectFit: "cover", objectPosition: "center center", display: "block" }}
                />
              </div>
              <p className="font-body" style={{ fontSize: "0.65rem", letterSpacing: "0.18em", textTransform: "uppercase", color: C.peachDark, marginBottom: "0.5rem" }}>
                Vom Holzbrett
              </p>
              <h3 className="font-display" style={{ fontSize: "clamp(1.4rem, 2.5vw, 1.8rem)", color: "#f5f0ea", marginBottom: "0.75rem", lineHeight: 1.15 }}>
                Manna Palatina Pinsa
              </h3>
              <p className="font-body" style={{ fontSize: "0.9rem", color: "rgba(245,240,234,0.7)", lineHeight: 1.75 }}>
                Knusprig, leicht, mit Belag der Saison. Die bessere Pizza.
              </p>
            </div>

            {/* Entrecôte */}
            <div>
              <div style={{ overflow: "hidden", marginBottom: "1.5rem" }}>
                <img loading="lazy"
                  src="/manus-storage/entrecote_zoom_d4e27da5.webp"
                  alt="Entrecôte — Land.luft Premium Dry Age"
                  style={{ width: "100%", height: "320px", objectFit: "cover", objectPosition: "center 35%", display: "block", transform: "scale(1.7)", transformOrigin: "center 40%" }}
                />
              </div>
              <p className="font-body" style={{ fontSize: "0.65rem", letterSpacing: "0.18em", textTransform: "uppercase", color: C.peachDark, marginBottom: "0.5rem" }}>
                Pimp it up
              </p>
              <h3 className="font-display" style={{ fontSize: "clamp(1.4rem, 2.5vw, 1.8rem)", color: "#f5f0ea", marginBottom: "0.75rem", lineHeight: 1.15 }}>
                Entrecôte
              </h3>
              <p className="font-body" style={{ fontSize: "0.9rem", color: "rgba(245,240,234,0.7)", lineHeight: 1.75 }}>
                Land.luft Premium Dry Age — trocken gereift, auf den Punkt. In Portionen à 100g.
              </p>
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
    { src: "/manus-storage/scheune_innen_tisch_48ac2208.webp", alt: "Scheune — gedeckter Tisch", caption: "Scheune" },
    { src: "/manus-storage/pj-keller-innen3-sharp_214c0cfa.webp", alt: "Weinkeller", caption: "Weinkeller" },
    { src: "/manus-storage/weinglaeserfass_fix_9b22d6a7.webp", alt: "Weingläser auf dem Fass", caption: "Atmosphäre" },
    { src: "/manus-storage/garten_lounge2_920a5dfa.webp", alt: "Garten Lounge", caption: "Garten" },
    { src: "/manus-storage/eingang_schnee_6c82eeca.webp", alt: "Eingang bei Schnee", caption: "Eingang" },
    { src: "/manus-storage/joujou_schild_fix_12020ddf.webp", alt: "joujou Schild", caption: "joujou" },
  ];

  return (
    <section style={{ backgroundColor: C.bgSage, padding: "5rem 0" }}>
      <div className="container">
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <h2 className="font-display" style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.5rem)", color: C.ink }}>
            Einblicke
          </h2>
          <div style={{ width: "3rem", height: "1px", backgroundColor: C.peachDark, margin: "1rem auto 0" }} />
        </div>
        <div className="galerie-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "0.5rem" }}>
          {photos.map((p, i) => (
            <div key={i} style={{ position: "relative", overflow: "hidden" }}>
              <img loading="lazy"
                src={p.src}
                alt={p.alt}
                className={i >= 3 ? "galerie-small-img" : ""}
                style={{ width: "100%", height: i < 3 ? "300px" : "200px", objectFit: "cover", objectPosition: i === 2 ? "center bottom" : "center", display: "block", filter: "saturate(0.85)" }}
              />
              <div style={{ position: "absolute", bottom: "0.75rem", left: "0.75rem", backgroundColor: "rgba(253,221,224,0.88)", padding: "0.2rem 0.65rem" }}>
                <span className="font-body" style={{ fontSize: "0.62rem", letterSpacing: "0.1em", textTransform: "uppercase", color: C.inkMid }}>
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
    <footer style={{ backgroundColor: "#2a2a2a", padding: "4rem 0 3rem" }}>
      <div className="container">
        <div className="footer-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "3rem", marginBottom: "3rem" }}>
          <div>
            <span className="font-script" style={{ fontSize: "2rem", color: "#ed7846" }}>
              petit joujou
            </span>
            <p className="font-body" style={{ fontSize: "0.85rem", color: "rgba(250,248,245,0.6)", marginTop: "0.75rem", lineHeight: 1.7 }}>
              Weinbar Leistadt Pfalz<br />
              Eine Marke von Joujou Pfalz
            </p>
          </div>
          <div>
            <p className="font-body" style={{ fontSize: "0.7rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(250,248,245,0.45)", marginBottom: "1rem" }}>
              Öffnungszeiten
            </p>
            {[
              ["Do – Fr", "ab 16 Uhr"],
              ["Sa – So", "ab 12 Uhr"],
              ["Mo – Mi", "geschlossen"],
            ].map(([day, time]) => (
              <div key={day} style={{ display: "flex", gap: "0.75rem", marginBottom: "0.4rem" }}>
                <span className="font-body" style={{ fontSize: "0.85rem", color: "rgba(250,248,245,0.6)", minWidth: "5rem" }}>{day}</span>
                <span className="font-body" style={{ fontSize: "0.85rem", color: "#ed7846" }}>{time}</span>
              </div>
            ))}
          </div>
          <div>
            <p className="font-body" style={{ fontSize: "0.7rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(250,248,245,0.45)", marginBottom: "1rem" }}>
              Kontakt
            </p>
            <p className="font-body" style={{ fontSize: "0.85rem", color: "rgba(250,248,245,0.6)", lineHeight: 1.8 }}>
              Leistadt Pfalz<br />
              <a href="tel:+4963229899797" style={{ color: "#ed7846", textDecoration: "none" }}>
                06322 / 989 97 97
              </a><br />
              <a href="mailto:hallo@joujou-pfalz.de" style={{ color: "#ed7846", textDecoration: "none" }}>
                hallo@joujou-pfalz.de
              </a><br />
              <a href="https://www.instagram.com/joujou.bistro" target="_blank" rel="noopener noreferrer" style={{ color: "#ed7846", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "0.35rem" }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
                joujou.bistro
              </a>
            </p>
          </div>
        </div>
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: "1.5rem", textAlign: "center" }}>
          <p className="font-body" style={{ fontSize: "0.72rem", color: "rgba(250,248,245,0.45)", letterSpacing: "0.05em" }}>
            © 2026 petit joujou · Joujou Pfalz ·{" "}
            <a href="/impressum" style={{ color: "#ed7846", textDecoration: "none" }}>Impressum</a>{" · "}
            <a href="/datenschutz" style={{ color: "#ed7846", textDecoration: "none" }}>Datenschutz</a>
          </p>
          <p className="font-body" style={{ fontSize: "0.72rem", color: "rgba(250,248,245,0.45)", letterSpacing: "0.05em", marginTop: "0.5rem" }}>
            Unsere weiteren Angebote findest du auf:{" "}
            <a href="https://www.joujou-pfalz.de" target="_blank" rel="noopener noreferrer" style={{ color: "#ed7846", textDecoration: "none" }}>www.joujou-pfalz.de</a>
          </p>
        </div>
      </div>
    </footer>
  );
}

// ── Page ──────────────────────────────────────────────────────
// ── Siegel-Leiste ────────────────────────────────────────────
function SiegelSection() {
  return (
    <section style={{ backgroundColor: C.bg, padding: "5rem 0", borderTop: `1px solid ${C.border}` }}>
      <div className="container">
        <p className="font-body" style={{ fontSize: "0.85rem", letterSpacing: "0.2em", textTransform: "uppercase", color: C.inkMid, textAlign: "center", marginBottom: "2.5rem" }}>
          Unsere Werte & Zertifikate
        </p>
        <div className="siegel-grid" style={{ gap: "3rem" }}>
          <img loading="lazy" src="/manus-storage/slowfood-genussfuehrer_bcdf713f.jpg" alt="Slow Food Deutschland — Genussführer" title="Slow Food Genussführer" style={{ maxHeight: "5rem" }} />
          <img loading="lazy" src="/manus-storage/nachhaltiges-reiseziel_b134e42a.png" alt="Nachhaltiges Reiseziel — Partner" title="Nachhaltiges Reiseziel Deutsche Weinstraße" style={{ maxHeight: "5rem" }} />
          <img loading="lazy" src="/manus-storage/happycow-logo_b801cec6.png" alt="HappyCow — gelistet" title="HappyCow" style={{ maxHeight: "5rem" }} />
        </div>
        <p className="font-body" style={{ fontSize: "0.9rem", color: C.inkMid, textAlign: "center", marginTop: "2rem", lineHeight: 1.7 }}>
          Biozertifiziert (DE-ÖKO-037) · AHVV Tierwohl · 100% Weiderind · Regional & Saisonal
        </p>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <div style={{ backgroundColor: C.bg, minHeight: "100vh" }}>
      <main>
        <Hero />
        <WeinkellerSection />
        <GartenSection />
        <EssenSection />
        <EventsSection />
        <ScheuneSection />
        <ReservierungSection />
        <GesellschaftenSection />
        <SiegelSection />
        <GalerieSection />
      </main>
      <Footer />
    </div>
  );
}
