import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { MessageSquare, PenLine, RefreshCw, Plane, MessageCircle } from "lucide-react";
import { isLocale, type Locale } from "@/lib/i18n";
import { getDictionary } from "@/lib/dictionaries";
import { whatsappLink } from "@/lib/site";
import Reveal from "@/components/Reveal";
import TripDesignForm from "@/components/TripDesignForm";

const STEP_ICONS = [MessageSquare, PenLine, RefreshCw, Plane];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const dict = getDictionary(isLocale(lang) ? lang : "en");
  return { title: dict.tailorMade.title, description: dict.tailorMade.subtitle };
}

export default async function TailorMadePage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const locale = lang as Locale;
  const dict = getDictionary(locale);
  const tm = dict.tailorMade;

  return (
    <div className="pb-24">
      {/* ============================ EN-TÊTE */}
      <section className="container-x pt-14 text-center sm:pt-20">
        <p className="eyebrow">{tm.eyebrow}</p>
        <h1 className="mx-auto mt-3 max-w-3xl font-display text-4xl font-semibold text-ink sm:text-6xl">
          {tm.title}
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-ink-soft">
          {tm.subtitle}
        </p>
        <div className="mt-6 flex justify-center">
          <span className="lamba-mark" />
        </div>
      </section>

      {/* ============================ COMMENT ÇA MARCHE */}
      <section className="container-x py-16 sm:py-20">
        <Reveal>
          <h2 className="text-center font-display text-2xl font-semibold text-ink sm:text-3xl">
            {tm.stepsTitle}
          </h2>
        </Reveal>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {tm.steps.map((step, i) => {
            const Icon = STEP_ICONS[i];
            return (
              <Reveal key={step.title} delay={i * 0.08} as="div">
                <div className="relative h-full rounded-2xl bg-paper p-6 shadow-sm ring-1 ring-ink/8">
                  <span className="absolute right-5 top-5 font-display text-3xl font-semibold text-sand-300">
                    {i + 1}
                  </span>
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-baobab/10 text-baobab">
                    <Icon size={20} />
                  </div>
                  <h3 className="mt-4 font-display text-lg font-semibold text-ink">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-soft">{step.text}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* ============================ FORMULAIRE */}
      <section className="bg-cream-2 py-16 sm:py-20">
        <div className="container-x grid gap-10 lg:grid-cols-[1fr_1.15fr] lg:gap-16">
          {/* Panneau de réassurance / WhatsApp */}
          <Reveal as="div">
            <div className="flex h-full flex-col justify-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-baobab/10 text-baobab">
                <MessageCircle size={26} />
              </div>
              <h2 className="mt-5 font-display text-3xl font-semibold text-ink">{tm.eyebrow}</h2>
              <p className="mt-3 max-w-md leading-relaxed text-ink-soft">{tm.subtitle}</p>
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex w-fit items-center gap-2 rounded-full bg-[#25D366] px-6 py-3 text-sm font-semibold text-white transition hover:brightness-95"
              >
                <MessageCircle size={17} />
                {tm.whatsapp}
              </a>
            </div>
          </Reveal>

          {/* Formulaire */}
          <Reveal delay={0.1} as="div">
            <div className="rounded-2xl bg-paper p-7 shadow-sm ring-1 ring-ink/8 sm:p-9">
              <TripDesignForm dict={dict} lang={locale} />
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
