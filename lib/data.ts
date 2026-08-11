import { createClient } from "@supabase/supabase-js";
import { supabaseConfig, isSupabaseConfigured } from "./supabase/config";
import { circuits as seedCircuits, type Circuit } from "./circuits";
import { destinations as seedDestinations, type Destination } from "./destinations";
import { site, type SiteSettings } from "./site";

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

// ---------------------------------------------------------------------------
//  Destinations — table `destinations`. Repli sur lib/destinations.ts.
// ---------------------------------------------------------------------------
export async function getAllDestinations(): Promise<Destination[]> {
  if (!isSupabaseConfigured()) return seedDestinations;
  try {
    const supabase = publicClient();
    const { data, error } = await supabase
      .from("destinations")
      .select("content, sort")
      .order("sort", { ascending: true });
    if (error || !data || data.length === 0) return seedDestinations;
    return data.map((row) => row.content as Destination);
  } catch {
    return seedDestinations;
  }
}

export async function getDestinationBySlug(slug: string): Promise<Destination | undefined> {
  const all = await getAllDestinations();
  return all.find((d) => d.slug === slug);
}

// ---------------------------------------------------------------------------
//  Réglages du site (coordonnées, réseaux…) — table `settings`, id fixe "site".
//  Repli sur les valeurs par défaut de lib/site.ts. Fusion profonde pour
//  qu'un contenu partiel en base ne casse rien.
// ---------------------------------------------------------------------------
export async function getSettings(): Promise<SiteSettings> {
  const defaults = site as unknown as SiteSettings;
  if (!isSupabaseConfigured()) return defaults;
  try {
    const supabase = publicClient();
    const { data, error } = await supabase
      .from("settings")
      .select("content")
      .eq("id", "site")
      .maybeSingle();
    if (error || !data?.content) return defaults;
    const c = data.content as Partial<SiteSettings>;
    return {
      ...defaults,
      ...c,
      tagline: { ...defaults.tagline, ...c.tagline },
      description: { ...defaults.description, ...c.description },
      contact: { ...defaults.contact, ...c.contact },
      social: { ...defaults.social, ...c.social },
    };
  } catch {
    return defaults;
  }
}
