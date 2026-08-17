import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { isLocale, type Locale } from "@/lib/i18n";
import { getSettings } from "@/lib/data";
import LegalDoc, { type LegalBlock } from "@/components/LegalDoc";

export const revalidate = 3600;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const fr = !isLocale(lang) || lang === "fr";
  return { title: fr ? "Politique de confidentialité" : "Privacy policy" };
}

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const locale = lang as Locale;
  const fr = locale === "fr";
  const s = await getSettings();

  const blocks: LegalBlock[] = fr
    ? [
        {
          heading: "Responsable du traitement",
          body: (
            <p>
              Les données personnelles collectées sur ce site sont traitées par {s.name} ({s.contact.email}).
            </p>
          ),
        },
        {
          heading: "Données collectées",
          body: (
            <p>
              Lorsque vous nous contactez (formulaire, WhatsApp ou email), nous collectons les
              informations que vous fournissez : nom, email, téléphone et le contenu de votre message.
              Aucune donnée bancaire n&apos;est collectée sur le site.
            </p>
          ),
        },
        {
          heading: "Finalité et base légale",
          body: (
            <p>
              Ces données servent uniquement à répondre à votre demande et à organiser votre voyage
              (mesure précontractuelle / intérêt légitime). Elles ne sont ni vendues ni cédées à des tiers
              à des fins commerciales.
            </p>
          ),
        },
        {
          heading: "Conservation",
          body: <p>Les demandes sont conservées le temps nécessaire au traitement, puis archivées ou supprimées.</p>,
        },
        {
          heading: "Vos droits",
          body: (
            <p>
              Conformément au RGPD, vous disposez d&apos;un droit d&apos;accès, de rectification et de
              suppression de vos données. Pour l&apos;exercer, écrivez à {s.contact.email}.
            </p>
          ),
        },
        {
          heading: "Cookies",
          body: (
            <p>
              Le site utilise des cookies techniques essentiels (préférence de langue, session
              d&apos;administration). Voir la page « Cookies » pour le détail.
            </p>
          ),
        },
      ]
    : [
        {
          heading: "Data controller",
          body: (
            <p>
              Personal data collected on this site is processed by {s.name} ({s.contact.email}).
            </p>
          ),
        },
        {
          heading: "Data collected",
          body: (
            <p>
              When you contact us (form, WhatsApp or email) we collect the information you provide: name,
              email, phone and the content of your message. No banking data is collected on the site.
            </p>
          ),
        },
        {
          heading: "Purpose and legal basis",
          body: (
            <p>
              This data is used solely to answer your request and organise your trip (pre-contractual
              measure / legitimate interest). It is never sold or shared with third parties for marketing.
            </p>
          ),
        },
        {
          heading: "Retention",
          body: <p>Enquiries are kept for as long as needed to process them, then archived or deleted.</p>,
        },
        {
          heading: "Your rights",
          body: (
            <p>
              Under the GDPR, you have the right to access, rectify and delete your data. To exercise it,
              email {s.contact.email}.
            </p>
          ),
        },
        {
          heading: "Cookies",
          body: (
            <p>
              The site uses essential technical cookies (language preference, admin session). See the
              &quot;Cookies&quot; page for details.
            </p>
          ),
        },
      ];

  return (
    <LegalDoc
      title={fr ? "Politique de confidentialité" : "Privacy policy"}
      updated={fr ? "Dernière mise à jour : août 2026" : "Last updated: August 2026"}
      blocks={blocks}
    />
  );
}
