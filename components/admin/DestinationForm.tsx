"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Save, Plus, Trash2, X, ImagePlus } from "lucide-react";
import type { Destination } from "@/lib/destinations";
import type { MacroRegion } from "@/lib/circuits";
import { t, type L } from "@/lib/i18n";
import { saveDestination } from "@/app/admin/actions";
import ImageUploader from "./ImageUploader";

const REGIONS: { value: MacroRegion; label: string }[] = [
  { value: "north", label: "Nord" },
  { value: "east", label: "Est" },
  { value: "highlands", label: "Hautes Terres" },
  { value: "west", label: "Ouest" },
  { value: "south", label: "Sud" },
];

const BLANK: Destination = {
  slug: "",
  title: { en: "", fr: "" },
  region: "east",
  regionLabel: { en: "", fr: "" },
  image: "",
  excerpt: { en: "", fr: "" },
  sections: [],
};

function slugify(s: string) {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export default function DestinationForm({
  initial,
}: {
  initial?: { id: string; content: Destination; sort: number };
}) {
  const router = useRouter();
  const [pending, start] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [d, setD] = useState<Destination>(initial?.content ?? BLANK);

  type LocKey = "title" | "regionLabel" | "excerpt";

  const setField = <K extends keyof Destination>(k: K, v: Destination[K]) =>
    setD((p) => ({ ...p, [k]: v }));
  const setLoc = (k: LocKey, lang: "en" | "fr", v: string) =>
    setD((p) => ({ ...p, [k]: { ...(p[k] as L), [lang]: v } }));

  const addSection = () =>
    setD((p) => ({
      ...p,
      sections: [...p.sections, { heading: { en: "", fr: "" }, body: { en: "", fr: "" } }],
    }));
  const setSection = (i: number, f: "heading" | "body", lang: "en" | "fr", v: string) =>
    setD((p) => {
      const s = [...p.sections];
      s[i] = { ...s[i], [f]: { ...s[i][f], [lang]: v } };
      return { ...p, sections: s };
    });
  const removeSection = (i: number) =>
    setD((p) => ({ ...p, sections: p.sections.filter((_, j) => j !== i) }));

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    const slug = (d.slug.trim() || slugify(t(d.title, "en") || t(d.title, "fr"))).trim();
    if (!slug) return setError("Le titre (au moins une langue) est requis.");

    const content: Destination = {
      ...d,
      slug,
      sections: d.sections.filter(
        (s) => s.heading.en || s.heading.fr || s.body.en || s.body.fr,
      ),
    };

    start(async () => {
      const res = await saveDestination({
        id: initial?.id,
        slug,
        region: d.region,
        sort: initial?.sort ?? 999,
        content,
      });
      if (!res.ok) setError(res.error);
      else {
        router.push("/admin/destinations");
        router.refresh();
      }
    });
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6 pb-28">
      <Section title="Informations principales">
        <LocalizedText label="Titre" value={d.title} onChange={(l, v) => setLoc("title", l, v)} />
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Grande région (relie les circuits)">
            <Select
              value={d.region}
              onChange={(v) => setField("region", v as MacroRegion)}
              options={REGIONS}
            />
          </Field>
          <Field label="Identifiant URL (laisser vide = auto)">
            <Input value={d.slug} onChange={(v) => setField("slug", v)} placeholder="auto" />
          </Field>
        </div>
        <LocalizedText
          label="Étiquette de région (badge affiché sur la carte)"
          value={d.regionLabel}
          onChange={(l, v) => setLoc("regionLabel", l, v)}
        />
      </Section>

      <Section title="Présentation">
        <LocalizedText
          label="Accroche (résumé affiché sur la vignette et en intro)"
          value={d.excerpt}
          onChange={(l, v) => setLoc("excerpt", l, v)}
          textarea
          rows={3}
        />
      </Section>

      <Section title="Image principale" hint="La grande photo de la destination (vignette + bannière).">
        <div className="flex flex-wrap items-center gap-4">
          {d.image ? (
            <div className="group relative h-28 w-44 overflow-hidden rounded-lg ring-1 ring-ink/10">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={d.image} alt="" className="h-full w-full object-cover" />
              <button
                type="button"
                onClick={() => setField("image", "")}
                className="absolute right-1 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-black/60 text-white opacity-0 transition group-hover:opacity-100"
              >
                <X size={14} />
              </button>
            </div>
          ) : (
            <div className="flex h-28 w-44 items-center justify-center rounded-lg border-2 border-dashed border-sand-300 text-ink-soft">
              <ImagePlus size={22} />
            </div>
          )}
          <ImageUploader onUploaded={(url) => setField("image", url)} label={d.image ? "Remplacer" : "Ajouter une image"} />
        </div>
      </Section>

      <Section title="Sections" hint="Chaque section = un titre + un paragraphe (ex. un parc, une ville).">
        <div className="space-y-4">
          {d.sections.map((s, i) => (
            <div key={i} className="rounded-xl border border-sand-300 bg-cream/40 p-4">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-sm font-semibold text-ink">Section {i + 1}</span>
                <button
                  type="button"
                  onClick={() => removeSection(i)}
                  className="text-ink-soft hover:text-red-600"
                >
                  <Trash2 size={15} />
                </button>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <Input value={s.heading.fr} onChange={(v) => setSection(i, "heading", "fr", v)} placeholder="Titre (FR)" />
                <Input value={s.heading.en} onChange={(v) => setSection(i, "heading", "en", v)} placeholder="Title (EN)" />
                <Textarea value={s.body.fr} onChange={(v) => setSection(i, "body", "fr", v)} placeholder="Paragraphe (FR)" rows={4} />
                <Textarea value={s.body.en} onChange={(v) => setSection(i, "body", "en", v)} placeholder="Paragraph (EN)" rows={4} />
              </div>
            </div>
          ))}
          <button
            type="button"
            onClick={addSection}
            className="inline-flex items-center gap-2 rounded-lg bg-sand-100 px-4 py-2 text-sm font-medium text-ink hover:bg-sand-200"
          >
            <Plus size={15} /> Ajouter une section
          </button>
        </div>
      </Section>

      <div className="fixed inset-x-0 bottom-0 border-t border-sand-300 bg-paper/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3">
          {error ? (
            <p className="text-sm text-red-600">{error}</p>
          ) : (
            <button
              type="button"
              onClick={() => router.push("/admin/destinations")}
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

function Section({
  title,
  hint,
  children,
}: {
  title: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-2xl bg-paper p-6 ring-1 ring-ink/8">
      <h2 className="font-display text-xl font-semibold text-ink">{title}</h2>
      {hint && <p className="mt-0.5 text-xs text-ink-soft">{hint}</p>}
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
  type = "text",
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
}) {
  return (
    <input
      type={type}
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

function Select({
  value,
  onChange,
  options,
}: {
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <select value={value} onChange={(e) => onChange(e.target.value)} className={inputClass}>
      {options.map((o) => (
        <option key={o.value} value={o.value}>
          {o.label}
        </option>
      ))}
    </select>
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
