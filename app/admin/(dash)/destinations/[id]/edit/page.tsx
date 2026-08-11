import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { t } from "@/lib/i18n";
import type { Destination } from "@/lib/destinations";
import DestinationForm from "@/components/admin/DestinationForm";

export const dynamic = "force-dynamic";

export default async function EditDestinationPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  if (!isSupabaseConfigured()) return null;
  const { id } = await params;
  const supabase = await createClient();
  const { data } = await supabase
    .from("destinations")
    .select("id, sort, content")
    .eq("id", id)
    .single();

  if (!data) notFound();
  const content = data.content as Destination;

  return (
    <div>
      <Link
        href="/admin/destinations"
        className="inline-flex items-center gap-1.5 text-sm text-ink-soft hover:text-baobab"
      >
        <ArrowLeft size={16} /> Destinations
      </Link>
      <h1 className="mt-3 mb-6 font-display text-3xl font-semibold text-ink">
        Modifier : {t(content.title, "fr")}
      </h1>
      <DestinationForm initial={{ id: data.id, content, sort: data.sort }} />
    </div>
  );
}
