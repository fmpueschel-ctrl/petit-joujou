/**
 * Mailer — sendet E-Mails über SMTP.
 * Konfiguration über Umgebungsvariablen:
 *   SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS
 * Falls keine SMTP-Kreds vorhanden, wird nur geloggt (Fallback).
 */
import nodemailer from "nodemailer";

function createTransport() {
  const host = process.env.SMTP_HOST;
  const port = parseInt(process.env.SMTP_PORT ?? "587", 10);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !user || !pass) {
    return null;
  }

  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  });
}

export async function sendMail({
  to,
  subject,
  text,
}: {
  to: string;
  subject: string;
  text: string;
}) {
  const transport = createTransport();

  if (!transport) {
    // Kein SMTP konfiguriert — nur loggen
    console.log("[Mailer] SMTP nicht konfiguriert. E-Mail würde gesendet an:", to);
    console.log("[Mailer] Betreff:", subject);
    console.log("[Mailer] Inhalt:\n", text);
    return false;
  }

  try {
    await transport.sendMail({
      from: process.env.SMTP_USER,
      to,
      subject,
      text,
    });
    return true;
  } catch (err) {
    console.error("[Mailer] Fehler beim Senden:", err);
    return false;
  }
}
