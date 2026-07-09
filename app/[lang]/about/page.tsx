import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Sparkles, Leaf, Heart, ArrowRight } from "lucide-react";
import { isLocale, type Locale } from "@/lib/i18n";
import { getDictionary } from "@/lib/dictionaries";
import Scenery from "@/components/Scenery";
import WovenArt from "@/components/WovenArt";
import Reveal from "@/components/Reveal";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const dict = getDictionary(isLocale(lang) ? lang : "en");
  return { title: dict.nav.about, description: dict.aboutPage.lead };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const locale = lang as Locale;
  const dict = getDictionary(locale);
  const a = dict.aboutPage;
  const valueIcons = [Sparkles, Leaf, Heart];

  return (
    <div className="pb-24">
      {/* ============================ EN-TÊTE ÉDITORIAL */}
      <section className="container-x pt-14 text-center sm:pt-20">
        <p className="eyebrow">{dict.landing.philosophyTitle}</p>
        <h1 className="mx-auto mt-3 max-w-3xl font-display text-4xl font-semibold uppercase tracking-wide text-ink sm:text-6xl">
          {a.title}
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-ink-soft">{a.lead}</p>
      </section>

      {/* Image large */}
      <section className="container-x mt-10">
        <Reveal>
          <div className="relative aspect-video overflow-hidden rounded-2xl shadow-lg ring-1 ring-ink/8">
            <Scenery tone="sunset" rich className="absolute inset-0 h-full w-full object-cover" />
          </div>
        </Reveal>
      </section>

      {/* ============================ HISTOIRE */}
      <section className="container-x py-20 sm:py-28">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
          <Reveal>
            <div>
              <h2 className="font-display text-3xl font-semibold text-ink">{a.storyTitle}</h2>
              <p className="mt-5 leading-relaxed text-ink-soft">{a.story1}</p>
              <p className="mt-4 leading-relaxed text-ink-soft">{a.story2}</p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="relative aspect-4/3 overflow-hidden rounded-2xl shadow-lg ring-1 ring-ink/8">
              <WovenArt className="absolute inset-0 h-full w-full object-cover" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============================ VALEURS */}
      <section className="bg-cream-2 py-20 sm:py-24">
        <div className="container-x">
          <Reveal>
            <h2 className="text-center font-display text-3xl font-semibold uppercase tracking-wide text-ink">
              {a.valuesTitle}
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {a.values.map((v, i) => {
              const Icon = valueIcons[i];
              return (
                <Reveal key={v.title} delay={i * 0.1} as="div">
                  <div className="h-full rounded-2xl bg-paper p-7 text-center shadow-sm ring-1 ring-ink/8">
                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-baobab/10 text-baobab">
                      <Icon size={24} />
                    </div>
                    <h3 className="mt-4 font-display text-xl font-semibold text-ink">{v.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-ink-soft">{v.text}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============================ CHIFFRES */}
      <section className="container-x py-20 sm:py-24">
        <Reveal>
          <div className="grid gap-8 rounded-2xl bg-charcoal bg-noise px-8 py-12 text-center text-cream sm:grid-cols-4">
            {[
              { n: "10+", l: dict.hero.stat3 },
              { n: "120+", l: dict.hero.stat1 },
              { n: "2 500+", l: dict.hero.stat2 },
              { n: "100%", l: locale === "fr" ? "Guides locaux" : "Local guides" },
            ].map((s) => (
              <div key={s.l}>
                <p className="font-display text-4xl font-semibold text-gold">{s.n}</p>
                <p className="mt-1 text-sm text-cream/65">{s.l}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* ============================ ÉQUIPE + CTA */}
      <section className="container-x">
        <Reveal>
          <div className="rounded-2xl bg-baobab px-6 py-14 text-center text-white sm:px-16">
            <h2 className="font-display text-3xl font-semibold sm:text-4xl">{a.teamTitle}</h2>
            <p className="mx-auto mt-3 max-w-xl text-white/90">{a.teamText}</p>
            <p className="mx-auto mt-6 max-w-lg font-display text-xl italic text-cream">
              {a.ctaTitle}
            </p>
            <Link
              href={`/${locale}/contact`}
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-baobab-dark transition hover:bg-cream"
            >
              {a.ctaButton}
              <ArrowRight size={17} />
            </Link>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
