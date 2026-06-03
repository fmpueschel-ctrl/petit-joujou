/* ============================================================
   petit joujou — Weinbar · Leistadt, Pfalz
   klein · fein · wein
   ============================================================ */

import { useState } from "react";
import { toast } from "sonner";
import { trpc } from "@/lib/trpc";

// ── Pastell-Palette ──────────────────────────────────────────
const C = {
  bg:          "#fdf8f4",
  bgSage:      "#eef3f0",
  bgPeach:     "#fdf0e8",
  bgLavender:  "#f3eff8",
  bgCream:     "#faf6ef",
  ink:         "#3d2e22",
  inkMid:      "#6b5444",
  inkLight:    "#9c8070",
  sage:        "#a8c4b8",
  sageDark:    "#7aaa96",
  peach:       "#f5c9a3",
  peachDark:   "#e8a87c",
  lavender:    "#d4c5e2",
  rose:        "#f2d5cc",
  hotpink:     "#f472b6",
  border:      "#e8ddd4",
  borderSage:  "#c8ddd5",
};

// ── Nav ──────────────────────────────────────────────────────
function Nav() {
  const [open, setOpen] = useState(false);
  const links = [
    { label: "Weinkeller", href: "#weinkeller" },
    { label: "Scheune", href: "#scheune" },
    { label: "Garten", href: "#garten" },
    { label: "Events", href: "#events" },
    { label: "Gesellschaften", href: "#gesellschaften" },
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
        <a href="#" style={{ textDecoration: "none" }}>
          <span className="font-script" style={{ fontSize: "1.7rem", color: C.sageDark, letterSpacing: "0.02em" }}>
            petit joujou
          </span>
        </a>
        <div className="hidden md:flex items-center gap-7">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="font-body" style={{ fontSize: "0.72rem", letterSpacing: "0.1em", color: C.inkMid, textDecoration: "none", textTransform: "uppercase" }}>
              {l.label}
            </a>
          ))}
          <a href="#gesellschaften" className="font-body" style={{ fontSize: "0.72rem", letterSpacing: "0.1em", color: C.bg, textDecoration: "none", textTransform: "uppercase", backgroundColor: C.sageDark, padding: "0.45rem 1rem" }}>
            Anfragen
          </a>
        </div>
        <button className="md:hidden" onClick={() => setOpen(!open)} style={{ background: "none", border: "none", cursor: "pointer", color: C.inkMid, fontSize: "1.4rem" }}>
          {open ? "✕" : "☰"}
        </button>
      </div>
      {open && (
        <div className="md:hidden" style={{ backgroundColor: C.bg, borderTop: `1px solid ${C.border}`, padding: "1rem 0" }}>
          {links.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="block font-body" style={{ padding: "0.75rem 1.5rem", fontSize: "0.8rem", letterSpacing: "0.1em", color: C.inkMid, textDecoration: "none", textTransform: "uppercase" }}>
              {l.label}
            </a>
          ))}
          <a href="#gesellschaften" onClick={() => setOpen(false)} className="block font-body" style={{ padding: "0.75rem 1.5rem", fontSize: "0.8rem", letterSpacing: "0.1em", color: C.sageDark, textDecoration: "none", textTransform: "uppercase", fontWeight: 700 }}>
            → Anfragen
          </a>
        </div>
      )}
    </nav>
  );
}

// ── Hero ─────────────────────────────────────────────────────
function Hero() {
  return (
    <section style={{ position: "relative", height: "100vh", minHeight: "600px", overflow: "hidden", backgroundColor: C.bgSage }}>
      <div style={{ position: "absolute", inset: 0, backgroundImage: "url('/manus-storage/pj-keller-bogen-sharp_7b2865f7.jpg')", backgroundSize: "cover", backgroundPosition: "center 40%" }} />
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(160deg, rgba(253,240,232,0.45) 0%, rgba(168,196,184,0.25) 50%, rgba(253,248,244,0.7) 100%)" }} />
      <div style={{ position: "relative", zIndex: 1, height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", textAlign: "center", padding: "0 1.5rem" }}>
        <div style={{ marginBottom: "1.5rem" }}>
          <p className="font-body" style={{ fontSize: "0.7rem", letterSpacing: "0.25em", textTransform: "uppercase", color: C.sageDark, marginBottom: "0.5rem" }}>
            Weinbar · Leistadt, Pfalz
          </p>
          <h1 className="font-script" style={{ fontSize: "clamp(3.5rem, 10vw, 7rem)", color: C.ink, lineHeight: 1, textShadow: "0 2px 20px rgba(253,248,244,0.7)" }}>
            petit joujou
          </h1>
          <div style={{ width: "4rem", height: "1px", backgroundColor: C.peachDark, margin: "1.25rem auto" }} />
          <p className="font-display" style={{ fontSize: "clamp(1rem, 2.5vw, 1.4rem)", color: C.inkMid, letterSpacing: "0.15em", fontStyle: "italic" }}>
            klein · fein · wein
          </p>
        </div>
        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", justifyContent: "center", marginTop: "2rem" }}>
          <a href="#weinkeller" className="font-body" style={{ padding: "0.85rem 2rem", backgroundColor: C.sageDark, color: C.bg, textDecoration: "none", fontSize: "0.75rem", letterSpacing: "0.12em", textTransform: "uppercase" }}>
            Weinkeller entdecken
          </a>
          <a href="#gesellschaften" className="font-body" style={{ padding: "0.85rem 2rem", backgroundColor: "transparent", color: C.ink, textDecoration: "none", fontSize: "0.75rem", letterSpacing: "0.12em", textTransform: "uppercase", border: `1px solid ${C.ink}` }}>
            Gesellschaft anfragen
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
        <h2 className="font-display" style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)", color: C.ink, marginBottom: "1.5rem", lineHeight: 1.4 }}>
petit joujou — dein Weintempel.
        </h2>
        <p className="font-body" style={{ fontSize: "1.15rem", color: C.inkMid, lineHeight: 2, letterSpacing: "0.02em" }}>
          Pfalz · Rheinhessen · Österreich · Frankreich.<br />
          500 Weine &amp; Bubbles. Bio.<br />
          <span className="font-display" style={{ fontSize: "1.4rem", color: C.ink, fontStyle: "italic" }}>Lecker.</span>
        </p>
        {/* Three pillars */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.5rem", marginTop: "3.5rem" }}>
          {[
            { title: "Begehbarer Keller", text: "Kein Katalog. Kein Tablet. Echte Flaschen im Regal." },
            { title: "Nur Bio", text: "Biodynamisch, naturnah, fair — von Winzern, die wir persönlich kennen." },
            { title: "Bis 100 Gäste", text: "Hochzeiten, Geburtstage, Firmen — wir passen uns an euch an." },
          ].map((p) => (
            <div key={p.title} style={{ padding: "1.5rem 1rem", backgroundColor: C.bgSage, borderTop: `2px solid ${C.sage}` }}>
              <div className="font-display" style={{ fontSize: "1rem", color: C.ink, marginBottom: "0.5rem" }}>{p.title}</div>
              <div className="font-body" style={{ fontSize: "0.85rem", color: C.inkMid, lineHeight: 1.65 }}>{p.text}</div>
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
      {/* Full-width arch entrance photo */}
      <div style={{ position: "relative", height: "80vh", minHeight: "520px", overflow: "hidden" }}>
        <img
          src="/manus-storage/pj-keller-bogen-sharp_7b2865f7.jpg"
          alt="Eingang Weinkeller — romanischer Sandsteinbogen"
          style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 35%" }}
        />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, transparent 30%, rgba(250,246,239,0.95) 100%)" }} />
        <div style={{ position: "absolute", bottom: "3rem", left: "50%", transform: "translateX(-50%)", textAlign: "center", width: "100%", padding: "0 1.5rem" }}>
          <p className="font-body" style={{ fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase", color: C.sageDark, marginBottom: "0.5rem" }}>
            Begehbare Weinkarte
          </p>
          <h2 className="font-display" style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", color: C.ink }}>
            Durch den Bogen in eine andere Welt
          </h2>
        </div>
      </div>

      {/* Single large cellar panorama */}
      <div style={{ position: "relative", overflow: "hidden" }}>
        <img
          src="/manus-storage/pj-keller-innen1-sharp_239ba768.jpg"
          alt="Weinkeller — Gewölbe mit Treppe und Weinregalen"
          style={{ width: "100%", height: "520px", objectFit: "cover", objectPosition: "center 30%", display: "block" }}
        />
      </div>


      {/* Text below gallery */}
      <div style={{ backgroundColor: C.bgCream, padding: "5rem 0" }}>
        <div style={{ maxWidth: "700px", margin: "0 auto", padding: "0 1.5rem" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "3rem", alignItems: "start" }}>
            <div>
              <p className="font-body" style={{ fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase", color: C.sageDark, marginBottom: "1rem" }}>
                So funktioniert's
              </p>
              <h3 className="font-display" style={{ fontSize: "1.6rem", color: C.ink, marginBottom: "1.25rem" }}>
                Kein Termin.<br />Kein Dresscode.<br />Einfach reinkommen.
              </h3>
              <p className="font-body" style={{ fontSize: "0.95rem", color: C.inkMid, lineHeight: 1.8 }}>
                Walk-in willkommen. Wir sind Do–Fr ab 17 Uhr und Sa–So ab 12 Uhr für euch da.
                Hunde auch.
              </p>
            </div>
            <div>
              <p className="font-body" style={{ fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase", color: C.peachDark, marginBottom: "1rem" }}>
                Was euch erwartet
              </p>
              {[
                "500 Weine & Bubbles im begehbaren Keller",
                "Biodynamisch, naturnah, fair",
                "Pfälzer Winzer & internationale Entdeckungen",
                "Wein zum Trinken & zum Mitnehmen",
                "Persönliche Beratung — wenn ihr wollt",
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
    <section id="scheune" style={{ backgroundColor: C.bg, padding: "0" }}>
      <div style={{ position: "relative", height: "70vh", minHeight: "480px", overflow: "hidden" }}>
        <img
          src="/manus-storage/pj-scheune-abs_19d7666b.jpg"
          alt="Scheune — historischer Dachstuhl"
          style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 20%" }}
        />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(253,248,244,0.92) 0%, rgba(253,248,244,0.1) 55%, transparent 100%)" }} />
        <div style={{ position: "absolute", bottom: "3rem", left: "50%", transform: "translateX(-50%)", textAlign: "center", width: "100%", padding: "0 1.5rem" }}>
          <p className="font-body" style={{ fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase", color: C.peachDark, marginBottom: "0.5rem" }}>
            Drinnen
          </p>
          <h2 className="font-display" style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", color: C.ink }}>
            Scheune mit Geschichte
          </h2>
        </div>
      </div>
      <div style={{ backgroundColor: C.bgPeach, padding: "5rem 0" }}>
        <div style={{ maxWidth: "680px", margin: "0 auto", padding: "0 1.5rem", textAlign: "center" }}>
          <p className="font-body" style={{ fontSize: "1.05rem", color: C.inkMid, lineHeight: 1.85 }}>
            Historischer Dachstuhl, Bruchsteinwände, Rattan-Lampen und der Geruch von altem Holz.
            Kein steriles Weinlokal — ein echter Ort, der Geschichten erzählt.
            Hier sitzt man nicht, um zu sehen und gesehen zu werden.
            Hier sitzt man, um zu trinken und zu reden.
          </p>
          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", justifyContent: "center", marginTop: "2rem" }}>
            {["Historischer Dachstuhl", "Bruchsteinwände", "Bis 60 Gäste innen"].map((tag) => (
              <span key={tag} className="font-body" style={{ padding: "0.4rem 0.9rem", backgroundColor: C.rose, color: C.inkMid, fontSize: "0.72rem", letterSpacing: "0.06em" }}>
                {tag}
              </span>
            ))}
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
              Zwischen Zypressen, alten Weinfässern und Sonnenschirmen.
              Kein Biergarten — eine Verlängerung der Scheune unter freiem Himmel.
              Ideal für warme Abende, spontane Besuche und Wein, der nach Pfalz schmeckt.
            </p>
            <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
              {["Walk-in willkommen", "Hunde erlaubt", "Kein Dresscode", "Bis 40 Gäste außen"].map((tag) => (
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
            Winzerbattles, Frühlingsmärkte, Naturwein-Abende — bei uns passiert immer etwas.
          </p>
        </div>

        {/* Real event flyers as cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.5rem" }}>
          {/* Winzerbattle 1 — real flyer */}
          <div style={{ position: "relative", overflow: "hidden", backgroundColor: C.bgSage }}>
            <img
              src="/manus-storage/pj-event-winzerbattle1_d644c4c6.jpg"
              alt="Winzerbattle Rheinhessen vs. Pfalz"
              style={{ width: "100%", height: "340px", objectFit: "contain", backgroundColor: "#ff69b4", display: "block" }}
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
          <div style={{ position: "relative", overflow: "hidden", backgroundColor: "#b8d4c8" }}>
            <img
              src="/manus-storage/pj-event-fruehlingsmarkt_d8cc0177.jpg"
              alt="Frühlingsmarkt — Let's celebrate spring!"
              style={{ width: "100%", height: "340px", objectFit: "contain", backgroundColor: "#b8d4c8", display: "block" }}
            />
          </div>
        </div>

        <div style={{ textAlign: "center", marginTop: "2.5rem" }}>
          <p className="font-body" style={{ fontSize: "0.85rem", color: C.inkLight }}>
            Aktuelle Events & Tickets auf{" "}
            <a href="https://www.instagram.com/joujou.pfalz" target="_blank" rel="noopener noreferrer" style={{ color: C.sageDark, textDecoration: "none", fontWeight: 600 }}>
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
              Feiern & Gesellschaften
            </p>
            <h2 className="font-display" style={{ fontSize: "clamp(2rem, 4vw, 2.8rem)", color: C.ink, marginBottom: "1.5rem", lineHeight: 1.25 }}>
              Euer Abend.<br />Euer Budget.<br />Unsere Bühne.
            </h2>
            <p className="font-body" style={{ fontSize: "1rem", color: C.inkMid, lineHeight: 1.85, marginBottom: "2rem" }}>
              Wir sind spezialisiert darauf, unser Angebot an eure Wünsche und euer Budget anzupassen —
              nicht umgekehrt. Ob Hochzeit im Gewölbekeller, Geburtstag in der Scheune oder
              Firmenevent im Garten: Wir denken mit euch, nicht für euch.
            </p>

            {/* Occasion types */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "2rem" }}>
              {[
                { label: "Hochzeiten", sub: "Bis 100 Gäste" },
                { label: "Geburtstage", sub: "Jede Größe" },
                { label: "Firmen", sub: "Events & Teamabende" },
                { label: "Weinabende", sub: "Privat & exklusiv" },
              ].map((o) => (
                <div key={o.label} style={{ backgroundColor: C.bg, padding: "1.25rem", borderLeft: `3px solid ${C.sage}` }}>
                  <div>
                    <div className="font-display" style={{ fontSize: "0.95rem", color: C.ink }}>{o.label}</div>
                    <div className="font-body" style={{ fontSize: "0.75rem", color: C.inkLight }}>{o.sub}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Key promise */}
            <div style={{ backgroundColor: C.bg, padding: "1.5rem", borderLeft: `4px solid ${C.sage}` }}>
              <p className="font-body" style={{ fontSize: "0.9rem", color: C.inkMid, lineHeight: 1.7, fontStyle: "italic" }}>
                „Kein Pauschalpaket. Kein Mindestverbrauch, der euch überrascht.
                Wir reden zuerst — und dann rechnen wir."
              </p>
            </div>
          </div>

          {/* Right: Form */}
          <div style={{ backgroundColor: C.bg, padding: "2.5rem" }}>
            {sent ? (
              <div style={{ textAlign: "center", padding: "3rem 1rem" }}>
                <div style={{ width: "3rem", height: "2px", backgroundColor: C.sage, margin: "0 auto 1.5rem" }} />
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
                  style={{ width: "100%", padding: "1rem", backgroundColor: anfrageMutation.isPending ? C.sage : C.sageDark, color: C.bg, border: "none", fontSize: "0.8rem", letterSpacing: "0.12em", textTransform: "uppercase", cursor: anfrageMutation.isPending ? "not-allowed" : "pointer" }}
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
                style={{ width: "100%", height: i < 2 ? "300px" : "200px", objectFit: "cover", display: "block", filter: "saturate(0.85)" }}
              />
              <div style={{ position: "absolute", bottom: "0.75rem", left: "0.75rem", backgroundColor: "rgba(253,248,244,0.82)", padding: "0.2rem 0.65rem" }}>
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
    <footer style={{ backgroundColor: C.ink, padding: "4rem 0 3rem" }}>
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
        <GartenSection />
        <EventsSection />
        <GesellschaftenSection />
        <GalerieSection />
      </main>
      <Footer />
    </div>
  );
}
