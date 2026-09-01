"use server";

import { Resend } from "resend";
import { getSettings } from "@/lib/data";

export type ContactPayload = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

export type SendResult =
  | { ok: true }
  | { ok: false; reason: "not_configured" | "error"; error?: string };

// Envoie la demande de contact par email à l'agence via Resend.
// Si RESEND_API_KEY n'est pas configurée, renvoie "not_configured" pour que le
// formulaire retombe proprement sur le WhatsApp / mailto (rien ne casse).
export async function sendContactEmail(p: ContactPayload): Promise<SendResult> {
  const key = process.env.RESEND_API_KEY;
  if (!key) return { ok: false, reason: "not_configured" };

  const name = p.name.trim();
  const email = p.email.trim();
  const message = p.message.trim();
  if (!message) return { ok: false, reason: "error", error: "empty" };

  try {
    const settings = await getSettings();
    const resend = new Resend(key);
    // Domaine non vérifié → Resend impose onboarding@resend.dev comme expéditeur.
    // Une fois le domaine vérifié, définir RESEND_FROM (ex. "Madaweaver <contact@…>").
    const from = process.env.RESEND_FROM || "Madaweaver Tour <onboarding@resend.dev>";
    // Adresse de réception des demandes. En mode test (sans domaine vérifié),
    // Resend n'accepte QUE l'email du compte Resend → on la rend configurable
    // via RESEND_TO, indépendamment de l'email public affiché sur le site.
    const to = process.env.RESEND_TO || settings.contact.email;

    const { error } = await resend.emails.send({
      from,
      to,
      replyTo: email || undefined,
      subject: p.subject || "Nouvelle demande — Madaweaver Tour",
      text: `${message}\n\n— ${name || "Anonyme"}${email ? ` <${email}>` : ""}`,
    });

    if (error) return { ok: false, reason: "error", error: error.message };
    return { ok: true };
  } catch (e) {
    return { ok: false, reason: "error", error: e instanceof Error ? e.message : "unknown" };
  }
}
