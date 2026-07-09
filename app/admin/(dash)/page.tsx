import Link from "next/link";
import { Plus, Pencil, Star, MapPin } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { t } from "@/lib/i18n";
import type { Circuit } from "@/lib/circuits";
import SeedButton from "@/components/admin/SeedButton";
import DeleteCircuitButton from "@/components/admin/DeleteCircuitButton";

export const dynamic = "force-dynamic";

type Row = { id: string; slug: string; featured: boolean; content: Circuit };

export default async function AdminDashboard() {
  if (!isSupabaseConfigured()) return null;
  const supabase = await createClient();
  const { data } = await supabase
    .from("circuits")
    .select("id, slug, featured, content")
    .order("sort", { ascending: true });
  const rows = (data ?? []) as Row[];

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-3xl font-semibold text-ink">Circuits</h1>
          <p className="mt-1 text-sm text-ink-soft">
            {rows.length} circuit{rows.length > 1 ? "s" : ""} · gérez tous les détails et images.
          </p>
        </div>
        <Link
          href="/admin/circuits/new"
          className="inline-flex items-center gap-2 rounded-full bg-baobab px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-baobab-dark"
        >
          <Plus size={17} />
          Nouveau circuit
        </Link>
      </div>

      {rows.length === 0 ? (
        <div className="mt-10 rounded-2xl bg-paper p-10 text-center ring-1 ring-ink/8">
          <p className="text-ink-soft">
            Aucun circuit pour l&apos;instant. Importez les 8 circuits de démonstration pour
            démarrer, puis modifiez-les à votre guise.
          </p>
          <div className="mt-6">
            <SeedButton />
          </div>
        </div>
      ) : (
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {rows.map((row) => (
            <div
              key={row.id}
              className="flex flex-col rounded-2xl bg-paper p-5 ring-1 ring-ink/8"
            >
              <div className="flex items-start justify-between gap-2">
                <h2 className="font-display text-lg font-semibold text-ink">
                  {t(row.content.title, "fr")}
                </h2>
                {row.featured && (
                  <span title="En vedette" className="text-gold">
                    <Star size={16} fill="currentColor" />
                  </span>
                )}
              </div>
              <p className="mt-1 flex items-center gap-1.5 text-sm text-ink-soft">
                <MapPin size={13} className="text-baobab" />
                {row.content.region}
              </p>
              <p className="mt-2 text-sm text-ink-soft">
                {row.content.durationDays} j · à partir de €{row.content.priceFrom}
              </p>

              <div className="mt-4 flex items-center gap-2 border-t border-sand-200 pt-4">
                <Link
                  href={`/admin/circuits/${row.id}/edit`}
                  className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-sand-100 px-3 py-2 text-sm font-medium text-ink transition hover:bg-sand-200"
                >
                  <Pencil size={14} />
                  Modifier
                </Link>
                <DeleteCircuitButton
                  id={row.id}
                  slug={row.slug}
                  title={t(row.content.title, "fr")}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
