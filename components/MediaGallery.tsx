"use client";

import { useState, useEffect, useCallback } from "react";
import { X, ChevronLeft, ChevronRight, Play } from "lucide-react";
import type { Tone } from "@/lib/circuits";
import Scenery from "./Scenery";
import WovenArt from "./WovenArt";

export type MediaItem =
  | { kind: "scene"; tone: Tone; caption?: string }
  | { kind: "woven"; caption?: string }
  | { kind: "photo"; src: string; caption?: string }
  | { kind: "video"; youtubeId: string; tone?: Tone; caption?: string };

type Labels = { close: string; prev: string; next: string; play: string };

function Tile({ item }: { item: MediaItem }) {
  if (item.kind === "photo")
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={item.src} alt={item.caption ?? ""} loading="lazy" className="h-full w-full object-cover" />
    );
  if (item.kind === "woven") return <WovenArt className="h-full w-full object-cover" />;
  const tone: Tone = item.kind === "scene" ? item.tone : item.tone ?? "sunset";
  return <Scenery tone={tone} className="h-full w-full object-cover" />;
}

export default function MediaGallery({
  items,
  labels,
  className,
}: {
  items: MediaItem[];
  labels: Labels;
  className?: string;
}) {
  const [open, setOpen] = useState<number | null>(null);

  const close = useCallback(() => setOpen(null), []);
  const go = useCallback(
    (dir: number) =>
      setOpen((i) => (i === null ? i : (i + dir + items.length) % items.length)),
    [items.length],
  );

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, close, go]);

  const current = open === null ? null : items[open];

  return (
    <>
      <div className={className ?? "grid grid-cols-2 gap-4 sm:grid-cols-3"}>
        {items.map((item, i) => (
          <button
            key={i}
            onClick={() => setOpen(i)}
            className="group relative aspect-4/3 overflow-hidden rounded-2xl shadow-sm ring-1 ring-ink/8"
            aria-label={item.caption ?? (item.kind === "video" ? labels.play : "View")}
          >
            <div className="h-full w-full transition-transform duration-500 group-hover:scale-105">
              <Tile item={item} />
            </div>
            {item.kind === "video" && (
              <span className="absolute inset-0 flex items-center justify-center">
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white/90 text-baobab shadow-lg transition group-hover:scale-110">
                  <Play size={24} fill="currentColor" className="ml-0.5" />
                </span>
              </span>
            )}
            {item.caption && (
              <span className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/60 to-transparent p-3 text-left text-xs font-medium text-white">
                {item.caption}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {current && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm"
          onClick={close}
          role="dialog"
          aria-modal="true"
        >
          <button
            onClick={close}
            aria-label={labels.close}
            className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
          >
            <X size={22} />
          </button>

          {items.length > 1 && (
            <>
              <button
                onClick={(e) => { e.stopPropagation(); go(-1); }}
                aria-label={labels.prev}
                className="absolute left-3 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20 sm:left-6"
              >
                <ChevronLeft size={24} />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); go(1); }}
                aria-label={labels.next}
                className="absolute right-3 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20 sm:right-6"
              >
                <ChevronRight size={24} />
              </button>
            </>
          )}

          <figure
            className="w-full max-w-4xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="aspect-video overflow-hidden rounded-2xl bg-black shadow-2xl">
              {current.kind === "video" ? (
                <iframe
                  className="h-full w-full"
                  src={`https://www.youtube-nocookie.com/embed/${current.youtubeId}?autoplay=1&rel=0`}
                  title={current.caption ?? "Video"}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <Tile item={current} />
              )}
            </div>
            {current.caption && (
              <figcaption className="mt-3 text-center text-sm text-white/80">
                {current.caption}
              </figcaption>
            )}
          </figure>
        </div>
      )}
    </>
  );
}
