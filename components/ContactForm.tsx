"use client";

import { useState } from "react";
import { MessageCircle } from "lucide-react";
import { whatsappLink, mailtoLink } from "@/lib/site";
import type { Dictionary } from "@/lib/dictionaries";

export default function ContactForm({
  dict,
  lang,
  title,
}: {
  dict: Dictionary;
  lang: "en" | "fr";
  title?: string;
}) {
  const c = dict.contactPage;
  const b = dict.booking;
  const [form, setForm] = useState({ name: "", email: "", travelType: "", message: "" });

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const build = () => {
    const L = lang === "fr";
    return [
      L ? "Bonjour Madaweaver Tour," : "Hello Madaweaver Tour,",
      "",
      `${L ? "Nom" : "Name"}: ${form.name || "—"}`,
      `Email: ${form.email || "—"}`,
      `${c.travelType}: ${form.travelType || "—"}`,
      "",
      form.message || "—",
    ].join("\n");
  };

  const subject = form.travelType
    ? `${lang === "fr" ? "Voyage" : "Trip"} — ${form.travelType}`
    : lang === "fr"
    ? "Demande d'information"
    : "General enquiry";
  const openWhatsapp = () => window.open(whatsappLink(build()), "_blank");
  const openEmail = () => (window.location.href = mailtoLink(subject, build()));

  const field =
    "w-full rounded-none border-0 border-b border-sand-300 bg-transparent px-0 py-2.5 text-sm text-ink outline-none transition placeholder:text-ink-soft/60 focus:border-baobab";
  const label = "mb-1 block text-xs font-medium uppercase tracking-wider text-ink-soft";

  return (
    <div>
      <h3 className="font-display text-2xl font-semibold text-ink">{title ?? c.formTitle}</h3>
      <form
        className="mt-6 space-y-5"
        onSubmit={(e) => {
          e.preventDefault();
          openEmail();
        }}
      >
        <div>
          <label className={label}>{b.name}</label>
          <input className={field} value={form.name} onChange={set("name")} required />
        </div>
        <div>
          <label className={label}>{b.email}</label>
          <input type="email" className={field} value={form.email} onChange={set("email")} required />
        </div>
        <div>
          <label className={label}>{c.travelType}</label>
          <input
            className={field}
            placeholder={c.travelTypePlaceholder}
            value={form.travelType}
            onChange={set("travelType")}
          />
        </div>
        <div>
          <label className={label}>{b.message}</label>
          <textarea
            className={field}
            rows={3}
            placeholder={b.messagePlaceholder}
            value={form.message}
            onChange={set("message")}
          />
        </div>

        <button
          type="submit"
          className="w-full rounded-lg bg-baobab px-5 py-3.5 text-sm font-semibold uppercase tracking-wider text-white transition-colors hover:bg-baobab-dark"
        >
          {c.send}
        </button>
        <button
          type="button"
          onClick={openWhatsapp}
          className="flex w-full items-center justify-center gap-2 rounded-lg border border-[#25D366] px-5 py-3 text-sm font-semibold text-[#128C7E] transition-colors hover:bg-[#25D366]/10"
        >
          <MessageCircle size={17} />
          WhatsApp
        </button>
        <p className="text-center text-xs text-ink-soft">{b.note}</p>
      </form>
    </div>
  );
}
