"use client";

import { createContext, useContext } from "react";
import { site, type SiteSettings } from "@/lib/site";

// Rend les réglages du site (coordonnées, réseaux…) disponibles dans les
// composants client via useSettings(). Alimenté par le layout serveur.
const SettingsContext = createContext<SiteSettings>(site as unknown as SiteSettings);

export function SettingsProvider({
  settings,
  children,
}: {
  settings: SiteSettings;
  children: React.ReactNode;
}) {
  return <SettingsContext.Provider value={settings}>{children}</SettingsContext.Provider>;
}

export function useSettings(): SiteSettings {
  return useContext(SettingsContext);
}
