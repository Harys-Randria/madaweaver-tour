"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LogIn } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export default function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) {
      setError("Email ou mot de passe incorrect.");
      return;
    }
    router.push("/admin");
    router.refresh();
  }

  const field =
    "w-full rounded-lg border border-sand-300 bg-cream/50 px-4 py-2.5 text-sm outline-none focus:border-baobab focus:ring-2 focus:ring-baobab/20";

  return (
    <form onSubmit={onSubmit} className="mt-6 space-y-4">
      <div>
        <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-ink-soft">
          Email
        </label>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={field}
          autoComplete="email"
        />
      </div>
      <div>
        <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-ink-soft">
          Mot de passe
        </label>
        <input
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={field}
          autoComplete="current-password"
        />
      </div>
      {error && <p className="text-sm text-red-600">{error}</p>}
      <button
        type="submit"
        disabled={loading}
        className="flex w-full items-center justify-center gap-2 rounded-lg bg-baobab px-5 py-3 text-sm font-semibold text-white transition hover:bg-baobab-dark disabled:opacity-60"
      >
        <LogIn size={17} />
        {loading ? "Connexion…" : "Se connecter"}
      </button>
    </form>
  );
}
