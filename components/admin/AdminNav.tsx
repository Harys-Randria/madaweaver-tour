"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Map, Compass, Quote, Images, Settings, ExternalLink, LogOut } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import Logo from "@/components/Logo";

export default function AdminNav({ email }: { email: string }) {
  const pathname = usePathname();
  const router = useRouter();

  const links = [
    { href: "/admin", label: "Circuits", icon: Map, exact: true },
    { href: "/admin/destinations", label: "Destinations", icon: Compass, exact: false },
    { href: "/admin/testimonials", label: "Témoignages", icon: Quote, exact: false },
    { href: "/admin/media", label: "Images", icon: Images, exact: false },
    { href: "/admin/settings", label: "Réglages", icon: Settings, exact: false },
  ];

  const isActive = (href: string, exact: boolean) =>
    exact ? pathname === href : pathname.startsWith(href);

  async function logout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <header className="sticky top-0 z-40 border-b border-sand-300 bg-paper/95 backdrop-blur">
      <div className="mx-auto max-w-6xl px-4 sm:px-5">
        {/* Ligne 1 : logo + actions */}
        <div className="flex items-center justify-between gap-3 py-3">
          <Link href="/admin" className="shrink-0">
            <Logo />
          </Link>

          <div className="flex items-center gap-2 sm:gap-3">
            <a
              href="/"
              target="_blank"
              className="hidden items-center gap-1.5 text-sm text-ink-soft hover:text-baobab sm:inline-flex"
            >
              <ExternalLink size={15} />
              Voir le site
            </a>
            <span className="hidden max-w-[40vw] truncate text-xs text-ink-soft lg:inline">
              {email}
            </span>
            <button
              onClick={logout}
              className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-sand-100 px-3.5 py-1.5 text-sm font-medium text-ink transition-colors hover:bg-sand-200"
            >
              <LogOut size={15} />
              <span className="hidden sm:inline">Quitter</span>
            </button>
          </div>
        </div>

        {/* Ligne 2 : onglets (défilables horizontalement sur mobile) */}
        <nav className="-mb-px flex items-center gap-1 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors ${
                isActive(l.href, l.exact)
                  ? "bg-baobab text-white"
                  : "text-ink-soft hover:bg-sand-100 hover:text-ink"
              }`}
            >
              <l.icon size={15} />
              {l.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
