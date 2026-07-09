"use client";

import { useRef, useState } from "react";
import { Upload } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

// Envoie une image dans le bucket Supabase « media » et renvoie son URL publique.
export default function ImageUploader({
  onUploaded,
  label = "Téléverser une image",
}: {
  onUploaded: (url: string) => void;
  label?: string;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleFile(file: File) {
    setError(null);
    setBusy(true);
    try {
      const supabase = createClient();
      const safe = file.name.replace(/[^a-zA-Z0-9.-]/g, "_");
      const path = `uploads/${Date.now()}-${safe}`;
      const { error: upErr } = await supabase.storage.from("media").upload(path, file, {
        cacheControl: "3600",
        upsert: false,
      });
      if (upErr) throw upErr;
      const { data } = supabase.storage.from("media").getPublicUrl(path);
      onUploaded(data.publicUrl);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Échec de l'envoi.");
    } finally {
      setBusy(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  return (
    <span className="inline-flex flex-col">
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) handleFile(f);
        }}
      />
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        disabled={busy}
        className="inline-flex items-center gap-2 rounded-lg bg-sand-100 px-4 py-2 text-sm font-medium text-ink transition hover:bg-sand-200 disabled:opacity-60"
      >
        <Upload size={15} />
        {busy ? "Envoi…" : label}
      </button>
      {error && <span className="mt-1 text-xs text-red-600">{error}</span>}
    </span>
  );
}
