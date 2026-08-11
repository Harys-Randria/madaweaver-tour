"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Save } from "lucide-react";
import type { Testimonial } from "@/lib/testimonials";
import type { L } from "@/lib/i18n";
import { saveTestimonial } from "@/app/admin/actions";

const BLANK: Testimonial = {
  quote: { en: "", fr: "" },
  author: "",
  origin: { en: "", fr: "" },
};

export default function TestimonialForm({
  initial,
}: {
  initial?: { id: string; content: Testimonial; sort: number };
}) {
  const router = useRouter();
  const [pending, start] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [tm, setTm] = useState<Testimonial>(initial?.content ?? BLANK);

  const setLoc = (k: "quote" | "origin", lang: "en" | "fr", v: string) =>
    setTm((p) => ({ ...p, [k]: { ...(p[k] as L), [lang]: v } }));

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (!tm.author.trim()) return setError("Le nom de l'auteur est requis.");

    start(async () => {
      const res = await saveTestimonial({
        id: initial?.id,
        sort: initial?.sort ?? 999,
        content: { ...tm, author: tm.author.trim() },
      });
      if (!res.ok) setError(res.error);
      else {
        router.push("/admin/testimonials");
        router.refresh();
      }
    });
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6 pb-28">
      <Section title="Avis">
        <LocalizedText
          label="Citation"
          value={tm.quote}
          onChange={(l, v) => setLoc("quote", l, v)}
          textarea
          rows={4}
        />
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Auteur (ex. Sophie & Marc)">
            <Input value={tm.author} onChange={(v) => setTm((p) => ({ ...p, author: v }))} />
          </Field>
        </div>
        <LocalizedText
          label="Origine (pays)"
          value={tm.origin}
          onChange={(l, v) => setLoc("origin", l, v)}
        />
      </Section>

      <div className="fixed inset-x-0 bottom-0 border-t border-sand-300 bg-paper/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3">
          {error ? (
            <p className="text-sm text-red-600">{error}</p>
          ) : (
            <button
              type="button"
              onClick={() => router.push("/admin/testimonials")}
              className="text-sm text-ink-soft hover:text-ink"
            >
              ← Retour
            </button>
          )}
          <button
            type="submit"
            disabled={pending}
            className="inline-flex items-center gap-2 rounded-full bg-baobab px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-baobab-dark disabled:opacity-60"
          >
            <Save size={17} />
            {pending ? "Enregistrement…" : "Enregistrer"}
          </button>
        </div>
      </div>
    </form>
  );
}

// --- Petits composants de champ ---------------------------------------------

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-2xl bg-paper p-6 ring-1 ring-ink/8">
      <h2 className="font-display text-xl font-semibold text-ink">{title}</h2>
      <div className="mt-4 space-y-4">{children}</div>
    </section>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-semibold uppercase tracking-wider text-ink-soft">
        {label}
      </span>
      {children}
    </label>
  );
}

const inputClass =
  "w-full rounded-lg border border-sand-300 bg-cream/40 px-3 py-2 text-sm text-ink outline-none focus:border-baobab focus:ring-2 focus:ring-baobab/20";

function Input({
  value,
  onChange,
  placeholder,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <input
      type="text"
      value={value}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
      className={inputClass}
    />
  );
}

function Textarea({
  value,
  onChange,
  placeholder,
  rows = 2,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  rows?: number;
}) {
  return (
    <textarea
      value={value}
      placeholder={placeholder}
      rows={rows}
      onChange={(e) => onChange(e.target.value)}
      className={inputClass}
    />
  );
}

function LocalizedText({
  label,
  value,
  onChange,
  textarea,
  rows,
}: {
  label: string;
  value: L;
  onChange: (lang: "en" | "fr", v: string) => void;
  textarea?: boolean;
  rows?: number;
}) {
  const C = textarea ? Textarea : Input;
  return (
    <Field label={label}>
      <div className="grid gap-2 sm:grid-cols-2">
        <C value={value.fr} onChange={(v) => onChange("fr", v)} placeholder="Français" rows={rows} />
        <C value={value.en} onChange={(v) => onChange("en", v)} placeholder="English" rows={rows} />
      </div>
    </Field>
  );
}
