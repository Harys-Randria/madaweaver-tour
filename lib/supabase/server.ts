import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { supabaseConfig } from "./config";

// Client Supabase côté serveur (avec session via cookies) — pour l'admin :
// authentification et écritures (RLS « authenticated »).
export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(supabaseConfig.url!, supabaseConfig.anonKey!, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options),
          );
        } catch {
          // Appelé depuis un Server Component : ignoré (le refresh se fait
          // dans le proxy).
        }
      },
    },
  });
}
