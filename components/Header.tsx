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
    { href: `/${lang}`, label: dict.nav.home },
    { href: `/${lang}/circuits`, label: dict.nav.circuits },
    { href: `/${lang}/sur-mesure`, label: dict.nav.custom },
    { href: `/${lang}/gallery`, label: dict.nav.gallery },
    { href: `/${lang}/about`, label: dict.nav.about },
    { href: `/${lang}/contact`, label: dict.nav.contact },
  ];

  const isActive = (href: string) =>
    href === `/${lang}` ? pathname === href : pathname.startsWith(href);

  const other: Locale = lang === "en" ? "fr" : "en";
  const otherPath = pathname.replace(new RegExp(`^/${lang}`), `/${other}`);

  return (
    <header
      className={`sticky top-0 z-50 bg-cream/95 backdrop-blur transition-shadow duration-300 ${
        scrolled ? "shadow-[0_1px_0_rgba(44,38,33,0.10)]" : ""
      }`}
    >
      <nav className="container-x flex h-16 items-center justify-between md:h-18">
        <Link href={`/${lang}`} aria-label={dict.nav.home}>
          <Logo />
        </Link>

        {/* Desktop nav — capitales espacées */}
        <div className="hidden items-center gap-6 md:flex lg:gap-8">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`text-xs font-semibold uppercase tracking-[0.16em] transition-colors ${
                isActive(l.href) ? "text-baobab" : "text-ink/70 hover:text-ink"
              }`}
            >
              {l.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-1.5">
          <Link
            href={`/${lang}/circuits`}
            aria-label="Search tours"
            className="flex h-9 w-9 items-center justify-center rounded-full text-ink/70 transition-colors hover:bg-sand-100 hover:text-ink"
          >
            <Search size={18} />
          </Link>

          <Link
            href={otherPath}
            className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-ink/70 transition-colors hover:bg-sand-100 hover:text-baobab"
            aria-label={`Switch language to ${other.toUpperCase()}`}
          >
            <Globe size={15} />
            {dict.common.langLabel}
          </Link>

          <Link
            href={`/${lang}/sur-mesure`}
            className="ml-1 hidden rounded-full bg-baobab px-5 py-2 text-xs font-semibold uppercase tracking-wider text-white transition-colors hover:bg-baobab-dark sm:inline-flex"
          >
            {dict.nav.quote}
          </Link>

          <button
            onClick={() => setOpen((v) => !v)}
            className="flex h-9 w-9 items-center justify-center rounded-full text-ink hover:bg-sand-100 md:hidden"
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
