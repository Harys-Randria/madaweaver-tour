import type { L } from "./i18n";

// ============================================================================
//  TÉMOIGNAGES — avis clients bilingues EN / FR.
//  Repli local si Supabase n'est pas configuré (voir lib/data.ts).
// ============================================================================

export interface Testimonial {
  quote: L;
  author: string;
  origin: L;
}

export const testimonials: Testimonial[] = [
  {
    quote: {
      en: "The most seamless, soulful trip we've ever taken. Our guide felt like family by the end.",
      fr: "Le voyage le plus fluide et le plus authentique que nous ayons fait. Notre guide était devenu une famille.",
    },
    author: "Sophie & Marc",
    origin: { en: "France", fr: "France" },
  },
  {
    quote: {
      en: "Standing under the baobabs at sunset is something I'll never forget. Flawless organisation.",
      fr: "Se tenir sous les baobabs au coucher du soleil, je ne l'oublierai jamais. Organisation parfaite.",
    },
    author: "James T.",
    origin: { en: "United Kingdom", fr: "Royaume-Uni" },
  },
  {
    quote: {
      en: "They tailored everything to us — the lemurs, the beaches, the food. Pure magic.",
      fr: "Tout a été taillé sur-mesure pour nous — les lémuriens, les plages, la cuisine. Pure magie.",
    },
    author: "Anna K.",
    origin: { en: "Germany", fr: "Allemagne" },
  },
];
