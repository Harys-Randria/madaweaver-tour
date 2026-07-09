import Link from "next/link";
import { Clock, MapPin } from "lucide-react";
import type { Circuit } from "@/lib/circuits";
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
      className="group flex flex-col overflow-hidden rounded-2xl bg-paper ring-1 ring-ink/8 transition-all duration-300 hover:-translate-y-1 hover:ring-baobab/30"
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
        <span className="absolute bottom-2.5 left-2.5 inline-flex items-center gap-1 rounded-full bg-charcoal/70 px-2.5 py-1 text-[11px] font-medium text-cream backdrop-blur">
          <MapPin size={11} />
          {circuit.region}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-xl font-semibold leading-snug text-ink">
          {t(circuit.title, lang)}
        </h3>

        <div className="mt-2 flex items-center gap-1.5 text-sm text-ink-soft">
          <Clock size={14} className="text-baobab" />
          {circuit.durationDays} {dict.card.days}
        </div>

        <p className="mt-3 text-sm leading-relaxed text-ink-soft">
          <span className="font-semibold text-ink">{dict.detail.highlights}: </span>
          {highlight}
        </p>

        <span className="mt-5 inline-flex items-center justify-center rounded-lg bg-baobab px-4 py-2.5 text-sm font-semibold text-white transition-colors group-hover:bg-baobab-dark">
          {dict.card.details}
        </span>
      </div>
    </Link>
  );
}
