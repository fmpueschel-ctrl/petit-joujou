const RAPIDMAIL_FORM_URL =
  "https://t711d0237.emailsys1a.net/237/2274/257bdcff21/subscribe/form.html?_g=1785505556";

type RapidmailSignupProps = {
  compact?: boolean;
  eager?: boolean;
};

/**
 * Official embedded rapidmail form for the shared list
 * "Newsletter Sign-Up ab 31Jul2026" (form 2274).
 *
 * The iframe intentionally keeps rapidmail's Double-Opt-in, consent text,
 * logging and CaptchaFox integration intact. Do not replace this with a local
 * form bridge.
 */
export default function RapidmailSignup({ compact = false, eager = false }: RapidmailSignupProps) {
  return (
    <div style={{ width: "100%", maxWidth: compact ? "660px" : "720px", margin: "0 auto" }}>
      <div
        style={{
          overflow: "hidden",
          backgroundColor: "#fefefe",
          border: "1px solid rgba(31,61,92,0.16)",
          borderRadius: "6px",
        }}
      >
        <iframe
          src={RAPIDMAIL_FORM_URL}
          title="Newsletter-Anmeldung über rapidmail"
          loading={eager ? "eager" : "lazy"}
          className="rapidmail-signup-frame"
          style={{
            display: "block",
            width: "100%",
            border: 0,
            backgroundColor: "#fefefe",
          }}
        />
      </div>
      <a
        href={RAPIDMAIL_FORM_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="font-body"
        style={{
          display: "inline-block",
          marginTop: "0.65rem",
          color: "inherit",
          fontSize: "0.72rem",
          textUnderlineOffset: "3px",
        }}
      >
        Newsletter-Anmeldung in neuem Tab öffnen
      </a>
    </div>
  );
}
