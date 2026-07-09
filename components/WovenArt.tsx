// ============================================================================
//  WOVEN ART — évoque le tissage malgache (lamba). 100% SVG, aucun réseau.
//  Sert de visuel pour les sections artisanat / textile / philosophie.
// ============================================================================

const BANDS = [
  { h: 46, c: "#bf6a47" },
  { h: 18, c: "#f4ecdf" },
  { h: 30, c: "#4a6b52" },
  { h: 14, c: "#cf9a4e" },
  { h: 52, c: "#9f5233" },
  { h: 20, c: "#efe4d3" },
  { h: 26, c: "#2a2521" },
  { h: 16, c: "#cf9a4e" },
  { h: 40, c: "#3f8f92" },
  { h: 18, c: "#f4ecdf" },
  { h: 48, c: "#bf6a47" },
  { h: 22, c: "#4a6b52" },
  { h: 30, c: "#d89d81" },
  { h: 14, c: "#2a2521" },
  { h: 42, c: "#9f5233" },
];

export default function WovenArt({ className }: { className?: string }) {
  let y = 0;
  const total = BANDS.reduce((s, b) => s + b.h, 0);

  return (
    <svg
      className={className}
      viewBox={`0 0 300 ${total}`}
      preserveAspectRatio="xMidYMid slice"
      role="img"
      aria-hidden="true"
    >
      {/* Bandes horizontales tissées */}
      {BANDS.map((b, i) => {
        const rect = <rect key={i} x="0" y={y} width="300" height={b.h} fill={b.c} />;
        y += b.h;
        return rect;
      })}

      {/* Fils verticaux (chaîne) — texture de tissage */}
      <g opacity="0.12">
        {Array.from({ length: 30 }).map((_, i) => (
          <rect key={i} x={i * 10} y="0" width="4" height={total} fill="#000" />
        ))}
      </g>
      <g opacity="0.10">
        {Array.from({ length: 30 }).map((_, i) => (
          <rect key={i} x={i * 10 + 5} y="0" width="3" height={total} fill="#fff" />
        ))}
      </g>
    </svg>
  );
}
