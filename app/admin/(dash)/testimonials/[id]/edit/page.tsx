import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import type { Testimonial } from "@/lib/testimonials";
import TestimonialForm from "@/components/admin/TestimonialForm";

export const dynamic = "force-dynamic";

export default async function EditTestimonialPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  if (!isSupabaseConfigured()) return null;
  const { id } = await params;
  const supabase = await createClient();
  const { data } = await supabase
    .from("testimonials")
    .select("id, sort, content")
    .eq("id", id)
    .single();

  if (!data) notFound();
  const content = data.content as Testimonial;

  return (
    <div>
      <Link
        href="/admin/testimonials"
        className="inline-flex items-center gap-1.5 text-sm text-ink-soft hover:text-baobab"
      >
        <ArrowLeft size={16} /> Témoignages
      </Link>
      <h1 className="mt-3 mb-6 font-display text-3xl font-semibold text-ink">
        Modifier : {content.author}
      </h1>
      <TestimonialForm initial={{ id: data.id, content, sort: data.sort }} />
    </div>
  );
}
