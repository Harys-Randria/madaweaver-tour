import Link from "next/link";
import type { Locale } from "@/lib/i18n";
import type { Dictionary } from "@/lib/dictionaries";
import { site } from "@/lib/site";
import Logo from "./Logo";

const SOCIALS = [
  {
    name: "facebook",
    path: "M14 13.5h2.5l1-4H14v-2c0-1.03 0-2 2-2h1.5V2.14c-.33-.04-1.57-.14-2.88-.14C11.9 2 10 3.66 10 6.7v2.8H7v4h3V22h4v-8.5z",
  },
  {
    name: "x",
    path: "M17.9 3h2.8l-6.1 7 7.2 9.5h-5.6l-4.4-5.8L6.9 19.5H4l6.5-7.5L3.6 3h5.7l4 5.3L17.9 3zm-1 15h1.5L8.1 4.6H6.5L16.9 18z",
  },
  {
    name: "instagram",
    path: "M12 2c2.72 0 3.06.01 4.12.06 1.07.05 1.8.22 2.43.47.66.25 1.22.6 1.77 1.15.55.55.9 1.11 1.15 1.77.25.63.42 1.36.47 2.43C21.99 8.94 22 9.28 22 12s-.01 3.06-.06 4.12c-.05 1.07-.22 1.8-.47 2.43-.25.66-.6 1.22-1.15 1.77-.55.55-1.11.9-1.77 1.15-.63.25-1.36.42-2.43.47-1.06.05-1.4.06-4.12.06s-3.06-.01-4.12-.06c-1.07-.05-1.8-.22-2.43-.47a4.9 4.9 0 0 1-1.77-1.15 4.9 4.9 0 0 1-1.15-1.77c-.25-.63-.42-1.36-.47-2.43C2.01 15.06 2 14.72 2 12s.01-3.06.06-4.12c.05-1.07.22-1.8.47-2.43.25-.66.6-1.22 1.15-1.77.55-.55 1.11-.9 1.77-1.15.63-.25 1.36-.42 2.43-.47C8.94 2.01 9.28 2 12 2zm0 5a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm0 8.2a3.2 3.2 0 1 1 0-6.4 3.2 3.2 0 0 1 0 6.4zM17.4 5.4a1.2 1.2 0 1 0 0 2.4 1.2 1.2 0 0 0 0-2.4z",
  },
  {
    name: "youtube",
    path: "M21.6 7.2s-.2-1.37-.8-1.97c-.76-.8-1.6-.8-2-.85C15.98 4.1 12 4.1 12 4.1h-.01s-3.98 0-6.8.28c-.4.05-1.24.05-2 .85-.6.6-.8 1.97-.8 1.97S2.2 8.8 2.2 10.4v1.5c0 1.6.2 3.2.2 3.2s.2 1.37.8 1.97c.76.8 1.76.77 2.2.86 1.6.15 6.6.2 6.6.2s3.98-.01 6.8-.29c.4-.05 1.24-.05 2-.85.6-.6.8-1.97.8-1.97s.2-1.6.2-3.2v-1.5c0-1.6-.2-3.2-.2-3.2zM9.9 14.6V8.8l5.15 2.9-5.15 2.9z",
  },
];

export default function Footer({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  const year = 2024;
  const links = [
    { href: `/${lang}`, label: dict.nav.home },
    { href: `/${lang}/circuits`, label: dict.nav.circuits },
    { href: `/${lang}/destinations`, label: dict.nav.destinations },
    { href: `/${lang}/gallery`, label: dict.nav.gallery },
    { href: `/${lang}/about`, label: dict.nav.about },
    { href: `/${lang}/contact`, label: dict.nav.contact },
  ];

  return (
    <footer className="grain relative overflow-hidden border-t-4 border-baobab bg-cocoa text-cream/80">
      <div className="container-x relative z-10 grid gap-10 py-16 md:grid-cols-[1.4fr_1fr_1fr] md:gap-14">
        {/* Marque */}
        <div className="max-w-sm">
          <Logo className="[&_span]:text-cream" />
          <p className="mt-5 font-display text-lg italic leading-snug text-cream/90">
            {site.tagline[lang]}
          </p>
          <p className="mt-3 text-sm leading-relaxed text-cream/55">{dict.footer.aboutText}</p>
          <div className="mt-5 flex gap-2.5">
            {SOCIALS.map((s) => (
              <a
                key={s.name}
                href={site.social.facebook}
                aria-label={s.name}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-cream/10 text-cream transition-colors hover:bg-baobab"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d={s.path} />
                </svg>
              </a>
            ))}
          </div>
        </div>

        {/* Contacts */}
        <div>
          <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-cream/45">
            {dict.footer.contact}
          </h3>
          <ul className="mt-4 space-y-2.5 text-sm text-cream/70">
            <li>
              <a href={`mailto:${site.contact.email}`} className="hover:text-baobab-light">
                {site.contact.email}
              </a>
            </li>
            <li>{site.contact.phoneDisplay}</li>
            <li className="text-cream/55">{site.contact.address}</li>
          </ul>
        </div>

        {/* Explorer */}
        <div>
          <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-cream/45">
            {dict.footer.explore}
          </h3>
          <ul className="mt-4 space-y-2.5 text-sm">
            {links.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-cream/70 transition-colors hover:text-baobab-light">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="relative z-10 border-t border-cream/10">
        <div className="container-x flex flex-col items-center justify-between gap-2 py-5 text-xs text-cream/45 sm:flex-row">
          <p>© {year} {site.name}. {dict.footer.rights}</p>
          <p>{dict.footer.madeWith}</p>
        </div>
      </div>
    </footer>
  );
}
