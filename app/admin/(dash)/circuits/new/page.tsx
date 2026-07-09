import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import CircuitForm from "@/components/admin/CircuitForm";

export const dynamic = "force-dynamic";

export default function NewCircuitPage() {
  return (
    <div>
      <Link
        href="/admin"
        className="inline-flex items-center gap-1.5 text-sm text-ink-soft hover:text-baobab"
      >
        <ArrowLeft size={16} /> Circuits
      </Link>
      <h1 className="mt-3 mb-6 font-display text-3xl font-semibold text-ink">Nouveau circuit</h1>
      <CircuitForm />
    </div>
  );
}
