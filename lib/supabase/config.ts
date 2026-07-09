// Configuration Supabase — lue depuis les variables d'environnement.
// Tant que ces variables ne sont pas définies, le site fonctionne en mode
// « repli » sur les données locales (lib/circuits.ts) : rien n'est cassé.

export const supabaseConfig = {
  url: process.env.NEXT_PUBLIC_SUPABASE_URL,
  anonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
};

export function isSupabaseConfigured(): boolean {
  return Boolean(supabaseConfig.url && supabaseConfig.anonKey);
}
