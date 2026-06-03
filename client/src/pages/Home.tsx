/* ============================================================
   petit joujou — Home Page
   Weinbar & Bistro · Leistadt, Pfalz
   klein, fein, wein
   ============================================================ */

import { useState } from "react";
import { toast } from "sonner";

// ── Color constants ──────────────────────────────────────────
const C = {
  green:      "#244237",
  greenMid:   "#3c6254",
  greenLight: "#4f6a60",
  terra:      "#c8783a",
  terraDark:  "#a05e2a",
  apricot:    "#f2c9a0",
  apricotLight: "#fae8d4",
  cream:      "#c5b299",
  ivory:      "#fdf6ee",
  brown:      "#2a1a0e",
  brownMid:   "#5c3d20",
  muted:      "#8a7060",
};

// ── Nav ──────────────────────────────────────────────────────
function Nav() {
  const [open, setOpen] = useState(false);
  const links = [
    { label: "Das Entrecôte", href: "#entrecote" },
    { label: "Weinbar", href: "#weinbar" },
    { label: "Manna Palatina", href: "#pinsa" },
    { label: "Weinbegleiter", href: "#begleiter" },
    { label: "Shop & Events", href: "#shop" },
  ];
  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        backgroundColor: "rgba(253,246,238,0.92)",
        backdropFilter: "blur(12px)",
        borderBottom: `1px solid ${C.cream}`,
      }}
    >
      <div className="container flex items-center justify-between" style={{ height: "64px" }}>
        {/* Logo */}
        <a href="#" className="flex flex-col leading-none" style={{ textDecoration: "none" }}>
          <span
            className="font-display"
            style={{ fontSize: "0.75rem", letterSpacing: "0.15em", color: C.green, textTransform: "uppercase" }}
          >
            petit
          </span>
          <span
            className="font-script"
            style={{ fontSize: "1.5rem", color: C.terra, lineHeight: 1 }}
          >
            joujou
          </span>
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="font-body"
              style={{ fontSize: "0.8rem", letterSpacing: "0.08em", color: C.brownMid, textDecoration: "none", textTransform: "uppercase" }}
            >
              {l.label}
            </a>
          ))}
        </div>

        {/* Reservation CTA */}
        <a
          href="#reservierung"
          className="hidden md:inline-flex items-center font-body"
          style={{
            fontSize: "0.75rem",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            backgroundColor: C.green,
            color: C.ivory,
            padding: "0.5rem 1.25rem",
            textDecoration: "none",
          }}
        >
          Reservieren
        </a>

        {/* Mobile burger */}
        <button
          className="md:hidden"
          onClick={() => setOpen(!open)}
          style={{ background: "none", border: "none", cursor: "pointer", color: C.brown }}
        >
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
            {open ? (
              <>
                <line x1="3" y1="3" x2="19" y2="19" stroke="currentColor" strokeWidth="1.5" />
                <line x1="19" y1="3" x2="3" y2="19" stroke="currentColor" strokeWidth="1.5" />
              </>
            ) : (
              <>
                <line x1="3" y1="6" x2="19" y2="6" stroke="currentColor" strokeWidth="1.5" />
                <line x1="3" y1="11" x2="19" y2="11" stroke="currentColor" strokeWidth="1.5" />
                <line x1="3" y1="16" x2="19" y2="16" stroke="currentColor" strokeWidth="1.5" />
              </>
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div
          className="md:hidden"
          style={{ backgroundColor: C.ivory, borderTop: `1px solid ${C.cream}`, padding: "1rem 1.5rem 1.5rem" }}
        >
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block font-body"
              style={{ fontSize: "0.85rem", letterSpacing: "0.08em", color: C.brownMid, textDecoration: "none", textTransform: "uppercase", padding: "0.6rem 0", borderBottom: `1px solid ${C.cream}` }}
            >
              {l.label}
            </a>
          ))}
          <a
            href="#reservierung"
            onClick={() => setOpen(false)}
            className="block font-body text-center"
            style={{ fontSize: "0.8rem", letterSpacing: "0.1em", textTransform: "uppercase", backgroundColor: C.green, color: C.ivory, padding: "0.75rem", textDecoration: "none", marginTop: "1rem" }}
          >
            Reservieren
          </a>
        </div>
      )}
    </nav>
  );
}

// ── Hero ─────────────────────────────────────────────────────
function Hero() {
  return (
    <section
      className="relative"
      style={{ minHeight: "100vh", overflow: "hidden" }}
    >
      {/* Background image */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: "url('/manus-storage/joujou-hero_9c81f848.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      {/* Overlay */}
      <div
        className="absolute inset-0"
        style={{ background: "linear-gradient(to bottom, rgba(36,66,55,0.35) 0%, rgba(36,66,55,0.6) 60%, rgba(36,66,55,0.82) 100%)" }}
      />

      {/* Content */}
      <div
        className="relative z-10 flex flex-col items-center justify-center text-center"
        style={{ minHeight: "100vh", padding: "6rem 1.5rem 4rem" }}
      >
        {/* Logo mark */}
        <div style={{ marginBottom: "2rem" }}>
          <div
            className="font-display"
            style={{ fontSize: "clamp(0.9rem, 2vw, 1.1rem)", letterSpacing: "0.3em", color: C.apricot, textTransform: "uppercase", marginBottom: "0.25rem" }}
          >
            petit
          </div>
          <div
            className="font-script"
            style={{ fontSize: "clamp(4rem, 10vw, 7rem)", color: C.apricotLight, lineHeight: 0.9 }}
          >
            joujou
          </div>
        </div>

        {/* Divider */}
        <div style={{ width: "3rem", height: "1px", backgroundColor: C.cream, margin: "0 auto 1.75rem" }} />

        {/* Slogan */}
        <p
          className="font-display"
          style={{ fontSize: "clamp(1.2rem, 3vw, 1.8rem)", color: C.apricotLight, fontStyle: "italic", letterSpacing: "0.05em", marginBottom: "0.75rem" }}
        >
          klein, fein, wein
        </p>

        <p
          className="font-body"
          style={{ fontSize: "clamp(0.85rem, 1.5vw, 1rem)", color: C.cream, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "3rem" }}
        >
          Weinbar &amp; Bistro · Leistadt, Pfalz
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
          <a
            href="#entrecote"
            className="font-body"
            style={{
              fontSize: "0.8rem",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              backgroundColor: C.terra,
              color: C.ivory,
              padding: "0.85rem 2.25rem",
              textDecoration: "none",
              transition: "opacity 0.2s",
            }}
          >
            Das Entrecôte
          </a>
          <a
            href="#weinbar"
            className="font-body"
            style={{
              fontSize: "0.8rem",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              border: `1px solid ${C.cream}`,
              color: C.cream,
              padding: "0.85rem 2.25rem",
              textDecoration: "none",
              backgroundColor: "transparent",
            }}
          >
            Weinbar entdecken
          </a>
        </div>

        {/* Scroll hint */}
        <div style={{ position: "absolute", bottom: "2rem", left: "50%", transform: "translateX(-50%)" }}>
          <div style={{ width: "1px", height: "3rem", backgroundColor: C.cream, margin: "0 auto", opacity: 0.6 }} />
        </div>
      </div>
    </section>
  );
}

// ── Intro Band ───────────────────────────────────────────────
function IntroBand() {
  return (
    <section
      style={{
        backgroundColor: C.green,
        padding: "1.5rem 1.5rem",
        textAlign: "center",
      }}
    >
      <p
        className="font-display"
        style={{ fontSize: "clamp(1rem, 2vw, 1.25rem)", color: C.apricotLight, fontStyle: "italic", letterSpacing: "0.04em" }}
      >
        400+ kuratierte Bio-Weine · Gewölbekeller · Nur donnerstags geöffnet
      </p>
    </section>
  );
}

// ── Entrecôte Section ────────────────────────────────────────
function EntrecoteSection() {
  return (
    <section id="entrecote" style={{ backgroundColor: C.ivory, padding: "5rem 0" }}>
      <div className="container">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <div style={{ position: "relative" }}>
            <img
              src="/manus-storage/joujou-steak_0f586b2a.jpg"
              alt="Das Entrecôte — 400g Dry Aged Bio"
              style={{ width: "100%", height: "460px", objectFit: "cover", display: "block" }}
            />
            {/* Price badge */}
            <div
              style={{
                position: "absolute",
                bottom: "1.5rem",
                right: "1.5rem",
                backgroundColor: C.green,
                color: C.apricotLight,
                padding: "1rem 1.5rem",
                textAlign: "center",
              }}
            >
              <div className="font-display" style={{ fontSize: "2.5rem", lineHeight: 1, fontWeight: 500 }}>64</div>
              <div className="font-body" style={{ fontSize: "0.65rem", letterSpacing: "0.15em", textTransform: "uppercase", color: C.cream, marginTop: "0.25rem" }}>pro Person</div>
            </div>
          </div>

          {/* Text */}
          <div>
            <p
              className="font-body"
              style={{ fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase", color: C.terra, marginBottom: "0.75rem" }}
            >
              Das Herzstück
            </p>
            <h2
              className="font-display"
              style={{ fontSize: "clamp(2.5rem, 5vw, 3.5rem)", color: C.brown, marginBottom: "0.5rem", lineHeight: 1.1 }}
            >
              Das Entrecôte
            </h2>
            <div style={{ width: "3rem", height: "1px", backgroundColor: C.terra, marginBottom: "1.75rem" }} />

            <p
              className="font-body"
              style={{ fontSize: "1rem", color: C.brownMid, lineHeight: 1.8, marginBottom: "2rem" }}
            >
              400g Dry Aged Bio-Entrecôte. 5 Wochen Reifung. Vom Weiderind der{" "}
              <strong style={{ color: C.green }}>Land.Luft.bio</strong> — mit Weideschlachtung, weil das der einzige ehrliche Weg ist.
              Sous-vide gegart, dann auf der Plancha mit perfekter Kruste vollendet.
            </p>

            {/* Details list */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "2rem" }}>
              {[
                { label: "Gewicht", value: "400g" },
                { label: "Reifung", value: "5 Wochen Dry Aged" },
                { label: "Herkunft", value: "Land.Luft.bio" },
                { label: "Zubereitung", value: "Sous-vide + Plancha" },
                { label: "Inklusive", value: "Manna Palatina Pinsa" },
                { label: "Sauce", value: "Vegane Knoblauchsauce" },
              ].map((d) => (
                <div key={d.label} style={{ borderBottom: `1px solid ${C.cream}`, paddingBottom: "0.75rem" }}>
                  <div className="font-body" style={{ fontSize: "0.65rem", letterSpacing: "0.15em", textTransform: "uppercase", color: C.muted, marginBottom: "0.2rem" }}>{d.label}</div>
                  <div className="font-display" style={{ fontSize: "1rem", color: C.brown }}>{d.value}</div>
                </div>
              ))}
            </div>

            {/* Important notice */}
            <div
              style={{
                backgroundColor: C.apricotLight,
                border: `1px solid ${C.cream}`,
                padding: "1rem 1.25rem",
                marginBottom: "1.75rem",
              }}
            >
              <p className="font-body" style={{ fontSize: "0.8rem", color: C.brownMid, lineHeight: 1.7 }}>
                <strong style={{ color: C.green }}>Nur donnerstags.</strong> Reservierung erforderlich.
                Bitte Garstufe bei der Reservierung angeben.
              </p>
            </div>

            <a
              href="#reservierung"
              className="font-body"
              style={{
                display: "inline-block",
                fontSize: "0.78rem",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                backgroundColor: C.green,
                color: C.ivory,
                padding: "0.85rem 2rem",
                textDecoration: "none",
              }}
            >
              Tisch reservieren
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Weinbar Section ──────────────────────────────────────────
function WeinbarSection() {
  const weine = [
    { type: "Weiss / Rosé", glas: "7,50", flasche: "22,50" },
    { type: "Rot", glas: "8,00", flasche: "23,50" },
    { type: "Prinz Salm Bubbles", glas: "7,70", flasche: "45,00" },
  ];

  return (
    <section id="weinbar" style={{ backgroundColor: C.green, padding: "5rem 0", position: "relative", overflow: "hidden" }}>
      {/* Background image overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: "url('/manus-storage/joujou-wine_91c3040d.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.15,
        }}
      />

      <div className="container" style={{ position: "relative", zIndex: 1 }}>
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Left: Text */}
          <div>
            <p
              className="font-body"
              style={{ fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase", color: C.apricot, marginBottom: "0.75rem" }}
            >
              Der Gewölbekeller
            </p>
            <h2
              className="font-display"
              style={{ fontSize: "clamp(2.5rem, 5vw, 3.5rem)", color: C.apricotLight, marginBottom: "0.5rem", lineHeight: 1.1 }}
            >
              Die Weinbar
            </h2>
            <div style={{ width: "3rem", height: "1px", backgroundColor: C.terra, marginBottom: "1.75rem" }} />

            <p
              className="font-body"
              style={{ fontSize: "1rem", color: C.cream, lineHeight: 1.8, marginBottom: "1.5rem" }}
            >
              Über 400 sorgfältig kuratierte Bio-Weine aus dem Gewölbekeller.
              Kein Mainstream. Kein Kompromiss. Nur Weine, hinter denen wir stehen.
            </p>
            <p
              className="font-body"
              style={{ fontSize: "1rem", color: C.cream, lineHeight: 1.8, marginBottom: "2.5rem" }}
            >
              Walk-in willkommen. Kein Reservierungszwang für die Weinbar.
              Einfach kommen, setzen, trinken.
            </p>

            {/* Wine price table */}
            <div style={{ border: `1px solid rgba(197,178,153,0.3)` }}>
              <div
                className="font-body"
                style={{ fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", color: C.apricot, padding: "0.75rem 1.25rem", borderBottom: `1px solid rgba(197,178,153,0.2)`, display: "grid", gridTemplateColumns: "1fr auto auto", gap: "1rem" }}
              >
                <span>Wein vom Wingert</span>
                <span>Glas</span>
                <span>Flasche</span>
              </div>
              {weine.map((w, i) => (
                <div
                  key={i}
                  className="font-display"
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr auto auto",
                    gap: "1rem",
                    padding: "0.85rem 1.25rem",
                    borderBottom: i < weine.length - 1 ? `1px solid rgba(197,178,153,0.15)` : "none",
                    color: C.apricotLight,
                    fontSize: "1rem",
                    alignItems: "center",
                  }}
                >
                  <span>{w.type}</span>
                  <span style={{ color: C.apricot }}>{w.glas}</span>
                  <span style={{ color: C.apricot }}>{w.flasche}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Image */}
          <div>
            <img
              src="/manus-storage/joujou-wine_91c3040d.jpg"
              alt="Weinbar im Gewölbekeller"
              style={{ width: "100%", height: "500px", objectFit: "cover", display: "block" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Manna Palatina (Pinsa) Section ───────────────────────────
function PinsaSection() {
  const pinsas = [
    { name: "Palatina Rosso", desc: "Tomatensauce, Mozzarella, frisches Basilikum, Olivenöl", price: "9,90" },
    { name: "Bianca Salame", desc: "Crème fraîche, Salami, Rucola, Parmesan, Zitronenabrieb", price: "15,00" },
    { name: "Umami Royale", desc: "Trüffelcreme, Champignons, Taleggio, frischer Thymian", price: "14,80" },
    { name: "Pink Velvet", desc: "Rote Bete, Ziegenkäse, Walnüsse, Honig, Rucola", price: "13,50" },
    { name: "Smoked Rebel", desc: "Geräucherter Scamorza, Speck, Birne, Radicchio, Balsamico", price: "16,00" },
  ];

  return (
    <section id="pinsa" style={{ backgroundColor: C.apricotLight, padding: "5rem 0" }}>
      <div className="container">
        {/* Header */}
        <div className="text-center" style={{ marginBottom: "3.5rem" }}>
          <p
            className="font-body"
            style={{ fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase", color: C.terra, marginBottom: "0.75rem" }}
          >
            Handgemacht · Luftig · Knusprig
          </p>
          <h2
            className="font-display"
            style={{ fontSize: "clamp(2.5rem, 5vw, 3.5rem)", color: C.brown, marginBottom: "0.5rem" }}
          >
            Manna Palatina
          </h2>
          <div style={{ width: "3rem", height: "1px", backgroundColor: C.terra, margin: "0 auto 1.25rem" }} />
          <p
            className="font-body"
            style={{ fontSize: "1rem", color: C.brownMid, maxWidth: "520px", margin: "0 auto" }}
          >
            Unsere Pinsa — leichter als Pizza, knuspriger als Focaccia.
            Der perfekte Begleiter zum Wein.
          </p>
        </div>

        {/* Pinsa grid */}
        <div className="grid md:grid-cols-2 gap-0" style={{ border: `1px solid ${C.cream}` }}>
          {pinsas.map((p, i) => (
            <div
              key={i}
              style={{
                padding: "1.75rem 2rem",
                borderRight: i % 2 === 0 ? `1px solid ${C.cream}` : "none",
                borderBottom: i < pinsas.length - 1 ? `1px solid ${C.cream}` : "none",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                gap: "1rem",
                backgroundColor: i % 2 === 0 ? "transparent" : "rgba(255,255,255,0.4)",
              }}
            >
              <div style={{ flex: 1 }}>
                <h3
                  className="font-display"
                  style={{ fontSize: "1.2rem", color: C.brown, marginBottom: "0.4rem" }}
                >
                  {p.name}
                </h3>
                <p
                  className="font-body"
                  style={{ fontSize: "0.85rem", color: C.muted, lineHeight: 1.6 }}
                >
                  {p.desc}
                </p>
              </div>
              <div
                className="font-display"
                style={{ fontSize: "1.3rem", color: C.green, whiteSpace: "nowrap", fontWeight: 500 }}
              >
                {p.price}
              </div>
            </div>
          ))}
          {/* Package highlight */}
          <div
            style={{
              padding: "1.75rem 2rem",
              backgroundColor: C.green,
              borderTop: `1px solid ${C.cream}`,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: "1rem",
            }}
          >
            <div>
              <div
                className="font-body"
                style={{ fontSize: "0.65rem", letterSpacing: "0.15em", textTransform: "uppercase", color: C.apricot, marginBottom: "0.4rem" }}
              >
                Package
              </div>
              <h3
                className="font-display"
                style={{ fontSize: "1.2rem", color: C.apricotLight, marginBottom: "0.3rem" }}
              >
                Pimentos + Sangria
              </h3>
              <p
                className="font-body"
                style={{ fontSize: "0.85rem", color: C.cream }}
              >
                Pimentos de Padrón 8,80 + Sangria 8,00
              </p>
            </div>
            <div style={{ textAlign: "right" }}>
              <div
                className="font-display"
                style={{ fontSize: "1.5rem", color: C.apricotLight }}
              >
                15,00
              </div>
              <div
                className="font-body"
                style={{ fontSize: "0.65rem", letterSpacing: "0.1em", color: C.apricot, textTransform: "uppercase" }}
              >
                zusammen
              </div>
            </div>
          </div>
        </div>

        {/* Pinsa image */}
        <div style={{ marginTop: "3rem" }}>
          <img
            src="/manus-storage/joujou-pinsa_421588b0.jpg"
            alt="Manna Palatina Pinsa"
            style={{ width: "100%", height: "340px", objectFit: "cover", display: "block" }}
          />
        </div>
      </div>
    </section>
  );
}

// ── Weinbegleiter Section ────────────────────────────────────
function BegleiterSection() {
  const items = [
    { name: "Bio-Blattsalat", price: "7,50" },
    { name: "Hummus", price: "5,50" },
    { name: "Bakery Vibes", price: "8,50" },
    { name: "Oliven", price: "5,00" },
    { name: "Artischocken", price: "6,00" },
    { name: "Tomaten", price: "5,50" },
    { name: "Tagessuppe", price: "6,50" },
  ];

  return (
    <section id="begleiter" style={{ backgroundColor: C.ivory, padding: "5rem 0" }}>
      <div className="container">
        <div className="grid md:grid-cols-2 gap-16 items-start">
          {/* Left */}
          <div>
            <p
              className="font-body"
              style={{ fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase", color: C.terra, marginBottom: "0.75rem" }}
            >
              Kleine Begleiter
            </p>
            <h2
              className="font-display"
              style={{ fontSize: "clamp(2rem, 4vw, 2.8rem)", color: C.brown, marginBottom: "0.5rem", lineHeight: 1.1 }}
            >
              Weinbegleiter
            </h2>
            <div style={{ width: "3rem", height: "1px", backgroundColor: C.terra, marginBottom: "1.75rem" }} />
            <p
              className="font-body"
              style={{ fontSize: "1rem", color: C.brownMid, lineHeight: 1.8, marginBottom: "2rem" }}
            >
              Kleine Gerichte, die den Wein sprechen lassen.
              Ehrlich, saisonal, unkompliziert.
            </p>
          </div>

          {/* Right: Menu */}
          <div>
            {items.map((item, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "baseline",
                  padding: "0.85rem 0",
                  borderBottom: `1px solid ${C.cream}`,
                }}
              >
                <span className="font-display" style={{ fontSize: "1.1rem", color: C.brown }}>{item.name}</span>
                <span
                  className="font-display"
                  style={{ fontSize: "1rem", color: C.green, fontWeight: 500 }}
                >
                  {item.price}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Shop & Events Section ────────────────────────────────────
function ShopSection() {
  const handleComingSoon = (label: string) => {
    toast(`${label} — demnächst verfügbar`, {
      description: "Wir arbeiten daran. Melde dich für Updates an.",
      duration: 3500,
    });
  };

  const cards = [
    {
      icon: "🎟",
      title: "Events & Tickets",
      desc: "Dégustationen, Weinabende, Sonderveranstaltungen. Exklusiv. Limitiert.",
      cta: "Tickets kaufen",
      action: () => handleComingSoon("Tickets"),
    },
    {
      icon: "🛍",
      title: "Merch Shop",
      desc: "petit joujou T-Shirts, Caps und mehr. Für alle, die den Vibe nach Hause tragen wollen.",
      cta: "Shop besuchen",
      action: () => handleComingSoon("Merch Shop"),
    },
    {
      icon: "🍷",
      title: "Wein kaufen",
      desc: "Unsere kuratierten Bio-Weine direkt nach Hause. Bald online bestellbar.",
      cta: "Wein bestellen",
      action: () => handleComingSoon("Weinshop"),
    },
  ];

  return (
    <section id="shop" style={{ backgroundColor: C.apricotLight, padding: "5rem 0" }}>
      <div className="container">
        {/* Header */}
        <div className="text-center" style={{ marginBottom: "3.5rem" }}>
          <p
            className="font-body"
            style={{ fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase", color: C.terra, marginBottom: "0.75rem" }}
          >
            Mehr petit joujou
          </p>
          <h2
            className="font-display"
            style={{ fontSize: "clamp(2.5rem, 5vw, 3.5rem)", color: C.brown, marginBottom: "0.5rem" }}
          >
            Shop &amp; Events
          </h2>
          <div style={{ width: "3rem", height: "1px", backgroundColor: C.terra, margin: "0 auto" }} />
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-0" style={{ border: `1px solid ${C.cream}` }}>
          {cards.map((c, i) => (
            <div
              key={i}
              style={{
                padding: "2.5rem 2rem",
                borderRight: i < cards.length - 1 ? `1px solid ${C.cream}` : "none",
                backgroundColor: i === 1 ? "rgba(255,255,255,0.5)" : "transparent",
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
              }}
            >
              <div style={{ fontSize: "2rem" }}>{c.icon}</div>
              <h3
                className="font-display"
                style={{ fontSize: "1.4rem", color: C.brown }}
              >
                {c.title}
              </h3>
              <p
                className="font-body"
                style={{ fontSize: "0.9rem", color: C.brownMid, lineHeight: 1.7, flex: 1 }}
              >
                {c.desc}
              </p>
              <button
                onClick={c.action}
                className="font-body"
                style={{
                  fontSize: "0.75rem",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  backgroundColor: C.green,
                  color: C.ivory,
                  padding: "0.75rem 1.5rem",
                  border: "none",
                  cursor: "pointer",
                  alignSelf: "flex-start",
                }}
              >
                {c.cta}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Reservierung Section ─────────────────────────────────────
function ReservierungSection() {
  const [form, setForm] = useState({ name: "", date: "", personen: "2", garstufe: "", notiz: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    toast("Reservierungsanfrage gesendet!", {
      description: "Wir melden uns in Kürze per E-Mail zur Bestätigung.",
      duration: 5000,
    });
  };

  return (
    <section id="reservierung" style={{ backgroundColor: C.green, padding: "5rem 0" }}>
      <div className="container">
        <div className="grid md:grid-cols-2 gap-16 items-start">
          {/* Left: Info */}
          <div>
            <p
              className="font-body"
              style={{ fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase", color: C.apricot, marginBottom: "0.75rem" }}
            >
              Nur donnerstags
            </p>
            <h2
              className="font-display"
              style={{ fontSize: "clamp(2.5rem, 5vw, 3.5rem)", color: C.apricotLight, marginBottom: "0.5rem", lineHeight: 1.1 }}
            >
              Reservierung
            </h2>
            <div style={{ width: "3rem", height: "1px", backgroundColor: C.terra, marginBottom: "1.75rem" }} />
            <p
              className="font-body"
              style={{ fontSize: "1rem", color: C.cream, lineHeight: 1.8, marginBottom: "2rem" }}
            >
              Das Entrecôte gibt es nur auf Reservierung — und nur donnerstags.
              Bitte gib bei der Anfrage deine gewünschte Garstufe an.
              Wir bestätigen per E-Mail.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {[
                { label: "Öffnungszeiten", value: "Donnerstags ab 18 Uhr" },
                { label: "Weinbar", value: "Walk-in willkommen" },
                { label: "Ort", value: "Leistadt, Pfalz" },
                { label: "Kontakt", value: "info@petit-joujou.de" },
              ].map((d) => (
                <div key={d.label} style={{ display: "flex", gap: "1rem", alignItems: "baseline" }}>
                  <span
                    className="font-body"
                    style={{ fontSize: "0.65rem", letterSpacing: "0.15em", textTransform: "uppercase", color: C.apricot, minWidth: "120px" }}
                  >
                    {d.label}
                  </span>
                  <span
                    className="font-display"
                    style={{ fontSize: "1rem", color: C.apricotLight }}
                  >
                    {d.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Form */}
          <div style={{ backgroundColor: C.ivory, padding: "2.5rem" }}>
            {sent ? (
              <div style={{ textAlign: "center", padding: "2rem 0" }}>
                <div className="font-display" style={{ fontSize: "2rem", color: C.green, marginBottom: "1rem" }}>
                  Merci!
                </div>
                <p className="font-body" style={{ color: C.brownMid }}>
                  Deine Anfrage ist eingegangen. Wir melden uns bald.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                <h3
                  className="font-display"
                  style={{ fontSize: "1.5rem", color: C.brown, marginBottom: "0.5rem" }}
                >
                  Tisch anfragen
                </h3>

                {[
                  { id: "name", label: "Name", type: "text", placeholder: "Dein Name", required: true },
                  { id: "date", label: "Wunschdatum (Donnerstag)", type: "date", placeholder: "", required: true },
                ].map((f) => (
                  <div key={f.id}>
                    <label
                      htmlFor={f.id}
                      className="font-body"
                      style={{ display: "block", fontSize: "0.7rem", letterSpacing: "0.12em", textTransform: "uppercase", color: C.muted, marginBottom: "0.4rem" }}
                    >
                      {f.label}
                    </label>
                    <input
                      id={f.id}
                      type={f.type}
                      placeholder={f.placeholder}
                      required={f.required}
                      value={(form as any)[f.id]}
                      onChange={(e) => setForm({ ...form, [f.id]: e.target.value })}
                      className="font-body"
                      style={{
                        width: "100%",
                        padding: "0.65rem 0.85rem",
                        border: `1px solid ${C.cream}`,
                        backgroundColor: "white",
                        fontSize: "0.9rem",
                        color: C.brown,
                        outline: "none",
                      }}
                    />
                  </div>
                ))}

                {/* Personen */}
                <div>
                  <label
                    htmlFor="personen"
                    className="font-body"
                    style={{ display: "block", fontSize: "0.7rem", letterSpacing: "0.12em", textTransform: "uppercase", color: C.muted, marginBottom: "0.4rem" }}
                  >
                    Anzahl Personen
                  </label>
                  <select
                    id="personen"
                    value={form.personen}
                    onChange={(e) => setForm({ ...form, personen: e.target.value })}
                    className="font-body"
                    style={{
                      width: "100%",
                      padding: "0.65rem 0.85rem",
                      border: `1px solid ${C.cream}`,
                      backgroundColor: "white",
                      fontSize: "0.9rem",
                      color: C.brown,
                      outline: "none",
                    }}
                  >
                    {["1", "2", "3", "4", "5", "6"].map((n) => (
                      <option key={n} value={n}>{n} {n === "1" ? "Person" : "Personen"}</option>
                    ))}
                  </select>
                </div>

                {/* Garstufe */}
                <div>
                  <label
                    htmlFor="garstufe"
                    className="font-body"
                    style={{ display: "block", fontSize: "0.7rem", letterSpacing: "0.12em", textTransform: "uppercase", color: C.muted, marginBottom: "0.4rem" }}
                  >
                    Garstufe
                  </label>
                  <select
                    id="garstufe"
                    value={form.garstufe}
                    onChange={(e) => setForm({ ...form, garstufe: e.target.value })}
                    required
                    className="font-body"
                    style={{
                      width: "100%",
                      padding: "0.65rem 0.85rem",
                      border: `1px solid ${C.cream}`,
                      backgroundColor: "white",
                      fontSize: "0.9rem",
                      color: C.brown,
                      outline: "none",
                    }}
                  >
                    <option value="">Bitte wählen</option>
                    <option value="rare">Rare (fast roh)</option>
                    <option value="medium-rare">Medium Rare (rosa, saftig)</option>
                    <option value="medium">Medium (leicht rosa)</option>
                    <option value="well-done">Well Done (durchgegart)</option>
                  </select>
                </div>

                {/* Notiz */}
                <div>
                  <label
                    htmlFor="notiz"
                    className="font-body"
                    style={{ display: "block", fontSize: "0.7rem", letterSpacing: "0.12em", textTransform: "uppercase", color: C.muted, marginBottom: "0.4rem" }}
                  >
                    Anmerkungen (optional)
                  </label>
                  <textarea
                    id="notiz"
                    rows={3}
                    placeholder="Allergien, besondere Wünsche..."
                    value={form.notiz}
                    onChange={(e) => setForm({ ...form, notiz: e.target.value })}
                    className="font-body"
                    style={{
                      width: "100%",
                      padding: "0.65rem 0.85rem",
                      border: `1px solid ${C.cream}`,
                      backgroundColor: "white",
                      fontSize: "0.9rem",
                      color: C.brown,
                      outline: "none",
                      resize: "vertical",
                    }}
                  />
                </div>

                <button
                  type="submit"
                  className="font-body"
                  style={{
                    fontSize: "0.78rem",
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    backgroundColor: C.green,
                    color: C.ivory,
                    padding: "0.9rem",
                    border: "none",
                    cursor: "pointer",
                    marginTop: "0.5rem",
                  }}
                >
                  Anfrage absenden
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Footer ───────────────────────────────────────────────────
function Footer() {
  return (
    <footer style={{ backgroundColor: C.brown, padding: "3rem 0" }}>
      <div className="container">
        <div className="grid md:grid-cols-3 gap-8 items-start" style={{ marginBottom: "2rem" }}>
          {/* Brand */}
          <div>
            <div className="font-display" style={{ fontSize: "0.75rem", letterSpacing: "0.3em", color: C.cream, textTransform: "uppercase", marginBottom: "0.2rem" }}>petit</div>
            <div className="font-script" style={{ fontSize: "2rem", color: C.terra, lineHeight: 1, marginBottom: "0.75rem" }}>joujou</div>
            <p className="font-body" style={{ fontSize: "0.85rem", color: C.muted, lineHeight: 1.7 }}>
              klein, fein, wein<br />
              Weinbar &amp; Bistro · Leistadt, Pfalz
            </p>
          </div>

          {/* Links */}
          <div>
            <p className="font-body" style={{ fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", color: C.cream, marginBottom: "1rem" }}>Navigation</p>
            {["Das Entrecôte", "Weinbar", "Manna Palatina", "Weinbegleiter", "Shop & Events", "Reservierung"].map((l) => (
              <a
                key={l}
                href={`#${l.toLowerCase().replace(/[^a-z]/g, "")}`}
                className="block font-body"
                style={{ fontSize: "0.85rem", color: C.muted, textDecoration: "none", marginBottom: "0.4rem" }}
              >
                {l}
              </a>
            ))}
          </div>

          {/* Contact */}
          <div>
            <p className="font-body" style={{ fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", color: C.cream, marginBottom: "1rem" }}>Kontakt</p>
            <p className="font-body" style={{ fontSize: "0.85rem", color: C.muted, lineHeight: 1.8 }}>
              Leistadt, Pfalz<br />
              info@petit-joujou.de<br />
              <br />
              Eine Marke von JouJou Pfalz
            </p>
          </div>
        </div>

        <div style={{ borderTop: `1px solid rgba(197,178,153,0.2)`, paddingTop: "1.5rem", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
          <p className="font-body" style={{ fontSize: "0.75rem", color: C.muted }}>
            © 2025 petit joujou · Alle Rechte vorbehalten
          </p>
          <div style={{ display: "flex", gap: "1.5rem" }}>
            {["Impressum", "Datenschutz"].map((l) => (
              <a
                key={l}
                href="#"
                className="font-body"
                style={{ fontSize: "0.75rem", color: C.muted, textDecoration: "none" }}
                onClick={(e) => { e.preventDefault(); toast(`${l} — demnächst verfügbar`); }}
              >
                {l}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

// ── Main Export ──────────────────────────────────────────────
export default function Home() {
  return (
    <div style={{ backgroundColor: C.ivory, minHeight: "100vh" }}>
      <Nav />
      <main style={{ paddingTop: "64px" }}>
        <Hero />
        <IntroBand />
        <EntrecoteSection />
        <WeinbarSection />
        <PinsaSection />
        <BegleiterSection />
        <ShopSection />
        <ReservierungSection />
      </main>
      <Footer />
    </div>
  );
}
