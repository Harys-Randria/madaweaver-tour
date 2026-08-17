import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { isLocale, type Locale } from "@/lib/i18n";
import LegalDoc, { type LegalBlock } from "@/components/LegalDoc";

export const revalidate = 3600;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const fr = !isLocale(lang) || lang === "fr";
  return { title: fr ? "Cookies" : "Cookies" };
}

export default async function CookiesPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const fr = (lang as Locale) === "fr";

  const blocks: LegalBlock[] = fr
    ? [
        {
          heading: "Qu'est-ce qu'un cookie ?",
          body: (
            <p>
              Un cookie est un petit fichier déposé sur votre appareil lors de la visite d&apos;un site.
              Ce site n&apos;utilise que des cookies strictement nécessaires à son fonctionnement.
            </p>
          ),
        },
        {
          heading: "Cookies utilisés",
          body: (
            <ul className="list-disc space-y-1 pl-5">
              <li>
                <strong>Préférence de langue</strong> — mémorise votre choix EN / FR pour ne pas le
                redemander à chaque visite.
              </li>
              <li>
                <strong>Session d&apos;administration</strong> — uniquement pour les personnes qui se
                connectent à l&apos;espace d&apos;administration du site.
              </li>
              <li>
                <strong>Mesure d&apos;audience</strong> — statistiques de visite anonymisées (pages vues),
                sans suivi publicitaire.
              </li>
            </ul>
          ),
        },
        {
          heading: "Gérer les cookies",
          body: (
            <p>
              Vous pouvez à tout moment supprimer ou bloquer les cookies via les réglages de votre
              navigateur. Le blocage des cookies techniques peut altérer le fonctionnement du site.
            </p>
          ),
        },
      ]
    : [
        {
          heading: "What is a cookie?",
          body: (
            <p>
              A cookie is a small file stored on your device when visiting a website. This site only uses
              cookies that are strictly necessary for it to work.
            </p>
          ),
        },
        {
          heading: "Cookies we use",
          body: (
            <ul className="list-disc space-y-1 pl-5">
              <li>
                <strong>Language preference</strong> — remembers your EN / FR choice so you are not asked
                again on each visit.
              </li>
              <li>
                <strong>Admin session</strong> — only for people who log in to the site&apos;s admin area.
              </li>
              <li>
                <strong>Audience measurement</strong> — anonymised visit statistics (page views), with no
                advertising tracking.
              </li>
            </ul>
          ),
        },
        {
          heading: "Managing cookies",
          body: (
            <p>
              You can delete or block cookies at any time via your browser settings. Blocking technical
              cookies may affect how the site works.
            </p>
          ),
        },
      ];

  return (
    <LegalDoc
      title="Cookies"
      updated={fr ? "Dernière mise à jour : août 2026" : "Last updated: August 2026"}
      blocks={blocks}
    />
  );
}
