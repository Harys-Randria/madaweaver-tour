import type { Metadata } from "next";
import { Playfair_Display, Plus_Jakarta_Sans } from "next/font/google";
import "../globals.css";

const display = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display-src",
  weight: ["500", "600", "700"],
  display: "swap",
});

const body = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-body-src",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Admin · Madaweaver Tour",
  robots: { index: false, follow: false },
};

export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={`${display.variable} ${body.variable}`}>
      <body className="min-h-dvh bg-sand-100 text-ink antialiased">{children}</body>
    </html>
  );
}
