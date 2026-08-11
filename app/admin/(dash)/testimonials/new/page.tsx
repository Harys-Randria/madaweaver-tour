import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import TestimonialForm from "@/components/admin/TestimonialForm";

export const dynamic = "force-dynamic";

export default function NewTestimonialPage() {
  return (
    <div>
      <Link
        href="/admin/testimonials"
        className="inline-flex items-center gap-1.5 text-sm text-ink-soft hover:text-baobab"
      >
        <ArrowLeft size={16} /> Témoignages
      </Link>
      <h1 className="mt-3 mb-6 font-display text-3xl font-semibold text-ink">Nouvel avis</h1>
      <TestimonialForm />
    </div>
  );
}
