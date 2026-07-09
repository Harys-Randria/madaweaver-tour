import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { isLocale, type Locale } from "@/lib/i18n";
import { getDictionary } from "@/lib/dictionaries";
import { getAllCircuits } from "@/lib/data";
import CircuitsExplorer from "@/components/CircuitsExplorer";

export const revalidate = 30;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const dict = getDictionary(isLocale(lang) ? lang : "en");
  return { title: dict.circuitsPage.title, description: dict.circuitsPage.subtitle };
}

export default async function CircuitsPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const locale = lang as Locale;
  const dict = getDictionary(locale);
  const circuits = await getAllCircuits();

  return (
    <div className="pb-24">
      <section className="container-x pt-12 sm:pt-16">
        <p className="eyebrow">Madagascar</p>
        <h1 className="mt-3 max-w-2xl font-display text-4xl font-semibold text-ink sm:text-6xl">
          {dict.circuitsPage.title}
        </h1>
        <p className="mt-3 max-w-xl text-ink-soft">{dict.circuitsPage.subtitle}</p>
      </section>

      <div className="container-x mt-10">
        <CircuitsExplorer circuits={circuits} lang={locale} dict={dict} />
      </div>
    </div>
  );
}
