/* ============================================================
   Farbvergleich: Pastellrosa vs. Pastellgrün
   Temporäre Seite zum Vergleichen beider Farbschemata
   ============================================================ */

export default function ColorCompare() {
  // Option 2: Pastellrosa
  const R = {
    bg: "#fdf0f3",
    bgDark: "#8c2a4a",       // tiefes Rosé/Mauve für dunkle Sections
    accent: "#d4688a",        // Rosé Hauptakzent
    accentDark: "#a84868",    // dunkleres Rosé
    sage: "#5a7a6a",          // Sage-Grün als Kontrast
    sageMuted: "#7a9a8a",     // helleres Sage
    text: "#2a1a20",          // fast schwarz, warm
    textMid: "#5a4a50",       // mittlerer Text
    textLight: "#8a7a80",     // heller Text
    border: "#e8d0d8",        // zarter rosa Border
    cardBg: "#fff5f8",        // noch helleres Rosa für Karten
  };

  // Option 3: Pastellgrün
  const G = {
    bg: "#f2f7f4",
    bgDark: "#2a4a3e",        // tiefes Sage für dunkle Sections
    accent: "#d4688a",        // Rosé als starker Akzent
    accentDark: "#a84868",    // dunkleres Rosé
    sage: "#3a6a5a",          // Sage-Grün dunkel
    sageMuted: "#6a9a8a",     // helleres Sage
    text: "#1a2a24",          // fast schwarz, kühl-grün
    textMid: "#4a5a54",       // mittlerer Text
    textLight: "#7a8a84",     // heller Text
    border: "#d0e0d8",        // zarter grüner Border
    cardBg: "#f8fcfa",        // noch helleres Grün für Karten
  };

  return (
    <div style={{ fontFamily: "'Lato', sans-serif" }}>
      {/* Header */}
      <div style={{ padding: "2rem 1.5rem", backgroundColor: "#1e1e24", textAlign: "center" }}>
        <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.8rem", color: "#fff", margin: 0 }}>
          Farbvergleich
        </h1>
        <p style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.6)", marginTop: "0.5rem" }}>
          Option 2 (Pastellrosa) vs. Option 3 (Pastellgrün)
        </p>
      </div>

      {/* ═══════════════════════════════════════════════════════════
          OPTION 2: PASTELLROSA
          ═══════════════════════════════════════════════════════════ */}
      <div style={{ borderBottom: `4px solid ${R.accent}`, padding: "1rem 1.5rem", backgroundColor: R.bg }}>
        <p style={{ fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase", color: R.accent, fontWeight: 700, margin: 0 }}>
          Option 2 — Pastellrosa
        </p>
      </div>

      {/* Rosa Hero */}
      <section style={{ backgroundColor: R.bg, padding: "4rem 1.5rem", textAlign: "center" }}>
        <div style={{ marginBottom: "2rem" }}>
          <span style={{ fontFamily: "'Dancing Script', cursive", fontSize: "2.8rem", color: R.accent }}>
            petit joujou
          </span>
          <p style={{ fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase", color: R.textLight, marginTop: "0.5rem" }}>
            WEINBAR · LEISTADT · PFALZ
          </p>
        </div>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.75rem", marginBottom: "2rem", flexWrap: "wrap" }}>
          <span style={{ fontFamily: "'Dancing Script', cursive", fontSize: "2.2rem", color: R.text }}>klein</span>
          <span style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: R.text, display: "inline-block" }} />
          <span style={{ fontFamily: "'Dancing Script', cursive", fontSize: "2.2rem", color: R.accent }}>fein</span>
          <span style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: R.text, display: "inline-block" }} />
          <span style={{ fontFamily: "'Dancing Script', cursive", fontSize: "2.2rem", color: R.sage }}>wein</span>
        </div>

        <p style={{ fontSize: "0.95rem", color: R.textMid, lineHeight: 1.8, maxWidth: "400px", margin: "0 auto 2rem" }}>
          Die Weinbar im Joujou. Wir möchten euch verzaubern. Schnappt euch eine Flasche Wein, genießt die Sharing-Kreationen von Chef Franz und vergesst einfach die Zeit.
        </p>

        <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
          <button style={{ padding: "0.9rem 2rem", backgroundColor: R.accent, color: "#fff", border: "none", fontSize: "0.75rem", letterSpacing: "0.12em", textTransform: "uppercase", cursor: "pointer" }}>
            Reservieren
          </button>
          <button style={{ padding: "0.9rem 2rem", backgroundColor: "transparent", color: R.sage, border: `1.5px solid ${R.sage}`, fontSize: "0.75rem", letterSpacing: "0.12em", textTransform: "uppercase", cursor: "pointer" }}>
            Speisekarte
          </button>
        </div>
      </section>

      {/* Rosa Weinkeller (dunkle Section) */}
      <section style={{ backgroundColor: R.bgDark, padding: "4rem 1.5rem" }}>
        <p style={{ fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase", color: R.accent, marginBottom: "0.75rem" }}>
          Der Keller
        </p>
        <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "2rem", color: "#fff", marginBottom: "1rem", lineHeight: 1.15 }}>
          Leidenschaftlich kuratiert.
        </h2>
        <p style={{ fontSize: "0.9rem", color: "rgba(255,255,255,0.75)", lineHeight: 1.8, marginBottom: "1.5rem" }}>
          Mareile & Frank gehen für euch ans Limit — für das spannendste Weinangebot. 500 Weine & Bubbles, nur bio, biodynamisch, Natur.
        </p>
        <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
          {["Bio", "Biodynamisch", "Naturwein", "Orange Wine"].map(tag => (
            <span key={tag} style={{ padding: "0.4rem 0.8rem", backgroundColor: "rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.8)", fontSize: "0.7rem", letterSpacing: "0.1em" }}>
              {tag}
            </span>
          ))}
        </div>
      </section>

      {/* Rosa Karte/Info-Block */}
      <section style={{ backgroundColor: R.bg, padding: "3rem 1.5rem" }}>
        <div style={{ backgroundColor: R.cardBg, border: `1px solid ${R.border}`, padding: "2rem", textAlign: "center" }}>
          <p style={{ fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase", color: R.sage, marginBottom: "0.5rem" }}>
            Events & Abende
          </p>
          <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.5rem", color: R.text, marginBottom: "0.75rem" }}>
            BEATS petit joujou
          </h3>
          <p style={{ fontSize: "0.85rem", color: R.textMid, marginBottom: "0.5rem" }}>
            DJ Marcel Ullrich · Joujou After Work
          </p>
          <p style={{ fontSize: "0.82rem", color: R.accent, fontWeight: 600 }}>
            11.06. · 16.07. · 13.08.2026
          </p>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          TRENNLINIE
          ═══════════════════════════════════════════════════════════ */}
      <div style={{ height: "3rem", backgroundColor: "#1e1e24", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ width: "60%", height: "1px", background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)" }} />
      </div>

      {/* ═══════════════════════════════════════════════════════════
          OPTION 3: PASTELLGRÜN
          ═══════════════════════════════════════════════════════════ */}
      <div style={{ borderBottom: `4px solid ${G.sage}`, padding: "1rem 1.5rem", backgroundColor: G.bg }}>
        <p style={{ fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase", color: G.sage, fontWeight: 700, margin: 0 }}>
          Option 3 — Pastellgrün
        </p>
      </div>

      {/* Grün Hero */}
      <section style={{ backgroundColor: G.bg, padding: "4rem 1.5rem", textAlign: "center" }}>
        <div style={{ marginBottom: "2rem" }}>
          <span style={{ fontFamily: "'Dancing Script', cursive", fontSize: "2.8rem", color: G.sage }}>
            petit joujou
          </span>
          <p style={{ fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase", color: G.textLight, marginTop: "0.5rem" }}>
            WEINBAR · LEISTADT · PFALZ
          </p>
        </div>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.75rem", marginBottom: "2rem", flexWrap: "wrap" }}>
          <span style={{ fontFamily: "'Dancing Script', cursive", fontSize: "2.2rem", color: G.text }}>klein</span>
          <span style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: G.text, display: "inline-block" }} />
          <span style={{ fontFamily: "'Dancing Script', cursive", fontSize: "2.2rem", color: G.accent }}>fein</span>
          <span style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: G.text, display: "inline-block" }} />
          <span style={{ fontFamily: "'Dancing Script', cursive", fontSize: "2.2rem", color: G.sage }}>wein</span>
        </div>

        <p style={{ fontSize: "0.95rem", color: G.textMid, lineHeight: 1.8, maxWidth: "400px", margin: "0 auto 2rem" }}>
          Die Weinbar im Joujou. Wir möchten euch verzaubern. Schnappt euch eine Flasche Wein, genießt die Sharing-Kreationen von Chef Franz und vergesst einfach die Zeit.
        </p>

        <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
          <button style={{ padding: "0.9rem 2rem", backgroundColor: G.accent, color: "#fff", border: "none", fontSize: "0.75rem", letterSpacing: "0.12em", textTransform: "uppercase", cursor: "pointer" }}>
            Reservieren
          </button>
          <button style={{ padding: "0.9rem 2rem", backgroundColor: "transparent", color: G.sage, border: `1.5px solid ${G.sage}`, fontSize: "0.75rem", letterSpacing: "0.12em", textTransform: "uppercase", cursor: "pointer" }}>
            Speisekarte
          </button>
        </div>
      </section>

      {/* Grün Weinkeller (dunkle Section) */}
      <section style={{ backgroundColor: G.bgDark, padding: "4rem 1.5rem" }}>
        <p style={{ fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase", color: G.accent, marginBottom: "0.75rem" }}>
          Der Keller
        </p>
        <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "2rem", color: "#fff", marginBottom: "1rem", lineHeight: 1.15 }}>
          Leidenschaftlich kuratiert.
        </h2>
        <p style={{ fontSize: "0.9rem", color: "rgba(255,255,255,0.75)", lineHeight: 1.8, marginBottom: "1.5rem" }}>
          Mareile & Frank gehen für euch ans Limit — für das spannendste Weinangebot. 500 Weine & Bubbles, nur bio, biodynamisch, Natur.
        </p>
        <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
          {["Bio", "Biodynamisch", "Naturwein", "Orange Wine"].map(tag => (
            <span key={tag} style={{ padding: "0.4rem 0.8rem", backgroundColor: "rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.8)", fontSize: "0.7rem", letterSpacing: "0.1em" }}>
              {tag}
            </span>
          ))}
        </div>
      </section>

      {/* Grün Karte/Info-Block */}
      <section style={{ backgroundColor: G.bg, padding: "3rem 1.5rem" }}>
        <div style={{ backgroundColor: G.cardBg, border: `1px solid ${G.border}`, padding: "2rem", textAlign: "center" }}>
          <p style={{ fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase", color: G.accent, marginBottom: "0.5rem" }}>
            Events & Abende
          </p>
          <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.5rem", color: G.text, marginBottom: "0.75rem" }}>
            BEATS petit joujou
          </h3>
          <p style={{ fontSize: "0.85rem", color: G.textMid, marginBottom: "0.5rem" }}>
            DJ Marcel Ullrich · Joujou After Work
          </p>
          <p style={{ fontSize: "0.82rem", color: G.accent, fontWeight: 600 }}>
            11.06. · 16.07. · 13.08.2026
          </p>
        </div>
      </section>

      {/* Footer-Hinweis */}
      <div style={{ padding: "2rem 1.5rem", backgroundColor: "#1e1e24", textAlign: "center" }}>
        <p style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.5)" }}>
          Welche Variante gefällt dir besser?
        </p>
      </div>
    </div>
  );
}
