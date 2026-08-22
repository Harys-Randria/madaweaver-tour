"use client";

import { useEffect, useState } from "react";
import { X, MessageCircle, Mail } from "lucide-react";
import { whatsappLink, mailtoLink } from "@/lib/site";
import { useSettings } from "./SettingsProvider";

// Formulaire de réservation dédié à la location de voiture. Pré-rempli avec le
// véhicule choisi, il génère un message (WhatsApp ou email) 100% gratuit.
export default function CarBookingModal({
  vehicles,
  initialVehicle,
  lang,
  onClose,
}: {
  vehicles: string[];
  initialVehicle: string;
  lang: "en" | "fr";
  onClose: () => void;
}) {
  const s = useSettings();
  const fr = lang === "fr";
  const [form, setForm] = useState({
    vehicle: initialVehicle,
    driver: "with",
    date: "",
    days: "3",
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const set =
    (k: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setForm((f) => ({ ...f, [k]: e.target.value }));

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const driverLabel = form.driver === "with"
    ? fr ? "Avec chauffeur" : "With driver"
    : fr ? "Sans chauffeur" : "Without driver";

  const subject = fr
    ? `Réservation véhicule — ${form.vehicle}`
    : `Vehicle booking — ${form.vehicle}`;

  const build = () =>
    [
      fr ? "Bonjour Madaweaver Tour," : "Hello Madaweaver Tour,",
      fr ? "Je souhaite réserver un véhicule :" : "I'd like to book a vehicle:",
      "",
      `${fr ? "Véhicule" : "Vehicle"}: ${form.vehicle || "—"}`,
      `${fr ? "Formule" : "Option"}: ${driverLabel}`,
      `${fr ? "Date de prise en charge" : "Pick-up date"}: ${form.date || "—"}`,
      `${fr ? "Durée" : "Duration"}: ${form.days || "—"} ${fr ? "jour(s)" : "day(s)"}`,
      "",
      `${fr ? "Nom" : "Name"}: ${form.name || "—"}`,
      `Email: ${form.email || "—"}`,
      `${fr ? "Téléphone" : "Phone"}: ${form.phone || "—"}`,
      "",
      form.message || "—",
    ].join("\n");

  const openWhatsapp = () => window.open(whatsappLink(s.contact.whatsapp, build()), "_blank");
  const openEmail = () => (window.location.href = mailtoLink(s.contact.email, subject, build()));

  const field =
    "w-full rounded-lg border border-sand-300 bg-paper px-3.5 py-2.5 text-sm text-ink outline-none transition placeholder:text-ink-soft/60 focus:border-baobab focus:ring-2 focus:ring-baobab/20";
  const label = "mb-1.5 block text-xs font-semibold uppercase tracking-wider text-ink-soft";

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto bg-black/70 p-4 backdrop-blur-sm sm:items-center"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="relative my-8 w-full max-w-lg rounded-2xl bg-cream p-6 shadow-2xl sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label={fr ? "Fermer" : "Close"}
          className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-sand-100 text-ink-soft transition hover:bg-sand-200 hover:text-ink"
        >
          <X size={18} />
        </button>

        <h2 className="font-display text-2xl font-semibold text-ink">
          {fr ? "Réserver un véhicule" : "Book a vehicle"}
        </h2>
        <p className="mt-1 text-sm text-ink-soft">
          {fr
            ? "Réponse rapide · devis gratuit sans engagement."
            : "Fast reply · free quote, no commitment."}
        </p>

        <form
          className="mt-5 space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            openWhatsapp();
          }}
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className={label}>{fr ? "Véhicule" : "Vehicle"}</label>
              <select className={field} value={form.vehicle} onChange={set("vehicle")}>
                {vehicles.map((v) => (
                  <option key={v} value={v}>
                    {v}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className={label}>{fr ? "Formule" : "Option"}</label>
              <select className={field} value={form.driver} onChange={set("driver")}>
                <option value="with">{fr ? "Avec chauffeur" : "With driver"}</option>
                <option value="without">{fr ? "Sans chauffeur" : "Without driver"}</option>
              </select>
            </div>
            <div>
              <label className={label}>{fr ? "Date de prise en charge" : "Pick-up date"}</label>
              <input type="date" className={field} value={form.date} onChange={set("date")} />
            </div>
            <div>
              <label className={label}>{fr ? "Durée (jours)" : "Duration (days)"}</label>
              <input type="number" min={1} className={field} value={form.days} onChange={set("days")} />
            </div>
            <div>
              <label className={label}>{fr ? "Nom" : "Name"}</label>
              <input className={field} value={form.name} onChange={set("name")} required />
            </div>
            <div>
              <label className={label}>Email</label>
              <input type="email" className={field} value={form.email} onChange={set("email")} required />
            </div>
          </div>

          <div>
            <label className={label}>{fr ? "Téléphone" : "Phone"}</label>
            <input className={field} value={form.phone} onChange={set("phone")} />
          </div>

          <div>
            <label className={label}>{fr ? "Message (facultatif)" : "Message (optional)"}</label>
            <textarea className={field} rows={2} value={form.message} onChange={set("message")} />
          </div>

          <div className="flex flex-col gap-3 pt-1 sm:flex-row">
            <button
              type="submit"
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-[#25D366] px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:brightness-95"
            >
              <MessageCircle size={18} />
              WhatsApp
            </button>
            <button
              type="button"
              onClick={openEmail}
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-baobab px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-baobab-dark"
            >
              <Mail size={18} />
              Email
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
