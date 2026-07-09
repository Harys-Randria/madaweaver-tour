import type { Tone } from "@/lib/circuits";

// ============================================================================
//  SCENERY — illustrations d'ambiance 100% SVG (aucune image externe).
//  Rendu instantané, poids quasi nul, toujours net. Sert de fond aux cartes,
//  héros et détails. Chaque `tone` correspond à un paysage malgache.
// ============================================================================

type Props = {
  tone: Tone;
  className?: string;
  /** Affiche des détails supplémentaires (pour les grands formats). */
  rich?: boolean;
};

const PALETTES: Record<Tone, [string, string, string]> = {
  sunset: ["#f7c15b", "#e07a34", "#7a2f14"],
  forest: ["#bfe6c9", "#3f9a6d", "#123f2e"],
  canyon: ["#f2cf92", "#c56a37", "#6e341b"],
  ocean: ["#8fe6df", "#199ba1", "#0b5860"],
  highland: ["#d3ead0", "#7bb277", "#2f5b40"],
};

/** Silhouette de baobab réutilisable. */
function Baobab({ x, scale = 1, fill }: { x: number; scale?: number; fill: string }) {
  return (
    <g transform={`translate(${x} 500) scale(${scale})`} fill={fill}>
      <path d="M0 0 C-6 -70 -10 -120 -8 -150 C-16 -156 -22 -168 -20 -178 C-14 -172 -10 -170 -6 -172 C-8 -184 -4 -196 2 -202 C4 -194 4 -186 6 -180 C12 -186 20 -186 26 -182 C20 -176 14 -174 8 -174 C10 -166 12 -158 8 -150 C10 -120 8 -70 4 0 Z" />
    </g>
  );
}

export default function Scenery({ tone, className, rich = false }: Props) {
  const [c1, c2, c3] = PALETTES[tone];
  const gid = `sky-${tone}`;

  return (
    <svg
      className={className}
      viewBox="0 0 800 500"
      preserveAspectRatio="xMidYMid slice"
      role="img"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={gid} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={c1} />
          <stop offset="55%" stopColor={c2} />
          <stop offset="100%" stopColor={c3} />
        </linearGradient>
      </defs>

      {/* Ciel */}
      <rect width="800" height="500" fill={`url(#${gid})`} />

      {/* Soleil / lune */}
      {(tone === "sunset" || tone === "ocean" || tone === "canyon") && (
        <circle
          cx="600"
          cy="150"
          r={tone === "sunset" ? 70 : 52}
          fill="#fff"
          opacity="0.85"
        />
      )}

      {tone === "sunset" && (
        <>
          <ellipse cx="400" cy="470" rx="520" ry="90" fill={c3} opacity="0.55" />
          <Baobab x={140} scale={1.15} fill="#3a1508" />
          <Baobab x={250} scale={0.8} fill="#3a1508" />
          <Baobab x={520} scale={1.35} fill="#2c1006" />
          <Baobab x={650} scale={0.95} fill="#3a1508" />
          {rich && <Baobab x={710} scale={0.7} fill="#3a1508" />}
        </>
      )}

      {tone === "forest" && (
        <>
          <path d="M0 380 Q200 300 400 360 T800 340 V500 H0 Z" fill={c2} opacity="0.7" />
          <path d="M0 430 Q250 370 500 420 T800 410 V500 H0 Z" fill={c3} />
          {[120, 300, 470, 640].map((x, i) => (
            <g key={i} fill="#0f3324">
              <rect x={x - 4} y={330} width="8" height="70" />
              <path d={`M${x} 300 l38 60 l-76 0 Z`} />
              <path d={`M${x} 330 l30 46 l-60 0 Z`} />
            </g>
          ))}
        </>
      )}

      {tone === "canyon" && (
        <>
          <path
            d="M0 500 V300 l40 -40 l30 60 l50 -120 l40 90 l60 -70 l50 110 l70 -140 l50 120 l60 -50 l50 90 l70 -100 l40 80 l70 -60 V500 Z"
            fill={c3}
            opacity="0.9"
          />
          <path
            d="M0 500 V380 l60 -50 l50 70 l70 -90 l60 80 l80 -60 l70 90 l90 -70 l70 80 l60 -40 l60 70 V500 Z"
            fill="#4a2413"
          />
        </>
      )}

      {tone === "ocean" && (
        <>
          <path d="M0 340 Q200 300 400 330 T800 320 V500 H0 Z" fill="#0d7d84" opacity="0.6" />
          <ellipse cx="200" cy="360" rx="120" ry="30" fill="#e8d8a8" />
          <g fill="#0f3f2e">
            <rect x="196" y="300" width="8" height="60" />
            <path d="M200 300 q-40 -20 -60 -6 q34 -6 60 14 q26 -20 60 -14 q-20 -14 -60 6 Z" />
          </g>
          <path d="M0 420 Q400 380 800 420 V500 H0 Z" fill={c3} />
          <path d="M0 460 Q400 430 800 460 V500 H0 Z" fill="#0a4750" opacity="0.7" />
        </>
      )}

      {tone === "highland" && (
        <>
          {[300, 350, 400, 450].map((y, i) => (
            <path
              key={i}
              d={`M0 ${y} Q400 ${y - 40} 800 ${y} V500 H0 Z`}
              fill={i % 2 ? c2 : c3}
              opacity={0.6 + i * 0.12}
            />
          ))}
          {rich &&
            [180, 400, 600].map((x, i) => (
              <path key={i} d={`M${x} 500 V${420 - i * 10} h4 V500 Z`} fill="#2f5b40" opacity="0.5" />
            ))}
        </>
      )}

      {/* Voile de lumière pour la lisibilité du texte superposé */}
      <rect width="800" height="500" fill="url(#veil)" />
      <defs>
        <linearGradient id="veil" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#000" stopOpacity="0" />
          <stop offset="100%" stopColor="#000" stopOpacity="0.28" />
        </linearGradient>
      </defs>
    </svg>
  );
}
