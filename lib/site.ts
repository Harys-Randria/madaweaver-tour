import type { L } from "./i18n";

// ============================================================================
//  CONFIGURATION GLOBALE DU SITE — Madaweaver Tour
//  👉 Modifiez ici vos coordonnées : elles se propagent sur tout le site.
// ============================================================================

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
export function whatsappLink(message?: string): string {
  const base = `https://wa.me/${site.contact.whatsapp}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

/** Construit un lien mailto avec sujet + corps pré-remplis. */
export function mailtoLink(subject?: string, body?: string): string {
  const params = new URLSearchParams();
  if (subject) params.set("subject", subject);
  if (body) params.set("body", body);
  const query = params.toString();
  return `mailto:${site.contact.email}${query ? `?${query}` : ""}`;
}
