import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  ArrowLeft,
  Check,
  X,
  Clock,
  Users,
  Activity,
  Sparkles,
  MapPin,
  Mountain,
  Trees,
  Waves,
  Landmark,
  Compass,
  MessageCircle,
} from "lucide-react";
import { isLocale, t, locales, type Locale } from "@/lib/i18n";
import { getDictionary } from "@/lib/dictionaries";
import {
  categoryLabel,
  DIFFICULTY_LABEL,
  circuitGalleryTones,
} from "@/lib/circuits";
import { getAllCircuits, getCircuitBySlug, getSettings } from "@/lib/data";
import { whatsappLink } from "@/lib/site";

export const revalidate = 30;
export const dynamicParams = true;
import Scenery from "@/components/Scenery";
import BookingForm from "@/components/BookingForm";
import CircuitCard from "@/components/CircuitCard";
import UtilityBar from "@/components/UtilityBar";
import Reveal from "@/components/Reveal";
import MediaGallery, { type MediaItem } from "@/components/MediaGallery";
import CircuitMap from "@/components/CircuitMap";

const STEP_ICONS = [MapPin, Mountain, Trees, Waves, Landmark, Compass, Users];

export async function generateStaticParams() {
  const all = await getAllCircuits();
  return locales.flatMap((lang) => all.map((c) => ({ lang, slug: c.slug })));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}): Promise<Metadata> {
  const { lang, slug } = await params;
  const locale: Locale = isLocale(lang) ? lang : "en";
  const circuit = await getCircuitBySlug(slug);
  if (!circuit) return {};
  return { title: t(circuit.title, locale), description: t(circuit.summary, locale) };
}

export default async function CircuitDetailPage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;
  if (!isLocale(lang)) notFound();
  const locale = lang as Locale;
  const dict = getDictionary(locale);
  const circuit = await getCircuitBySlug(slug);
  if (!circuit) notFound();

  const settings = await getSettings();
  const d = dict.detail;
  // Points de la carte : tous les points de toutes les étapes, dans l'ordre.
  const mapPoints = circuit.itinerary
    .flatMap((s) =>
      (s.waypoints ?? []).map((w) => ({
        lat: w.lat,
        lng: w.lng,
        label: w.name || t(s.title, locale),
      })),
    )
    .filter((p) => Number.isFinite(p.lat) && Number.isFinite(p.lng));
  const allCircuits = await getAllCircuits();
  const related = allCircuits
    .filter((c) => c.slug !== circuit.slug && c.category === circuit.category)
    .slice(0, 3);
  const relatedFallback =
    related.length > 0
      ? related
      : allCircuits.filter((c) => c.slug !== circuit.slug).slice(0, 3);

  const stats = [
    { icon: Activity, label: d.difficulty, value: t(DIFFICULTY_LABEL[circuit.difficulty], locale) },
    { icon: Clock, label: d.duration, value: `${circuit.durationDays} ${dict.card.days}` },
    { icon: Users, label: d.groupSize, value: `${dict.card.maxGroup} ${circuit.groupMax}` },
  ];

  // Galerie du circuit : vraies photos si fournies, sinon ambiances SVG + tissage,
  // puis les vidéos YouTube propres au circuit.
  const galleryItems: MediaItem[] = [
    ...(circuit.gallery?.length
      ? circuit.gallery.map(
          (src) => ({ kind: "photo", src, caption: t(circuit.title, locale) }) as MediaItem,
        )
      : [
          ...circuitGalleryTones(circuit).map((tone) => ({ kind: "scene", tone }) as MediaItem),
          { kind: "woven" } as MediaItem,
        ]),
    ...(circuit.videos ?? []).map(
      (id) =>
        ({ kind: "video", youtubeId: id, tone: circuit.tone, caption: t(circuit.title, locale) }) as MediaItem,
    ),
  ];
  const galleryLabels = {
    close: dict.gallery.close,
    prev: dict.gallery.prev,
    next: dict.gallery.next,
    play: dict.gallery.play,
  };

  return (
    <article className="pb-24">
      {/* ============================================== HERO encadré */}
      <section className="container-x pt-6 sm:pt-8">
        <Link
          href={`/${locale}/circuits`}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-ink-soft transition-colors hover:text-baobab"
        >
          <ArrowLeft size={16} />
          {d.backToTours}
        </Link>

        <div className="relative mt-4 flex min-h-80 items-end overflow-hidden rounded-2xl shadow-lg sm:min-h-104">
          {circuit.gallery?.[0] ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={circuit.gallery[0]} alt="" fetchPriority="high" decoding="async" className="absolute inset-0 h-full w-full object-cover" />
          ) : (
            <Scenery tone={circuit.tone} rich className="absolute inset-0 h-full w-full object-cover" />
          )}
          <div className="absolute inset-0 bg-linear-to-t from-black/75 via-black/25 to-black/10" />
          <div className="relative p-6 text-white sm:p-10">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-baobab px-3 py-1 text-xs font-semibold">
                {categoryLabel(circuit.category, locale)}
              </span>
              <span className="inline-flex items-center gap-1 rounded-full bg-white/15 px-3 py-1 text-xs font-medium backdrop-blur">
                <MapPin size={12} /> {circuit.region}
              </span>
            </div>
            <h1 className="mt-3 max-w-3xl font-display text-4xl font-semibold leading-tight sm:text-5xl">
              {t(circuit.title, locale)}
            </h1>
            <div className="mt-5 flex flex-wrap gap-3">
              <a
                href="#booking"
                className="inline-flex items-center gap-2 rounded-full bg-baobab px-6 py-3 text-sm font-semibold text-white transition hover:bg-baobab-dark"
              >
                {d.bookNow}
              </a>
              <Link
                href={`/${locale}/sur-mesure`}
                className="inline-flex items-center gap-2 rounded-full bg-white/10 px-5 py-3 text-sm font-semibold text-white ring-1 ring-white/40 backdrop-blur transition hover:bg-white/20"
              >
                {d.customize}
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-4">
          <UtilityBar
            lang={locale}
            dict={dict}
            scrollTarget="#itinerary"
            galleryHref="#gallery"
            videosHref="#gallery"
          />
        </div>
      </section>

      {/* ============================================== CORPS */}
      <div className="container-x mt-14 grid gap-12 lg:grid-cols-[1fr_360px]">
        {/* Colonne principale */}
        <div className="min-w-0">
          <Reveal>
            <p className="leading-relaxed text-ink-soft">{t(circuit.description, locale)}</p>
          </Reveal>

          {/* Points forts */}
          <Reveal>
            <div className="mt-10">
              <h2 className="flex items-center gap-2 font-display text-2xl font-semibold text-ink">
                <Sparkles size={20} className="text-gold" />
                {d.highlights}
              </h2>
              <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                {t(circuit.highlights, locale).map((h) => (
                  <li
                    key={h}
                    className="flex items-start gap-2.5 rounded-xl bg-cream-2 px-4 py-3 text-sm text-ink"
                  >
                    <Check size={17} className="mt-0.5 shrink-0 text-jungle" />
                    {h}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          {/* Itinéraire avec timeline + icônes */}
          <Reveal>
            <div id="itinerary" className="mt-12 scroll-mt-24">
              <h2 className="font-display text-3xl font-semibold text-ink">{d.itinerary}</h2>
              <ol className="mt-6">
                {circuit.itinerary.map((step, i) => {
                  const Icon = STEP_ICONS[i % STEP_ICONS.length];
                  const last = i === circuit.itinerary.length - 1;
                  return (
                    <li key={i} className="relative flex gap-5 pb-9 last:pb-0">
                      <div className="flex flex-col items-center">
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-baobab/10 text-baobab ring-1 ring-baobab/20">
                          <Icon size={19} />
                        </div>
                        {!last && <div className="mt-1 w-px flex-1 bg-sand-300" />}
                      </div>
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wider text-baobab">
                          {t(step.day, locale)}
                        </p>
                        <h3 className="mt-0.5 font-display text-lg font-semibold text-ink">
                          {t(step.title, locale)}
                        </h3>
                        <p className="mt-1 text-sm leading-relaxed text-ink-soft">
                          <span className="font-semibold text-ink">{d.highlights}: </span>
                          {t(step.description, locale)}
                        </p>
                      </div>
                    </li>
                  );
                })}
              </ol>
            </div>
          </Reveal>

          {/* Carte du parcours (affichée seulement si des étapes ont des coordonnées) */}
          {mapPoints.length > 0 && (
            <Reveal>
              <div className="mt-12">
                <h2 className="font-display text-3xl font-semibold text-ink">
                  {locale === "fr" ? "Carte du parcours" : "Route map"}
                </h2>
                <p className="mt-1 text-sm text-ink-soft">
                  {locale === "fr"
                    ? "Le trajet suit les routes ; les tronçons en pointillé sont des vols ou traversées."
                    : "The route follows the roads; dashed sections are flights or crossings."}
                </p>
                <div className="mt-6">
                  <CircuitMap points={mapPoints} />
                </div>
              </div>
            </Reveal>
          )}

          {/* Inclus / non inclus */}
          <Reveal>
            <div className="mt-12 grid gap-6 sm:grid-cols-2">
              <div className="rounded-2xl border border-jungle/20 bg-jungle/5 p-6">
                <h3 className="font-display text-lg font-semibold text-jungle">{d.included}</h3>
                <ul className="mt-3 space-y-2.5 text-sm text-ink">
                  {t(circuit.included, locale).map((x) => (
                    <li key={x} className="flex items-start gap-2.5">
                      <Check size={16} className="mt-0.5 shrink-0 text-jungle" />
                      {x}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-2xl border border-ink/10 bg-cream-2 p-6">
                <h3 className="font-display text-lg font-semibold text-ink-soft">{d.notIncluded}</h3>
                <ul className="mt-3 space-y-2.5 text-sm text-ink-soft">
                  {t(circuit.notIncluded, locale).map((x) => (
                    <li key={x} className="flex items-start gap-2.5">
                      <X size={16} className="mt-0.5 shrink-0 text-baobab" />
                      {x}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Colonne latérale : carte de réservation */}
        <aside className="lg:sticky lg:top-24 lg:h-fit">
          <div className="overflow-hidden rounded-2xl bg-paper shadow-lg ring-1 ring-ink/8">
            <div className="bg-baobab px-6 py-3 text-center text-xs font-semibold uppercase tracking-widest text-white">
              {d.reserveThis}
            </div>
            <div className="p-6">
              <div className="flex items-baseline gap-1.5">
                <span className="text-sm text-ink-soft">{dict.card.from}</span>
                <span className="font-display text-4xl font-semibold text-baobab">
                  {circuit.priceEstimated ? "≈ " : ""}€{circuit.priceFrom}
                </span>
                <span className="text-sm text-ink-soft">{dict.card.perPerson}</span>
              </div>
              {circuit.priceEstimated && (
                <p className="mt-1.5 text-xs text-ink-soft">
                  {locale === "fr" ? "Estimation · prix exact sur devis" : "Estimated · exact price on request"}
                </p>
              )}

              <dl className="mt-5 space-y-3 border-t border-sand-200 pt-5 text-sm">
                <div className="flex items-center justify-between">
                  <dt className="text-ink-soft">{d.dates}</dt>
                  <dd className="text-right font-medium text-ink">{d.datesValue}</dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt className="text-ink-soft">{d.duration}</dt>
                  <dd className="font-medium text-ink">
                    {circuit.durationDays} {dict.card.days}
                  </dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt className="text-ink-soft">{d.bestSeason}</dt>
                  <dd className="text-right font-medium text-ink">{t(circuit.bestSeason, locale)}</dd>
                </div>
              </dl>

              <a
                href="#booking"
                className="mt-6 block rounded-lg bg-baobab px-5 py-3 text-center text-sm font-semibold text-white transition-colors hover:bg-baobab-dark"
              >
                {d.bookNow}
              </a>
            </div>
          </div>

          <div className="mt-5 aspect-4/5 overflow-hidden rounded-2xl shadow-md">
            {circuit.gallery?.[1] ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={circuit.gallery[1]}
                alt={t(circuit.title, locale)}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover"
              />
            ) : (
              <Scenery tone={circuit.tone} className="h-full w-full object-cover" />
            )}
          </div>
        </aside>
      </div>

      {/* ============================================== PRATIQUE & GALERIE */}
      <section id="gallery" className="container-x mt-20 scroll-mt-24">
        <h2 className="font-display text-3xl font-semibold text-ink">{d.practicalGallery}</h2>

        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {stats.map((s) => (
            <div
              key={s.label}
              className="flex items-center gap-4 rounded-2xl bg-cream-2 px-6 py-5"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-baobab/10 text-baobab">
                <s.icon size={22} />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-ink-soft">
                  {s.label}
                </p>
                <p className="font-display text-lg font-semibold text-ink">{s.value}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6">
          <MediaGallery
            items={galleryItems}
            labels={galleryLabels}
            className="grid grid-cols-2 gap-4 sm:grid-cols-3"
          />
        </div>
      </section>

      {/* ============================================== RÉSERVATION */}
      <section id="booking" className="container-x mt-20 scroll-mt-24">
        <div className="mx-auto max-w-2xl rounded-2xl bg-paper p-7 shadow-sm ring-1 ring-ink/8 sm:p-9">
          <BookingForm
            circuitTitle={t(circuit.title, locale)}
            circuitUrl={`${settings.url}/${locale}/circuits/${circuit.slug}`}
            durationDays={circuit.durationDays}
            priceFrom={circuit.priceFrom}
            priceEstimated={circuit.priceEstimated}
            daysLabel={dict.card.days}
            fromLabel={dict.card.from}
            perPersonLabel={dict.card.perPerson}
            b={dict.booking}
            lang={locale}
          />
        </div>
      </section>

      {/* ============================================== DEVIS SUR-MESURE */}
      <section className="container-x mt-20">
        <div className="overflow-hidden rounded-2xl bg-charcoal bg-noise px-6 py-12 text-center text-cream sm:px-16">
          <div className="mb-5 flex justify-center">
            <span className="lamba-mark" />
          </div>
          <h2 className="font-display text-2xl font-semibold sm:text-3xl">{d.quoteTitle}</h2>
          <p className="mx-auto mt-3 max-w-xl text-cream/80">{d.quoteText}</p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <Link
              href={`/${locale}/sur-mesure`}
              className="inline-flex items-center gap-2 rounded-full bg-baobab px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-baobab-dark"
            >
              {d.quoteButton}
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
      </section>

      {/* ============================================== SIMILAIRES */}
      <section className="container-x mt-20">
        <h2 className="font-display text-3xl font-semibold text-ink">{d.relatedTitle}</h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {relatedFallback.map((c) => (
            <CircuitCard key={c.slug} circuit={c} lang={locale} dict={dict} />
          ))}
        </div>
      </section>
    </article>
  );
}
