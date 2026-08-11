"use client";

import { useState } from "react";
import { MessageCircle, Mail } from "lucide-react";
import { whatsappLink, mailtoLink } from "@/lib/site";
import { useSettings } from "./SettingsProvider";
import type { Dictionary } from "@/lib/dictionaries";

type Booking = Dictionary["booking"];

export default function BookingForm({
  circuitTitle,
  circuitUrl,
  durationDays,
  priceFrom,
  priceEstimated,
  daysLabel,
  fromLabel,
  perPersonLabel,
  b,
  lang,
}: {
  circuitTitle: string;
  circuitUrl?: string;
  durationDays?: number;
  priceFrom?: number;
  priceEstimated?: boolean;
  daysLabel?: string;
  fromLabel?: string;
  perPersonLabel?: string;
  b: Booking;
  lang: "en" | "fr";
}) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    people: "2",
    date: "",
    message: "",
  });

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const subject =
    lang === "fr"
      ? `Demande de réservation — ${circuitTitle}`
      : `Booking request — ${circuitTitle}`;

  const buildMessage = () => {
    const L = lang === "fr";
    // Métadonnées du circuit (durée · prix)
    const meta: string[] = [];
    if (durationDays) meta.push(`${durationDays} ${daysLabel ?? (L ? "jours" : "days")}`);
    if (priceFrom)
      meta.push(
        `${fromLabel ?? (L ? "dès" : "from")} ${priceEstimated ? "≈ " : ""}€${priceFrom} ${
          perPersonLabel ?? (L ? "/ pers." : "/ person")
        }`,
      );
    const metaStr = meta.length ? ` (${meta.join(" · ")})` : "";
    const lines = [
      L ? `Bonjour Madaweaver Tour,` : `Hello Madaweaver Tour,`,
      "",
      L
        ? `Je souhaite réserver le circuit : ${circuitTitle}${metaStr}.`
        : `I'd like to book the tour: ${circuitTitle}${metaStr}.`,
      ...(circuitUrl ? [L ? `Fiche : ${circuitUrl}` : `Tour page: ${circuitUrl}`] : []),
      "",
      `${L ? "Nom" : "Name"}: ${form.name || "—"}`,
      `Email: ${form.email || "—"}`,
      `${L ? "Téléphone" : "Phone"}: ${form.phone || "—"}`,
      `${L ? "Voyageurs" : "Travellers"}: ${form.people}`,
      `${L ? "Date souhaitée" : "Preferred date"}: ${form.date || "—"}`,
      "",
      `${L ? "Message" : "Message"}: ${form.message || "—"}`,
    ];
    return lines.join("\n");
  };

  const s = useSettings();
  const openWhatsapp = () => window.open(whatsappLink(s.contact.whatsapp, buildMessage()), "_blank");
  const openEmail = () => {
    window.location.href = mailtoLink(s.contact.email, subject, buildMessage());
  };

  const inputClass =
    "w-full rounded-none border-0 border-b border-sand-300 bg-transparent px-0 py-2.5 text-sm text-ink outline-none transition placeholder:text-ink-soft/60 focus:border-baobab";
  const labelClass = "mb-1 block text-xs font-medium uppercase tracking-wider text-ink-soft";

  return (
    <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-black/5 sm:p-7">
      <h3 className="font-display text-2xl font-semibold text-ink">{b.title}</h3>
      <p className="mt-1.5 text-sm text-ink-soft">{b.subtitle}</p>

      <form
        className="mt-5 space-y-4"
        onSubmit={(e) => {
          e.preventDefault();
          openWhatsapp();
        }}
      >
        <div>
          <label className={labelClass}>{b.name}</label>
          <input className={inputClass} value={form.name} onChange={set("name")} required />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className={labelClass}>{b.email}</label>
            <input type="email" className={inputClass} value={form.email} onChange={set("email")} required />
          </div>
          <div>
            <label className={labelClass}>{b.phone}</label>
            <input className={inputClass} value={form.phone} onChange={set("phone")} />
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className={labelClass}>{b.people}</label>
            <input
              type="number"
              min={1}
              max={30}
              className={inputClass}
              value={form.people}
              onChange={set("people")}
            />
          </div>
          <div>
            <label className={labelClass}>{b.date}</label>
            <input type="date" className={inputClass} value={form.date} onChange={set("date")} />
          </div>
        </div>

        <div>
          <label className={labelClass}>{b.message}</label>
          <textarea
            className={inputClass}
            rows={3}
            placeholder={b.messagePlaceholder}
            value={form.message}
            onChange={set("message")}
          />
        </div>

        <div className="flex flex-col gap-3 pt-1 sm:flex-row">
          <button
            type="submit"
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-[#25D366] px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:brightness-95"
          >
            <MessageCircle size={18} />
            {b.sendWhatsapp}
          </button>
          <button
            type="button"
            onClick={openEmail}
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-baobab px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-baobab-dark"
          >
            <Mail size={18} />
            {b.sendEmail}
          </button>
        </div>

        <p className="text-center text-xs text-ink-soft">{b.note}</p>
      </form>
    </div>
  );
}
