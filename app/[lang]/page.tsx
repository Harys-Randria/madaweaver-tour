import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Star, MessageCircle, BadgeCheck } from "lucide-react";
import { isLocale, type Locale } from "@/lib/i18n";
import { getDictionary } from "@/lib/dictionaries";
import { getFeatured, getAllCircuits } from "@/lib/data";
import { whatsappLink } from "@/lib/site";

export const revalidate = 30;
import Reveal from "@/components/Reveal";
import CircuitCard from "@/components/CircuitCard";
import UtilityBar from "@/components/UtilityBar";
import MadagascarMap from "@/components/MadagascarMap";
import ContactForm from "@/components/ContactForm";
import TrustBand from "@/components/TrustBand";
import Reassurance from "@/components/Reassurance";
import Monogram from "@/components/Monogram";

export default async function HomePage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const locale = lang as Locale;
  const dict = getDictionary(locale);
  const l = dict.landing;
  const featured = await getFeatured();

  // Nombre de circuits par grande région (pour la carte interactive).
  const allCircuits = await getAllCircuits();
  const regionCounts: Record<string, number> = {
    north: 0,
    highlands: 0,
    west: 0,
    east: 0,
    south: 0,
  };
  allCircuits.forEach((c) =>
    (c.macroRegions ?? []).forEach((r) => {
      regionCounts[r] = (regionCounts[r] ?? 0) + 1;
    }),
  );

  return (
    <>
      {/* ===================================================== HERO plein cadre */}
      {/* -mt = hauteur du header, pour qu'il se pose (transparent) sur l'image */}
      <section className="relative -mt-16 flex min-h-[100dvh] flex-col bg-forest md:-mt-18">
        <div className="relative flex flex-1 items-center overflow-hidden">
          {/* Fond : placeholder SVG — remplaçable par une vraie photo/vidéo en une ligne */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/baobab1.webp"
            alt=""
            fetchPriority="high"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-b from-black/40 via-black/25 to-black/85" />
          <div className="absolute inset-0 bg-linear-to-r from-black/55 via-black/10 to-transparent" />

          <div className="container-x relative py-20 text-white">
            <Reveal>
              <div className="max-w-2xl">
                <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-white ring-1 ring-white/25 backdrop-blur">
                  <span className="badge-dot" />
                  {dict.hero.welcome}
                </span>
                <h1 className="mt-5 font-display text-5xl font-bold leading-[0.95] tracking-tight drop-shadow-md sm:text-7xl lg:text-8xl">
                  {dict.hero.title}
                </h1>
                <p className="mt-6 max-w-xl text-base leading-relaxed text-white/90 sm:text-lg">
                  {dict.hero.subtitle}
                </p>

                <div className="mt-8 flex flex-wrap items-center gap-3">
                  <Link
                    href={`/${locale}/sur-mesure`}
                    className="inline-flex items-center gap-2 rounded-full bg-baobab px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-black/25 transition hover:bg-baobab-dark"
                  >
                    {dict.hero.ctaDesign}
                    <ArrowRight size={16} />
                  </Link>
                  <Link
                    href={`/${locale}/circuits`}
                    className="inline-flex items-center gap-2 rounded-full bg-white/10 px-6 py-3.5 text-sm font-semibold text-white ring-1 ring-white/40 backdrop-blur transition hover:bg-white/20"
                  >
                    {dict.hero.ctaBrowse}
                  </Link>
                </div>

                <dl className="mt-10 inline-flex flex-wrap items-center gap-x-7 gap-y-4 rounded-2xl bg-black/30 px-6 py-4 ring-1 ring-white/15 backdrop-blur-sm">
                  {[
                    { n: "120+", l: dict.hero.stat1 },
                    { n: "2 500+", l: dict.hero.stat2 },
                    { n: "10+", l: dict.hero.stat3 },
                  ].map((s, i) => (
                    <div
                      key={s.l}
                      className={i > 0 ? "border-l border-white/15 pl-7" : ""}
                    >
                      <dt className="font-display text-3xl font-semibold text-gold sm:text-4xl">
                        {s.n}
                      </dt>
                      <dd className="mt-0.5 text-xs uppercase tracking-wider text-white/75">
                        {s.l}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            </Reveal>
          </div>
        </div>

        {/* Barre utilitaire ancrée en bas du hero (accès rapides + défilement) */}
        <div className="container-x relative z-10 pb-4">
          <UtilityBar lang={locale} dict={dict} scrollTarget="#content" />
        </div>
      </section>

      {/* ============================================ POURQUOI NOUS (confiance) */}
      <TrustBand dict={dict} />

      {/* ============================================ NOTRE PHILOSOPHIE */}
      <section id="content" className="container-x scroll-mt-24 py-20 sm:py-28">
        <div className="grid items-center gap-10 md:grid-cols-2 md:gap-16">
          <Reveal>
            <div className="max-w-md">
              <span className="lamba-mark" />
              <h2 className="mt-3 font-display text-4xl font-semibold text-ink sm:text-5xl">
                {l.philosophyTitle}
              </h2>
              <p className="mt-5 leading-relaxed text-ink-soft">{l.philosophyBody}</p>
              <Link href={`/${locale}/about`} className="link-more mt-6">
                {l.learnMore}
                <ArrowRight size={15} />
              </Link>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="relative aspect-4/3 overflow-hidden rounded-2xl shadow-lg ring-1 ring-ink/8">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/philosophy.webp"
                alt={l.philosophyTitle}
                loading="lazy"
                decoding="async"
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============================================ CIRCUITS PHARES */}
      <section className="bg-cream-2 py-20 sm:py-24">
        <div className="container-x">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <Reveal>
              <div>
                <p className="eyebrow">{dict.featured.subtitle}</p>
                <h2 className="mt-2 font-display text-4xl font-semibold text-ink sm:text-5xl">
                  {dict.featured.title}
                </h2>
              </div>
            </Reveal>
            <Link
              href={`/${locale}/circuits`}
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-baobab transition-all hover:gap-2.5"
            >
              {dict.featured.viewAll}
              <ArrowRight size={16} />
            </Link>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featured.slice(0, 3).map((c, i) => (
              <Reveal key={c.slug} delay={i * 0.06} as="div">
                <CircuitCard circuit={c} lang={locale} dict={dict} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================ CARTE INTERACTIVE */}
      <section className="grain relative overflow-hidden bg-charcoal text-cream">
        <div className="container-x relative z-10 py-20 sm:py-28">
          <Reveal>
            <span className="lamba-mark" />
            <h2 className="mt-3 font-display text-4xl font-semibold sm:text-5xl">{l.mapTitle}</h2>
            <p className="mt-2 text-cream/70">{l.mapSubtitle}</p>
          </Reveal>
          <div className="mt-12">
            <MadagascarMap lang={locale} dict={dict} regionCounts={regionCounts} />
          </div>
        </div>
      </section>

      {/* ============================================ TÉMOIGNAGES */}
      <section className="grain lamba-surface relative overflow-hidden bg-cream-2 py-20 sm:py-24">
        <div className="container-x relative z-10">
          <Reveal>
            <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <span className="lamba-mark" />
                <h2 className="mt-3 font-display text-4xl font-semibold text-ink sm:text-5xl">
                  {dict.testimonials.title}
                </h2>
                <p className="mt-2 text-ink-soft">{dict.testimonials.subtitle}</p>
              </div>
              <div className="inline-flex items-center gap-3.5 self-start rounded-2xl bg-paper px-5 py-3 shadow-sm ring-1 ring-ink/8 sm:self-auto">
                <div className="flex gap-0.5 text-gold">
                  {Array.from({ length: 5 }).map((_, s) => (
                    <Star key={s} size={17} fill="currentColor" />
                  ))}
                </div>
                <div className="leading-tight">
                  <div className="font-display text-2xl font-semibold text-ink">
                    {dict.testimonials.rating}
                  </div>
                  <div className="text-xs text-ink-soft">{dict.testimonials.count}</div>
                </div>
              </div>
            </div>
          </Reveal>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {dict.testimonials.items.map((tm, i) => (
              <Reveal key={tm.author} delay={i * 0.1} as="div">
                <figure className="lamba-top relative flex h-full flex-col rounded-2xl bg-paper p-7 pt-8 shadow-sm ring-1 ring-ink/8 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                  <span className="pointer-events-none absolute right-5 top-4 select-none font-display text-7xl leading-none text-baobab/10">
                    ”
                  </span>
                  <div className="relative flex gap-0.5 text-gold">
                    {Array.from({ length: 5 }).map((_, s) => (
                      <Star key={s} size={14} fill="currentColor" />
                    ))}
                  </div>
                  <blockquote className="mt-4 flex-1 font-display text-lg italic leading-relaxed text-ink">
                    “{tm.quote}”
                  </blockquote>
                  <figcaption className="mt-5 flex items-center gap-3">
                    <Monogram name={tm.author} size={42} />
                    <div>
                      <p className="text-sm font-semibold text-ink">
                        {tm.author}
                        <span className="ml-1 font-normal text-ink-soft">· {tm.origin}</span>
                      </p>
                      <p className="mt-0.5 inline-flex items-center gap-1 text-xs font-medium text-jungle">
                        <BadgeCheck size={13} />
                        {dict.testimonials.verified}
                      </p>
                    </div>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================ RÉASSURANCE */}
      <Reassurance dict={dict} />

      {/* ============================================ FORMULAIRE DE CONTACT */}
      <section className="container-x py-20 sm:py-28">
        <div className="grid gap-12 md:grid-cols-2 md:gap-16">
          <Reveal as="div">
            <div className="rounded-2xl bg-paper p-7 shadow-sm ring-1 ring-ink/8 sm:p-9">
              <ContactForm dict={dict} lang={locale} title={l.contactFormTitle} />
            </div>
          </Reveal>

          <Reveal delay={0.1} as="div">
            <div className="flex h-full flex-col justify-center">
              <div className="mx-auto flex h-28 w-28 items-center justify-center rounded-full bg-baobab/10 text-baobab">
                <MessageCircle size={48} />
              </div>
              <h3 className="mt-6 text-center font-display text-2xl font-semibold text-ink">
                {dict.ctaBand.title}
              </h3>
              <p className="mx-auto mt-2 max-w-sm text-center text-ink-soft">
                {dict.ctaBand.subtitle}
              </p>
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="mx-auto mt-6 inline-flex items-center gap-2 rounded-full bg-[#25D366] px-6 py-3 text-sm font-semibold text-white transition hover:brightness-95"
              >
                <MessageCircle size={17} />
                WhatsApp
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
