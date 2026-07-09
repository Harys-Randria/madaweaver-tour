import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { t } from "@/lib/i18n";
import type { Circuit } from "@/lib/circuits";
import CircuitForm from "@/components/admin/CircuitForm";

export const dynamic = "force-dynamic";

export default async function EditCircuitPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  if (!isSupabaseConfigured()) return null;
  const { id } = await params;
  const supabase = await createClient();
  const { data } = await supabase
    .from("circuits")
    .select("id, sort, content")
    .eq("id", id)
    .single();

  if (!data) notFound();
  const content = data.content as Circuit;

  return (
    <div>
      <Link
        href="/admin"
        className="inline-flex items-center gap-1.5 text-sm text-ink-soft hover:text-baobab"
      >
        <ArrowLeft size={16} /> Circuits
      </Link>
      <h1 className="mt-3 mb-6 font-display text-3xl font-semibold text-ink">
        Modifier : {t(content.title, "fr")}
      </h1>
      <CircuitForm initial={{ id: data.id, content, sort: data.sort }} />
    </div>
  );
}
