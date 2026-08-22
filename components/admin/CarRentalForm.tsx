"use client";

import { useState, useTransition } from "react";
import { Trash2 } from "lucide-react";
import type { CarRentalContent } from "@/lib/carrental";
import type { L } from "@/lib/i18n";
import { saveCarRental } from "@/app/admin/actions";
import { Section, Field, Input, LocalizedText, ImageField, AddButton, SaveBar } from "./fields";

type LocKey = "title" | "intro" | "ctaTitle" | "ctaText";

export default function CarRentalForm({ initial }: { initial: CarRentalContent }) {
  const [c, setC] = useState<CarRentalContent>(initial);
  const [pending, start] = useTransition();
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);

  const setLoc = (k: LocKey, lang: "en" | "fr", v: string) =>
    setC((p) => ({ ...p, [k]: { ...(p[k] as L), [lang]: v } }));

  // Options (avec / sans chauffeur)
  const addOption = () =>
    setC((p) => ({ ...p, options: [...p.options, { title: { en: "", fr: "" }, text: { en: "", fr: "" } }] }));
  const setOption = (i: number, f: "title" | "text", lang: "en" | "fr", v: string) =>
    setC((p) => {
      const options = [...p.options];
      options[i] = { ...options[i], [f]: { ...options[i][f], [lang]: v } };
      return { ...p, options };
    });
  const removeOption = (i: number) => setC((p) => ({ ...p, options: p.options.filter((_, j) => j !== i) }));

  // Véhicules
  const addVehicle = () =>
    setC((p) => ({
      ...p,
      vehicles: [...p.vehicles, { name: "", description: { en: "", fr: "" }, priceNote: { en: "", fr: "" }, image: "" }],
    }));
  const setVehicleName = (i: number, v: string) =>
    setC((p) => {
      const vehicles = [...p.vehicles];
      vehicles[i] = { ...vehicles[i], name: v };
      return { ...p, vehicles };
    });
  const setVehicleLoc = (i: number, f: "description" | "priceNote", lang: "en" | "fr", v: string) =>
    setC((p) => {
      const vehicles = [...p.vehicles];
      vehicles[i] = { ...vehicles[i], [f]: { ...(vehicles[i][f] as L), [lang]: v } };
      return { ...p, vehicles };
    });
  const setVehicleImage = (i: number, v: string) =>
    setC((p) => {
      const vehicles = [...p.vehicles];
      vehicles[i] = { ...vehicles[i], image: v };
      return { ...p, vehicles };
    });
  const removeVehicle = (i: number) => setC((p) => ({ ...p, vehicles: p.vehicles.filter((_, j) => j !== i) }));

  function submit(e: React.FormEvent) {
    e.preventDefault();
    setMsg(null);
    start(async () => {
      const r = await saveCarRental(c);
      setMsg(r.ok ? { ok: true, text: "Enregistré ✓" } : { ok: false, text: r.error });
    });
  }

  return (
    <form onSubmit={submit} className="space-y-6 pb-28">
      <Section title="En-tête">
        <LocalizedText label="Titre" value={c.title} onChange={(l, v) => setLoc("title", l, v)} />
        <LocalizedText label="Introduction" value={c.intro} onChange={(l, v) => setLoc("intro", l, v)} textarea rows={3} />
        <ImageField label="Grande image" url={c.heroImage} onChange={(u) => setC((p) => ({ ...p, heroImage: u }))} />
      </Section>

      <Section title="Formules" hint="Ex. « Avec chauffeur » et « Sans chauffeur ».">
        <div className="space-y-3">
          {c.options.map((o, i) => (
            <div key={i} className="rounded-xl border border-sand-300 bg-cream/40 p-4">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-sm font-semibold text-ink">Formule {i + 1}</span>
                <button type="button" onClick={() => removeOption(i)} className="text-ink-soft hover:text-red-600">
                  <Trash2 size={15} />
                </button>
              </div>
              <LocalizedText label="Titre" value={o.title} onChange={(l, v) => setOption(i, "title", l, v)} />
              <LocalizedText label="Description" value={o.text} onChange={(l, v) => setOption(i, "text", l, v)} textarea rows={2} />
            </div>
          ))}
          <AddButton onClick={addOption} label="Ajouter une formule" />
        </div>
      </Section>

      <Section title="Véhicules">
        <div className="space-y-3">
          {c.vehicles.map((v, i) => (
            <div key={i} className="rounded-xl border border-sand-300 bg-cream/40 p-4">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-sm font-semibold text-ink">Véhicule {i + 1}</span>
                <button type="button" onClick={() => removeVehicle(i)} className="text-ink-soft hover:text-red-600">
                  <Trash2 size={15} />
                </button>
              </div>
              <Field label="Nom / modèle">
                <Input value={v.name} onChange={(val) => setVehicleName(i, val)} placeholder="4×4 Toyota Land Cruiser" />
              </Field>
              <LocalizedText label="Description" value={v.description} onChange={(l, val) => setVehicleLoc(i, "description", l, val)} textarea rows={2} />
              <LocalizedText label="Tarif / note (facultatif)" value={v.priceNote ?? { en: "", fr: "" }} onChange={(l, val) => setVehicleLoc(i, "priceNote", l, val)} />
              <ImageField label="Photo" url={v.image} onChange={(u) => setVehicleImage(i, u)} />
            </div>
          ))}
          <AddButton onClick={addVehicle} label="Ajouter un véhicule" />
        </div>
      </Section>

      <Section title="Appel à l'action (bas de page)">
        <LocalizedText label="Titre" value={c.ctaTitle} onChange={(l, v) => setLoc("ctaTitle", l, v)} />
        <LocalizedText label="Texte" value={c.ctaText} onChange={(l, v) => setLoc("ctaText", l, v)} textarea rows={2} />
      </Section>

      <SaveBar pending={pending} msg={msg} />
    </form>
  );
}
