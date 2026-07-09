// ============================================================================
//  INTERNATIONALISATION (EN / FR) — anglais par défaut
// ============================================================================

export const locales = ["en", "fr"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

/** Un champ localisé : une valeur par langue. */
export type L<T = string> = Record<Locale, T>;

/** Récupère la valeur d'un champ localisé pour une langue donnée. */
export function t<T>(field: L<T>, lang: Locale): T {
  return field[lang] ?? field[defaultLocale];
}

/** Vérifie qu'une chaîne est une langue supportée. */
export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}
