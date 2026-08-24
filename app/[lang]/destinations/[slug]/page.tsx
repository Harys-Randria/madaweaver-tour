import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowLeft, ArrowRight, MapPin } from "lucide-react";
import { isLocale, t, locales, type Locale } from "@/lib/i18n";
import { getDictionary } from "@/lib/dictionaries";
import { getAllCircuits, getAllDestinations, getDestinationBySlug } from "@/lib/data";
import CircuitCard from "@/components/CircuitCard";
import Reveal from "@/components/Reveal";

export const revalidate = 30;
export const dynamicParams = true;

export async function generateStaticParams() {
  const destinations = await getAllDestinations();
  return locales.flatMap((lang) => destinations.map((d) => ({ lang, slug: d.slug })));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}): Promise<Metadata> {
  const { lang, slug } = await params;
  const locale: Locale = isLocale(lang) ? lang : "en";
  const d = await getDestinationBySlug(slug);
  if (!d) return {};
  return { title: t(d.title, locale), description: t(d.excerpt, locale) };
}

export default async function DestinationDetailPage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;
  if (!isLocale(lang)) notFound();
  const locale = lang as Locale;
  const dict = getDictionary(locale);
  const dp = dict.destinationsPage;
  const d = await getDestinationBySlug(slug);
  if (!d) notFound();

  const allCircuits = await getAllCircuits();
  const related = allCircuits
    .filter((c) => (c.macroRegions ?? []).includes(d.region))
    .slice(0, 3);

  return (
    <article className="pb-24">
      {/* ============================================== HERO */}
      <section className="container-x pt-6 sm:pt-8">
        <Link
          href={`/${locale}/destinations`}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-ink-soft transition-colors hover:text-baobab"
        >
          <ArrowLeft size={16} />
          {dp.backToDestinations}
        </Link>

        <div className="relative mt-4 flex min-h-80 items-end overflow-hidden rounded-2xl shadow-lg sm:min-h-104">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={d.image} alt="" fetchPriority="high" decoding="async" className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-linear-to-t from-black/75 via-black/25 to-black/10" />
          <div className="relative p-6 text-white sm:p-10">
            <span className="inline-flex items-center gap-1 rounded-full bg-baobab px-3 py-1 text-xs font-semibold">
              <MapPin size={12} /> {t(d.regionLabel, locale)}
            </span>
            <h1 className="mt-3 max-w-3xl font-display text-4xl font-semibold leading-tight sm:text-5xl">
              {t(d.title, locale)}
            </h1>
          </div>
        </div>
      </section>

      {/* ============================================== INTRO */}
      <section className="container-x mt-10">
        <p className="max-w-3xl text-lg leading-relaxed text-ink-soft">{t(d.excerpt, locale)}</p>
      </section>

      {/* ============================================== SECTIONS */}
      <section className="container-x mt-12 space-y-8">
        {d.sections.map((s, i) => (
          <Reveal key={i} as="div">
            <div className="grid gap-3 border-t border-sand-200 pt-8 md:grid-cols-[1fr_1.8fr] md:gap-10">
              <h2 className="font-display text-2xl font-semibold text-ink">{t(s.heading, locale)}</h2>
              <p className="leading-relaxed text-ink-soft">{t(s.body, locale)}</p>
            </div>
          </Reveal>
        ))}
      </section>

      {/* ============================================== CIRCUITS RATTACHÉS */}
      {related.length > 0 && (
        <section className="container-x mt-20">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 className="font-display text-3xl font-semibold text-ink">{dp.relatedTitle}</h2>
            <Link
              href={`/${locale}/circuits?region=${d.region}`}
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-baobab transition-all hover:gap-2.5"
            >
              {dp.exploreTours}
              <ArrowRight size={16} />
            </Link>
          </div>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((c) => (
              <CircuitCard key={c.slug} circuit={c} lang={locale} dict={dict} />
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
