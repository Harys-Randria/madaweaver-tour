"use client";

import { useState, useTransition } from "react";
import { saveSettings } from "@/app/admin/actions";
import type { SiteSettings } from "@/lib/site";

const inputClass =
  "w-full rounded-lg border border-sand-300 bg-paper px-3 py-2 text-sm text-ink outline-none focus:border-baobab focus:ring-2 focus:ring-baobab/20";
const labelClass = "mb-1 block text-xs font-semibold uppercase tracking-wider text-ink-soft";

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-2xl bg-paper p-6 ring-1 ring-ink/8">
      <h2 className="font-display text-lg font-semibold text-ink">{title}</h2>
      <div className="mt-4 grid gap-4">{children}</div>
    </section>
  );
}

function Field({
  label,
  value,
  onChange,
  hint,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  hint?: string;
  placeholder?: string;
}) {
  return (
    <div>
      <label className={labelClass}>{label}</label>
      <input
        className={inputClass}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
      />
      {hint && <p className="mt-1 text-xs text-ink-soft/80">{hint}</p>}
    </div>
  );
}

export default function SettingsForm({ initial }: { initial: SiteSettings }) {
  const [s, setS] = useState<SiteSettings>(initial);
  const [pending, start] = useTransition();
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);

  const contact = (k: keyof SiteSettings["contact"]) => (v: string) =>
    setS((p) => ({ ...p, contact: { ...p.contact, [k]: v } }));
  const social = (k: keyof SiteSettings["social"]) => (v: string) =>
    setS((p) => ({ ...p, social: { ...p.social, [k]: v } }));
  const loc = (field: "tagline" | "description", lang: "en" | "fr") => (v: string) =>
    setS((p) => ({ ...p, [field]: { ...p[field], [lang]: v } }));
  const field = (k: "name" | "url") => (v: string) => setS((p) => ({ ...p, [k]: v }));

  function submit(e: React.FormEvent) {
    e.preventDefault();
    setMsg(null);
    start(async () => {
      const r = await saveSettings(s);
      setMsg(r.ok ? { ok: true, text: "Enregistré ✓" } : { ok: false, text: r.error });
    });
  }

  return (
    <form onSubmit={submit} className="grid gap-6">
      <Section title="Coordonnées">
        <Field
          label="WhatsApp"
          value={s.contact.whatsapp}
          onChange={contact("whatsapp")}
          placeholder="261340000000"
          hint="Format international SANS le « + » et sans espaces (ex. 261340000000)."
        />
        <Field
          label="Téléphone affiché"
          value={s.contact.phoneDisplay}
          onChange={contact("phoneDisplay")}
          placeholder="+261 34 00 000 00"
        />
        <Field label="Email" value={s.contact.email} onChange={contact("email")} />
        <Field label="Adresse" value={s.contact.address} onChange={contact("address")} />
      </Section>

      <Section title="Réseaux sociaux">
        <Field
          label="Facebook"
          value={s.social.facebook}
          onChange={social("facebook")}
          hint="Lien complet, ou « # » si non utilisé."
        />
        <Field label="Instagram" value={s.social.instagram} onChange={social("instagram")} />
        <Field label="TripAdvisor" value={s.social.tripadvisor} onChange={social("tripadvisor")} />
        <Field label="YouTube" value={s.social.youtube} onChange={social("youtube")} />
      </Section>

      <Section title="Marque & référencement">
        <Field label="Nom du site" value={s.name} onChange={field("name")} />
        <Field
          label="URL du site"
          value={s.url}
          onChange={field("url")}
          hint="Ex. https://madaweaver-tour.vercel.app — utilisée dans les liens partagés."
        />
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Slogan (EN)" value={s.tagline.en} onChange={loc("tagline", "en")} />
          <Field label="Slogan (FR)" value={s.tagline.fr} onChange={loc("tagline", "fr")} />
        </div>
        <div>
          <label className={labelClass}>Description SEO (EN)</label>
          <textarea
            className={inputClass}
            rows={2}
            value={s.description.en}
            onChange={(e) => loc("description", "en")(e.target.value)}
          />
        </div>
        <div>
          <label className={labelClass}>Description SEO (FR)</label>
          <textarea
            className={inputClass}
            rows={2}
            value={s.description.fr}
            onChange={(e) => loc("description", "fr")(e.target.value)}
          />
        </div>
      </Section>

      <div className="flex items-center gap-4">
        <button
          type="submit"
          disabled={pending}
          className="rounded-full bg-baobab px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-baobab-dark disabled:opacity-60"
        >
          {pending ? "Enregistrement…" : "Enregistrer"}
        </button>
        {msg && (
          <span className={`text-sm font-medium ${msg.ok ? "text-jungle" : "text-baobab-dark"}`}>
            {msg.text}
          </span>
        )}
      </div>
    </form>
  );
}
