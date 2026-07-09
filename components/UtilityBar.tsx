import Link from "next/link";
import { ArrowDown } from "lucide-react";
import type { Locale } from "@/lib/i18n";
import type { Dictionary } from "@/lib/dictionaries";
import { site } from "@/lib/site";

// Bandeau sombre signature sous le héros : indicateur de défilement + liens
// rapides + réseaux + contact. Reproduit la maquette Madaweaver.
export default function UtilityBar({
  lang,
  dict,
  scrollTarget = "#content",
}: {
  lang: Locale;
  dict: Dictionary;
  scrollTarget?: string;
}) {
  const u = dict.landing.utility;
  const links = [
    { label: u.gallery, href: `/${lang}/gallery` },
    { label: u.videos, href: `/${lang}/gallery#videos` },
    { label: u.explore, href: `/${lang}/circuits` },
    { label: u.book, href: `/${lang}/contact` },
  ];

  return (
    <div className="flex items-stretch overflow-hidden rounded-b-xl bg-charcoal text-cream/80">
      {/* Indicateur de défilement */}
      <a
        href={scrollTarget}
        aria-label="Scroll"
        className="flex w-14 shrink-0 items-center justify-center bg-baobab text-white transition-colors hover:bg-baobab-dark sm:w-16"
      >
        <ArrowDown size={20} />
      </a>

      <div className="flex flex-1 flex-wrap items-center gap-x-6 gap-y-1 px-5 py-3">
        <nav className="flex flex-wrap items-center gap-x-5 text-sm">
          {links.map((l, i) => (
            <Link
              key={i}
              href={l.href}
              className="lowercase tracking-wide text-cream/75 transition-colors hover:text-white"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 text-xs font-semibold uppercase tracking-widest text-cream/50 md:flex">
          <a href={site.social.instagram} className="hover:text-white">ig</a>
          <a href={site.social.facebook} className="hover:text-white">fb</a>
        </div>

        <div className="ml-auto hidden text-right text-xs leading-snug text-cream/60 sm:block">
          <a href={`mailto:${site.contact.email}`} className="block hover:text-white">
            {site.contact.email}
          </a>
          <span>{site.contact.phoneDisplay}</span>
        </div>
      </div>
    </div>
  );
}
