/* ============================================================
   petit joujou — Weinbar · Leistadt, Pfalz
   Pastell-Redesign: begehbare Weinkarte · Scheune · Garten
   ============================================================ */

import { useState } from "react";
import { toast } from "sonner";

// ── Pastell-Palette ──────────────────────────────────────────
const C = {
  // Backgrounds
  bg:          "#fdf8f4",   // warm off-white
  bgSage:      "#eef3f0",   // pale sage
  bgPeach:     "#fdf0e8",   // pale peach
  bgLavender:  "#f3eff8",   // pale lavender

  // Text
  ink:         "#3d2e22",   // warm dark brown (readable)
  inkMid:      "#6b5444",   // medium brown
  inkLight:    "#9c8070",   // muted warm

  // Pastell accents
  sage:        "#a8c4b8",   // sage green pastel
  sageDark:    "#7aaa96",   // slightly deeper sage
  peach:       "#f5c9a3",   // peach pastel
  peachDark:   "#e8a87c",   // deeper peach
  lavender:    "#d4c5e2",   // lavender pastel
  rose:        "#f2d5cc",   // blush rose pastel

  // Borders / dividers
  border:      "#e8ddd4",   // warm light border
  borderSage:  "#c8ddd5",   // sage border
};

// ── Nav ──────────────────────────────────────────────────────
function Nav() {
  const [open, setOpen] = useState(false);
  const links = [
    { label: "Weinbar", href: "#weinbar" },
    { label: "Die Scheune", href: "#scheune" },
    { label: "Der Garten", href: "#garten" },
    { label: "Weinkarte", href: "#weinkarte" },
    { label: "Events", href: "#events" },
  ];
  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        backgroundColor: "rgba(253,248,244,0.94)",
        backdropFilter: "blur(14px)",
        borderBottom: `1px solid ${C.border}`,
      }}
    >
      <div className="container flex items-center justify-between" style={{ height: "60px" }}>
        {/* Logo — petit joujou as one unified brand */}
        <a href="#" style={{ textDecoration: "none" }}>
          <span
            className="font-script"
            style={{ fontSize: "1.7rem", color: C.sageDark, letterSpacing: "0.02em" }}
          >
            petit joujou
          </span>
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-7">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="font-body"
              style={{
                fontSize: "0.75rem",
                letterSpacing: "0.1em",
                color: C.inkMid,
                textDecoration: "none",
                textTransform: "uppercase",
              }}
            >
              {l.label}
            </a>
          ))}
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden"
          onClick={() => setOpen(!open)}
          style={{ background: "none", border: "none", cursor: "pointer", color: C.inkMid, fontSize: "1.4rem" }}
        >
          {open ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div
          className="md:hidden"
          style={{ backgroundColor: C.bg, borderTop: `1px solid ${C.border}`, padding: "1rem 0" }}
        >
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block font-body"
              style={{
                padding: "0.75rem 1.5rem",
                fontSize: "0.8rem",
                letterSpacing: "0.1em",
                color: C.inkMid,
                textDecoration: "none",
                textTransform: "uppercase",
              }}
            >
              {l.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}

// ── Hero ─────────────────────────────────────────────────────
function Hero() {
  return (
    <section
      style={{
        position: "relative",
        height: "100vh",
        minHeight: "600px",
        overflow: "hidden",
        backgroundColor: C.bgSage,
      }}
    >
      {/* Background photo: bar interior with rattan lamps */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: "url('/manus-storage/pj-hero-abs_82fae2c0.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center 30%",
        }}
      />
      {/* Pastel overlay — warm peach tint */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(160deg, rgba(253,240,232,0.55) 0%, rgba(168,196,184,0.35) 60%, rgba(253,248,244,0.75) 100%)",
        }}
      />

      {/* Content */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          padding: "0 1.5rem",
        }}
      >
        {/* Brand name — one unit */}
        <div style={{ marginBottom: "1.5rem" }}>
          <p
            className="font-body"
            style={{
              fontSize: "0.7rem",
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              color: C.sageDark,
              marginBottom: "0.5rem",
            }}
          >
            Weinbar · Leistadt, Pfalz
          </p>
          <h1
            className="font-script"
            style={{
              fontSize: "clamp(3.5rem, 10vw, 7rem)",
              color: C.ink,
              lineHeight: 1,
              textShadow: "0 2px 20px rgba(253,248,244,0.6)",
            }}
          >
            petit joujou
          </h1>
          <div
            style={{
              width: "4rem",
              height: "1px",
              backgroundColor: C.peachDark,
              margin: "1.25rem auto",
            }}
          />
          <p
            className="font-display"
            style={{
              fontSize: "clamp(1rem, 2.5vw, 1.4rem)",
              color: C.inkMid,
              letterSpacing: "0.15em",
              fontStyle: "italic",
            }}
          >
            klein · fein · wein
          </p>
        </div>

        {/* CTAs */}
        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", justifyContent: "center", marginTop: "2rem" }}>
          <a
            href="#weinkarte"
            className="font-body"
            style={{
              padding: "0.85rem 2rem",
              backgroundColor: C.sageDark,
              color: C.bg,
              textDecoration: "none",
              fontSize: "0.75rem",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              border: "none",
            }}
          >
            Begehbare Weinkarte
          </a>
          <a
            href="#scheune"
            className="font-body"
            style={{
              padding: "0.85rem 2rem",
              backgroundColor: "transparent",
              color: C.ink,
              textDecoration: "none",
              fontSize: "0.75rem",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              border: `1px solid ${C.ink}`,
            }}
          >
            Die Scheune entdecken
          </a>
        </div>
      </div>

      {/* Scroll hint */}
      <div
        style={{
          position: "absolute",
          bottom: "2rem",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "0.4rem",
          opacity: 0.5,
        }}
      >
        <div style={{ width: "1px", height: "40px", backgroundColor: C.inkMid }} />
      </div>
    </section>
  );
}

// ── Intro ─────────────────────────────────────────────────────
function Intro() {
  return (
    <section
      style={{
        backgroundColor: C.bg,
        padding: "6rem 0",
        borderBottom: `1px solid ${C.border}`,
      }}
    >
      <div className="container" style={{ maxWidth: "680px", margin: "0 auto", textAlign: "center" }}>
        <h2
          className="font-display"
          style={{ fontSize: "clamp(1.6rem, 3vw, 2.2rem)", color: C.ink, marginBottom: "1.5rem", fontStyle: "italic" }}
        >
          Eine Weinbar in einer historischen Scheune.
        </h2>
        <p
          className="font-body"
          style={{ fontSize: "1.05rem", color: C.inkMid, lineHeight: 1.85 }}
        >
          In Leistadt, mitten in der Pfalz, haben wir einen Ort geschaffen, der Wein neu erlebbar macht.
          Kein Weinkeller hinter Glas — sondern eine <strong>begehbare Weinkarte</strong> mit über 400 Bio-Weinen,
          die du selbst entdeckst. Drinnen unter dem alten Dachstuhl. Draußen im Garten zwischen Weinfässern.
        </p>
      </div>
    </section>
  );
}

// ── Weinkarte Highlight ───────────────────────────────────────
function WeinkarteSection() {
  return (
    <section id="weinkarte" style={{ backgroundColor: C.bgSage, padding: "6rem 0" }}>
      <div className="container">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "4rem",
            alignItems: "center",
          }}
          className="grid-cols-1 md:grid-cols-2"
        >
          {/* Text */}
          <div>
            <p
              className="font-body"
              style={{
                fontSize: "0.7rem",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: C.sageDark,
                marginBottom: "1rem",
              }}
            >
              Das Herzstück
            </p>
            <h2
              className="font-display"
              style={{ fontSize: "clamp(2rem, 4vw, 2.8rem)", color: C.ink, marginBottom: "1.5rem" }}
            >
              Die begehbare Weinkarte
            </h2>
            <p
              className="font-body"
              style={{ fontSize: "1rem", color: C.inkMid, lineHeight: 1.8, marginBottom: "1.5rem" }}
            >
              Über 400 Bio-Weine — nicht auf einer Karte, sondern im Regal vor dir.
              Du gehst hindurch, liest, riechst, fragst. Wir helfen dir, deinen Wein zu finden.
              Oder du findest ihn selbst.
            </p>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "1rem",
                marginBottom: "2rem",
              }}
            >
              {[
                { n: "400+", l: "Bio-Weine" },
                { n: "Walk-in", l: "Kein Termin nötig" },
                { n: "Pfalz", l: "& ganz Deutschland" },
                { n: "Natur", l: "Biodynamisch & fair" },
              ].map((item) => (
                <div
                  key={item.n}
                  style={{
                    backgroundColor: C.bg,
                    padding: "1rem 1.25rem",
                    borderLeft: `3px solid ${C.sage}`,
                  }}
                >
                  <div
                    className="font-display"
                    style={{ fontSize: "1.3rem", color: C.sageDark, marginBottom: "0.2rem" }}
                  >
                    {item.n}
                  </div>
                  <div
                    className="font-body"
                    style={{ fontSize: "0.75rem", color: C.inkLight, letterSpacing: "0.05em" }}
                  >
                    {item.l}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Image: staircase / entrance to wine area */}
          <div style={{ position: "relative" }}>
            <img
              src="/manus-storage/pj-treppe-abs_87ed09ec.jpg"
              alt="Eingang zur begehbaren Weinkarte"
              style={{ width: "100%", height: "520px", objectFit: "cover", display: "block" }}
            />
            {/* Pastel badge */}
            <div
              style={{
                position: "absolute",
                top: "1.5rem",
                right: "-1rem",
                backgroundColor: C.peach,
                padding: "1rem 1.25rem",
                textAlign: "center",
                boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
              }}
            >
              <div className="font-script" style={{ fontSize: "1.8rem", color: C.ink }}>400</div>
              <div className="font-body" style={{ fontSize: "0.6rem", letterSpacing: "0.1em", textTransform: "uppercase", color: C.inkMid }}>Bio-Weine</div>
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
    <section id="scheune" style={{ backgroundColor: C.bg, padding: "0" }}>
      {/* Full-width image */}
      <div style={{ position: "relative", height: "70vh", minHeight: "480px", overflow: "hidden" }}>
        <img
          src="/manus-storage/pj-scheune-abs_f4acf293.jpg"
          alt="Die Scheune — historischer Dachstuhl"
          style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 20%" }}
        />
        {/* Pastel overlay from bottom */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to top, rgba(253,248,244,0.9) 0%, rgba(253,248,244,0.1) 50%, transparent 100%)",
          }}
        />
        {/* Text overlay bottom */}
        <div
          style={{
            position: "absolute",
            bottom: "3rem",
            left: "50%",
            transform: "translateX(-50%)",
            textAlign: "center",
            width: "100%",
            padding: "0 1.5rem",
          }}
        >
          <p
            className="font-body"
            style={{ fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase", color: C.sageDark, marginBottom: "0.75rem" }}
          >
            Atmosphäre
          </p>
          <h2
            className="font-display"
            style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", color: C.ink }}
          >
            Die Scheune
          </h2>
        </div>
      </div>

      {/* Text below */}
      <div
        className="container"
        style={{ maxWidth: "640px", margin: "0 auto", padding: "4rem 1.5rem", textAlign: "center" }}
      >
        <p
          className="font-body"
          style={{ fontSize: "1.05rem", color: C.inkMid, lineHeight: 1.85 }}
        >
          Alter Dachstuhl. Bruchsteinwände. Warmes Licht.
          Unsere historische Scheune in Leistadt ist kein aufgeräumtes Lokal —
          sie ist ein Ort, der atmet. Hier trinkst du Wein so, wie er sein sollte:
          entspannt, echt, ohne Eile.
        </p>
      </div>
    </section>
  );
}

// ── Garten ────────────────────────────────────────────────────
function GartenSection() {
  return (
    <section id="garten" style={{ backgroundColor: C.bgPeach, padding: "6rem 0" }}>
      <div className="container">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "4rem",
            alignItems: "center",
          }}
        >
          {/* Image */}
          <div>
            <img
              src="/manus-storage/pj-terrasse-abs_abb99ca0.jpg"
              alt="Garten der Weinbar mit Weinfässern und Sonnenschirmen"
              style={{ width: "100%", height: "480px", objectFit: "cover", display: "block" }}
            />
          </div>

          {/* Text */}
          <div>
            <p
              className="font-body"
              style={{
                fontSize: "0.7rem",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: C.peachDark,
                marginBottom: "1rem",
              }}
            >
              Draußen
            </p>
            <h2
              className="font-display"
              style={{ fontSize: "clamp(2rem, 4vw, 2.8rem)", color: C.ink, marginBottom: "1.5rem" }}
            >
              Der Garten
            </h2>
            <p
              className="font-body"
              style={{ fontSize: "1rem", color: C.inkMid, lineHeight: 1.8, marginBottom: "1.5rem" }}
            >
              Zwischen Zypressen, alten Weinfässern und Sonnenschirmen.
              Unser Außenbereich ist kein Biergarten — er ist eine Verlängerung
              der Scheune unter freiem Himmel. Ideal für warme Abende,
              spontane Besuche und Wein, der nach Pfalz schmeckt.
            </p>
            <div
              style={{
                display: "flex",
                gap: "1rem",
                flexWrap: "wrap",
              }}
            >
              {["Walk-in willkommen", "Hunde erlaubt", "Kein Dresscode"].map((tag) => (
                <span
                  key={tag}
                  className="font-body"
                  style={{
                    padding: "0.4rem 0.9rem",
                    backgroundColor: C.rose,
                    color: C.inkMid,
                    fontSize: "0.72rem",
                    letterSpacing: "0.06em",
                  }}
                >
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
  const events = [
    {
      date: "Sa, 14. Jun",
      title: "Wein-Battle: Wittmann vs. Rings",
      desc: "Zwei Pfälzer Winzer. Ein Abend. Ihr entscheidet.",
      color: C.bgSage,
      accent: C.sageDark,
    },
    {
      date: "Fr, 27. Jun",
      title: "Naturwein-Abend",
      desc: "Biodynamisch, ungefiltert, ehrlich. Mit Winzer vor Ort.",
      color: C.bgPeach,
      accent: C.peachDark,
    },
    {
      date: "Sa, 5. Jul",
      title: "Frühlingsmarkt",
      desc: "Lokale Erzeuger, Musik, Wein im Freien.",
      color: C.bgLavender,
      accent: "#9b85c0",
    },
  ];

  return (
    <section id="events" style={{ backgroundColor: C.bg, padding: "6rem 0" }}>
      <div className="container">
        <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
          <p
            className="font-body"
            style={{ fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase", color: C.sageDark, marginBottom: "0.75rem" }}
          >
            Was passiert
          </p>
          <h2
            className="font-display"
            style={{ fontSize: "clamp(2rem, 4vw, 2.8rem)", color: C.ink }}
          >
            Events & Abende
          </h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.5rem" }}>
          {events.map((ev) => (
            <div
              key={ev.title}
              style={{
                backgroundColor: ev.color,
                padding: "2rem",
                borderTop: `3px solid ${ev.accent}`,
              }}
            >
              <p
                className="font-body"
                style={{ fontSize: "0.7rem", letterSpacing: "0.1em", textTransform: "uppercase", color: ev.accent, marginBottom: "0.75rem" }}
              >
                {ev.date}
              </p>
              <h3
                className="font-display"
                style={{ fontSize: "1.15rem", color: C.ink, marginBottom: "0.75rem" }}
              >
                {ev.title}
              </h3>
              <p
                className="font-body"
                style={{ fontSize: "0.9rem", color: C.inkMid, lineHeight: 1.7 }}
              >
                {ev.desc}
              </p>
              <button
                onClick={() => toast("Tickets & Infos folgen in Kürze.")}
                className="font-body"
                style={{
                  marginTop: "1.5rem",
                  padding: "0.5rem 1.25rem",
                  backgroundColor: "transparent",
                  border: `1px solid ${ev.accent}`,
                  color: ev.accent,
                  fontSize: "0.72rem",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  cursor: "pointer",
                }}
              >
                Mehr erfahren
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Galerie ───────────────────────────────────────────────────
function GalerieSection() {
  const photos = [
    { src: "/manus-storage/pj-eingang-abs_87f4d6d6.jpg", alt: "Eingang", caption: "Der Eingang" },
    { src: "/manus-storage/pj-hero-abs_82fae2c0.jpg", alt: "Die Bar", caption: "Die Bar" },
    { src: "/manus-storage/pj-treppe-abs_87ed09ec.jpg", alt: "Treppe", caption: "Ins Innere" },
    { src: "/manus-storage/pj-gastraum-abs_8a1bb778.jpg", alt: "Gastraum", caption: "Der Gastraum" },
    { src: "/manus-storage/pj-terrasse-abs_abb99ca0.jpg", alt: "Terrasse", caption: "Der Garten" },
    { src: "/manus-storage/pj-hof-abs_d3d19619.jpg", alt: "Hof", caption: "Der Hof" },
  ];

  return (
    <section style={{ backgroundColor: C.bgSage, padding: "5rem 0" }}>
      <div className="container">
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <h2 className="font-display" style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.5rem)", color: C.ink }}>
            Ein Ort mit Geschichte
          </h2>
          <div style={{ width: "3rem", height: "1px", backgroundColor: C.peachDark, margin: "1rem auto 0" }} />
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "0.5rem" }}>
          {photos.map((p, i) => (
            <div key={i} style={{ position: "relative", overflow: "hidden" }}>
              <img
                src={p.src}
                alt={p.alt}
                style={{
                  width: "100%",
                  height: i === 0 || i === 1 ? "320px" : "220px",
                  objectFit: "cover",
                  display: "block",
                  filter: "saturate(0.85)",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  bottom: "0.75rem",
                  left: "0.75rem",
                  backgroundColor: "rgba(253,248,244,0.82)",
                  padding: "0.2rem 0.65rem",
                }}
              >
                <span
                  className="font-body"
                  style={{ fontSize: "0.65rem", letterSpacing: "0.1em", textTransform: "uppercase", color: C.inkMid }}
                >
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
    <footer style={{ backgroundColor: C.ink, padding: "4rem 0 3rem" }}>
      <div className="container">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gap: "3rem",
            marginBottom: "3rem",
          }}
        >
          {/* Brand */}
          <div>
            <span className="font-script" style={{ fontSize: "2rem", color: C.peach }}>
              petit joujou
            </span>
            <p className="font-body" style={{ fontSize: "0.85rem", color: C.inkLight, marginTop: "0.75rem", lineHeight: 1.7 }}>
              Weinbar · Leistadt, Pfalz<br />
              Eine Marke von JouJou Pfalz
            </p>
          </div>

          {/* Öffnungszeiten */}
          <div>
            <p className="font-body" style={{ fontSize: "0.7rem", letterSpacing: "0.15em", textTransform: "uppercase", color: C.sage, marginBottom: "1rem" }}>
              Öffnungszeiten
            </p>
            {[
              ["Do – Fr", "ab 17 Uhr"],
              ["Sa – So", "ab 12 Uhr"],
              ["Mo – Mi", "geschlossen"],
            ].map(([day, time]) => (
              <div key={day} style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.4rem" }}>
                <span className="font-body" style={{ fontSize: "0.85rem", color: C.inkLight }}>{day}</span>
                <span className="font-body" style={{ fontSize: "0.85rem", color: C.peach }}>{time}</span>
              </div>
            ))}
          </div>

          {/* Kontakt */}
          <div>
            <p className="font-body" style={{ fontSize: "0.7rem", letterSpacing: "0.15em", textTransform: "uppercase", color: C.sage, marginBottom: "1rem" }}>
              Kontakt
            </p>
            <p className="font-body" style={{ fontSize: "0.85rem", color: C.inkLight, lineHeight: 1.8 }}>
              Leistadt, Pfalz<br />
              <a href="mailto:hallo@petit-joujou.de" style={{ color: C.peach, textDecoration: "none" }}>
                hallo@petit-joujou.de
              </a>
            </p>
          </div>
        </div>

        <div style={{ borderTop: `1px solid rgba(255,255,255,0.08)`, paddingTop: "1.5rem", textAlign: "center" }}>
          <p className="font-body" style={{ fontSize: "0.72rem", color: C.inkLight, letterSpacing: "0.05em" }}>
            © 2025 petit joujou · JouJou Pfalz
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
        <Intro />
        <WeinkarteSection />
        <ScheuneSection />
        <GartenSection />
        <EventsSection />
        <GalerieSection />
      </main>
      <Footer />
    </div>
  );
}
