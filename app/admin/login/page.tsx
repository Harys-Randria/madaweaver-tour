import { redirect } from "next/navigation";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { createClient } from "@/lib/supabase/server";
import SetupNeeded from "@/components/admin/SetupNeeded";
import LoginForm from "@/components/admin/LoginForm";
import Logo from "@/components/Logo";

export const dynamic = "force-dynamic";

export default async function LoginPage() {
  if (!isSupabaseConfigured()) return <SetupNeeded />;

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (user) redirect("/admin");

  return (
    <div className="flex min-h-dvh items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <div className="mb-8 flex justify-center">
          <Logo />
        </div>
        <div className="rounded-2xl bg-paper p-7 shadow-sm ring-1 ring-ink/8">
          <h1 className="font-display text-2xl font-semibold text-ink">Administration</h1>
          <p className="mt-1 text-sm text-ink-soft">Connectez-vous pour gérer le contenu du site.</p>
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
