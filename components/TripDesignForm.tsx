"use client";

import { useState, useTransition } from "react";
import { MessageCircle, Send } from "lucide-react";
import { whatsappLink, mailtoLink } from "@/lib/site";
import { sendContactEmail } from "@/app/actions/contact";
import { useSettings } from "./SettingsProvider";
import type { Dictionary } from "@/lib/dictionaries";

// Formulaire « voyage sur-mesure » — récapitule les envies du voyageur dans un
// message pré-rempli (WhatsApp ou email). Aucun back-end : 100% gratuit.
export default function TripDesignForm({
  dict,
  lang,
}: {
  dict: Dictionary;
  lang: "en" | "fr";
}) {
  const tm = dict.tailorMade;
  const [form, setForm] = useState({
    name: "",
    email: "",
    duration: "",
    travellers: "",
    style: "",
    budget: "",
    dates: "",
    message: "",
  });

  const set =
    (k: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((f) => ({ ...f, [k]: e.target.value }));

  const build = () => {
    const L = lang === "fr";
    return [
      L ? "Bonjour Madaweaver Tour," : "Hello Madaweaver Tour,",
      L
        ? "Je souhaite concevoir un voyage sur-mesure :"
        : "I'd like to design a tailor-made trip:",
      "",
      `${tm.duration}: ${form.duration || "—"}`,
      `${tm.travellers}: ${form.travellers || "—"}`,
      `${tm.style}: ${form.style || "—"}`,
      `${tm.budget}: ${form.budget || "—"}`,
      `${tm.dates}: ${form.dates || "—"}`,
      "",
      `${L ? "Nom" : "Name"}: ${form.name || "—"}`,
      `Email: ${form.email || "—"}`,
      "",
      form.message || "—",
    ].join("\n");
  };

  const subject = lang === "fr" ? "Voyage sur-mesure" : "Tailor-made trip";
  const s = useSettings();
  const openWhatsapp = () => window.open(whatsappLink(s.contact.whatsapp, build()), "_blank");
  const openEmail = () => (window.location.href = mailtoLink(s.contact.email, subject, build()));

  const [pending, startSend] = useTransition();
  const [sent, setSent] = useState(false);
  const handleEmail = () =>
    startSend(async () => {
      const res = await sendContactEmail({ name: form.name, email: form.email, subject, message: build() });
      if (res.ok) setSent(true);
      else openEmail();
    });

  const field =
    "w-full rounded-lg border border-sand-300 bg-paper px-3.5 py-2.5 text-sm text-ink outline-none transition placeholder:text-ink-soft/60 focus:border-baobab focus:ring-2 focus:ring-baobab/20";
  const label = "mb-1.5 block text-xs font-semibold uppercase tracking-wider text-ink-soft";

  return (
    <div>
      <h2 className="font-display text-2xl font-semibold text-ink">{tm.formTitle}</h2>
      <p className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-jungle/10 px-3 py-1 text-xs font-semibold text-jungle">
        <span className="badge-dot" />
        {tm.reassure}
      </p>

      <form
        className="mt-6 space-y-5"
        onSubmit={(e) => {
          e.preventDefault();
          handleEmail();
        }}
      >
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label className={label}>{tm.duration}</label>
            <input className={field} placeholder={tm.durationPlaceholder} value={form.duration} onChange={set("duration")} />
          </div>
          <div>
            <label className={label}>{tm.travellers}</label>
            <input className={field} placeholder={tm.travellersPlaceholder} value={form.travellers} onChange={set("travellers")} />
          </div>
        </div>

        <div>
          <label className={label}>{tm.style}</label>
          <input className={field} placeholder={tm.stylePlaceholder} value={form.style} onChange={set("style")} />
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label className={label}>{tm.budget}</label>
            <input className={field} placeholder={tm.budgetPlaceholder} value={form.budget} onChange={set("budget")} />
          </div>
          <div>
            <label className={label}>{tm.dates}</label>
            <input className={field} placeholder={tm.datesPlaceholder} value={form.dates} onChange={set("dates")} />
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label className={label}>{dict.booking.name}</label>
            <input className={field} value={form.name} onChange={set("name")} required />
          </div>
          <div>
            <label className={label}>{dict.booking.email}</label>
            <input type="email" className={field} value={form.email} onChange={set("email")} required />
          </div>
        </div>

        <div>
          <label className={label}>{tm.message}</label>
          <textarea className={field} rows={3} placeholder={tm.messagePlaceholder} value={form.message} onChange={set("message")} />
        </div>

        {sent ? (
          <p className="rounded-lg bg-jungle/10 px-4 py-3 text-center text-sm font-medium text-jungle">
            {lang === "fr"
              ? "Demande envoyée ✓ Nous revenons vers vous rapidement."
              : "Request sent ✓ We'll get back to you shortly."}
          </p>
        ) : (
          <>
            <button
              type="submit"
              disabled={pending}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-baobab px-5 py-3.5 text-sm font-semibold uppercase tracking-wider text-white transition-colors hover:bg-baobab-dark disabled:opacity-60"
            >
              <Send size={16} />
              {pending ? (lang === "fr" ? "Envoi…" : "Sending…") : tm.submit}
            </button>
            <button
              type="button"
              onClick={openWhatsapp}
              className="flex w-full items-center justify-center gap-2 rounded-lg border border-[#25D366] px-5 py-3 text-sm font-semibold text-[#128C7E] transition-colors hover:bg-[#25D366]/10"
            >
              <MessageCircle size={17} />
              {tm.whatsapp}
            </button>
          </>
        )}
        <p className="text-center text-xs text-ink-soft">{tm.note}</p>
      </form>
    </div>
  );
}
