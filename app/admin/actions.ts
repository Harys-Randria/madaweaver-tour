"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { circuits as seedCircuits, type Circuit } from "@/lib/circuits";
import { destinations as destinationSeed, type Destination } from "@/lib/destinations";
import type { SiteSettings } from "@/lib/site";
import { locales } from "@/lib/i18n";

type Result = { ok: true } | { ok: false; error: string };

// Régénère les pages publiques concernées (les deux langues).
function revalidateAll(slug?: string) {
  for (const l of locales) {
    revalidatePath(`/${l}`);
    revalidatePath(`/${l}/circuits`);
    revalidatePath(`/${l}/gallery`);
    if (slug) revalidatePath(`/${l}/circuits/${slug}`);
  }
}

export async function saveCircuit(input: {
  id?: string;
  slug: string;
  featured: boolean;
  sort: number;
  content: Circuit;
}): Promise<Result> {
  const supabase = await createClient();
  const row = {
    slug: input.slug,
    featured: input.featured,
    sort: input.sort,
    content: input.content,
    updated_at: new Date().toISOString(),
  };

  const { error } = input.id
    ? await supabase.from("circuits").update(row).eq("id", input.id)
    : await supabase.from("circuits").insert(row);

  if (error) return { ok: false, error: error.message };
  revalidateAll(input.slug);
  return { ok: true };
}

export async function deleteCircuit(id: string, slug: string): Promise<Result> {
  const supabase = await createClient();
  const { error } = await supabase.from("circuits").delete().eq("id", id);
  if (error) return { ok: false, error: error.message };
  revalidateAll(slug);
  return { ok: true };
}

// ---------------------------------------------------------------------------
//  Destinations
// ---------------------------------------------------------------------------
function revalidateDestinations(slug?: string) {
  for (const l of locales) {
    revalidatePath(`/${l}/destinations`);
    if (slug) revalidatePath(`/${l}/destinations/${slug}`);
  }
}

export async function saveDestination(input: {
  id?: string;
  slug: string;
  region: string;
  sort: number;
  content: Destination;
}): Promise<Result> {
  const supabase = await createClient();
  const row = {
    slug: input.slug,
    region: input.region,
    sort: input.sort,
    content: input.content,
    updated_at: new Date().toISOString(),
  };

  const { error } = input.id
    ? await supabase.from("destinations").update(row).eq("id", input.id)
    : await supabase.from("destinations").insert(row);

  if (error) return { ok: false, error: error.message };
  revalidateDestinations(input.slug);
  return { ok: true };
}

export async function deleteDestination(id: string, slug: string): Promise<Result> {
  const supabase = await createClient();
  const { error } = await supabase.from("destinations").delete().eq("id", id);
  if (error) return { ok: false, error: error.message };
  revalidateDestinations(slug);
  return { ok: true };
}

export async function seedDestinations(): Promise<Result> {
  const supabase = await createClient();
  const { count } = await supabase
    .from("destinations")
    .select("*", { count: "exact", head: true });
  if (count && count > 0)
    return { ok: false, error: "La base contient déjà des destinations." };

  const rows = destinationSeed.map((d, i) => ({
    slug: d.slug,
    region: d.region,
    sort: i,
    content: d,
  }));
  const { error } = await supabase.from("destinations").insert(rows);
  if (error) return { ok: false, error: error.message };
  revalidateDestinations();
  return { ok: true };
}

export async function saveSettings(content: SiteSettings): Promise<Result> {
  const supabase = await createClient();
  const { error } = await supabase
    .from("settings")
    .upsert({ id: "site", content, updated_at: new Date().toISOString() });
  if (error) return { ok: false, error: error.message };
  // Les réglages (footer, contact…) sont sur toutes les pages → on régénère tout.
  revalidatePath("/", "layout");
  return { ok: true };
}

export async function seedDemo(): Promise<Result> {
  const supabase = await createClient();
  const { count } = await supabase
    .from("circuits")
    .select("*", { count: "exact", head: true });
  if (count && count > 0)
    return { ok: false, error: "La base contient déjà des circuits." };

  const rows = seedCircuits.map((c, i) => ({
    slug: c.slug,
    featured: c.featured ?? false,
    sort: i,
    content: c,
  }));
  const { error } = await supabase.from("circuits").insert(rows);
  if (error) return { ok: false, error: error.message };
  revalidateAll();
  return { ok: true };
}
