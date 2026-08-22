"use client";

import { useState, useTransition } from "react";
import { Trash2 } from "lucide-react";
import type { AboutContent } from "@/lib/about";
import type { L } from "@/lib/i18n";
import { saveAbout } from "@/app/admin/actions";
import { Section, Field, Input, LocalizedText, ImageField, AddButton, SaveBar } from "./fields";

type LocKey =
  | "title"
  | "lead"
  | "storyTitle"
  | "story1"
  | "story2"
  | "valuesTitle"
  | "statsTitle"
  | "teamTitle"
  | "teamText"
  | "ctaTitle"
  | "ctaButton";

export default function AboutForm({ initial }: { initial: AboutContent }) {
  const [a, setA] = useState<AboutContent>(initial);
  const [pending, start] = useTransition();
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);

  const setLoc = (k: LocKey, lang: "en" | "fr", v: string) =>
    setA((p) => ({ ...p, [k]: { ...(p[k] as L), [lang]: v } }));
  const setImg = (k: "heroImage" | "storyImage", v: string) => setA((p) => ({ ...p, [k]: v }));

  // Valeurs
  const addValue = () =>
    setA((p) => ({ ...p, values: [...p.values, { title: { en: "", fr: "" }, text: { en: "", fr: "" } }] }));
  const setValue = (i: number, f: "title" | "text", lang: "en" | "fr", v: string) =>
    setA((p) => {
      const values = [...p.values];
      values[i] = { ...values[i], [f]: { ...values[i][f], [lang]: v } };
      return { ...p, values };
    });
  const removeValue = (i: number) => setA((p) => ({ ...p, values: p.values.filter((_, j) => j !== i) }));

  // Chiffres
  const addStat = () => setA((p) => ({ ...p, stats: [...p.stats, { value: "", label: { en: "", fr: "" } }] }));
  const setStatValue = (i: number, v: string) =>
    setA((p) => {
      const stats = [...p.stats];
      stats[i] = { ...stats[i], value: v };
      return { ...p, stats };
    });
  const setStatLabel = (i: number, lang: "en" | "fr", v: string) =>
    setA((p) => {
      const stats = [...p.stats];
      stats[i] = { ...stats[i], label: { ...stats[i].label, [lang]: v } };
      return { ...p, stats };
    });
  const removeStat = (i: number) => setA((p) => ({ ...p, stats: p.stats.filter((_, j) => j !== i) }));

  // Équipe
  const addMember = () =>
    setA((p) => ({
      ...p,
      team: [...p.team, { name: "", role: { en: "", fr: "" }, bio: { en: "", fr: "" }, photo: "" }],
    }));
  const setMemberName = (i: number, v: string) =>
    setA((p) => {
      const team = [...p.team];
      team[i] = { ...team[i], name: v };
      return { ...p, team };
    });
  const setMemberLoc = (i: number, f: "role" | "bio", lang: "en" | "fr", v: string) =>
    setA((p) => {
      const team = [...p.team];
      team[i] = { ...team[i], [f]: { ...(team[i][f] as L), [lang]: v } };
      return { ...p, team };
    });
  const setMemberPhoto = (i: number, v: string) =>
    setA((p) => {
      const team = [...p.team];
      team[i] = { ...team[i], photo: v };
      return { ...p, team };
    });
  const removeMember = (i: number) => setA((p) => ({ ...p, team: p.team.filter((_, j) => j !== i) }));

  function submit(e: React.FormEvent) {
    e.preventDefault();
    setMsg(null);
    start(async () => {
      const r = await saveAbout(a);
      setMsg(r.ok ? { ok: true, text: "Enregistré ✓" } : { ok: false, text: r.error });
    });
  }

  return (
    <form onSubmit={submit} className="space-y-6 pb-28">
      <Section title="En-tête">
        <LocalizedText label="Titre" value={a.title} onChange={(l, v) => setLoc("title", l, v)} />
        <LocalizedText label="Accroche" value={a.lead} onChange={(l, v) => setLoc("lead", l, v)} textarea rows={2} />
        <ImageField label="Grande image (en-tête)" url={a.heroImage} onChange={(u) => setImg("heroImage", u)} />
      </Section>

      <Section title="Notre histoire">
        <LocalizedText label="Titre de section" value={a.storyTitle} onChange={(l, v) => setLoc("storyTitle", l, v)} />
        <LocalizedText label="Paragraphe 1" value={a.story1} onChange={(l, v) => setLoc("story1", l, v)} textarea rows={4} />
        <LocalizedText label="Paragraphe 2" value={a.story2} onChange={(l, v) => setLoc("story2", l, v)} textarea rows={4} />
        <ImageField label="Image de l'histoire" url={a.storyImage} onChange={(u) => setImg("storyImage", u)} />
      </Section>

      <Section title="Nos valeurs" hint="Idéalement 3 valeurs (icônes gérées automatiquement).">
        <LocalizedText label="Titre de section" value={a.valuesTitle} onChange={(l, v) => setLoc("valuesTitle", l, v)} />
        <div className="space-y-3">
          {a.values.map((val, i) => (
            <div key={i} className="rounded-xl border border-sand-300 bg-cream/40 p-4">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-sm font-semibold text-ink">Valeur {i + 1}</span>
                <button type="button" onClick={() => removeValue(i)} className="text-ink-soft hover:text-red-600">
                  <Trash2 size={15} />
                </button>
              </div>
              <LocalizedText label="Titre" value={val.title} onChange={(l, v) => setValue(i, "title", l, v)} />
              <LocalizedText label="Texte" value={val.text} onChange={(l, v) => setValue(i, "text", l, v)} textarea rows={2} />
            </div>
          ))}
          <AddButton onClick={addValue} label="Ajouter une valeur" />
        </div>
      </Section>

      <Section title="Chiffres clés">
        <LocalizedText label="Titre de section" value={a.statsTitle} onChange={(l, v) => setLoc("statsTitle", l, v)} />
        <div className="space-y-3">
          {a.stats.map((st, i) => (
            <div key={i} className="rounded-xl border border-sand-300 bg-cream/40 p-4">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-sm font-semibold text-ink">Chiffre {i + 1}</span>
                <button type="button" onClick={() => removeStat(i)} className="text-ink-soft hover:text-red-600">
                  <Trash2 size={15} />
                </button>
              </div>
              <Field label="Valeur (ex. 10+)">
                <Input value={st.value} onChange={(v) => setStatValue(i, v)} placeholder="10+" />
              </Field>
              <LocalizedText label="Libellé" value={st.label} onChange={(l, v) => setStatLabel(i, l, v)} />
            </div>
          ))}
          <AddButton onClick={addStat} label="Ajouter un chiffre" />
        </div>
      </Section>

      <Section title="Équipe" hint="Ajoutez un membre à chaque nouvelle recrue.">
        <LocalizedText label="Titre de section" value={a.teamTitle} onChange={(l, v) => setLoc("teamTitle", l, v)} />
        <LocalizedText label="Texte d'intro" value={a.teamText} onChange={(l, v) => setLoc("teamText", l, v)} textarea rows={2} />
        <div className="space-y-3">
          {a.team.map((m, i) => (
            <div key={i} className="rounded-xl border border-sand-300 bg-cream/40 p-4">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-sm font-semibold text-ink">Membre {i + 1}</span>
                <button type="button" onClick={() => removeMember(i)} className="text-ink-soft hover:text-red-600">
                  <Trash2 size={15} />
                </button>
              </div>
              <Field label="Nom">
                <Input value={m.name} onChange={(v) => setMemberName(i, v)} placeholder="Prénom Nom" />
              </Field>
              <LocalizedText label="Rôle" value={m.role} onChange={(l, v) => setMemberLoc(i, "role", l, v)} />
              <LocalizedText label="Bio (facultatif)" value={m.bio ?? { en: "", fr: "" }} onChange={(l, v) => setMemberLoc(i, "bio", l, v)} textarea rows={2} />
              <ImageField label="Photo" url={m.photo} onChange={(u) => setMemberPhoto(i, u)} />
            </div>
          ))}
          <AddButton onClick={addMember} label="Ajouter un membre" />
        </div>
      </Section>

      <Section title="Appel à l'action (bas de page)">
        <LocalizedText label="Titre" value={a.ctaTitle} onChange={(l, v) => setLoc("ctaTitle", l, v)} />
        <LocalizedText label="Bouton" value={a.ctaButton} onChange={(l, v) => setLoc("ctaButton", l, v)} />
      </Section>

      <SaveBar pending={pending} msg={msg} />
    </form>
  );
}
