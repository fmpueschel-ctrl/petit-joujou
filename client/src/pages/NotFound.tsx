/* ============================================================
   petit joujou — 404 Seite nicht gefunden
   ============================================================ */

import { Link } from "wouter";

export default function NotFound() {
  return (
    <div style={{ backgroundColor: "#fdf8f9", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "2rem" }}>
      <div style={{ textAlign: "center", maxWidth: "480px" }}>

        <p className="font-script" style={{ fontSize: "1.2rem", color: "#3a6a5a", marginBottom: "0.5rem" }}>
          petit joujou
        </p>

        <h1 className="font-display" style={{ fontSize: "clamp(4rem, 10vw, 6rem)", color: "#1e3a3a", margin: "0 0 0.5rem", lineHeight: 1 }}>
          404
        </h1>

        <h2 className="font-display" style={{ fontSize: "1.3rem", color: "#1e3a3a", margin: "0 0 1.5rem", fontWeight: 400 }}>
          Seite nicht gefunden
        </h2>

        <p className="font-body" style={{ fontSize: "0.95rem", color: "#4a5a54", lineHeight: 1.7, marginBottom: "2.5rem" }}>
          Die angeforderte Seite existiert leider nicht. Vielleicht wurde sie verschoben oder entfernt.
        </p>

        <Link
          href="/"
          style={{
            display: "inline-block",
            fontFamily: "var(--font-body)",
            fontSize: "0.8rem",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "#ffffff",
            backgroundColor: "#2a4a3e",
            textDecoration: "none",
            padding: "0.9rem 2.5rem",
            fontWeight: 600,
            transition: "opacity 0.2s",
          }}
        >
          Zur Startseite
        </Link>

      </div>
    </div>
  );
}
