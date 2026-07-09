"use client";

import { useEffect, useState, useCallback } from "react";
import { Copy, Trash2, Check } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import ImageUploader from "./ImageUploader";

type MediaFile = { name: string; url: string };
const FOLDER = "uploads";

export default function MediaLibrary() {
  const [files, setFiles] = useState<MediaFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState<string | null>(null);

  const load = useCallback(async () => {
    const supabase = createClient();
    const { data } = await supabase.storage
      .from("media")
      .list(FOLDER, { limit: 200, sortBy: { column: "created_at", order: "desc" } });
    const list = (data ?? [])
      .filter((f) => f.name && !f.name.startsWith("."))
      .map((f) => ({
        name: f.name,
        url: supabase.storage.from("media").getPublicUrl(`${FOLDER}/${f.name}`).data.publicUrl,
      }));
    setFiles(list);
    setLoading(false);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  async function remove(name: string) {
    const supabase = createClient();
    await supabase.storage.from("media").remove([`${FOLDER}/${name}`]);
    load();
  }

  function copy(url: string) {
    navigator.clipboard.writeText(url);
    setCopied(url);
    setTimeout(() => setCopied(null), 1500);
  }

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-3xl font-semibold text-ink">Images</h1>
          <p className="mt-1 text-sm text-ink-soft">
            Toutes les images du site. Téléversez, copiez le lien ou supprimez.
          </p>
        </div>
        <ImageUploader onUploaded={() => load()} label="Téléverser une image" />
      </div>

      {loading ? (
        <p className="mt-10 text-center text-ink-soft">Chargement…</p>
      ) : files.length === 0 ? (
        <div className="mt-10 rounded-2xl bg-paper p-10 text-center text-ink-soft ring-1 ring-ink/8">
          Aucune image pour l&apos;instant. Téléversez votre première photo.
        </div>
      ) : (
        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {files.map((f) => (
            <div key={f.name} className="overflow-hidden rounded-xl bg-paper ring-1 ring-ink/8">
              <div className="aspect-4/3 overflow-hidden bg-sand-100">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={f.url} alt={f.name} loading="lazy" className="h-full w-full object-cover" />
              </div>
              <div className="flex items-center justify-between gap-2 p-2">
                <button
                  onClick={() => copy(f.url)}
                  className="inline-flex items-center gap-1 text-xs font-medium text-ink-soft hover:text-baobab"
                >
                  {copied === f.url ? <Check size={13} /> : <Copy size={13} />}
                  {copied === f.url ? "Copié" : "Copier le lien"}
                </button>
                <button
                  onClick={() => remove(f.name)}
                  className="text-ink-soft hover:text-red-600"
                  title="Supprimer"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
