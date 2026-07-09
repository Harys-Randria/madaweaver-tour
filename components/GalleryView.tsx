"use client";

import { useMemo, useState } from "react";
import type { Circuit, Category, Tone } from "@/lib/circuits";
import { CATEGORIES, circuitGalleryTones } from "@/lib/circuits";
import { t, type Locale } from "@/lib/i18n";
import type { Dictionary } from "@/lib/dictionaries";
import type { VideoItem } from "@/lib/site";
import { site } from "@/lib/site";
import MediaGallery, { type MediaItem } from "./MediaGallery";

function YoutubeIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M21.6 7.2s-.2-1.37-.8-1.97c-.76-.8-1.6-.8-2-.85C15.98 4.1 12 4.1 12 4.1h-.01s-3.98 0-6.8.28c-.4.05-1.24.05-2 .85-.6.6-.8 1.97-.8 1.97S2.2 8.8 2.2 10.4v1.5c0 1.6.2 3.2.2 3.2s.2 1.37.8 1.97c.76.8 1.76.77 2.2.86 1.6.15 6.6.2 6.6.2s3.98-.01 6.8-.29c.4-.05 1.24-.05 2-.85.6-.6.8-1.97.8-1.97s.2-1.6.2-3.2v-1.5c0-1.6-.2-3.2-.2-3.2zM9.9 14.6V8.8l5.15 2.9-5.15 2.9z" />
    </svg>
  );
}

export default function GalleryView({
  circuits,
  videos,
  lang,
  dict,
}: {
  circuits: Circuit[];
  videos: VideoItem[];
  lang: Locale;
  dict: Dictionary;
}) {
  const g = dict.gallery;
  const [category, setCategory] = useState<Category | "all">("all");
  const labels = { close: g.close, prev: g.prev, next: g.next, play: g.play };

  // Construit les vignettes photo à partir des circuits.
  const photoData = useMemo(
    () =>
      circuits.flatMap((c) => {
        const caption = `${t(c.title, lang)} · ${c.region}`;
        if (c.gallery?.length) {
          return c.gallery.map((src) => ({
            category: c.category,
            item: { kind: "photo", src, caption } as MediaItem,
          }));
        }
        return circuitGalleryTones(c)
          .slice(0, 2)
          .map((tone) => ({
            category: c.category,
            item: { kind: "scene", tone, caption } as MediaItem,
          }));
      }),
    [circuits, lang],
  );

  const photos = useMemo(
    () =>
      photoData
        .filter((p) => category === "all" || p.category === category)
        .map((p) => p.item),
    [photoData, category],
  );

  const tones: Tone[] = ["sunset", "forest", "ocean", "canyon", "highland"];
  const videoItems: MediaItem[] = videos.map((v, i) => ({
    kind: "video",
    youtubeId: v.id,
    tone: tones[i % tones.length],
    caption: t(v.title, lang),
  }));

  const chip = (active: boolean) =>
    `rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
      active
        ? "bg-baobab text-white"
        : "bg-paper text-ink-soft ring-1 ring-sand-300 hover:text-baobab hover:ring-baobab"
    }`;

  return (
    <div>
      {/* Filtres */}
      <div className="flex flex-wrap gap-2">
        <button className={chip(category === "all")} onClick={() => setCategory("all")}>
          {g.all}
        </button>
        {CATEGORIES.map((c) => (
          <button
            key={c.key}
            className={chip(category === c.key)}
            onClick={() => setCategory(c.key)}
          >
            {c.emoji} {t(c.label, lang)}
          </button>
        ))}
      </div>

      {/* Photos */}
      <div className="mt-8">
        <MediaGallery
          items={photos}
          labels={labels}
          className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4"
        />
      </div>

      {/* Vidéos */}
      <div id="videos" className="mt-16 scroll-mt-24">
        <h2 className="font-display text-3xl font-semibold text-ink">{g.videos}</h2>
        {videoItems.length > 0 ? (
          <div className="mt-6">
            <MediaGallery
              items={videoItems}
              labels={labels}
              className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
            />
          </div>
        ) : (
          <div className="mt-6 flex flex-col items-center rounded-2xl bg-cream-2 px-6 py-14 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-baobab/10 text-baobab">
              <YoutubeIcon size={30} />
            </div>
            <h3 className="mt-4 font-display text-xl font-semibold text-ink">{g.comingSoon}</h3>
            <p className="mx-auto mt-2 max-w-md text-sm text-ink-soft">{g.comingSoonText}</p>
            <a
              href={site.social.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-baobab px-6 py-3 text-sm font-semibold text-white transition hover:bg-baobab-dark"
            >
              <YoutubeIcon size={17} />
              {g.watchYoutube}
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
