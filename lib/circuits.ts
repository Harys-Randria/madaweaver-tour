import type { L, Locale } from "./i18n";
import { t } from "./i18n";

// ============================================================================
//  DONNÉES DES CIRCUITS — bilingues EN / FR
//  Circuits réels adaptés de Calm Adventure Tours (avec autorisation de l'owner).
//  Prix en euros. Ajoutez / modifiez vos circuits ici. Aucun back-end requis.
// ============================================================================

export type Category = "wildlife" | "beach" | "adventure" | "culture" | "nature";

/** Clé de palette pour l'illustration d'ambiance (voir components/Scenery.tsx). */
export type Tone = "sunset" | "forest" | "canyon" | "ocean" | "highland";

/** Grandes régions de l'île (carte interactive + filtre). */
export type MacroRegion = "north" | "highlands" | "west" | "east" | "south";

export interface ItineraryStep {
  day: L;
  title: L;
  description: L;
  // Coordonnées optionnelles pour la carte interactive (lignes entre étapes).
  lat?: number;
  lng?: number;
}

export interface Circuit {
  slug: string;
  title: L;
  region: string;
  category: Category;
  tone: Tone;
  /** Grandes régions traversées (pour la carte interactive & le filtre région). */
  macroRegions?: MacroRegion[];
  durationDays: number;
  priceFrom: number; // à partir de, en euros
  groupMax: number;
  difficulty: 1 | 2 | 3; // 1 facile · 2 modéré · 3 sportif
  featured?: boolean;
  /** Chemin optionnel vers une vraie photo dans /public (ex: "/images/baobabs.webp"). */
  image?: string;
  /** Photos réelles optionnelles pour la galerie du circuit (chemins /public). */
  gallery?: string[];
  /** IDs YouTube optionnels propres à ce circuit. */
  videos?: string[];
  summary: L;
  description: L;
  highlights: L<string[]>;
  itinerary: ItineraryStep[];
  included: L<string[]>;
  notIncluded: L<string[]>;
  bestSeason: L;
  /** Prix réel non communiqué à la source → estimation à confirmer. */
  priceEstimated?: boolean;
}

export const CATEGORIES: { key: Category; label: L; emoji: string }[] = [
  { key: "wildlife", label: { en: "Wildlife", fr: "Faune" }, emoji: "🦉" },
  { key: "beach", label: { en: "Beaches", fr: "Plages" }, emoji: "🏝️" },
  { key: "adventure", label: { en: "Adventure", fr: "Aventure" }, emoji: "🥾" },
  { key: "culture", label: { en: "Culture", fr: "Culture" }, emoji: "🎭" },
  { key: "nature", label: { en: "Nature", fr: "Nature" }, emoji: "🌿" },
];

export const DIFFICULTY_LABEL: Record<1 | 2 | 3, L> = {
  1: { en: "Easy", fr: "Facile" },
  2: { en: "Moderate", fr: "Modéré" },
  3: { en: "Sporty", fr: "Sportif" },
};

export const circuits: Circuit[] = [
  // ==========================================================================
  //  #20 — Andasibe Rainforest (2 jours)
  // ==========================================================================
  {
    slug: "andasibe-rainforest-2d",
    macroRegions: ["east"],
    gallery: ["/images/andasibe-rainforest-2d-1.webp", "/images/andasibe-rainforest-2d-2.webp", "/images/andasibe-rainforest-2d-3.webp"],
    title: { en: "Andasibe Rainforest — Lemurs & Culture", fr: "Forêt d'Andasibe — Lémuriens & Culture" },
    region: "Andasibe",
    category: "wildlife",
    tone: "forest",
    durationDays: 2,
    priceFrom: 335,
    groupMax: 14,
    difficulty: 1,
    featured: true,
    summary: {
      en: "A short, soulful escape into the eastern rainforest — meet the Indri, the world's largest lemur, and get up close on Lemur Island.",
      fr: "Une échappée courte et intense dans la forêt tropicale de l'Est — rencontrez l'Indri, le plus grand lémurien du monde, et approchez les lémuriens sur l'Île aux Lémuriens.",
    },
    description: {
      en: "Embark on an unforgettable two-day adventure to Andasibe National Park, one of Madagascar's most renowned natural treasures. Nestled in the lush eastern rainforest, this park is a haven for biodiversity, home to endemic flora and fauna. Immerse yourself in a preserved ecosystem where lemurs leap through the canopy, chameleons blend into their surroundings and rare birds call from the treetops. The highlight: the mesmerising call of the Indri, the largest living lemur, echoing through the forest.",
      fr: "Vivez une aventure inoubliable de deux jours au parc national d'Andasibe, l'un des trésors naturels les plus réputés de Madagascar. Niché dans la luxuriante forêt tropicale de l'Est, ce parc est un havre de biodiversité, riche d'une flore et d'une faune endémiques. Immergez-vous dans un écosystème préservé où les lémuriens bondissent dans la canopée, les caméléons se fondent dans leur environnement et les oiseaux rares chantent depuis la cime des arbres. Point d'orgue : l'appel envoûtant de l'Indri, le plus grand lémurien vivant, résonnant à travers la forêt.",
    },
    highlights: {
      en: ["Home of Madagascar's reptiles", "Hear the Indri's call", "Explore famous Lemur Island", "Immerse in local culture"],
      fr: ["Le royaume des reptiles de Madagascar", "Entendre l'appel de l'Indri", "L'Île aux Lémuriens", "Immersion dans la culture locale"],
    },
    itinerary: [
      {
        day: { en: "Day 1", fr: "Jour 1" },
        title: { en: "Antananarivo → Andasibe (140 km, ~4h)", fr: "Antananarivo → Andasibe (140 km, ~4h)" },
        description: {
          en: "Morning pickup from your hotel in Tana and departure towards the eastern rainforest through beautiful landscapes. En route, visit Peyrieras Reserve — brilliantly coloured chameleons, geckos, snakes and crocodiles, a perfect introduction to the island's biodiversity. Reach Andasibe by afternoon and head to Vakona Private Reserve and its famous 'Lemur Island', where you meet Madagascar's most famous primates up close. As night falls, a guided night walk in the VOIMMA Reserve reveals mouse lemurs and tree frogs. Overnight at Relais de Mantadia or Mantadia Lodge.",
          fr: "Prise en charge le matin à votre hôtel de Tana et départ vers la forêt tropicale de l'Est à travers de superbes paysages. En chemin, visite de la réserve de Peyrieras — caméléons aux couleurs éclatantes, geckos, serpents et crocodiles, une parfaite introduction à la biodiversité de l'île. Arrivée à Andasibe dans l'après-midi, puis découverte de la réserve privée de Vakona et sa fameuse « Île aux Lémuriens », où vous approchez de près les primates les plus célèbres de Madagascar. À la tombée de la nuit, une marche nocturne guidée dans la réserve de VOIMMA dévoile microcèbes et grenouilles arboricoles. Nuit au Relais de Mantadia ou au Mantadia Lodge.",
        },
      },
      {
        day: { en: "Day 2", fr: "Jour 2" },
        title: { en: "Analamazaotra Park → return to Antananarivo", fr: "Parc d'Analamazaotra → retour à Antananarivo" },
        description: {
          en: "After breakfast, a guided trek in Analamazaotra Special Reserve, home to the Indri, the world's largest lemur — observe these extraordinary primates in their natural habitat, their echoing calls resonating through the misty forest. Then visit Andasibe Village to experience daily life and traditions, from craftsmanship to local markets. Enjoy lunch before the drive back to Antananarivo.",
          fr: "Après le petit-déjeuner, randonnée guidée dans la réserve spéciale d'Analamazaotra, refuge de l'Indri, le plus grand lémurien du monde — observez ces primates extraordinaires dans leur habitat naturel, leurs cris puissants résonnant dans la forêt brumeuse. Puis visite du village d'Andasibe à la rencontre de la vie quotidienne et des traditions locales, de l'artisanat aux marchés. Déjeuner avant le retour vers Antananarivo.",
        },
      },
    ],
    included: {
      en: ["Accommodation with breakfast", "Tourist taxes", "Park & reserve entrance fees", "Private vehicle with driver-guide", "Local guides for park visits"],
      fr: ["Hébergement avec petit-déjeuner", "Taxes touristiques", "Droits d'entrée des parcs et réserves", "Véhicule privé avec chauffeur-guide", "Guides locaux pour les visites de parc"],
    },
    notIncluded: {
      en: ["Accommodation in Antananarivo", "Tips and personal expenses", "Lunch and dinner during the tour"],
      fr: ["Hébergement à Antananarivo", "Pourboires et dépenses personnelles", "Déjeuners et dîners pendant le circuit"],
    },
    bestSeason: { en: "All year round", fr: "Toute l'année" },
  },

  // ==========================================================================
  //  #21 — Baobabs, Tsingy & Rainforest (9 jours)
  // ==========================================================================
  {
    slug: "baobabs-tsingy-rainforest-9d",
    macroRegions: ["west", "east"],
    gallery: ["/images/baobabs-tsingy-rainforest-9d-1.webp", "/images/baobabs-tsingy-rainforest-9d-2.webp", "/images/baobabs-tsingy-rainforest-9d-3.webp"],
    title: { en: "Baobabs, Tsingy & Rainforest", fr: "Baobabs, Tsingy & Forêt tropicale" },
    region: "Morondava · Bemaraha · Andasibe",
    category: "adventure",
    tone: "sunset",
    durationDays: 9,
    priceFrom: 2170,
    groupMax: 14,
    difficulty: 3,
    featured: true,
    summary: {
      en: "Nine days across western and eastern Madagascar: the Avenue of the Baobabs at sunset, the UNESCO Tsingy de Bemaraha, and the Indri lemurs of Andasibe.",
      fr: "Neuf jours entre l'ouest et l'est de Madagascar : l'Allée des Baobabs au coucher du soleil, les Tsingy de Bemaraha classés UNESCO et les indris d'Andasibe.",
    },
    description: {
      en: "A thrilling 9-day journey through western and eastern Madagascar, exploring iconic landscapes, unique wildlife and vibrant culture. Fly to Morondava and visit Kirindy Reserve, home to the elusive fossa. Cross rugged terrain to Bekopaka to marvel at the UNESCO-listed Tsingy de Bemaraha, with its limestone pinnacles, caves and suspension bridges. Witness the legendary sunset at the Avenue of the Baobabs before returning to Antananarivo and continuing to the Andasibe rainforest to trek among Indri lemurs and explore nocturnal wildlife on guided night walks.",
      fr: "Un voyage palpitant de 9 jours à travers l'ouest et l'est de Madagascar, à la découverte de paysages iconiques, d'une faune unique et d'une culture vibrante. Vol vers Morondava et visite de la réserve de Kirindy, refuge de l'insaisissable fossa. Franchissez des pistes accidentées jusqu'à Bekopaka pour admirer les Tsingy de Bemaraha, classés UNESCO, avec leurs aiguilles calcaires, leurs grottes et leurs ponts suspendus. Assistez au coucher de soleil légendaire sur l'Allée des Baobabs avant de revenir à Antananarivo, puis de rejoindre la forêt d'Andasibe pour marcher parmi les indris et partir à la rencontre de la faune nocturne.",
    },
    highlights: {
      en: ["Encounter the elusive fossa", "Trek the Tsingy de Bemaraha", "A magical baobab sunset", "Into the Andasibe rainforest"],
      fr: ["Rencontrer l'insaisissable fossa", "Explorer les Tsingy de Bemaraha", "Coucher de soleil magique sur les baobabs", "Au cœur de la forêt d'Andasibe"],
    },
    itinerary: [
      {
        day: { en: "Day 1", fr: "Jour 1" },
        title: { en: "Arrival at Antananarivo (TNR)", fr: "Arrivée à Antananarivo (TNR)" },
        description: {
          en: "Our agent greets you at the airport and helps with anything you need — SIM card, currency exchange — before transferring you to your hotel. Overnight at Sakamanga Hotel.",
          fr: "Notre agent vous accueille à l'aéroport et vous aide pour tout besoin — carte SIM, change — avant de vous transférer à votre hôtel. Nuit à l'hôtel Sakamanga.",
        },
      },
      {
        day: { en: "Day 2", fr: "Jour 2" },
        title: { en: "Antananarivo → Morondava → Kirindy", fr: "Antananarivo → Morondava → Kirindy" },
        description: {
          en: "Fly to Morondava, meet your driver and head into town for lunch, then on to Kirindy Reserve with a photo stop at the iconic Avenue of the Baobabs. After check-in, a night walk to spot fat-tailed dwarf lemurs and grey mouse lemurs. Overnight at Relais du Kirindy.",
          fr: "Vol vers Morondava, accueil par votre chauffeur et déjeuner en ville, puis route vers la réserve de Kirindy avec un arrêt photo à la célèbre Allée des Baobabs. Après l'installation, marche nocturne à la recherche du microcèbe roux et du microcèbe gris. Nuit au Relais du Kirindy.",
        },
      },
      {
        day: { en: "Day 3", fr: "Jour 3" },
        title: { en: "Kirindy → Belo → Bekopaka (180 km, 7h)", fr: "Kirindy → Belo → Bekopaka (180 km, 7h)" },
        description: {
          en: "Morning visit of Kirindy Reserve, famous for the fossa, Madagascar's largest predator; by day, watch Verreaux's sifakas and red-fronted lemurs leap between the trees. Drive on through baobab forests and red earth, cross the Tsiribihina river by ferry to Belo for lunch, then four more hours on the mud road to Bekopaka. Overnight at Soleil des Tsingy.",
          fr: "Visite matinale de la réserve de Kirindy, réputée pour le fossa, le plus grand prédateur de Madagascar ; en journée, observez les propithèques de Verreaux et les lémuriens à front roux bondir entre les arbres. Route à travers les forêts de baobabs et la terre rouge, traversée du fleuve Tsiribihina en bac jusqu'à Belo pour le déjeuner, puis quatre heures de piste jusqu'à Bekopaka. Nuit au Soleil des Tsingy.",
        },
      },
      {
        day: { en: "Day 4", fr: "Jour 4" },
        title: { en: "Grand Tsingy", fr: "Grand Tsingy" },
        description: {
          en: "Drive to the start of the Grands Tsingy (17 km of bumpy track, 1–2h). The roughly 4-hour 'Andamozavakay' circuit is a slow-paced observational walk — no particular fitness required, but not ideal for those prone to vertigo. Explore secondary forest, caves (bring a headlamp), panoramic viewpoints and a suspension bridge, safely harnessed. Overnight at Soleil des Tsingy.",
          fr: "Route jusqu'au départ des Grands Tsingy (17 km de piste cahoteuse, 1 à 2h). Le circuit « Andamozavakay », d'environ 4h, est une marche d'observation au rythme tranquille — sans condition physique particulière, mais déconseillée en cas de vertige. Forêts secondaires, grottes (prévoir une lampe frontale), points de vue panoramiques et pont suspendu, harnaché en toute sécurité. Nuit au Soleil des Tsingy.",
        },
      },
      {
        day: { en: "Day 5", fr: "Jour 5" },
        title: { en: "Bekopaka → Morondava (200 km, 9h)", fr: "Bekopaka → Morondava (200 km, 9h)" },
        description: {
          en: "Head back south by 4WD and ferry (about 9 hours). Pass the Sakalava tombs, known for their unusual paintings and carvings, and stop again at the Avenue of the Baobabs for a spectacular sunset — the perfect photo moment. Overnight in Morondava at Baobab Café Hotel.",
          fr: "Retour vers le sud en 4×4 et bac (environ 9h). Passage devant les tombeaux Sakalava, réputés pour leurs peintures et sculptures singulières, et nouvel arrêt à l'Allée des Baobabs pour un coucher de soleil spectaculaire — le moment photo parfait. Nuit à Morondava, au Baobab Café Hotel.",
        },
      },
      {
        day: { en: "Day 6", fr: "Jour 6" },
        title: { en: "Morondava → Antananarivo (flight) → Andasibe", fr: "Morondava → Antananarivo (vol) → Andasibe" },
        description: {
          en: "Fly back to Antananarivo, then drive to Andasibe through scenic villages, golden grasslands and lush rice paddies, discovering colourful clay houses, local markets and authentic Malagasy culture. Overnight at Relais de Mantadia.",
          fr: "Vol retour vers Antananarivo, puis route vers Andasibe à travers villages pittoresques, prairies dorées et rizières verdoyantes, à la découverte des maisons de brique colorées, des marchés locaux et de la culture malgache authentique. Nuit au Relais de Mantadia.",
        },
      },
      {
        day: { en: "Day 7", fr: "Jour 7" },
        title: { en: "Andasibe National Park", fr: "Parc national d'Andasibe" },
        description: {
          en: "Guided morning trek in Analamazaotra Reserve to find the Indri, the world's largest lemur, its calls echoing through the misty forest. In the afternoon, meet friendly lemurs on Lemur Island at Vakona and watch crocodiles from safe platforms. After dark, a guided night walk in VOIMMA reveals mouse lemurs and tree frogs. Overnight at Relais de Mantadia.",
          fr: "Randonnée guidée le matin dans la réserve d'Analamazaotra à la rencontre de l'Indri, le plus grand lémurien du monde, dont les cris résonnent dans la forêt brumeuse. L'après-midi, approche des lémuriens sur l'Île aux Lémuriens de Vakona et observation des crocodiles depuis des plateformes sécurisées. À la nuit tombée, marche nocturne guidée à VOIMMA (microcèbes, grenouilles arboricoles). Nuit au Relais de Mantadia.",
        },
      },
      {
        day: { en: "Day 8", fr: "Jour 8" },
        title: { en: "Andasibe → Antananarivo (140 km, 4h)", fr: "Andasibe → Antananarivo (140 km, 4h)" },
        description: {
          en: "Drive back to Antananarivo past the Angavo mountains and lively market villages — great photo stops. On arrival, a guided city walk through vibrant streets and markets, ending at the hilltop Manjakamiadana, the former royal palace with panoramic views over the capital. Overnight at Sakamanga Hotel.",
          fr: "Retour vers Antananarivo en longeant les massifs de l'Angavo et des villages animés de marchés colorés — parfaits pour la photo. À l'arrivée, visite guidée à pied de la ville, de ses rues vivantes et de ses marchés, jusqu'au palais royal de Manjakamiadana, perché, offrant une vue panoramique sur la capitale. Nuit à l'hôtel Sakamanga.",
        },
      },
      {
        day: { en: "Day 9", fr: "Jour 9" },
        title: { en: "International departure", fr: "Départ international" },
        description: {
          en: "Your tour comes to an end. We arrange your transfer back to Ivato Airport. Safe travels, with cherished memories of Madagascar.",
          fr: "Votre circuit touche à sa fin. Nous organisons votre transfert vers l'aéroport d'Ivato. Bon retour, avec de précieux souvenirs de Madagascar.",
        },
      },
    ],
    included: {
      en: ["Accommodation with breakfast", "Air-conditioned 4WD including fuel", "Guide", "Domestic flights", "Entry fees to all mentioned parks", "Local guides", "Ferry crossings"],
      fr: ["Hébergement avec petit-déjeuner", "4×4 climatisé, carburant inclus", "Guide", "Vols intérieurs", "Droits d'entrée de tous les parcs cités", "Guides locaux", "Traversées en bac"],
    },
    notIncluded: {
      en: ["Drinks", "Tips and personal purchases", "All meals (lunches and dinners)", "Travel insurance and visa", "International flights"],
      fr: ["Boissons", "Pourboires et achats personnels", "Tous les repas (déjeuners et dîners)", "Assurance voyage et visa", "Vols internationaux"],
    },
    bestSeason: { en: "May to November", fr: "De mai à novembre" },
  },

  // ==========================================================================
  //  #22 — Road Trip: Lemurs, Landscapes & Adventure (10 jours)
  // ==========================================================================
  {
    slug: "madagascar-road-trip-10d",
    macroRegions: ["highlands", "south"],
    gallery: ["/images/madagascar-road-trip-10d-1.webp", "/images/madagascar-road-trip-10d-2.webp", "/images/madagascar-road-trip-10d-3.webp"],
    title: { en: "Road Trip — Lemurs, Landscapes & Adventure", fr: "Road trip — Lémuriens, paysages & aventure" },
    region: "Tana → Ifaty (RN7)",
    category: "nature",
    tone: "highland",
    durationDays: 10,
    priceFrom: 1850,
    groupMax: 14,
    difficulty: 1,
    featured: false,
    summary: {
      en: "Ten days down the legendary RN7: highland crafts, the rainforest of Ranomafana, ring-tailed lemurs at Anja, the canyons of Isalo and the lagoon of Ifaty.",
      fr: "Dix jours sur la légendaire RN7 : artisanat des hautes terres, forêt de Ranomafana, makis catta d'Anja, canyons de l'Isalo et lagon d'Ifaty.",
    },
    description: {
      en: "An extraordinary 10-day expedition through the landscapes and biodiversity of Madagascar. From Antananarivo, drive to Antsirabe through villages and rice fields, stopping in Ambositra to discover Malagasy woodcraft. Explore Ranomafana National Park, sanctuary of the endangered golden bamboo lemur, then travel via Fianarantsoa and Ambalavao to the Anja Reserve for a close encounter with ring-tailed lemurs. Hike the canyons and natural pools of Isalo, and reach the coast at Ifaty via Zombitse National Park, home to dancing sifakas and ancient baobabs.",
      fr: "Une expédition extraordinaire de 10 jours à travers les paysages et la biodiversité de Madagascar. D'Antananarivo, route vers Antsirabe entre villages et rizières, avec un arrêt à Ambositra pour découvrir l'art du bois malgache. Explorez le parc national de Ranomafana, sanctuaire du lémurien à bambou doré menacé, puis rejoignez, via Fianarantsoa et Ambalavao, la réserve d'Anja pour une rencontre rapprochée avec les makis catta. Randonnez dans les canyons et vasques naturelles de l'Isalo, et gagnez la côte à Ifaty en passant par le parc national de Zombitse, royaume des sifakas danseurs et des baobabs centenaires.",
    },
    highlights: {
      en: ["Discover Isalo Park", "Explore Ranomafana rainforest", "Home of the dancing sifakas", "Ring-tailed lemurs at Anja"],
      fr: ["Découvrir le parc de l'Isalo", "La forêt de Ranomafana", "Le pays des sifakas danseurs", "Makis catta à Anja"],
    },
    itinerary: [
      {
        day: { en: "Day 1", fr: "Jour 1" },
        title: { en: "Arrival at Antananarivo", fr: "Arrivée à Antananarivo" },
        description: {
          en: "Our agent greets you at the airport, helps with a SIM card and currency exchange, and transfers you to your hotel. Overnight at Sakamanga Hotel.",
          fr: "Notre agent vous accueille à l'aéroport, vous aide pour la carte SIM et le change, et vous transfère à votre hôtel. Nuit à l'hôtel Sakamanga.",
        },
      },
      {
        day: { en: "Day 2", fr: "Jour 2" },
        title: { en: "Antananarivo → Antsirabe (170 km, 4h)", fr: "Antananarivo → Antsirabe (170 km, 4h)" },
        description: {
          en: "Drive south to Antsirabe along a scenic route of villages and rice fields. Stop at Ambatolampy, known for its aluminium craftsmanship, then after lunch explore Lakes Andraikiba and Tritriva — the latter perfect for a refreshing swim. Overnight at Ecolodge Chambre du Voyageur.",
          fr: "Route vers le sud jusqu'à Antsirabe, à travers villages et rizières. Arrêt à Ambatolampy, réputée pour son artisanat de l'aluminium, puis après le déjeuner, découverte des lacs Andraikiba et Tritriva — ce dernier parfait pour une baignade rafraîchissante. Nuit à l'Ecolodge Chambre du Voyageur.",
        },
      },
      {
        day: { en: "Day 3", fr: "Jour 3" },
        title: { en: "Antsirabe → Ranomafana (250 km, 7h)", fr: "Antsirabe → Ranomafana (250 km, 7h)" },
        description: {
          en: "Tour Antsirabe by rickshaw — the railway station, Hôtel des Thermes and craft workshops — then continue to Ambositra, capital of Malagasy woodcraft, for lunch. In the afternoon, descend from the highlands to the lush east and Ranomafana, with a night walk at the forest edge to spot nocturnal species. Overnight at Hotel Thermal.",
          fr: "Découverte d'Antsirabe en pousse-pousse — la gare, l'Hôtel des Thermes et les ateliers d'artisans — puis route vers Ambositra, capitale du travail du bois malgache, pour le déjeuner. L'après-midi, descente des hautes terres vers l'est luxuriant et Ranomafana, avec une marche nocturne en lisière de forêt à la recherche des espèces nocturnes. Nuit à l'Hotel Thermal.",
        },
      },
      {
        day: { en: "Day 4", fr: "Jour 4" },
        title: { en: "Ranomafana National Park", fr: "Parc national de Ranomafana" },
        description: {
          en: "Explore Ranomafana — 'hot water' in Malagasy, for its springs. Protected since 1986, it shelters the rare golden bamboo lemur, 12 lemur species in all, and 30 endemic birds. Follow forest trails such as Varibolomena in search of bamboo lemurs and Milne-Edwards' sifakas. Overnight at Hotel Thermal.",
          fr: "Exploration de Ranomafana — « eau chaude » en malgache, pour ses sources. Protégé depuis 1986, il abrite le rare lémurien à bambou doré, 12 espèces de lémuriens au total et 30 oiseaux endémiques. Suivez des sentiers comme le Varibolomena à la recherche des lémuriens à bambou et des propithèques de Milne-Edwards. Nuit à l'Hotel Thermal.",
        },
      },
      {
        day: { en: "Day 5", fr: "Jour 5" },
        title: { en: "Ranomafana → Anja → Ranohira (360 km, 7h)", fr: "Ranomafana → Anja → Ranohira (360 km, 7h)" },
        description: {
          en: "Drive the famed RN7. Stop in Fianarantsoa, Betsileo capital of colonial architecture and lively markets, then Ambalavao for its Antemoro paper factory and zebu market. At Anja Reserve, meet ring-tailed lemurs in the wild before crossing the scenic Ihorombe plateau to Ranohira. Overnight at Le Jardin du Roy.",
          fr: "Route sur la célèbre RN7. Arrêt à Fianarantsoa, capitale betsileo à l'architecture coloniale et aux marchés animés, puis à Ambalavao pour sa fabrique de papier Antemoro et son marché aux zébus. À la réserve d'Anja, rencontre avec les makis catta en liberté avant de traverser le plateau de l'Ihorombe jusqu'à Ranohira. Nuit au Jardin du Roy.",
        },
      },
      {
        day: { en: "Day 6", fr: "Jour 6" },
        title: { en: "Isalo National Park", fr: "Parc national de l'Isalo" },
        description: {
          en: "A full day among the canyons and oases of Isalo. Hike through dramatic landscapes to natural pools and waterfalls, follow the 'Piscine Bleue et Noire' trails and their unique wildlife, and end with the mesmerising sunset over the famous Window of Isalo. Overnight at Le Jardin du Roy.",
          fr: "Une journée entière dans les canyons et oasis de l'Isalo. Randonnée à travers des paysages spectaculaires vers des piscines naturelles et des cascades, sentiers de la « Piscine Bleue et Noire » et leur faune unique, puis coucher de soleil envoûtant sur la célèbre Fenêtre de l'Isalo. Nuit au Jardin du Roy.",
        },
      },
      {
        day: { en: "Day 7", fr: "Jour 7" },
        title: { en: "Ranohira → Zombitse → Ifaty (280 km, 5h)", fr: "Ranohira → Zombitse → Ifaty (280 km, 5h)" },
        description: {
          en: "Journey to the coast, passing the sapphire town of Ilakaka and the baobabs of the south-west. Explore Zombitse National Park and see traditional Mahafaly and Antandroy tombs before reaching the tranquil fishing village of Ifaty. Overnight at La Bella Donna.",
          fr: "Route vers la côte, en passant par Ilakaka la ville du saphir et les baobabs du sud-ouest. Découverte du parc national de Zombitse et des tombeaux traditionnels mahafaly et antandroy avant d'atteindre le paisible village de pêcheurs d'Ifaty. Nuit à La Bella Donna.",
        },
      },
      {
        day: { en: "Day 8", fr: "Jour 8" },
        title: { en: "Ifaty — lagoon day", fr: "Ifaty — journée lagon" },
        description: {
          en: "A relaxing beach day: stroll golden sands as fishing pirogues drift by, swim in the reef-protected lagoon, savour fresh seafood, and end with a sunset pirogue ride. Overnight at La Bella Donna.",
          fr: "Journée détente à la plage : promenade sur le sable doré au passage des pirogues de pêche, baignade dans le lagon protégé par le récif, déjeuner de fruits de mer et balade en pirogue au coucher du soleil. Nuit à La Bella Donna.",
        },
      },
      {
        day: { en: "Day 9", fr: "Jour 9" },
        title: { en: "Ifaty → Toliara → Antananarivo (flight)", fr: "Ifaty → Toliara → Antananarivo (vol)" },
        description: {
          en: "Transfer to Toliara airport and fly to Antananarivo; transfer to your hotel. Overnight at Sakamanga Hotel.",
          fr: "Transfert à l'aéroport de Toliara et vol vers Antananarivo ; transfert à votre hôtel. Nuit à l'hôtel Sakamanga.",
        },
      },
      {
        day: { en: "Day 10", fr: "Jour 10" },
        title: { en: "International departure", fr: "Départ international" },
        description: {
          en: "Your tour comes to an end. We arrange your transfer to Ivato Airport. Safe travels!",
          fr: "Votre circuit s'achève. Nous organisons votre transfert vers l'aéroport d'Ivato. Bon retour !",
        },
      },
    ],
    included: {
      en: ["Air-conditioned 4WD transport", "Experienced driver-guide", "Accommodation in double/twin with breakfast", "Domestic flight", "Entry fees to all mentioned parks", "Compulsory local park guides", "Driver & guide's board and lodging", "Taxes"],
      fr: ["Transport en 4×4 climatisé", "Chauffeur-guide expérimenté", "Hébergement en chambre double/twin avec petit-déjeuner", "Vol intérieur", "Droits d'entrée de tous les parcs cités", "Guides locaux obligatoires dans les parcs", "Hébergement et repas du chauffeur et du guide", "Taxes"],
    },
    notIncluded: {
      en: ["Drinks", "Tips and personal purchases", "All meals (lunches and dinners)", "Travel insurance and visa", "International flights"],
      fr: ["Boissons", "Pourboires et achats personnels", "Tous les repas (déjeuners et dîners)", "Assurance voyage et visa", "Vols internationaux"],
    },
    bestSeason: { en: "All year round", fr: "Toute l'année" },
  },

  // ==========================================================================
  //  #23 — Immersive Birding & Photography Journey (24 jours)
  // ==========================================================================
  {
    slug: "birding-photography-24d",
    macroRegions: ["north", "west", "highlands", "east", "south"],
    gallery: ["/images/birding-photography-24d-1.webp", "/images/birding-photography-24d-2.webp", "/images/birding-photography-24d-3.webp"],
    title: { en: "Immersive Birding & Photography Journey", fr: "Voyage photo & ornithologie immersif" },
    region: "Ifaty · Ranomafana · Ankarafantsika · Andasibe",
    category: "wildlife",
    tone: "forest",
    durationDays: 24,
    priceFrom: 5540,
    groupMax: 8,
    difficulty: 3,
    featured: false,
    summary: {
      en: "A 24-day birding and photography expedition for serious enthusiasts — from the spiny forests of Ifaty to the hidden wetlands of Bemanevika, tracking Madagascar's rarest endemics.",
      fr: "Une expédition photo et ornithologie de 24 jours pour passionnés — des forêts épineuses d'Ifaty aux marais secrets de Bemanevika, à la recherche des endémiques les plus rares de Madagascar.",
    },
    description: {
      en: "A 24-day adventure through Madagascar's landscapes and rich birdlife. From the spiny forests of Ifaty (Long-tailed Ground Roller, Red-capped Coua) to Zombitse-Vohibasia, Ranomafana, Ankarafantsika (White-breasted Mesite, Madagascar Fish-Eagle) and the remote Bemanevika Special Reserve — last refuge of the Madagascar Pochard and Red Owl — this expedition tracks the island's rarest endemics, ending amid the calls of the Indri lemurs in Andasibe-Mantadia.",
      fr: "Une aventure de 24 jours à travers les paysages et l'avifaune de Madagascar. Des forêts épineuses d'Ifaty (rollier à longue queue, coua à tête rousse) à Zombitse-Vohibasia, Ranomafana, Ankarafantsika (mésite à poitrine blanche, pygargue de Madagascar) jusqu'à la réserve spéciale isolée de Bemanevika — dernier refuge du fuligule de Madagascar et de la phodile rousse — cette expédition traque les endémiques les plus rares de l'île, avant de s'achever au son des indris à Andasibe-Mantadia.",
    },
    highlights: {
      en: ["Andasibe & Ranomafana birds", "Isalo's unique landscapes", "Ifaty's endemic spiny-forest birds", "Bemanevika hidden gem"],
      fr: ["Oiseaux d'Andasibe & Ranomafana", "Les paysages uniques de l'Isalo", "Les endémiques d'Ifaty", "Bemanevika, joyau caché"],
    },
    itinerary: [
      { day: { en: "Day 1", fr: "Jour 1" }, title: { en: "Arrival at Antananarivo", fr: "Arrivée à Antananarivo" }, description: {
        en: "Our agent greets you at the airport, assists with a SIM card and currency exchange, and transfers you to your hotel. Overnight at Le Grand Mellis or similar.",
        fr: "Notre agent vous accueille à l'aéroport, vous aide pour la carte SIM et le change, et vous transfère à votre hôtel. Nuit au Grand Mellis ou similaire." } },
      { day: { en: "Day 2", fr: "Jour 2" }, title: { en: "Antananarivo → Toliara → Ifaty (flight + 1h)", fr: "Antananarivo → Toliara → Ifaty (vol + 1h)" }, description: {
        en: "Fly to Toliara and transfer to Ifaty. Begin birding in the spiny forests of baobabs and octopus trees — a unique habitat for sought-after endemics such as the Long-tailed Ground Roller, Subdesert Mesite, Sickle-billed Vanga and Red-capped Coua. Overnight at La Bella Donna or similar.",
        fr: "Vol vers Toliara et transfert à Ifaty. Premières observations dans les forêts épineuses de baobabs et d'« arbres pieuvres » — un habitat unique pour des endémiques recherchés : rollier à longue queue, mésite monias, vanga à bec en faucille et coua à tête rousse. Nuit à La Bella Donna ou similaire." } },
      { day: { en: "Day 3", fr: "Jour 3" }, title: { en: "Andatabo & Ifaty", fr: "Andatabo & Ifaty" }, description: {
        en: "Morning at Andatabo Forest ('La Table'), rich in aloes and euphorbias, seeking Verreaux's Coua and Red-shouldered Vanga. Back near Ifaty, explore the Mangily spiny forest and its baobabs, then a guided night walk for the Rainforest Scops Owl and grey mouse-lemur. Overnight at La Bella Donna.",
        fr: "Matinée dans la forêt d'Andatabo (« La Table »), riche en aloès et euphorbes, à la recherche du coua de Verreaux et du vanga à épaulettes rousses. De retour vers Ifaty, exploration de la forêt épineuse de Mangily et de ses baobabs, puis marche nocturne guidée (petit-duc de forêt, microcèbe gris). Nuit à La Bella Donna." } },
      { day: { en: "Day 4", fr: "Jour 4" }, title: { en: "Ifaty → Zombitse → Ranohira (300 km, 6h)", fr: "Ifaty → Zombitse → Ranohira (300 km, 6h)" }, description: {
        en: "Head to Zombitse-Vohibasia National Park, a dry deciduous forest and Important Bird Area with nearly 100 species — targets include Appert's Tetraka, Cuckoo Roller, Rufous Vanga and several couas. After a picnic lunch, continue to Isalo, watching for Madagascan Partridge and Malagasy Harrier. Overnight at Hotel H1 Isalo.",
        fr: "Route vers le parc national de Zombitse-Vohibasia, forêt sèche décidue et zone importante pour les oiseaux (près de 100 espèces) — cibles : tétraka d'Appert, courol vouroudriou, vanga roux et plusieurs couas. Après un pique-nique, route vers l'Isalo en guettant la perdrix et le busard de Madagascar. Nuit à l'Hotel H1 Isalo." } },
      { day: { en: "Day 5", fr: "Jour 5" }, title: { en: "Isalo National Park", fr: "Parc national de l'Isalo" }, description: {
        en: "Though not a top birding site, Isalo holds over 80 species, 70% endemic — Madagascar Bee-eater, Benson's Rock Thrush, Crested Drongo — alongside stunning canyon panoramas and ring-tailed lemurs. Overnight at Hotel H1 Isalo.",
        fr: "Bien que secondaire pour l'ornithologie, l'Isalo compte plus de 80 espèces, 70 % endémiques — guêpier de Madagascar, monticole de Benson, drongo huppé — avec de superbes panoramas de canyons et des makis catta. Nuit à l'Hotel H1 Isalo." } },
      { day: { en: "Day 6", fr: "Jour 6" }, title: { en: "Ranohira → Ranomafana (420 km, 8h)", fr: "Ranohira → Ranomafana (420 km, 8h)" }, description: {
        en: "Cross the Ihorombe plateau (Malagasy Harrier, Madagascan Buzzard) and stop at Anja Community Reserve, home to the island's densest population of ring-tailed lemurs. Continue via Fianarantsoa down to Ranomafana for a guided night walk (golden-brown mouse-lemur, chameleons). Overnight in Ranomafana.",
        fr: "Traversée du plateau de l'Ihorombe (busard, buse de Madagascar) et arrêt à la réserve communautaire d'Anja, plus forte concentration de makis catta de l'île. Descente via Fianarantsoa jusqu'à Ranomafana pour une marche nocturne guidée (microcèbe roux, caméléons). Nuit à Ranomafana." } },
      { day: { en: "Day 7", fr: "Jour 7" }, title: { en: "Ranomafana National Park", fr: "Parc national de Ranomafana" }, description: {
        en: "One of Madagascar's finest birding parks (over 115 species, 77% endemic). Targets include Yellow-bellied and Common Sunbird-Asity, Brown Mesite, Pollen's Vanga, Scaly Ground Roller and Velvet Asity, with lunch back at the lodge between morning and afternoon outings. Overnight at Centrest Séjour.",
        fr: "L'un des meilleurs parcs ornithologiques de Madagascar (plus de 115 espèces, 77 % endémiques). Cibles : philépitte veloutée, mésite unicolore, vanga de Pollen, brachyptérolle écaillé, entre autres. Déjeuner au lodge entre les sorties du matin et de l'après-midi. Nuit au Centrest Séjour." } },
      { day: { en: "Day 8", fr: "Jour 8" }, title: { en: "Ranomafana National Park", fr: "Parc national de Ranomafana" }, description: {
        en: "A second full day on the park trails, seeking raptors (Henst's Goshawk, Frances's Sparrowhawk), ground rollers, vangas, Blue Coua, Madagascan Pygmy Kingfisher and many endemic warblers and sunbirds. Overnight at Centrest Séjour.",
        fr: "Deuxième journée complète sur les sentiers du parc, à la recherche des rapaces (autour de Henst, épervier de Frances), brachyptérolles, vangas, coua bleu, martin-pêcheur pygmée et de nombreux endémiques. Nuit au Centrest Séjour." } },
      { day: { en: "Day 9", fr: "Jour 9" }, title: { en: "Ranomafana → Antsirabe (280 km, 7h)", fr: "Ranomafana → Antsirabe (280 km, 7h)" }, description: {
        en: "A final forest trail at dawn, then north to Ambositra — the woodcarving capital — for lunch, and on to Antsirabe in the highlands, scanning rivers for herons and Madagascan Wagtail. Overnight at Ecolodge Chambre du Voyageur.",
        fr: "Un dernier sentier forestier à l'aube, puis route vers Ambositra — capitale de la sculpture sur bois — pour le déjeuner, et continuation vers Antsirabe, dans les hautes terres, en guettant hérons et bergeronnette de Madagascar. Nuit à l'Ecolodge Chambre du Voyageur." } },
      { day: { en: "Day 10", fr: "Jour 10" }, title: { en: "Antsirabe → Antananarivo → Mahajanga (flight)", fr: "Antsirabe → Antananarivo → Mahajanga (vol)" }, description: {
        en: "Cross the highland plateau back to Antananarivo with birding stops, then a flight to Mahajanga on the north-west coast. Overnight at Coco Lodge.",
        fr: "Traversée du plateau des hautes terres jusqu'à Antananarivo, avec arrêts d'observation, puis vol vers Mahajanga, sur la côte nord-ouest. Nuit au Coco Lodge." } },
      { day: { en: "Day 11", fr: "Jour 11" }, title: { en: "Mahajanga → Ankarafantsika (125 km, 3h)", fr: "Mahajanga → Ankarafantsika (125 km, 3h)" }, description: {
        en: "Drive to Ankarafantsika, stopping at Lake Amboromalandy and rice fields for Madagascar Jacana, Malagasy Pond Heron and Humblot's Heron. Around the lodge and Lake Ravelobe, watch for the Madagascar Fish-Eagle; a night walk follows for nightjars, owls and nocturnal lemurs. Overnight at Tia Asity Lodge.",
        fr: "Route vers Ankarafantsika, avec arrêts au lac Amboromalandy et dans les rizières (jacana, crabier blanc, héron de Humblot). Autour du lodge et du lac Ravelobe, guet du pygargue de Madagascar ; marche nocturne (engoulevents, chouettes, lémuriens nocturnes). Nuit au Tia Asity Lodge." } },
      { day: { en: "Day 12", fr: "Jour 12" }, title: { en: "Ankarafantsika National Park", fr: "Parc national d'Ankarafantsika" }, description: {
        en: "A full day across the park's sections, a stronghold for endangered endemics — White-breasted Mesite, Schlegel's Asity, Van Dam's and Sickle-billed Vanga, Coquerel's Coua — plus Madagascar Ibis and Fish-Eagle, and Humblot's Heron and Madagascar Jacana at the dam. Overnight at Tia Asity Lodge.",
        fr: "Journée complète dans les différentes sections du parc, bastion d'endémiques menacés — mésite à poitrine blanche, philépitte de Schlegel, vangas de Van Dam et à bec en faucille, coua de Coquerel — ainsi qu'ibis et pygargue de Madagascar, et héron de Humblot et jacana au barrage. Nuit au Tia Asity Lodge." } },
      { day: { en: "Day 13", fr: "Jour 13" }, title: { en: "Ankarafantsika → Antsohihy (340 km, 10h)", fr: "Ankarafantsika → Antsohihy (340 km, 10h)" }, description: {
        en: "A long drive north via Ambondromamy across open, palm-dotted grasslands (satrana fan palms) to the town of Antsohihy. Overnight at Hotel Sofia Bellevue.",
        fr: "Longue route vers le nord via Ambondromamy, à travers des savanes ouvertes ponctuées de palmiers satrana, jusqu'à la ville d'Antsohihy. Nuit à l'Hotel Sofia Bellevue." } },
      { day: { en: "Day 14", fr: "Jour 14" }, title: { en: "Antsohihy → Bealanana → Bemanevika (200 km, 9h)", fr: "Antsohihy → Bealanana → Bemanevika (200 km, 9h)" }, description: {
        en: "A 4WD journey to the remote Bemanevika Special Reserve, last refuge of the critically endangered Madagascar Pochard and the elusive Red Owl. Lunch in Bealanana before reaching camp by evening. Overnight camping.",
        fr: "Expédition en 4×4 vers la réserve spéciale isolée de Bemanevika, dernier refuge du fuligule de Madagascar (au bord de l'extinction) et de l'insaisissable phodile rousse. Déjeuner à Bealanana avant d'atteindre le camp en soirée. Nuit sous tente." } },
      { day: { en: "Day 15", fr: "Jour 15" }, title: { en: "Bemanevika", fr: "Bemanevika" }, description: {
        en: "Hike through varied habitats for White-throated Rail, Meller's Duck and Malagasy Kingfisher, with the forest quest for the rare Red Owl. At 'Pochard Lake', watch for Madagascar Grebe and Rail; night excursions for nightjars and scops owls. Overnight camping.",
        fr: "Randonnée à travers des habitats variés (râle à gorge blanche, canard de Meller, martin-pêcheur malgache), avec la quête en forêt de la rare phodile rousse. Au « lac du Fuligule », guet du grèbe et du râle de Madagascar ; sorties nocturnes (engoulevents, petits-ducs). Nuit sous tente." } },
      { day: { en: "Day 16", fr: "Jour 16" }, title: { en: "Bemanevika", fr: "Bemanevika" }, description: {
        en: "A second full day for the area's specialities — Madagascar Pochard, Madagascar Serpent Eagle, Red Owl and Slender-billed Flufftail — across wetlands and marshes, with further night outings. Overnight camping.",
        fr: "Deuxième journée complète pour les spécialités du secteur — fuligule, serpentaire, phodile rousse et râle à bec fin — entre zones humides et marais, avec de nouvelles sorties nocturnes. Nuit sous tente." } },
      { day: { en: "Day 17", fr: "Jour 17" }, title: { en: "Bemanevika → Antsohihy (200 km, 9h)", fr: "Bemanevika → Antsohihy (200 km, 9h)" }, description: {
        en: "Return to Antsohihy; time to explore the town and its craft workshops. Overnight at Hotel Sofia Bellevue.",
        fr: "Retour à Antsohihy ; temps libre pour découvrir la ville et ses ateliers d'artisanat. Nuit à l'Hotel Sofia Bellevue." } },
      { day: { en: "Day 18", fr: "Jour 18" }, title: { en: "Antsohihy → Ankarafantsika (340 km, 10h)", fr: "Antsohihy → Ankarafantsika (340 km, 10h)" }, description: {
        en: "Drive back south across the satrana grasslands via Ambondromamy to Ankarafantsika. Overnight at Tia Asity Lodge.",
        fr: "Retour vers le sud à travers les savanes de satrana via Ambondromamy jusqu'à Ankarafantsika. Nuit au Tia Asity Lodge." } },
      { day: { en: "Day 19", fr: "Jour 19" }, title: { en: "Ankarafantsika → Mahajanga → Antananarivo (flight)", fr: "Ankarafantsika → Mahajanga → Antananarivo (vol)" }, description: {
        en: "Final 'cleanup' birding in the dry forest, then drive to lively Mahajanga and fly to Antananarivo. Overnight at La Résidence Lapasoa.",
        fr: "Dernières observations dans la forêt sèche, puis route vers la ville animée de Mahajanga et vol vers Antananarivo. Nuit à La Résidence Lapasoa." } },
      { day: { en: "Day 20", fr: "Jour 20" }, title: { en: "Antananarivo → Andasibe (170 km, 4h)", fr: "Antananarivo → Andasibe (170 km, 4h)" }, description: {
        en: "Morning at Lake Tsarasaotra, a refuge for endangered waterbirds — Madagascar Little Grebe, Meller's Duck, Madagascar Pond Heron and Humblot's Heron — then drive east to Andasibe. Overnight at Andasibe Lemurs Lodge.",
        fr: "Matinée au lac Tsarasaotra, refuge d'oiseaux d'eau menacés — grèbe malgache, canard de Meller, crabier blanc, héron de Humblot — puis route vers l'est jusqu'à Andasibe. Nuit à l'Andasibe Lemurs Lodge." } },
      { day: { en: "Day 21", fr: "Jour 21" }, title: { en: "Mantadia National Park", fr: "Parc national de Mantadia" }, description: {
        en: "A full day in Andasibe-Mantadia (over 100 species): Red-breasted Coua, Scaly and Short-legged Ground Roller, Madagascan Ibis, Crossley's Vanga and more, plus a night walk for the streaked tenrec, owls and geckos. Overnight at Andasibe Lemurs Lodge.",
        fr: "Journée complète à Andasibe-Mantadia (plus de 100 espèces) : coua à poitrine rouge, brachyptérolles écaillé et à pieds courts, ibis, vanga de Crossley et bien d'autres, plus une marche nocturne (tenrec, chouettes, geckos). Nuit à l'Andasibe Lemurs Lodge." } },
      { day: { en: "Day 22", fr: "Jour 22" }, title: { en: "Iaroka Forest", fr: "Forêt d'Iaroka" }, description: {
        en: "Bird the community reserve of Iaroka, famous since the discovery of the Helmet Vanga in its deep forest. A challenging walk may reward you with Helmet and Bernier's Vanga, Brown Emutail and Rufous-headed Ground Roller. Overnight at Andasibe Lemurs Lodge.",
        fr: "Observation dans la réserve communautaire d'Iaroka, célèbre depuis la découverte du vanga casqué au cœur de sa forêt. Une marche exigeante peut être récompensée par le vanga casqué, le vanga de Bernier et le brachyptérolle à tête rousse. Nuit à l'Andasibe Lemurs Lodge." } },
      { day: { en: "Day 23", fr: "Jour 23" }, title: { en: "Analamazaotra → Antananarivo (170 km, 4h)", fr: "Analamazaotra → Antananarivo (170 km, 4h)" }, description: {
        en: "A final morning in Analamazaotra, best known for the Indri — Madagascar's largest lemur, whose haunting call echoes at dawn — and 13 other lemur species. Lunch, then transfer back to Antananarivo. Overnight at La Résidence Lapasoa.",
        fr: "Dernière matinée à Analamazaotra, réputée pour l'Indri — le plus grand lémurien de Madagascar, dont l'appel résonne à l'aube — et 13 autres espèces de lémuriens. Déjeuner, puis transfert vers Antananarivo. Nuit à La Résidence Lapasoa." } },
      { day: { en: "Day 24", fr: "Jour 24" }, title: { en: "International departure", fr: "Départ international" }, description: {
        en: "Your tour comes to an end. We arrange your transfer to Ivato Airport. Safe travels!",
        fr: "Votre circuit s'achève. Nous organisons votre transfert vers l'aéroport d'Ivato. Bon retour !" } },
    ],
    included: {
      en: ["Air-conditioned 4WD including fuel", "English-speaking guide", "Accommodation in double/twin with breakfast", "Domestic flights", "Entry fees to all mentioned parks", "Local park guides", "Driver & guide's board and lodging", "Taxes"],
      fr: ["4×4 climatisé, carburant inclus", "Guide anglophone", "Hébergement en chambre double/twin avec petit-déjeuner", "Vols intérieurs", "Droits d'entrée de tous les parcs cités", "Guides locaux dans les parcs", "Hébergement et repas du chauffeur et du guide", "Taxes"],
    },
    notIncluded: {
      en: ["Drinks", "Tips and personal purchases", "All meals (lunches and dinners)", "Travel insurance and visa", "International flights"],
      fr: ["Boissons", "Pourboires et achats personnels", "Tous les repas (déjeuners et dîners)", "Assurance voyage et visa", "Vols internationaux"],
    },
    bestSeason: { en: "September to November", fr: "De septembre à novembre" },
  },

  // ==========================================================================
  //  #24 — Discovery: Wildlife, Landscapes & Coast (15 jours)
  // ==========================================================================
  {
    slug: "discovery-wildlife-coast-15d",
    macroRegions: ["highlands", "south", "east"],
    gallery: ["/images/discovery-wildlife-coast-15d-1.webp", "/images/discovery-wildlife-coast-15d-2.webp", "/images/discovery-wildlife-coast-15d-3.webp"],
    title: { en: "Discovery — Wildlife, Landscapes & Coast", fr: "Découverte — Faune, paysages & côte" },
    region: "Antsirabe · Ranomafana · Isalo · Ambatomilo · Andasibe",
    category: "nature",
    tone: "ocean",
    durationDays: 15,
    priceFrom: 2530,
    groupMax: 14,
    difficulty: 1,
    featured: true,
    summary: {
      en: "Fifteen days from the highlands to the reef: RN7 crafts and lemurs, the canyons of Isalo, and pure relaxation on a world-class beach at Ambatomilo — ideal for families.",
      fr: "Quinze jours des hautes terres au récif : artisanat et lémuriens de la RN7, canyons de l'Isalo et détente pure sur une plage d'exception à Ambatomilo — idéal en famille.",
    },
    description: {
      en: "An extraordinary 15-day expedition through Madagascar's landscapes and biodiversity. From Antananarivo, drive to Antsirabe, then Ranomafana (golden bamboo lemur) via the woodcraft town of Ambositra. Meet ring-tailed lemurs at Anja, hike the canyons of Isalo, and pass Zombitse and its dancing sifakas on the way to the coast. Snorkel or dive at Ambatomilo — one of the world's most beautiful beaches — before flying back to end in the rainforest of Andasibe among Indri and diademed sifakas.",
      fr: "Une expédition extraordinaire de 15 jours à travers les paysages et la biodiversité de Madagascar. D'Antananarivo, route vers Antsirabe, puis Ranomafana (lémurien à bambou doré) via la ville du bois d'Ambositra. Rencontre des makis catta à Anja, randonnée dans les canyons de l'Isalo, puis Zombitse et ses sifakas danseurs en route vers la côte. Snorkeling ou plongée à Ambatomilo — l'une des plus belles plages du monde — avant un vol retour pour terminer dans la forêt d'Andasibe, parmi indris et propithèques à diadème.",
    },
    highlights: {
      en: ["Malagasy daily life", "The landscapes of Isalo", "Ranomafana & Andasibe", "A world-class beach escape"],
      fr: ["La vie quotidienne malgache", "Les paysages de l'Isalo", "Ranomafana & Andasibe", "Une plage d'exception"],
    },
    itinerary: [
      { day: { en: "Day 1", fr: "Jour 1" }, title: { en: "Arrival at Antananarivo", fr: "Arrivée à Antananarivo" }, description: {
        en: "Our agent greets you at the airport, helps with a SIM card and currency exchange, and transfers you to your hotel. Overnight at Le Grand Mellis or similar.",
        fr: "Notre agent vous accueille à l'aéroport, vous aide pour la carte SIM et le change, et vous transfère à votre hôtel. Nuit au Grand Mellis ou similaire." } },
      { day: { en: "Day 2", fr: "Jour 2" }, title: { en: "Antananarivo → Antsirabe (170 km, 4h)", fr: "Antananarivo → Antsirabe (170 km, 4h)" }, description: {
        en: "Drive south through villages and rice fields, stopping at Ambatolampy's aluminium workshops. After lunch in Antsirabe, visit Lakes Andraikiba and Tritriva — the latter ideal for a swim. Overnight at Ecolodge Chambre du Voyageur.",
        fr: "Route vers le sud à travers villages et rizières, avec un arrêt aux ateliers d'aluminium d'Ambatolampy. Après le déjeuner à Antsirabe, découverte des lacs Andraikiba et Tritriva — ce dernier parfait pour une baignade. Nuit à l'Ecolodge Chambre du Voyageur." } },
      { day: { en: "Day 3", fr: "Jour 3" }, title: { en: "Antsirabe → Ranomafana (250 km, 7h)", fr: "Antsirabe → Ranomafana (250 km, 7h)" }, description: {
        en: "Tour Antsirabe by rickshaw (railway station, Hôtel des Thermes, zebu-horn crafts), lunch in Ambositra, capital of woodcraft, then descend to the eastern rainforest and Ranomafana with a night walk at the forest edge. Overnight at Setam Lodge.",
        fr: "Découverte d'Antsirabe en pousse-pousse (gare, Hôtel des Thermes, objets en corne de zébu), déjeuner à Ambositra, capitale du bois, puis descente vers la forêt de l'Est et Ranomafana avec une marche nocturne en lisière. Nuit au Setam Lodge." } },
      { day: { en: "Day 4", fr: "Jour 4" }, title: { en: "Ranomafana National Park", fr: "Parc national de Ranomafana" }, description: {
        en: "Explore this 415 km² rainforest park, home to the golden bamboo lemur, 12 lemur species and 30 endemic birds. Choose a trail such as Varibolomena for bamboo lemurs and waterfalls. Overnight at Setam Lodge.",
        fr: "Exploration de ce parc de forêt tropicale de 415 km², refuge du lémurien à bambou doré, de 12 espèces de lémuriens et de 30 oiseaux endémiques. Sentier au choix, comme le Varibolomena (lémuriens à bambou, cascades). Nuit au Setam Lodge." } },
      { day: { en: "Day 5", fr: "Jour 5" }, title: { en: "Ranomafana → Anja → Ranohira (360 km, 7h)", fr: "Ranomafana → Anja → Ranohira (360 km, 7h)" }, description: {
        en: "Along the RN7, stop in Fianarantsoa and Ambalavao (Antemoro paper, zebu market), then Anja Reserve for ring-tailed lemurs, crossing the Ihorombe plateau to Ranohira. Overnight at Hotel H1 Isalo.",
        fr: "Sur la RN7, arrêts à Fianarantsoa et Ambalavao (papier Antemoro, marché aux zébus), puis réserve d'Anja pour les makis catta, avant de traverser le plateau de l'Ihorombe jusqu'à Ranohira. Nuit à l'Hotel H1 Isalo." } },
      { day: { en: "Day 6", fr: "Jour 6" }, title: { en: "Isalo National Park", fr: "Parc national de l'Isalo" }, description: {
        en: "A full day in the canyons and oases of Isalo — natural pools, waterfalls, the 'Piscine Bleue et Noire' trails and a mesmerising sunset at the Window of Isalo. Overnight at Hotel H1 Isalo.",
        fr: "Une journée entière dans les canyons et oasis de l'Isalo — piscines naturelles, cascades, sentiers de la « Piscine Bleue et Noire » et coucher de soleil envoûtant sur la Fenêtre de l'Isalo. Nuit à l'Hotel H1 Isalo." } },
      { day: { en: "Day 7", fr: "Jour 7" }, title: { en: "Ranohira → Zombitse → Toliara (280 km, 5h)", fr: "Ranohira → Zombitse → Toliara (280 km, 5h)" }, description: {
        en: "Drive south past baobabs and thorny forest, through the sapphire town of Ilakaka. Visit Zombitse National Park and see the decorated Mahafaly and Antandroy tombs along the way.",
        fr: "Route vers le sud entre baobabs et forêt épineuse, en passant par Ilakaka la ville du saphir. Visite du parc national de Zombitse et découverte des tombeaux décorés mahafaly et antandroy en chemin." } },
      { day: { en: "Day 8", fr: "Jour 8" }, title: { en: "Toliara → Ifaty → Ambatomilo (125 km, 2h)", fr: "Toliara → Ifaty → Ambatomilo (125 km, 2h)" }, description: {
        en: "Coastal road to Ambatomilo, stopping at Reniala Reserve near Ifaty — 60 ha of baobabs and thorny bush, a birders' paradise home to a 1,500-year-old baobab. Free afternoon on arrival. Overnight at Shangri-La Lodge.",
        fr: "Route côtière vers Ambatomilo, avec un arrêt à la réserve de Reniala près d'Ifaty — 60 ha de baobabs et de bush épineux, paradis des ornithologues, abritant un baobab de plus de 1 500 ans. Après-midi libre à l'arrivée. Nuit au Shangri-La Lodge." } },
      { day: { en: "Days 9–10", fr: "Jours 9–10" }, title: { en: "Ambatomilo — lagoon & beach", fr: "Ambatomilo — lagon & plage" }, description: {
        en: "Two free days on a magnificent lagoon: snorkelling on the reef a kilometre offshore, humpback whale watching in season (Jul–Sep), a visit to the Vezo village of Tsiandamba, or scuba diving along one of the world's richest reefs. Overnight at Shangri-La Lodge.",
        fr: "Deux journées libres sur un lagon magnifique : snorkeling sur le récif à un kilomètre du rivage, observation des baleines à bosse en saison (juil.–sept.), visite du village vezo de Tsiandamba ou plongée le long de l'un des récifs les plus riches du monde. Nuit au Shangri-La Lodge." } },
      { day: { en: "Day 11", fr: "Jour 11" }, title: { en: "Ambatomilo → Toliara → Antananarivo (flight)", fr: "Ambatomilo → Toliara → Antananarivo (vol)" }, description: {
        en: "Transfer to Toliara and fly to Antananarivo; transfer to your hotel.",
        fr: "Transfert à Toliara et vol vers Antananarivo ; transfert à votre hôtel." } },
      { day: { en: "Day 12", fr: "Jour 12" }, title: { en: "Antananarivo → Andasibe (150 km, 4h)", fr: "Antananarivo → Andasibe (150 km, 4h)" }, description: {
        en: "Scenic drive to Andasibe through villages, rice paddies and forest, with a stop at Mr Peyrieras' reptile and butterfly farm in Marozevo. Evening stroll through Andasibe village. Overnight at Andasibe Lemurs Lodge.",
        fr: "Route pittoresque vers Andasibe à travers villages, rizières et forêts, avec un arrêt à la ferme aux reptiles et papillons de M. Peyrieras à Marozevo. Balade en soirée dans le village d'Andasibe. Nuit à l'Andasibe Lemurs Lodge." } },
      { day: { en: "Day 13", fr: "Jour 13" }, title: { en: "Analamazaotra National Park", fr: "Parc national d'Analamazaotra" }, description: {
        en: "Trek in Analamazaotra to meet the Indri, woolly and brown lemurs, chameleons and frogs, then Lemur Island at Vakona and an evening night walk at VOIMMA (mouse lemur, leaf-tailed gecko). Overnight at Andasibe Lemurs Lodge.",
        fr: "Randonnée à Analamazaotra à la rencontre de l'Indri, des lémuriens laineux et bruns, des caméléons et grenouilles, puis Île aux Lémuriens de Vakona et marche nocturne à VOIMMA (microcèbe, gecko à queue plate). Nuit à l'Andasibe Lemurs Lodge." } },
      { day: { en: "Day 14", fr: "Jour 14" }, title: { en: "Andasibe → Antananarivo (150 km, 4h)", fr: "Andasibe → Antananarivo (150 km, 4h)" }, description: {
        en: "A final visit to the community-run Mitsinjo Reserve, then the scenic drive back to Antananarivo, ending with a walk along Independence Avenue and the Queen's Palace. Overnight at Sakamanga Hotel.",
        fr: "Ultime visite de la réserve communautaire de Mitsinjo, puis route panoramique vers Antananarivo, avec une promenade sur l'avenue de l'Indépendance et le Palais de la Reine. Nuit à l'hôtel Sakamanga." } },
      { day: { en: "Day 15", fr: "Jour 15" }, title: { en: "International departure", fr: "Départ international" }, description: {
        en: "Your tour comes to an end. We arrange your transfer to Ivato Airport. Safe travels!",
        fr: "Votre circuit s'achève. Nous organisons votre transfert vers l'aéroport d'Ivato. Bon retour !" } },
    ],
    included: {
      en: ["Air-conditioned 4WD including fuel", "English-speaking driver", "Accommodation in double/twin with breakfast", "Half board at Ambatomilo", "Domestic flight", "Entry fees to all mentioned parks", "Local park guides", "Driver & guide's board and lodging", "Taxes"],
      fr: ["4×4 climatisé, carburant inclus", "Chauffeur anglophone", "Hébergement en chambre double/twin avec petit-déjeuner", "Demi-pension à Ambatomilo", "Vol intérieur", "Droits d'entrée de tous les parcs cités", "Guides locaux dans les parcs", "Hébergement et repas du chauffeur et du guide", "Taxes"],
    },
    notIncluded: {
      en: ["Drinks", "Tips and personal purchases", "All meals (lunches and dinners)", "Travel insurance and visa", "International flights"],
      fr: ["Boissons", "Pourboires et achats personnels", "Tous les repas (déjeuners et dîners)", "Assurance voyage et visa", "Vols internationaux"],
    },
    bestSeason: { en: "All year round", fr: "Toute l'année" },
  },

  // ==========================================================================
  //  #25 — Explorer: Baobab & Tsingy to Lemur Legends (17 jours)
  // ==========================================================================
  {
    slug: "explorer-baobab-tsingy-17d",
    macroRegions: ["west", "highlands", "south", "east"],
    gallery: ["/images/explorer-baobab-tsingy-17d-1.webp"],
    title: { en: "Explorer — Baobab & Tsingy to Lemur Legends", fr: "Explorer — Des baobabs aux légendes de lémuriens" },
    region: "Morondava · Bekopaka · Ranomafana · Isalo · Andasibe",
    category: "adventure",
    tone: "sunset",
    durationDays: 17,
    priceFrom: 3200,
    groupMax: 14,
    difficulty: 2,
    featured: false,
    summary: {
      en: "Seventeen days linking the wild west and the RN7: Kirindy's fossa, the UNESCO Tsingy de Bemaraha, the Avenue of the Baobabs at sunset, Isalo's canyons and the Indri of Andasibe.",
      fr: "Dix-sept jours reliant l'ouest sauvage à la RN7 : le fossa de Kirindy, les Tsingy de Bemaraha classés UNESCO, l'Allée des Baobabs au coucher du soleil, les canyons de l'Isalo et l'Indri d'Andasibe.",
    },
    description: {
      en: "An exhilarating odyssey through western Madagascar and down the famed RN7. Fly to Morondava and visit Kirindy Reserve, home to the fossa. Reach Bekopaka, gateway to the UNESCO Tsingy de Bemaraha, and enjoy the iconic Baobab Avenue sunset. Head south via Antsirabe and Ranomafana's rainforest, meet ring-tailed lemurs at Anja, hike Isalo, relax at Ifaty, and end in Andasibe with the magical call of the Indri.",
      fr: "Une odyssée grisante à travers l'ouest de Madagascar puis le long de la célèbre RN7. Vol vers Morondava et visite de la réserve de Kirindy, refuge du fossa. Rejoignez Bekopaka, porte des Tsingy de Bemaraha classés UNESCO, et savourez le coucher de soleil sur l'Allée des Baobabs. Descente vers le sud via Antsirabe et la forêt de Ranomafana, makis catta à Anja, randonnée dans l'Isalo, détente à Ifaty, et final à Andasibe au son magique de l'Indri.",
    },
    highlights: {
      en: ["Explore the Tsingy de Bemaraha", "Sunset at Baobab Avenue", "Kirindy's wildlife", "Trek Isalo National Park"],
      fr: ["Explorer les Tsingy de Bemaraha", "Coucher de soleil sur l'Allée des Baobabs", "La faune de Kirindy", "Randonner dans l'Isalo"],
    },
    itinerary: [
      { day: { en: "Day 1", fr: "Jour 1" }, title: { en: "Arrival at Antananarivo", fr: "Arrivée à Antananarivo" }, description: {
        en: "Our agent greets you at the airport, helps with a SIM card and currency exchange, and transfers you to your hotel. Overnight at Le Grand Mellis or similar.",
        fr: "Notre agent vous accueille à l'aéroport, vous aide pour la carte SIM et le change, et vous transfère à votre hôtel. Nuit au Grand Mellis ou similaire." } },
      { day: { en: "Day 2", fr: "Jour 2" }, title: { en: "Antananarivo → Morondava → Kirindy (flight + 2h)", fr: "Antananarivo → Morondava → Kirindy (vol + 2h)" }, description: {
        en: "Fly to Morondava, lunch, then to Kirindy Reserve with a photo stop at the Avenue of the Baobabs. Night walk for dwarf and mouse lemurs, including Madame Berthe's mouse lemur — the world's smallest — and the endangered giant jumping rat. Overnight at Relais du Kirindy.",
        fr: "Vol vers Morondava, déjeuner, puis route vers la réserve de Kirindy avec un arrêt photo à l'Allée des Baobabs. Marche nocturne (microcèbes), dont le microcèbe de Mme Berthe — le plus petit lémurien du monde — et le rat sauteur géant, menacé. Nuit au Relais du Kirindy." } },
      { day: { en: "Day 3", fr: "Jour 3" }, title: { en: "Kirindy → Belo → Bekopaka (180 km, 7h)", fr: "Kirindy → Belo → Bekopaka (180 km, 7h)" }, description: {
        en: "Morning at Kirindy (fossa, Verreaux's sifakas, red-fronted lemurs), then drive through baobab forests and red earth, ferry across the Tsiribihina at Belo for lunch, and four more hours to Bekopaka near the Tsingy de Bemaraha. Overnight at Grand Hôtel du Tsingy.",
        fr: "Matinée à Kirindy (fossa, propithèques de Verreaux, lémuriens à front roux), puis route à travers forêts de baobabs et terre rouge, bac sur la Tsiribihina à Belo pour le déjeuner, et quatre heures de plus jusqu'à Bekopaka, près des Tsingy de Bemaraha. Nuit au Grand Hôtel du Tsingy." } },
      { day: { en: "Day 4", fr: "Jour 4" }, title: { en: "Grand Tsingy", fr: "Grand Tsingy" }, description: {
        en: "Drive to the start of the Grands Tsingy (17 km of track, 1–2h). The 4-hour 'Andamozavakay' circuit is a slow observational walk — no particular fitness required, but not ideal for those prone to vertigo. Caves, panoramic viewpoints and a suspension bridge, safely harnessed. Overnight at Grand Hôtel du Tsingy.",
        fr: "Route jusqu'au départ des Grands Tsingy (17 km de piste, 1 à 2h). Le circuit « Andamozavakay », d'environ 4h, est une marche d'observation tranquille — sans condition physique particulière, mais déconseillée en cas de vertige. Grottes, points de vue panoramiques et pont suspendu, harnaché en sécurité. Nuit au Grand Hôtel du Tsingy." } },
      { day: { en: "Day 5", fr: "Jour 5" }, title: { en: "Bekopaka → Morondava (200 km, 9h)", fr: "Bekopaka → Morondava (200 km, 9h)" }, description: {
        en: "Head back south by 4WD and ferry (about 9 hours), passing the Sakalava tombs and their unusual carvings, and stopping again at the Avenue of the Baobabs for a spectacular sunset. Overnight in Morondava at Chez Maggie.",
        fr: "Retour vers le sud en 4×4 et bac (environ 9h), en passant devant les tombeaux Sakalava et leurs sculptures singulières, avec un nouvel arrêt à l'Allée des Baobabs pour un coucher de soleil spectaculaire. Nuit à Morondava, Chez Maggie." } },
      { day: { en: "Day 6", fr: "Jour 6" }, title: { en: "Morondava → Antsirabe (520 km, 10h)", fr: "Morondava → Antsirabe (520 km, 10h)" }, description: {
        en: "A long travel day across the Betsiriry plateau and savannah, lunch in Miandrivazo, past the gold-panning village of Dabolava, reaching thermal Antsirabe (1,500 m) by evening. Overnight at Flower Palace.",
        fr: "Longue journée de route à travers le plateau du Betsiriry et la savane, déjeuner à Miandrivazo, passage par le village aurifère de Dabolava, pour atteindre Antsirabe la thermale (1 500 m) en soirée. Nuit au Flower Palace." } },
      { day: { en: "Day 7", fr: "Jour 7" }, title: { en: "Antsirabe → Ranomafana (250 km, 7h)", fr: "Antsirabe → Ranomafana (250 km, 7h)" }, description: {
        en: "Tour Antsirabe by rickshaw (railway station, Hôtel des Thermes, zebu-horn crafts), lunch in Ambositra, then descend to the eastern rainforest and Ranomafana with a night walk at the forest edge. Overnight at Setam Lodge.",
        fr: "Découverte d'Antsirabe en pousse-pousse (gare, Hôtel des Thermes, objets en corne de zébu), déjeuner à Ambositra, puis descente vers la forêt de l'Est et Ranomafana avec une marche nocturne en lisière. Nuit au Setam Lodge." } },
      { day: { en: "Day 8", fr: "Jour 8" }, title: { en: "Ranomafana National Park", fr: "Parc national de Ranomafana" }, description: {
        en: "Explore the 415 km² rainforest park — golden bamboo lemur, 12 lemur species and 30 endemic birds — along trails such as Varibolomena. Overnight at Setam Lodge.",
        fr: "Exploration du parc de forêt tropicale de 415 km² — lémurien à bambou doré, 12 espèces de lémuriens et 30 oiseaux endémiques — sur des sentiers comme le Varibolomena. Nuit au Setam Lodge." } },
      { day: { en: "Day 9", fr: "Jour 9" }, title: { en: "Ranomafana → Anja → Ranohira (360 km, 7h)", fr: "Ranomafana → Anja → Ranohira (360 km, 7h)" }, description: {
        en: "Along the RN7, stop in Fianarantsoa and Ambalavao (Antemoro paper, zebu market), then Anja Reserve for ring-tailed lemurs, crossing the Ihorombe plateau to Ranohira. Overnight at Hotel H1 Isalo.",
        fr: "Sur la RN7, arrêts à Fianarantsoa et Ambalavao (papier Antemoro, marché aux zébus), puis réserve d'Anja pour les makis catta, avant de traverser le plateau de l'Ihorombe jusqu'à Ranohira. Nuit à l'Hotel H1 Isalo." } },
      { day: { en: "Day 10", fr: "Jour 10" }, title: { en: "Isalo National Park", fr: "Parc national de l'Isalo" }, description: {
        en: "A full day in the canyons and oases of Isalo — natural pools, waterfalls, the 'Piscine Bleue et Noire' trails and a sunset at the Window of Isalo. Overnight at Hotel H1 Isalo.",
        fr: "Une journée entière dans les canyons et oasis de l'Isalo — piscines naturelles, cascades, sentiers de la « Piscine Bleue et Noire » et coucher de soleil sur la Fenêtre de l'Isalo. Nuit à l'Hotel H1 Isalo." } },
      { day: { en: "Day 11", fr: "Jour 11" }, title: { en: "Ranohira → Zombitse → Ifaty (300 km, 6h)", fr: "Ranohira → Zombitse → Ifaty (300 km, 6h)" }, description: {
        en: "Drive south past baobabs and thorny forest, through the sapphire town of Ilakaka. Visit Zombitse National Park and see the decorated Mahafaly and Antandroy tombs before reaching the coast at Ifaty. Overnight at La Bella Donna.",
        fr: "Route vers le sud entre baobabs et forêt épineuse, en passant par Ilakaka la ville du saphir. Visite du parc national de Zombitse et des tombeaux décorés mahafaly et antandroy avant d'atteindre la côte à Ifaty. Nuit à La Bella Donna." } },
      { day: { en: "Day 12", fr: "Jour 12" }, title: { en: "Free day in Ifaty", fr: "Journée libre à Ifaty" }, description: {
        en: "Choose from hotel excursions: Reniala Reserve, the tortoise village, a zebu-cart ride through the baobab forest, a quad-bike adventure, or sailing, snorkelling and scuba diving in the crystal-clear lagoon. Overnight at La Bella Donna.",
        fr: "Excursions au choix proposées par l'hôtel : réserve de Reniala, village des tortues, balade en charrette à zébu dans la forêt de baobabs, sortie en quad, ou voile, snorkeling et plongée dans le lagon cristallin. Nuit à La Bella Donna." } },
      { day: { en: "Day 13", fr: "Jour 13" }, title: { en: "Ifaty → Toliara → Antananarivo (flight)", fr: "Ifaty → Toliara → Antananarivo (vol)" }, description: {
        en: "Transfer to Toliara airport and fly to Antananarivo; transfer to your hotel. Overnight at Sakamanga Hotel.",
        fr: "Transfert à l'aéroport de Toliara et vol vers Antananarivo ; transfert à votre hôtel. Nuit à l'hôtel Sakamanga." } },
      { day: { en: "Day 14", fr: "Jour 14" }, title: { en: "Antananarivo → Andasibe (150 km, 4h)", fr: "Antananarivo → Andasibe (150 km, 4h)" }, description: {
        en: "Scenic drive to Andasibe with a stop at Mr Peyrieras' reptile and butterfly farm in Marozevo, then an evening stroll through Andasibe village. Overnight at Andasibe Lemurs Lodge.",
        fr: "Route pittoresque vers Andasibe avec un arrêt à la ferme aux reptiles et papillons de M. Peyrieras à Marozevo, puis balade en soirée dans le village d'Andasibe. Nuit à l'Andasibe Lemurs Lodge." } },
      { day: { en: "Day 15", fr: "Jour 15" }, title: { en: "Analamazaotra National Park", fr: "Parc national d'Analamazaotra" }, description: {
        en: "Trek in Analamazaotra to meet the Indri, woolly and brown lemurs, then Lemur Island at Vakona and an evening night walk at VOIMMA (mouse lemur, leaf-tailed gecko). Overnight at Andasibe Lemurs Lodge.",
        fr: "Randonnée à Analamazaotra à la rencontre de l'Indri et des lémuriens laineux et bruns, puis Île aux Lémuriens de Vakona et marche nocturne à VOIMMA (microcèbe, gecko à queue plate). Nuit à l'Andasibe Lemurs Lodge." } },
      { day: { en: "Day 16", fr: "Jour 16" }, title: { en: "Andasibe → Antananarivo (150 km, 4h)", fr: "Andasibe → Antananarivo (150 km, 4h)" }, description: {
        en: "A final visit to the community-run Mitsinjo Reserve, then the scenic drive back to Antananarivo, ending with Independence Avenue and the Queen's Palace. Overnight at Sakamanga Hotel.",
        fr: "Ultime visite de la réserve communautaire de Mitsinjo, puis route panoramique vers Antananarivo, avec l'avenue de l'Indépendance et le Palais de la Reine. Nuit à l'hôtel Sakamanga." } },
      { day: { en: "Day 17", fr: "Jour 17" }, title: { en: "International departure", fr: "Départ international" }, description: {
        en: "Your tour comes to an end. We arrange your transfer to Ivato Airport. Safe travels!",
        fr: "Votre circuit s'achève. Nous organisons votre transfert vers l'aéroport d'Ivato. Bon retour !" } },
    ],
    included: {
      en: ["Air-conditioned 4WD including fuel", "English-speaking driver", "Domestic flight", "Accommodation in double/twin with breakfast", "Entry fees to all mentioned parks", "Compulsory local park guides", "Ferry crossings", "Driver & guide's board and lodging", "Taxes"],
      fr: ["4×4 climatisé, carburant inclus", "Chauffeur anglophone", "Vol intérieur", "Hébergement en chambre double/twin avec petit-déjeuner", "Droits d'entrée de tous les parcs cités", "Guides locaux obligatoires dans les parcs", "Traversées en bac", "Hébergement et repas du chauffeur et du guide", "Taxes"],
    },
    notIncluded: {
      en: ["Drinks", "Activities in Ifaty", "Tips and personal purchases", "All meals (lunches and dinners)", "Travel insurance and visa", "International flights"],
      fr: ["Boissons", "Activités à Ifaty", "Pourboires et achats personnels", "Tous les repas (déjeuners et dîners)", "Assurance voyage et visa", "Vols internationaux"],
    },
    bestSeason: { en: "May to November", fr: "De mai à novembre" },
  },

  // ==========================================================================
  //  #27 — Northern Wonders: Lemurs, Tsingy & Islands (12 jours)
  // ==========================================================================
  {
    slug: "northern-wonders-12d",
    macroRegions: ["north"],
    gallery: ["/images/northern-wonders-12d-1.webp", "/images/northern-wonders-12d-2.webp", "/images/northern-wonders-12d-3.webp"],
    title: { en: "Northern Wonders — Lemurs, Tsingy & Islands", fr: "Merveilles du Nord — Lémuriens, Tsingy & îles" },
    region: "Diego Suarez · Montagne d'Ambre · Ankarana · Nosy Be",
    category: "nature",
    tone: "ocean",
    durationDays: 12,
    priceFrom: 2770,
    groupMax: 14,
    difficulty: 1,
    featured: true,
    summary: {
      en: "Twelve days across the north: the Emerald Sea and bays of Diego Suarez, the crowned lemurs of Amber Mountain, the Red Tsingy and Ankarana caves, and island paradise around Nosy Be.",
      fr: "Douze jours dans le Nord : la Mer d'Émeraude et les baies de Diego Suarez, les lémuriens couronnés de la Montagne d'Ambre, les Tsingy Rouges et les grottes d'Ankarana, et le paradis insulaire autour de Nosy Be.",
    },
    description: {
      en: "A 12-day journey through northern Madagascar. Fly to Antsiranana (Diego Suarez) to discover its three bays and the Emerald Sea, hike Amber Mountain National Park — home to the world's smallest chameleon — and marvel at the crimson Red Tsingy. Explore the caves and canyons of Ankarana, visit the Millot cocoa plantation, and finish with island-hopping around Nosy Be — Nosy Komba, Nosy Tanikely and the sandbar of Nosy Iranja.",
      fr: "Un voyage de 12 jours dans le nord de Madagascar. Vol vers Antsiranana (Diego Suarez) pour découvrir ses trois baies et la Mer d'Émeraude, randonnée dans le parc national de la Montagne d'Ambre — refuge du plus petit caméléon du monde — et émerveillement devant les Tsingy Rouges. Exploration des grottes et canyons de l'Ankarana, visite de la plantation de cacao Millot, et final en sauts d'îles autour de Nosy Be — Nosy Komba, Nosy Tanikely et le banc de sable de Nosy Iranja.",
    },
    highlights: {
      en: ["Antsiranana & the Emerald Sea", "Amber Mountain National Park", "The Red Tsingy", "Island paradise at Nosy Be"],
      fr: ["Antsiranana & la Mer d'Émeraude", "Le parc de la Montagne d'Ambre", "Les Tsingy Rouges", "Paradis insulaire à Nosy Be"],
    },
    itinerary: [
      { day: { en: "Day 1", fr: "Jour 1" }, title: { en: "Arrival at Antananarivo", fr: "Arrivée à Antananarivo" }, description: {
        en: "Our agent greets you at the airport, helps with a SIM card and currency exchange, and transfers you to your hotel. Overnight at Le Grand Mellis or similar.",
        fr: "Notre agent vous accueille à l'aéroport, vous aide pour la carte SIM et le change, et vous transfère à votre hôtel. Nuit au Grand Mellis ou similaire." } },
      { day: { en: "Day 2", fr: "Jour 2" }, title: { en: "Antananarivo → Antsiranana (flight)", fr: "Antananarivo → Antsiranana (vol)" }, description: {
        en: "Fly to Diego Suarez and explore the Three Bays — French Bay, Sugar Loaf, Sakalava Bay — a spectrum of white, pink and golden sands. Lunch at Dunes Bay, then the colonial Cap Miné, its lighthouse and Orangea beach. Overnight at Allamanda Hotel.",
        fr: "Vol vers Diego Suarez et découverte des Trois Baies — baie des Français, Pain de Sucre, baie des Sakalava — un éventail de sables blancs, roses et dorés. Déjeuner à la baie des Dunes, puis le Cap Miné colonial, son phare et la plage d'Orangea. Nuit à l'Allamanda Hotel." } },
      { day: { en: "Day 3", fr: "Jour 3" }, title: { en: "Emerald Sea day trip", fr: "Excursion à la Mer d'Émeraude" }, description: {
        en: "A traditional boat across the transparent Emerald Sea to a pristine sandbar — snorkelling, swimming and kitesurfing amid coral reefs, sea turtles and manta rays, returning to Ramena by evening. Overnight at Allamanda Hotel.",
        fr: "Traversée en boutre de la Mer d'Émeraude cristalline jusqu'à un banc de sable immaculé — snorkeling, baignade et kitesurf parmi récifs coralliens, tortues marines et raies manta, retour à Ramena en soirée. Nuit à l'Allamanda Hotel." } },
      { day: { en: "Day 4", fr: "Jour 4" }, title: { en: "Diego → Joffreville → Amber Mountain NP", fr: "Diego → Joffreville → Montagne d'Ambre" }, description: {
        en: "A day among the forest trails and waterfalls of Amber Mountain (1,475 m), a lush sanctuary of orchids and endemic wildlife — crowned lemurs, 77 bird species and the tiny Brookesia chameleon. Overnight at Nature Lodge.",
        fr: "Une journée entre sentiers forestiers et cascades de la Montagne d'Ambre (1 475 m), sanctuaire luxuriant d'orchidées et d'espèces endémiques — lémuriens couronnés, 77 espèces d'oiseaux et le minuscule caméléon Brookesia. Nuit au Nature Lodge." } },
      { day: { en: "Day 5", fr: "Jour 5" }, title: { en: "Joffreville → Red Tsingy → Ankarana (150 km, 5h)", fr: "Joffreville → Tsingy Rouges → Ankarana (150 km, 5h)" }, description: {
        en: "Drive to the surreal crimson sandstone pinnacles of the Red Tsingy, sculpted by wind and rain, then continue to Ankarana National Park and its grey tsingy. Overnight at Relais de l'Ankarana.",
        fr: "Route vers les surréalistes aiguilles de grès cramoisi des Tsingy Rouges, sculptées par le vent et la pluie, puis continuation vers le parc national de l'Ankarana et ses tsingy gris. Nuit au Relais de l'Ankarana." } },
      { day: { en: "Day 6", fr: "Jour 6" }, title: { en: "Ankarana National Park", fr: "Parc national de l'Ankarana" }, description: {
        en: "Explore Ankarana's tsingy, canyons, sinkholes, caves and suspension bridges — trails adaptable to your level of fitness. Overnight at Relais de l'Ankarana.",
        fr: "Exploration des tsingy, canyons, avens, grottes et ponts suspendus de l'Ankarana — sentiers adaptables à votre condition physique. Nuit au Relais de l'Ankarana." } },
      { day: { en: "Day 7", fr: "Jour 7" }, title: { en: "Ankarana → Ankify → Nosy Be (150 km, 4h)", fr: "Ankarana → Ankify → Nosy Be (150 km, 4h)" }, description: {
        en: "Drive through coffee, cocoa and ylang-ylang plantations and the fertile Tsaratanana foothills, visiting the Millot cocoa plantation, then board a boat at Ankify for Nosy Be. Overnight at L'Heure Bleue.",
        fr: "Route à travers plantations de café, cacao et ylang-ylang et les contreforts fertiles du Tsaratanana, avec la visite de la plantation de cacao Millot, puis embarquement à Ankify pour Nosy Be. Nuit à L'Heure Bleue." } },
      { day: { en: "Day 8", fr: "Jour 8" }, title: { en: "Nosy Komba & Nosy Tanikely", fr: "Nosy Komba & Nosy Tanikely" }, description: {
        en: "A full-day boat excursion: snorkelling and diving in the Nosy Tanikely marine reserve with a beach picnic, then Nosy Komba, famous for its tame lemurs and island craft markets. Overnight at L'Heure Bleue.",
        fr: "Excursion bateau à la journée : snorkeling et plongée dans la réserve marine de Nosy Tanikely avec pique-nique sur la plage, puis Nosy Komba, réputée pour ses lémuriens familiers et ses marchés artisanaux. Nuit à L'Heure Bleue." } },
      { day: { en: "Day 9", fr: "Jour 9" }, title: { en: "Nosy Iranja", fr: "Nosy Iranja" }, description: {
        en: "By fast boat to Nosy Iranja, two islands joined by a white sandbar revealed at low tide — turquoise waters, a turtle-nesting beach, a lighthouse viewpoint and a traditional fishing village. Overnight at L'Heure Bleue.",
        fr: "En hors-bord vers Nosy Iranja, deux îles reliées par un banc de sable blanc découvert à marée basse — eaux turquoise, plage de ponte des tortues, phare panoramique et village de pêcheurs traditionnel. Nuit à L'Heure Bleue." } },
      { day: { en: "Day 10", fr: "Jour 10" }, title: { en: "Relax day in Nosy Be", fr: "Journée détente à Nosy Be" }, description: {
        en: "A free day on the 'Perfume Island' — beaches, snorkelling, diving, vibrant markets and fresh seafood, or simply relaxing. Overnight at L'Heure Bleue.",
        fr: "Journée libre sur « l'île aux parfums » — plages, snorkeling, plongée, marchés animés et fruits de mer, ou simple détente. Nuit à L'Heure Bleue." } },
      { day: { en: "Day 11", fr: "Jour 11" }, title: { en: "Nosy Be → Antananarivo (flight)", fr: "Nosy Be → Antananarivo (vol)" }, description: {
        en: "Transfer to the airport and fly to Antananarivo; transfer to your hotel. Overnight at Sakamanga Hotel.",
        fr: "Transfert à l'aéroport et vol vers Antananarivo ; transfert à votre hôtel. Nuit à l'hôtel Sakamanga." } },
      { day: { en: "Day 12", fr: "Jour 12" }, title: { en: "Departure", fr: "Départ" }, description: {
        en: "Your tour comes to an end and we arrange your transfer to Ivato Airport. Note: international flights also depart from Nosy Be (Ethiopian Airlines, Airlink), so you may prefer to fly home from there. Safe travels!",
        fr: "Votre circuit s'achève et nous organisons votre transfert vers l'aéroport d'Ivato. À noter : des vols internationaux partent aussi de Nosy Be (Ethiopian Airlines, Airlink), vous pouvez donc envisager un départ depuis l'île. Bon retour !" } },
    ],
    included: {
      en: ["Air-conditioned 4WD transport", "English-speaking guide", "Accommodation in double/twin with breakfast", "Half board at Akiba Lodge Anjahakely", "Domestic flight", "Entry fees to all mentioned parks", "Compulsory local park guides", "Day trips to Nosy Komba, Nosy Tanikely & Nosy Iranja", "Driver & guide's board and lodging", "Taxes"],
      fr: ["Transport en 4×4 climatisé", "Guide anglophone", "Hébergement en chambre double/twin avec petit-déjeuner", "Demi-pension à l'Akiba Lodge Anjahakely", "Vol intérieur", "Droits d'entrée de tous les parcs cités", "Guides locaux obligatoires dans les parcs", "Excursions à Nosy Komba, Nosy Tanikely & Nosy Iranja", "Hébergement et repas du chauffeur et du guide", "Taxes"],
    },
    notIncluded: {
      en: ["Tips and personal purchases", "All meals (lunches and dinners)", "Travel insurance and visa", "International flights"],
      fr: ["Pourboires et achats personnels", "Tous les repas (déjeuners et dîners)", "Assurance voyage et visa", "Vols internationaux"],
    },
    bestSeason: { en: "All year round", fr: "Toute l'année" },
  },

  // ==========================================================================
  //  #28 — Luxury Escape: Private Charter & Exclusive Experiences (8 jours)
  // ==========================================================================
  {
    slug: "luxury-escape-8d",
    macroRegions: ["west", "south", "east"],
    gallery: ["/images/luxury-escape-8d-1.webp", "/images/luxury-escape-8d-2.webp", "/images/luxury-escape-8d-3.webp"],
    title: { en: "Luxury Escape — Private Charter & Exclusive Experiences", fr: "Escapade de luxe — Charter privé & expériences exclusives" },
    region: "Bemaraha · Morondava · Isalo · Andasibe",
    category: "nature",
    tone: "sunset",
    durationDays: 8,
    priceFrom: 5460,
    groupMax: 12,
    difficulty: 1,
    featured: false,
    summary: {
      en: "Eight days of untamed nature and refined comfort — private charter flights over the Tsingy and baobabs, handpicked lodges, and the calls of the Indri, all in effortless style.",
      fr: "Huit jours de nature sauvage et de confort raffiné — vols privés au-dessus des Tsingy et des baobabs, lodges d'exception et chant de l'Indri, dans un style sans effort.",
    },
    description: {
      en: "A luxury journey crafted for travellers who seek the extraordinary. Fly privately over dramatic landscapes, explore the ancient stone forest of the Grand Tsingy, walk among giant baobabs at sunset and sunrise, hike the Jurassic canyons of Isalo, and hear the haunting calls of the Indri deep in the rainforest — every moment curated for exclusivity, from private air charters and handpicked lodges to intimate wildlife encounters.",
      fr: "Un voyage de luxe conçu pour les voyageurs en quête d'extraordinaire. Survolez en privé des paysages spectaculaires, explorez l'antique forêt de pierre du Grand Tsingy, marchez parmi les baobabs géants au coucher et au lever du soleil, randonnez dans les canyons jurassiques de l'Isalo, et écoutez le chant envoûtant de l'Indri au cœur de la forêt — chaque instant pensé pour l'exclusivité, des charters privés aux lodges d'exception et aux rencontres intimes avec la faune.",
    },
    highlights: {
      en: ["Dramatic landscapes from above", "The ancient pinnacles of Bemaraha", "Baobab sunsets & sunrises", "Where nature meets luxury"],
      fr: ["Paysages spectaculaires vus du ciel", "Les aiguilles antiques du Bemaraha", "Baobabs au lever et au coucher du soleil", "Quand la nature rencontre le luxe"],
    },
    itinerary: [
      { day: { en: "Day 1", fr: "Jour 1" }, title: { en: "Arrival in Antananarivo", fr: "Arrivée à Antananarivo" }, description: {
        en: "Personalised Meet & Assist at Ivato: guided through customs, currency exchange and a local SIM, then transfer to an elegant boutique hotel. B&B at Nosy Manga Hotel.",
        fr: "Accueil personnalisé « Meet & Assist » à Ivato : accompagnement aux formalités, change et carte SIM locale, puis transfert vers un élégant hôtel de charme. Nuit et petit-déjeuner au Nosy Manga Hotel." } },
      { day: { en: "Day 2", fr: "Jour 2" }, title: { en: "Antananarivo → Tsingy de Bemaraha → Morondava (private charter)", fr: "Antananarivo → Tsingy de Bemaraha → Morondava (charter privé)" }, description: {
        en: "A private charter flight over the High Plateau and Manambolo River, landing near the Grand Tsingy — a UNESCO labyrinth of razor-sharp limestone pinnacles over 200 million years old. In the evening, a magical sunset at the Avenue of the Baobabs. Dinner & B&B at Palissandre Côte Ouest Resort & Spa.",
        fr: "Vol en charter privé au-dessus des Hauts Plateaux et du fleuve Manambolo, atterrissage près du Grand Tsingy — labyrinthe UNESCO d'aiguilles calcaires acérées, vieux de plus de 200 millions d'années. En soirée, coucher de soleil magique sur l'Allée des Baobabs. Dîner, nuit et petit-déjeuner au Palissandre Côte Ouest Resort & Spa." } },
      { day: { en: "Day 3", fr: "Jour 3" }, title: { en: "Morondava → Isalo (private charter)", fr: "Morondava → Isalo (charter privé)" }, description: {
        en: "Sunrise at Baobab Avenue, then a private flight to the Isalo Massif; arrive in Ranohira and settle into a luxury lodge among the sandstone formations. Dinner & B&B at Relais de la Reine.",
        fr: "Lever de soleil sur l'Allée des Baobabs, puis vol privé vers le massif de l'Isalo ; arrivée à Ranohira et installation dans un lodge de luxe au cœur des formations de grès. Dîner, nuit et petit-déjeuner au Relais de la Reine." } },
      { day: { en: "Day 4", fr: "Jour 4" }, title: { en: "Isalo National Park", fr: "Parc national de l'Isalo" }, description: {
        en: "A full day in the Jurassic landscapes of Isalo — the palm-fringed Natural Pool, the waterfalls of Namaza Canyon, ring-tailed lemurs and chameleons, and sweeping plateau views. Dinner & B&B at Relais de la Reine.",
        fr: "Une journée entière dans les paysages jurassiques de l'Isalo — la Piscine Naturelle bordée de palmiers, les cascades du canyon de Namaza, makis catta et caméléons, et de vastes panoramas sur les plateaux. Dîner, nuit et petit-déjeuner au Relais de la Reine." } },
      { day: { en: "Day 5", fr: "Jour 5" }, title: { en: "Isalo → Antananarivo → Andasibe (charter + drive)", fr: "Isalo → Antananarivo → Andasibe (charter + route)" }, description: {
        en: "A private flight back to Antananarivo, lunch in the capital, then a scenic 4-hour drive to Andasibe through villages, rice paddies and rolling hills to a luxury rainforest lodge. B&B at Mantadia Lodge.",
        fr: "Vol privé retour vers Antananarivo, déjeuner dans la capitale, puis route panoramique de 4h vers Andasibe à travers villages, rizières et collines jusqu'à un lodge de luxe en lisière de forêt. Nuit et petit-déjeuner au Mantadia Lodge." } },
      { day: { en: "Day 6", fr: "Jour 6" }, title: { en: "Analamazaotra & night walk", fr: "Analamazaotra & marche nocturne" }, description: {
        en: "Into the Analamazaotra Reserve for the Indri and its haunting song, the diademed sifaka and endemic birds; an intimate Lemur Island encounter, then a guided night walk in the VOIMMA community forest. B&B at Mantadia Lodge.",
        fr: "Dans la réserve d'Analamazaotra à la rencontre de l'Indri et de son chant envoûtant, du propithèque à diadème et des oiseaux endémiques ; rencontre intime sur l'Île aux Lémuriens, puis marche nocturne guidée dans la forêt communautaire de VOIMMA. Nuit et petit-déjeuner au Mantadia Lodge." } },
      { day: { en: "Day 7", fr: "Jour 7" }, title: { en: "Andasibe → Antananarivo (city tour)", fr: "Andasibe → Antananarivo (visite de ville)" }, description: {
        en: "Return to Antananarivo past the Angavo range, then a guided city tour — the Analakely market, colonial architecture and the hilltop Rova (Royal Palace). B&B at Radisson Blu Waterfront.",
        fr: "Retour vers Antananarivo en longeant le massif de l'Angavo, puis visite guidée de la ville — le marché d'Analakely, l'architecture coloniale et le Rova (Palais royal) sur les hauteurs. Nuit et petit-déjeuner au Radisson Blu Waterfront." } },
      { day: { en: "Day 8", fr: "Jour 8" }, title: { en: "Departure", fr: "Départ" }, description: {
        en: "A relaxed morning before your transfer to Ivato Airport for your international departure. Leave with unforgettable memories of Madagascar's wild beauty and luxurious hospitality.",
        fr: "Une matinée tranquille avant votre transfert vers l'aéroport d'Ivato pour votre départ international. Repartez avec des souvenirs inoubliables de la beauté sauvage de Madagascar et d'une hospitalité de luxe." } },
    ],
    included: {
      en: ["Private air charters per itinerary", "Air-conditioned 4WD with experienced driver-guide", "Accommodation in double/twin with daily breakfast", "All park entry fees and compulsory local guides", "All taxes and service charges"],
      fr: ["Charters aériens privés selon l'itinéraire", "4×4 climatisé avec chauffeur-guide expérimenté", "Hébergement en chambre double/twin avec petit-déjeuner quotidien", "Tous les droits d'entrée des parcs et guides locaux obligatoires", "Toutes les taxes et frais de service"],
    },
    notIncluded: {
      en: ["International flights, visa and insurance", "Meals (lunches and dinners), drinks and personal expenses", "Tips and gratuities"],
      fr: ["Vols internationaux, visa et assurance", "Repas (déjeuners et dîners), boissons et dépenses personnelles", "Pourboires et gratifications"],
    },
    bestSeason: { en: "May to November", fr: "De mai à novembre" },
  },

  // ==========================================================================
  //  #26 — Ultimate Birding & Photography: Masoala & Beyond (20 jours)
  // ==========================================================================
  {
    slug: "birding-photography-20d",
    macroRegions: ["west", "north", "east"],
    gallery: ["/images/birding-photography-20d-1.webp", "/images/birding-photography-20d-2.webp", "/images/birding-photography-20d-3.webp"],
    title: { en: "Ultimate Birding & Photography — Masoala & Beyond", fr: "Ornithologie & photo ultime — Masoala & au-delà" },
    region: "Ankarafantsika · Masoala · Andasibe",
    category: "wildlife",
    tone: "forest",
    durationDays: 20,
    priceFrom: 4900,
    groupMax: 8,
    difficulty: 2,
    featured: false,
    summary: {
      en: "Twenty days across three iconic birding regions — the dry forests of Ankarafantsika, the lowland rainforest of Masoala and montane Andasibe-Mantadia — in search of 150+ endemics.",
      fr: "Vingt jours à travers trois régions ornithologiques emblématiques — les forêts sèches d'Ankarafantsika, la forêt de plaine de Masoala et Andasibe-Mantadia — à la recherche de plus de 150 espèces endémiques.",
    },
    description: {
      en: "An exclusive 20-day birding adventure across three of Madagascar's finest regions: the dry deciduous forests of Ankarafantsika, the vast lowland rainforest of Masoala and the montane paradise of Andasibe-Mantadia. From river deltas and mangroves to dense rainforest, this itinerary offers a chance to see over 150 endemic species — some of the rarest birds on Earth — alongside lemurs and chameleons, with immersive hikes and scenic boat trips throughout.",
      fr: "Une aventure ornithologique exclusive de 20 jours à travers trois des plus belles régions de Madagascar : les forêts sèches d'Ankarafantsika, la vaste forêt de plaine de Masoala et le paradis d'altitude d'Andasibe-Mantadia. Des deltas et mangroves à la forêt dense, cet itinéraire offre la chance d'observer plus de 150 espèces endémiques — parmi les oiseaux les plus rares du monde — aux côtés de lémuriens et de caméléons, ponctué de randonnées immersives et de sorties en bateau.",
    },
    highlights: {
      en: ["Exclusive rare-bird access", "Diverse forests, unique birds", "Lemurs in the wild", "Nighttime rainforest adventures"],
      fr: ["Accès exclusif aux oiseaux rares", "Des forêts variées, des oiseaux uniques", "Lémuriens en liberté", "Aventures nocturnes en forêt"],
    },
    itinerary: [
      { day: { en: "Day 1", fr: "Jour 1" }, title: { en: "Arrival in Antananarivo", fr: "Arrivée à Antananarivo" }, description: {
        en: "Warm welcome at Ivato and transfer to your city hotel; relax after your long flight. Overnight at Le Chalet des Roses.",
        fr: "Accueil chaleureux à Ivato et transfert vers votre hôtel en ville ; détente après votre long vol. Nuit au Chalet des Roses." } },
      { day: { en: "Day 2", fr: "Jour 2" }, title: { en: "Tsarasaotra & fly to Mahajanga", fr: "Tsarasaotra & vol vers Mahajanga" }, description: {
        en: "Early birding at the urban Tsarasaotra Lake reserve (whistling-ducks, herons, Dimorphic Egret), then a flight to the coastal town of Mahajanga. Overnight at Coco Lodge.",
        fr: "Observation matinale à la réserve urbaine du lac Tsarasaotra (dendrocygnes, hérons, aigrette dimorphe), puis vol vers la ville côtière de Mahajanga. Nuit au Coco Lodge." } },
      { day: { en: "Day 3", fr: "Jour 3" }, title: { en: "Betsiboka Delta → Ankarafantsika", fr: "Delta de la Betsiboka → Ankarafantsika" }, description: {
        en: "A motorised boat ride on the Betsiboka Delta in search of the endangered Bernier's Teal and Malagasy Sacred Ibis, then a scenic 4-hour drive to Ankarafantsika. Overnight at Tia Asity Lodge.",
        fr: "Sortie en bateau à moteur sur le delta de la Betsiboka à la recherche de la sarcelle de Bernier et de l'ibis sacré malgache, menacés, puis route panoramique de 4h vers Ankarafantsika. Nuit au Tia Asity Lodge." } },
      { day: { en: "Days 4–6", fr: "Jours 4–6" }, title: { en: "Ankarafantsika National Park", fr: "Parc national d'Ankarafantsika" }, description: {
        en: "Three full days on the park's trails — White-breasted Mesite, Van Dam's and Hook-billed Vanga, Schlegel's Asity — plus Coquerel's sifaka and other lemurs, with an afternoon boat trip across the lake. Overnight at Tia Asity Lodge.",
        fr: "Trois journées complètes sur les sentiers du parc — mésite à poitrine blanche, vangas de Van Dam et à bec crochu, philépitte de Schlegel — ainsi que le propithèque de Coquerel et d'autres lémuriens, avec une sortie en bateau sur le lac. Nuit au Tia Asity Lodge." } },
      { day: { en: "Day 7", fr: "Jour 7" }, title: { en: "Ankarafantsika → Mahajanga → Antananarivo (flight)", fr: "Ankarafantsika → Mahajanga → Antananarivo (vol)" }, description: {
        en: "Birding stops at Lake Amboromalandy and rice fields (Madagascar Jacana, Humblot's Heron), then an evening flight to Antananarivo. Overnight at Avamada Lodge.",
        fr: "Arrêts d'observation au lac Amboromalandy et dans les rizières (jacana, héron de Humblot), puis vol en soirée vers Antananarivo. Nuit à l'Avamada Lodge." } },
      { day: { en: "Day 8", fr: "Jour 8" }, title: { en: "Fly to Maroantsetra", fr: "Vol vers Maroantsetra" }, description: {
        en: "Flight to Maroantsetra, gateway to the wild north-east; relaxed evening at your hotel. Overnight at Manga Beach Hotel.",
        fr: "Vol vers Maroantsetra, porte du nord-est sauvage ; soirée tranquille à votre hôtel. Nuit au Manga Beach Hotel." } },
      { day: { en: "Day 9", fr: "Jour 9" }, title: { en: "Boat transfer to Masoala", fr: "Transfert bateau vers Masoala" }, description: {
        en: "A scenic 2.5-hour boat crossing of Antongil Bay to the Masoala Peninsula and its vast rainforest; first trails for Brown Mesite, Blue Coua and vangas, with an optional night walk. Overnight at Hippocampe Lodge.",
        fr: "Traversée en bateau de 2h30 de la baie d'Antongil jusqu'à la presqu'île de Masoala et sa vaste forêt ; premiers sentiers (mésite unicolore, coua bleu, vangas), avec une marche nocturne en option. Nuit à l'Hippocampe Lodge." } },
      { day: { en: "Days 10–13", fr: "Jours 10–13" }, title: { en: "Masoala National Park", fr: "Parc national de Masoala" }, description: {
        en: "Four days birding Madagascar's largest rainforest — Helmet and White-headed Vanga, Short-legged Ground Roller, coastal Madagascar Pratincole — with chances of Red Ruffed and White-fronted Lemur. Overnight at Hippocampe Lodge.",
        fr: "Quatre jours d'observation dans la plus grande forêt de Madagascar — vangas casqué et à tête blanche, brachyptérolle à pieds courts, glaréole malgache du littoral — avec des chances de voir le vari roux et le lémur à front blanc. Nuit à l'Hippocampe Lodge." } },
      { day: { en: "Day 14", fr: "Jour 14" }, title: { en: "Boat to Nosy Mangabe", fr: "Bateau vers Nosy Mangabe" }, description: {
        en: "By boat toward Maroantsetra with a stop at the rainforest island reserve of Nosy Mangabe; overnight camping on this remote island. Overnight camping.",
        fr: "En bateau vers Maroantsetra avec un arrêt à la réserve insulaire boisée de Nosy Mangabe ; nuit sous tente sur cette île isolée. Nuit sous tente." } },
      { day: { en: "Day 15", fr: "Jour 15" }, title: { en: "Fly to Antananarivo → Andasibe", fr: "Vol vers Antananarivo → Andasibe" }, description: {
        en: "Return by boat to Maroantsetra, fly to Antananarivo, then the 4-hour drive east to Andasibe. Overnight at Feon'ny Ala.",
        fr: "Retour en bateau à Maroantsetra, vol vers Antananarivo, puis route de 4h vers l'est jusqu'à Andasibe. Nuit au Feon'ny Ala." } },
      { day: { en: "Day 16", fr: "Jour 16" }, title: { en: "Birding at Analamazaotra", fr: "Observation à Analamazaotra" }, description: {
        en: "A full day in Analamazaotra — the Indri and its haunting call, colourful ground rollers and the elusive Collared Nightjar — with a VOIMMA night walk. Overnight at Feon'ny Ala.",
        fr: "Journée complète à Analamazaotra — l'Indri et son appel envoûtant, les brachyptérolles colorés et l'engoulevent à collier — avec une marche nocturne à VOIMMA. Nuit au Feon'ny Ala." } },
      { day: { en: "Day 17", fr: "Jour 17" }, title: { en: "Birding at Mantadia", fr: "Observation à Mantadia" }, description: {
        en: "Venture deeper into the primary rainforest of Mantadia for the Red-breasted Coua and Short-legged Ground Roller. Overnight at Feon'ny Ala.",
        fr: "Plongée plus profonde dans la forêt primaire de Mantadia pour le coua à poitrine rouge et le brachyptérolle à pieds courts. Nuit au Feon'ny Ala." } },
      { day: { en: "Day 18", fr: "Jour 18" }, title: { en: "Iaroka Forest", fr: "Forêt d'Iaroka" }, description: {
        en: "A challenging six-hour trek into the community-run primary forest of Iaroka for the Helmet Vanga and other high-value specialities. Overnight at Feon'ny Ala.",
        fr: "Un trek exigeant de six heures dans la forêt primaire communautaire d'Iaroka pour le vanga casqué et d'autres spécialités recherchées. Nuit au Feon'ny Ala." } },
      { day: { en: "Day 19", fr: "Jour 19" }, title: { en: "Maromizaha Reserve", fr: "Réserve de Maromizaha" }, description: {
        en: "Birding Maromizaha (Frances's Sparrowhawk, Madagascar Kestrel) and an evening night walk at Mitsinjo. Overnight at Feon'ny Ala.",
        fr: "Observation à Maromizaha (épervier de Frances, crécerelle malgache) et marche nocturne en soirée à Mitsinjo. Nuit au Feon'ny Ala." } },
      { day: { en: "Day 20", fr: "Jour 20" }, title: { en: "VOIMMA / Mitsinjo → Antananarivo", fr: "VOIMMA / Mitsinjo → Antananarivo" }, description: {
        en: "A last morning session at VOIMMA or Mitsinjo, then the drive back to Antananarivo with a stop at the Mangoro River Bridge for the Madagascar Jacana; transfer to your hotel.",
        fr: "Une dernière matinée à VOIMMA ou Mitsinjo, puis route retour vers Antananarivo avec un arrêt au pont de la Mangoro pour le jacana ; transfert à votre hôtel." } },
    ],
    included: {
      en: ["Air-conditioned 4WD including fuel", "English-speaking guide", "Domestic flights", "Accommodation in double/twin with breakfast", "Entry fees to all mentioned parks", "Local park guides", "Driver & guide's board and lodging", "Taxes"],
      fr: ["4×4 climatisé, carburant inclus", "Guide anglophone", "Vols intérieurs", "Hébergement en chambre double/twin avec petit-déjeuner", "Droits d'entrée de tous les parcs cités", "Guides locaux dans les parcs", "Hébergement et repas du chauffeur et du guide", "Taxes"],
    },
    notIncluded: {
      en: ["Drinks", "Tips and personal purchases", "All meals (lunches and dinners)", "Travel insurance and visa", "International flights"],
      fr: ["Boissons", "Pourboires et achats personnels", "Tous les repas (déjeuners et dîners)", "Assurance voyage et visa", "Vols internationaux"],
    },
    bestSeason: { en: "May to November", fr: "De mai à novembre" },
  },

  // ==========================================================================
  //  #29 — Wild West & Sainte-Marie: Tsiribihina, Baobabs & Whales (15 jours)
  // ==========================================================================
  {
    slug: "wild-west-sainte-marie-15d",
    macroRegions: ["west", "highlands", "east"],
    gallery: ["/images/wild-west-sainte-marie-15d-1.webp", "/images/wild-west-sainte-marie-15d-2.webp", "/images/wild-west-sainte-marie-15d-3.webp"],
    title: { en: "Wild West & Sainte-Marie — Tsiribihina, Baobabs & Whales", fr: "Ouest sauvage & Sainte-Marie — Tsiribihina, baobabs & baleines" },
    region: "Tsiribihina · Bemaraha · Morondava · Sainte-Marie",
    category: "wildlife",
    tone: "ocean",
    durationDays: 15,
    priceFrom: 2790,
    priceEstimated: true,
    groupMax: 14,
    difficulty: 2,
    featured: true,
    summary: {
      en: "Fifteen days from a Tsiribihina river descent by boat to the Tsingy, the Avenue of the Baobabs and Kirindy's fossa — ending with humpback whales off the island of Sainte-Marie.",
      fr: "Quinze jours d'une descente de la Tsiribihina en bateau aux Tsingy, à l'Allée des Baobabs et au fossa de Kirindy — final avec les baleines à bosse au large de l'île Sainte-Marie.",
    },
    description: {
      en: "An exhilarating expedition through western Madagascar and the island of Sainte-Marie. Cross the highlands to the Tsiribihina River and drift down it by motorboat, camping under the stars among Sakalava villages. Explore the UNESCO Tsingy de Bemaraha, meet the fossa at Kirindy and watch the sun set over the Avenue of the Baobabs, before flying to Sainte-Marie for humpback whale watching (July–September) and the turquoise lagoons of Île aux Nattes.",
      fr: "Une expédition grisante à travers l'ouest de Madagascar et l'île Sainte-Marie. Traversée des hautes terres jusqu'au fleuve Tsiribihina et descente en bateau, bivouac sous les étoiles parmi les villages sakalava. Exploration des Tsingy de Bemaraha classés UNESCO, rencontre du fossa à Kirindy et coucher de soleil sur l'Allée des Baobabs, avant de s'envoler vers Sainte-Marie pour l'observation des baleines à bosse (juillet–septembre) et les lagons turquoise de l'Île aux Nattes.",
    },
    highlights: {
      en: ["Descend the Tsiribihina by boat", "Tsingy de Bemaraha adventure", "Sunset at Baobab Avenue", "Whale watching off Sainte-Marie"],
      fr: ["Descendre la Tsiribihina en bateau", "L'aventure des Tsingy de Bemaraha", "Coucher de soleil sur l'Allée des Baobabs", "Baleines au large de Sainte-Marie"],
    },
    itinerary: [
      { day: { en: "Day 1", fr: "Jour 1" }, title: { en: "Arrival at Antananarivo", fr: "Arrivée à Antananarivo" }, description: {
        en: "Our agent greets you at the airport, helps with a SIM card and currency exchange, and transfers you to your hotel. Overnight at Le Grand Mellis or similar.",
        fr: "Notre agent vous accueille à l'aéroport, vous aide pour la carte SIM et le change, et vous transfère à votre hôtel. Nuit au Grand Mellis ou similaire." } },
      { day: { en: "Day 2", fr: "Jour 2" }, title: { en: "Antananarivo → Miandrivazo (390 km, 9h)", fr: "Antananarivo → Miandrivazo (390 km, 9h)" }, description: {
        en: "Drive to thermal Antsirabe, stopping at Behenjy (foie gras) and Ambatolampy (aluminium crafts), then west to the hot lowland town of Miandrivazo by evening. Overnight at Princesse Tsiribihina.",
        fr: "Route vers Antsirabe la thermale, avec des arrêts à Behenjy (foie gras) et Ambatolampy (artisanat de l'aluminium), puis vers l'ouest jusqu'à la ville chaude de Miandrivazo en soirée. Nuit à la Princesse Tsiribihina." } },
      { day: { en: "Day 3", fr: "Jour 3" }, title: { en: "Miandrivazo → Tsiribihina River (motorboat)", fr: "Miandrivazo → fleuve Tsiribihina (bateau)" }, description: {
        en: "Board an adapted river barge at Masiakampy and begin the cruise through vast plains and Sakalava reed-hut villages, with a swim at the Nosy Ampela waterfall (lemurs) before camping on a sandbar. Camping.",
        fr: "Embarquement sur une barge fluviale aménagée à Masiakampy et début de la descente à travers de vastes plaines et des villages sakalava aux cases de roseaux, avec une baignade à la cascade de Nosy Ampela (lémuriens) avant le bivouac sur un banc de sable. Nuit sous tente." } },
      { day: { en: "Day 4", fr: "Jour 4" }, title: { en: "Tsiribihina River", fr: "Fleuve Tsiribihina" }, description: {
        en: "Continue down the river's bends past pirogues and cargo barges, stop at Begidro to see traditional tobacco farming, glimpse the first baobabs at Ambatomisay, and camp on a beach with a traditional dance around the campfire. Camping.",
        fr: "Poursuite de la descente au fil des méandres, au milieu des pirogues et barges de marchandises, arrêt à Begidro pour la culture traditionnelle du tabac, premiers baobabs à Ambatomisay, et bivouac sur une plage avec une danse traditionnelle autour du feu. Nuit sous tente." } },
      { day: { en: "Day 5", fr: "Jour 5" }, title: { en: "Belo sur Tsiribihina → Bekopaka (120 km, 4h)", fr: "Belo sur Tsiribihina → Bekopaka (120 km, 4h)" }, description: {
        en: "A final morning afloat among herons, bee-eaters and teals, arriving at Belo sur Tsiribihina for lunch aboard, then transfer to 4WD for a rugged 4-hour drive to Bekopaka, gateway to the Tsingy. Overnight at Grand Hôtel du Tsingy.",
        fr: "Une dernière matinée sur l'eau parmi hérons, guêpiers et sarcelles, arrivée à Belo sur Tsiribihina pour le déjeuner à bord, puis transfert en 4×4 pour 4h de piste accidentée jusqu'à Bekopaka, porte des Tsingy. Nuit au Grand Hôtel du Tsingy." } },
      { day: { en: "Day 6", fr: "Jour 6" }, title: { en: "Tsingy de Bemaraha", fr: "Tsingy de Bemaraha" }, description: {
        en: "Drive to the start of the Grands Tsingy (17 km of track, 1–2h). The 4-hour 'Andamozavakay' circuit is a slow observational walk — caves, panoramic viewpoints and a suspension bridge, safely harnessed. Overnight at Grand Hôtel du Tsingy.",
        fr: "Route jusqu'au départ des Grands Tsingy (17 km de piste, 1 à 2h). Le circuit « Andamozavakay », d'environ 4h, est une marche d'observation tranquille — grottes, points de vue panoramiques et pont suspendu, harnaché en sécurité. Nuit au Grand Hôtel du Tsingy." } },
      { day: { en: "Day 7", fr: "Jour 7" }, title: { en: "Bekopaka → Kirindy (200 km, 6h + ferry)", fr: "Bekopaka → Kirindy (200 km, 6h + bac)" }, description: {
        en: "Drive south by 4WD, road and ferry, passing decorated Sakalava tombs, to Kirindy Reserve; prepare for the night walk. Overnight at Relais du Kirindy.",
        fr: "Route vers le sud en 4×4, piste et bac, en passant devant les tombeaux sakalava décorés, jusqu'à la réserve de Kirindy ; préparation de la marche nocturne. Nuit au Relais du Kirindy." } },
      { day: { en: "Day 8", fr: "Jour 8" }, title: { en: "Kirindy → Morondava (70 km, 2h)", fr: "Kirindy → Morondava (70 km, 2h)" }, description: {
        en: "A morning guided walk in Kirindy — dancing sifakas, tenrecs, reptiles and the chance of the elusive fossa — then the Avenue of the Baobabs at sunset before Morondava. Overnight at Chez Maggie.",
        fr: "Une marche guidée le matin à Kirindy — sifakas danseurs, tenrecs, reptiles et la chance d'apercevoir le fossa — puis l'Allée des Baobabs au coucher du soleil avant Morondava. Nuit Chez Maggie." } },
      { day: { en: "Day 9", fr: "Jour 9" }, title: { en: "Morondava → Antsirabe (520 km, 10h)", fr: "Morondava → Antsirabe (520 km, 10h)" }, description: {
        en: "A long travel day across the Betsiriry plateau and savannah, lunch in Miandrivazo, past gold-panning Dabolava, to reach thermal Antsirabe (1,500 m). Overnight at Souimanga Hotel.",
        fr: "Longue journée de route à travers le plateau du Betsiriry et la savane, déjeuner à Miandrivazo, passage par le village aurifère de Dabolava, pour atteindre Antsirabe la thermale (1 500 m). Nuit au Souimanga Hotel." } },
      { day: { en: "Day 10", fr: "Jour 10" }, title: { en: "Antsirabe → Antananarivo (170 km, 4h)", fr: "Antsirabe → Antananarivo (170 km, 4h)" }, description: {
        en: "Swim at Tritriva Lake, then tour Antsirabe (cathedral, miniature and zebu-horn workshops, gem cutting, local market), before driving north through the rural highlands to Tana. Overnight at Sakamanga Hotel.",
        fr: "Baignade au lac Tritriva, puis visite d'Antsirabe (cathédrale, ateliers de miniatures et de corne de zébu, taille de pierres, marché local), avant de remonter vers le nord à travers les hautes terres rurales jusqu'à Tana. Nuit à l'hôtel Sakamanga." } },
      { day: { en: "Day 11", fr: "Jour 11" }, title: { en: "Antananarivo → Sainte-Marie (flight)", fr: "Antananarivo → Sainte-Marie (vol)" }, description: {
        en: "Fly to the island of Sainte-Marie and transfer to your beach lodge. Overnight at Sambatra Beach Lodge.",
        fr: "Vol vers l'île Sainte-Marie et transfert vers votre lodge de plage. Nuit au Sambatra Beach Lodge." } },
      { day: { en: "Day 12", fr: "Jour 12" }, title: { en: "Half-day whale watching", fr: "Demi-journée d'observation des baleines" }, description: {
        en: "In season (Jul–Sep), a three-hour humpback whale-watching outing with a CétaMada eco-guide; the rest of the day free to relax. Overnight at Sambatra Beach Lodge.",
        fr: "En saison (juil.–sept.), une sortie de trois heures d'observation des baleines à bosse avec un éco-guide de CétaMada ; le reste de la journée libre. Nuit au Sambatra Beach Lodge." } },
      { day: { en: "Day 13", fr: "Jour 13" }, title: { en: "Île aux Nattes & Îlot Sable", fr: "Île aux Nattes & Îlot Sable" }, description: {
        en: "By boat to the sandbank islet of Îlot Sable for snorkelling and swimming in pristine lagoons, then Île aux Nattes — turquoise waters, palm beaches, a lighthouse and a canoe ride among lemurs and orchids. Overnight at Sambatra Beach Lodge.",
        fr: "En bateau vers l'îlot de sable d'Îlot Sable pour le snorkeling et la baignade dans des lagons immaculés, puis l'Île aux Nattes — eaux turquoise, plages de palmiers, un phare et une balade en pirogue parmi lémuriens et orchidées. Nuit au Sambatra Beach Lodge." } },
      { day: { en: "Day 14", fr: "Jour 14" }, title: { en: "Sainte-Marie → Antananarivo (flight)", fr: "Sainte-Marie → Antananarivo (vol)" }, description: {
        en: "Fly back to Antananarivo and transfer to your hotel. Overnight at Sakamanga Hotel.",
        fr: "Vol retour vers Antananarivo et transfert à votre hôtel. Nuit à l'hôtel Sakamanga." } },
      { day: { en: "Day 15", fr: "Jour 15" }, title: { en: "International departure", fr: "Départ international" }, description: {
        en: "Your tour comes to an end. We arrange your transfer to Ivato Airport. Safe travels!",
        fr: "Votre circuit s'achève. Nous organisons votre transfert vers l'aéroport d'Ivato. Bon retour !" } },
    ],
    included: {
      en: ["Air-conditioned 4WD including fuel", "English-speaking driver", "English-speaking guide for Tsiribihina & Tsingy", "Domestic flights", "Accommodation in double/twin with breakfast", "Full Tsiribihina river package (camping gear, full board)", "Entry fees to all mentioned parks", "Whale watching in Sainte-Marie (Jul–Sep) or an off-season alternative", "Day trip to Île aux Nattes & Îlot Sable", "Compulsory local park guides", "Ferry crossings", "Driver & guide's board and lodging", "Taxes"],
      fr: ["4×4 climatisé, carburant inclus", "Chauffeur anglophone", "Guide anglophone pour la Tsiribihina & les Tsingy", "Vols intérieurs", "Hébergement en chambre double/twin avec petit-déjeuner", "Forfait complet sur la Tsiribihina (matériel de camping, pension complète)", "Droits d'entrée de tous les parcs cités", "Observation des baleines à Sainte-Marie (juil.–sept.) ou une activité alternative hors saison", "Excursion à l'Île aux Nattes & Îlot Sable", "Guides locaux obligatoires dans les parcs", "Traversées en bac", "Hébergement et repas du chauffeur et du guide", "Taxes"],
    },
    notIncluded: {
      en: ["Drinks", "Tips and personal purchases", "All meals (lunches and dinners)", "Travel insurance and visa", "International flights"],
      fr: ["Boissons", "Pourboires et achats personnels", "Tous les repas (déjeuners et dîners)", "Assurance voyage et visa", "Vols internationaux"],
    },
    bestSeason: { en: "May to November", fr: "De mai à novembre" },
  },

  // ==========================================================================
  //  #31 — Ultimate Trekking: Peaks, Canyons & Hidden Wilderness (22 jours)
  // ==========================================================================
  {
    slug: "ultimate-trekking-22d",
    macroRegions: ["highlands", "south"],
    gallery: ["/images/ultimate-trekking-22d-1.webp", "/images/ultimate-trekking-22d-2.webp", "/images/ultimate-trekking-22d-3.webp"],
    title: { en: "Ultimate Trekking — Peaks, Canyons & Hidden Wilderness", fr: "Trekking ultime — Sommets, canyons & nature secrète" },
    region: "Ranomafana · Andringitra · Isalo · Makay",
    category: "adventure",
    tone: "canyon",
    durationDays: 22,
    priceFrom: 3990,
    priceEstimated: true,
    groupMax: 14,
    difficulty: 3,
    featured: false,
    summary: {
      en: "A 22-day trekking expedition for the fit and adventurous — summit Pic Boby, hike the Tsaranoro valley and Isalo's canyons, and cross the remote, rarely-visited Makay Massif.",
      fr: "Une expédition de trekking de 22 jours pour randonneurs aguerris — ascension du Pic Boby, vallée du Tsaranoro et canyons de l'Isalo, et traversée du massif isolé et méconnu du Makay.",
    },
    description: {
      en: "An unforgettable trekking expedition through the heart of southern Madagascar. From Antananarivo, journey via Ranomafana's rainforest to Andringitra National Park to summit Pic Boby (2,658 m), Madagascar's highest accessible peak, then trek the Tsaranoro valley and the canyons of Isalo. The expedition culminates in a five-day crossing of the remote Makay Massif — a labyrinth of sandstone canyons, waterfalls and rock paintings that remains one of the island's last true wildernesses. Experienced guides and porters accompany you throughout.",
      fr: "Une expédition de trekking inoubliable au cœur du sud de Madagascar. D'Antananarivo, en passant par la forêt de Ranomafana, jusqu'au parc national d'Andringitra pour gravir le Pic Boby (2 658 m), le plus haut sommet accessible de Madagascar, puis la vallée du Tsaranoro et les canyons de l'Isalo. L'expédition culmine avec une traversée de cinq jours du massif isolé du Makay — un labyrinthe de canyons de grès, de cascades et de peintures rupestres qui demeure l'une des dernières véritables terres sauvages de l'île. Guides et porteurs expérimentés vous accompagnent tout du long.",
    },
    highlights: {
      en: ["Summit Pic Boby (2,658 m)", "Trek the Tsaranoro valley", "Isalo's canyons & natural pools", "Cross the remote Makay Massif"],
      fr: ["Gravir le Pic Boby (2 658 m)", "Randonner la vallée du Tsaranoro", "Canyons & piscines naturelles de l'Isalo", "Traverser le massif isolé du Makay"],
    },
    itinerary: [
      { day: { en: "Day 1", fr: "Jour 1" }, title: { en: "Arrival at Antananarivo", fr: "Arrivée à Antananarivo" }, description: {
        en: "Our agent greets you at the airport, helps with a SIM card and currency exchange, and transfers you to your hotel. Overnight at Le Grand Mellis or similar.",
        fr: "Notre agent vous accueille à l'aéroport, vous aide pour la carte SIM et le change, et vous transfère à votre hôtel. Nuit au Grand Mellis ou similaire." } },
      { day: { en: "Day 2", fr: "Jour 2" }, title: { en: "Antananarivo → Antsirabe (170 km, 4h)", fr: "Antananarivo → Antsirabe (170 km, 4h)" }, description: {
        en: "Drive south through villages and rice fields, stopping at Ambatolampy's aluminium workshops, then Lakes Andraikiba and Tritriva — the latter ideal for a swim. Overnight at Ecolodge Chambre du Voyageur.",
        fr: "Route vers le sud à travers villages et rizières, avec un arrêt aux ateliers d'aluminium d'Ambatolampy, puis les lacs Andraikiba et Tritriva — ce dernier parfait pour une baignade. Nuit à l'Ecolodge Chambre du Voyageur." } },
      { day: { en: "Day 3", fr: "Jour 3" }, title: { en: "Antsirabe → Ranomafana (250 km, 7h)", fr: "Antsirabe → Ranomafana (250 km, 7h)" }, description: {
        en: "Tour Antsirabe by rickshaw, lunch in the woodcraft town of Ambositra, then descend to the eastern rainforest and Ranomafana with a night walk at the forest edge. Overnight at Setam Lodge.",
        fr: "Découverte d'Antsirabe en pousse-pousse, déjeuner à Ambositra, ville du bois, puis descente vers la forêt de l'Est et Ranomafana avec une marche nocturne en lisière. Nuit au Setam Lodge." } },
      { day: { en: "Day 4", fr: "Jour 4" }, title: { en: "Ranomafana National Park", fr: "Parc national de Ranomafana" }, description: {
        en: "Explore the 415 km² rainforest park — golden bamboo lemur, 12 lemur species and 30 endemic birds — along trails such as Varibolomena. Overnight at Setam Lodge.",
        fr: "Exploration du parc de forêt tropicale de 415 km² — lémurien à bambou doré, 12 espèces de lémuriens et 30 oiseaux endémiques — sur des sentiers comme le Varibolomena. Nuit au Setam Lodge." } },
      { day: { en: "Day 5", fr: "Jour 5" }, title: { en: "Ranomafana → Ambalavao → Namoly (200 km, 6h)", fr: "Ranomafana → Ambalavao → Namoly (200 km, 6h)" }, description: {
        en: "Drive via Fianarantsoa and Ambalavao (Antemoro paper and silk factory) and the Anja Community Reserve, then take the rough 45 km track to Namoly, northern gateway to Andringitra. Overnight at Tranogasy Guesthouse.",
        fr: "Route via Fianarantsoa et Ambalavao (fabrique de papier Antemoro et de soie) et la réserve communautaire d'Anja, puis 45 km de piste difficile jusqu'à Namoly, porte nord de l'Andringitra. Nuit à la Tranogasy Guesthouse." } },
      { day: { en: "Day 6", fr: "Jour 6" }, title: { en: "Trek Andringitra → Andriamposty (2,100 m)", fr: "Trek Andringitra → Andriamposty (2 100 m)" }, description: {
        en: "From Namoly through Betsileo villages and rice terraces, past the Riandahy and Raimbavy waterfalls, ascend to the Andohariana plateau among granite peaks, with a natural pool for a bracing swim. ~9 km, 6h, medium. Camp at Andriamposty (2,100 m).",
        fr: "De Namoly à travers villages betsileo et rizières en terrasses, au-delà des cascades Riandahy et Raimbavy, montée vers le plateau d'Andohariana parmi les pics de granite, avec une piscine naturelle pour une baignade vivifiante. ~9 km, 6h, moyen. Bivouac à Andriamposty (2 100 m)." } },
      { day: { en: "Day 7", fr: "Jour 7" }, title: { en: "Trek Andringitra — summit Pic Boby (2,658 m)", fr: "Trek Andringitra — sommet du Pic Boby (2 658 m)" }, description: {
        en: "An early ascent of Pic Boby ('close to the sky') — technically straightforward carved steps, 3–4h to the top and breathtaking high-altitude views — then descend past granite cliffs and the Gloka palm forest to camp at Iantaranomby (1,650 m). ~20 km, 8–11h, difficult.",
        fr: "Ascension matinale du Pic Boby (« proche du ciel ») — marches taillées, techniquement accessible, 3 à 4h jusqu'au sommet et vues d'altitude à couper le souffle — puis descente au milieu des falaises de granite et de la palmeraie de Gloka jusqu'au bivouac d'Iantaranomby (1 650 m). ~20 km, 8–11h, difficile." } },
      { day: { en: "Day 8", fr: "Jour 8" }, title: { en: "Andringitra → Tsaranoro valley", fr: "Andringitra → vallée du Tsaranoro" }, description: {
        en: "Descend through succulent landscapes of Pachypodium and Euphorbia and picturesque savannah to the Tsaranoro valley. ~13 km, 5–6h. Overnight at Tsarasoa Lodge.",
        fr: "Descente à travers des paysages de plantes succulentes (Pachypodium, Euphorbia) et une savane pittoresque jusqu'à la vallée du Tsaranoro. ~13 km, 5–6h. Nuit au Tsarasoa Lodge." } },
      { day: { en: "Day 9", fr: "Jour 9" }, title: { en: "Tsaranoro valley — Chameleon hike", fr: "Vallée du Tsaranoro — randonnée du Caméléon" }, description: {
        en: "A day hike (~4h up) to the summit of 'the Chameleon' for an outstanding view over the Tsaranoro valley, with a picnic lunch and endemic plants (Euphorbia, Pachypodium, aloes) along the way. Overnight at Tsarasoa Lodge.",
        fr: "Randonnée à la journée (~4h de montée) jusqu'au sommet du « Caméléon » pour une vue remarquable sur la vallée du Tsaranoro, avec pique-nique et plantes endémiques (Euphorbia, Pachypodium, aloès) en chemin. Nuit au Tsarasoa Lodge." } },
      { day: { en: "Day 10", fr: "Jour 10" }, title: { en: "Tsaranoro → Ranohira (250 km, 5h)", fr: "Tsaranoro → Ranohira (250 km, 5h)" }, description: {
        en: "Drive south into 'American West' scenery — grey mountains, red laterite, standing stones and zebu steppes — through Ihosy and the Horombe plateau to Ranohira, near Isalo. Overnight at Hotel H1 Isalo.",
        fr: "Route vers le sud dans des décors de « Far West » — montagnes grises, latérite rouge, pierres levées et steppes à zébus — via Ihosy et le plateau de l'Horombe jusqu'à Ranohira, près de l'Isalo. Nuit à l'Hotel H1 Isalo." } },
      { day: { en: "Day 11", fr: "Jour 11" }, title: { en: "Trek Isalo — Canyon des Makis & Natural Pool", fr: "Trek Isalo — Canyon des Makis & Piscine Naturelle" }, description: {
        en: "Early 4WD to Ranohira Bas, then on foot to the Canyon des Makis (lemurs), deep into gorges with 100 m cliffs, the Douche du Roi Bara, and up to a panoramic summit before camping at the Natural Pool. Camping.",
        fr: "4×4 tôt le matin vers Ranohira Bas, puis à pied jusqu'au Canyon des Makis (lémuriens), au fond de gorges aux falaises de 100 m, la Douche du Roi Bara, et montée vers un sommet panoramique avant le bivouac à la Piscine Naturelle. Nuit sous tente." } },
      { day: { en: "Day 12", fr: "Jour 12" }, title: { en: "Trek Isalo — Namaza canyon", fr: "Trek Isalo — canyon de Namaza" }, description: {
        en: "From the Panoramic Viewpoint past the Bara burial grounds and tapia forest, over the ridge above Mikaiky village, down into Namaza canyon (Isalo's three diurnal lemurs) and the Blue Pool, Black Pool and Nymphs' Waterfall. Overnight at Hotel H1 Isalo.",
        fr: "Du point de vue panoramique aux sépultures bara et à la forêt de tapia, par-dessus la crête au-dessus de Mikaiky, descente dans le canyon de Namaza (les trois lémuriens diurnes de l'Isalo) et les Piscines Bleue et Noire et la Cascade des Nymphes. Nuit à l'Hotel H1 Isalo." } },
      { day: { en: "Day 13", fr: "Jour 13" }, title: { en: "Ranohira → Beroroha (155 km, 8h)", fr: "Ranohira → Beroroha (155 km, 8h)" }, description: {
        en: "A long track north along the Isalo massif to the Mangoky River through baobab-dotted savannah; cross by ferry and camp on the riverbank, with an afternoon walk in Beroroha — the last town before the wild. Camping.",
        fr: "Longue piste vers le nord le long du massif de l'Isalo jusqu'au fleuve Mangoky à travers une savane parsemée de baobabs ; traversée en bac et bivouac sur la berge, avec une marche l'après-midi à Beroroha — dernière ville avant le grand vide. Nuit sous tente." } },
      { day: { en: "Day 14", fr: "Jour 14" }, title: { en: "Beroroha → Beronono → Sariaka", fr: "Beroroha → Beronono → Sariaka" }, description: {
        en: "65 km of track to Beronono to meet the porter team, then the start of the 5-day Makay trek — 2–3h hiking to Sariaka camp and Lake Sariaka. Camping.",
        fr: "65 km de piste jusqu'à Beronono pour retrouver l'équipe de porteurs, puis début du trek de 5 jours dans le Makay — 2 à 3h de marche jusqu'au camp de Sariaka et au lac Sariaka. Nuit sous tente." } },
      { day: { en: "Day 15", fr: "Jour 15" }, title: { en: "Makay — canyon day (6–7h)", fr: "Makay — journée canyon (6–7h)" }, description: {
        en: "Cross the Sakamantse gorges with their crystal-clear water and lush vegetation, the Behetaheta forest (wild zebu), and on to the Anosilahy canyon. Camping.",
        fr: "Traversée des gorges de Sakamantse à l'eau cristalline et à la végétation luxuriante, la forêt de Behetaheta (zébus sauvages), puis le canyon d'Anosilahy. Nuit sous tente." } },
      { day: { en: "Day 16", fr: "Jour 16" }, title: { en: "Makay — Anosilahy → Andranovinily (6h)", fr: "Makay — Anosilahy → Andranovinily (6h)" }, description: {
        en: "Over plateaus and ridges with views of the Anosilahy and Sariaka lakes, through a canyon and past a waterfall (a chance to swim) to Andranovinily camp. Camping.",
        fr: "Par plateaux et crêtes avec vue sur les lacs d'Anosilahy et de Sariaka, à travers un canyon et près d'une cascade (baignade possible) jusqu'au camp d'Andranovinily. Nuit sous tente." } },
      { day: { en: "Day 17", fr: "Jour 17" }, title: { en: "Makay — Andranovinily → Beravitrahazo (6–7h)", fr: "Makay — Andranovinily → Beravitrahazo (6–7h)" }, description: {
        en: "Deeper into the Makay's spectacular landscapes and palm forest (lemurs possible), through the Mazedrano canyon where the water can reach hip level, camping by the Makay River. Camping.",
        fr: "Plus profond dans les paysages spectaculaires du Makay et sa palmeraie (lémuriens possibles), à travers le canyon de Mazedrano où l'eau peut monter jusqu'à la taille, bivouac au bord de la rivière Makay. Nuit sous tente." } },
      { day: { en: "Day 18", fr: "Jour 18" }, title: { en: "Makay — Beravitrahazo → Beronono (6–8h)", fr: "Makay — Beravitrahazo → Beronono (6–8h)" }, description: {
        en: "Trek the eroded ruiniform sandstone plateau and visit the Mahatiny cave and its rock paintings; camp at Beronono. Camping.",
        fr: "Trek sur le plateau de grès ruiniforme érodé et visite de la grotte de Mahatiny et de ses peintures rupestres ; bivouac à Beronono. Nuit sous tente." } },
      { day: { en: "Day 19", fr: "Jour 19" }, title: { en: "Beronono → Beroroha → Ranohira (9h)", fr: "Beronono → Beroroha → Ranohira (9h)" }, description: {
        en: "Part ways with the porter team and take the 4WD back (9h of track, crossing the Mangoky) to Ranohira. Overnight at Hotel H1 Isalo.",
        fr: "Séparation d'avec l'équipe de porteurs et retour en 4×4 (9h de piste, traversée du Mangoky) jusqu'à Ranohira. Nuit à l'Hotel H1 Isalo." } },
      { day: { en: "Day 20", fr: "Jour 20" }, title: { en: "Ranohira → Zombitse → Toliara (280 km, 5h)", fr: "Ranohira → Zombitse → Toliara (280 km, 5h)" }, description: {
        en: "Drive through baobabs and thorny forest, Zombitse National Park and Mahafaly/Antandroy tombs, to Toliara. Overnight at Auberge de la Table.",
        fr: "Route entre baobabs et forêt épineuse, parc national de Zombitse et tombeaux mahafaly/antandroy, jusqu'à Toliara. Nuit à l'Auberge de la Table." } },
      { day: { en: "Day 21", fr: "Jour 21" }, title: { en: "Toliara → Antananarivo (flight)", fr: "Toliara → Antananarivo (vol)" }, description: {
        en: "Transfer to Toliara airport and fly to Antananarivo; transfer to your hotel. Overnight at Sakamanga Hotel.",
        fr: "Transfert à l'aéroport de Toliara et vol vers Antananarivo ; transfert à votre hôtel. Nuit à l'hôtel Sakamanga." } },
      { day: { en: "Day 22", fr: "Jour 22" }, title: { en: "International departure", fr: "Départ international" }, description: {
        en: "Your tour comes to an end. We arrange your transfer to Ivato Airport. Safe travels!",
        fr: "Votre circuit s'achève. Nous organisons votre transfert vers l'aéroport d'Ivato. Bon retour !" } },
    ],
    included: {
      en: ["Air-conditioned 4WD including fuel", "English-speaking driver", "Accommodation in double/twin with breakfast", "Domestic flight", "Entry fees to all mentioned parks", "Local park guides", "Porters", "Full board while trekking", "Camping gear", "Driver & guide's board and lodging", "Taxes"],
      fr: ["4×4 climatisé, carburant inclus", "Chauffeur anglophone", "Hébergement en chambre double/twin avec petit-déjeuner", "Vol intérieur", "Droits d'entrée de tous les parcs cités", "Guides locaux dans les parcs", "Porteurs", "Pension complète pendant le trek", "Matériel de camping", "Hébergement et repas du chauffeur et du guide", "Taxes"],
    },
    notIncluded: {
      en: ["Drinks", "Tips and personal purchases", "All meals (lunches and dinners)", "Travel insurance and visa", "International flights"],
      fr: ["Boissons", "Pourboires et achats personnels", "Tous les repas (déjeuners et dîners)", "Assurance voyage et visa", "Vols internationaux"],
    },
    bestSeason: { en: "All year round", fr: "Toute l'année" },
  },

  // ==========================================================================
  //  #33 — Madagascar Unveiled: Rivers, Baobabs & Wild Wonders (22 jours)
  // ==========================================================================
  {
    slug: "rivers-baobabs-wild-22d",
    macroRegions: ["west", "south", "highlands"],
    gallery: ["/images/rivers-baobabs-wild-22d-1.webp", "/images/rivers-baobabs-wild-22d-2.webp", "/images/rivers-baobabs-wild-22d-3.webp"],
    title: { en: "Madagascar Unveiled — Rivers, Baobabs & Wild Wonders", fr: "Madagascar dévoilé — Fleuves, baobabs & merveilles sauvages" },
    region: "Tsiribihina · Bemaraha · Belo sur Mer · Salary · Isalo · Ranomafana",
    category: "nature",
    tone: "ocean",
    durationDays: 22,
    priceFrom: 3690,
    priceEstimated: true,
    groupMax: 12,
    difficulty: 2,
    featured: false,
    summary: {
      en: "A flight-free 22-day overland odyssey: the Tsiribihina river descent, the Tsingy de Bemaraha, the Avenue of the Baobabs, the wild west coast from Belo sur Mer to Salary, and the RN7's parks.",
      fr: "Une odyssée terrestre de 22 jours sans vol intérieur : la descente de la Tsiribihina, les Tsingy de Bemaraha, l'Allée des Baobabs, la côte ouest sauvage de Belo sur Mer à Salary, et les parcs de la RN7.",
    },
    description: {
      en: "A 22-day journey of discovery through Madagascar — entirely independent of domestic flights. From the lush Menabe to the wild west coast and the dramatic southern highlands: begin with a mesmerising descent of the Tsiribihina River, explore the otherworldly Tsingy de Bemaraha and the iconic Avenue of the Baobabs, then travel the pristine coastline from Morondava to Toliara through fishing villages, salt flats and remote bays, before following the legendary RN7 through parks brimming with wildlife and timeless cultural traditions.",
      fr: "Un voyage de découverte de 22 jours à travers Madagascar — entièrement sans vol intérieur. Du Menabe luxuriant à la côte ouest sauvage et aux hautes terres du sud : débutez par une descente envoûtante du fleuve Tsiribihina, explorez les Tsingy de Bemaraha et l'emblématique Allée des Baobabs, puis longez le littoral préservé de Morondava à Toliara à travers villages de pêcheurs, marais salants et baies isolées, avant de suivre la légendaire RN7 à travers des parcs foisonnants de faune et de traditions.",
    },
    highlights: {
      en: ["The Tsiribihina river descent", "UNESCO Tsingy de Bemaraha", "Walk among the baobabs", "Belo sur Mer & Salary Bay"],
      fr: ["La descente de la Tsiribihina", "Les Tsingy de Bemaraha (UNESCO)", "Marcher parmi les baobabs", "Belo sur Mer & la baie de Salary"],
    },
    itinerary: [
      { day: { en: "Day 1", fr: "Jour 1" }, title: { en: "International arrival in Antananarivo", fr: "Arrivée internationale à Antananarivo" }, description: {
        en: "Greeted at Ivato with help through formalities (SIM, currency), then the drive to your hotel across the twelve hills of Antananarivo — markets, colonial buildings and rice paddies. Overnight at Sakamanga Hotel.",
        fr: "Accueil à Ivato avec assistance aux formalités (SIM, change), puis route vers votre hôtel à travers les douze collines d'Antananarivo — marchés, bâtiments coloniaux et rizières. Nuit à l'hôtel Sakamanga." } },
      { day: { en: "Day 2", fr: "Jour 2" }, title: { en: "Antananarivo → Antsirabe (170 km, 5h)", fr: "Antananarivo → Antsirabe (170 km, 5h)" }, description: {
        en: "South on the RN7 through Behenjy's produce markets and Ambatolampy's aluminium workshops, amid red laterite and terraced paddies, to Antsirabe, the 'City of Waters', and its crater lakes Andraikiba and Tritriva. Overnight at Chambre du Voyageur.",
        fr: "Vers le sud sur la RN7, marchés de Behenjy et ateliers d'aluminium d'Ambatolampy, au milieu de la latérite rouge et des rizières en terrasses, jusqu'à Antsirabe, la « ville des eaux », et ses lacs de cratère Andraikiba et Tritriva. Nuit à la Chambre du Voyageur." } },
      { day: { en: "Day 3", fr: "Jour 3" }, title: { en: "Antsirabe → Miandrivazo (220 km, 6h)", fr: "Antsirabe → Miandrivazo (220 km, 6h)" }, description: {
        en: "A rural walk around Betafo (blacksmiths, brick-making), a picnic at Ambatomalaza hill, then on to Miandrivazo on the Tsiribihina, meeting your river guide for a briefing. Overnight at Princesse Tsiribihina.",
        fr: "Balade rurale autour de Betafo (forgerons, briqueterie), pique-nique sur la colline d'Ambatomalaza, puis route vers Miandrivazo sur la Tsiribihina, où vous rencontrez votre guide fluvial pour le briefing. Nuit à la Princesse Tsiribihina." } },
      { day: { en: "Day 4", fr: "Jour 4" }, title: { en: "Miandrivazo → Tsiribihina River", fr: "Miandrivazo → fleuve Tsiribihina" }, description: {
        en: "Board the adapted barge at Masiakampy and cruise past herons and kingfishers and Sakalava reed-hut villages, swim at Nosy Ampela waterfall (lemurs), and camp on a sandbank under the stars. Camping, full board.",
        fr: "Embarquement sur la barge aménagée à Masiakampy et descente parmi hérons et martins-pêcheurs et villages sakalava aux cases de roseaux, baignade à la cascade de Nosy Ampela (lémuriens), et bivouac sur un banc de sable sous les étoiles. Nuit sous tente, pension complète." } },
      { day: { en: "Day 5", fr: "Jour 5" }, title: { en: "Tsiribihina River", fr: "Fleuve Tsiribihina" }, description: {
        en: "Continue past cliffs, rice fields and villages (Begidro, Berevo), meet the first great baobabs at Ambatomisay, and camp on a beach with a traditional Malagasy dance by the fire. Camping, full board.",
        fr: "Suite de la descente au fil des falaises, rizières et villages (Begidro, Berevo), premiers grands baobabs à Ambatomisay, et bivouac sur une plage avec une danse traditionnelle malgache autour du feu. Nuit sous tente, pension complète." } },
      { day: { en: "Day 6", fr: "Jour 6" }, title: { en: "Belo sur Tsiribihina → Bekopaka (120 km, 4h)", fr: "Belo sur Tsiribihina → Bekopaka (120 km, 4h)" }, description: {
        en: "Morning birdwatching, a last lunch aboard, then disembark at Belo and transfer by 4WD across dry forest to Bekopaka, gateway to the Tsingy de Bemaraha. Overnight at Orchidée du Bemaraha.",
        fr: "Observation des oiseaux le matin, dernier déjeuner à bord, puis débarquement à Belo et transfert en 4×4 à travers la forêt sèche jusqu'à Bekopaka, porte des Tsingy de Bemaraha. Nuit à l'Orchidée du Bemaraha." } },
      { day: { en: "Day 7", fr: "Jour 7" }, title: { en: "Tsingy de Bemaraha", fr: "Tsingy de Bemaraha" }, description: {
        en: "A full day in the UNESCO Grands Tsingy — corridors, suspension bridges, limestone pinnacles, caves and panoramic views on a 4-hour observational walk, safely harnessed. Overnight at Orchidée du Bemaraha.",
        fr: "Une journée entière dans les Grands Tsingy (UNESCO) — corridors, ponts suspendus, aiguilles calcaires, grottes et panoramas sur une marche d'observation de 4h, harnaché en sécurité. Nuit à l'Orchidée du Bemaraha." } },
      { day: { en: "Day 8", fr: "Jour 8" }, title: { en: "Bekopaka → Kirindy (200 km, 6h + ferry)", fr: "Bekopaka → Kirindy (200 km, 6h + bac)" }, description: {
        en: "South by 4WD and ferry past decorated Sakalava tombs to Kirindy; a guided night walk for mouse lemurs, chameleons and the fossa. Overnight at Relais du Kirindy.",
        fr: "Vers le sud en 4×4 et bac, devant les tombeaux sakalava décorés, jusqu'à Kirindy ; marche nocturne guidée (microcèbes, caméléons, fossa). Nuit au Relais du Kirindy." } },
      { day: { en: "Day 9", fr: "Jour 9" }, title: { en: "Kirindy → Morondava (70 km, 2h)", fr: "Kirindy → Morondava (70 km, 2h)" }, description: {
        en: "A morning walk in Kirindy (Verreaux's sifaka), then the Avenue of the Baobabs bathed in golden sunset before Morondava. Overnight at Chez Maggie.",
        fr: "Une marche matinale à Kirindy (propithèque de Verreaux), puis l'Allée des Baobabs baignée par le coucher de soleil doré avant Morondava. Nuit Chez Maggie." } },
      { day: { en: "Day 10", fr: "Jour 10" }, title: { en: "Morondava → Belo sur Mer (120 km, 4h)", fr: "Morondava → Belo sur Mer (120 km, 4h)" }, description: {
        en: "Drive south through semi-arid country and shallow river crossings to Belo sur Mer, a fishing village of traditional shipbuilding and salt production; explore the village or relax on the beach. Overnight at Ecolodge du Menabe.",
        fr: "Route vers le sud à travers une contrée semi-aride et des gués jusqu'à Belo sur Mer, village de pêcheurs réputé pour la construction navale traditionnelle et la production de sel ; découverte du village ou détente sur la plage. Nuit à l'Ecolodge du Menabe." } },
      { day: { en: "Day 11", fr: "Jour 11" }, title: { en: "Belo sur Mer", fr: "Belo sur Mer" }, description: {
        en: "A day at leisure — traditional shipyards, snorkelling on the coral reefs, whale watching in July–August, and meeting the Vezo fishing communities. Overnight at Ecolodge du Menabe.",
        fr: "Journée libre — chantiers navals traditionnels, snorkeling sur les récifs coralliens, baleines en juillet–août, et rencontre des communautés de pêcheurs vezo. Nuit à l'Ecolodge du Menabe." } },
      { day: { en: "Day 12", fr: "Jour 12" }, title: { en: "Belo sur Mer → Morombe (260 km, 7h)", fr: "Belo sur Mer → Morombe (260 km, 7h)" }, description: {
        en: "A long, photogenic drive south, stopping at Andranopasy for ancient baobabs (Adansonia grandidieri, rubrostipa, za), reaching Morombe by evening. Overnight at Chez Katia.",
        fr: "Une longue route photogénique vers le sud, arrêt à Andranopasy pour d'anciens baobabs (Adansonia grandidieri, rubrostipa, za), arrivée à Morombe en soirée. Nuit Chez Katia." } },
      { day: { en: "Day 13", fr: "Jour 13" }, title: { en: "Morombe → Salary (130 km, 5h)", fr: "Morombe → Salary (130 km, 5h)" }, description: {
        en: "Along the coast over sandy tracks past the coves of Andavadoaka, casuarinas and baobabs, to the quiet, pristine Salary Bay; afternoon at leisure. Overnight at Salary Bay.",
        fr: "Le long de la côte sur des pistes sableuses, au-delà des criques d'Andavadoaka, filaos et baobabs, jusqu'à la baie paisible et préservée de Salary ; après-midi libre. Nuit à Salary Bay." } },
      { day: { en: "Day 14", fr: "Jour 14" }, title: { en: "Salary Bay", fr: "Baie de Salary" }, description: {
        en: "A full day of scuba diving, whale watching (July–August), pirogue excursions with Vezo fishermen, or a visit to the Mikea forest. Overnight at Salary Bay.",
        fr: "Une journée entière de plongée, d'observation des baleines (juillet–août), de sorties en pirogue avec les pêcheurs vezo, ou de découverte de la forêt de Mikea. Nuit à Salary Bay." } },
      { day: { en: "Day 15", fr: "Jour 15" }, title: { en: "Salary → Ifaty (80 km, 3h)", fr: "Salary → Ifaty (80 km, 3h)" }, description: {
        en: "South along the Mozambique Channel past fishing villages and dunes, a stop at Ankasy and the Reniala spiny forest near Toliara (baobabs, endemic birds), on to Ifaty. Overnight at La Bella Donna.",
        fr: "Vers le sud le long du canal du Mozambique, villages de pêcheurs et dunes, arrêt à Ankasy et à la forêt épineuse de Reniala près de Toliara (baobabs, oiseaux endémiques), puis Ifaty. Nuit à La Bella Donna." } },
      { day: { en: "Day 16", fr: "Jour 16" }, title: { en: "Ifaty → Toliara → Ranohira (280 km, 6h)", fr: "Ifaty → Toliara → Ranohira (280 km, 6h)" }, description: {
        en: "East across the Mahafaly plateau with its Aloalo-carved tombs, through the sapphire town of Ilakaka, to Ranohira, gateway to Isalo. Overnight at Hotel H1 Isalo.",
        fr: "Vers l'est à travers le plateau Mahafaly et ses tombeaux sculptés d'aloalo, en passant par Ilakaka la ville du saphir, jusqu'à Ranohira, porte de l'Isalo. Nuit à l'Hotel H1 Isalo." } },
      { day: { en: "Day 17", fr: "Jour 17" }, title: { en: "Isalo National Park", fr: "Parc national de l'Isalo" }, description: {
        en: "Explore Isalo's canyons, natural pools, waterfalls and sandstone formations (lemurs, endemic birds), ending at the Window of Isalo as the setting sun turns the rock to gold. Overnight at Hotel H1 Isalo.",
        fr: "Exploration des canyons, piscines naturelles, cascades et formations de grès de l'Isalo (lémuriens, oiseaux endémiques), avec la Fenêtre de l'Isalo au coucher du soleil, quand la roche vire à l'or. Nuit à l'Hotel H1 Isalo." } },
      { day: { en: "Day 18", fr: "Jour 18" }, title: { en: "Ranohira → Anja → Fianarantsoa (360 km, 8h)", fr: "Ranohira → Anja → Fianarantsoa (360 km, 8h)" }, description: {
        en: "North with a stop at Anja Community Reserve (ring-tailed lemurs, granite boulders), then Fianarantsoa and its historic hillside town. Overnight at Setam Lodge.",
        fr: "Vers le nord avec un arrêt à la réserve communautaire d'Anja (makis catta, blocs de granite), puis Fianarantsoa et sa vieille ville perchée. Nuit au Setam Lodge." } },
      { day: { en: "Day 19", fr: "Jour 19" }, title: { en: "Ranomafana National Park", fr: "Parc national de Ranomafana" }, description: {
        en: "A day hiking Ranomafana's rainforest for golden bamboo lemurs, Milne-Edwards' sifakas and the velvet asity, with waterfalls and hot springs. Overnight at Setam Lodge.",
        fr: "Une journée de randonnée dans la forêt de Ranomafana pour les lémuriens à bambou doré, les propithèques de Milne-Edwards et la philépitte veloutée, avec cascades et sources chaudes. Nuit au Setam Lodge." } },
      { day: { en: "Day 20", fr: "Jour 20" }, title: { en: "Ranomafana → Antsirabe (260 km, 6h)", fr: "Ranomafana → Antsirabe (260 km, 6h)" }, description: {
        en: "North through Ambositra, capital of Zafimaniry woodcraft — artisan workshops and markets — then Antsirabe, a colonial town of thermal springs and lively crafts. Overnight at Chambre du Voyageur.",
        fr: "Vers le nord par Ambositra, capitale de la sculpture zafimaniry — ateliers d'artisans et marchés — puis Antsirabe, ville coloniale aux sources thermales et à l'artisanat vivant. Nuit à la Chambre du Voyageur." } },
      { day: { en: "Day 21", fr: "Jour 21" }, title: { en: "Antsirabe → Antananarivo (170 km, 5h)", fr: "Antsirabe → Antananarivo (170 km, 5h)" }, description: {
        en: "Return to the capital through Merina villages and terraced rice fields, arriving for lunch and a city tour — the Manjakamiadana Palace, markets and panoramic viewpoints. Overnight at Sakamanga Hotel.",
        fr: "Retour vers la capitale à travers villages merina et rizières en terrasses, arrivée pour le déjeuner et visite de la ville — le Palais de Manjakamiadana, les marchés et les points de vue. Nuit à l'hôtel Sakamanga." } },
      { day: { en: "Day 22", fr: "Jour 22" }, title: { en: "International departure", fr: "Départ international" }, description: {
        en: "Transfer to Ivato Airport for your international flight, departing with lasting memories of Madagascar's landscapes, wildlife and culture.",
        fr: "Transfert vers l'aéroport d'Ivato pour votre vol international, avec des souvenirs impérissables des paysages, de la faune et de la culture de Madagascar." } },
    ],
    included: {
      en: ["Air-conditioned 4WD transport", "Experienced driver-guide", "Accommodation in double/twin with breakfast", "Entry fees to all mentioned parks", "Compulsory local park guides", "Driver & guide's board and lodging"],
      fr: ["Transport en 4×4 climatisé", "Chauffeur-guide expérimenté", "Hébergement en chambre double/twin avec petit-déjeuner", "Droits d'entrée de tous les parcs cités", "Guides locaux obligatoires dans les parcs", "Hébergement et repas du chauffeur et du guide"],
    },
    notIncluded: {
      en: ["Drinks", "Tips and personal purchases", "All meals (lunches and dinners)", "Travel insurance and visa", "International flights"],
      fr: ["Boissons", "Pourboires et achats personnels", "Tous les repas (déjeuners et dîners)", "Assurance voyage et visa", "Vols internationaux"],
    },
    bestSeason: { en: "May to November", fr: "De mai à novembre" },
  },
];

// ---------------------------------------------------------------------------
//  Helpers
// ---------------------------------------------------------------------------

export function getCircuit(slug: string): Circuit | undefined {
  return circuits.find((c) => c.slug === slug);
}

export function featuredCircuits(): Circuit[] {
  return circuits.filter((c) => c.featured);
}

export function categoryLabel(key: Category, lang: Locale): string {
  const cat = CATEGORIES.find((c) => c.key === key);
  return cat ? t(cat.label, lang) : key;
}

/** Fourchette de prix (utile pour l'affichage "à partir de"). */
export function priceRange(): { min: number; max: number } {
  const prices = circuits.map((c) => c.priceFrom);
  return { min: Math.min(...prices), max: Math.max(...prices) };
}

/** Palette d'ambiances SVG pour la galerie d'un circuit (tone en premier). */
export function circuitGalleryTones(c: Circuit): Tone[] {
  const all: Tone[] = ["sunset", "forest", "ocean", "canyon", "highland"];
  return [c.tone, ...all.filter((tone) => tone !== c.tone)];
}
