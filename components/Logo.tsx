// Marque Madaweaver — petit baobab stylisé + nom. 100% SVG.
export default function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <svg width="30" height="30" viewBox="0 0 40 40" aria-hidden="true">
        <circle cx="20" cy="20" r="20" fill="var(--color-baobab)" />
        <g fill="var(--color-cream)">
          <path d="M19 32 C18 24 17 18 18 14 C16 13 14 11 15 9 C16 10 17 10 18 9 C17 6 19 3 21 2 C21 4 21 6 22 8 C24 6 27 6 29 8 C27 10 25 10 23 9 C24 12 24 15 22 16 C23 20 22 26 21 32 Z" />
        </g>
      </svg>
      <span className="font-display text-lg font-semibold tracking-tight">
        Mada<span className="text-baobab">weaver</span>
      </span>
    </span>
  );
}
