/* ============================================================
   petit joujou — Allgemeine Geschäftsbedingungen
   ============================================================ */

import { Link } from "wouter";
import { usePageMeta } from "@/hooks/usePageMeta";

export default function AGB() {
  usePageMeta({
    title: "AGB — petit joujou",
    description: "Allgemeine Geschäftsbedingungen für den Online-Shop der Joujou GmbH. Fernabsatz, Wein, Alkoholabgabe.",
    canonical: "https://www.petit-joujou.de/agb",
  });

  return (
    <div style={{ backgroundColor: "#fdf8f9", minHeight: "100vh", paddingTop: "6rem", paddingBottom: "6rem" }}>
      <div style={{ maxWidth: "720px", margin: "0 auto", padding: "0 2rem" }}>

        <p style={{ fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#ff66c4", marginBottom: "1rem", fontFamily: "var(--font-body)" }}>
          Rechtliches
        </p>
        <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 5vw, 3rem)", color: "#1e3a3a", marginBottom: "3rem", lineHeight: 1.1 }}>
          Allgemeine Geschäftsbedingungen
        </h1>

        <div style={{ fontFamily: "var(--font-body)", fontSize: "0.95rem", color: "#40818a", lineHeight: 1.9 }}>

          <section style={{ marginBottom: "2.5rem" }}>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.1rem", color: "#1e3a3a", marginBottom: "0.75rem", letterSpacing: "0.05em" }}>
              § 1 Geltungsbereich
            </h2>
            <p>
              Diese Allgemeinen Geschäftsbedingungen (AGB) gelten für alle Bestellungen, die Verbraucher und Unternehmer über unseren Online-Shop abschließen. Vertragspartner ist die Joujou GmbH, Hauptstraße 34, 67098 Bad Dürkheim (nachfolgend „wir" oder „Verkäufer").
            </p>
          </section>

          <section style={{ marginBottom: "2.5rem" }}>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.1rem", color: "#1e3a3a", marginBottom: "0.75rem", letterSpacing: "0.05em" }}>
              § 2 Vertragsschluss
            </h2>
            <p style={{ marginBottom: "1rem" }}>
              Die Darstellung der Produkte im Online-Shop stellt kein rechtlich bindendes Angebot, sondern eine Aufforderung zur Bestellung (invitatio ad offerendum) dar.
            </p>
            <p style={{ marginBottom: "1rem" }}>
              Durch Anklicken des Buttons „Zahlungspflichtig bestellen" geben Sie eine verbindliche Bestellung der im Warenkorb enthaltenen Waren ab. Die Bestätigung des Eingangs der Bestellung erfolgt unmittelbar nach dem Absenden der Bestellung per automatisierter E-Mail. Diese Eingangsbestätigung stellt noch keine Vertragsannahme dar.
            </p>
            <p>
              Der Kaufvertrag kommt zustande, wenn wir die bestellte Ware an Sie versenden und den Versand mit einer zweiten E-Mail (Versandbestätigung) bestätigen.
            </p>
          </section>

          <section style={{ marginBottom: "2.5rem" }}>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.1rem", color: "#1e3a3a", marginBottom: "0.75rem", letterSpacing: "0.05em" }}>
              § 3 Preise und Zahlung
            </h2>
            <p style={{ marginBottom: "1rem" }}>
              Alle angegebenen Preise sind Endpreise und enthalten die gesetzliche Umsatzsteuer. Zusätzlich anfallende Versandkosten werden vor Abschluss der Bestellung gesondert ausgewiesen.
            </p>
            <p>
              Die Zahlung erfolgt über die im Checkout angebotenen Zahlungsarten (Kreditkarte, PayPal, Google Pay, Shop Pay). Die Zahlungsabwicklung erfolgt über Shopify Payments.
            </p>
          </section>

          <section style={{ marginBottom: "2.5rem" }}>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.1rem", color: "#1e3a3a", marginBottom: "0.75rem", letterSpacing: "0.05em" }}>
              § 4 Lieferung
            </h2>
            <p style={{ marginBottom: "1rem" }}>
              Die Lieferung erfolgt innerhalb Deutschlands. Die Lieferzeit beträgt 2–4 Werktage nach Zahlungseingang, sofern beim Artikel nichts anderes angegeben ist.
            </p>
            <p>
              Versandkosten: 5,90 € innerhalb Deutschlands. Ab einem Bestellwert von 60,00 € liefern wir versandkostenfrei.
            </p>
          </section>

          <section style={{ marginBottom: "2.5rem" }}>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.1rem", color: "#1e3a3a", marginBottom: "0.75rem", letterSpacing: "0.05em" }}>
              § 5 Eigentumsvorbehalt
            </h2>
            <p>
              Die gelieferte Ware bleibt bis zur vollständigen Bezahlung unser Eigentum.
            </p>
          </section>

          <section style={{ marginBottom: "2.5rem" }}>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.1rem", color: "#1e3a3a", marginBottom: "0.75rem", letterSpacing: "0.05em" }}>
              § 6 Widerrufsrecht
            </h2>
            <p>
              Verbrauchern steht ein gesetzliches Widerrufsrecht zu. Die Einzelheiten ergeben sich aus unserer <Link href="/widerruf" style={{ color: "#40818a" }}>Widerrufsbelehrung</Link>.
            </p>
          </section>

          <section style={{ marginBottom: "2.5rem" }}>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.1rem", color: "#1e3a3a", marginBottom: "0.75rem", letterSpacing: "0.05em" }}>
              § 7 Gewährleistung
            </h2>
            <p>
              Es gelten die gesetzlichen Gewährleistungsrechte. Bei Mängeln der gelieferten Ware stehen Ihnen die gesetzlichen Gewährleistungsansprüche gegenüber uns als Verkäufer zu.
            </p>
          </section>

          <section style={{ marginBottom: "2.5rem" }}>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.1rem", color: "#1e3a3a", marginBottom: "0.75rem", letterSpacing: "0.05em" }}>
              § 8 Jugendschutz / Alkohol
            </h2>
            <p>
              Wir verkaufen alkoholische Getränke ausschließlich an Personen, die das gesetzlich vorgeschriebene Mindestalter erreicht haben (Wein: 16 Jahre). Mit der Bestellung bestätigen Sie, dass Sie mindestens 16 Jahre alt sind. Bei der Zustellung kann eine Altersprüfung durch den Versanddienstleister erfolgen.
            </p>
          </section>

          <section style={{ marginBottom: "2.5rem" }}>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.1rem", color: "#1e3a3a", marginBottom: "0.75rem", letterSpacing: "0.05em" }}>
              § 9 Streitbeilegung
            </h2>
            <p>
              Wir sind nicht bereit und nicht verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.
            </p>
          </section>

          <section style={{ marginBottom: "2.5rem" }}>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.1rem", color: "#1e3a3a", marginBottom: "0.75rem", letterSpacing: "0.05em" }}>
              § 10 Anwendbares Recht
            </h2>
            <p>
              Es gilt das Recht der Bundesrepublik Deutschland unter Ausschluss des UN-Kaufrechts. Bei Verbrauchern gilt diese Rechtswahl nur insoweit, als nicht der durch zwingende Bestimmungen des Rechts des Staates des gewöhnlichen Aufenthaltes des Verbrauchers gewährte Schutz entzogen wird.
            </p>
          </section>

          <p style={{ fontSize: "0.8rem", color: "#6ba8b0", borderTop: "1px solid #f0d0d8", paddingTop: "2rem" }}>
            Stand: Juli 2026 · Joujou GmbH
          </p>

        </div>

        <div style={{ marginTop: "3rem", display: "flex", gap: "1.5rem", flexWrap: "wrap" }}>
          <Link
            href="/widerruf"
            style={{
              fontFamily: "var(--font-body)", fontSize: "0.78rem", letterSpacing: "0.12em",
              textTransform: "uppercase", color: "#40818a", textDecoration: "none",
              borderBottom: "1px solid #40818a", paddingBottom: "2px",
            }}
          >
            Widerrufsbelehrung
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
