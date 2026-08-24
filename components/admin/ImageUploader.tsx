"use client";

import { useRef, useState } from "react";
import { Upload } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

// Taille maximale (côté le plus long) après redimensionnement.
const MAX_DIMENSION = 1920;
const WEBP_QUALITY = 0.82;

// Redimensionne et convertit une image en WebP côté navigateur.
// Si le navigateur ne sait pas décoder le fichier (ex. HEIC sur Chrome),
// on renvoie le fichier d'origine (pas de perte, juste pas de conversion).
async function toWebp(file: File): Promise<File> {
  if (!file.type.startsWith("image/")) return file;
  try {
    const bitmap = await createImageBitmap(file, { imageOrientation: "from-image" });
    const scale = Math.min(1, MAX_DIMENSION / Math.max(bitmap.width, bitmap.height));
    const width = Math.max(1, Math.round(bitmap.width * scale));
    const height = Math.max(1, Math.round(bitmap.height * scale));

    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");
    if (!ctx) return file;
    ctx.drawImage(bitmap, 0, 0, width, height);
    bitmap.close?.();

    const blob = await new Promise<Blob | null>((resolve) =>
      canvas.toBlob(resolve, "image/webp", WEBP_QUALITY),
    );
    if (!blob) return file;

    const base = file.name.replace(/\.[^.]+$/, "") || "image";
    return new File([blob], `${base}.webp`, { type: "image/webp" });
  } catch {
    return file;
  }
}

// Envoie une image dans le bucket Supabase « media » et renvoie son URL publique.
// L'image est compressée et convertie en WebP avant l'envoi.
export default function ImageUploader({
  onUploaded,
  label = "Téléverser une image",
}: {
  onUploaded: (url: string) => void;
  label?: string;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleFile(original: File) {
    setError(null);
    setBusy(true);
    try {
      setStatus("Optimisation…");
      const file = await toWebp(original);

      setStatus("Envoi…");
      const supabase = createClient();
      const safe = file.name.replace(/[^a-zA-Z0-9.-]/g, "_");
      const path = `uploads/${Date.now()}-${safe}`;
      const { error: upErr } = await supabase.storage.from("media").upload(path, file, {
        cacheControl: "3600",
        upsert: false,
        contentType: file.type,
      });
      if (upErr) throw upErr;
      const { data } = supabase.storage.from("media").getPublicUrl(path);
      onUploaded(data.publicUrl);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Échec de l'envoi.");
    } finally {
      setBusy(false);
      setStatus(null);
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
        {busy ? (status ?? "Envoi…") : label}
      </button>
      {error && <span className="mt-1 text-xs text-red-600">{error}</span>}
    </span>
  );
}
