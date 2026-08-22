import Link from "next/link";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Page introuvable · Madaweaver Tour",
  description: "Cette page n'existe pas / This page does not exist.",
};

// Page 404 pour toute URL inconnue. Elle court-circuite le layout : elle doit
// donc renvoyer un document HTML complet (<html> + <body>).
export default function GlobalNotFound() {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body className="min-h-dvh bg-cream text-ink antialiased">
        <main className="mx-auto flex min-h-dvh max-w-xl flex-col items-center justify-center px-6 text-center">
          <p className="text-6xl font-semibold tracking-tight text-baobab">404</p>
          <h1 className="mt-4 text-2xl font-semibold">Page introuvable · Page not found</h1>
          <p className="mt-3 text-ink-soft">
            La page que vous cherchez n&apos;existe pas ou a été déplacée.
            <br />
            The page you are looking for doesn&apos;t exist or has moved.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href="/fr"
              className="rounded-full bg-baobab px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90"
            >
              Accueil
            </Link>
            <Link
              href="/en"
              className="rounded-full border border-baobab px-6 py-3 text-sm font-semibold text-baobab transition hover:bg-baobab hover:text-white"
            >
              Home
            </Link>
          </div>
        </main>
      </body>
    </html>
  );
}
