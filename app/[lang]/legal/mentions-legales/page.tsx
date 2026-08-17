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
  return { title: fr ? "Mentions légales" : "Legal notice" };
}

export default async function LegalNoticePage({
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
          heading: "Éditeur du site",
          body: (
            <>
              <p>Le présent site est édité par {s.name}.</p>
              <p>Raison sociale : [À COMPLÉTER : dénomination légale de la société]</p>
              <p>Forme juridique / capital : [À COMPLÉTER]</p>
              <p>Adresse : {s.contact.address}</p>
              <p>Email : {s.contact.email} · Téléphone : {s.contact.phoneDisplay}</p>
              <p>Numéro d&apos;immatriculation (RCS / NIF / STAT) : [À COMPLÉTER]</p>
              <p>Licence agence de voyage / immatriculation tourisme : [À COMPLÉTER]</p>
              <p>Directeur de la publication : [À COMPLÉTER : nom du responsable]</p>
            </>
          ),
        },
        {
          heading: "Hébergement",
          body: (
            <>
              <p>Le site est hébergé par Vercel Inc.</p>
              <p>340 S Lemon Ave #4133, Walnut, CA 91789, États-Unis — vercel.com</p>
            </>
          ),
        },
        {
          heading: "Propriété intellectuelle",
          body: (
            <p>
              L&apos;ensemble des contenus (textes, photographies, logos) présents sur ce site sont
              la propriété de {s.name}, sauf mention contraire, et ne peuvent être reproduits sans
              autorisation écrite préalable.
            </p>
          ),
        },
        {
          heading: "Responsabilité",
          body: (
            <p>
              {s.name} s&apos;efforce d&apos;assurer l&apos;exactitude des informations publiées, sans
              pouvoir en garantir l&apos;exhaustivité. Les tarifs et disponibilités sont donnés à titre
              indicatif et confirmés lors de la réservation.
            </p>
          ),
        },
      ]
    : [
        {
          heading: "Site publisher",
          body: (
            <>
              <p>This website is published by {s.name}.</p>
              <p>Legal name: [TO COMPLETE: registered company name]</p>
              <p>Legal form / capital: [TO COMPLETE]</p>
              <p>Address: {s.contact.address}</p>
              <p>Email: {s.contact.email} · Phone: {s.contact.phoneDisplay}</p>
              <p>Registration number: [TO COMPLETE]</p>
              <p>Travel agency licence: [TO COMPLETE]</p>
              <p>Publication director: [TO COMPLETE: name]</p>
            </>
          ),
        },
        {
          heading: "Hosting",
          body: (
            <>
              <p>The site is hosted by Vercel Inc.</p>
              <p>340 S Lemon Ave #4133, Walnut, CA 91789, USA — vercel.com</p>
            </>
          ),
        },
        {
          heading: "Intellectual property",
          body: (
            <p>
              All content (text, photographs, logos) on this site is the property of {s.name} unless
              otherwise stated, and may not be reproduced without prior written permission.
            </p>
          ),
        },
        {
          heading: "Liability",
          body: (
            <p>
              {s.name} strives to ensure the accuracy of the information published but cannot guarantee
              its completeness. Prices and availability are indicative and confirmed at booking.
            </p>
          ),
        },
      ];

  return (
    <LegalDoc
      title={fr ? "Mentions légales" : "Legal notice"}
      updated={fr ? "Dernière mise à jour : août 2026" : "Last updated: August 2026"}
      blocks={blocks}
    />
  );
}
