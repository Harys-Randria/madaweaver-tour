-- ============================================================================
--  MADAWEAVER TOUR — Schéma Supabase
--  👉 À exécuter UNE FOIS dans Supabase : Dashboard → SQL Editor → coller → Run.
-- ============================================================================

-- 1) Table des circuits ------------------------------------------------------
create table if not exists public.circuits (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  featured boolean not null default false,
  sort int not null default 0,
  content jsonb not null,            -- tout le contenu bilingue du circuit
  updated_at timestamptz not null default now()
);

alter table public.circuits enable row level security;

-- Lecture publique (le site affiche les circuits à tout le monde)
drop policy if exists "Public read circuits" on public.circuits;
create policy "Public read circuits"
  on public.circuits for select using (true);

-- Écriture réservée aux utilisateurs connectés (l'admin)
drop policy if exists "Auth insert circuits" on public.circuits;
create policy "Auth insert circuits"
  on public.circuits for insert to authenticated with check (true);

drop policy if exists "Auth update circuits" on public.circuits;
create policy "Auth update circuits"
  on public.circuits for update to authenticated using (true) with check (true);

drop policy if exists "Auth delete circuits" on public.circuits;
create policy "Auth delete circuits"
  on public.circuits for delete to authenticated using (true);

-- 2) Stockage des images -----------------------------------------------------
insert into storage.buckets (id, name, public)
values ('media', 'media', true)
on conflict (id) do nothing;

drop policy if exists "Public read media" on storage.objects;
create policy "Public read media"
  on storage.objects for select using (bucket_id = 'media');

drop policy if exists "Auth upload media" on storage.objects;
create policy "Auth upload media"
  on storage.objects for insert to authenticated with check (bucket_id = 'media');

drop policy if exists "Auth delete media" on storage.objects;
create policy "Auth delete media"
  on storage.objects for delete to authenticated using (bucket_id = 'media');

-- 3) Réglages du site (coordonnées, réseaux, marque) — une seule ligne (id='site')
create table if not exists public.settings (
  id text primary key default 'site',
  content jsonb not null,
  updated_at timestamptz not null default now()
);
alter table public.settings enable row level security;
drop policy if exists "Public read settings" on public.settings;
create policy "Public read settings"
  on public.settings for select using (true);
drop policy if exists "Auth write settings" on public.settings;
create policy "Auth write settings"
  on public.settings for all to authenticated using (true) with check (true);

-- 4) Destinations (grandes régions) — slug + region + sort + contenu bilingue
create table if not exists public.destinations (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  region text not null default 'east',
  sort int not null default 0,
  content jsonb not null,            -- tout le contenu bilingue de la destination
  updated_at timestamptz not null default now()
);
alter table public.destinations enable row level security;

drop policy if exists "Public read destinations" on public.destinations;
create policy "Public read destinations"
  on public.destinations for select using (true);

drop policy if exists "Auth write destinations" on public.destinations;
create policy "Auth write destinations"
  on public.destinations for all to authenticated using (true) with check (true);

-- ============================================================================
--  Ensuite : Dashboard → Authentication → Users → « Add user » pour créer le
--  compte (email + mot de passe) de la personne qui administrera le site.
--  Puis, dans l'admin du site (/admin), cliquez sur « Importer les circuits de
--  démonstration » pour pré-remplir la base.
-- ============================================================================
