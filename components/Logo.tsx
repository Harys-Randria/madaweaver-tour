// Marque Madaweaver — emblème (baobab + maki catta) + nom.
// L'emblème est posé sur un médaillon cream : invisible sur fond clair,
// il fait ressortir le logo proprement sur les fonds sombres (hero, footer).
export default function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <span className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-full bg-cream sm:h-10 sm:w-10">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/logo.webp"
          alt="Madaweaver Tour"
          width={40}
          height={40}
          decoding="async"
          className="h-full w-full object-contain"
        />
      </span>
      <span className="font-display text-xl font-bold tracking-tight">
        Mada<span className="text-baobab">weaver</span>
      </span>
    </span>
  );
}
