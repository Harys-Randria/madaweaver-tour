import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Star, MessageCircle, BadgeCheck } from "lucide-react";
import { isLocale, type Locale } from "@/lib/i18n";
import { getDictionary } from "@/lib/dictionaries";
import { getFeatured } from "@/lib/data";
import { whatsappLink } from "@/lib/site";

export const revalidate = 30;
import WovenArt from "@/components/WovenArt";
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

  return (
    <>
      {/* ===================================================== HERO plein cadre */}
      <section className="relative">
        <div className="relative flex min-h-[78vh] items-center overflow-hidden sm:min-h-[86vh]">
          {/* Fond : placeholder SVG — remplaçable par une vraie photo/vidéo en une ligne */}
          <img src="/baobab1.jpg" className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-linear-to-b from-black/55 via-black/35 to-black/70" />

          <div className="container-x relative py-20 text-white">
            <Reveal>
              <div className="max-w-2xl">
                <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-white ring-1 ring-white/25 backdrop-blur">
                  <span className="badge-dot" />
                  {dict.hero.welcome}
                </span>
                <h1 className="mt-5 font-display text-4xl font-semibold leading-[1.02] tracking-tight sm:text-6xl lg:text-7xl">
                  {dict.hero.title}
                </h1>
                <p className="mt-5 max-w-xl text-base leading-relaxed text-white/85 sm:text-lg">
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

                <dl className="mt-12 flex flex-wrap gap-x-10 gap-y-4 border-t border-white/20 pt-6">
                  {[
                    { n: "120+", l: dict.hero.stat1 },
                    { n: "2 500+", l: dict.hero.stat2 },
                    { n: "10+", l: dict.hero.stat3 },
                  ].map((s) => (
                    <div key={s.l}>
                      <dt className="font-display text-3xl font-semibold text-gold">{s.n}</dt>
                      <dd className="mt-0.5 text-xs uppercase tracking-wider text-white/70">
                        {s.l}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            </Reveal>
          </div>
        </div>

        {/* Barre utilitaire tuilée sous le héros (indicateur de défilement + accès rapides) */}
        <div className="container-x relative z-10 -mt-7">
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
              <h2 className="font-display text-4xl font-semibold text-ink">{l.philosophyTitle}</h2>
              <p className="mt-5 leading-relaxed text-ink-soft">{l.philosophyBody}</p>
              <Link href={`/${locale}/about`} className="link-more mt-6">
                {l.learnMore}
                <ArrowRight size={15} />
              </Link>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="relative aspect-4/3 overflow-hidden rounded-2xl shadow-lg ring-1 ring-ink/8">
              <WovenArt className="absolute inset-0 h-full w-full object-cover" />
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
                <h2 className="mt-2 font-display text-4xl font-semibold text-ink">
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

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featured.map((c, i) => (
              <Reveal key={c.slug} delay={i * 0.06} as="div">
                <CircuitCard circuit={c} lang={locale} dict={dict} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================ CARTE INTERACTIVE */}
      <section className="container-x py-20 sm:py-28">
        <Reveal>
          <h2 className="font-display text-4xl font-semibold text-ink">{l.mapTitle}</h2>
          <p className="mt-2 text-ink-soft">{l.mapSubtitle}</p>
        </Reveal>
        <div className="mt-12">
          <MadagascarMap lang={locale} dict={dict} />
        </div>
      </section>

      {/* ============================================ TÉMOIGNAGES */}
      <section className="bg-cream-2 py-20 sm:py-24">
        <div className="container-x">
          <Reveal>
            <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <span className="lamba-mark" />
                <h2 className="mt-3 font-display text-4xl font-semibold text-ink">
                  {dict.testimonials.title}
                </h2>
                <p className="mt-2 text-ink-soft">{dict.testimonials.subtitle}</p>
              </div>
              <div className="inline-flex items-center gap-3 self-start rounded-full bg-paper px-4 py-2 shadow-sm ring-1 ring-ink/8 sm:self-auto">
                <div className="flex gap-0.5 text-gold">
                  {Array.from({ length: 5 }).map((_, s) => (
                    <Star key={s} size={15} fill="currentColor" />
                  ))}
                </div>
                <span className="text-sm">
                  <span className="font-semibold text-ink">{dict.testimonials.rating}</span>
                  <span className="ml-1 text-ink-soft">· {dict.testimonials.count}</span>
                </span>
              </div>
            </div>
          </Reveal>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {dict.testimonials.items.map((tm, i) => (
              <Reveal key={tm.author} delay={i * 0.1} as="div">
                <figure className="flex h-full flex-col rounded-2xl bg-paper p-7 shadow-sm ring-1 ring-ink/8">
                  <div className="flex gap-0.5 text-gold">
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

      {/* ============================================ RUBAN LAMBA + RÉASSURANCE */}
      <div className="lamba-band" aria-hidden="true" />
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
