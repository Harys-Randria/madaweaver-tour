import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { UserCheck, KeyRound, MessageCircle, ArrowRight } from "lucide-react";
import { isLocale, t, type Locale } from "@/lib/i18n";
import { getCarRental, getSettings } from "@/lib/data";
import { whatsappLink } from "@/lib/site";
import Scenery from "@/components/Scenery";
import Reveal from "@/components/Reveal";
import CarFleet from "@/components/CarFleet";

export const revalidate = 30;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const locale: Locale = isLocale(lang) ? lang : "en";
  const c = await getCarRental();
  return { title: t(c.title, locale), description: t(c.intro, locale) };
}

const OPTION_ICONS = [UserCheck, KeyRound];

export default async function CarRentalPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const locale = lang as Locale;
  const c = await getCarRental();
  const settings = await getSettings();

  return (
    <div className="pb-24">
      {/* ============================ EN-TÊTE */}
      <section className="container-x pt-14 text-center sm:pt-20">
        <p className="eyebrow">{locale === "fr" ? "Service" : "Service"}</p>
        <h1 className="mx-auto mt-3 max-w-3xl font-display text-4xl font-semibold uppercase tracking-wide text-ink sm:text-6xl">
          {t(c.title, locale)}
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-ink-soft">{t(c.intro, locale)}</p>
      </section>

      {/* Image large */}
      <section className="container-x mt-10">
        <Reveal>
          <div className="relative aspect-video overflow-hidden rounded-2xl shadow-lg ring-1 ring-ink/8">
            {c.heroImage ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={c.heroImage} alt="" fetchPriority="high" decoding="async" className="absolute inset-0 h-full w-full object-cover" />
            ) : (
              <Scenery tone="canyon" rich className="absolute inset-0 h-full w-full object-cover" />
            )}
          </div>
        </Reveal>
      </section>

      {/* ============================ FORMULES */}
      {c.options.length > 0 && (
        <section className="container-x py-20 sm:py-24">
          <div className="grid gap-6 md:grid-cols-2">
            {c.options.map((o, i) => {
              const Icon = OPTION_ICONS[i % OPTION_ICONS.length];
              return (
                <Reveal key={i} delay={i * 0.1} as="div">
                  <div className="h-full rounded-2xl bg-cream-2 p-8 ring-1 ring-ink/8">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-baobab/10 text-baobab">
                      <Icon size={24} />
                    </div>
                    <h2 className="mt-5 font-display text-2xl font-semibold text-ink">{t(o.title, locale)}</h2>
                    <p className="mt-2 leading-relaxed text-ink-soft">{t(o.text, locale)}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </section>
      )}

      {/* ============================ VÉHICULES */}
      {c.vehicles.length > 0 && (
        <section className="bg-cream-2 py-20 sm:py-24">
          <div className="container-x">
            <Reveal>
              <h2 className="text-center font-display text-3xl font-semibold uppercase tracking-wide text-ink">
                {locale === "fr" ? "Notre flotte" : "Our fleet"}
              </h2>
            </Reveal>
            <div className="mt-12">
              <CarFleet
                lang={locale}
                vehicles={c.vehicles.map((v) => ({
                  name: v.name,
                  description: t(v.description, locale),
                  priceWithDriver: v.priceWithDriver || undefined,
                  priceWithoutDriver: v.priceWithoutDriver || undefined,
                  images: v.images ?? [],
                }))}
                labels={{
                  withDriver: locale === "fr" ? "Avec chauffeur / jour" : "With driver / day",
                  withoutDriver: locale === "fr" ? "Sans chauffeur / jour" : "Without driver / day",
                  photos: locale === "fr" ? "photos" : "photos",
                  close: locale === "fr" ? "Fermer" : "Close",
                  prev: locale === "fr" ? "Précédent" : "Previous",
                  next: locale === "fr" ? "Suivant" : "Next",
                }}
              />
            </div>
          </div>
        </section>
      )}

      {/* ============================ CTA */}
      <section className="container-x pt-20">
        <Reveal>
          <div className="overflow-hidden rounded-2xl bg-charcoal bg-noise px-6 py-14 text-center text-cream sm:px-16">
            <h2 className="font-display text-3xl font-semibold sm:text-4xl">{t(c.ctaTitle, locale)}</h2>
            <p className="mx-auto mt-3 max-w-xl text-cream/80">{t(c.ctaText, locale)}</p>
            <div className="mt-7 flex flex-wrap justify-center gap-3">
              <Link
                href={`/${locale}/contact`}
                className="inline-flex items-center gap-2 rounded-full bg-baobab px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-baobab-dark"
              >
                {locale === "fr" ? "Demander un devis" : "Request a quote"}
                <ArrowRight size={17} />
              </Link>
              <a
                href={whatsappLink(settings.contact.whatsapp)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-6 py-3.5 text-sm font-semibold text-white transition hover:brightness-95"
              >
                <MessageCircle size={17} />
                WhatsApp
              </a>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
