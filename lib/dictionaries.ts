import type { Locale } from "./i18n";

// ============================================================================
//  DICTIONNAIRE DE L'INTERFACE — tous les textes UI, EN / FR
// ============================================================================

const dictionaries = {
  en: {
    nav: {
      home: "Home",
      circuits: "Tours",
      gallery: "Gallery",
      about: "About",
      contact: "Contact",
      book: "Book now",
    },
    hero: {
      welcome: "Tongasoa — welcome to Madagascar",
      badge: "Local agency · Since 2014",
      title: "Discover the wild soul of Madagascar",
      subtitle:
        "Handcrafted journeys through baobab avenues, lemur forests and turquoise lagoons — designed by locals who know every hidden trail.",
      ctaPrimary: "Explore our tours",
      ctaSecondary: "Talk to an expert",
      stat1: "Tours crafted",
      stat2: "Happy travellers",
      stat3: "Years of expertise",
    },
    trust: {
      title: "Why travel with Madaweaver",
      items: [
        {
          title: "100% local expertise",
          text: "Born and raised in Madagascar, our guides open doors no guidebook can.",
        },
        {
          title: "Tailor-made & flexible",
          text: "Every itinerary is shaped around your pace, budget and dreams.",
        },
        {
          title: "Responsible tourism",
          text: "We support local communities and protect the fragile ecosystems you'll explore.",
        },
        {
          title: "24/7 on-trip support",
          text: "A real person on WhatsApp, from your first question to your safe return.",
        },
      ],
    },
    featured: {
      title: "Signature tours",
      subtitle: "Our most-loved journeys across the island",
      viewAll: "View all tours",
    },
    destinations: {
      title: "One island, a thousand worlds",
      subtitle: "From rainforest to reef, choose the Madagascar that calls to you.",
    },
    ctaBand: {
      title: "Ready to weave your Malagasy story?",
      subtitle: "Tell us your dream trip — we'll craft the itinerary, free of charge.",
      button: "Start planning",
    },
    testimonials: {
      title: "Travellers' words",
      subtitle: "Real journeys, real words — from travellers across the world.",
      verified: "Verified reviews",
      rating: "4.9/5",
      count: "based on 180+ reviews",
      items: [
        {
          quote:
            "The most seamless, soulful trip we've ever taken. Our guide felt like family by the end.",
          author: "Sophie & Marc",
          origin: "France",
        },
        {
          quote:
            "Standing under the baobabs at sunset is something I'll never forget. Flawless organisation.",
          author: "James T.",
          origin: "United Kingdom",
        },
        {
          quote:
            "They tailored everything to us — the lemurs, the beaches, the food. Pure magic.",
          author: "Anna K.",
          origin: "Germany",
        },
      ],
    },
    circuitsPage: {
      title: "Our Madagascar tours",
      subtitle: "Filter, compare and find the journey made for you.",
      filters: "Filters",
      category: "Category",
      all: "All",
      duration: "Duration",
      sortBy: "Sort by",
      sortFeatured: "Featured",
      sortPriceAsc: "Price: low to high",
      sortPriceDesc: "Price: high to low",
      sortDuration: "Duration",
      results: "tours",
      noResults: "No tour matches these filters yet.",
      reset: "Reset filters",
      anyDuration: "Any length",
      short: "1–5 days",
      medium: "6–9 days",
      long: "10+ days",
    },
    card: {
      from: "from",
      days: "days",
      perPerson: "/ person",
      details: "Discover the tour",
      maxGroup: "max",
    },
    detail: {
      overview: "Overview",
      highlights: "Highlights",
      itinerary: "Day-by-day itinerary",
      included: "What's included",
      notIncluded: "Not included",
      practical: "Good to know",
      duration: "Duration",
      groupSize: "Group size",
      difficulty: "Difficulty",
      bestSeason: "Best season",
      region: "Region",
      priceFrom: "Price from",
      bookThis: "Book this tour",
      askQuestion: "Ask a question",
      backToTours: "All tours",
      relatedTitle: "You might also like",
      practicalGallery: "Practical & Gallery",
      reserveThis: "Book this tour",
      bookNow: "Book now",
      dates: "Dates",
      datesValue: "On request · year-round departures",
      nights: "Nights",
      transport: "Transport",
    },
    booking: {
      title: "Request this tour",
      subtitle: "No payment now — we'll reply within 24h to refine your trip.",
      name: "Full name",
      email: "Email",
      phone: "Phone (optional)",
      people: "Number of travellers",
      date: "Preferred start date",
      message: "Your message",
      messagePlaceholder: "Tell us about your dream trip, special requests…",
      sendWhatsapp: "Book via WhatsApp",
      sendEmail: "Book via Email",
      or: "or",
      note: "Your request opens a pre-filled message — nothing is sent until you press send.",
    },
    contactPage: {
      title: "Let's plan your journey",
      subtitle:
        "Questions, custom requests or ready to book? We usually reply within a few hours.",
      whatsappTitle: "Chat on WhatsApp",
      whatsappText: "The fastest way to reach us — any question, any time.",
      whatsappButton: "Open WhatsApp",
      emailTitle: "Send an email",
      emailText: "Prefer to write it all out? Drop us a detailed message.",
      emailButton: "Email us",
      phoneTitle: "Call us",
      addressTitle: "Visit our office",
      formTitle: "Send us a message",
      subject: "Subject",
      subjectPlaceholder: "What can we help with?",
      travelType: "Preferred travel type",
      travelTypePlaceholder: "e.g. wildlife, beaches, adventure…",
      send: "Send",
      contactTana: "Tana office",
      contactSud: "Southern tours",
      contactEst: "Eastern coast",
      weaveAdventure: "Weave your adventure",
    },
    aboutPage: {
      title: "We are Madaweaver",
      lead: "A team of Malagasy guides and travel designers weaving unforgettable journeys since 2014.",
      storyTitle: "Our story",
      story1:
        "Madaweaver was born from a simple belief: no one shows Madagascar like the people who call it home. What started as two guides and a battered 4×4 has grown into a trusted local agency welcoming travellers from around the world.",
      story2:
        "The name says it all — 'Mada' for Madagascar, 'weaver' for the way we thread together landscapes, cultures and encounters into a single, seamless journey. Every tour is woven by hand.",
      valuesTitle: "What drives us",
      values: [
        {
          title: "Authenticity",
          text: "Real encounters over tourist checklists. We take you where the island truly lives.",
        },
        {
          title: "Sustainability",
          text: "Low-impact travel that funds conservation and local livelihoods.",
        },
        {
          title: "Care",
          text: "Small groups, personal attention, and a team that treats you like family.",
        },
      ],
      statsTitle: "In numbers",
      teamTitle: "The people behind your trip",
      teamText:
        "Guides, drivers, naturalists and planners — all Malagasy, all passionate about sharing their island.",
      teamMembersTitle: "Meet the team",
      team: [
        { name: "Tantely Rakoto", role: "Lead guide & naturalist" },
        { name: "Njaka Andriamahefa", role: "Expedition chief & driver" },
        { name: "Hasina Miora", role: "Travel designer" },
        { name: "Mamy Rabe", role: "Dive guide · East coast" },
      ],
      ctaTitle: "Let's build your adventure together",
      ctaButton: "Get in touch",
    },
    reassurance: {
      title: "Book with peace of mind",
      items: [
        {
          title: "Registered local agency",
          text: "A licensed Malagasy tour operator based in Antananarivo.",
        },
        {
          title: "Licensed guides",
          text: "Certified local guides, fluent in English & French.",
        },
        {
          title: "Pay after confirmation",
          text: "No payment until we've shaped your itinerary together.",
        },
        {
          title: "24/7 WhatsApp support",
          text: "A real person — before, during and after your trip.",
        },
      ],
    },
    landing: {
      exploreEyebrow: "Explore",
      country: "Madagascar.",
      intro:
        "Africa's second-largest island nation, Madagascar stretches across 587,000 km² of rainforest, spiny desert and coral coast — home to lemurs, baobabs and cultures found nowhere else on Earth.",
      learnMore: "Learn more",
      philosophyTitle: "Our Philosophy",
      philosophyBody:
        "Madaweaver grows from deep connections with Madagascar's local artisans and its landscapes. Like the weavers of the highlands, we thread together community, craft and nature into every journey — supporting the people and fragile ecosystems that make the island unique.",
      utility: { gallery: "gallery", videos: "videos", explore: "explore", book: "book" },
      mapTitle: "Interactive Map",
      mapSubtitle: "Choose a region to explore its tours.",
      regions: {
        north: "North",
        highlands: "Highlands",
        west: "West",
        east: "East",
        south: "South",
      },
      contactFormTitle: "Contact Form",
    },
    gallery: {
      eyebrow: "Gallery",
      title: "Photos & Videos",
      subtitle: "A glimpse of the landscapes, wildlife and cultures that await you.",
      photos: "Photos",
      videos: "Videos",
      all: "All",
      circuitTitle: "Photos & videos",
      comingSoon: "Videos coming soon",
      comingSoonText:
        "We're editing our latest footage. Follow us on YouTube to be the first to watch.",
      watchYoutube: "Watch on YouTube",
      play: "Play video",
      close: "Close",
      prev: "Previous",
      next: "Next",
    },
    footer: {
      tagline: "Local travel agency crafting tailor-made journeys across Madagascar.",
      aboutText:
        "Woven by Malagasy guides since 2014. We design authentic, responsible tours across the island — from baobabs to lemurs to turquoise lagoons.",
      about: "About",
      explore: "Explore",
      contact: "Contact",
      followUs: "Follow us",
      rights: "All rights reserved.",
      madeWith: "Woven with care in Antananarivo 🇲🇬",
    },
    common: {
      langLabel: "FR",
      readMore: "Read more",
      loading: "Loading…",
    },
  },

  fr: {
    nav: {
      home: "Accueil",
      circuits: "Circuits",
      gallery: "Galerie",
      about: "À propos",
      contact: "Contact",
      book: "Réserver",
    },
    hero: {
      welcome: "Tongasoa — bienvenue à Madagascar",
      badge: "Agence locale · Depuis 2014",
      title: "Découvrez l'âme sauvage de Madagascar",
      subtitle:
        "Des voyages façonnés main à travers allées de baobabs, forêts de lémuriens et lagons turquoise — imaginés par des locaux qui connaissent chaque sentier caché.",
      ctaPrimary: "Explorer nos circuits",
      ctaSecondary: "Parler à un expert",
      stat1: "Circuits créés",
      stat2: "Voyageurs comblés",
      stat3: "Ans d'expertise",
    },
    trust: {
      title: "Pourquoi voyager avec Madaweaver",
      items: [
        {
          title: "Expertise 100% locale",
          text: "Nés et élevés à Madagascar, nos guides ouvrent des portes qu'aucun guide papier ne connaît.",
        },
        {
          title: "Sur-mesure & flexible",
          text: "Chaque itinéraire est façonné selon votre rythme, votre budget et vos envies.",
        },
        {
          title: "Tourisme responsable",
          text: "Nous soutenons les communautés locales et protégeons les écosystèmes fragiles que vous explorez.",
        },
        {
          title: "Assistance 24h/24",
          text: "Une vraie personne sur WhatsApp, de votre première question à votre retour en sécurité.",
        },
      ],
    },
    featured: {
      title: "Circuits signature",
      subtitle: "Nos voyages les plus appréciés à travers l'île",
      viewAll: "Voir tous les circuits",
    },
    destinations: {
      title: "Une île, mille univers",
      subtitle: "De la forêt tropicale au récif, choisissez le Madagascar qui vous appelle.",
    },
    ctaBand: {
      title: "Prêt à tisser votre histoire malgache ?",
      subtitle: "Racontez-nous votre voyage de rêve — nous créons l'itinéraire, gratuitement.",
      button: "Commencer à planifier",
    },
    testimonials: {
      title: "La parole aux voyageurs",
      subtitle: "De vrais voyages, de vrais mots — de voyageurs du monde entier.",
      verified: "Avis vérifiés",
      rating: "4,9/5",
      count: "sur 180+ avis",
      items: [
        {
          quote:
            "Le voyage le plus fluide et le plus authentique que nous ayons fait. Notre guide était devenu une famille.",
          author: "Sophie & Marc",
          origin: "France",
        },
        {
          quote:
            "Se tenir sous les baobabs au coucher du soleil, je ne l'oublierai jamais. Organisation parfaite.",
          author: "James T.",
          origin: "Royaume-Uni",
        },
        {
          quote:
            "Tout a été taillé sur-mesure pour nous — les lémuriens, les plages, la cuisine. Pure magie.",
          author: "Anna K.",
          origin: "Allemagne",
        },
      ],
    },
    circuitsPage: {
      title: "Nos circuits à Madagascar",
      subtitle: "Filtrez, comparez et trouvez le voyage fait pour vous.",
      filters: "Filtres",
      category: "Catégorie",
      all: "Tous",
      duration: "Durée",
      sortBy: "Trier par",
      sortFeatured: "En vedette",
      sortPriceAsc: "Prix : croissant",
      sortPriceDesc: "Prix : décroissant",
      sortDuration: "Durée",
      results: "circuits",
      noResults: "Aucun circuit ne correspond encore à ces filtres.",
      reset: "Réinitialiser",
      anyDuration: "Toutes durées",
      short: "1–5 jours",
      medium: "6–9 jours",
      long: "10+ jours",
    },
    card: {
      from: "dès",
      days: "jours",
      perPerson: "/ pers.",
      details: "Découvrir le circuit",
      maxGroup: "max",
    },
    detail: {
      overview: "Présentation",
      highlights: "Points forts",
      itinerary: "Itinéraire jour par jour",
      included: "Ce qui est inclus",
      notIncluded: "Non inclus",
      practical: "Bon à savoir",
      duration: "Durée",
      groupSize: "Taille du groupe",
      difficulty: "Difficulté",
      bestSeason: "Meilleure saison",
      region: "Région",
      priceFrom: "Prix à partir de",
      bookThis: "Réserver ce circuit",
      askQuestion: "Poser une question",
      backToTours: "Tous les circuits",
      relatedTitle: "Vous aimerez aussi",
      practicalGallery: "Pratique & Galerie",
      reserveThis: "Réserver ce circuit",
      bookNow: "Réserver",
      dates: "Dates",
      datesValue: "Sur demande · départs toute l'année",
      nights: "Nuits",
      transport: "Transport",
    },
    booking: {
      title: "Demander ce circuit",
      subtitle: "Aucun paiement maintenant — nous répondons sous 24h pour affiner votre voyage.",
      name: "Nom complet",
      email: "Email",
      phone: "Téléphone (optionnel)",
      people: "Nombre de voyageurs",
      date: "Date de départ souhaitée",
      message: "Votre message",
      messagePlaceholder: "Parlez-nous de votre voyage de rêve, demandes spéciales…",
      sendWhatsapp: "Réserver via WhatsApp",
      sendEmail: "Réserver via Email",
      or: "ou",
      note: "Votre demande ouvre un message pré-rempli — rien n'est envoyé avant que vous n'appuyiez sur envoyer.",
    },
    contactPage: {
      title: "Planifions votre voyage",
      subtitle:
        "Questions, demandes sur-mesure ou prêt à réserver ? Nous répondons généralement en quelques heures.",
      whatsappTitle: "Discuter sur WhatsApp",
      whatsappText: "Le moyen le plus rapide de nous joindre — toute question, à tout moment.",
      whatsappButton: "Ouvrir WhatsApp",
      emailTitle: "Envoyer un email",
      emailText: "Vous préférez tout détailler ? Écrivez-nous un message complet.",
      emailButton: "Nous écrire",
      phoneTitle: "Nous appeler",
      addressTitle: "Notre bureau",
      formTitle: "Envoyez-nous un message",
      subject: "Sujet",
      subjectPlaceholder: "Comment pouvons-nous vous aider ?",
      travelType: "Type de voyage souhaité",
      travelTypePlaceholder: "ex. faune, plages, aventure…",
      send: "Envoyer",
      contactTana: "Bureau de Tana",
      contactSud: "Circuits du Sud",
      contactEst: "Côte Est",
      weaveAdventure: "Tissez votre aventure",
    },
    aboutPage: {
      title: "Nous sommes Madaweaver",
      lead: "Une équipe de guides et concepteurs de voyages malgaches qui tissent des voyages inoubliables depuis 2014.",
      storyTitle: "Notre histoire",
      story1:
        "Madaweaver est né d'une conviction simple : personne ne montre Madagascar comme ceux qui y vivent. Ce qui a commencé par deux guides et un 4×4 cabossé est devenu une agence locale de confiance accueillant des voyageurs du monde entier.",
      story2:
        "Le nom dit tout — « Mada » pour Madagascar, « weaver » (tisserand) pour notre façon de tisser paysages, cultures et rencontres en un seul voyage fluide. Chaque circuit est tissé à la main.",
      valuesTitle: "Ce qui nous anime",
      values: [
        {
          title: "Authenticité",
          text: "De vraies rencontres plutôt que des cases à cocher. Nous vous emmenons là où l'île vit vraiment.",
        },
        {
          title: "Durabilité",
          text: "Un voyage à faible impact qui finance la conservation et les emplois locaux.",
        },
        {
          title: "Attention",
          text: "Petits groupes, attention personnelle et une équipe qui vous traite comme sa famille.",
        },
      ],
      statsTitle: "En chiffres",
      teamTitle: "Les visages derrière votre voyage",
      teamText:
        "Guides, chauffeurs, naturalistes et planificateurs — tous malgaches, tous passionnés de partager leur île.",
      teamMembersTitle: "Faites connaissance",
      team: [
        { name: "Tantely Rakoto", role: "Guide principal & naturaliste" },
        { name: "Njaka Andriamahefa", role: "Chef d'expédition & chauffeur" },
        { name: "Hasina Miora", role: "Conceptrice de voyages" },
        { name: "Mamy Rabe", role: "Guide plongée · Côte Est" },
      ],
      ctaTitle: "Construisons votre aventure ensemble",
      ctaButton: "Nous contacter",
    },
    reassurance: {
      title: "Réservez l'esprit tranquille",
      items: [
        {
          title: "Agence locale enregistrée",
          text: "Un tour-opérateur malgache licencié, basé à Antananarivo.",
        },
        {
          title: "Guides licenciés",
          text: "Des guides locaux certifiés, francophones et anglophones.",
        },
        {
          title: "Paiement après confirmation",
          text: "Aucun paiement avant d'avoir façonné votre itinéraire ensemble.",
        },
        {
          title: "Assistance WhatsApp 24/7",
          text: "Une vraie personne — avant, pendant et après votre voyage.",
        },
      ],
    },
    landing: {
      exploreEyebrow: "Explorer",
      country: "Madagascar.",
      intro:
        "Deuxième plus grande île-nation d'Afrique, Madagascar s'étend sur 587 000 km² de forêt tropicale, de désert épineux et de côtes coralliennes — terre des lémuriens, des baobabs et de cultures uniques au monde.",
      learnMore: "En savoir plus",
      philosophyTitle: "Notre Philosophie",
      philosophyBody:
        "Madaweaver puise dans des liens profonds avec les artisans locaux de Madagascar et ses paysages. Comme les tisserands des hautes terres, nous tissons communauté, artisanat et nature dans chaque voyage — en soutenant les habitants et les écosystèmes fragiles qui rendent l'île unique.",
      utility: { gallery: "galerie", videos: "vidéos", explore: "explorer", book: "réserver" },
      mapTitle: "Carte Interactive",
      mapSubtitle: "Choisissez une région pour explorer ses circuits.",
      regions: {
        north: "Nord",
        highlands: "Hautes Terres",
        west: "Ouest",
        east: "Est",
        south: "Sud",
      },
      contactFormTitle: "Formulaire de Contact",
    },
    gallery: {
      eyebrow: "Galerie",
      title: "Photos & Vidéos",
      subtitle: "Un aperçu des paysages, de la faune et des cultures qui vous attendent.",
      photos: "Photos",
      videos: "Vidéos",
      all: "Tous",
      circuitTitle: "Photos & vidéos",
      comingSoon: "Vidéos bientôt disponibles",
      comingSoonText:
        "Nous montons nos dernières images. Suivez-nous sur YouTube pour être les premiers à les voir.",
      watchYoutube: "Voir sur YouTube",
      play: "Lire la vidéo",
      close: "Fermer",
      prev: "Précédent",
      next: "Suivant",
    },
    footer: {
      tagline: "Agence de voyage locale créant des circuits sur-mesure à travers Madagascar.",
      aboutText:
        "Tissé par des guides malgaches depuis 2014. Nous concevons des circuits authentiques et responsables à travers l'île — des baobabs aux lémuriens jusqu'aux lagons turquoise.",
      about: "À propos",
      explore: "Explorer",
      contact: "Contact",
      followUs: "Suivez-nous",
      rights: "Tous droits réservés.",
      madeWith: "Tissé avec soin à Antananarivo 🇲🇬",
    },
    common: {
      langLabel: "EN",
      readMore: "Lire plus",
      loading: "Chargement…",
    },
  },
};

export type Dictionary = (typeof dictionaries)["en"];

export function getDictionary(lang: Locale): Dictionary {
  return dictionaries[lang];
}
