"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Locale } from "@/lib/i18n";
import type { Dictionary } from "@/lib/dictionaries";
import type { MacroRegion } from "@/lib/circuits";

// Silhouette réelle de Madagascar (GeoJSON Natural Earth simplifié, projeté).
const ISLAND =
  "M167.3 28.8 L173.6 39.4 L179.4 56 L183.3 86.2 L189.4 97.9 L187.1 109.9 L182.9 117.3 L174.8 102.6 L170.3 110 L174.9 128.6 L172.8 139.2 L166.2 145 L164.7 166.2 L155.4 195.5 L143.7 230 L129 277.5 L119.9 312.4 L109.2 341.5 L89.9 347.4 L69.2 358 L55.5 351.6 L36.6 342.6 L30.1 329.4 L28.5 307.2 L20.2 287.2 L18 269.1 L22.3 251.1 L33.2 246.7 L33.2 238.4 L44.6 219.4 L46.7 203.4 L41.2 191.5 L36.7 175.7 L34.8 152.6 L43.1 138.6 L46.3 122.7 L58.1 121.8 L71.4 116.6 L80.2 112.1 L90.6 111.8 L104.1 97.5 L123.6 82 L130.8 69.4 L127.5 58.7 L137.6 61.7 L150.7 44.3 L151.1 29.2 L159 18 L167.3 28.8 Z";

const DOTS: { key: MacroRegion; x: number; y: number; labelDx: number }[] = [
  { key: "north", x: 152, y: 47, labelDx: -14 },
  { key: "east", x: 159, y: 172, labelDx: 14 },
  { key: "highlands", x: 119, y: 190, labelDx: 14 },
  { key: "west", x: 43, y: 225, labelDx: -14 },
  { key: "south", x: 48, y: 298, labelDx: -14 },
];

// Vraie photo représentative par région (couverture d'un circuit de la région).
const REGION_PHOTO: Record<MacroRegion, string> = {
  north: "/images/northern-wonders-12d-1.webp",
  east: "/images/andasibe-rainforest-2d-1.webp",
  highlands: "/images/madagascar-road-trip-10d-1.webp",
  west: "/images/baobabs-tsingy-rainforest-9d-1.webp",
  south: "/images/ultimate-trekking-22d-1.webp",
};

export default function MadagascarMap({
  lang,
  dict,
  regionCounts,
}: {
  lang: Locale;
  dict: Dictionary;
  regionCounts?: Record<string, number>;
}) {
  const l = dict.landing;
  const [active, setActive] = useState<MacroRegion>("highlands");
  const count = regionCounts?.[active];

  return (
    <div className="grid items-center gap-10 md:grid-cols-2">
      {/* Carte */}
      <div className="relative mx-auto w-full max-w-sm">
        <svg viewBox="0 0 208 376" className="w-full overflow-visible" role="img" aria-label="Madagascar">
          <defs>
            <linearGradient id="island" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#dca878" />
              <stop offset="55%" stopColor="#c47a4e" />
              <stop offset="100%" stopColor="#a85535" />
            </linearGradient>
            <filter id="islandShadow" x="-25%" y="-25%" width="150%" height="150%">
              <feDropShadow dx="0" dy="6" stdDeviation="7" floodColor="#000" floodOpacity="0.5" />
            </filter>
            <pattern id="ocean" width="15" height="15" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1" fill="#3f8f92" fillOpacity="0.28" />
            </pattern>
          </defs>

          {/* Trame « océan » subtile */}
          <rect x="0" y="0" width="208" height="376" fill="url(#ocean)" />

          <path
            d={ISLAND}
            fill="url(#island)"
            stroke="#cf9a4e"
            strokeWidth="1.5"
            strokeOpacity="0.6"
            filter="url(#islandShadow)"
          />

          {DOTS.map((d) => {
            const isActive = d.key === active;
            const anchor = d.labelDx > 0 ? "start" : "end";
            return (
              <g
                key={d.key}
                className="cursor-pointer outline-none"
                onClick={() => setActive(d.key)}
                onMouseEnter={() => setActive(d.key)}
                onFocus={() => setActive(d.key)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setActive(d.key);
                  }
                }}
                tabIndex={0}
                role="button"
                aria-pressed={isActive}
                aria-label={l.regions[d.key]}
              >
                <circle cx={d.x} cy={d.y} r="16" fill="transparent" />
                {isActive && (
                  <>
                    <circle cx={d.x} cy={d.y} r="14" fill="none" stroke="#cf9a4e" strokeOpacity="0.4" strokeWidth="1.5" />
                    <circle cx={d.x} cy={d.y} r="11" fill="#cf9a4e" fillOpacity="0.28" />
                  </>
                )}
                <circle
                  cx={d.x}
                  cy={d.y}
                  r={isActive ? 6.5 : 4.5}
                  fill={isActive ? "#e6b45a" : "#c47a4e"}
                  stroke="#fffdf8"
                  strokeWidth="2"
                />
                <text
                  x={d.x + d.labelDx}
                  y={d.y + 4}
                  textAnchor={anchor}
                  className="fill-cream font-sans"
                  style={{ fontSize: 12, fontWeight: isActive ? 700 : 500 }}
                >
                  {l.regions[d.key]}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Fiche région active */}
      <div className="mx-auto w-full max-w-sm overflow-hidden rounded-2xl bg-paper shadow-xl ring-1 ring-black/10">
        <div className="relative aspect-16/10">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={REGION_PHOTO[active]}
            alt={l.regions[active]}
            loading="lazy"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/10 to-transparent" />
          <span className="absolute bottom-3 left-4 font-display text-2xl font-semibold text-white drop-shadow">
            {l.regions[active]}
          </span>
          {typeof count === "number" && (
            <span className="absolute right-3 top-3 rounded-full bg-baobab px-3 py-1 text-xs font-semibold text-white shadow">
              {count} {dict.circuitsPage.results}
            </span>
          )}
        </div>
        <div className="p-5">
          <p className="text-sm leading-relaxed text-ink-soft">{l.regionDesc[active]}</p>
          <Link
            href={`/${lang}/circuits?region=${active}`}
            className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-baobab px-4 py-2 text-xs font-semibold text-white transition-all hover:gap-2.5 hover:bg-baobab-dark"
          >
            {dict.featured.viewAll}
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </div>
  );
}
