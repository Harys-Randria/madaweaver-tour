"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Locale } from "@/lib/i18n";
import type { Dictionary } from "@/lib/dictionaries";
import type { Tone } from "@/lib/circuits";
import Scenery from "./Scenery";

type RegionKey = "north" | "highlands" | "west" | "east" | "south";

const DOTS: { key: RegionKey; x: number; y: number; tone: Tone; labelDx: number }[] = [
  { key: "north", x: 120, y: 82, tone: "ocean", labelDx: 15 },
  { key: "west", x: 70, y: 178, tone: "sunset", labelDx: -15 },
  { key: "highlands", x: 112, y: 212, tone: "highland", labelDx: 15 },
  { key: "east", x: 152, y: 246, tone: "forest", labelDx: 15 },
  { key: "south", x: 112, y: 344, tone: "canyon", labelDx: -15 },
];

const ISLAND =
  "M120 20 C140 34 152 68 156 108 C162 150 166 200 158 250 C152 300 140 346 114 376 C106 384 96 382 92 370 C80 340 70 302 66 264 C56 226 44 196 50 165 C56 130 66 100 80 78 C90 60 102 38 112 26 C114 22 117 20 120 20 Z";

export default function MadagascarMap({
  lang,
  dict,
}: {
  lang: Locale;
  dict: Dictionary;
}) {
  const l = dict.landing;
  const [active, setActive] = useState<RegionKey>("highlands");
  const activeDot = DOTS.find((d) => d.key === active)!;

  return (
    <div className="grid items-center gap-10 md:grid-cols-2">
      {/* Carte */}
      <div className="relative mx-auto w-full max-w-sm">
        <svg viewBox="0 0 220 400" className="w-full" role="img" aria-label="Madagascar">
          <defs>
            <linearGradient id="island" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#e5d6bd" />
              <stop offset="100%" stopColor="#d6c2a1" />
            </linearGradient>
          </defs>
          <path d={ISLAND} fill="url(#island)" stroke="#bf6a47" strokeWidth="1.5" strokeOpacity="0.5" />

          {DOTS.map((d) => {
            const isActive = d.key === active;
            const anchor = d.labelDx > 0 ? "start" : "end";
            return (
              <g
                key={d.key}
                className="cursor-pointer"
                onMouseEnter={() => setActive(d.key)}
                onFocus={() => setActive(d.key)}
                tabIndex={0}
                role="button"
                aria-label={l.regions[d.key]}
              >
                {isActive && (
                  <circle cx={d.x} cy={d.y} r="11" fill="#bf6a47" fillOpacity="0.25" />
                )}
                <circle
                  cx={d.x}
                  cy={d.y}
                  r={isActive ? 6 : 4.5}
                  fill={isActive ? "#9f5233" : "#bf6a47"}
                  stroke="#fffdf8"
                  strokeWidth="2"
                />
                <text
                  x={d.x + d.labelDx}
                  y={d.y + 4}
                  textAnchor={anchor}
                  className="fill-ink font-sans"
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
      <div className="mx-auto w-full max-w-sm overflow-hidden rounded-2xl bg-paper shadow-lg ring-1 ring-ink/8">
        <div className="relative aspect-16/10">
          <Scenery tone={activeDot.tone} className="absolute inset-0 h-full w-full object-cover" />
          <span className="absolute bottom-3 left-4 font-display text-2xl font-semibold text-white drop-shadow">
            {l.regions[active]}
          </span>
        </div>
        <div className="flex items-center justify-between p-5">
          <p className="text-sm text-ink-soft">{l.mapSubtitle}</p>
          <Link
            href={`/${lang}/circuits`}
            className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-baobab px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-baobab-dark"
          >
            {dict.featured.viewAll}
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </div>
  );
}
