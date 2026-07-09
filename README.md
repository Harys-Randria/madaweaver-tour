# 🌍 Madaweaver Tour

Site web moderne, **bilingue (EN par défaut / FR)** et **ultra-optimisé** pour une agence de voyage à Madagascar.
Landing page immersive, catalogue de circuits filtrable, pages de détail, réservation par **WhatsApp + email**, page à propos et contact.

> **100 % gratuit à héberger et à exploiter.** Aucune dépendance payante, aucun back-end, aucun abonnement.

---

## ✨ Stack technique (0 €)

| Besoin | Outil | Coût |
|--------|-------|------|
| Framework | **Next.js 16** (App Router, SSG) | Gratuit |
| Langage | **TypeScript** | Gratuit |
| Style | **Tailwind CSS v4** | Gratuit |
| Animations | **Framer Motion** | Gratuit |
| Icônes | **lucide-react** | Gratuit |
| Visuels | **SVG génératifs** (aucune image externe → 0 requête réseau) | Gratuit |
| Réservation / contact | **WhatsApp (wa.me)** + **mailto** | Gratuit |
| Hébergement conseillé | **Vercel** / **Netlify** / **Cloudflare Pages** (free tier) | Gratuit |

Le site est **100 % statique** (27 pages pré-générées) : chargement quasi-instantané, excellent SEO, coût d'hébergement nul.

---

## 🚀 Démarrage

```bash
npm install      # (déjà fait)
npm run dev      # développement → http://localhost:3000
npm run build    # build de production
npm run start    # sert le build de production
```

La racine `/` redirige automatiquement vers `/en` (ou `/fr` selon la langue du navigateur).

---

## ⚙️ Personnalisation

### 1. Vos coordonnées → `lib/site.ts`
Modifiez le numéro **WhatsApp**, l'**email** et l'**adresse**. Tout le site (footer, boutons flottants, formulaires) se met à jour automatiquement.

```ts
contact: {
  whatsapp: "261340000000",       // format international, SANS le "+"
  phoneDisplay: "+261 34 00 000 00",
  email: "contact@madaweaver-tour.mg",
  address: "…",
}
```

### 2. Vos circuits → `lib/circuits.ts`
Chaque circuit est bilingue. Copiez un bloc existant et adaptez-le (titre, itinéraire, prix, points forts…).
Le champ `tone` choisit l'ambiance visuelle : `sunset` · `forest` · `canyon` · `ocean` · `highland`.

### 3. Les textes de l'interface → `lib/dictionaries.ts`
Tous les libellés EN/FR de navigation, boutons, sections, etc.

### 4. Le thème visuel → `app/globals.css`
Palette « coucher de soleil malgache » : `--color-baobab`, `--color-jungle`, `--color-gold`, `--color-ocean`…

### 5. Galerie & vidéos
- **Photos** : la galerie (page `/gallery` + galerie de chaque circuit) utilise les visuels SVG par défaut. Ajoutez un tableau `gallery: ["/images/xxx.jpg", …]` à un circuit dans `lib/circuits.ts` pour afficher vos vraies photos.
- **Vidéos YouTube** (gratuit) : ajoutez vos vidéos dans `lib/site.ts` → tableau `videos` (global) ou champ `videos: ["ID_YOUTUBE"]` sur un circuit. Tant qu'il est vide, un bloc « bientôt disponible » élégant s'affiche.

### 6. (Optionnel) Vraies photos partout
Les visuels sont des illustrations SVG (toujours nettes, 0 Ko de réseau). Pour utiliser de vraies photos,
déposez-les dans `public/images/` et remplacez `<Scenery … />` par `next/image` là où vous le souhaitez.
Astuce gratuite : photos libres de droits sur **Unsplash** / **Pexels**.

---

## 🔐 Espace d'administration (`/admin`) — Supabase (gratuit)

Une interface simple permet à une personne **non-technique** de gérer le contenu
(CRUD des circuits avec tous les détails bilingues, itinéraire, et **toutes les images**)
depuis le navigateur, avec **connexion email/mot de passe** et mises à jour quasi-instantanées.

> Tant que Supabase n'est pas configuré, le site tourne sur les données locales
> (`lib/circuits.ts`) et `/admin` affiche un écran d'installation guidé.

### Mise en route (~10 min, une seule fois)
1. Créez un projet gratuit sur [supabase.com](https://supabase.com).
2. **SQL Editor** → collez/exécutez le contenu de [`supabase/schema.sql`](supabase/schema.sql)
   (crée la table `circuits`, le stockage d'images et les règles de sécurité).
3. Copiez [`.env.example`](.env.example) en `.env.local` et remplissez `NEXT_PUBLIC_SUPABASE_URL`
   + `NEXT_PUBLIC_SUPABASE_ANON_KEY` (Supabase → Settings → API).
4. **Authentication → Add user** : créez le compte (email + mot de passe) de l'admin.
5. Relancez le site, ouvrez `/admin`, connectez-vous, puis **« Importer les circuits de
   démonstration »** pour pré-remplir la base.

- **Circuits** : `/admin` — créer / modifier / supprimer, tous les champs EN/FR, images & vidéos.
- **Images** : `/admin/media` — téléverser, copier le lien, supprimer (stockées dans Supabase).
- Sécurité : lecture publique, écriture réservée aux comptes connectés (RLS). La clé « anon »
  est publique par conception — aucune clé secrète n'est exposée.

## 🌐 Déploiement gratuit (Vercel — recommandé)

1. Poussez ce dossier sur un dépôt GitHub.
2. Sur [vercel.com](https://vercel.com), « New Project » → importez le dépôt.
3. Ajoutez les 2 variables d'environnement Supabase (Settings → Environment Variables) — voir `.env.example`.
4. Vercel détecte Next.js automatiquement → **Deploy**. C'est tout (offre gratuite).

> Fonctionne aussi tel quel sur **Netlify** et **Cloudflare Pages**.

---

## 📁 Structure

```
app/[lang]/            Pages localisées (en / fr)
  page.tsx             Landing page
  circuits/            Liste + [slug] détail
  about/  contact/     À propos & contact
components/            Header, Footer, cartes, formulaires, Scenery (SVG)…
lib/                   site.ts · circuits.ts · dictionaries.ts · i18n.ts
proxy.ts               Redirection i18n (racine → langue)
```

Tissé avec soin à Antananarivo 🇲🇬
