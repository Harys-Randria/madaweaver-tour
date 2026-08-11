import type { L, Locale } from "./i18n";
import { t } from "./i18n";
import type { MacroRegion } from "./circuits";

// ============================================================================
//  DESTINATIONS — 8 grandes régions de Madagascar, bilingues EN / FR.
//  Contenu adapté de Calm Adventure Tours (avec autorisation de l'owner).
//  Chaque destination est rattachée à une macro-région (→ circuits filtrés).
// ============================================================================

export interface DestinationSection {
  heading: L;
  body: L;
}

export interface Destination {
  slug: string;
  title: L;
  region: MacroRegion;
  regionLabel: L;
  image: string;
  excerpt: L;
  sections: DestinationSection[];
}

const img = (slug: string) => `/images/destinations/${slug}.webp`;

export const destinations: Destination[] = [
  // ==========================================================================
  //  EST — Andasibe–Mantadia & merveilles de l'Est
  // ==========================================================================
  {
    slug: "andasibe-mantadia-eastern-wonders",
    title: { en: "Andasibe–Mantadia & Eastern Wonders", fr: "Andasibe–Mantadia & merveilles de l'Est" },
    region: "east",
    regionLabel: { en: "Eastern Wonders", fr: "Merveilles de l'Est" },
    image: img("andasibemantadia-madagascars-eastern-wonders"),
    excerpt: {
      en: "From the haunting calls of the Indri in Andasibe to whale watching off Sainte-Marie and the beaches of Île aux Nattes, the east blends rainforests, lemurs, orchids and island escapes.",
      fr: "De l'appel envoûtant de l'Indri à Andasibe à l'observation des baleines à Sainte-Marie et aux plages de l'Île aux Nattes, l'Est mêle forêts tropicales, lémuriens, orchidées et escapades insulaires.",
    },
    sections: [
      {
        heading: { en: "Analamazaotra — Sanctuary of the Indri", fr: "Analamazaotra — Sanctuaire de l'Indri" },
        body: {
          en: "Also known as Andasibe or Périnet, this reserve is one of Madagascar's most celebrated lemur sites, protecting over 60 families of the Indri — the largest lemur, whose dawn calls are unforgettable. A UNESCO World Heritage Site, its rainforest trails (1–5 hours) reveal woolly lemurs, bamboo lemurs, chameleons, orchids and rich birdlife.",
          fr: "Aussi appelée Andasibe ou Périnet, cette réserve est l'un des sites de lémuriens les plus célèbres de Madagascar, abritant plus de 60 familles d'Indris — le plus grand lémurien, dont le chant à l'aube est inoubliable. Classée UNESCO, ses sentiers de forêt tropicale (1 à 5h) dévoilent lémuriens laineux et à bambou, caméléons, orchidées et une avifaune riche.",
        },
      },
      {
        heading: { en: "Mantadia — Wild Rainforest Adventure", fr: "Mantadia — Aventure en forêt sauvage" },
        body: {
          en: "North of Andasibe, Mantadia offers a wilder, less-visited primary rainforest with 14 lemur species — diademed sifakas, black-and-white ruffed lemurs — over 100 birds, and Madagascar's largest chameleon, Parson's. Day hikes lead to the Sacred Waterfall; night walks reveal remarkable amphibian diversity.",
          fr: "Au nord d'Andasibe, Mantadia offre une forêt primaire plus sauvage et moins fréquentée, avec 14 espèces de lémuriens — propithèques à diadème, varis noir et blanc — plus de 100 oiseaux et le plus grand caméléon de l'île, le Parson. Les randonnées mènent à la Cascade Sacrée ; les marches nocturnes révèlent une diversité d'amphibiens remarquable.",
        },
      },
      {
        heading: { en: "Ranomafana — Realm of the Golden Bamboo Lemur", fr: "Ranomafana — Royaume du lémurien à bambou doré" },
        body: {
          en: "Meaning 'hot water' for its thermal springs, this 435 km² mountainous rainforest became a UNESCO site after the 1986 discovery of the golden bamboo lemur. It shelters 12 lemur species, 118 birds and countless reptiles among tree ferns, orchids and bamboo, and hosts the Centre ValBio research station.",
          fr: "« Eau chaude » en malgache, pour ses sources thermales, cette forêt de montagne de 435 km² est classée UNESCO depuis la découverte du lémurien à bambou doré en 1986. Elle abrite 12 espèces de lémuriens, 118 oiseaux et d'innombrables reptiles parmi fougères arborescentes, orchidées et bambous, ainsi que la station de recherche Centre ValBio.",
        },
      },
      {
        heading: { en: "Zahamena — Madagascar's Hidden Rainforest", fr: "Zahamena — La forêt cachée de Madagascar" },
        body: {
          en: "East of Lake Alaotra, this rugged, little-explored park is among the island's most biodiverse: 13 lemurs including indri and aye-aye, the fossa, and 112 bird species (67 endemic). Accommodation is basic, making camping the best way to immerse in its waterfalls and untouched rainforest.",
          fr: "À l'est du lac Alaotra, ce parc accidenté et peu exploré compte parmi les plus riches de l'île : 13 lémuriens dont l'indri et l'aye-aye, le fossa, et 112 espèces d'oiseaux (67 endémiques). L'hébergement est sommaire ; le bivouac est le meilleur moyen de s'immerger dans ses cascades et sa forêt intacte.",
        },
      },
      {
        heading: { en: "Sainte-Marie — The Island of Whales", fr: "Sainte-Marie — L'île aux baleines" },
        body: {
          en: "Also called Nosy Boraha, this 'Garden Island' is famed for tropical beaches, waterfalls, coral reefs and pirate history. From July to September thousands of humpback whales migrate along its coast. Cycling, pirogue rides, snorkelling and a relaxed island rhythm complete the experience.",
          fr: "Aussi appelée Nosy Boraha, cette « île jardin » est réputée pour ses plages tropicales, cascades, récifs coralliens et son histoire de pirates. De juillet à septembre, des milliers de baleines à bosse migrent le long de ses côtes. Vélo, balades en pirogue, snorkeling et rythme insulaire paisible complètent l'expérience.",
        },
      },
      {
        heading: { en: "Palmarium (Ankanin'ny Nofy) — The Nest of Dreams", fr: "Palmarium (Ankanin'ny Nofy) — Le nid de rêve" },
        body: {
          en: "On a peninsula of Lake Ampitabe along the Pangalanes Canal, this 35-hectare reserve shelters tame lemurs — indris, crowned and ruffed lemurs, and the elusive aye-aye, best seen on night walks — amid nearly 100,000 palms, orchids and lakeside eco-lodges.",
          fr: "Sur une presqu'île du lac Ampitabe, le long du canal des Pangalanes, cette réserve de 35 hectares abrite des lémuriens familiers — indris, lémuriens couronnés et varis, et l'insaisissable aye-aye, à observer de nuit — parmi près de 100 000 palmiers, des orchidées et des éco-lodges au bord de l'eau.",
        },
      },
      {
        heading: { en: "Île aux Nattes — A Pristine Tropical Escape", fr: "Île aux Nattes — Une échappée tropicale préservée" },
        body: {
          en: "South of Sainte-Marie, this car-free island (Nosy Nato) offers white sand, turquoise lagoons and coral-rich waters reached only by pirogue. Snorkel, dive and swim, climb to the lighthouse for reef views, and — in August — watch humpback whales offshore.",
          fr: "Au sud de Sainte-Marie, cette île sans voiture (Nosy Nato) offre sable blanc, lagons turquoise et eaux coralliennes, accessible uniquement en pirogue. Snorkeling, plongée et baignade, montée au phare pour la vue sur le récif, et — en août — observation des baleines à bosse au large.",
        },
      },
    ],
  },

  // ==========================================================================
  //  HAUTES TERRES — Antananarivo & le centre
  // ==========================================================================
  {
    slug: "antananarivo-central-highlands",
    title: { en: "Antananarivo & the Central Highlands", fr: "Antananarivo & les Hautes Terres" },
    region: "highlands",
    regionLabel: { en: "Central Highlands", fr: "Hautes Terres centrales" },
    image: img("antananarivo-madagascars-central-highlands"),
    excerpt: {
      en: "Royal palaces and lively markets of Antananarivo, the crater lakes of Antsirabe, Ambositra's woodcarving, scenic railways and the peaks of Andringitra — the highlands blend history, culture and nature.",
      fr: "Palais royaux et marchés animés d'Antananarivo, lacs de cratère d'Antsirabe, sculpture sur bois d'Ambositra, trains panoramiques et sommets de l'Andringitra — les Hautes Terres mêlent histoire, culture et nature.",
    },
    sections: [
      {
        heading: { en: "Antananarivo & Antsirabe", fr: "Antananarivo & Antsirabe" },
        body: {
          en: "The capital balances royal palaces, bustling markets and green spaces across its twelve hills. South lies Antsirabe, the 'City of Water,' with colonial architecture, thermal springs and the volcanic crater lakes of Tritriva and Andraikiba — and the cascading rice terraces of nearby Betafo.",
          fr: "La capitale conjugue palais royaux, marchés animés et espaces verts sur ses douze collines. Au sud, Antsirabe, la « ville des eaux », séduit par son architecture coloniale, ses sources thermales et les lacs de cratère de Tritriva et Andraikiba — ainsi que les rizières en terrasses de Betafo.",
        },
      },
      {
        heading: { en: "Ambositra & the Zafimaniry Villages", fr: "Ambositra & les villages Zafimaniry" },
        body: {
          en: "In the rolling hills near Ambositra, the Zafimaniry villages preserve a UNESCO-listed woodcarving tradition — watch artisans create intricate houses and objects. Ambositra itself, capital of Malagasy craftsmanship, brims with carved furniture, markets and charming streets.",
          fr: "Dans les collines autour d'Ambositra, les villages Zafimaniry perpétuent une tradition de sculpture sur bois classée UNESCO — on y observe les artisans façonner maisons et objets ciselés. Ambositra, capitale de l'artisanat malgache, regorge de meubles sculptés, de marchés et de rues pittoresques.",
        },
      },
      {
        heading: { en: "Fianarantsoa, the FCE Train & Sahambavy Tea", fr: "Fianarantsoa, le train FCE & le thé de Sahambavy" },
        body: {
          en: "Fianarantsoa, the cultural heart of the highlands, charms with cobblestone streets and a historic old town. From here the legendary Fianarantsoa–Côte Est railway winds through rainforests and villages to Manakara, while nearby Sahambavy is Madagascar's only tea estate.",
          fr: "Fianarantsoa, cœur culturel des Hautes Terres, séduit par ses ruelles pavées et sa vieille ville historique. De là, le légendaire chemin de fer Fianarantsoa–Côte Est serpente à travers forêts et villages jusqu'à Manakara, tandis que Sahambavy, tout près, est l'unique plantation de thé de Madagascar.",
        },
      },
      {
        heading: { en: "Ambalavao & Anja Park", fr: "Ambalavao & le parc d'Anja" },
        body: {
          en: "A lively highland town, Ambalavao is famous for handmade Antemoro paper pressed with flowers, its vineyards and its bustling weekly zebu market. The nearby Anja Community Reserve is a highlight, where iconic ring-tailed lemurs can be observed among dramatic granite boulders.",
          fr: "Ville animée des Hautes Terres, Ambalavao est réputée pour son papier Antemoro orné de fleurs, ses vignobles et son grand marché aux zébus hebdomadaire. Tout près, la réserve communautaire d'Anja est un temps fort : on y observe les emblématiques makis catta parmi de spectaculaires blocs de granite.",
        },
      },
      {
        heading: { en: "Andringitra & the Tsaranoro Valley", fr: "Andringitra & la vallée du Tsaranoro" },
        body: {
          en: "A UNESCO World Heritage Site, Andringitra dazzles with granite peaks, valleys and waterfalls. Its ultimate challenge is Pic Boby (2,658 m), the country's second-highest summit, with over 100 km of trails. The nearby Tsaranoro Valley impresses with soaring cliffs, climbing routes and traditional villages.",
          fr: "Classé au patrimoine mondial de l'UNESCO, l'Andringitra éblouit par ses pics de granite, ses vallées et ses cascades. Son défi ultime est le Pic Boby (2 658 m), deuxième plus haut sommet du pays, avec plus de 100 km de sentiers. La vallée du Tsaranoro voisine impressionne par ses falaises, ses voies d'escalade et ses villages traditionnels.",
        },
      },
    ],
  },

  // ==========================================================================
  //  SUD-OUEST — Isalo & le Sud-Ouest
  // ==========================================================================
  {
    slug: "isalo-southwest",
    title: { en: "Isalo & the Southwest", fr: "L'Isalo & le Sud-Ouest" },
    region: "south",
    regionLabel: { en: "Southwest", fr: "Sud-Ouest" },
    image: img("isalo-national-park-southwest-madagascar"),
    excerpt: {
      en: "The dramatic canyons of Isalo, the birdlife of Zombitse, Toliara's cultural gateway and coastal gems like Anakao and Ifaty — with spiny forests, salt lakes and the untouched Makay Massif.",
      fr: "Les canyons spectaculaires de l'Isalo, l'avifaune de Zombitse, Toliara la porte culturelle et les joyaux côtiers d'Anakao et Ifaty — entre forêts épineuses, lacs salés et le massif préservé du Makay.",
    },
    sections: [
      {
        heading: { en: "Isalo — A Jurassic Sandstone Wonderland", fr: "Isalo — Un Colorado jurassique de grès" },
        body: {
          en: "Covering 820 km² of Jurassic sandstone sculpted into ridges and canyons, Isalo is often compared to the American West. Trails lead to natural pools, waterfalls and the famous Piscine Naturelle, amid 14 lemur species and 80 birds. Bara burial caves add cultural depth to its dramatic scenery.",
          fr: "S'étendant sur 820 km² de grès jurassique sculpté en crêtes et canyons, l'Isalo est souvent comparé au Far West. Ses sentiers mènent à des piscines naturelles, des cascades et la célèbre Piscine Naturelle, parmi 14 espèces de lémuriens et 80 oiseaux. Les grottes funéraires Bara ajoutent une profondeur culturelle à ses paysages spectaculaires.",
        },
      },
      {
        heading: { en: "Zombitse–Vohibasia — Bird & Lemur Haven", fr: "Zombitse–Vohibasia — Refuge d'oiseaux & lémuriens" },
        body: {
          en: "This often-overlooked dry deciduous forest is a vital transition zone with 85 bird species — nearly half of Madagascar's endemics, including the rare Appert's Greenbul — and eight lemur species among baobabs and orchids. The surrounding Tandroy and Mahafaly communities are known for ornate tombs.",
          fr: "Cette forêt sèche décidue souvent négligée est une zone de transition majeure : 85 espèces d'oiseaux — près de la moitié des endémiques de l'île, dont le rare bulbul d'Appert — et huit espèces de lémuriens parmi baobabs et orchidées. Les communautés antandroy et mahafaly voisines sont réputées pour leurs tombeaux décorés.",
        },
      },
      {
        heading: { en: "Toliara — Gateway to the Southwest", fr: "Toliara — Porte du Sud-Ouest" },
        body: {
          en: "Capital of the south, Toliara enjoys year-round sunshine, broad avenues, colourful pousse-pousse and lively tsapiky music. Day trips reach the Antsokay Arboretum, Table Mountain, Saint Augustin's Bay, the Sarodrano Caves and the Honko mangrove reserve.",
          fr: "Capitale du sud, Toliara jouit d'un ensoleillement permanent, de larges avenues, de pousse-pousse colorés et de la musique tsapiky. Les excursions rejoignent l'Arboretum d'Antsokay, la Table, la baie de Saint-Augustin, les grottes de Sarodrano et la réserve de mangrove de Honko.",
        },
      },
      {
        heading: { en: "Anakao — Vezo Village & Coastal Adventure", fr: "Anakao — Village vezo & aventure côtière" },
        body: {
          en: "Reached only by boat, Anakao is an authentic Vezo fishing village of turquoise waters and golden beaches. Surf, kitesurf, snorkel, dive and watch whales (July–September), visit Nosy Ve by pirogue or explore Tsimanampetsotsa, all wrapped in strong coastal traditions.",
          fr: "Accessible uniquement par bateau, Anakao est un authentique village de pêcheurs vezo aux eaux turquoise et plages dorées. Surf, kitesurf, snorkeling, plongée et baleines (juillet–septembre), visite de Nosy Ve en pirogue ou du Tsimanampetsotsa, le tout porté par de fortes traditions côtières.",
        },
      },
      {
        heading: { en: "Ifaty–Mangily — Beaches & Spiny Forest", fr: "Ifaty–Mangily — Plages & forêt épineuse" },
        body: {
          en: "North of Toliara, Ifaty and Mangily share long sandy beaches and access to the spiny forest, with over 300 sunny days a year for diving, snorkelling and whale watching. The Reniala Private Reserve protects ancient baobabs; private dinners beneath the giants add a touch of romance.",
          fr: "Au nord de Toliara, Ifaty et Mangily partagent de longues plages de sable et l'accès à la forêt épineuse, avec plus de 300 jours de soleil par an pour la plongée, le snorkeling et l'observation des baleines. La réserve privée de Reniala protège des baobabs centenaires ; les dîners privés sous les géants ajoutent une touche romantique.",
        },
      },
      {
        heading: { en: "Tsimanampetsotsa — Salt Lake & Endemic Wildlife", fr: "Tsimanampetsotsa — Lac salé & faune endémique" },
        body: {
          en: "This unique park protects a vast saline lake shimmering from turquoise to emerald, home to flamingos and 110 bird species, five lemurs, radiated tortoises and Grandidier's mongoose, amid spiny forests, baobabs, dunes and limestone caves with underground rivers.",
          fr: "Ce parc unique protège un vaste lac salé aux reflets turquoise et émeraude, refuge de flamants et de 110 espèces d'oiseaux, cinq lémuriens, tortues radiées et mangouste de Grandidier, entre forêts épineuses, baobabs, dunes et grottes calcaires aux rivières souterraines.",
        },
      },
      {
        heading: { en: "Makay Massif — The Last Eden", fr: "Massif du Makay — Le dernier Éden" },
        body: {
          en: "A remote, largely unexplored range of deep canyons, turquoise basins and dense forests, accessible only in the dry season (May–November). Its isolation preserves over 300 plant species, newly discovered flora and rock-painting sites — a paradise for trekkers seeking true wilderness.",
          fr: "Chaîne isolée et largement inexplorée de canyons profonds, de vasques turquoise et de forêts denses, accessible seulement en saison sèche (mai–novembre). Son isolement préserve plus de 300 espèces végétales, des plantes nouvellement découvertes et des sites de peintures rupestres — un paradis pour les trekkeurs en quête de nature intacte.",
        },
      },
    ],
  },

  // ==========================================================================
  //  NORD-OUEST — Mahajanga
  // ==========================================================================
  {
    slug: "mahajanga-northwest",
    title: { en: "Mahajanga & the Northwest", fr: "Mahajanga & le Nord-Ouest" },
    region: "west",
    regionLabel: { en: "Northwest", fr: "Nord-Ouest" },
    image: img("mahajanga-northwest-madagascar"),
    excerpt: {
      en: "The birdwatching haven of Ankarafantsika, Mahajanga's vibrant coastal culture, and rare wildlife in Sahamalaza, Baie de Baly and Bemanevika — from coral reefs to crater lakes.",
      fr: "Le paradis ornithologique d'Ankarafantsika, la culture côtière vibrante de Mahajanga, et une faune rare à Sahamalaza, la Baie de Baly et Bemanevika — des récifs coralliens aux lacs de cratère.",
    },
    sections: [
      {
        heading: { en: "Ankarafantsika — Bird & Lemur Sanctuary", fr: "Ankarafantsika — Sanctuaire d'oiseaux & lémuriens" },
        body: {
          en: "The 'Kingdom of Birds' spans over 130,000 hectares of lakes, canyon and dry forest, sheltering 129 bird species and eight lemurs such as Coquerel's sifaka. Its Ampijoroa station is the world's most important breeding site for the endangered ploughshare and flat-tailed tortoises.",
          fr: "Le « royaume des oiseaux » couvre plus de 130 000 hectares de lacs, canyon et forêt sèche, abritant 129 espèces d'oiseaux et huit lémuriens comme le propithèque de Coquerel. Sa station d'Ampijoroa est le site de reproduction le plus important au monde pour les tortues à soc et à queue plate, menacées.",
        },
      },
      {
        heading: { en: "Mahajanga — The City of Flowers", fr: "Mahajanga — La cité des fleurs" },
        body: {
          en: "A vibrant port city founded by Arab traders, Mahajanga blends Arab, Swahili, Comorian and Indian influences and is famed as Madagascar's culinary capital. Palm-lined boulevards, colonial façades, a 1,000-year-old baobab and the lively seaside 'Bord' define its tropical charm.",
          fr: "Ville portuaire vibrante fondée par des marchands arabes, Mahajanga mêle influences arabes, swahilies, comoriennes et indiennes, et passe pour la capitale gastronomique de Madagascar. Boulevards bordés de palmiers, façades coloniales, un baobab millénaire et le « Bord » de mer animé font tout son charme tropical.",
        },
      },
      {
        heading: { en: "Sahamalaza — Marine & Forest Treasure", fr: "Sahamalaza — Trésor marin & forestier" },
        body: {
          en: "A UNESCO Biosphere Reserve spanning 260 km² (half marine), Sahamalaza combines coral reefs, mangroves and dry forests where 40% of species are endemic. It shelters the blue-eyed black lemur and, offshore, 170 fish species, sea turtles and dolphins.",
          fr: "Réserve de biosphère de l'UNESCO de 260 km² (dont la moitié marine), Sahamalaza combine récifs coralliens, mangroves et forêts sèches où 40 % des espèces sont endémiques. Elle abrite le lémurien aux yeux turquoise et, au large, 170 espèces de poissons, tortues marines et dauphins.",
        },
      },
      {
        heading: { en: "Baie de Baly — Coastal Gem", fr: "Baie de Baly — Joyau côtier" },
        body: {
          en: "This 58 km² park of forests, mangroves, beaches and reefs is the last refuge of the critically endangered ploughshare tortoise. White-sand beaches, nesting turtle sites and baobab thickets host eight lemurs, 120 birds, dolphins and dugongs in a pristine coastal setting.",
          fr: "Ce parc de 58 km² de forêts, mangroves, plages et récifs est le dernier refuge de la tortue à soc, au bord de l'extinction. Plages de sable blanc, sites de ponte des tortues et fourrés de baobabs accueillent huit lémuriens, 120 oiseaux, dauphins et dugongs dans un cadre côtier préservé.",
        },
      },
      {
        heading: { en: "Bemanevika — Lakes & Rare Birds", fr: "Bemanevika — Lacs & oiseaux rares" },
        body: {
          en: "An untouched sanctuary of crater lakes, marshes and highland forests, Bemanevika is world-famous as the only home of the Madagascar pochard, once thought extinct until rediscovered here. The Madagascar red owl and serpent eagle add to a paradise for ornithologists.",
          fr: "Sanctuaire intact de lacs de cratère, marais et forêts d'altitude, Bemanevika est mondialement connu comme l'unique habitat du fuligule de Madagascar, cru éteint jusqu'à sa redécouverte ici. La phodile rousse et le serpentaire complètent un paradis pour ornithologues.",
        },
      },
    ],
  },

  // ==========================================================================
  //  NORD-EST — Masoala
  // ==========================================================================
  {
    slug: "masoala-northeast",
    title: { en: "Masoala & the Northeast", fr: "Masoala & le Nord-Est" },
    region: "east",
    regionLabel: { en: "Northeast", fr: "Nord-Est" },
    image: img("masoala-northeast-madagascar"),
    excerpt: {
      en: "Masoala's vast rainforest, Nosy Mangabe's island wildlife, Farankaraina's aye-ayes and Marojejy's soaring peaks — a paradise of rare species, marine reserves and remote forests.",
      fr: "La vaste forêt de Masoala, la faune insulaire de Nosy Mangabe, les aye-ayes de Farankaraina et les pics de Marojejy — un paradis d'espèces rares, de réserves marines et de forêts reculées.",
    },
    sections: [
      {
        heading: { en: "Masoala — Largest Rainforest & Marine Paradise", fr: "Masoala — Plus grande forêt & paradis marin" },
        body: {
          en: "Madagascar's largest protected area (240,520 ha) and a UNESCO World Heritage Site, Masoala runs from sea to 1,311 m, harbouring 2% of global biodiversity — aye-aye, red-ruffed lemur, 130+ butterflies. It also protects 10,000 ha of coral reefs and seagrass in Antongil Bay, with dolphins, turtles and humpback whales (Jul–Sep).",
          fr: "Plus vaste aire protégée de Madagascar (240 520 ha) et site du patrimoine mondial de l'UNESCO, Masoala s'étend de la mer à 1 311 m et abrite 2 % de la biodiversité mondiale — aye-aye, vari roux, plus de 130 papillons. Elle protège aussi 10 000 ha de récifs coralliens et herbiers dans la baie d'Antongil, avec dauphins, tortues et baleines à bosse (juil.–sept.).",
        },
      },
      {
        heading: { en: "Nosy Mangabe — Island of Aye-Ayes & Whales", fr: "Nosy Mangabe — Île des aye-ayes & des baleines" },
        body: {
          en: "Just 5 km from Maroantsetra, this forest-clad island is renowned for aye-ayes and 16th-century Dutch sailor carvings. Antongil Bay, the 'Cradle of Whales,' welcomes humpbacks from June to September. Trails lead to waterfalls, ancient graves and viewpoints over golden beaches.",
          fr: "À seulement 5 km de Maroantsetra, cette île couverte de forêt est réputée pour ses aye-ayes et ses gravures de marins hollandais du XVIᵉ siècle. La baie d'Antongil, « berceau des baleines », accueille les baleines à bosse de juin à septembre. Ses sentiers mènent à des cascades, d'anciennes tombes et des points de vue sur des plages dorées.",
        },
      },
      {
        heading: { en: "Farankaraina — Best Place to See the Aye-Aye", fr: "Farankaraina — Le meilleur site pour l'aye-aye" },
        body: {
          en: "Reached by boat and a short trek from Maroantsetra, Farankaraina is one of the finest places to see the elusive aye-aye in the wild, alongside bamboo lemurs, giant leaf-tailed geckos, streaked tenrecs and couas — a prime site for trekking and photography.",
          fr: "Accessible en bateau puis une courte marche depuis Maroantsetra, Farankaraina est l'un des meilleurs endroits pour observer l'insaisissable aye-aye en liberté, aux côtés de lémuriens à bambou, geckos à queue plate géants, tenrecs et couas — un site de choix pour le trek et la photo.",
        },
      },
      {
        heading: { en: "Marojejy — Towering Rainforest Peaks", fr: "Marojejy — Pics de forêt tropicale" },
        body: {
          en: "A UNESCO World Heritage Site of steep cliffs, waterfalls and dense rainforest, Marojejy (55,500 ha) shelters 11 lemur species including the critically endangered silky sifaka. Treks range from day hikes to multi-day expeditions; best visited April–May and September–December.",
          fr: "Site du patrimoine mondial de l'UNESCO aux falaises abruptes, cascades et forêt dense, Marojejy (55 500 ha) abrite 11 espèces de lémuriens dont le propithèque soyeux, au bord de l'extinction. Les treks vont de la journée à l'expédition de plusieurs jours ; meilleure période d'avril à mai et de septembre à décembre.",
        },
      },
      {
        heading: { en: "Daraina–Loky Manambato — Golden-Crowned Sifaka", fr: "Daraina–Loky Manambato — Le propithèque à couronne dorée" },
        body: {
          en: "One of Madagascar's most sensitive zones, home to the golden-crowned sifaka, Sanford's brown lemur and aye-aye, plus around 130 birds and 75 reptiles. With little infrastructure, camping at the forest edge offers a true wilderness experience.",
          fr: "L'une des zones les plus sensibles de Madagascar, refuge du propithèque à couronne dorée, du lémurien brun de Sanford et de l'aye-aye, plus environ 130 oiseaux et 75 reptiles. Avec peu d'infrastructures, le bivouac en lisière offre une véritable immersion sauvage.",
        },
      },
      {
        heading: { en: "Anjanaharibe-Sud — Remote Mountain Rainforest", fr: "Anjanaharibe-Sud — Forêt de montagne isolée" },
        body: {
          en: "Pristine rainforest from 500 m to 2,064 m, famous for the black indri, the silky sifaka and the 'living fossil' tree Takhtajania perrieri, 120 million years old. Its name means 'Place of the Great God' — rugged treks and camping at Camp Indri immerse you in unique wildlife.",
          fr: "Forêt tropicale intacte de 500 à 2 064 m, célèbre pour l'indri noir, le propithèque soyeux et l'arbre « fossile vivant » Takhtajania perrieri, vieux de 120 millions d'années. Son nom signifie « lieu du Grand Dieu » — treks accidentés et bivouac au Camp Indri plongent dans une faune unique.",
        },
      },
    ],
  },

  // ==========================================================================
  //  NORD — Nosy Be & le Nord
  // ==========================================================================
  {
    slug: "nosy-be-northern",
    title: { en: "Nosy Be & the North", fr: "Nosy Be & le Nord" },
    region: "north",
    regionLabel: { en: "Northern", fr: "Nord" },
    image: img("nosy-be-northern-madagascar"),
    excerpt: {
      en: "Amber Mountain's lush forests, Ankarana's limestone tsingy and Diego Suarez's charm meet the pristine islands of Nosy Be — rare lemurs, chameleons, coral reefs and emerald lagoons.",
      fr: "Les forêts luxuriantes de la Montagne d'Ambre, les tsingy calcaires de l'Ankarana et le charme de Diego Suarez rencontrent les îles préservées de Nosy Be — lémuriens et caméléons rares, récifs coralliens et lagons émeraude.",
    },
    sections: [
      {
        heading: { en: "Amber Mountain — Lush Volcanic Rainforest", fr: "Montagne d'Ambre — Forêt volcanique luxuriante" },
        body: {
          en: "One of Madagascar's first protected areas (182 km²), this cool volcanic massif offers six lakes, three waterfalls and 30 km of trails to Sacred Falls and the 1,475 m summit. Crowned lemurs, chameleons, leaf-tailed geckos and 75 bird species thrive in its refreshing forests.",
          fr: "L'une des premières aires protégées de Madagascar (182 km²), ce massif volcanique frais offre six lacs, trois cascades et 30 km de sentiers vers les Cascades Sacrées et le sommet à 1 475 m. Lémuriens couronnés, caméléons, geckos à queue plate et 75 espèces d'oiseaux peuplent ses forêts rafraîchissantes.",
        },
      },
      {
        heading: { en: "Ankarana — Limestone Fortress Adventure", fr: "Ankarana — L'aventure de la forteresse calcaire" },
        body: {
          en: "Dramatic limestone pinnacles (tsingy), canyons and Africa's largest underground cave system (120+ km) define Ankarana. Explore sinkholes, suspension bridges, the Green Lake and Crocodile Caves, amid lemurs and 350+ plant species, while the Antankarana keep sacred sites alive.",
          fr: "Spectaculaires aiguilles calcaires (tsingy), canyons et le plus grand réseau de grottes souterraines d'Afrique (120+ km) définissent l'Ankarana. Avens, ponts suspendus, Lac Vert et Grottes aux Crocodiles, parmi lémuriens et plus de 350 espèces végétales, tandis que les Antankarana perpétuent leurs sites sacrés.",
        },
      },
      {
        heading: { en: "The Red Tsingy — Sandstone Needles", fr: "Les Tsingy Rouges — Aiguilles de grès" },
        body: {
          en: "Unique to the north, the Red Tsingy are vivid red and orange sandstone spires carved by erosion in a small canyon near Ankarana. Constantly reshaped by wind and rain, these colourful formations are among the region's most photographed wonders.",
          fr: "Uniques au nord, les Tsingy Rouges sont des aiguilles de grès rouge et orange sculptées par l'érosion dans un petit canyon près de l'Ankarana. Sans cesse remodelées par le vent et la pluie, ces formations colorées comptent parmi les merveilles les plus photographiées de la région.",
        },
      },
      {
        heading: { en: "Antsiranana (Diego Suarez) — Gateway to the North", fr: "Antsiranana (Diego Suarez) — Porte du Nord" },
        body: {
          en: "Blending French colonial charm and Malagasy culture on a vast bay, Diego Suarez is the gateway to Amber Mountain and Ankarana. Nearby, the 'Three Bays' offer surfing and scenic beaches, and Cape Ambre reveals striking limestone formations like Windsor Castle.",
          fr: "Mêlant charme colonial français et culture malgache sur une vaste baie, Diego Suarez est la porte de la Montagne d'Ambre et de l'Ankarana. Tout près, les « Trois Baies » offrent surf et plages panoramiques, et le Cap d'Ambre révèle des formations calcaires saisissantes comme le Windsor Castle.",
        },
      },
      {
        heading: { en: "The Emerald Sea — Lagoon of Diego Bay", fr: "La Mer d'Émeraude — Lagon de la baie de Diego" },
        body: {
          en: "At the entrance of Diego Bay, this 34 km² protected lagoon glows emerald-green over shallow sandy bottoms. Surrounded by islets, it is ideal for snorkelling, kitesurfing and windsurfing (June–October), with seafood picnics and sailing day trips.",
          fr: "À l'entrée de la baie de Diego, ce lagon protégé de 34 km² brille d'un vert émeraude au-dessus de fonds sableux peu profonds. Entouré d'îlots, il est idéal pour le snorkeling, le kitesurf et la planche à voile (juin–octobre), avec pique-niques de fruits de mer et sorties en voilier.",
        },
      },
      {
        heading: { en: "Montagne des Français — Dry Forests & Cliffs", fr: "Montagne des Français — Forêts sèches & falaises" },
        body: {
          en: "Just outside Diego Suarez, this 5,000-hectare reserve protects dry forest, limestone cliffs and caves, home to endemic baobabs, Sanford's brown lemurs and rich birdlife. Trails reach panoramic viewpoints and colonial ruins, with 15 km of caves and climbing routes nearby.",
          fr: "Aux portes de Diego Suarez, cette réserve de 5 000 hectares protège forêt sèche, falaises calcaires et grottes, refuge de baobabs endémiques, de lémuriens bruns de Sanford et d'une avifaune riche. Ses sentiers mènent à des points de vue panoramiques et des ruines coloniales, avec 15 km de grottes et de voies d'escalade à proximité.",
        },
      },
      {
        heading: { en: "Andrafiamena–Andavakoera — Perrier's Sifaka", fr: "Andrafiamena–Andavakoera — Le propithèque de Perrier" },
        body: {
          en: "This 73,319-hectare reserve, 100 km south of Diego Suarez, is the last stronghold of the critically endangered Perrier's sifaka. Multi-day 4x4 visits combine guided hikes, night walks for nocturnal species and encounters with local culture.",
          fr: "Cette réserve de 73 319 hectares, à 100 km au sud de Diego Suarez, est le dernier bastion du propithèque de Perrier, au bord de l'extinction. Les visites de plusieurs jours en 4×4 associent randonnées guidées, marches nocturnes pour les espèces nocturnes et rencontres avec la culture locale.",
        },
      },
      {
        heading: { en: "Nosy Be & Surrounding Islands", fr: "Nosy Be & les îles voisines" },
        body: {
          en: "Madagascar's premier tropical destination combines resorts, ylang-ylang plantations and rich marine life — diving, whale-shark safaris and the Lokobe Reserve's black lemurs. The archipelago includes Nosy Komba (Lemur Island), Nosy Tanikely (marine reserve) and Nosy Iranja's famous twin islands and sandbar.",
          fr: "Destination tropicale phare de Madagascar, Nosy Be conjugue resorts, plantations d'ylang-ylang et vie marine foisonnante — plongée, safaris requins-baleines et les lémuriens noirs de la réserve de Lokobe. L'archipel comprend Nosy Komba (l'île aux Lémuriens), Nosy Tanikely (réserve marine) et les célèbres îles jumelles et banc de sable de Nosy Iranja.",
        },
      },
    ],
  },

  // ==========================================================================
  //  OUEST — Tsingy, baobabs & faune
  // ==========================================================================
  {
    slug: "western-tsingy-baobabs",
    title: { en: "Western Madagascar — Tsingy & Baobabs", fr: "Grand Ouest — Tsingy & Baobabs" },
    region: "west",
    regionLabel: { en: "Western Madagascar", fr: "Grand Ouest" },
    image: img("western-madagascar-tsingy-baobabs-wildlife"),
    excerpt: {
      en: "The jagged tsingy of Bemaraha, Kirindy's nocturnal wildlife, the serene Tsiribihina River and Morondava's iconic Avenue of the Baobabs — landscapes found nowhere else on Earth.",
      fr: "Les tsingy acérés du Bemaraha, la faune nocturne de Kirindy, le paisible fleuve Tsiribihina et la mythique Allée des Baobabs de Morondava — des paysages uniques au monde.",
    },
    sections: [
      {
        heading: { en: "Tsingy de Bemaraha — Stone Forest of Wonders", fr: "Tsingy de Bemaraha — La forêt de pierre" },
        body: {
          en: "A UNESCO World Heritage Site since 1990, Bemaraha's limestone plateaus form jagged pinnacles, deep canyons and the Manambolo Gorge. It harbours 13 lemur species, 100+ birds and 650 plants (85% endemic). Explore via suspension bridges and trails — remote, and accessible only in the dry season (May–November).",
          fr: "Site du patrimoine mondial de l'UNESCO depuis 1990, les plateaux calcaires du Bemaraha forment aiguilles acérées, canyons profonds et la Gorge de la Manambolo. Il abrite 13 espèces de lémuriens, plus de 100 oiseaux et 650 plantes (85 % endémiques). Exploration par ponts suspendus et sentiers — isolé, accessible seulement en saison sèche (mai–novembre).",
        },
      },
      {
        heading: { en: "Kirindy Forest — Realm of the Fossa", fr: "Forêt de Kirindy — Le royaume du fossa" },
        body: {
          en: "This 120 km² deciduous dry forest is the best place to see Madagascar's top predator, the fossa — especially during its November mating season. It also shelters Verreaux's sifakas, Madame Berthe's mouse lemur (the world's smallest primate), giant jumping rats and three endemic baobab species.",
          fr: "Cette forêt sèche décidue de 120 km² est le meilleur endroit pour observer le plus grand prédateur de Madagascar, le fossa — surtout pendant sa saison des amours en novembre. Elle abrite aussi les propithèques de Verreaux, le microcèbe de Mme Berthe (le plus petit primate du monde), des rats sauteurs géants et trois espèces de baobabs endémiques.",
        },
      },
      {
        heading: { en: "Tsiribihina River — A Journey by Water", fr: "Fleuve Tsiribihina — Un voyage au fil de l'eau" },
        body: {
          en: "A classic Malagasy adventure: 150 km over 2–3 days from Miandrivazo to Belo-sur-Tsiribihina, by pirogue or motorised barge, camping on sandbanks under starry skies. Savannahs, cliffs, baobab forests, lemurs and birdlife unfold, with the Anosin'Ampela waterfall and magical sunsets.",
          fr: "Une aventure malgache classique : 150 km en 2 à 3 jours de Miandrivazo à Belo-sur-Tsiribihina, en pirogue ou barge à moteur, avec bivouac sur les bancs de sable sous un ciel étoilé. Savanes, falaises, forêts de baobabs, lémuriens et oiseaux se succèdent, avec la cascade d'Anosin'Ampela et des couchers de soleil magiques.",
        },
      },
      {
        heading: { en: "Avenue of the Baobabs — Giants of Menabe", fr: "Allée des Baobabs — Les géants du Menabe" },
        body: {
          en: "Madagascar's most famous landmark: a 250 m stretch of Adansonia grandidieri near Morondava, with majestic trees over 30 m tall and more than 1,000 years old. Sunrise and sunset bathe the trunks in golden light, creating one of the island's most photogenic sights.",
          fr: "Le site le plus célèbre de Madagascar : une allée de 250 m d'Adansonia grandidieri près de Morondava, aux arbres majestueux de plus de 30 m et vieux de plus de 1 000 ans. Lever et coucher de soleil baignent les troncs d'une lumière dorée, créant l'un des paysages les plus photogéniques de l'île.",
        },
      },
      {
        heading: { en: "Kirindy Mitea — Diversity by the Sea", fr: "Kirindy Mitea — La diversité au bord de la mer" },
        body: {
          en: "South of Morondava, this 722 km² park merges dry forests, spiny thickets, mangroves, lakes, beaches, dunes and coral reefs. It shelters Verreaux's sifakas, ring-tailed lemurs, 58 birds, pink flamingos and rare Bernier's teal, with whales and reefs around offshore islets.",
          fr: "Au sud de Morondava, ce parc de 722 km² réunit forêts sèches, fourrés épineux, mangroves, lacs, plages, dunes et récifs coralliens. Il abrite propithèques de Verreaux, makis catta, 58 oiseaux, flamants roses et la rare sarcelle de Bernier, avec baleines et récifs autour d'îlots au large.",
        },
      },
      {
        heading: { en: "Morondava — Coastal Gateway of Menabe", fr: "Morondava — Porte côtière du Menabe" },
        body: {
          en: "A tranquil coastal town of long beaches, Morondava is the hub for Bemaraha, Kirindy and the Baobab Avenue. Once a Sakalava kingdom capital, its heritage lives on in decorated royal tombs, raffia weaving, Sakalava wrestling and a lively seaside atmosphere.",
          fr: "Ville côtière paisible aux longues plages, Morondava est le point de départ vers le Bemaraha, Kirindy et l'Allée des Baobabs. Ancienne capitale d'un royaume sakalava, son héritage vit à travers les tombeaux royaux décorés, le tissage du raphia, la lutte sakalava et une ambiance balnéaire animée.",
        },
      },
      {
        heading: { en: "Belo-sur-Mer — Vezo Fishing Heritage", fr: "Belo-sur-Mer — Patrimoine des pêcheurs vezo" },
        body: {
          en: "South of Morondava, this Vezo fishing village is famed for traditional boatbuilding, emerald lagoons and a white-sand beach. Surrounded by mangroves and palms, it offers snorkelling, coral-island cruises, whale watching (June–September) and visits to the Antsira salt works.",
          fr: "Au sud de Morondava, ce village de pêcheurs vezo est réputé pour sa construction navale traditionnelle, ses lagons émeraude et sa plage de sable blanc. Entouré de mangroves et de palmiers, il offre snorkeling, croisières vers les îlots coralliens, observation des baleines (juin–septembre) et visite des salines d'Antsira.",
        },
      },
    ],
  },

  // ==========================================================================
  //  SUD — Fort-Dauphin & le Grand Sud
  // ==========================================================================
  {
    slug: "fort-dauphin-southern",
    title: { en: "Fort Dauphin & the Deep South", fr: "Fort-Dauphin & le Grand Sud" },
    region: "south",
    regionLabel: { en: "Southern", fr: "Sud" },
    image: img("fort-dauphin-southern-madagascar"),
    excerpt: {
      en: "Fort Dauphin's dramatic coasts, Berenty's lemurs, Ifotaka's sacred spiny forests, Lavanono's surf frontier and Cape Sainte Marie's tortoises — wild beauty and deep cultural roots.",
      fr: "Les côtes spectaculaires de Fort-Dauphin, les lémuriens de Berenty, les forêts épineuses sacrées d'Ifotaka, la frontière du surf de Lavanono et les tortues du Cap Sainte-Marie — beauté sauvage et racines culturelles profondes.",
    },
    sections: [
      {
        heading: { en: "Fort Dauphin (Tolagnaro) — Gateway to the Southeast", fr: "Fort-Dauphin (Tolagnaro) — Porte du Sud-Est" },
        body: {
          en: "On a peninsula framed by the Indian Ocean and the Anosy mountains, Fort Dauphin blends beaches, mountains and culture. Libanona Beach draws surfers, while excursions reach Sainte Luce Reserve, Andohahela National Park (UNESCO) and Nahampoana Reserve, and Pic St. Louis rewards hikers with sweeping panoramas.",
          fr: "Sur une presqu'île encadrée par l'océan Indien et les montagnes de l'Anosy, Fort-Dauphin mêle plages, montagnes et culture. La plage de Libanona attire les surfeurs, tandis que les excursions rejoignent la réserve de Sainte Luce, le parc national d'Andohahela (UNESCO) et la réserve de Nahampoana, et le Pic Saint-Louis récompense les randonneurs de vastes panoramas.",
        },
      },
      {
        heading: { en: "Berenty Reserve — Lemur Paradise", fr: "Réserve de Berenty — Paradis des lémuriens" },
        body: {
          en: "One of Madagascar's most famous private reserves (1936), set in a sisal plantation by the Mandrare River. Its gallery and spiny forests shelter ring-tailed lemurs, Verreaux's sifakas and flying foxes, with diverse birdlife. Comfortable bungalows and guided day and night walks make it a perfect first stop.",
          fr: "L'une des plus célèbres réserves privées de Madagascar (1936), au cœur d'une plantation de sisal au bord du fleuve Mandrare. Ses forêts-galeries et épineuses abritent makis catta, propithèques de Verreaux et roussettes, avec une avifaune variée. Bungalows confortables et sorties guidées de jour comme de nuit en font une première étape idéale.",
        },
      },
      {
        heading: { en: "Ifotaka Community Forest — Sacred Spiny Forest", fr: "Forêt communautaire d'Ifotaka — Forêt épineuse sacrée" },
        body: {
          en: "Spanning 22,000 hectares, Ifotaka preserves sacred spiny thickets and gallery forest — ring-tailed lemurs, sifakas, chameleons and 50+ birds, with owls and mouse lemurs on night walks. Deeply tied to Antandroy traditions, it offers zebu-cart rides, community chalets and authentic immersion.",
          fr: "S'étendant sur 22 000 hectares, Ifotaka préserve fourrés épineux sacrés et forêt-galerie — makis catta, propithèques, caméléons et plus de 50 oiseaux, avec chouettes et microcèbes en marche nocturne. Profondément liée aux traditions antandroy, elle propose balades en charrette à zébu, chalets communautaires et immersion authentique.",
        },
      },
      {
        heading: { en: "Lavanono — Surfers' Frontier", fr: "Lavanono — La frontière des surfeurs" },
        body: {
          en: "Remote and raw near Cape Sainte Marie, Lavanono is famed for perfect left-hand waves and unspoiled beauty. With strong trade winds (July–November), it is a paradise for surfing and kitesurfing — eco-lodges, fresh seafood, fireside music and passing whales in winter.",
          fr: "Isolée et brute près du Cap Sainte-Marie, Lavanono est réputée pour ses vagues gauches parfaites et sa beauté préservée. Avec de forts alizés (juillet–novembre), c'est un paradis du surf et du kitesurf — éco-lodges, fruits de mer frais, musique au coin du feu et baleines de passage en hiver.",
        },
      },
      {
        heading: { en: "Cape Sainte Marie — Where Oceans Meet", fr: "Cap Sainte-Marie — Là où les océans se rencontrent" },
        body: {
          en: "At Madagascar's southernmost tip, this reserve of windswept cliffs, dunes and spiny thickets holds one of the world's highest densities of radiated and spider tortoises. Humpback whales pass from June to October; sacred caves and fragments of elephant-bird eggs add archaeological intrigue.",
          fr: "À la pointe la plus méridionale de Madagascar, cette réserve de falaises battues par les vents, de dunes et de fourrés épineux abrite l'une des plus fortes densités au monde de tortues radiées et araignées. Les baleines à bosse passent de juin à octobre ; grottes sacrées et fragments d'œufs d'oiseaux-éléphants ajoutent une intrigue archéologique.",
        },
      },
    ],
  },
];

// ---------------------------------------------------------------------------
//  Helpers
// ---------------------------------------------------------------------------

export function getDestination(slug: string): Destination | undefined {
  return destinations.find((d) => d.slug === slug);
}

export function destinationTitle(d: Destination, lang: Locale): string {
  return t(d.title, lang);
}
