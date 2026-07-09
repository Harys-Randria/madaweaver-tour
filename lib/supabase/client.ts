import { createBrowserClient } from "@supabase/ssr";
import { supabaseConfig } from "./config";

// Client Supabase côté navigateur — pour la connexion et l'upload d'images
// depuis l'interface d'admin.
export function createClient() {
  return createBrowserClient(supabaseConfig.url!, supabaseConfig.anonKey!);
}
