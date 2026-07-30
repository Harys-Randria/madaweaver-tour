// ============================================================================
//  MONOGRAM — avatar « initiales » élégant, 100% déterministe (aucune image).
//  Sert de placeholder soigné pour l'équipe et les avis en attendant de vraies
//  photos. Remplacez par <Image …> le jour où les portraits sont disponibles.
// ============================================================================

const TONES = [
  "bg-baobab/12 text-baobab",
  "bg-jungle/12 text-jungle",
  "bg-ocean/12 text-ocean",
  "bg-gold/15 text-baobab-dark",
];

function initials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("");
}

export default function Monogram({
  name,
  size = 48,
  className = "",
}: {
  name: string;
  size?: number;
  className?: string;
}) {
  // Choix de couleur stable, dérivé du nom (pas d'aléatoire → SSR sûr).
  const sum = Array.from(name).reduce((a, c) => a + c.charCodeAt(0), 0);
  const tone = TONES[sum % TONES.length];

  return (
    <span
      aria-hidden="true"
      className={`inline-flex shrink-0 items-center justify-center rounded-full font-display font-semibold ${tone} ${className}`}
      style={{ width: size, height: size, fontSize: size * 0.4 }}
    >
      {initials(name)}
    </span>
  );
}
