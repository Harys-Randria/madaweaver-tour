import type { Metadata } from "next";
import { Playfair_Display, Plus_Jakarta_Sans } from "next/font/google";
import "../globals.css";
import { locales, isLocale, type Locale } from "@/lib/i18n";
import { getDictionary } from "@/lib/dictionaries";
import { site } from "@/lib/site";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import { notFound } from "next/navigation";

const display = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display-src",
  weight: ["400", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const body = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-body-src",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const locale: Locale = isLocale(lang) ? lang : "en";
  return {
    metadataBase: new URL(site.url),
    title: {
      default: `${site.name} — ${site.tagline[locale]}`,
      template: `%s · ${site.name}`,
    },
    description: site.description[locale],
    alternates: {
      languages: { en: "/en", fr: "/fr" },
    },
    openGraph: {
      title: `${site.name} — ${site.tagline[locale]}`,
      description: site.description[locale],
      type: "website",
      locale: locale === "fr" ? "fr_MG" : "en_US",
    },
    icons: { icon: "/favicon.ico" },
  };
}

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const dict = getDictionary(lang);

  return (
    <html lang={lang} className={`${display.variable} ${body.variable}`}>
      <body className="min-h-dvh flex flex-col bg-cream text-ink">
        <Header lang={lang} dict={dict} />
        <main className="flex-1">{children}</main>
        <Footer lang={lang} dict={dict} />
        <WhatsAppFloat />
      </body>
    </html>
  );
}
