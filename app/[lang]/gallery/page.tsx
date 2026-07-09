import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { isLocale, type Locale } from "@/lib/i18n";
import { getDictionary } from "@/lib/dictionaries";
import { getAllCircuits } from "@/lib/data";
import { videos } from "@/lib/site";
import GalleryView from "@/components/GalleryView";

export const revalidate = 30;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const dict = getDictionary(isLocale(lang) ? lang : "en");
  return { title: dict.gallery.title, description: dict.gallery.subtitle };
}

export default async function GalleryPage({
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
      <section className="container-x pt-12 text-center sm:pt-16">
        <p className="eyebrow">{dict.gallery.eyebrow}</p>
        <h1 className="mx-auto mt-3 max-w-2xl font-display text-4xl font-semibold uppercase tracking-wide text-ink sm:text-6xl">
          {dict.gallery.title}
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-ink-soft">{dict.gallery.subtitle}</p>
      </section>

      <div className="container-x mt-10">
        <GalleryView circuits={circuits} videos={videos} lang={locale} dict={dict} />
      </div>
    </div>
  );
}
