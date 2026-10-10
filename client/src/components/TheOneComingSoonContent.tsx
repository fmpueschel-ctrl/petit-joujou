import RapidmailSignup from "./RapidmailSignup";
import { WINEBAR_THEME as C } from "@/lib/winebarTheme";

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
  const headingColor = tone === "dark" ? C.paper : C.ink;
  const textColor = tone === "dark" ? "rgba(245,240,230,0.84)" : C.inkMuted;
  const claimColor = tone === "dark" ? C.accentLight : C.accentStrong;

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
        The One — der Online-Shop kommt bald.
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
        <p style={{ margin: 0 }}>
          Unsere Lieblingsprodukte, vom Salzstreuer bis zum Weinglas, findet ihr bald in unserem neuen Shop The One.
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
