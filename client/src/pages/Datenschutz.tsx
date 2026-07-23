/* ============================================================
   petit joujou — Datenschutzerklärung
   ============================================================ */

import { Link } from "wouter";
import { usePageMeta } from "@/hooks/usePageMeta";

export default function Datenschutz() {
  usePageMeta({
    title: "Datenschutzerklärung — petit joujou",
    description: "Datenschutzerklärung der Joujou GmbH. Informationen zur Verarbeitung personenbezogener Daten gemäß DSGVO.",
    canonical: "https://www.petit-joujou.de/datenschutz",
  });

  return (
    <div style={{ backgroundColor: "#fdf8f9", minHeight: "100vh", paddingTop: "6rem", paddingBottom: "6rem" }}>
      <div style={{ maxWidth: "720px", margin: "0 auto", padding: "0 2rem" }}>

        <p style={{ fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#ff66c4", marginBottom: "1rem", fontFamily: "var(--font-body)" }}>
          Rechtliches
        </p>
        <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 5vw, 3rem)", color: "#1e3a3a", marginBottom: "3rem", lineHeight: 1.1 }}>
          Datenschutzerklärung
        </h1>

        <div style={{ fontFamily: "var(--font-body)", fontSize: "0.95rem", color: "#40818a", lineHeight: 1.9 }}>

          <section style={{ marginBottom: "2.5rem" }}>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.1rem", color: "#1e3a3a", marginBottom: "0.75rem", letterSpacing: "0.05em" }}>
              1. Verantwortlicher
            </h2>
            <p>
              Joujou GmbH<br />
              Hauptstraße 34<br />
              67098 Bad Dürkheim<br />
              E-Mail: <a href="mailto:hallo@joujou-pfalz.de" style={{ color: "#40818a" }}>hallo@joujou-pfalz.de</a><br />
              Telefon: +49 6322 7906693
            </p>
          </section>

          <section style={{ marginBottom: "2.5rem" }}>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.1rem", color: "#1e3a3a", marginBottom: "0.75rem", letterSpacing: "0.05em" }}>
              2. Allgemeines zur Datenverarbeitung
            </h2>
            <p>
              Wir verarbeiten personenbezogene Daten unserer Nutzer grundsätzlich nur, soweit dies zur Bereitstellung einer funktionsfähigen Website sowie unserer Inhalte und Leistungen erforderlich ist. Die Verarbeitung personenbezogener Daten unserer Nutzer erfolgt regelmäßig nur nach Einwilligung des Nutzers. Eine Ausnahme gilt in solchen Fällen, in denen eine vorherige Einholung einer Einwilligung aus tatsächlichen Gründen nicht möglich ist und die Verarbeitung der Daten durch gesetzliche Vorschriften gestattet ist.
            </p>
          </section>

          <section style={{ marginBottom: "2.5rem" }}>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.1rem", color: "#1e3a3a", marginBottom: "0.75rem", letterSpacing: "0.05em" }}>
              3. Hosting
            </h2>
            <p>
              Diese Website wird bei Manus (manus.im) gehostet. Beim Besuch unserer Website werden automatisch Informationen in sogenannten Server-Log-Dateien gespeichert, die Ihr Browser automatisch an den Server übermittelt. Dies sind: Browsertyp und -version, verwendetes Betriebssystem, Referrer URL, Hostname des zugreifenden Rechners, Uhrzeit der Serveranfrage und IP-Adresse. Diese Daten werden nicht mit anderen Datenquellen zusammengeführt. Grundlage für die Datenverarbeitung ist Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an der technischen Bereitstellung der Website).
            </p>
          </section>

          <section style={{ marginBottom: "2.5rem" }}>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.1rem", color: "#1e3a3a", marginBottom: "0.75rem", letterSpacing: "0.05em" }}>
              4. Online-Shop und Bestellabwicklung (Shopify)
            </h2>
            <p style={{ marginBottom: "1rem" }}>
              Für unseren Online-Shop nutzen wir die Plattform Shopify (Shopify International Limited, Victoria Buildings, 2nd Floor, 1-2 Haddington Road, Dublin 4, D04 XN32, Irland). Bei einer Bestellung werden die von Ihnen eingegebenen Daten (Name, Adresse, E-Mail, Zahlungsdaten) an Shopify übermittelt und dort verarbeitet. Shopify ist als Auftragsverarbeiter für uns tätig.
            </p>
            <p>
              Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO (Vertragserfüllung). Shopify speichert Ihre Daten auf Servern in der EU und in Kanada. Kanada verfügt über einen Angemessenheitsbeschluss der EU-Kommission. Weitere Informationen finden Sie in der <a href="https://www.shopify.com/de/legal/datenschutz" target="_blank" rel="noopener noreferrer" style={{ color: "#40818a" }}>Datenschutzerklärung von Shopify</a>.
            </p>
          </section>

          <section style={{ marginBottom: "2.5rem" }}>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.1rem", color: "#1e3a3a", marginBottom: "0.75rem", letterSpacing: "0.05em" }}>
              5. Zahlungsdienstleister
            </h2>
            <p>
              Die Zahlungsabwicklung erfolgt über Shopify Payments (basierend auf Stripe, Inc., 510 Townsend Street, San Francisco, CA 94103, USA). Bei der Zahlung werden Ihre Zahlungsdaten direkt an den Zahlungsdienstleister übermittelt. Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO (Vertragserfüllung). Weitere Informationen: <a href="https://stripe.com/de/privacy" target="_blank" rel="noopener noreferrer" style={{ color: "#40818a" }}>Datenschutzerklärung von Stripe</a>.
            </p>
          </section>

          <section style={{ marginBottom: "2.5rem" }}>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.1rem", color: "#1e3a3a", marginBottom: "0.75rem", letterSpacing: "0.05em" }}>
              6. Webanalyse (Umami)
            </h2>
            <p>
              Wir nutzen Umami (gehostet unter manus-analytics.com) zur statistischen Auswertung der Besucherzugriffe. Umami ist eine datenschutzfreundliche Analysesoftware, die keine Cookies setzt, keine personenbezogenen Daten speichert und keine Daten an Dritte weitergibt. Es werden keine IP-Adressen gespeichert. Die Auswertung erfolgt anonym und lässt keinen Rückschluss auf einzelne Personen zu. Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an der Analyse des Nutzerverhaltens zur Optimierung unseres Angebots).
            </p>
          </section>

          <section style={{ marginBottom: "2.5rem" }}>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.1rem", color: "#1e3a3a", marginBottom: "0.75rem", letterSpacing: "0.05em" }}>
              7. Reservierungen (Gastronovi)
            </h2>
            <p>
              Für Online-Reservierungen nutzen wir den Dienst Gastronovi (gastronovi GmbH, Bremen). Bei einer Reservierung werden Ihr Name, Ihre E-Mail-Adresse und ggf. Telefonnummer an Gastronovi übermittelt. Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO (vorvertragliche Maßnahmen). Weitere Informationen: <a href="https://www.gastronovi.com/de/datenschutz" target="_blank" rel="noopener noreferrer" style={{ color: "#40818a" }}>Datenschutzerklärung von Gastronovi</a>.
            </p>
          </section>

          <section style={{ marginBottom: "2.5rem" }}>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.1rem", color: "#1e3a3a", marginBottom: "0.75rem", letterSpacing: "0.05em" }}>
              8. Kontaktaufnahme per E-Mail
            </h2>
            <p>
              Wenn Sie uns per E-Mail kontaktieren, werden die von Ihnen mitgeteilten Daten (Ihre E-Mail-Adresse, ggf. Ihr Name und Ihre Telefonnummer) von uns gespeichert, um Ihre Anfrage zu beantworten. Die in diesem Zusammenhang anfallenden Daten löschen wir, nachdem die Speicherung nicht mehr erforderlich ist, oder schränken die Verarbeitung ein, falls gesetzliche Aufbewahrungspflichten bestehen. Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO.
            </p>
          </section>

          <section style={{ marginBottom: "2.5rem" }}>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.1rem", color: "#1e3a3a", marginBottom: "0.75rem", letterSpacing: "0.05em" }}>
              9. Technisch notwendige Speicherung (localStorage)
            </h2>
            <p>
              Unser Shop speichert eine Warenkorb-ID im localStorage Ihres Browsers (Schlüssel: „commerce:cart-id"). Dies ist technisch notwendig, um Ihren Warenkorb sitzungsübergreifend zu erhalten. Es werden keine Cookies gesetzt. Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an der Funktionsfähigkeit des Shops).
            </p>
          </section>

          <section style={{ marginBottom: "2.5rem" }}>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.1rem", color: "#1e3a3a", marginBottom: "0.75rem", letterSpacing: "0.05em" }}>
              10. Ihre Rechte
            </h2>
            <p style={{ marginBottom: "1rem" }}>
              Sie haben gegenüber uns folgende Rechte hinsichtlich der Sie betreffenden personenbezogenen Daten:
            </p>
            <ul style={{ paddingLeft: "1.5rem", marginBottom: "1rem" }}>
              <li>Recht auf Auskunft (Art. 15 DSGVO)</li>
              <li>Recht auf Berichtigung (Art. 16 DSGVO)</li>
              <li>Recht auf Löschung (Art. 17 DSGVO)</li>
              <li>Recht auf Einschränkung der Verarbeitung (Art. 18 DSGVO)</li>
              <li>Recht auf Datenübertragbarkeit (Art. 20 DSGVO)</li>
              <li>Recht auf Widerspruch gegen die Verarbeitung (Art. 21 DSGVO)</li>
            </ul>
            <p>
              Sie haben zudem das Recht, sich bei einer Datenschutz-Aufsichtsbehörde über die Verarbeitung Ihrer personenbezogenen Daten durch uns zu beschweren. Zuständige Aufsichtsbehörde ist der Landesbeauftragte für den Datenschutz und die Informationsfreiheit Rheinland-Pfalz.
            </p>
          </section>

          <p style={{ fontSize: "0.8rem", color: "#6ba8b0", borderTop: "1px solid #f0d0d8", paddingTop: "2rem" }}>
            Stand: Juli 2026 · Joujou GmbH
          </p>

        </div>

        <div style={{ marginTop: "3rem", display: "flex", gap: "1.5rem", flexWrap: "wrap" }}>
          <Link
            href="/impressum"
            style={{
              fontFamily: "var(--font-body)", fontSize: "0.78rem", letterSpacing: "0.12em",
              textTransform: "uppercase", color: "#40818a", textDecoration: "none",
              borderBottom: "1px solid #40818a", paddingBottom: "2px",
            }}
          >
            Impressum
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
