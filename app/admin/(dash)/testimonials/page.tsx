import Link from "next/link";
import { Plus, Pencil } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { t } from "@/lib/i18n";
import type { Testimonial } from "@/lib/testimonials";
import SeedTestimonialsButton from "@/components/admin/SeedTestimonialsButton";
import DeleteTestimonialButton from "@/components/admin/DeleteTestimonialButton";

export const dynamic = "force-dynamic";

type Row = { id: string; content: Testimonial };

export default async function AdminTestimonials() {
  if (!isSupabaseConfigured()) return null;
  const supabase = await createClient();
  const { data } = await supabase
    .from("testimonials")
    .select("id, content")
    .order("sort", { ascending: true });
  const rows = (data ?? []) as Row[];

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-3xl font-semibold text-ink">Témoignages</h1>
          <p className="mt-1 text-sm text-ink-soft">
            {rows.length} avis · affichés sur la page d&apos;accueil.
          </p>
        </div>
        <Link
          href="/admin/testimonials/new"
          className="inline-flex items-center gap-2 rounded-full bg-baobab px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-baobab-dark"
        >
          <Plus size={17} />
          Nouvel avis
        </Link>
      </div>

      {rows.length === 0 ? (
        <div className="mt-10 rounded-2xl bg-paper p-10 text-center ring-1 ring-ink/8">
          <p className="text-ink-soft">
            Aucun témoignage pour l&apos;instant. Importez les avis de démonstration pour démarrer,
            puis modifiez-les à votre guise.
          </p>
          <div className="mt-6">
            <SeedTestimonialsButton />
          </div>
        </div>
      ) : (
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {rows.map((row) => (
            <div key={row.id} className="flex flex-col rounded-2xl bg-paper p-5 ring-1 ring-ink/8">
              <blockquote className="flex-1 font-display text-sm italic leading-relaxed text-ink">
                “{t(row.content.quote, "fr")}”
              </blockquote>
              <p className="mt-3 text-sm font-semibold text-ink">
                {row.content.author}
                <span className="ml-1 font-normal text-ink-soft">· {t(row.content.origin, "fr")}</span>
              </p>

              <div className="mt-4 flex items-center gap-2 border-t border-sand-200 pt-4">
                <Link
                  href={`/admin/testimonials/${row.id}/edit`}
                  className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-sand-100 px-3 py-2 text-sm font-medium text-ink transition hover:bg-sand-200"
                >
                  <Pencil size={14} />
                  Modifier
                </Link>
                <DeleteTestimonialButton id={row.id} title={row.content.author} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
