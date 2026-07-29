/* ============================================================
   petit joujou — Flaschenfreunde (Flaschenweinkarte)
   Zeigt die gedruckte Karte als Bild, mit Download-Link zur PDF.
   ============================================================ */

import { Link } from "wouter";
import { usePageMeta } from "@/hooks/usePageMeta";
import { Download } from "lucide-react";

const C = {
  bg: "#f2f7f4",
  ink: "#1a2a24",
  sage: "#3a6a5a",
  inkLight: "#7a8a84",
  border: "#d0e0d8",
};

const KARTE_IMG = "/manus-storage/flaschenfreunde_karte-1_925590f9.png";
const KARTE_PDF = "/manus-storage/PetitJoujou_Flaschenfreunde_A4_FINAL-2_49e8acbc.pdf";

export default function Flaschenfreunde() {
  usePageMeta({
    title: "Flaschenfreunde — Flaschenweinkarte — petit joujou",
    description: "Unsere Flaschenfreunde: Die besten Weine ihrer jeweiligen Art, kuratiert vom petit joujou. Mitnahmepreise und Korkgeld.",
    canonical: "https://www.petit-joujou.de/flaschenfreunde",
  });

  return (
    <div style={{ backgroundColor: C.bg, minHeight: "100vh", paddingTop: "5rem", paddingBottom: "4rem" }}>
      <div style={{ maxWidth: "680px", margin: "0 auto", padding: "0 1.5rem" }}>

        {/* Card image */}
        <div style={{ marginBottom: "2rem", boxShadow: "0 4px 24px rgba(0,0,0,0.08)" }}>
          <img
            src={KARTE_IMG}
            alt="Petit Joujou Flaschenfreunde — Flaschenweinkarte für den Sommer"
            style={{ width: "100%", height: "auto", display: "block" }}
          />
        </div>

        {/* Actions */}
        <div style={{ display: "flex", gap: "1.5rem", justifyContent: "center", flexWrap: "wrap", marginBottom: "2.5rem" }}>
          <a
            href={KARTE_PDF}
            target="_blank"
            rel="noopener noreferrer"
            className="font-body"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              fontSize: "0.9rem",
              color: C.sage,
              textDecoration: "underline",
              textUnderlineOffset: "3px",
            }}
          >
            <Download size={16} />
            Karte als PDF
          </a>
          <Link
            href="/shop"
            className="font-body"
            style={{
              fontSize: "0.9rem",
              color: C.sage,
              textDecoration: "underline",
              textUnderlineOffset: "3px",
            }}
          >
            Zum Online-Shop
          </Link>
        </div>

        {/* Footer note */}
        <div style={{ textAlign: "center", paddingTop: "1.5rem", borderTop: `1px solid ${C.border}` }}>
          <p className="font-body" style={{ fontSize: "0.8rem", color: C.inkLight, lineHeight: 1.8, marginBottom: "1rem" }}>
            Alle Preise inkl. MwSt. · Enthält Sulfite · 0,75 L pro Flasche<br />
            Kein Verkauf an Personen unter 16 Jahren.
          </p>
          <Link
            href="/"
            className="font-body"
            style={{ fontSize: "0.85rem", color: C.sage, textDecoration: "underline", textUnderlineOffset: "3px" }}
          >
            Zurück zur Weinbar
          </Link>
        </div>
      </div>
    </div>
  );
}
