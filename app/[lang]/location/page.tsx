import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Car, UserCheck, KeyRound, MessageCircle, ArrowRight } from "lucide-react";
import { isLocale, t, type Locale } from "@/lib/i18n";
import { getCarRental, getSettings } from "@/lib/data";
import { whatsappLink } from "@/lib/site";
import Scenery from "@/components/Scenery";
import Reveal from "@/components/Reveal";

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
              <img src={c.heroImage} alt="" className="absolute inset-0 h-full w-full object-cover" />
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
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {c.vehicles.map((v, i) => (
                <Reveal key={i} delay={i * 0.06} as="div">
                  <div className="flex h-full flex-col overflow-hidden rounded-2xl bg-paper ring-1 ring-ink/8">
                    <div className="relative aspect-4/3 overflow-hidden bg-sand-100">
                      {v.image ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={v.image} alt={v.name} loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center text-baobab/40">
                          <Car size={48} />
                        </div>
                      )}
                    </div>
                    <div className="flex flex-1 flex-col p-5">
                      <h3 className="font-display text-lg font-semibold text-ink">{v.name}</h3>
                      <p className="mt-1.5 flex-1 text-sm leading-relaxed text-ink-soft">
                        {t(v.description, locale)}
                      </p>
                      {v.priceNote && t(v.priceNote, locale) && (
                        <p className="mt-3 inline-flex w-fit rounded-full bg-baobab/10 px-3 py-1 text-xs font-semibold text-baobab">
                          {t(v.priceNote, locale)}
                        </p>
                      )}
                    </div>
                  </div>
                </Reveal>
              ))}
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
