import type { L } from "./i18n";

// ============================================================================
//  PAGE « À PROPOS » — contenu éditable (stocké dans la table settings, id='about').
//  Repli sur ces valeurs par défaut tant que rien n'est enregistré en admin.
// ============================================================================

export interface TeamMember {
  name: string;
  role: L;
  bio?: L;
  photo?: string;
}

export interface AboutValue {
  title: L;
  text: L;
}

export interface AboutStat {
  value: string;
  label: L;
}

export interface AboutContent {
  title: L;
  lead: L;
  heroImage?: string;
  storyTitle: L;
  story1: L;
  story2: L;
  storyImage?: string;
  valuesTitle: L;
  values: AboutValue[];
  statsTitle: L;
  stats: AboutStat[];
  teamTitle: L;
  teamText: L;
  team: TeamMember[];
  ctaTitle: L;
  ctaButton: L;
}

export const about: AboutContent = {
  title: { en: "We are Madaweaver", fr: "Nous sommes Madaweaver" },
  lead: {
    en: "A Malagasy travel designer and guide weaving unforgettable journeys across Madagascar.",
    fr: "Un concepteur de voyages et guide malgache qui tisse des voyages inoubliables à travers Madagascar.",
  },
  heroImage: "",
  storyTitle: { en: "Our story", fr: "Notre histoire" },
  story1: {
    en: "Madaweaver was born from a simple belief: no one shows Madagascar like the people who call it home. What started as one guide and a battered 4×4 has grown into a trusted local agency welcoming travellers from around the world.",
    fr: "Madaweaver est né d'une conviction simple : personne ne montre Madagascar comme ceux qui y vivent. Ce qui a commencé avec un guide et un 4×4 fatigué est devenu une agence locale de confiance qui accueille des voyageurs du monde entier.",
  },
  story2: {
    en: "The name says it all — 'Mada' for Madagascar, 'weaver' for the way we thread together landscapes, cultures and encounters into a single, seamless journey. Every tour is woven by hand.",
    fr: "Le nom dit tout — « Mada » pour Madagascar, « weaver » (tisserand) pour la façon dont nous entrelaçons paysages, cultures et rencontres en un seul voyage fluide. Chaque circuit est tissé à la main.",
  },
  storyImage: "",
  valuesTitle: { en: "What drives us", fr: "Ce qui nous anime" },
  values: [
    {
      title: { en: "Authenticity", fr: "Authenticité" },
      text: {
        en: "Real encounters over tourist checklists. We take you where the island truly lives.",
        fr: "De vraies rencontres plutôt que des cases à cocher. On vous emmène là où l'île vit vraiment.",
      },
    },
    {
      title: { en: "Sustainability", fr: "Durabilité" },
      text: {
        en: "Low-impact travel that funds conservation and local livelihoods.",
        fr: "Un voyage à faible impact qui finance la conservation et les communautés locales.",
      },
    },
    {
      title: { en: "Care", fr: "Attention" },
      text: {
        en: "Small groups, personal attention, and a team that treats you like family.",
        fr: "Petits groupes, attention personnelle, et une équipe qui vous traite comme sa famille.",
      },
    },
  ],
  statsTitle: { en: "In numbers", fr: "En chiffres" },
  stats: [
    { value: "10+", label: { en: "Years of experience", fr: "Ans d'expérience" } },
    { value: "120+", label: { en: "Tours crafted", fr: "Circuits conçus" } },
    { value: "2 500+", label: { en: "Happy travellers", fr: "Voyageurs heureux" } },
    { value: "100%", label: { en: "Local guides", fr: "Guides locaux" } },
  ],
  teamTitle: { en: "The people behind your trip", fr: "Les visages de votre voyage" },
  teamText: {
    en: "Guide, driver, naturalist and planner — passionate about sharing the island.",
    fr: "Guide, chauffeur, naturaliste et organisateur — passionné par le partage de l'île.",
  },
  team: [
    {
      name: "Madaweaver",
      role: { en: "Founder & guide", fr: "Fondateur & guide" },
      bio: {
        en: "Founder of the agency and your guide on the ground — born and raised in Madagascar.",
        fr: "Fondateur de l'agence et votre guide sur le terrain — né et grandi à Madagascar.",
      },
      photo: "",
    },
  ],
  ctaTitle: { en: "Let's build your adventure together", fr: "Construisons votre aventure ensemble" },
  ctaButton: { en: "Get in touch", fr: "Nous contacter" },
};
