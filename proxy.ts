import { NextRequest, NextResponse } from "next/server";
import { locales, defaultLocale } from "./lib/i18n";
import { updateSession } from "./lib/supabase/middleware";

// ============================================================================
//  PROXY — 1) rafraîchit la session Supabase (admin)  2) redirige les URL sans
//  préfixe de langue vers /en (défaut) ou /fr. L'espace /admin n'est PAS localisé.
// ============================================================================

function detectLocale(request: NextRequest): string {
  const cookie = request.cookies.get("NEXT_LOCALE")?.value;
  if (cookie && (locales as readonly string[]).includes(cookie)) return cookie;

  const accept = request.headers.get("accept-language") ?? "";
  const preferred = accept.split(",")[0]?.split("-")[0]?.toLowerCase();
  if (preferred && (locales as readonly string[]).includes(preferred)) {
    return preferred;
  }
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
