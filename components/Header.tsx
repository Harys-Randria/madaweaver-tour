"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Menu, X, Globe, Search } from "lucide-react";
import type { Locale } from "@/lib/i18n";
import type { Dictionary } from "@/lib/dictionaries";
import Logo from "./Logo";

export default function Header({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  const links = [
    { href: `/${lang}/circuits`, label: dict.nav.circuits },
    { href: `/${lang}/destinations`, label: dict.nav.destinations },
    { href: `/${lang}/gallery`, label: dict.nav.gallery },
    { href: `/${lang}/about`, label: dict.nav.about },
    { href: `/${lang}/contact`, label: dict.nav.contact },
  ];

  const isActive = (href: string) =>
    href === `/${lang}` ? pathname === href : pathname.startsWith(href);

  const other: Locale = lang === "en" ? "fr" : "en";
  const otherPath = pathname.replace(new RegExp(`^/${lang}`), `/${other}`);

  // Header transparent posé sur le hero de l'accueil (en haut, menu fermé),
  // puis solide dès qu'on défile ou sur toute autre page.
  const isHome = pathname === `/${lang}`;
  const transparent = isHome && !scrolled && !open;

  const navLink = (active: boolean) =>
    transparent
      ? active
        ? "text-white"
        : "text-white/75 hover:text-white"
      : active
        ? "text-baobab"
        : "text-ink/70 hover:text-ink";

  const iconBtn = transparent
    ? "text-white/85 hover:bg-white/10 hover:text-white"
    : "text-ink/70 hover:bg-sand-100 hover:text-ink";

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        transparent
          ? "border-b border-white/15 bg-black/20 backdrop-blur-md"
          : "bg-cream/85 backdrop-blur-md"
      } ${scrolled && !transparent ? "shadow-[0_1px_0_rgba(44,38,33,0.10)]" : ""}`}
    >
      <nav className="container-x flex h-16 items-center justify-between md:h-18">
        <Link href={`/${lang}`} aria-label={dict.nav.home}>
          <Logo className={transparent ? "[&_span]:text-cream" : ""} />
        </Link>

        {/* Desktop nav — capitales espacées */}
        <div className="hidden items-center gap-6 md:flex lg:gap-8">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`text-xs font-semibold uppercase tracking-[0.16em] transition-colors ${navLink(
                isActive(l.href),
              )}`}
            >
              {l.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-1.5">
          <Link
            href={`/${lang}/circuits`}
            aria-label="Search tours"
            className={`flex h-9 w-9 items-center justify-center rounded-full transition-colors ${iconBtn}`}
          >
            <Search size={18} />
          </Link>

          <Link
            href={otherPath}
            onClick={() => {
              document.cookie = `NEXT_LOCALE=${other};path=/;max-age=31536000;samesite=lax`;
            }}
            className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1.5 text-xs font-semibold uppercase tracking-wider transition-colors ${iconBtn}`}
            aria-label={`Switch language to ${other.toUpperCase()}`}
          >
            <Globe size={15} />
            {dict.common.langLabel}
          </Link>

          <Link
            href={`/${lang}/sur-mesure`}
            className="ml-1 hidden rounded-full bg-baobab px-5 py-2 text-xs font-semibold uppercase tracking-wider text-white shadow-sm transition-colors hover:bg-baobab-dark sm:inline-flex"
          >
            {dict.nav.quote}
          </Link>

          <button
            onClick={() => setOpen((v) => !v)}
            className={`flex h-9 w-9 items-center justify-center rounded-full transition-colors md:hidden ${
              transparent ? "text-white hover:bg-white/10" : "text-ink hover:bg-sand-100"
            }`}
            aria-label="Menu"
            aria-expanded={open}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="border-t border-sand-200 bg-cream md:hidden">
          <div className="container-x flex flex-col py-3">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={`py-3 text-sm font-semibold uppercase tracking-wider ${
                  isActive(l.href) ? "text-baobab" : "text-ink"
                }`}
              >
                {l.label}
              </Link>
            ))}
            <Link
              href={`/${lang}/sur-mesure`}
              className="mt-2 inline-flex justify-center rounded-full bg-baobab px-5 py-3 text-xs font-semibold uppercase tracking-wider text-white"
            >
              {dict.nav.quote}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
