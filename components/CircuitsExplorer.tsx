"use client";

import { useEffect, useMemo, useState } from "react";
import { SlidersHorizontal, RotateCcw } from "lucide-react";
import type { Circuit, Category, MacroRegion } from "@/lib/circuits";
import { CATEGORIES } from "@/lib/circuits";
import { t, type Locale } from "@/lib/i18n";
import type { Dictionary } from "@/lib/dictionaries";
import CircuitCard from "./CircuitCard";

type Duration = "any" | "short" | "medium" | "long";
type Sort = "featured" | "priceAsc" | "priceDesc" | "duration";

export default function CircuitsExplorer({
  circuits,
  lang,
  dict,
}: {
  circuits: Circuit[];
  lang: Locale;
  dict: Dictionary;
}) {
  const cp = dict.circuitsPage;
  const [category, setCategory] = useState<Category | "all">("all");
  const [duration, setDuration] = useState<Duration>("any");
  const [sort, setSort] = useState<Sort>("featured");
  const [region, setRegion] = useState<MacroRegion | "all">("all");

  // Lit ?region= depuis l'URL après le montage (évite tout décalage d'hydratation).
  useEffect(() => {
    const r = new URLSearchParams(window.location.search).get("region");
    const valid: MacroRegion[] = ["north", "highlands", "west", "east", "south"];
    if (r && (valid as string[]).includes(r)) setRegion(r as MacroRegion);
  }, []);

  const filtered = useMemo(() => {
    let list = circuits.filter((c) => {
      if (category !== "all" && c.category !== category) return false;
      if (region !== "all" && !(c.macroRegions ?? []).includes(region)) return false;
      if (duration === "short" && c.durationDays > 5) return false;
      if (duration === "medium" && (c.durationDays < 6 || c.durationDays > 9)) return false;
      if (duration === "long" && c.durationDays < 10) return false;
      return true;
    });

    list = [...list].sort((a, b) => {
      switch (sort) {
        case "priceAsc":
          return a.priceFrom - b.priceFrom;
        case "priceDesc":
          return b.priceFrom - a.priceFrom;
        case "duration":
          return a.durationDays - b.durationDays;
        default:
          return Number(b.featured ?? false) - Number(a.featured ?? false);
      }
    });
    return list;
  }, [circuits, category, region, duration, sort]);

  const reset = () => {
    setCategory("all");
    setDuration("any");
    setSort("featured");
    setRegion("all");
  };

  const chip = (active: boolean) =>
    `rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
      active
        ? "bg-baobab text-white"
        : "bg-white text-ink-soft ring-1 ring-sand-300 hover:ring-baobab hover:text-baobab"
    }`;

  const selectClass =
    "rounded-full border border-sand-300 bg-white px-4 py-2 text-sm font-medium text-ink outline-none focus:border-baobab";

  return (
    <div>
      {/* Bandeau région active (venant de la carte interactive) */}
      {region !== "all" && (
        <div className="mb-4 flex flex-wrap items-center gap-3 rounded-2xl bg-baobab/10 px-4 py-3 text-sm">
          <span className="font-semibold text-baobab">
            {lang === "fr" ? "Région" : "Region"} : {dict.landing.regions[region]}
          </span>
          <button
            onClick={() => setRegion("all")}
            className="ml-auto inline-flex items-center gap-1.5 font-medium text-ink-soft hover:text-baobab"
          >
            <RotateCcw size={14} />
            {cp.reset}
          </button>
        </div>
      )}

      {/* Barre de filtres */}
      <div className="rounded-3xl bg-sand-100 p-5 sm:p-6">
        <div className="flex items-center gap-2 text-sm font-semibold text-ink">
          <SlidersHorizontal size={16} className="text-baobab" />
          {cp.filters}
        </div>

        <div className="mt-4">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-ink-soft">
            {cp.category}
          </p>
          <div className="flex flex-wrap gap-2">
            <button className={chip(category === "all")} onClick={() => setCategory("all")}>
              {cp.all}
            </button>
            {CATEGORIES.map((c) => (
              <button
                key={c.key}
                className={chip(category === c.key)}
                onClick={() => setCategory(c.key)}
              >
                {c.emoji} {t(c.label, lang)}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-5 flex flex-wrap items-end gap-x-6 gap-y-4">
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-ink-soft">
              {cp.duration}
            </p>
            <select
              className={selectClass}
              value={duration}
              onChange={(e) => setDuration(e.target.value as Duration)}
            >
              <option value="any">{cp.anyDuration}</option>
              <option value="short">{cp.short}</option>
              <option value="medium">{cp.medium}</option>
              <option value="long">{cp.long}</option>
            </select>
          </div>

          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-ink-soft">
              {cp.sortBy}
            </p>
            <select
              className={selectClass}
              value={sort}
              onChange={(e) => setSort(e.target.value as Sort)}
            >
              <option value="featured">{cp.sortFeatured}</option>
              <option value="priceAsc">{cp.sortPriceAsc}</option>
              <option value="priceDesc">{cp.sortPriceDesc}</option>
              <option value="duration">{cp.sortDuration}</option>
            </select>
          </div>

          <button
            onClick={reset}
            className="ml-auto inline-flex items-center gap-1.5 text-sm font-medium text-ink-soft hover:text-baobab"
          >
            <RotateCcw size={15} />
            {cp.reset}
          </button>
        </div>
      </div>

      <p className="mt-6 text-sm font-medium text-ink-soft">
        {filtered.length} {cp.results}
      </p>

      {filtered.length === 0 ? (
        <div className="mt-4 rounded-3xl bg-sand-100 py-16 text-center text-ink-soft">
          {cp.noResults}
        </div>
      ) : (
        <div className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((c) => (
            <CircuitCard key={c.slug} circuit={c} lang={lang} dict={dict} />
          ))}
        </div>
      )}
    </div>
  );
}
