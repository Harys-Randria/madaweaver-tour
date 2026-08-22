import type { MetadataRoute } from "next";
import { getAllCircuits, getAllDestinations, getSettings } from "@/lib/data";
import { locales } from "@/lib/i18n";

// Génère le sitemap bilingue (EN/FR) avec liens alternates hreflang pour Google.
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { url } = await getSettings();
  const [circuits, destinations] = await Promise.all([
    getAllCircuits(),
    getAllDestinations(),
  ]);

  // Chemins statiques (sans le préfixe de langue) + priorité indicative.
  const staticPaths: { path: string; priority: number; freq: MetadataRoute.Sitemap[number]["changeFrequency"] }[] = [
    { path: "", priority: 1, freq: "weekly" },
    { path: "/circuits", priority: 0.9, freq: "weekly" },
    { path: "/destinations", priority: 0.8, freq: "monthly" },
    { path: "/location", priority: 0.7, freq: "monthly" },
    { path: "/gallery", priority: 0.6, freq: "monthly" },
    { path: "/sur-mesure", priority: 0.7, freq: "monthly" },
    { path: "/about", priority: 0.5, freq: "yearly" },
    { path: "/contact", priority: 0.6, freq: "yearly" },
    { path: "/legal/mentions-legales", priority: 0.2, freq: "yearly" },
    { path: "/legal/confidentialite", priority: 0.2, freq: "yearly" },
    { path: "/legal/cookies", priority: 0.2, freq: "yearly" },
  ];

  const dynamicPaths: { path: string; priority: number; freq: MetadataRoute.Sitemap[number]["changeFrequency"] }[] = [
    ...circuits.map((c) => ({ path: `/circuits/${c.slug}`, priority: 0.8, freq: "monthly" as const })),
    ...destinations.map((d) => ({ path: `/destinations/${d.slug}`, priority: 0.6, freq: "monthly" as const })),
  ];

  const all = [...staticPaths, ...dynamicPaths];
  const now = new Date();

  // Une entrée par langue, avec les alternates hreflang vers l'autre langue.
  return all.flatMap(({ path, priority, freq }) =>
    locales.map((lang) => ({
      url: `${url}/${lang}${path}`,
      lastModified: now,
      changeFrequency: freq,
      priority,
      alternates: {
        languages: Object.fromEntries(
          locales.map((l) => [l, `${url}/${l}${path}`]),
        ),
      },
    })),
  );
}
