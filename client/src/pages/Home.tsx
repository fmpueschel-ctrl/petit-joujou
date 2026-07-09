/* ============================================================
   petit joujou — Weinbar · Leistadt · Pfalz
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

// ── Hero ─────────────────────────────────────────────────────
function Hero() {
  return (
    <>
      {/* Hero: Vollbild-Nachtfoto mit großer Schrift */}
      <section style={{ position: "relative", minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", textAlign: "center", overflow: "hidden" }}>
        {/* Hintergrundbild */}
        <div style={{ position: "absolute", inset: 0, backgroundImage: "url('/manus-storage/aussen_nacht_no_antenna_15e63440.png')", backgroundSize: "cover", backgroundPosition: "center" }} />
        {/* Dunkles Overlay für Kontrast */}
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(20,15,10,0.45) 0%, rgba(20,15,10,0.65) 100%)" }} />
        {/* petit joujou — mittig ins Dach: y=28-43%, Mitte bei 35% */}
        <div style={{ position: "absolute", top: "28%", height: "15%", left: 0, right: 0, zIndex: 1, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", textAlign: "center" }}>
          <h1 className="font-script" style={{ fontSize: "clamp(3.5rem, 11vw, 8rem)", color: "#ffffff", lineHeight: 0.95, textShadow: "0 2px 40px rgba(0,0,0,0.7), 0 0 80px rgba(0,0,0,0.4)", marginLeft: '42px', marginTop: '-87px' }}>
            petit joujou
          </h1>
          <p className="font-body" style={{ fontSize: "0.72rem", letterSpacing: "0.4em", textTransform: "uppercase", color: "rgba(255,255,255,0.6)", marginTop: '25px', whiteSpace: 'nowrap' }}>
            Weinbar · Leistadt · Pfalz
          </p>
        </div>

        {/* Illustration — mittig ins Scheunentor: Tormitte x=65%, vertikal zentriert bei y=65% */}
        <div style={{ position: "absolute", top: "50%", left: "65%", transform: "translate(-50%, -50%)", zIndex: 2 }}>
          <img
            src="/manus-storage/illustration-final-orange_21a14351.png"
            alt=""
            style={{ width: '234px', height: "auto", filter: "drop-shadow(0 2px 16px rgba(0,0,0,0.6))", marginTop: '169px', marginLeft: '162px', marginRight: '-102px', paddingTop: '0px', paddingBottom: '16px', paddingLeft: '11px', paddingRight: '18px' }}
          />
        </div>

        {/* Entdecken-Button unten */}
        <div style={{ position: "absolute", bottom: "3rem", left: "50%", transform: "translateX(-50%)", zIndex: 3 }}>
          <a href="#weinkeller" className="font-body" style={{ padding: "0.75rem 2rem", backgroundColor: "transparent", color: "rgba(255,255,255,0.8)", textDecoration: "none", fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", border: "1px solid rgba(255,255,255,0.35)" }}>
            Entdecken
          </a>
        </div>

      </section>

      {/* Intro: direkt nach Hero */}
      <Intro />
    </>
  );
}

// ── Intro ─────────────────────────────────────────────────────
function Intro() {
  return (
    <section style={{ backgroundColor: C.bg, padding: "6rem 0", borderBottom: `1px solid ${C.border}` }}>
      <div style={{ maxWidth: "720px", margin: "0 auto", textAlign: "center", padding: "0 1.5rem" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "1.2rem", marginBottom: "1.5rem", whiteSpace: "nowrap" }}>
          <span className="font-script" style={{ fontSize: "clamp(1.8rem, 4.5vw, 3.5rem)", color: C.ink, lineHeight: 1 }}>klein</span>
          <span style={{ display: "inline-block", width: "5px", height: "5px", borderRadius: "50%", backgroundColor: "#111", flexShrink: 0 }} />
          <span className="font-script" style={{ fontSize: "clamp(1.8rem, 4.5vw, 3.5rem)", color: C.peachDark, lineHeight: 1 }}>fein</span>
          <span style={{ display: "inline-block", width: "5px", height: "5px", borderRadius: "50%", backgroundColor: "#111", flexShrink: 0 }} />
          <span className="font-script" style={{ fontSize: "clamp(1.8rem, 4.5vw, 3.5rem)", color: C.sageDark, lineHeight: 1 }}>wein</span>
        </div>
        <p className="font-body" style={{ fontSize: "1rem", color: C.inkMid, lineHeight: 1.9, letterSpacing: "0.03em", maxWidth: "520px", margin: "0 auto 2rem" }}>
          Wir sind die kleine Weinbar im Joujou. Weine, die man anderswo so nicht findet. Essen, das man gerne teilt. Ein Ort, den man nicht erklären kann — nur erleben.
        </p>

        {/* Two pillars */}
        <div className="intro-pillars" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "0", marginTop: "4rem", borderTop: `1px solid ${C.border}` }}>
          {[
            { title: "500 Weine", text: "Begehbare Weinkarte im Gewölbekeller von 1709. Biodynamisch, naturnah, exklusiv kuratiert." },
            { title: "Bio & Saisonal", text: "Raffinierte Sharing-Kreationen, Entrecôte-Streifen sowie Manna Palatina Pinsa werden euch verzaubern." },
          ].map((p) => (
            <div key={p.title} style={{ padding: "2rem 1.5rem", borderRight: `1px solid ${C.border}` }}>
              <div className="font-display" style={{ fontSize: "0.95rem", color: C.ink, marginBottom: "0.6rem", letterSpacing: "0.03em" }}>{p.title}</div>
              <div className="font-body" style={{ fontSize: "0.82rem", color: C.inkMid, lineHeight: 1.7 }}>{p.text}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Weinkeller ────────────────────────────────────────────────
function WeinkellerSection() {
  return (
    <section id="weinkeller" style={{ backgroundColor: C.bgCream, padding: "4rem 0 0" }}>
      {/* Weinregal-Bild — eingepasst, nicht Vollbreite */}
      <div style={{ maxWidth: "900px", margin: "0 auto", padding: "0 2rem" }}>
        <img
          src="/manus-storage/pj-keller-innen3-sharp_a0791967.jpg"
          alt="Weinkeller — Weinflaschen im Regal"
          style={{ width: "100%", height: "420px", objectFit: "cover", objectPosition: "center 20%", display: "block" }}
        />
      </div>


      {/* Text below gallery */}
      <div style={{ backgroundColor: C.bgCream, padding: "5rem 0" }}>
        <div style={{ maxWidth: "700px", margin: "0 auto", padding: "0 1.5rem" }}>
          <div className="keller-text-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "3rem", alignItems: "start" }}>
            <div>
              <p className="font-body" style={{ fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase", color: C.sageDark, marginBottom: "1rem" }}>
                Der Keller
              </p>
              <h3 className="font-display" style={{ fontSize: "1.6rem", color: C.ink, marginBottom: "1.25rem" }}>
                Manche Flaschen gibt es nur einmal.
              </h3>
              <p className="font-body" style={{ fontSize: "0.95rem", color: C.inkMid, lineHeight: 1.8 }}>
                Wenn sie weg sind, sind sie weg.
                Do–Fr ab 17 Uhr, Sa–So ab 12 Uhr.
              </p>
            </div>
            <div>
              <p className="font-body" style={{ fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase", color: C.peachDark, marginBottom: "1rem" }}>
                Was euch erwartet
              </p>
              {[
                "500 Weine & Bubbles — biodynamisch, naturnah",
                "Pfälzer Winzer & internationale Raritäten",
                "Wein zum Trinken & zum Mitnehmen",
                "Persönliche Beratung — für die, die sie wollen",
              ].map((item) => (
                <div key={item} style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem", marginBottom: "0.75rem" }}>
                  <span style={{ color: C.sageDark, fontSize: "0.9rem", marginTop: "0.05rem", flexShrink: 0 }}>→</span>
                  <span className="font-body" style={{ fontSize: "0.9rem", color: C.inkMid, lineHeight: 1.6 }}>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Scheune ───────────────────────────────────────────────────
function ScheuneSection() {
  return (
    <section id="scheune" style={{ backgroundColor: C.bgSage, padding: "6rem 0" }}>
      <div className="container">
        <div className="mobile-stack" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "center" }}>
          <div>
            <p className="font-body" style={{ fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase", color: C.peachDark, marginBottom: "1rem" }}>
              Drinnen
            </p>
            <h2 className="font-display" style={{ fontSize: "clamp(2rem, 4vw, 2.8rem)", color: C.ink, marginBottom: "1.5rem" }}>
              Die Scheune.<br />Euer Abend.
            </h2>
            <p className="font-body" style={{ fontSize: "1rem", color: C.inkMid, lineHeight: 1.8, marginBottom: "1.5rem" }}>
              Historisches Gewölbe, warmes Licht, guter Wein.
            </p>

          </div>
          <div>
            <img
              src="/manus-storage/scheune_innen_tisch_a44f846d.jpg"
              alt="Scheune — gedeckter Tisch unter historischem Dachstuhl"
              className="mobile-img-first mobile-img-tall"
              style={{ width: "100%", height: "520px", objectFit: "cover", objectPosition: "center 25%", display: "block" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Garten ────────────────────────────────────────────────────
function GartenSection() {
  return (
    <section id="garten" style={{ backgroundColor: C.bgSage, padding: "6rem 0" }}>
      <div className="container">
        {/* Hero-Bild: Garten-Übersicht mit draußen-Button */}
        <div style={{ position: "relative", marginBottom: "4rem" }}>
          <img
            src="/manus-storage/garten_uebersicht_e5617482.jpg"
            alt="Garten — Übersicht mit Sonnenschirmen und Weinfässern"
            className="mobile-img-tall"
            style={{ width: "100%", height: "500px", objectFit: "cover", objectPosition: "center 30%", display: "block" }}
          />
          <div style={{ position: "absolute", bottom: "-1.5rem", right: "2rem", backgroundColor: C.peach, padding: "1.25rem 1.5rem", textAlign: "center" }}>
            <div className="font-script" style={{ fontSize: "1.6rem", color: C.ink }}>draußen</div>
            <div className="font-body" style={{ fontSize: "0.6rem", letterSpacing: "0.1em", textTransform: "uppercase", color: C.inkMid }}>Garten & Terrasse</div>
          </div>
        </div>
        <div style={{ maxWidth: "600px" }}>
          <div>
            <p className="font-body" style={{ fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase", color: C.peachDark, marginBottom: "1rem" }}>
              Draußen
            </p>
            <h2 className="font-display" style={{ fontSize: "clamp(2rem, 4vw, 2.8rem)", color: C.ink, marginBottom: "1.5rem" }}>
              Wein unter freiem Himmel
            </h2>
            <p className="font-body" style={{ fontSize: "1rem", color: C.inkMid, lineHeight: 1.8, marginBottom: "1.5rem" }}>
              Zwischen Zypressen und alten Weinfässern. Lass die Seele baumeln.
            </p>
            <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
              {["Hunde willkommen", "Weinfreaks auch"].map((tag) => (
                <span key={tag} className="font-body" style={{ padding: "0.4rem 0.9rem", backgroundColor: C.rose, color: C.inkMid, fontSize: "0.72rem", letterSpacing: "0.06em" }}>
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Events ────────────────────────────────────────────────────
function EventsSection() {
  return (
    <section id="events" style={{ backgroundColor: C.bg, padding: "6rem 0" }}>
      <div className="container">
        <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
          <p className="font-body" style={{ fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase", color: C.sageDark, marginBottom: "0.75rem" }}>
            Was passiert
          </p>
          <h2 className="font-display" style={{ fontSize: "clamp(2rem, 4vw, 2.8rem)", color: C.ink }}>
            Events & Abende
          </h2>
          <p className="font-body" style={{ fontSize: "0.95rem", color: C.inkMid, marginTop: "1rem", maxWidth: "500px", margin: "1rem auto 0" }}>
            Ausgesuchte Abende mit ausgesuchten Winzern.
            Tickets sind begrenzt.
          </p>
        </div>

        {/* Aktuelle Events */}
        <div className="events-grid" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "2rem" }}>

          {/* BEATS petit joujou */}
          <div style={{ backgroundColor: C.bgCream, overflow: "hidden" }}>
            <img
              src="/manus-storage/beats-flyer-cropped_5ffa2e11.jpg"
              alt="BEATS petit joujou — DJ Marcel Ullrich"
              className="event-img"
              style={{ width: "100%", height: "360px", objectFit: "cover", objectPosition: "center top", display: "block" }}
            />
            <div style={{ padding: "1.25rem 1.5rem" }}>
              <p className="font-body" style={{ fontSize: "0.65rem", letterSpacing: "0.15em", textTransform: "uppercase", color: C.sageDark, marginBottom: "0.4rem" }}>Joujou After Work · ab 18:00 Uhr</p>
              <p className="font-display" style={{ fontSize: "1.3rem", color: C.ink, marginBottom: "0.3rem" }}>BEATS petit joujou</p>
              <p className="font-body" style={{ fontSize: "0.85rem", color: C.inkMid, marginBottom: "0.5rem" }}>DJ Marcel Ullrich</p>
              <p className="font-body" style={{ fontSize: "0.82rem", color: C.peachDark, fontWeight: 600 }}>11.06. · 16.07. · 13.08.2026</p>
              <p className="font-body" style={{ fontSize: "0.78rem", color: C.inkMid, marginTop: "0.3rem" }}>Kostenlos · Eintritt frei</p>
            </div>
          </div>

          {/* TAVOLA BEATS */}
          <div style={{ backgroundColor: C.bgSage, overflow: "hidden" }}>
            <img
              src="/manus-storage/joujou-groovt-event_89067159.jpg"
              alt="TAVOLA BEATS — lange Tafel im Joujou"
              className="event-img"
              style={{ width: "100%", height: "360px", objectFit: "cover", objectPosition: "center 30%", display: "block" }}
            />
            <div style={{ padding: "1.25rem 1.5rem" }}>
              <p className="font-body" style={{ fontSize: "0.65rem", letterSpacing: "0.15em", textTransform: "uppercase", color: C.sageDark, marginBottom: "0.4rem" }}>Sa, 08. August · 16:00–22:00 Uhr</p>
              <p className="font-display" style={{ fontSize: "1.3rem", color: C.ink, marginBottom: "0.3rem" }}>TAVOLA BEATS</p>
              <p className="font-body" style={{ fontSize: "0.82rem", color: C.peachDark, fontWeight: 600, marginBottom: "0.5rem" }}>59 € p.P. · inkl. Aperitif, Food & Wines</p>
              <a href="https://services.gastronovi.com/restaurants/68135/reservierung/widget?entry=ordering#1" target="_blank" rel="noopener noreferrer"
                style={{ display: "inline-block", padding: "0.6rem 1.4rem", backgroundColor: C.sageDark, color: "#fddde0", fontSize: "0.75rem", letterSpacing: "0.12em", textTransform: "uppercase", textDecoration: "none", fontFamily: "inherit" }}>
                Tickets buchen
              </a>
            </div>
          </div>

          {/* Joujou Groovt */}
          <div style={{ backgroundColor: "#fdf6ee", overflow: "hidden" }}>
            <div style={{ height: "280px", backgroundColor: "#f5e6c8", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "2rem", textAlign: "center" }}>
              <p className="font-body" style={{ fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", color: C.inkMid, marginBottom: "0.75rem" }}>Jeden letzten Donnerstag · 18:00–21:30 Uhr</p>
              <p className="font-display" style={{ fontSize: "clamp(1.6rem, 3vw, 2.2rem)", color: C.ink, lineHeight: 1.1, marginBottom: "0.5rem" }}>Joujou Groovt</p>
              <p className="font-body" style={{ fontSize: "0.85rem", color: C.inkMid, fontStyle: "italic", marginBottom: "1rem" }}>Live-Musik & Genuss</p>
              <p className="font-body" style={{ fontSize: "0.82rem", color: C.peachDark, fontWeight: 600 }}>30.07. · 27.08.2026</p>
            </div>
            <div style={{ padding: "1.25rem 1.5rem" }}>
              <p className="font-body" style={{ fontSize: "0.8rem", color: C.inkMid, marginBottom: "0.75rem" }}>Live-Musik-Acts, Spritz, Schorle, Wein — entspannte Sommerabende im Joujou.</p>
              <a href="https://services.gastronovi.com/restaurants/68135/reservation/widget/entry/reservation" target="_blank" rel="noopener noreferrer"
                style={{ display: "inline-block", padding: "0.6rem 1.4rem", backgroundColor: C.peachDark, color: "#fff", fontSize: "0.75rem", letterSpacing: "0.12em", textTransform: "uppercase", textDecoration: "none", fontFamily: "inherit" }}>
                Tisch reservieren
              </a>
            </div>
          </div>

          {/* Herbstmarkt */}
          <div style={{ backgroundColor: "#f0ebe0", overflow: "hidden" }}>
            <div style={{ height: "280px", backgroundColor: "#c8a96e", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "2rem", textAlign: "center" }}>
              <p className="font-body" style={{ fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.75)", marginBottom: "0.75rem" }}>03.10. + 04.10.2026 · ab 12:00 Uhr</p>
              <p className="font-display" style={{ fontSize: "clamp(1.6rem, 3vw, 2.2rem)", color: "#fff", lineHeight: 1.1, marginBottom: "0.5rem" }}>Herbstmarkt</p>
              <p className="font-body" style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.85)", fontStyle: "italic" }}>Markt der achtsamen Dinge</p>
            </div>
            <div style={{ padding: "1.25rem 1.5rem" }}>
              <p className="font-body" style={{ fontSize: "0.8rem", color: C.inkMid, marginBottom: "0.75rem" }}>Regionale Aussteller, Handwerkskunst, Bio-Leckereien und musikalische Begleitung — zwei Tage Herbstzauber.</p>
              <p className="font-body" style={{ fontSize: "0.78rem", color: C.sageDark, fontWeight: 600 }}>Eintritt frei</p>
            </div>
          </div>

        </div>

        <div style={{ textAlign: "center", marginTop: "2.5rem" }}>
          <p className="font-body" style={{ fontSize: "0.85rem", color: C.inkLight }}>
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
    <section id="gesellschaften" style={{ backgroundColor: C.bgLavender, padding: "7rem 0" }}>
      <div className="container">
        <div className="gesellschaft-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5rem", alignItems: "start" }}>
          {/* Left: Info */}
          <div>
            <p className="font-body" style={{ fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase", color: C.sageDark, marginBottom: "1rem" }}>
              Private Abende
            </p>
            <h2 className="font-display" style={{ fontSize: "clamp(2rem, 4vw, 2.8rem)", color: C.ink, marginBottom: "1.5rem", lineHeight: 1.25 }}>
              Euer Abend.<br />Unsere Bühne.
            </h2>
            <p className="font-body" style={{ fontSize: "1rem", color: C.inkMid, lineHeight: 1.85, marginBottom: "2rem" }}>
              Weinabend im Gewölbekeller, Geburtstag in der Scheune,
              Sommerabend im Garten. Schreibt uns, was ihr vorhabt.
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
            <div style={{ backgroundColor: C.bg, padding: "1.5rem", borderLeft: `4px solid ${C.sageDark}` }}>
              <p className="font-body" style={{ fontSize: "0.9rem", color: C.inkMid, lineHeight: 1.7, fontStyle: "italic" }}>
                „Wir lieben Feiern und gesellige Runden. Wir versuchen immer, unser Angebot an eure Möglichkeiten und Wünsche anzupassen. Sprecht uns super gerne einfach an.“
              </p>
            </div>
          </div>

          {/* Right: Form */}
          <div style={{ backgroundColor: C.bg, padding: "2.5rem" }}>
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
                    <label className="font-body" style={{ fontSize: "0.68rem", letterSpacing: "0.1em", textTransform: "uppercase", color: C.inkMid, display: "block", marginBottom: "0.4rem" }}>Name *</label>
                    <input
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      style={{ width: "100%", padding: "0.7rem 0.9rem", border: `1px solid ${C.border}`, backgroundColor: C.bgCream, fontSize: "0.9rem", color: C.ink, outline: "none", fontFamily: "inherit" }}
                      placeholder="Euer Name"
                    />
                  </div>
                  <div>
                    <label className="font-body" style={{ fontSize: "0.68rem", letterSpacing: "0.1em", textTransform: "uppercase", color: C.inkMid, display: "block", marginBottom: "0.4rem" }}>E-Mail *</label>
                    <input
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
                    <label className="font-body" style={{ fontSize: "0.68rem", letterSpacing: "0.1em", textTransform: "uppercase", color: C.inkMid, display: "block", marginBottom: "0.4rem" }}>Anlass</label>
                    <select
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
                    <label className="font-body" style={{ fontSize: "0.68rem", letterSpacing: "0.1em", textTransform: "uppercase", color: C.inkMid, display: "block", marginBottom: "0.4rem" }}>Gästeanzahl</label>
                    <select
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
                    <label className="font-body" style={{ fontSize: "0.68rem", letterSpacing: "0.1em", textTransform: "uppercase", color: C.inkMid, display: "block", marginBottom: "0.4rem" }}>Wunschdatum</label>
                    <input
                      type="date"
                      value={form.datum}
                      onChange={(e) => setForm({ ...form, datum: e.target.value })}
                      style={{ width: "100%", padding: "0.7rem 0.9rem", border: `1px solid ${C.border}`, backgroundColor: C.bgCream, fontSize: "0.9rem", color: C.ink, outline: "none", fontFamily: "inherit" }}
                    />
                  </div>
                  <div>
                    <label className="font-body" style={{ fontSize: "0.68rem", letterSpacing: "0.1em", textTransform: "uppercase", color: C.inkMid, display: "block", marginBottom: "0.4rem" }}>Telefon</label>
                    <input
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
                  <label className="font-body" style={{ fontSize: "0.68rem", letterSpacing: "0.1em", textTransform: "uppercase", color: C.inkMid, display: "block", marginBottom: "0.4rem" }}>Eure Wünsche & Budget-Vorstellung</label>
                  <textarea
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
                <p className="font-body" style={{ fontSize: "0.72rem", color: C.inkLight, textAlign: "center", marginTop: "0.75rem" }}>
                  Wir antworten innerhalb von 24 Stunden.
                </p>
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
      img: "/manus-storage/dirty_date_65030c39.jpg",
    },
    {
      label: "Weinbegleiter",
      name: "Happy Fried Mushroom",
      desc: "Gegrillter Romanasalat · Limette",
      img: "/manus-storage/happy_fried_mushroom_9c7fdfe2.jpg",
    },
    {
      label: "Weinbegleiter",
      name: "Wurst Case",
      desc: "Dürkheimer Wildwurst-Cubes · Tomatensauce",
      img: "/manus-storage/wurst_case_a34b977c.jpg",
    },
  ];

  return (
    <section id="essen" style={{ backgroundColor: C.bg, padding: "7rem 0" }}>
      <div className="container">

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "5rem" }}>
          <p className="font-body" style={{ fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase", color: C.peachDark, marginBottom: "1rem" }}>
            Alles bio. Alles echt.
          </p>
          <h2 className="font-display" style={{ fontSize: "clamp(2rem, 4vw, 2.8rem)", color: C.ink, marginBottom: "1rem" }}>
            Zum Teilen &amp; Sattwerden
          </h2>
          <p className="font-body" style={{ fontSize: "1rem", color: C.inkMid, maxWidth: "560px", margin: "0 auto 2rem", lineHeight: 1.8 }}>
            Raffinierte Sharing-Kreationen, Entrecôte-Streifen sowie Manna Palatina Pinsa werden euch verzaubern.
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
        <div className="essen-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "2.5rem", marginBottom: "6rem" }}>
          {gerichte.map((g) => (
            <div key={g.name}>
              <div style={{ overflow: "hidden", marginBottom: "1.25rem" }}>
                <img
                  src={g.img}
                  alt={g.name}
                  style={{ width: "100%", height: "320px", objectFit: "cover", objectPosition: "center", display: "block" }}
                />
              </div>
              <p className="font-body" style={{ fontSize: "0.65rem", letterSpacing: "0.18em", textTransform: "uppercase", color: C.peachDark, marginBottom: "0.4rem" }}>
                {g.label}
              </p>
              <h3 className="font-display" style={{ fontSize: "1.4rem", color: C.ink, marginBottom: "0.4rem" }}>
                {g.name}
              </h3>
              <p className="font-body" style={{ fontSize: "0.85rem", color: C.inkMid, lineHeight: 1.7, marginBottom: "0.6rem" }}>
                {g.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Manna Palatina Pinsa — breites Bild mit Beschriftung */}
        <div style={{ marginBottom: "6rem", borderTop: `1px solid ${C.border}`, paddingTop: "5rem" }}>
          <div className="pinsa-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "center" }}>
            <div style={{ overflow: "hidden" }}>
              <img
                src="/manus-storage/pinsa-pastrami_180108f0.jpg"
                alt="Manna Palatina Pinsa — Pastrami mit Rucola"
                style={{ width: "100%", height: "380px", objectFit: "cover", objectPosition: "center 40%", display: "block" }}
              />
            </div>
            <div>
              <p className="font-body" style={{ fontSize: "0.65rem", letterSpacing: "0.18em", textTransform: "uppercase", color: C.peachDark, marginBottom: "0.75rem" }}>
                Aus der Küche
              </p>
              <h3 className="font-display" style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.5rem)", color: C.ink, marginBottom: "1rem", lineHeight: 1.15 }}>
                Manna Palatina Pinsa
              </h3>
              <p className="font-body" style={{ fontSize: "0.95rem", color: C.inkMid, lineHeight: 1.85, marginBottom: "1.5rem" }}>
                Fünf Variationen, eine Idee: Teilen. Die Manna Palatina Pinsa kommt auf Holzbrett — knusprig, leicht, mit Belag der Saison. Wir wechseln das Angebot regelmäßig, damit immer etwas Neues auf euch wartet.
              </p>
            </div>
          </div>
        </div>

        {/* Entrecôte — separat, volle Breite, asymmetrisch */}
        <div className="entrecote-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5rem", alignItems: "center", borderTop: `1px solid ${C.border}`, paddingTop: "5rem" }}>
          <div>
            <img
              src="/manus-storage/entrecote_zoom_45d9e10e.jpg"
              alt="Entrecôte — Land.luft Premium Dry Age"
              style={{ width: "100%", height: "auto", objectFit: "contain", display: "block" }}
            />
          </div>
          <div>
            <p className="font-body" style={{ fontSize: "0.65rem", letterSpacing: "0.18em", textTransform: "uppercase", color: C.peachDark, marginBottom: "0.75rem" }}>
              Pimp it up
            </p>
            <h3 className="font-display" style={{ fontSize: "clamp(2rem, 4vw, 2.8rem)", color: C.ink, marginBottom: "1rem", lineHeight: 1.15 }}>
              Entrecôte
            </h3>
            <p className="font-body" style={{ fontSize: "0.95rem", color: C.inkMid, lineHeight: 1.85, marginBottom: "1rem" }}>
              Land.luft Premium Dry Age Rib Eye — trocken gereift, auf den Punkt gebracht.
            </p>
            <p className="font-body" style={{ fontSize: "0.85rem", color: C.inkLight, lineHeight: 1.7, marginBottom: "1.5rem" }}>
              Du entscheidest wie viel.
            </p>

          </div>
        </div>

      </div>
    </section>
  );
}

// ── Galerie ───────────────────────────────────────────────────
function GalerieSection() {
  const photos = [
    { src: "/manus-storage/aussen_nacht_dcd040f5.jpg", alt: "Aussenansicht bei Nacht", caption: "Nacht" },
    { src: "/manus-storage/scheune_innen_tisch_a44f846d.jpg", alt: "Scheune — gedeckter Tisch", caption: "Scheune" },
    { src: "/manus-storage/pj-keller-innen3-sharp_a0791967.jpg", alt: "Weinkeller", caption: "Weinkeller" },
    { src: "/manus-storage/weinglaeserfass_fix_b1dc7a51.jpg", alt: "Weingläser auf dem Fass", caption: "Atmosphäre" },
    { src: "/manus-storage/garten_lounge2_df2e49da.jpg", alt: "Garten Lounge", caption: "Garten" },
    { src: "/manus-storage/eingang_schnee_196128fe.jpg", alt: "Eingang bei Schnee", caption: "Eingang" },
    { src: "/manus-storage/joujou_schild_fix_063accf7.jpg", alt: "joujou Schild", caption: "joujou" },
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
              <img
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
              Weinbar · Leistadt · Pfalz<br />
              Eine Marke von Joujou Pfalz
            </p>
          </div>
          <div>
            <p className="font-body" style={{ fontSize: "0.7rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(250,248,245,0.45)", marginBottom: "1rem" }}>
              Öffnungszeiten
            </p>
            {[
              ["Do – Fr", "ab 17 Uhr"],
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
              Leistadt, Pfalz<br />
              <a href="mailto:hallo@petit-joujou.de" style={{ color: "#ed7846", textDecoration: "none" }}>
                hallo@petit-joujou.de
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
            <a href="/impressum" style={{ color: "#ed7846", textDecoration: "none" }}>Impressum</a>
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
export default function Home() {
  return (
    <div style={{ backgroundColor: C.bg, minHeight: "100vh" }}>
      <Nav />
      <main style={{ paddingTop: "60px" }}>
        <Hero />
        <WeinkellerSection />
        <ScheuneSection />
        <EssenSection />
        <GartenSection />
        <EventsSection />
        <GesellschaftenSection />
        <GalerieSection />
      </main>
      <Footer />
    </div>
  );
}
