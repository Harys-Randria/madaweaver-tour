import type { Metadata } from "next";
import { Playfair_Display, Plus_Jakarta_Sans } from "next/font/google";
import "../globals.css";
import { locales, isLocale, type Locale } from "@/lib/i18n";
import { getDictionary } from "@/lib/dictionaries";
import { getSettings } from "@/lib/data";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import { SettingsProvider } from "@/components/SettingsProvider";
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
  const s = await getSettings();
  return {
    metadataBase: new URL(s.url),
    title: {
      default: `${s.name} — ${s.tagline[locale]}`,
      template: `%s · ${s.name}`,
    },
    description: s.description[locale],
    alternates: {
      languages: { en: "/en", fr: "/fr" },
    },
    openGraph: {
      title: `${s.name} — ${s.tagline[locale]}`,
      description: s.description[locale],
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
  const settings = await getSettings();

  return (
    <html lang={lang} className={`${display.variable} ${body.variable}`}>
      <body className="min-h-dvh flex flex-col bg-cream text-ink">
        <SettingsProvider settings={settings}>
          <Header lang={lang} dict={dict} />
          <main className="flex-1">{children}</main>
          <Footer lang={lang} dict={dict} settings={settings} />
          <WhatsAppFloat />
        </SettingsProvider>
      </body>
    </html>
  );
}
