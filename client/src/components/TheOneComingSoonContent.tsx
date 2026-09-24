import RapidmailSignup from "./RapidmailSignup";

type TheOneComingSoonContentProps = {
  headingLevel?: "h1" | "h2";
  tone?: "dark" | "light";
  eagerNewsletter?: boolean;
};

export default function TheOneComingSoonContent({
  headingLevel = "h2",
  tone = "dark",
  eagerNewsletter = false,
}: TheOneComingSoonContentProps) {
  const Heading = headingLevel;
  const headingColor = tone === "dark" ? "#ffffff" : "#1F3D5C";
  const textColor = tone === "dark" ? "rgba(255,255,255,0.78)" : "rgba(31,61,92,0.82)";
  const claimColor = tone === "dark" ? "#d4688a" : "#a13f65";

  return (
    <div style={{ textAlign: "center", maxWidth: "760px", margin: "0 auto" }}>
      <p
        className="font-body"
        style={{
          fontSize: "0.88rem",
          color: claimColor,
          letterSpacing: "0.06em",
          margin: "0 0 0.8rem",
          fontStyle: "italic",
        }}
      >
        es kann nur eines geben
      </p>
      <Heading
        className="font-display"
        style={{
          fontSize: "clamp(2rem, 4.5vw, 3rem)",
          color: headingColor,
          lineHeight: 1.15,
          margin: "0 0 1.5rem",
        }}
      >
        Shop | The One — bald
      </Heading>
      <div
        className="font-body"
        style={{
          color: textColor,
          fontSize: "clamp(0.95rem, 1.5vw, 1.05rem)",
          lineHeight: 1.85,
          maxWidth: "680px",
          margin: "0 auto 2rem",
        }}
      >
        <p style={{ margin: "0 0 1rem" }}>
          Bald wird aus unserem Shop etwas Eigenes: The One, der verlängerte Arm unseres Stammhauses. Für alle, die nicht immer zu uns kommen können, aber ihr Stück Joujou mit nach Hause nehmen wollen.
        </p>
        <p style={{ margin: 0 }}>
          Hier, wo alles begann und wo wir bis heute live testen und feiern, wählen wir das Eine je Kategorie: das, bei dem Preis, Genuss, Design und Funktion am besten zusammenkommen.
        </p>
      </div>
      <p
        className="font-display"
        style={{ color: headingColor, fontSize: "1.1rem", margin: "0 0 1rem" }}
      >
        Sei dabei, wenn The One öffnet.
      </p>
      <RapidmailSignup compact eager={eagerNewsletter} />
      <p
        className="font-body"
        style={{
          color: textColor,
          fontSize: "0.78rem",
          fontStyle: "italic",
          letterSpacing: "0.08em",
          margin: "1.4rem 0 0",
        }}
      >
        bald unter theone.shop
      </p>
    </div>
  );
}
