/* ============================================================
   petit joujou — Flaschenfreunde (Flaschenweinkarte)
   Unsere Favoriten: Die besten Weine ihrer jeweiligen Art.
   ============================================================ */

import { Link } from "wouter";
import { usePageMeta } from "@/hooks/usePageMeta";

const C = {
  bg: "#f2f7f4",
  bgSage: "#2a4a3e",
  ink: "#1a2a24",
  inkMid: "#4a5a54",
  inkLight: "#7a8a84",
  sage: "#3a6a5a",
  border: "#d0e0d8",
};

type WineEntry = {
  name: string;
  winery: string;
  region: string;
  year: string;
  price: number;
  note?: string;
};

const weisswein: WineEntry[] = [
  { name: "Riesling Nature One", winery: "Joujou Sonderabfüllung", region: "Pfalz", year: "2024", price: 20 },
  { name: "Weissburgunder Schlossgarten", winery: "Messmer", region: "Pfalz", year: "2020", price: 24 },
  { name: "Grauburgunder", winery: "Oliver Zeter", region: "Pfalz", year: "2024", price: 13 },
  { name: "Chardonnay Le Petit", winery: "Reibold", region: "Pfalz", year: "2023", price: 18 },
  { name: "Riesling Kabinett", winery: "Eppelmann", region: "Rheinhessen", year: "2021", price: 20 },
  { name: "Spätburgunder Blanc de Noir", winery: "Isegrim", region: "Pfalz", year: "2023", price: 12 },
  { name: "PUR Blanc", winery: "Revelette", region: "Provence", year: "2022", price: 38, note: "Ugni Blanc · Carignan Blanc · Rolle" },
  { name: "Chablis à l'ouest", winery: "Domaine l'enclos", region: "Burgund", year: "2023", price: 42 },
  { name: "Riesling Felseneck GG", winery: "Prinz Salm", region: "Nahe", year: "2014", price: 68 },
];

const alkoholfrei: WineEntry[] = [
  { name: "Feral No 1 White", winery: "Hop · Szechuan Pepper", region: "", year: "—", price: 23 },
];

const roseUndSekt: WineEntry[] = [
  { name: "Fleur de Rosé", winery: "Rings", region: "Pfalz", year: "2024", price: 14 },
  { name: "Pink Otto Rosé Crémant", winery: "Lukas Krauss", region: "Pfalz", year: "—", price: 21 },
];

const rotwein: WineEntry[] = [
  { name: "Spätburgunder Dorf", winery: "Andreas Durst", region: "Pfalz", year: "N/V", price: 19 },
  { name: "Cabernet Sauvignon Reserve", winery: "Wasem Doppelstück", region: "Rheinhessen", year: "2021", price: 30 },
];

function WineTable({ wines, title }: { wines: WineEntry[]; title: string }) {
  return (
    <section style={{ marginBottom: "3rem" }}>
      <h2
        className="font-display"
        style={{
          fontSize: "1.2rem",
          color: C.ink,
          marginBottom: "1rem",
          letterSpacing: "0.05em",
          textTransform: "uppercase",
          borderBottom: `1px solid ${C.border}`,
          paddingBottom: "0.5rem",
        }}
      >
        {title}
      </h2>
      <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
        {wines.map((w, i) => (
          <div
            key={i}
            style={{
              display: "grid",
              gridTemplateColumns: "1fr auto",
              gap: "1rem",
              padding: "0.75rem 0",
              borderBottom: i < wines.length - 1 ? `1px solid ${C.border}` : "none",
              alignItems: "baseline",
            }}
          >
            <div>
              <span className="font-display" style={{ fontSize: "1rem", color: C.ink, fontWeight: 500 }}>
                {w.name}
              </span>
              {w.note && (
                <span className="font-body" style={{ fontSize: "0.75rem", color: C.sage, marginLeft: "0.5rem", fontStyle: "italic" }}>
                  {w.note}
                </span>
              )}
              <br />
              <span className="font-body" style={{ fontSize: "0.8rem", color: C.inkLight }}>
                {w.winery}{w.region ? ` · ${w.region}` : ""}{w.year !== "—" ? ` · ${w.year}` : ""}
              </span>
            </div>
            <div style={{ textAlign: "right" }}>
              <span className="font-display" style={{ fontSize: "1rem", color: C.ink, fontWeight: 600 }}>
                {w.price} €
              </span>
              <br />
              <span className="font-body" style={{ fontSize: "0.7rem", color: C.inkLight }}>
                {w.price + 10} € vor Ort
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default function Flaschenfreunde() {
  usePageMeta({
    title: "Flaschenfreunde — Flaschenweinkarte — petit joujou",
    description: "Unsere Flaschenfreunde: Die besten Weine ihrer jeweiligen Art, kuratiert vom petit joujou Gremium. Mitnahmepreise und Korkgeld.",
    canonical: "https://www.petit-joujou.de/flaschenfreunde",
  });

  return (
    <div style={{ backgroundColor: C.bg, minHeight: "100vh", paddingTop: "6rem", paddingBottom: "6rem" }}>
      <div style={{ maxWidth: "720px", margin: "0 auto", padding: "0 2rem" }}>

        {/* Header */}
        <p className="font-script" style={{ fontSize: "1.1rem", color: C.sage, marginBottom: "0.5rem" }}>
          petit joujou
        </p>
        <h1 className="font-display" style={{ fontSize: "clamp(2rem, 5vw, 3rem)", color: C.ink, marginBottom: "1rem", lineHeight: 1.1 }}>
          Flaschenfreunde
        </h1>

        {/* Contextual intro — links to full cellar */}
        <p className="font-body" style={{ fontSize: "0.9rem", color: C.sage, lineHeight: 1.8, marginBottom: "2rem", fontStyle: "italic" }}>
          Unsere Favoriten zum Mitnehmen — von uns verkostet und ausgewählt.<br />
          Die vollständige Karte mit über 500 Bio-Weinen wartet im Gewölbekeller auf euch.
        </p>

        {/* Concept explanation */}
        <div className="font-body" style={{ fontSize: "0.95rem", color: C.inkMid, lineHeight: 1.9, marginBottom: "3rem" }}>
          <p style={{ marginBottom: "1.5rem" }}>
            <strong style={{ color: C.ink }}>Flaschenfreunde</strong> — das sind unsere Favoriten. Die Weine, die aus unserer Sicht die besten ihrer jeweiligen Art sind. Jede Flasche wurde zusammen mit Gästen und Freunden verkostet, verglichen und für würdig befunden, euch empfohlen zu werden.
          </p>
          <p style={{ marginBottom: "1.5rem" }}>
            Wir zeigen euch den <strong style={{ color: C.ink }}>Mitnahmepreis</strong> — das ist der Preis, zu dem ihr die Flasche mit nach Hause nehmt oder online bestellt. Wer die Flasche lieber direkt bei uns an der Bar oder im Restaurant genießen möchte, zahlt <strong style={{ color: C.ink }}>+10 € Korkgeld</strong> pro Flasche.
          </p>

          {/* Korkgeld info box */}
          <div style={{
            padding: "1.25rem 1.5rem",
            backgroundColor: "rgba(42,74,62,0.04)",
            border: `1px solid ${C.border}`,
            marginBottom: "1.5rem",
          }}>
            <p style={{ margin: 0, fontSize: "0.85rem", lineHeight: 1.7 }}>
              <strong style={{ color: C.ink }}>Mitnahme:</strong> Preis wie angegeben<br />
              <strong style={{ color: C.ink }}>Vor Ort:</strong> +10 € Korkgeld pro Flasche<br />
              <strong style={{ color: C.ink }}>Mengenrabatt:</strong> 10 % ab 6 Flaschen gleiche Sorte
            </p>
          </div>

          <p style={{ fontSize: "0.85rem", color: C.inkLight }}>
            Alle Weine sind auch in unserem <Link href="/shop" style={{ color: C.sage, textDecoration: "underline", textUnderlineOffset: "3px" }}>Online-Shop</Link> erhältlich — zum Mitnahmepreis, versandfertig zu euch nach Hause.
          </p>
        </div>

        {/* Wine Lists */}
        <WineTable wines={weisswein} title="Weißwein" />
        <WineTable wines={alkoholfrei} title="Non Alcoholic" />
        <WineTable wines={roseUndSekt} title="Rosé & Sekt" />
        <WineTable wines={rotwein} title="Rotwein" />

        {/* Footer note */}
        <div style={{ marginTop: "3rem", paddingTop: "2rem", borderTop: `1px solid ${C.border}`, textAlign: "center" }}>
          <p className="font-body" style={{ fontSize: "0.8rem", color: C.inkLight, lineHeight: 1.8, marginBottom: "1.5rem" }}>
            Alle Preise inkl. MwSt. · Enthält Sulfite · 0,75 L pro Flasche (sofern nicht anders angegeben)<br />
            Kein Verkauf an Personen unter 16 Jahren.
          </p>
          <div style={{ display: "flex", gap: "1.5rem", justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/shop" className="font-body" style={{ fontSize: "0.85rem", color: C.sage, textDecoration: "underline", textUnderlineOffset: "3px" }}>
              Zum Online-Shop
            </Link>
            <Link href="/" className="font-body" style={{ fontSize: "0.85rem", color: C.sage, textDecoration: "underline", textUnderlineOffset: "3px" }}>
              Zurück zur Weinbar
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
