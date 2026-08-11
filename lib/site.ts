import type { L } from "./i18n";

// ============================================================================
//  CONFIGURATION GLOBALE DU SITE — Madaweaver Tour
//  👉 Valeurs par défaut. Si Supabase est configuré, elles sont surchargées
//     par la table `settings` (éditable depuis /admin/settings).
// ============================================================================

export type SiteSettings = {
  name: string;
  url: string;
  tagline: L;
  description: L;
  contact: { whatsapp: string; phoneDisplay: string; email: string; address: string };
  social: { facebook: string; instagram: string; tripadvisor: string; youtube: string };
  reviews: { rating: L; count: L };
};

export const site = {
  name: "Madaweaver Tour",
  url: "https://madaweaver-tour.mg",

  tagline: {
    en: "Weaving your finest journeys across Madagascar",
    fr: "Tisser vos plus beaux voyages à Madagascar",
  } satisfies L,

  description: {
    en: "Local travel agency in Madagascar. Tailor-made tours: baobabs, lemurs, tsingy, paradise beaches. Book your Malagasy adventure.",
    fr: "Agence de voyage locale à Madagascar. Circuits sur-mesure : baobabs, lémuriens, tsingy, plages paradisiaques. Réservez votre aventure malgache.",
  } satisfies L,

  // 📞 Coordonnées — À PERSONNALISER
  contact: {
    // Numéro WhatsApp au format international SANS le "+", sans espaces
    whatsapp: "261340000000",
    // Version affichée du numéro
    phoneDisplay: "+261 34 00 000 00",
    email: "contact@madaweaver-tour.mg",
    address: "Lot II M 85 Bis, Antananarivo 101, Madagascar",
  },

  // Réseaux sociaux (laissez "#" si non utilisé)
  social: {
    facebook: "#",
    instagram: "#",
    tripadvisor: "#",
    youtube: "#",
  },

  // Note globale affichée au-dessus des témoignages
  reviews: {
    rating: { en: "4.9/5", fr: "4,9/5" } satisfies L,
    count: { en: "based on 180+ reviews", fr: "sur 180+ avis" } satisfies L,
  },
} as const;

// ---------------------------------------------------------------------------
//  VIDÉOS YOUTUBE (globales) — 100% gratuit via youtube-nocookie.
//  Ajoutez vos vidéos ici. `id` = identifiant YouTube (ex. dans
//  https://youtu.be/ABCD1234 → l'id est "ABCD1234").
//  Laissez le tableau vide tant que vous n'avez pas de vidéo : le site
//  affichera un joli « bientôt disponible ».
// ---------------------------------------------------------------------------
export type VideoItem = { id: string; title: L };

export const videos: VideoItem[] = [
  // Exemple :
  // { id: "ABCD1234xyz", title: { en: "Baobabs at sunset", fr: "Baobabs au coucher du soleil" } },
];

/** Construit un lien WhatsApp "cliquer pour discuter" avec message pré-rempli. */
export function whatsappLink(whatsapp: string, message?: string): string {
  const base = `https://wa.me/${whatsapp}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

/** Construit un lien mailto avec sujet + corps pré-remplis. */
export function mailtoLink(email: string, subject?: string, body?: string): string {
  const params = new URLSearchParams();
  if (subject) params.set("subject", subject);
  if (body) params.set("body", body);
  const query = params.toString();
  return `mailto:${email}${query ? `?${query}` : ""}`;
}
