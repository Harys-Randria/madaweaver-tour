import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import DestinationForm from "@/components/admin/DestinationForm";

export const dynamic = "force-dynamic";

export default function NewDestinationPage() {
  return (
    <div>
      <Link
        href="/admin/destinations"
        className="inline-flex items-center gap-1.5 text-sm text-ink-soft hover:text-baobab"
      >
        <ArrowLeft size={16} /> Destinations
      </Link>
      <h1 className="mt-3 mb-6 font-display text-3xl font-semibold text-ink">Nouvelle destination</h1>
      <DestinationForm />
    </div>
  );
}
