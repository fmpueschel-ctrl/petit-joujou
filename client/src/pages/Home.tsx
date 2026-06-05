/* ============================================================
   petit joujou — Weinbar · Leistadt, Pfalz
   klein · fein · wein
   ============================================================ */

import { useState } from "react";
import { toast } from "sonner";
import { trpc } from "@/lib/trpc";

// ── Weinbar-Palette (petit joujou) ──────────────────────────
// #FDDDE0 Rosa-Hintergrund · #FF66C4 Magenta-Akzent · #40818A Joujou-Grün
const C = {
  bg:          "#fdf8f9",   // fast weiß, leicht rosa
  bgSage:      "#fce8ee",   // zartes Rosa (war Salbei)
  bgPeach:     "#fddde0",   // Candy-Rosa (war Pfirsich)
  bgLavender:  "#fce8ee",   // Rosa (war Lavendel)
  bgCream:     "#fdf4f6",   // sehr zartes Rosa (war Creme)
  ink:         "#1e3a3a",   // tief dunkelgrün (war Braun)
  inkMid:      "#40818a",   // Joujou-Grün (war Mittelbraun)
  inkLight:    "#6ba8b0",   // helles Joujou-Grün (war Hellbraun)
  sage:        "#a8d4d8",   // helles Blaugrün (war Salbei)
  sageDark:    "#40818a",   // Joujou-Grün — Hauptfarbe
  peach:       "#ffb3e0",   // helles Pink (war Pfirsich)
  peachDark:   "#ff66c4",   // Magenta — Akzentfarbe
  lavender:    "#fddde0",   // Rosa (war Lavendel)
  rose:        "#fddde0",   // Candy-Rosa (war Rose)
  hotpink:     "#ff66c4",   // Magenta
  border:      "#f0d0d8",   // Rosa-Border
  borderSage:  "#b8dde0",   // Grün-Border
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
          backgroundColor: "rgba(253,244,246,0.94)",
          backdropFilter: "blur(14px)",
          borderBottom: `1px solid ${C.border}`,
        }}
      >
        <div className="container flex items-center justify-between" style={{ height: "60px" }}>
          <a href="#" style={{ textDecoration: "none" }}>
            <span className="font-script" style={{ fontSize: "1.7rem", color: C.sageDark, letterSpacing: "0.02em" }}>
              petit joujou
            </span>
          </a>
          <button
            onClick={() => setOpen(!open)}
            style={{ background: "none", border: "none", cursor: "pointer", color: C.inkMid, padding: "0.5rem", display: "flex", flexDirection: "column", gap: "5px", alignItems: "center", justifyContent: "center" }}
            aria-label="Menü"
          >
            {open ? (
              <span style={{ fontSize: "1.3rem", color: C.inkMid, lineHeight: 1 }}>✕</span>
            ) : (
              <>
                <span style={{ display: "block", width: "22px", height: "1.5px", backgroundColor: C.inkMid }} />
                <span style={{ display: "block", width: "22px", height: "1.5px", backgroundColor: C.inkMid }} />
                <span style={{ display: "block", width: "22px", height: "1.5px", backgroundColor: C.inkMid }} />
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
    <section style={{ position: "relative", height: "100vh", minHeight: "600px", overflow: "hidden", backgroundColor: C.bgSage }}>
      <div style={{ position: "absolute", inset: 0, backgroundImage: "url('/manus-storage/pj-hero-bogen-neu_33e3b5a6.jpg')", backgroundSize: "cover", backgroundPosition: "center 30%" }} />
      {/* Starker Dunkel-Overlay — lässt Bogen als Silhouette wirken */}
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(20,45,42,0.72) 0%, rgba(20,45,42,0.45) 40%, rgba(20,45,42,0.65) 100%)" }} />
      <div style={{ position: "relative", zIndex: 1, height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", textAlign: "center", padding: "0 1.5rem" }}>
        <div style={{ marginBottom: "1.5rem" }}>
          {/* petit joujou */}
          <p className="font-body" style={{ fontSize: "0.65rem", letterSpacing: "0.35em", textTransform: "uppercase", color: "rgba(253,221,224,0.7)", marginBottom: "1.5rem" }}>
            Leistadt, Pfalz
          </p>
          <h1 className="font-script" style={{ fontSize: "clamp(3.5rem, 10vw, 7rem)", color: "#fddde0", lineHeight: 1.1, textShadow: "0 2px 30px rgba(20,45,42,0.5)" }}>
            petit joujou
          </h1>
          <div style={{ width: "3rem", height: "1px", backgroundColor: "#ff66c4", margin: "1.5rem auto" }} />
          <p className="font-display" style={{ fontSize: "clamp(0.85rem, 2vw, 1.1rem)", color: "rgba(253,221,224,0.75)", letterSpacing: "0.2em", fontStyle: "italic" }}>
            klein · fein · wein
          </p>
        </div>
        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", justifyContent: "center", marginTop: "2.5rem" }}>
          <a href="#weinkeller" className="font-body" style={{ padding: "0.85rem 2.5rem", backgroundColor: "transparent", color: "#fddde0", textDecoration: "none", fontSize: "0.72rem", letterSpacing: "0.18em", textTransform: "uppercase", border: "1px solid rgba(253,221,224,0.4)" }}>
            Entdecken
          </a>
        </div>
      </div>
      <div style={{ position: "absolute", bottom: "2rem", left: "50%", transform: "translateX(-50%)", opacity: 0.45 }}>
        <div style={{ width: "1px", height: "40px", backgroundColor: C.inkMid, margin: "0 auto" }} />
      </div>
    </section>
  );
}

// ── Intro ─────────────────────────────────────────────────────
function Intro() {
  return (
    <section style={{ backgroundColor: C.bg, padding: "6rem 0", borderBottom: `1px solid ${C.border}` }}>
      <div style={{ maxWidth: "720px", margin: "0 auto", textAlign: "center", padding: "0 1.5rem" }}>
        {/* Punchy tagline */}
        <p className="font-body" style={{ fontSize: "0.7rem", letterSpacing: "0.25em", textTransform: "uppercase", color: C.sageDark, marginBottom: "1.5rem" }}>
          Weinbar · Leistadt, Pfalz
        </p>
        <h2 className="font-script" style={{ fontSize: "clamp(2.8rem, 7vw, 5rem)", color: C.ink, marginBottom: "0.25rem", lineHeight: 1.15, letterSpacing: "0.02em" }}>
          klein
        </h2>
        <h2 className="font-script" style={{ fontSize: "clamp(2.8rem, 7vw, 5rem)", color: C.peachDark, marginBottom: "0.25rem", lineHeight: 1.15, letterSpacing: "0.02em" }}>
          fein
        </h2>
        <h2 className="font-script" style={{ fontSize: "clamp(2.8rem, 7vw, 5rem)", color: C.sageDark, marginBottom: "1.5rem", lineHeight: 1.15, letterSpacing: "0.02em" }}>
          wein
        </h2>
        <p className="font-body" style={{ fontSize: "1rem", color: C.inkMid, lineHeight: 1.9, letterSpacing: "0.03em", maxWidth: "520px", margin: "0 auto" }}>
          Weine, die man anderswo nicht findet.
          Essen, das man nicht vergisst.
          Ein Ort, den man nicht erklären kann — nur erleben.
        </p>
        {/* Three pillars */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "0", marginTop: "4rem", borderTop: `1px solid ${C.border}` }}>
          {[
            { title: "500 Weine", text: "Im begehbaren Gewölbekeller von 1709. Biodynamisch, naturnah, exklusiv kuratiert." },
            { title: "Bio & Saisonal", text: "Manna Palatina Pinsa und La Planche du Joujou. Alles biologisch, alles handverlesen." },
            { title: "Tisch reservieren", text: "Scheune oder Garten, zwei bis acht Personen. Größere Gesellschaften auf Anfrage." },
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
    <section id="weinkeller" style={{ backgroundColor: C.bgCream, padding: "0" }}>
      {/* Quer oben: Blick von unten nach oben im Keller */}
      <img
        src="/manus-storage/pj-keller-fass-sharp_2a26400b.jpg"
        alt="Weinkeller — Blick nach oben"
        style={{ width: "100%", height: "460px", objectFit: "cover", objectPosition: "center 15%", display: "block" }}
      />
      {/* Zwei Querformat-Bilder nebeneinander */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0" }}>
        <img
          src="/manus-storage/pj-keller-innen3-sharp_a0791967.jpg"
          alt="Weinkeller — Weinflaschen im Regal"
          style={{ width: "100%", height: "380px", objectFit: "cover", objectPosition: "center 20%", display: "block" }}
        />
        <img
          src="/manus-storage/pj-fass-bogen_92b6a0fc.jpg"
          alt="Weinfass vor dem Sandsteinbogen"
          style={{ width: "100%", height: "380px", objectFit: "cover", objectPosition: "center 60%", display: "block" }}
        />
      </div>


      {/* Text below gallery */}
      <div style={{ backgroundColor: C.bgCream, padding: "5rem 0" }}>
        <div style={{ maxWidth: "700px", margin: "0 auto", padding: "0 1.5rem" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "3rem", alignItems: "start" }}>
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
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "center" }}>
          <div>
            <p className="font-body" style={{ fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase", color: C.peachDark, marginBottom: "1rem" }}>
              Drinnen
            </p>
            <h2 className="font-display" style={{ fontSize: "clamp(2rem, 4vw, 2.8rem)", color: C.ink, marginBottom: "1.5rem" }}>
              Die Scheune.<br />Euer Abend.
            </h2>
            <p className="font-body" style={{ fontSize: "1rem", color: C.inkMid, lineHeight: 1.8, marginBottom: "1.5rem" }}>
              Historisches Gewölbe, warmes Licht, guter Wein.
              Begrenzte Tischanzahl — Reservierung von Vorteil.
            </p>
            <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
              {["Manna Palatina & La Planche", "Bis 60 Personen"].map((tag) => (
                <span key={tag} className="font-body" style={{ padding: "0.4rem 0.9rem", backgroundColor: C.rose, color: C.inkMid, fontSize: "0.72rem", letterSpacing: "0.06em" }}>
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <div>
            <img
              src="/manus-storage/pj-scheune-rot_c36f917d.jpg"
              alt="Scheune — historischer Dachstuhl mit Bar"
              style={{ width: "100%", height: "420px", objectFit: "cover", objectPosition: "center 30%", display: "block" }}
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
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "center" }}>
          <div style={{ position: "relative" }}>
            <img
              src="/manus-storage/pj-terrasse-abs_9eb9ef23.jpg"
              alt="Garten — Terrasse mit Sonnenschirmen"
              style={{ width: "100%", height: "480px", objectFit: "cover", display: "block" }}
            />
            <div style={{ position: "absolute", bottom: "-1.5rem", right: "-1.5rem", backgroundColor: C.peach, padding: "1.25rem 1.5rem", textAlign: "center" }}>
              <div className="font-script" style={{ fontSize: "1.6rem", color: C.ink }}>draußen</div>
              <div className="font-body" style={{ fontSize: "0.6rem", letterSpacing: "0.1em", textTransform: "uppercase", color: C.inkMid }}>Garten & Terrasse</div>
            </div>
          </div>
          <div>
            <p className="font-body" style={{ fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase", color: C.peachDark, marginBottom: "1rem" }}>
              Draußen
            </p>
            <h2 className="font-display" style={{ fontSize: "clamp(2rem, 4vw, 2.8rem)", color: C.ink, marginBottom: "1.5rem" }}>
              Wein unter freiem Himmel
            </h2>
            <p className="font-body" style={{ fontSize: "1rem", color: C.inkMid, lineHeight: 1.8, marginBottom: "1.5rem" }}>
              Zwischen Zypressen und alten Weinfässern.
              Begrenzte Tischanzahl — Reservierung von Vorteil.
            </p>
            <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
              {["Bis 40 Personen", "Hunde willkommen"].map((tag) => (
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

        {/* Real event flyers as cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.5rem" }}>
          {/* Winzerbattle 1 — real flyer */}
          <div style={{ position: "relative", overflow: "hidden", backgroundColor: C.bgSage }}>
            <img
              src="/manus-storage/pj-event-winzerbattle1_d644c4c6.jpg"
              alt="Winzerbattle Rheinhessen vs. Pfalz"
              style={{ width: "100%", height: "340px", objectFit: "contain", backgroundColor: "#fddde0", display: "block" }}
            />
          </div>

          {/* Winzerbattle 2 — real flyer */}
          <div style={{ position: "relative", overflow: "hidden", backgroundColor: C.bgCream }}>
            <img
              src="/manus-storage/pj-event-winzerbattle2_5e56fba0.jpg"
              alt="Winzerbattle April"
              style={{ width: "100%", height: "340px", objectFit: "contain", backgroundColor: "#fdf6ee", display: "block" }}
            />
          </div>

          {/* Frühlingsmarkt — the crazy woman flyer */}
          <div style={{ position: "relative", overflow: "hidden", backgroundColor: "#fce8ee" }}>
            <img
              src="/manus-storage/pj-event-fruehlingsmarkt_d8cc0177.jpg"
              alt="Frühlingsmarkt — Let's celebrate spring!"
              style={{ width: "100%", height: "340px", objectFit: "contain", backgroundColor: "#fce8ee", display: "block" }}
            />
          </div>
        </div>

        <div style={{ textAlign: "center", marginTop: "2.5rem" }}>
          <p className="font-body" style={{ fontSize: "0.85rem", color: C.inkLight }}>
            Aktuelle Events & Tickets auf{" "}
            <a href="https://www.instagram.com/joujou.pfalz" target="_blank" rel="noopener noreferrer" style={{ color: C.peachDark, textDecoration: "none", fontWeight: 600 }}>
              @joujou.pfalz
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
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5rem", alignItems: "start" }}>
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
                 „Kein Pauschalpaket. Kein Mindestverbrauch, der überrascht.
                Wir reden zuerst.“
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
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1rem" }}>
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
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1rem" }}>
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
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1rem" }}>
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
                    placeholder="Was stellt ihr euch vor? Kein Anliegen ist zu groß oder zu klein."
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
  return (
    <section id="essen" style={{ backgroundColor: C.bg, padding: "7rem 0" }}>
      <div className="container">
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "4rem" }}>
          <p className="font-body" style={{ fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase", color: C.peachDark, marginBottom: "1rem" }}>
            Alles bio. Alles echt.
          </p>
          <h2 className="font-display" style={{ fontSize: "clamp(2rem, 4vw, 2.8rem)", color: C.ink, marginBottom: "1rem" }}>
            À table
          </h2>
          <p className="font-body" style={{ fontSize: "1rem", color: C.inkMid, maxWidth: "560px", margin: "0 auto", lineHeight: 1.8 }}>
            Kleine Küche. Alles biologisch, alles aus der Region.
            Zum Wein gedacht.
          </p>
        </div>

        {/* Manna Palatina — Hauptbild oben quer, darunter Text + 2 Bilder */}
        <div style={{ marginBottom: "5rem" }}>
          {/* Hauptbild quer */}
          <img
            src="/manus-storage/manna-trio-top_a8c14cd5.jpg"
            alt="Manna Palatina — drei Sorten"
            style={{ width: "100%", height: "480px", objectFit: "cover", objectPosition: "center 25%", display: "block", marginBottom: "3rem" }}
          />
          {/* Text + 2 Bilder nebeneinander */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "start" }}>
            <div>
              <p className="font-body" style={{ fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase", color: C.sageDark, marginBottom: "0.75rem" }}>
                Unsere Pinsa
              </p>
              <h3 className="font-display" style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.4rem)", color: C.ink, marginBottom: "1.25rem", lineHeight: 1.2 }}>
                Manna Palatina
              </h3>
              <p className="font-body" style={{ fontSize: "0.95rem", color: C.inkMid, lineHeight: 1.85, marginBottom: "1.5rem" }}>
                Pinsa aus Urgetreide, luftig und bekömmlich.
                Belegt mit Bio-Zutaten aus der Pfalz.
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem", marginBottom: "1.5rem" }}>
                {[
                  "Spargel · Mozzarella · Rucola",
                  "Rote Bete · Ziegenkäse · Walnuss",
                  "Tomate · Mozzarella · Basilikum",
                  "Entrecôte · Rucola · rote Zwiebeln",
                ].map((item) => (
                  <div key={item} style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                    <span style={{ color: C.peachDark, fontSize: "0.8rem", flexShrink: 0 }}>—</span>
                    <span className="font-body" style={{ fontSize: "0.9rem", color: C.inkMid }}>{item}</span>
                  </div>
                ))}
              </div>
              <div style={{ display: "inline-flex", alignItems: "center", backgroundColor: C.bgSage, padding: "0.5rem 1rem" }}>
                <span className="font-body" style={{ fontSize: "0.72rem", letterSpacing: "0.08em", color: C.sageDark }}>100% Bio · Regional · Saisonal</span>
              </div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
              <img
                src="/manus-storage/manna-entrecote_875165ec.jpg"
                alt="Manna Palatina Entrecôte"
                style={{ width: "100%", height: "220px", objectFit: "cover", objectPosition: "center 30%", display: "block" }}
              />
              <img
                src="/manus-storage/manna-detail_a2f04458.jpg"
                alt="Manna Palatina Detail"
                style={{ width: "100%", height: "220px", objectFit: "cover", objectPosition: "center 25%", display: "block" }}
              />
            </div>
          </div>
        </div>

        {/* Trennlinie */}
        <div style={{ borderTop: `1px solid ${C.border}`, marginBottom: "4rem" }} />

        {/* La Planche — Text links, Hauptbild quer rechts */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "center" }}>
          <div>
            <p className="font-body" style={{ fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase", color: C.sageDark, marginBottom: "0.75rem" }}>
              Zum Wein
            </p>
            <h3 className="font-display" style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.4rem)", color: C.ink, marginBottom: "1.25rem", lineHeight: 1.2 }}>
              La Planche du Joujou
            </h3>
            <p className="font-body" style={{ fontSize: "0.95rem", color: C.inkMid, lineHeight: 1.85, marginBottom: "1.5rem" }}>
              Pfälzer Salami, Coppa, Ziegenkäse, getrocknete Tomaten,
              Oliven, Artischocken, Sauerteigbrot.
              Alles bio, alles aus der Region.
            </p>
            <div style={{ display: "inline-flex", alignItems: "center", backgroundColor: C.bgSage, padding: "0.5rem 1rem" }}>
              <span className="font-body" style={{ fontSize: "0.72rem", letterSpacing: "0.08em", color: C.sageDark }}>100% Bio · Handverlesen · Pfälzer Produzenten</span>
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            <img
              src="/manus-storage/planche-vogel_1c283b0e.jpg"
              alt="La Planche du Joujou — Vogelperspektive"
              style={{ width: "100%", height: "280px", objectFit: "cover", objectPosition: "center 20%", display: "block" }}
            />
            <img
              src="/manus-storage/planche-detail_74fc0180.jpg"
              alt="La Planche du Joujou — Detail"
              style={{ width: "100%", height: "180px", objectFit: "cover", objectPosition: "center 25%", display: "block" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Galerie ───────────────────────────────────────────────────
function GalerieSection() {
  const photos = [
    { src: "/manus-storage/pj-eingang-abs_b47b4c4c.jpg", alt: "Eingang", caption: "Eingang" },
    { src: "/manus-storage/pj-keller-innen3-sharp_a0791967.jpg", alt: "Weinkeller", caption: "Weinkeller" },
    { src: "/manus-storage/pj-hero-abs_0cf7b090.jpg", alt: "Bar", caption: "Bar" },
    { src: "/manus-storage/pj-gastraum-abs_ba8ba180.jpg", alt: "Gastraum", caption: "Gastraum" },
    { src: "/manus-storage/pj-terrasse-abs_9eb9ef23.jpg", alt: "Terrasse", caption: "Terrasse" },
    { src: "/manus-storage/pj-hof-abs_c7c86ff4.jpg", alt: "Hof", caption: "Hof" },
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
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "0.5rem" }}>
          {photos.map((p, i) => (
            <div key={i} style={{ position: "relative", overflow: "hidden" }}>
              <img
                src={p.src}
                alt={p.alt}
                style={{ width: "100%", height: i < 2 ? "300px" : "200px", objectFit: "cover", display: "block", filter: "saturate(0.85)" }}
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
    <footer style={{ backgroundColor: "#1e3a3a", padding: "4rem 0 3rem" }}>
      <div className="container">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "3rem", marginBottom: "3rem" }}>
          <div>
            <span className="font-script" style={{ fontSize: "2rem", color: C.peach }}>
              petit joujou
            </span>
            <p className="font-body" style={{ fontSize: "0.85rem", color: C.inkLight, marginTop: "0.75rem", lineHeight: 1.7 }}>
              Weinbar · Leistadt, Pfalz<br />
              Eine Marke von JouJou Pfalz
            </p>
          </div>
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
          <div>
            <p className="font-body" style={{ fontSize: "0.7rem", letterSpacing: "0.15em", textTransform: "uppercase", color: C.sage, marginBottom: "1rem" }}>
              Kontakt
            </p>
            <p className="font-body" style={{ fontSize: "0.85rem", color: C.inkLight, lineHeight: 1.8 }}>
              Leistadt, Pfalz<br />
              <a href="mailto:hallo@petit-joujou.de" style={{ color: C.peach, textDecoration: "none" }}>
                hallo@petit-joujou.de
              </a><br />
              <a href="https://www.instagram.com/joujou.pfalz" target="_blank" rel="noopener noreferrer" style={{ color: C.peach, textDecoration: "none" }}>
                @joujou.pfalz
              </a>
            </p>
          </div>
        </div>
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: "1.5rem", textAlign: "center" }}>
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
