import { NextRequest, NextResponse } from "next/server";
import { locales, defaultLocale } from "./lib/i18n";
import { updateSession } from "./lib/supabase/middleware";

// ============================================================================
//  PROXY — 1) rafraîchit la session Supabase (admin)  2) redirige les URL sans
//  préfixe de langue vers /en (défaut) ou /fr. L'espace /admin n'est PAS localisé.
// ============================================================================

function detectLocale(request: NextRequest): string {
  // Anglais par défaut. On ne suit que le choix explicite de l'utilisateur
  // (cookie NEXT_LOCALE, posé lorsqu'il bascule la langue), pas la langue du
  // navigateur — le site est donc "anglais first".
  const cookie = request.cookies.get("NEXT_LOCALE")?.value;
  if (cookie && (locales as readonly string[]).includes(cookie)) return cookie;
  return defaultLocale;
}

export async function proxy(request: NextRequest) {
  // 1) Rafraîchit la session d'authentification Supabase.
  const response = await updateSession(request);

  const { pathname } = request.nextUrl;

  // 2) L'admin, l'auth et l'API ne sont pas localisés : pas de redirection.
  if (
    pathname.startsWith("/admin") ||
    pathname.startsWith("/login") ||
    pathname.startsWith("/api")
  ) {
    return response;
  }

  // 3) Redirection i18n si l'URL n'a pas de préfixe de langue.
  const hasLocale = locales.some(
    (loc) => pathname === `/${loc}` || pathname.startsWith(`/${loc}/`),
  );
  if (hasLocale) return response;

  const locale = detectLocale(request);
  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;
  const redirect = NextResponse.redirect(url);
  response.cookies.getAll().forEach((c) => redirect.cookies.set(c));
  return redirect;
}

export const config = {
  matcher: ["/((?!_next|api|.*\\..*).*)"],
};
