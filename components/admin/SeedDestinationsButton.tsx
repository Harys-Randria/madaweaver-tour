"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Download } from "lucide-react";
import { seedDestinations } from "@/app/admin/actions";

export default function SeedDestinationsButton() {
  const router = useRouter();
  const [pending, start] = useTransition();
  const [error, setError] = useState<string | null>(null);

  return (
    <div>
      <button
        onClick={() =>
          start(async () => {
            setError(null);
            const res = await seedDestinations();
            if (!res.ok) setError(res.error);
            else router.refresh();
          })
        }
        disabled={pending}
        className="inline-flex items-center gap-2 rounded-full bg-baobab px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-baobab-dark disabled:opacity-60"
      >
        <Download size={17} />
        {pending ? "Import en cours…" : "Importer les destinations de démonstration"}
      </button>
      {error && <p className="mt-3 text-sm text-red-600">{error}</p>}
    </div>
  );
}
