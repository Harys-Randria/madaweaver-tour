"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Save, Plus, Trash2, X, ImagePlus } from "lucide-react";
import type { Circuit, Category, Tone } from "@/lib/circuits";
import { CATEGORIES, DIFFICULTY_LABEL } from "@/lib/circuits";
import { t, type L } from "@/lib/i18n";
import { saveCircuit } from "@/app/admin/actions";
import ImageUploader from "./ImageUploader";

const TONES: Tone[] = ["sunset", "forest", "ocean", "canyon", "highland"];
const TONE_LABELS: Record<Tone, string> = {
  sunset: "Coucher de soleil (baobabs)",
  forest: "Forêt (lémuriens)",
  ocean: "Océan (plages)",
  canyon: "Canyon (tsingy/Isalo)",
  highland: "Hautes terres",
};

const BLANK: Circuit = {
  slug: "",
  title: { en: "", fr: "" },
  region: "",
  category: "nature",
  tone: "sunset",
  durationDays: 5,
  priceFrom: 500,
  groupMax: 8,
  difficulty: 1,
  featured: false,
  summary: { en: "", fr: "" },
  description: { en: "", fr: "" },
  highlights: { en: [], fr: [] },
  itinerary: [],
  included: { en: [], fr: [] },
  notIncluded: { en: [], fr: [] },
  bestSeason: { en: "", fr: "" },
  gallery: [],
  videos: [],
};

function slugify(s: string) {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export default function CircuitForm({
  initial,
}: {
  initial?: { id: string; content: Circuit; sort: number };
}) {
  const router = useRouter();
  const [pending, start] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [c, setC] = useState<Circuit>(initial?.content ?? BLANK);

  // Helpers ------------------------------------------------------------------
  type LocKey = "title" | "summary" | "description" | "bestSeason";
  type ListKey = "highlights" | "included" | "notIncluded";

  const setField = <K extends keyof Circuit>(k: K, v: Circuit[K]) =>
    setC((p) => ({ ...p, [k]: v }));
  const setLoc = (k: LocKey, lang: "en" | "fr", v: string) =>
    setC((p) => ({ ...p, [k]: { ...(p[k] as L), [lang]: v } }));
  const setList = (k: ListKey, lang: "en" | "fr", text: string) =>
    setC((p) => ({ ...p, [k]: { ...(p[k] as L<string[]>), [lang]: text.split("\n") } }));

  const addStep = () =>
    setC((p) => ({
      ...p,
      itinerary: [
        ...p.itinerary,
        { day: { en: "", fr: "" }, title: { en: "", fr: "" }, description: { en: "", fr: "" } },
      ],
    }));
  const setStep = (i: number, f: "day" | "title" | "description", lang: "en" | "fr", v: string) =>
    setC((p) => {
      const it = [...p.itinerary];
      it[i] = { ...it[i], [f]: { ...it[i][f], [lang]: v } };
      return { ...p, itinerary: it };
    });
  const removeStep = (i: number) =>
    setC((p) => ({ ...p, itinerary: p.itinerary.filter((_, j) => j !== i) }));
  const setStepCoord = (i: number, f: "lat" | "lng", v: string) =>
    setC((p) => {
      const it = [...p.itinerary];
      const n = v.trim() === "" ? undefined : Number(v);
      it[i] = { ...it[i], [f]: n !== undefined && Number.isFinite(n) ? n : undefined };
      return { ...p, itinerary: it };
    });

  const addImage = (url: string) =>
    setC((p) => ({ ...p, gallery: [...(p.gallery ?? []), url] }));
  const removeImage = (i: number) =>
    setC((p) => ({ ...p, gallery: (p.gallery ?? []).filter((_, j) => j !== i) }));

  const addVideo = () => setC((p) => ({ ...p, videos: [...(p.videos ?? []), ""] }));
  const setVideo = (i: number, v: string) =>
    setC((p) => {
      const vids = [...(p.videos ?? [])];
      vids[i] = v;
      return { ...p, videos: vids };
    });
  const removeVideo = (i: number) =>
    setC((p) => ({ ...p, videos: (p.videos ?? []).filter((_, j) => j !== i) }));

  // Save ---------------------------------------------------------------------
  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    const clean = (a: string[]) => a.map((s) => s.trim()).filter(Boolean);
    const slug = (c.slug.trim() || slugify(t(c.title, "en") || t(c.title, "fr"))).trim();
    if (!slug) return setError("Le titre (au moins une langue) est requis.");

    const content: Circuit = {
      ...c,
      slug,
      highlights: { en: clean(c.highlights.en), fr: clean(c.highlights.fr) },
      included: { en: clean(c.included.en), fr: clean(c.included.fr) },
      notIncluded: { en: clean(c.notIncluded.en), fr: clean(c.notIncluded.fr) },
      itinerary: c.itinerary.filter(
        (s) => s.title.en || s.title.fr || s.description.en || s.description.fr,
      ),
      gallery: (c.gallery ?? []).filter(Boolean),
      videos: (c.videos ?? []).map((v) => v.trim()).filter(Boolean),
    };

    start(async () => {
      const res = await saveCircuit({
        id: initial?.id,
        slug,
        featured: c.featured ?? false,
        sort: initial?.sort ?? 999,
        content,
      });
      if (!res.ok) setError(res.error);
      else {
        router.push("/admin");
        router.refresh();
      }
    });
  }

  // UI -----------------------------------------------------------------------
  return (
    <form onSubmit={onSubmit} className="space-y-6 pb-28">
      {/* Essentiel */}
      <Section title="Informations principales">
        <div className="grid gap-4 sm:grid-cols-2">
          <LocalizedText label="Titre" value={c.title} onChange={(l, v) => setLoc("title", l, v)} />
          <Field label="Région (ex. Morondava)">
            <Input value={c.region} onChange={(v) => setField("region", v)} />
          </Field>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Field label="Catégorie">
            <Select
              value={c.category}
              onChange={(v) => setField("category", v as Category)}
              options={CATEGORIES.map((x) => ({ value: x.key, label: t(x.label, "fr") }))}
            />
          </Field>
          <Field label="Ambiance visuelle">
            <Select
              value={c.tone}
              onChange={(v) => setField("tone", v as Tone)}
              options={TONES.map((x) => ({ value: x, label: TONE_LABELS[x] }))}
            />
          </Field>
          <Field label="Difficulté">
            <Select
              value={String(c.difficulty)}
              onChange={(v) => setField("difficulty", Number(v) as 1 | 2 | 3)}
              options={[1, 2, 3].map((d) => ({
                value: String(d),
                label: t(DIFFICULTY_LABEL[d as 1 | 2 | 3], "fr"),
              }))}
            />
          </Field>
          <Field label="Identifiant URL (laisser vide = auto)">
            <Input value={c.slug} onChange={(v) => setField("slug", v)} placeholder="auto" />
          </Field>
        </div>
        <div className="grid gap-4 sm:grid-cols-4">
          <Field label="Durée (jours)">
            <Input
              type="number"
              value={String(c.durationDays)}
              onChange={(v) => setField("durationDays", Number(v))}
            />
          </Field>
          <Field label="Prix à partir de (€)">
            <Input
              type="number"
              value={String(c.priceFrom)}
              onChange={(v) => setField("priceFrom", Number(v))}
            />
          </Field>
          <Field label="Groupe max.">
            <Input
              type="number"
              value={String(c.groupMax)}
              onChange={(v) => setField("groupMax", Number(v))}
            />
          </Field>
          <Field label="Meilleure saison">
            <div className="space-y-2">
              <Input
                value={c.bestSeason.fr}
                onChange={(v) => setLoc("bestSeason", "fr", v)}
                placeholder="FR"
              />
              <Input
                value={c.bestSeason.en}
                onChange={(v) => setLoc("bestSeason", "en", v)}
                placeholder="EN"
              />
            </div>
          </Field>
        </div>
        <label className="flex items-center gap-2 text-sm font-medium text-ink">
          <input
            type="checkbox"
            checked={c.featured ?? false}
            onChange={(e) => setField("featured", e.target.checked)}
            className="h-4 w-4 accent-[var(--color-baobab)]"
          />
          Mettre en vedette sur la page d&apos;accueil
        </label>
      </Section>

      {/* Textes */}
      <Section title="Descriptions">
        <LocalizedText
          label="Résumé court"
          value={c.summary}
          onChange={(l, v) => setLoc("summary", l, v)}
          textarea
        />
        <LocalizedText
          label="Description complète"
          value={c.description}
          onChange={(l, v) => setLoc("description", l, v)}
          textarea
          rows={4}
        />
      </Section>

      {/* Listes */}
      <Section title="Points forts & inclusions" hint="Une ligne = un élément.">
        <LocalizedList label="Points forts" value={c.highlights} onChange={(l, v) => setList("highlights", l, v)} />
        <LocalizedList label="Inclus" value={c.included} onChange={(l, v) => setList("included", l, v)} />
        <LocalizedList label="Non inclus" value={c.notIncluded} onChange={(l, v) => setList("notIncluded", l, v)} />
      </Section>

      {/* Itinéraire */}
      <Section title="Itinéraire jour par jour">
        <div className="space-y-4">
          {c.itinerary.map((step, i) => (
            <div key={i} className="rounded-xl border border-sand-300 bg-cream/40 p-4">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-sm font-semibold text-ink">Étape {i + 1}</span>
                <button
                  type="button"
                  onClick={() => removeStep(i)}
                  className="text-ink-soft hover:text-red-600"
                >
                  <Trash2 size={15} />
                </button>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <Input value={step.day.fr} onChange={(v) => setStep(i, "day", "fr", v)} placeholder="Jour (FR) — ex. Jour 1" />
                <Input value={step.day.en} onChange={(v) => setStep(i, "day", "en", v)} placeholder="Day (EN) — e.g. Day 1" />
                <Input value={step.title.fr} onChange={(v) => setStep(i, "title", "fr", v)} placeholder="Titre (FR)" />
                <Input value={step.title.en} onChange={(v) => setStep(i, "title", "en", v)} placeholder="Title (EN)" />
                <Textarea value={step.description.fr} onChange={(v) => setStep(i, "description", "fr", v)} placeholder="Description (FR)" />
                <Textarea value={step.description.en} onChange={(v) => setStep(i, "description", "en", v)} placeholder="Description (EN)" />
                <Input type="number" value={step.lat?.toString() ?? ""} onChange={(v) => setStepCoord(i, "lat", v)} placeholder="Latitude — ex. -18.9333" />
                <Input type="number" value={step.lng?.toString() ?? ""} onChange={(v) => setStepCoord(i, "lng", v)} placeholder="Longitude — ex. 47.5167" />
              </div>
              <p className="mt-2 text-xs text-ink-soft">
                Coordonnées (facultatif) pour la carte du parcours. Astuce : sur Google Maps,
                clic droit sur le lieu → cliquez les chiffres pour les copier (latitude, longitude).
              </p>
            </div>
          ))}
          <button
            type="button"
            onClick={addStep}
            className="inline-flex items-center gap-2 rounded-lg bg-sand-100 px-4 py-2 text-sm font-medium text-ink hover:bg-sand-200"
          >
            <Plus size={15} /> Ajouter une étape
          </button>
        </div>
      </Section>

      {/* Images */}
      <Section title="Images du circuit" hint="Ces photos apparaissent dans la galerie du circuit.">
        <div className="flex flex-wrap gap-3">
          {(c.gallery ?? []).map((url, i) => (
            <div key={i} className="group relative h-24 w-32 overflow-hidden rounded-lg ring-1 ring-ink/10">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={url} alt="" className="h-full w-full object-cover" />
              <button
                type="button"
                onClick={() => removeImage(i)}
                className="absolute right-1 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-black/60 text-white opacity-0 transition group-hover:opacity-100"
              >
                <X size={14} />
              </button>
            </div>
          ))}
          <div className="flex h-24 w-32 items-center justify-center rounded-lg border-2 border-dashed border-sand-300">
            <ImageUploader onUploaded={addImage} label="Ajouter" />
          </div>
        </div>
        <p className="mt-2 flex items-center gap-1.5 text-xs text-ink-soft">
          <ImagePlus size={13} />
          Sans photo, une illustration selon « l&apos;ambiance visuelle » choisie est utilisée automatiquement.
        </p>
      </Section>

      {/* Vidéos */}
      <Section title="Vidéos YouTube" hint="Collez l'identifiant YouTube (ex. dans youtu.be/ABC123 → ABC123).">
        <div className="space-y-2">
          {(c.videos ?? []).map((v, i) => (
            <div key={i} className="flex items-center gap-2">
              <Input value={v} onChange={(val) => setVideo(i, val)} placeholder="ID YouTube" />
              <button type="button" onClick={() => removeVideo(i)} className="text-ink-soft hover:text-red-600">
                <Trash2 size={15} />
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addVideo}
            className="inline-flex items-center gap-2 rounded-lg bg-sand-100 px-4 py-2 text-sm font-medium text-ink hover:bg-sand-200"
          >
            <Plus size={15} /> Ajouter une vidéo
          </button>
        </div>
      </Section>

      {/* Barre d'enregistrement */}
      <div className="fixed inset-x-0 bottom-0 border-t border-sand-300 bg-paper/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3">
          {error ? (
            <p className="text-sm text-red-600">{error}</p>
          ) : (
            <button
              type="button"
              onClick={() => router.push("/admin")}
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

function LocalizedList({
  label,
  value,
  onChange,
}: {
  label: string;
  value: L<string[]>;
  onChange: (lang: "en" | "fr", text: string) => void;
}) {
  return (
    <Field label={label}>
      <div className="grid gap-2 sm:grid-cols-2">
        <Textarea value={value.fr.join("\n")} onChange={(v) => onChange("fr", v)} placeholder="Français — une ligne par élément" rows={4} />
        <Textarea value={value.en.join("\n")} onChange={(v) => onChange("en", v)} placeholder="English — one line per item" rows={4} />
      </div>
    </Field>
  );
}
