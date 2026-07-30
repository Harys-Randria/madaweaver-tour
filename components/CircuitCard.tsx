import Link from "next/link";
import { Clock, MapPin, ArrowRight } from "lucide-react";
import { categoryLabel, type Circuit } from "@/lib/circuits";
import { t, type Locale } from "@/lib/i18n";
import type { Dictionary } from "@/lib/dictionaries";
import Scenery from "./Scenery";

export default function CircuitCard({
  circuit,
  lang,
  dict,
}: {
  circuit: Circuit;
  lang: Locale;
  dict: Dictionary;
}) {
  const highlight = t(circuit.highlights, lang)[0];

  return (
    <Link
      href={`/${lang}/circuits/${circuit.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl bg-paper ring-1 ring-ink/8 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-ink/10 hover:ring-baobab/30"
    >
      <div className="relative aspect-16/10 overflow-hidden">
        {circuit.gallery?.[0] ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={circuit.gallery[0]}
            alt=""
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <Scenery
            tone={circuit.tone}
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        )}

        {/* Badge catégorie (haut-gauche) */}
        <span className="absolute left-2.5 top-2.5 inline-flex items-center rounded-full bg-baobab px-2.5 py-1 text-[11px] font-semibold text-white shadow-sm">
          {categoryLabel(circuit.category, lang)}
        </span>

        {/* Région (bas-gauche) */}
        <span className="absolute bottom-2.5 left-2.5 inline-flex items-center gap-1 rounded-full bg-charcoal/70 px-2.5 py-1 text-[11px] font-medium text-cream backdrop-blur">
          <MapPin size={11} />
          {circuit.region}
        </span>

        {/* Durée (bas-droite) */}
        <span className="absolute bottom-2.5 right-2.5 inline-flex items-center gap-1 rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-semibold text-ink backdrop-blur">
          <Clock size={11} className="text-baobab" />
          {circuit.durationDays} {dict.card.days}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-xl font-semibold leading-snug text-ink">
          {t(circuit.title, lang)}
        </h3>

        <p className="mt-2.5 flex-1 text-sm leading-relaxed text-ink-soft">
          <span className="font-semibold text-ink">{dict.detail.highlights}: </span>
          {highlight}
        </p>

        <div className="mt-5 flex items-center justify-between border-t border-sand-200 pt-4">
          <div className="flex items-baseline gap-1">
            <span className="text-xs text-ink-soft">{dict.card.from}</span>
            <span className="font-display text-xl font-semibold text-baobab">
              €{circuit.priceFrom}
            </span>
            <span className="text-xs text-ink-soft">{dict.card.perPerson}</span>
          </div>
          <span className="inline-flex items-center gap-1 text-sm font-semibold text-baobab transition-all group-hover:gap-2">
            {dict.card.details}
            <ArrowRight size={15} />
          </span>
        </div>
      </div>
    </Link>
  );
}
