"use client";

import { Save, Plus, X } from "lucide-react";
import type { L } from "@/lib/i18n";
import ImageUploader from "./ImageUploader";

// Composants de champ réutilisables pour les formulaires d'administration.

export function Section({
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

export function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-semibold uppercase tracking-wider text-ink-soft">
        {label}
      </span>
      {children}
    </label>
  );
}

export const inputClass =
  "w-full rounded-lg border border-sand-300 bg-cream/40 px-3 py-2 text-sm text-ink outline-none focus:border-baobab focus:ring-2 focus:ring-baobab/20";

export function Input({
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

export function Textarea({
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

export function LocalizedText({
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

export function ImageField({
  label,
  url,
  onChange,
}: {
  label: string;
  url?: string;
  onChange: (url: string) => void;
}) {
  return (
    <Field label={label}>
      <div className="flex flex-wrap items-center gap-3">
        {url ? (
          <div className="group relative h-24 w-40 overflow-hidden rounded-lg ring-1 ring-ink/10">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={url} alt="" className="h-full w-full object-cover" />
            <button
              type="button"
              onClick={() => onChange("")}
              className="absolute right-1 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-black/60 text-white opacity-0 transition group-hover:opacity-100"
            >
              <X size={14} />
            </button>
          </div>
        ) : (
          <div className="flex h-24 w-40 items-center justify-center rounded-lg border-2 border-dashed border-sand-300 text-xs text-ink-soft">
            Aucune image
          </div>
        )}
        <ImageUploader onUploaded={onChange} label={url ? "Remplacer" : "Ajouter une image"} />
      </div>
    </Field>
  );
}

export function GalleryField({
  label,
  hint,
  images,
  onChange,
}: {
  label: string;
  hint?: string;
  images: string[];
  onChange: (next: string[]) => void;
}) {
  return (
    <Field label={label}>
      {hint && <p className="mb-2 -mt-0.5 text-xs text-ink-soft">{hint}</p>}
      <div className="flex flex-wrap gap-3">
        {images.map((url, i) => (
          <div key={i} className="group relative h-24 w-32 overflow-hidden rounded-lg ring-1 ring-ink/10">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={url} alt="" className="h-full w-full object-cover" />
            <button
              type="button"
              onClick={() => onChange(images.filter((_, j) => j !== i))}
              className="absolute right-1 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-black/60 text-white opacity-0 transition group-hover:opacity-100"
            >
              <X size={14} />
            </button>
          </div>
        ))}
        <div className="flex h-24 w-32 items-center justify-center rounded-lg border-2 border-dashed border-sand-300">
          <ImageUploader onUploaded={(u) => onChange([...images, u])} label="Ajouter" />
        </div>
      </div>
    </Field>
  );
}

export function AddButton({ onClick, label }: { onClick: () => void; label: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex items-center gap-2 rounded-lg bg-sand-100 px-4 py-2 text-sm font-medium text-ink hover:bg-sand-200"
    >
      <Plus size={15} /> {label}
    </button>
  );
}

export function SaveBar({
  pending,
  msg,
}: {
  pending: boolean;
  msg: { ok: boolean; text: string } | null;
}) {
  return (
    <div className="fixed inset-x-0 bottom-0 border-t border-sand-300 bg-paper/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-end gap-4 px-5 py-3">
        {msg && (
          <span className={`text-sm font-medium ${msg.ok ? "text-jungle" : "text-red-600"}`}>{msg.text}</span>
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
  );
}
