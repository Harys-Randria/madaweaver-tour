"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";
import { deleteTestimonial } from "@/app/admin/actions";

export default function DeleteTestimonialButton({
  id,
  title,
}: {
  id: string;
  title: string;
}) {
  const router = useRouter();
  const [pending, start] = useTransition();
  const [confirming, setConfirming] = useState(false);

  if (confirming) {
    return (
      <div className="flex items-center gap-1.5">
        <button
          onClick={() =>
            start(async () => {
              await deleteTestimonial(id);
              router.refresh();
            })
          }
          disabled={pending}
          className="rounded-lg bg-red-600 px-3 py-2 text-sm font-medium text-white disabled:opacity-60"
        >
          {pending ? "…" : "Confirmer"}
        </button>
        <button
          onClick={() => setConfirming(false)}
          className="rounded-lg bg-sand-100 px-3 py-2 text-sm text-ink"
        >
          Annuler
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={() => setConfirming(true)}
      title={`Supprimer « ${title} »`}
      className="inline-flex items-center justify-center rounded-lg bg-sand-100 px-3 py-2 text-ink-soft transition hover:bg-red-50 hover:text-red-600"
    >
      <Trash2 size={15} />
    </button>
  );
}
