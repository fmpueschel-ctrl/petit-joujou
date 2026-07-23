/* ============================================================
   petit joujou — Versand & Zahlung
   ============================================================ */

import { Link } from "wouter";
import { usePageMeta } from "@/hooks/usePageMeta";

export default function Versand() {
  usePageMeta({
    title: "Versand & Zahlung — petit joujou",
    description: "Versandkosten, Lieferzeiten und Zahlungsarten im petit joujou Online-Shop. Versand innerhalb Deutschlands 5,90 €, frei ab 60 €.",
    canonical: "https://www.petit-joujou.de/versand",
  });

  return (
    <div style={{ backgroundColor: "#fdf8f9", minHeight: "100vh", paddingTop: "6rem", paddingBottom: "6rem" }}>
      <div style={{ maxWidth: "720px", margin: "0 auto", padding: "0 2rem" }}>

        <p style={{ fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#ff66c4", marginBottom: "1rem", fontFamily: "var(--font-body)" }}>
          Informationen
        </p>
        <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 5vw, 3rem)", color: "#1e3a3a", marginBottom: "3rem", lineHeight: 1.1 }}>
          Versand & Zahlung
        </h1>

        <div style={{ fontFamily: "var(--font-body)", fontSize: "0.95rem", color: "#40818a", lineHeight: 1.9 }}>

          <section style={{ marginBottom: "2.5rem" }}>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.1rem", color: "#1e3a3a", marginBottom: "0.75rem", letterSpacing: "0.05em" }}>
              Versandkosten
            </h2>
            <p style={{ marginBottom: "1rem" }}>
              Wir liefern innerhalb Deutschlands. Die Versandkosten betragen:
            </p>
            <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: "1rem" }}>
              <thead>
                <tr style={{ borderBottom: "1px solid #d0e0d8" }}>
                  <th style={{ textAlign: "left", padding: "0.5rem 0", color: "#1e3a3a", fontSize: "0.85rem" }}>Bestellwert</th>
                  <th style={{ textAlign: "right", padding: "0.5rem 0", color: "#1e3a3a", fontSize: "0.85rem" }}>Versandkosten</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: "1px solid #e8f0ec" }}>
                  <td style={{ padding: "0.5rem 0", fontSize: "0.9rem" }}>bis 59,99 €</td>
                  <td style={{ textAlign: "right", padding: "0.5rem 0", fontSize: "0.9rem" }}>5,90 €</td>
                </tr>
                <tr>
                  <td style={{ padding: "0.5rem 0", fontSize: "0.9rem" }}>ab 60,00 €</td>
                  <td style={{ textAlign: "right", padding: "0.5rem 0", fontSize: "0.9rem", fontWeight: 600, color: "#1e3a3a" }}>kostenlos</td>
                </tr>
              </tbody>
            </table>
            <p style={{ fontSize: "0.85rem" }}>
              Lieferungen ins Ausland sind derzeit nicht möglich.
            </p>
          </section>

          <section style={{ marginBottom: "2.5rem" }}>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.1rem", color: "#1e3a3a", marginBottom: "0.75rem", letterSpacing: "0.05em" }}>
              Lieferzeit
            </h2>
            <p>
              Die Lieferzeit beträgt in der Regel <strong style={{ color: "#1e3a3a" }}>2–4 Werktage</strong> nach Zahlungseingang. Sollte ein Artikel vorübergehend nicht verfügbar sein, informieren wir Sie umgehend.
            </p>
          </section>

          <section style={{ marginBottom: "2.5rem" }}>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.1rem", color: "#1e3a3a", marginBottom: "0.75rem", letterSpacing: "0.05em" }}>
              Versanddienstleister
            </h2>
            <p>
              Der Versand erfolgt als versichertes Paket mit DHL. Sie erhalten nach Versand eine Sendungsverfolgungsnummer per E-Mail. Bei alkoholischen Getränken erfolgt die Zustellung mit Alterssichtprüfung.
            </p>
          </section>

          <section style={{ marginBottom: "2.5rem" }}>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.1rem", color: "#1e3a3a", marginBottom: "0.75rem", letterSpacing: "0.05em" }}>
              Abholung in der Weinbar
            </h2>
            <p>
              Alternativ können Sie Ihre Bestellung kostenfrei in unserer Weinbar abholen:
            </p>
            <p style={{ marginTop: "0.5rem", paddingLeft: "1rem", borderLeft: "2px solid #f0d0d8" }}>
              petit joujou<br />
              Hauptstraße 34<br />
              67098 Bad Dürkheim<br />
              Do–Fr ab 18 Uhr · Sa–So ab 12 Uhr
            </p>
            <p style={{ marginTop: "0.75rem", fontSize: "0.85rem" }}>
              Wählen Sie dazu im Checkout die Option „Abholung" und bringen Sie Ihre Bestellbestätigung mit.
            </p>
          </section>

          <section style={{ marginBottom: "2.5rem" }}>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.1rem", color: "#1e3a3a", marginBottom: "0.75rem", letterSpacing: "0.05em" }}>
              Zahlungsarten
            </h2>
            <p style={{ marginBottom: "1rem" }}>
              Wir bieten folgende Zahlungsarten an:
            </p>
            <ul style={{ paddingLeft: "1.5rem" }}>
              <li>Kreditkarte (Visa, Mastercard, American Express)</li>
              <li>PayPal</li>
              <li>Google Pay</li>
              <li>Apple Pay</li>
              <li>Shop Pay</li>
            </ul>
            <p style={{ marginTop: "1rem", fontSize: "0.85rem" }}>
              Die Zahlungsabwicklung erfolgt sicher über Shopify Payments. Ihre Zahlungsdaten werden verschlüsselt übertragen und nicht bei uns gespeichert.
            </p>
          </section>

          <p style={{ fontSize: "0.8rem", color: "#6ba8b0", borderTop: "1px solid #f0d0d8", paddingTop: "2rem" }}>
            Stand: Juli 2026 · Joujou GmbH
          </p>

        </div>

        <div style={{ marginTop: "3rem", display: "flex", gap: "1.5rem", flexWrap: "wrap" }}>
          <Link
            href="/shop"
            style={{
              fontFamily: "var(--font-body)", fontSize: "0.78rem", letterSpacing: "0.12em",
              textTransform: "uppercase", color: "#40818a", textDecoration: "none",
              borderBottom: "1px solid #40818a", paddingBottom: "2px",
            }}
          >
            Zum Shop
          </Link>
          <Link
            href="/"
            style={{
              fontFamily: "var(--font-body)", fontSize: "0.78rem", letterSpacing: "0.12em",
              textTransform: "uppercase", color: "#40818a", textDecoration: "none",
              borderBottom: "1px solid #40818a", paddingBottom: "2px",
            }}
          >
            ← Zurück zur Startseite
          </Link>
        </div>

      </div>
    </div>
  );
}
