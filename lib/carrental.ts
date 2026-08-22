import type { L } from "./i18n";

// ============================================================================
//  SERVICE « LOCATION DE VOITURE » — contenu éditable (settings, id='carrental').
// ============================================================================

export interface CarOption {
  title: L;
  text: L;
}

export interface Vehicle {
  name: string;
  description: L;
  priceWithDriver?: string; // tarif journalier avec chauffeur (ex. "€90 / jour")
  priceWithoutDriver?: string; // tarif journalier sans chauffeur
  images: string[];
}

export interface CarRentalContent {
  title: L;
  intro: L;
  heroImage?: string;
  options: CarOption[];
  vehicles: Vehicle[];
  ctaTitle: L;
  ctaText: L;
}

export const carRental: CarRentalContent = {
  title: { en: "Car rental", fr: "Location de voiture" },
  intro: {
    en: "Rent a reliable vehicle for your Madagascar trip — with or without a driver. Well-maintained 4×4s and cars, fair rates, and the local know-how to travel with peace of mind.",
    fr: "Louez un véhicule fiable pour votre voyage à Madagascar — avec ou sans chauffeur. Des 4×4 et voitures bien entretenus, des tarifs justes, et le savoir-faire local pour rouler l'esprit tranquille.",
  },
  heroImage: "",
  options: [
    {
      title: { en: "With a driver", fr: "Avec chauffeur" },
      text: {
        en: "A professional Malagasy driver who knows the roads, the routes and the language. Sit back and enjoy the journey in full safety.",
        fr: "Un chauffeur malgache professionnel qui connaît les routes, les itinéraires et la langue. Détendez-vous et profitez du voyage en toute sécurité.",
      },
    },
    {
      title: { en: "Without a driver (self-drive)", fr: "Sans chauffeur (en autonomie)" },
      text: {
        en: "Prefer your own pace? Drive yourself with a well-maintained vehicle and our route advice. (Subject to conditions.)",
        fr: "Vous préférez votre propre rythme ? Conduisez vous-même avec un véhicule bien entretenu et nos conseils d'itinéraire. (Sous conditions.)",
      },
    },
  ],
  vehicles: [
    {
      name: "4×4 Toyota Land Cruiser",
      description: {
        en: "The reference for Madagascar's tracks — robust, comfortable, ideal for the RN7, Tsingy and remote routes.",
        fr: "La référence sur les pistes de Madagascar — robuste, confortable, idéal pour la RN7, les Tsingy et les routes reculées.",
      },
      priceWithDriver: "",
      priceWithoutDriver: "",
      images: [],
    },
    {
      name: "Minibus / Van",
      description: {
        en: "Comfortable for families and small groups, with room for luggage.",
        fr: "Confortable pour les familles et petits groupes, avec de la place pour les bagages.",
      },
      priceWithDriver: "",
      priceWithoutDriver: "",
      images: [],
    },
  ],
  ctaTitle: { en: "Need a vehicle for your trip?", fr: "Besoin d'un véhicule pour votre voyage ?" },
  ctaText: {
    en: "Tell us your dates and route — we'll send you a tailored quote.",
    fr: "Dites-nous vos dates et votre itinéraire — nous vous envoyons un devis sur mesure.",
  },
};
