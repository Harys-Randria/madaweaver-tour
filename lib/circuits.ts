import type { L, Locale } from "./i18n";
import { t } from "./i18n";

// ============================================================================
//  DONNÉES DES CIRCUITS — bilingues EN / FR
//  Ajoutez / modifiez vos circuits ici. Aucun back-end requis.
// ============================================================================

export type Category = "wildlife" | "beach" | "adventure" | "culture" | "nature";

/** Clé de palette pour l'illustration d'ambiance (voir components/Scenery.tsx). */
export type Tone = "sunset" | "forest" | "canyon" | "ocean" | "highland";

export interface ItineraryStep {
  day: L;
  title: L;
  description: L;
}

export interface Circuit {
  slug: string;
  title: L;
  region: string;
  category: Category;
  tone: Tone;
  durationDays: number;
  priceFrom: number; // à partir de, en euros
  groupMax: number;
  difficulty: 1 | 2 | 3; // 1 facile · 2 modéré · 3 sportif
  featured?: boolean;
  /** Chemin optionnel vers une vraie photo dans /public (ex: "/images/baobabs.jpg"). */
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
  {
    slug: "baobabs-sunset",
    title: { en: "Baobabs & the Wild West", fr: "Baobabs & Grand Ouest" },
    region: "Morondava",
    category: "nature",
    tone: "sunset",
    durationDays: 6,
    priceFrom: 890,
    groupMax: 8,
    difficulty: 1,
    featured: true,
    summary: {
      en: "Stand beneath thousand-year-old giants as the sky turns to fire on the legendary Avenue of the Baobabs.",
      fr: "Marchez sous des géants millénaires alors que le ciel s'embrase sur la légendaire Allée des Baobabs.",
    },
    description: {
      en: "The most iconic image of Madagascar comes alive on this journey to the west coast. Photograph the Avenue of the Baobabs at golden hour, meet Sakalava communities, and discover the strange Baobab Amoureux twisted together by love and time.",
      fr: "L'image la plus emblématique de Madagascar prend vie lors de ce voyage vers la côte ouest. Photographiez l'Allée des Baobabs à l'heure dorée, rencontrez les communautés Sakalava et découvrez l'étrange Baobab Amoureux enlacé par le temps.",
    },
    highlights: {
      en: [
        "Sunset & sunrise at the Avenue of the Baobabs",
        "The famous 'Baobabs Amoureux' (Lovers' Baobabs)",
        "Kirindy Reserve — fossa & nocturnal lemurs",
        "Local Sakalava fishing villages",
      ],
      fr: [
        "Coucher et lever de soleil sur l'Allée des Baobabs",
        "Les fameux « Baobabs Amoureux »",
        "Réserve de Kirindy — fossa & lémuriens nocturnes",
        "Villages de pêcheurs Sakalava",
      ],
    },
    itinerary: [
      {
        day: { en: "Day 1", fr: "Jour 1" },
        title: { en: "Arrival in Morondava", fr: "Arrivée à Morondava" },
        description: {
          en: "Welcome transfer, seaside briefing and a first relaxed evening by the Mozambique Channel.",
          fr: "Transfert d'accueil, briefing en bord de mer et première soirée détente face au canal du Mozambique.",
        },
      },
      {
        day: { en: "Day 2–3", fr: "Jour 2–3" },
        title: { en: "The Avenue of the Baobabs", fr: "L'Allée des Baobabs" },
        description: {
          en: "Golden-hour photography sessions at dawn and dusk, plus the Lovers' Baobabs and Kirindy nature reserve.",
          fr: "Sessions photo à l'aube et au crépuscule, plus les Baobabs Amoureux et la réserve de Kirindy.",
        },
      },
      {
        day: { en: "Day 4–5", fr: "Jour 4–5" },
        title: { en: "Kirindy wildlife", fr: "Faune de Kirindy" },
        description: {
          en: "Night walks in search of the fossa and mouse lemurs, immersion in Sakalava village life.",
          fr: "Balades nocturnes à la recherche du fossa et des microcèbes, immersion dans la vie villageoise Sakalava.",
        },
      },
      {
        day: { en: "Day 6", fr: "Jour 6" },
        title: { en: "Departure", fr: "Départ" },
        description: {
          en: "Free morning and transfer to the airport with memories that last a lifetime.",
          fr: "Matinée libre et transfert à l'aéroport avec des souvenirs pour toute une vie.",
        },
      },
    ],
    included: {
      en: ["4×4 with driver-guide", "Accommodation (5 nights)", "Daily breakfast", "Park & reserve fees"],
      fr: ["4×4 avec chauffeur-guide", "Hébergement (5 nuits)", "Petit-déjeuner quotidien", "Droits de parcs & réserves"],
    },
    notIncluded: {
      en: ["International flights", "Lunches & dinners", "Travel insurance", "Personal expenses"],
      fr: ["Vols internationaux", "Déjeuners & dîners", "Assurance voyage", "Dépenses personnelles"],
    },
    bestSeason: { en: "April to November", fr: "D'avril à novembre" },
  },
  {
    slug: "lemurs-rainforest",
    title: { en: "Lemurs of Andasibe", fr: "Lémuriens d'Andasibe" },
    region: "Andasibe-Mantadia",
    category: "wildlife",
    tone: "forest",
    durationDays: 4,
    priceFrom: 540,
    groupMax: 10,
    difficulty: 1,
    featured: true,
    summary: {
      en: "Wake to the haunting song of the Indri, the largest living lemur, in a misty primary rainforest.",
      fr: "Réveillez-vous au chant envoutant de l'Indri, le plus grand lémurien vivant, dans une forêt primaire brumeuse.",
    },
    description: {
      en: "Just three hours from the capital, Andasibe is Madagascar's easiest wildlife encounter. Track the Indri by day, spot chameleons and nocturnal lemurs by night, and float past the island's endemic species at Lemur Island.",
      fr: "À seulement trois heures de la capitale, Andasibe offre la rencontre animalière la plus accessible de Madagascar. Pistez l'Indri le jour, observez caméléons et lémuriens nocturnes la nuit, et approchez les espèces endémiques sur l'Île aux Lémuriens.",
    },
    highlights: {
      en: [
        "The song of the Indri at dawn",
        "Night walk: chameleons & mouse lemurs",
        "Lemur Island canoe encounter",
        "Endemic orchids & Mantadia primary forest",
      ],
      fr: [
        "Le chant de l'Indri à l'aube",
        "Marche nocturne : caméléons & microcèbes",
        "Rencontre en pirogue sur l'Île aux Lémuriens",
        "Orchidées endémiques & forêt primaire de Mantadia",
      ],
    },
    itinerary: [
      {
        day: { en: "Day 1", fr: "Jour 1" },
        title: { en: "Tana to Andasibe", fr: "Tana vers Andasibe" },
        description: {
          en: "Scenic drive east, evening night walk along the forest edge.",
          fr: "Route panoramique vers l'est, marche nocturne en lisière de forêt le soir.",
        },
      },
      {
        day: { en: "Day 2", fr: "Jour 2" },
        title: { en: "Analamazaotra Reserve", fr: "Réserve d'Analamazaotra" },
        description: {
          en: "Morning trek to find the Indri family, afternoon at Lemur Island.",
          fr: "Randonnée matinale à la rencontre de la famille d'Indris, après-midi sur l'Île aux Lémuriens.",
        },
      },
      {
        day: { en: "Day 3", fr: "Jour 3" },
        title: { en: "Mantadia primary forest", fr: "Forêt primaire de Mantadia" },
        description: {
          en: "Deeper trek for diademed sifakas and rare endemic birds.",
          fr: "Randonnée plus profonde pour les propithèques à diadème et oiseaux endémiques rares.",
        },
      },
      {
        day: { en: "Day 4", fr: "Jour 4" },
        title: { en: "Return to Tana", fr: "Retour à Tana" },
        description: {
          en: "Craft stop en route and transfer back to the capital.",
          fr: "Halte artisanale sur la route et transfert vers la capitale.",
        },
      },
    ],
    included: {
      en: ["Private vehicle & driver", "Local naturalist guide", "Accommodation (3 nights)", "Park permits"],
      fr: ["Véhicule privé & chauffeur", "Guide naturaliste local", "Hébergement (3 nuits)", "Permis de parcs"],
    },
    notIncluded: {
      en: ["Flights", "Meals not stated", "Insurance", "Tips"],
      fr: ["Vols", "Repas non mentionnés", "Assurance", "Pourboires"],
    },
    bestSeason: { en: "All year (drier Apr–Nov)", fr: "Toute l'année (plus sec avr.–nov.)" },
  },
  {
    slug: "tsingy-bemaraha",
    title: { en: "Tsingy de Bemaraha", fr: "Tsingy de Bemaraha" },
    region: "Melaky",
    category: "adventure",
    tone: "canyon",
    durationDays: 8,
    priceFrom: 1450,
    groupMax: 6,
    difficulty: 3,
    featured: true,
    summary: {
      en: "Cross rope bridges over a razor-sharp stone forest — a UNESCO cathedral of limestone found nowhere else on Earth.",
      fr: "Franchissez des ponts suspendus au-dessus d'une forêt de pierres tranchantes — une cathédrale de calcaire classée UNESCO, unique au monde.",
    },
    description: {
      en: "The Tsingy are Madagascar at its most surreal: needle-sharp limestone pinnacles carved over millennia. Harnessed and via-ferrata equipped, you'll climb, crawl and cross suspended bridges through this labyrinth, combined with pirogue trips through the Manambolo Gorges.",
      fr: "Les Tsingy, c'est Madagascar dans toute sa démesure : des aiguilles de calcaire ciselées durant des millénaires. Harnaché et équipé de via ferrata, vous grimpez, rampez et traversez des ponts suspendus dans ce labyrinthe, complété par des balades en pirogue dans les Gorges de la Manambolo.",
    },
    highlights: {
      en: [
        "Via-ferrata through the Grand Tsingy",
        "Suspended bridges over the pinnacles",
        "Manambolo Gorge pirogue trip",
        "Combined with the Avenue of the Baobabs",
      ],
      fr: [
        "Via ferrata dans le Grand Tsingy",
        "Ponts suspendus au-dessus des pics",
        "Balade en pirogue dans les Gorges de la Manambolo",
        "Combiné avec l'Allée des Baobabs",
      ],
    },
    itinerary: [
      {
        day: { en: "Day 1–2", fr: "Jour 1–2" },
        title: { en: "Morondava & baobabs", fr: "Morondava & baobabs" },
        description: {
          en: "Arrival and the Avenue of the Baobabs before heading north.",
          fr: "Arrivée et Allée des Baobabs avant de remonter vers le nord.",
        },
      },
      {
        day: { en: "Day 3–4", fr: "Jour 3–4" },
        title: { en: "Journey to Bekopaka", fr: "Route vers Bekopaka" },
        description: {
          en: "Rugged 4×4 tracks and two river ferry crossings into deep wilderness.",
          fr: "Pistes 4×4 accidentées et deux traversées en bac au cœur de la brousse.",
        },
      },
      {
        day: { en: "Day 5–6", fr: "Jour 5–6" },
        title: { en: "Grand & Petit Tsingy", fr: "Grand & Petit Tsingy" },
        description: {
          en: "Full via-ferrata circuits, suspended bridges and the Manambolo Gorges by pirogue.",
          fr: "Circuits via ferrata complets, ponts suspendus et Gorges de la Manambolo en pirogue.",
        },
      },
      {
        day: { en: "Day 7–8", fr: "Jour 7–8" },
        title: { en: "Return & departure", fr: "Retour & départ" },
        description: {
          en: "Drive back to Morondava, final baobab sunset and flight home.",
          fr: "Retour à Morondava, dernier coucher de soleil sur les baobabs et vol retour.",
        },
      },
    ],
    included: {
      en: ["4×4 & ferry crossings", "Via-ferrata equipment & guide", "Accommodation (7 nights)", "All park fees"],
      fr: ["4×4 & traversées en bac", "Équipement via ferrata & guide", "Hébergement (7 nuits)", "Tous les droits de parc"],
    },
    notIncluded: {
      en: ["International flights", "Some meals", "Insurance", "Personal gear"],
      fr: ["Vols internationaux", "Certains repas", "Assurance", "Équipement personnel"],
    },
    bestSeason: { en: "May to November (dry road)", fr: "De mai à novembre (piste sèche)" },
  },
  {
    slug: "nosy-be-paradise",
    title: { en: "Nosy Be Island Paradise", fr: "Nosy Be, île paradis" },
    region: "Nosy Be",
    category: "beach",
    tone: "ocean",
    durationDays: 7,
    priceFrom: 1180,
    groupMax: 12,
    difficulty: 1,
    featured: true,
    summary: {
      en: "Turquoise lagoons, ylang-ylang scented breezes and island-hopping to some of the Indian Ocean's finest snorkeling.",
      fr: "Lagons turquoise, brises parfumées à l'ylang-ylang et sauts d'îles vers les plus beaux spots de snorkeling de l'océan Indien.",
    },
    description: {
      en: "Madagascar's flagship beach destination. From the 'Perfume Island', set sail to Nosy Iranja's sandbar, snorkel the coral gardens of Nosy Tanikely marine park, and unwind on powder-white beaches beneath the tropical sun.",
      fr: "La destination balnéaire phare de Madagascar. Depuis « l'île aux parfums », mettez le cap sur le banc de sable de Nosy Iranja, explorez les jardins de corail du parc marin de Nosy Tanikely et détendez-vous sur des plages de sable blanc sous le soleil tropical.",
    },
    highlights: {
      en: [
        "Nosy Iranja twin-island sandbar",
        "Snorkeling Nosy Tanikely marine reserve",
        "Ylang-ylang & rum plantation visit",
        "Sunset dhow cruise",
      ],
      fr: [
        "Le banc de sable des îles jumelles de Nosy Iranja",
        "Snorkeling dans la réserve marine de Nosy Tanikely",
        "Visite d'une plantation d'ylang-ylang & de rhum",
        "Croisière en boutre au coucher du soleil",
      ],
    },
    itinerary: [
      {
        day: { en: "Day 1", fr: "Jour 1" },
        title: { en: "Arrival on the island", fr: "Arrivée sur l'île" },
        description: {
          en: "Transfer to your beach resort, sunset welcome cocktail.",
          fr: "Transfert vers votre resort de plage, cocktail de bienvenue au coucher du soleil.",
        },
      },
      {
        day: { en: "Day 2–3", fr: "Jour 2–3" },
        title: { en: "Nosy Iranja & Tanikely", fr: "Nosy Iranja & Tanikely" },
        description: {
          en: "Boat days to the iconic sandbar and the marine park's coral gardens.",
          fr: "Journées en bateau vers le banc de sable iconique et les jardins de corail du parc marin.",
        },
      },
      {
        day: { en: "Day 4–5", fr: "Jour 4–5" },
        title: { en: "Island culture & flavours", fr: "Culture & saveurs de l'île" },
        description: {
          en: "Ylang-ylang plantations, Hell-Ville market, and free beach time.",
          fr: "Plantations d'ylang-ylang, marché de Hell-Ville et temps libre à la plage.",
        },
      },
      {
        day: { en: "Day 6–7", fr: "Jour 6–7" },
        title: { en: "Relax & departure", fr: "Détente & départ" },
        description: {
          en: "Optional diving or spa, then transfer for your return flight.",
          fr: "Plongée ou spa en option, puis transfert pour votre vol retour.",
        },
      },
    ],
    included: {
      en: ["Airport transfers", "Beachfront accommodation (6 nights)", "2 full boat excursions", "Breakfast daily"],
      fr: ["Transferts aéroport", "Hébergement front de mer (6 nuits)", "2 excursions bateau complètes", "Petit-déjeuner quotidien"],
    },
    notIncluded: {
      en: ["Flights to Nosy Be", "Lunches & dinners", "Diving courses", "Insurance"],
      fr: ["Vols vers Nosy Be", "Déjeuners & dîners", "Cours de plongée", "Assurance"],
    },
    bestSeason: { en: "April to December", fr: "D'avril à décembre" },
  },
  {
    slug: "rn7-grand-south",
    title: { en: "RN7 Grand South Road Trip", fr: "RN7, road trip du Grand Sud" },
    region: "Antananarivo → Tuléar",
    category: "nature",
    tone: "highland",
    durationDays: 12,
    priceFrom: 1990,
    groupMax: 8,
    difficulty: 2,
    featured: false,
    summary: {
      en: "The ultimate Madagascar overland: highlands, rice terraces, ring-tailed lemurs and the sandstone canyons of Isalo.",
      fr: "Le grand traversée de Madagascar : hautes terres, rizières en terrasses, makis catta et canyons de grès de l'Isalo.",
    },
    description: {
      en: "The legendary Route Nationale 7 links the cool highlands to the tropical south-west. Over twelve days you'll cross artisan towns, national parks teeming with lemurs, the surreal Isalo massif and end with your toes in the Mozambique Channel.",
      fr: "La légendaire Route Nationale 7 relie les hautes terres fraîches au sud-ouest tropical. En douze jours, vous traversez des villes d'artisans, des parcs nationaux grouillant de lémuriens, le massif surréaliste de l'Isalo, pour finir les pieds dans le canal du Mozambique.",
    },
    highlights: {
      en: [
        "Ambositra woodcarving & Zafimaniry craft",
        "Ranomafana rainforest by night",
        "Anja Reserve — ring-tailed lemurs up close",
        "Isalo canyons & natural pools",
      ],
      fr: [
        "Sculpture sur bois d'Ambositra & art Zafimaniry",
        "Forêt tropicale de Ranomafana de nuit",
        "Réserve d'Anja — makis catta de très près",
        "Canyons & piscines naturelles de l'Isalo",
      ],
    },
    itinerary: [
      {
        day: { en: "Day 1–3", fr: "Jour 1–3" },
        title: { en: "Highlands & Ambositra", fr: "Hautes terres & Ambositra" },
        description: {
          en: "Antsirabe thermal town and the woodcarving capital of the Zafimaniry.",
          fr: "Antsirabe la thermale et la capitale de la sculpture sur bois des Zafimaniry.",
        },
      },
      {
        day: { en: "Day 4–6", fr: "Jour 4–6" },
        title: { en: "Ranomafana & Fianar", fr: "Ranomafana & Fianar" },
        description: {
          en: "Rainforest treks, night walks and the wine country of Fianarantsoa.",
          fr: "Randonnées en forêt, marches nocturnes et vignobles de Fianarantsoa.",
        },
      },
      {
        day: { en: "Day 7–9", fr: "Jour 7–9" },
        title: { en: "Anja & Isalo", fr: "Anja & Isalo" },
        description: {
          en: "Ring-tailed lemurs at Anja, then the canyons and natural pools of Isalo.",
          fr: "Makis catta à Anja, puis canyons et piscines naturelles de l'Isalo.",
        },
      },
      {
        day: { en: "Day 10–12", fr: "Jour 10–12" },
        title: { en: "Down to the coast", fr: "Descente vers la côte" },
        description: {
          en: "Spiny forest, Zombitse park and beach finale near Tuléar.",
          fr: "Forêt épineuse, parc de Zombitse et final balnéaire près de Tuléar.",
        },
      },
    ],
    included: {
      en: ["Private 4×4 + driver-guide", "Accommodation (11 nights)", "All park permits", "Breakfasts"],
      fr: ["4×4 privé + chauffeur-guide", "Hébergement (11 nuits)", "Tous les permis de parc", "Petits-déjeuners"],
    },
    notIncluded: {
      en: ["Flights", "Lunches & dinners", "Insurance", "Drinks"],
      fr: ["Vols", "Déjeuners & dîners", "Assurance", "Boissons"],
    },
    bestSeason: { en: "April to November", fr: "D'avril à novembre" },
  },
  {
    slug: "sainte-marie-whales",
    title: { en: "Sainte-Marie Whale Season", fr: "Sainte-Marie, saison des baleines" },
    region: "Île Sainte-Marie",
    category: "wildlife",
    tone: "ocean",
    durationDays: 6,
    priceFrom: 1090,
    groupMax: 10,
    difficulty: 1,
    featured: false,
    summary: {
      en: "Each winter, humpback whales gather to breed off this palm-fringed island — witness the ocean's greatest show.",
      fr: "Chaque hiver, les baleines à bosse se rassemblent pour se reproduire au large de cette île bordée de palmiers — assistez au plus grand spectacle de l'océan.",
    },
    description: {
      en: "Between July and September, thousands of humpback whales migrate to the warm waters of Sainte-Marie. Beyond the whale-watching, discover pirate cemeteries, the idyllic Île aux Nattes and some of Madagascar's most laid-back island life.",
      fr: "Entre juillet et septembre, des milliers de baleines à bosse migrent vers les eaux chaudes de Sainte-Marie. Au-delà de l'observation, découvrez les cimetières de pirates, l'idyllique Île aux Nattes et l'ambiance insulaire la plus paisible de Madagascar.",
    },
    highlights: {
      en: [
        "Humpback whale watching (Jul–Sep)",
        "Île aux Nattes lagoon",
        "Historic pirate cemetery",
        "Natural pools of Ambodifotatra",
      ],
      fr: [
        "Observation des baleines à bosse (juil.–sept.)",
        "Lagon de l'Île aux Nattes",
        "Cimetière historique des pirates",
        "Piscines naturelles d'Ambodifotatra",
      ],
    },
    itinerary: [
      {
        day: { en: "Day 1", fr: "Jour 1" },
        title: { en: "Arrival", fr: "Arrivée" },
        description: {
          en: "Island transfer and first sunset over the lagoon.",
          fr: "Transfert sur l'île et premier coucher de soleil sur le lagon.",
        },
      },
      {
        day: { en: "Day 2–3", fr: "Jour 2–3" },
        title: { en: "Whale watching", fr: "Observation des baleines" },
        description: {
          en: "Guided boat outings with marine biologists (in season).",
          fr: "Sorties bateau guidées avec des biologistes marins (en saison).",
        },
      },
      {
        day: { en: "Day 4–5", fr: "Jour 4–5" },
        title: { en: "Île aux Nattes & heritage", fr: "Île aux Nattes & patrimoine" },
        description: {
          en: "Lagoon paradise, pirate history and free beach time.",
          fr: "Lagon paradisiaque, histoire des pirates et temps libre à la plage.",
        },
      },
      {
        day: { en: "Day 6", fr: "Jour 6" },
        title: { en: "Departure", fr: "Départ" },
        description: {
          en: "Leisurely morning and return transfer.",
          fr: "Matinée tranquille et transfert retour.",
        },
      },
    ],
    included: {
      en: ["Transfers & boat outings", "Accommodation (5 nights)", "Whale-watching excursion", "Breakfasts"],
      fr: ["Transferts & sorties bateau", "Hébergement (5 nuits)", "Excursion baleines", "Petits-déjeuners"],
    },
    notIncluded: {
      en: ["Flights to Sainte-Marie", "Some meals", "Insurance", "Extras"],
      fr: ["Vols vers Sainte-Marie", "Certains repas", "Assurance", "Extras"],
    },
    bestSeason: { en: "July to September (whales)", fr: "De juillet à septembre (baleines)" },
  },
  {
    slug: "isalo-canyon",
    title: { en: "Isalo Canyon Trek", fr: "Trek des canyons de l'Isalo" },
    region: "Ihorombe",
    category: "adventure",
    tone: "canyon",
    durationDays: 5,
    priceFrom: 760,
    groupMax: 8,
    difficulty: 2,
    featured: false,
    summary: {
      en: "Hike eroded sandstone massifs to hidden oases, emerald natural pools and unforgettable canyon sunsets.",
      fr: "Randonnez au cœur de massifs de grès érodés vers des oasis cachées, des piscines naturelles émeraude et des couchers de soleil inoubliables.",
    },
    description: {
      en: "Often called Madagascar's Colorado, the Isalo massif is a hiker's dream of ruined-city rock formations, palm-lined canyons and cool swimming holes. Trek by day, camp or lodge by night, and catch the famous 'Window of Isalo' at sunset.",
      fr: "Surnommé le Colorado malgache, le massif de l'Isalo est un rêve de randonneur : formations rocheuses en ruines, canyons bordés de palmiers et vasques d'eau fraîche. Randonnée le jour, bivouac ou lodge la nuit, et la célèbre « Fenêtre de l'Isalo » au coucher du soleil.",
    },
    highlights: {
      en: [
        "Canyon des Makis & Canyon des Rats",
        "Natural swimming pools",
        "The 'Window of Isalo' at sunset",
        "Endemic Pachypodium & ring-tailed lemurs",
      ],
      fr: [
        "Canyon des Makis & Canyon des Rats",
        "Piscines naturelles",
        "La « Fenêtre de l'Isalo » au coucher du soleil",
        "Pachypodium endémiques & makis catta",
      ],
    },
    itinerary: [
      {
        day: { en: "Day 1", fr: "Jour 1" },
        title: { en: "Arrival at Ranohira", fr: "Arrivée à Ranohira" },
        description: {
          en: "Briefing and sunset at the Window of Isalo.",
          fr: "Briefing et coucher de soleil à la Fenêtre de l'Isalo.",
        },
      },
      {
        day: { en: "Day 2–3", fr: "Jour 2–3" },
        title: { en: "Canyon treks", fr: "Treks des canyons" },
        description: {
          en: "Full-day hikes to natural pools and hidden oases.",
          fr: "Randonnées à la journée vers piscines naturelles et oasis cachées.",
        },
      },
      {
        day: { en: "Day 4", fr: "Jour 4" },
        title: { en: "Ruined-city plateau", fr: "Plateau de la cité ruiniforme" },
        description: {
          en: "Sculpted sandstone formations and panoramic viewpoints.",
          fr: "Formations de grès sculptées et points de vue panoramiques.",
        },
      },
      {
        day: { en: "Day 5", fr: "Jour 5" },
        title: { en: "Departure", fr: "Départ" },
        description: {
          en: "Morning walk and onward transfer.",
          fr: "Marche matinale et transfert de continuation.",
        },
      },
    ],
    included: {
      en: ["Mountain guide & porters", "Accommodation / camping (4 nights)", "Park permits", "Breakfasts"],
      fr: ["Guide de montagne & porteurs", "Hébergement / bivouac (4 nuits)", "Permis de parc", "Petits-déjeuners"],
    },
    notIncluded: {
      en: ["Transport to Isalo", "Some meals", "Insurance", "Hiking gear"],
      fr: ["Transport vers l'Isalo", "Certains repas", "Assurance", "Équipement de randonnée"],
    },
    bestSeason: { en: "April to October", fr: "D'avril à octobre" },
  },
  {
    slug: "highlands-culture",
    title: { en: "Highlands & Malagasy Culture", fr: "Hautes Terres & culture malgache" },
    region: "Antananarivo · Ambositra",
    category: "culture",
    tone: "highland",
    durationDays: 5,
    priceFrom: 620,
    groupMax: 10,
    difficulty: 1,
    featured: false,
    summary: {
      en: "Royal hills, terraced rice paddies and master artisans — the beating cultural heart of the island.",
      fr: "Collines royales, rizières en terrasses et maîtres artisans — le cœur culturel battant de l'île.",
    },
    description: {
      en: "Discover the soul of Madagascar in its highlands: the royal city of Ambohimanga, the vibrant markets of Antananarivo, silk and woodcarving workshops, and landscapes of terraced rice fields glowing green under the highland light.",
      fr: "Découvrez l'âme de Madagascar dans ses hautes terres : la cité royale d'Ambohimanga, les marchés animés d'Antananarivo, les ateliers de soie et de sculpture sur bois, et des paysages de rizières en terrasses d'un vert éclatant.",
    },
    highlights: {
      en: [
        "Royal Hill of Ambohimanga (UNESCO)",
        "Antananarivo old town & markets",
        "Zafimaniry woodcarving workshops",
        "Antemoro paper & wild silk crafts",
      ],
      fr: [
        "Colline royale d'Ambohimanga (UNESCO)",
        "Vieille ville & marchés d'Antananarivo",
        "Ateliers de sculpture Zafimaniry",
        "Papier Antemoro & artisanat de soie sauvage",
      ],
    },
    itinerary: [
      {
        day: { en: "Day 1", fr: "Jour 1" },
        title: { en: "Antananarivo", fr: "Antananarivo" },
        description: {
          en: "Old town walking tour, viewpoints and craft markets.",
          fr: "Visite à pied de la vieille ville, points de vue et marchés artisanaux.",
        },
      },
      {
        day: { en: "Day 2", fr: "Jour 2" },
        title: { en: "Ambohimanga", fr: "Ambohimanga" },
        description: {
          en: "The sacred royal hill and its history.",
          fr: "La colline royale sacrée et son histoire.",
        },
      },
      {
        day: { en: "Day 3–4", fr: "Jour 3–4" },
        title: { en: "Antsirabe & Ambositra", fr: "Antsirabe & Ambositra" },
        description: {
          en: "Colonial pousse-pousse town and Zafimaniry artisan villages.",
          fr: "Ville coloniale des pousse-pousse et villages d'artisans Zafimaniry.",
        },
      },
      {
        day: { en: "Day 5", fr: "Jour 5" },
        title: { en: "Return to Tana", fr: "Retour à Tana" },
        description: {
          en: "Craft shopping and transfer to the airport.",
          fr: "Achats artisanaux et transfert à l'aéroport.",
        },
      },
    ],
    included: {
      en: ["Vehicle & cultural guide", "Accommodation (4 nights)", "Site entrance fees", "Breakfasts"],
      fr: ["Véhicule & guide culturel", "Hébergement (4 nuits)", "Droits d'entrée des sites", "Petits-déjeuners"],
    },
    notIncluded: {
      en: ["Flights", "Lunches & dinners", "Insurance", "Souvenirs"],
      fr: ["Vols", "Déjeuners & dîners", "Assurance", "Souvenirs"],
    },
    bestSeason: { en: "All year round", fr: "Toute l'année" },
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
