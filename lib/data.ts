import { createClient } from "@supabase/supabase-js";
import { supabaseConfig, isSupabaseConfigured } from "./supabase/config";
import { circuits as seedCircuits, type Circuit } from "./circuits";

// ============================================================================
//  COUCHE DE DONNÉES (lecture publique)
//  Si Supabase est configuré → lit la base. Sinon → repli sur les données
//  locales (lib/circuits.ts). Le site fonctionne donc dans les deux cas.
//  Client sans cookies : les pages restent statiques / ISR.
// ============================================================================

function publicClient() {
  return createClient(supabaseConfig.url!, supabaseConfig.anonKey!, {
    auth: { persistSession: false },
  });
}

export async function getAllCircuits(): Promise<Circuit[]> {
  if (!isSupabaseConfigured()) return seedCircuits;
  try {
    const supabase = publicClient();
    const { data, error } = await supabase
      .from("circuits")
      .select("content, sort")
      .order("sort", { ascending: true });
    if (error || !data || data.length === 0) return seedCircuits;
    return data.map((row) => row.content as Circuit);
  } catch {
    return seedCircuits;
  }
}

export async function getCircuitBySlug(slug: string): Promise<Circuit | undefined> {
  const all = await getAllCircuits();
  return all.find((c) => c.slug === slug);
}

export async function getFeatured(): Promise<Circuit[]> {
  return (await getAllCircuits()).filter((c) => c.featured);
}
