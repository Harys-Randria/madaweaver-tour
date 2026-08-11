import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { isLocale, t, type Locale } from "@/lib/i18n";
import { getDictionary } from "@/lib/dictionaries";
import { destinations } from "@/lib/destinations";
import Reveal from "@/components/Reveal";

export const revalidate = 30;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const dict = getDictionary(isLocale(lang) ? lang : "en");
  return { title: dict.destinationsPage.title, description: dict.destinationsPage.subtitle };
}

export default async function DestinationsPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const locale = lang as Locale;
  const dict = getDictionary(locale);
  const dp = dict.destinationsPage;

  return (
    <div className="pb-24">
      <section className="container-x pt-12 text-center sm:pt-16">
        <p className="eyebrow">{dp.eyebrow}</p>
        <h1 className="mx-auto mt-3 max-w-3xl font-display text-4xl font-semibold text-ink sm:text-6xl">
          {dp.title}
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-ink-soft">{dp.subtitle}</p>
      </section>

      <div className="container-x mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {destinations.map((d, i) => (
          <Reveal key={d.slug} delay={i * 0.05} as="div">
            <Link
              href={`/${locale}/destinations/${d.slug}`}
              className="group flex h-full flex-col overflow-hidden rounded-2xl bg-paper ring-1 ring-ink/8 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-ink/10 hover:ring-baobab/30"
            >
              <div className="relative aspect-4/3 overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={d.image}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.07]"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/65 via-black/10 to-black/10" />
                <span className="absolute left-3 top-3 rounded-full bg-baobab px-2.5 py-1 text-[11px] font-semibold text-white shadow-sm">
                  {t(d.regionLabel, locale)}
                </span>
                <h2 className="absolute inset-x-4 bottom-3 font-display text-xl font-semibold leading-snug text-white drop-shadow">
                  {t(d.title, locale)}
                </h2>
              </div>
              <div className="flex flex-1 flex-col p-5">
                <p className="flex-1 text-sm leading-relaxed text-ink-soft">{t(d.excerpt, locale)}</p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-baobab transition-all group-hover:gap-2.5">
                  {dict.common.readMore}
                  <ArrowRight size={15} />
                </span>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
