import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { MessageCircle, Mail, Phone, MapPin, ArrowRight } from "lucide-react";
import { isLocale, type Locale } from "@/lib/i18n";
import { getDictionary } from "@/lib/dictionaries";
import { site, whatsappLink, mailtoLink } from "@/lib/site";
import ContactForm from "@/components/ContactForm";
import Reveal from "@/components/Reveal";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const dict = getDictionary(isLocale(lang) ? lang : "en");
  return { title: dict.nav.contact, description: dict.contactPage.subtitle };
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const locale = lang as Locale;
  const dict = getDictionary(locale);
  const c = dict.contactPage;

  const offices = [
    { name: c.contactTana, detail: "Antananarivo · " + site.contact.email },
    { name: c.contactSud, detail: locale === "fr" ? "Tuléar · Isalo · RN7" : "Tuléar · Isalo · RN7" },
    { name: c.contactEst, detail: locale === "fr" ? "Andasibe · Sainte-Marie" : "Andasibe · Sainte-Marie" },
  ];

  return (
    <div className="pb-24">
      {/* En-tête */}
      <section className="container-x pt-14 text-center sm:pt-20">
        <p className="eyebrow">{dict.nav.contact}</p>
        <h1 className="mx-auto mt-3 max-w-2xl font-display text-4xl font-semibold uppercase tracking-wide text-ink sm:text-6xl">
          {c.title}
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-ink-soft">{c.subtitle}</p>
      </section>

      <div className="container-x mt-14 grid gap-12 lg:grid-cols-2 lg:gap-16">
        {/* Colonne gauche : coordonnées */}
        <Reveal as="div">
          <div className="rounded-2xl bg-cream-2 p-7 sm:p-9">
            <ul className="space-y-6">
              <li className="flex gap-4">
                <MapPin size={22} className="mt-0.5 shrink-0 text-baobab" />
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-ink-soft">
                    {c.addressTitle}
                  </p>
                  <p className="mt-1 text-ink">{site.contact.address}</p>
                </div>
              </li>
              <li className="flex gap-4">
                <Phone size={22} className="mt-0.5 shrink-0 text-baobab" />
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-ink-soft">
                    {c.phoneTitle}
                  </p>
                  <a href={whatsappLink()} className="mt-1 block text-ink hover:text-baobab">
                    {site.contact.phoneDisplay}
                  </a>
                </div>
              </li>
              <li className="flex gap-4">
                <Mail size={22} className="mt-0.5 shrink-0 text-baobab" />
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-ink-soft">
                    {c.emailTitle}
                  </p>
                  <a href={mailtoLink()} className="mt-1 block break-all text-ink hover:text-baobab">
                    {site.contact.email}
                  </a>
                </div>
              </li>
            </ul>

            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[#25D366] px-5 py-3 text-sm font-semibold text-white transition hover:brightness-95"
            >
              <MessageCircle size={18} />
              {c.whatsappButton}
            </a>

            {/* Antennes régionales */}
            <div className="mt-8 space-y-4 border-t border-sand-300 pt-6">
              {offices.map((o) => (
                <div key={o.name} className="flex gap-3">
                  <MapPin size={16} className="mt-0.5 shrink-0 text-baobab" />
                  <div>
                    <p className="text-sm font-semibold text-ink">{o.name}</p>
                    <p className="text-xs text-ink-soft">{o.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        {/* Colonne droite : formulaire */}
        <Reveal delay={0.1} as="div">
          <div>
            <ContactForm dict={dict} lang={locale} />
            <Link
              href={`/${locale}/circuits`}
              className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-lg border border-baobab px-5 py-3 text-sm font-semibold text-baobab transition hover:bg-baobab hover:text-white"
            >
              {c.weaveAdventure}
              <ArrowRight size={16} />
            </Link>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
