import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { afterAll, describe, expect, it, vi } from "vitest";
import Datenschutz from "../client/src/pages/Datenschutz";

// The existing Vitest config uses classic JSX for imported page components.
vi.stubGlobal("React", React);
afterAll(() => vi.unstubAllGlobals());

vi.mock("../client/src/hooks/usePageMeta", () => ({ usePageMeta: () => {} }));
vi.mock("wouter", () => ({
  Link: ({ children, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) =>
    React.createElement("a", props, children),
}));

const text = "Für den Versand unseres Newsletters nutzen wir den Dienst der rapidmail GmbH, Ingeborg-Krummer-Schroth-Straße 18a, 79106 Freiburg im Breisgau. Die Anmeldung erfolgt über ein eingebettetes Formular von rapidmail, das die Daten in unserem Auftrag verarbeitet (Auftragsverarbeitung nach Art. 28 DSGVO). Die Anmeldung läuft im Double-Opt-in-Verfahren: Nach Eingabe Ihrer E-Mail-Adresse erhalten Sie eine Bestätigungs-E-Mail; erst nach Bestätigung nehmen wir Sie auf. Zum Nachweis der Einwilligung protokollieren wir den Zeitpunkt von Anmeldung und Bestätigung sowie die IP-Adresse. Rechtsgrundlage ist Ihre Einwilligung nach Art. 6 Abs. 1 lit. a DSGVO; die Abmeldung ist jederzeit über den Link in jeder E-Mail möglich. Das Formular lädt Skripte des rapidmail-Systems (emailsys1a.net). Zum Schutz vor automatisierten Anmeldungen ist ein Captcha der CaptchaFox GmbH, Fokkerstr. 2, 85399 Hallbergmoos, eingebunden (geladen von cdn.captchafox.com), das dabei technische Verbindungsdaten einschließlich der IP-Adresse verarbeitet. Rechtsgrundlage ist unser berechtigtes Interesse an der Missbrauchsabwehr nach Art. 6 Abs. 1 lit. f DSGVO. Weitere Informationen: Datenschutz rapidmail, Datenschutz CaptchaFox.";

describe("Newsletter privacy addition 2026-10-09", () => {
  const html = renderToStaticMarkup(React.createElement(Datenschutz));
  const sections = Array.from(html.matchAll(/<section[^>]*>([\s\S]*?)<\/section>/g)).map(match => match[1]);
  const newsletter = sections.find(section => section.includes("8a. Newsletter (rapidmail)"))!;

  it("renders the complete supplied copy without changing its Sie address", () => {
    const body = newsletter.replace(/<h2[^>]*>[\s\S]*?<\/h2>/, "");
    const plainText = body.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim().replace(/\s+([,.])/g, "$1");
    expect(plainText).toBe(text);
  });

  it("renders both provider privacy links safely", () => {
    expect(newsletter).toContain('href="https://www.rapidmail.de/datenschutz" target="_blank" rel="noopener noreferrer"');
    expect(newsletter).toContain('href="https://captchafox.com/privacy" target="_blank" rel="noopener noreferrer"');
  });

  it("preserves existing heading numbers and legal navigation", () => {
    const headings = Array.from(html.matchAll(/<h2[^>]*>([\s\S]*?)<\/h2>/g)).map(match => match[1]);
    expect(headings.map(heading => heading.split(". ")[0])).toEqual(["1", "2", "3", "6", "7", "8", "8a", "10"]);
    expect(html).toContain('href="/impressum"');
    expect(html).toContain('href="/"');
    expect(html).toContain("Stand: 9. Oktober 2026");
  });
});
