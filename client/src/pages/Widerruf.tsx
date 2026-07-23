/* ============================================================
   petit joujou — Widerrufsbelehrung
   ============================================================ */

import { Link } from "wouter";
import { usePageMeta } from "@/hooks/usePageMeta";

export default function Widerruf() {
  usePageMeta({
    title: "Widerrufsbelehrung — petit joujou",
    description: "Widerrufsbelehrung und Muster-Widerrufsformular für Bestellungen im Online-Shop der Joujou GmbH.",
    canonical: "https://www.petit-joujou.de/widerruf",
  });

  return (
    <div style={{ backgroundColor: "#fdf8f9", minHeight: "100vh", paddingTop: "6rem", paddingBottom: "6rem" }}>
      <div style={{ maxWidth: "720px", margin: "0 auto", padding: "0 2rem" }}>

        <p style={{ fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#ff66c4", marginBottom: "1rem", fontFamily: "var(--font-body)" }}>
          Rechtliches
        </p>
        <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 5vw, 3rem)", color: "#1e3a3a", marginBottom: "3rem", lineHeight: 1.1 }}>
          Widerrufsbelehrung
        </h1>

        <div style={{ fontFamily: "var(--font-body)", fontSize: "0.95rem", color: "#40818a", lineHeight: 1.9 }}>

          <section style={{ marginBottom: "2.5rem" }}>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.1rem", color: "#1e3a3a", marginBottom: "0.75rem", letterSpacing: "0.05em" }}>
              Widerrufsrecht
            </h2>
            <p style={{ marginBottom: "1rem" }}>
              Sie haben das Recht, binnen vierzehn Tagen ohne Angabe von Gründen diesen Vertrag zu widerrufen. Die Widerrufsfrist beträgt vierzehn Tage ab dem Tag, an dem Sie oder ein von Ihnen benannter Dritter, der nicht der Beförderer ist, die Waren in Besitz genommen haben bzw. hat.
            </p>
            <p style={{ marginBottom: "1rem" }}>
              Um Ihr Widerrufsrecht auszuüben, müssen Sie uns
            </p>
            <p style={{ marginBottom: "1rem", paddingLeft: "1rem", borderLeft: "2px solid #f0d0d8" }}>
              Joujou GmbH<br />
              Hauptstraße 34<br />
              67098 Bad Dürkheim<br />
              E-Mail: hallo@joujou-pfalz.de<br />
              Telefon: +49 6322 7906693
            </p>
            <p style={{ marginBottom: "1rem" }}>
              mittels einer eindeutigen Erklärung (z. B. ein mit der Post versandter Brief oder E-Mail) über Ihren Entschluss, diesen Vertrag zu widerrufen, informieren. Sie können dafür das beigefügte Muster-Widerrufsformular verwenden, das jedoch nicht vorgeschrieben ist.
            </p>
            <p>
              Zur Wahrung der Widerrufsfrist reicht es aus, dass Sie die Mitteilung über die Ausübung des Widerrufsrechts vor Ablauf der Widerrufsfrist absenden.
            </p>
          </section>

          <section style={{ marginBottom: "2.5rem" }}>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.1rem", color: "#1e3a3a", marginBottom: "0.75rem", letterSpacing: "0.05em" }}>
              Folgen des Widerrufs
            </h2>
            <p style={{ marginBottom: "1rem" }}>
              Wenn Sie diesen Vertrag widerrufen, haben wir Ihnen alle Zahlungen, die wir von Ihnen erhalten haben, einschließlich der Lieferkosten (mit Ausnahme der zusätzlichen Kosten, die sich daraus ergeben, dass Sie eine andere Art der Lieferung als die von uns angebotene, günstigste Standardlieferung gewählt haben), unverzüglich und spätestens binnen vierzehn Tagen ab dem Tag zurückzuzahlen, an dem die Mitteilung über Ihren Widerruf dieses Vertrags bei uns eingegangen ist.
            </p>
            <p style={{ marginBottom: "1rem" }}>
              Für diese Rückzahlung verwenden wir dasselbe Zahlungsmittel, das Sie bei der ursprünglichen Transaktion eingesetzt haben, es sei denn, mit Ihnen wurde ausdrücklich etwas anderes vereinbart; in keinem Fall werden Ihnen wegen dieser Rückzahlung Entgelte berechnet.
            </p>
            <p>
              Wir können die Rückzahlung verweigern, bis wir die Waren wieder zurückerhalten haben oder bis Sie den Nachweis erbracht haben, dass Sie die Waren zurückgesandt haben, je nachdem, welches der frühere Zeitpunkt ist.
            </p>
          </section>

          <section style={{ marginBottom: "2.5rem" }}>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.1rem", color: "#1e3a3a", marginBottom: "0.75rem", letterSpacing: "0.05em" }}>
              Rücksendung
            </h2>
            <p style={{ marginBottom: "1rem" }}>
              Sie haben die Waren unverzüglich und in jedem Fall spätestens binnen vierzehn Tagen ab dem Tag, an dem Sie uns über den Widerruf dieses Vertrags unterrichten, an uns zurückzusenden oder zu übergeben. Die Frist ist gewahrt, wenn Sie die Waren vor Ablauf der Frist von vierzehn Tagen absenden.
            </p>
            <p style={{ marginBottom: "1rem" }}>
              Sie tragen die unmittelbaren Kosten der Rücksendung der Waren.
            </p>
            <p>
              Sie müssen für einen etwaigen Wertverlust der Waren nur aufkommen, wenn dieser Wertverlust auf einen zur Prüfung der Beschaffenheit, Eigenschaften und Funktionsweise der Waren nicht notwendigen Umgang mit ihnen zurückzuführen ist.
            </p>
          </section>

          <section style={{ marginBottom: "2.5rem", padding: "1.5rem", backgroundColor: "rgba(30,58,58,0.03)", border: "1px solid #d0e0d8" }}>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.1rem", color: "#1e3a3a", marginBottom: "0.75rem", letterSpacing: "0.05em" }}>
              Muster-Widerrufsformular
            </h2>
            <p style={{ fontSize: "0.85rem", color: "#40818a", marginBottom: "1rem" }}>
              (Wenn Sie den Vertrag widerrufen wollen, dann füllen Sie bitte dieses Formular aus und senden Sie es zurück.)
            </p>
            <div style={{ fontSize: "0.9rem", color: "#1e3a3a", lineHeight: 2 }}>
              <p>An:<br />
                Joujou GmbH<br />
                Hauptstraße 34<br />
                67098 Bad Dürkheim<br />
                E-Mail: hallo@joujou-pfalz.de
              </p>
              <p style={{ marginTop: "1rem" }}>
                Hiermit widerrufe(n) ich/wir (*) den von mir/uns (*) abgeschlossenen Vertrag über den Kauf der folgenden Waren (*)/die Erbringung der folgenden Dienstleistung (*)
              </p>
              <p>— Bestellt am (*)/erhalten am (*)</p>
              <p>— Name des/der Verbraucher(s)</p>
              <p>— Anschrift des/der Verbraucher(s)</p>
              <p>— Unterschrift des/der Verbraucher(s) (nur bei Mitteilung auf Papier)</p>
              <p>— Datum</p>
              <p style={{ marginTop: "1rem", fontSize: "0.8rem", color: "#6ba8b0" }}>
                (*) Unzutreffendes streichen.
              </p>
            </div>
          </section>

          <p style={{ fontSize: "0.8rem", color: "#6ba8b0", borderTop: "1px solid #f0d0d8", paddingTop: "2rem" }}>
            Stand: Juli 2026 · Joujou GmbH
          </p>

        </div>

        <div style={{ marginTop: "3rem", display: "flex", gap: "1.5rem", flexWrap: "wrap" }}>
          <Link
            href="/agb"
            style={{
              fontFamily: "var(--font-body)", fontSize: "0.78rem", letterSpacing: "0.12em",
              textTransform: "uppercase", color: "#40818a", textDecoration: "none",
              borderBottom: "1px solid #40818a", paddingBottom: "2px",
            }}
          >
            AGB
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
