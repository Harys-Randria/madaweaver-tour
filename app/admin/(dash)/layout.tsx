import { redirect } from "next/navigation";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { createClient } from "@/lib/supabase/server";
import SetupNeeded from "@/components/admin/SetupNeeded";
import AdminNav from "@/components/admin/AdminNav";

export const dynamic = "force-dynamic";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  if (!isSupabaseConfigured()) return <SetupNeeded />;

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/admin/login");

  return (
    <div className="min-h-dvh">
      <AdminNav email={user.email ?? ""} />
      <main className="mx-auto max-w-6xl px-5 py-8">{children}</main>
    </div>
  );
}
