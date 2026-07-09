"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { circuits as seedCircuits, type Circuit } from "@/lib/circuits";
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
