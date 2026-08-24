"use client";

import { useState, useEffect, useCallback } from "react";
import { Car, X, ChevronLeft, ChevronRight, ImageIcon, UserCheck, KeyRound, CalendarCheck } from "lucide-react";
import CarBookingModal from "./CarBookingModal";

export type FleetVehicle = {
  name: string;
  description: string;
  priceWithDriver?: string;
  priceWithoutDriver?: string;
  images: string[];
};

export type FleetLabels = {
  withDriver: string;
  withoutDriver: string;
  photos: string; // ex. "photos"
  close: string;
  prev: string;
  next: string;
};

export default function CarFleet({
  vehicles,
  labels,
  lang,
}: {
  vehicles: FleetVehicle[];
  labels: FleetLabels;
  lang: "en" | "fr";
}) {
  // { v: index véhicule, i: index photo } ou null
  const [open, setOpen] = useState<{ v: number; i: number } | null>(null);
  const [booking, setBooking] = useState<string | null>(null);
  const current = open ? vehicles[open.v] : null;

  const close = useCallback(() => setOpen(null), []);
  const go = useCallback(
    (dir: number) =>
      setOpen((o) => {
        if (!o) return o;
        const imgs = vehicles[o.v].images;
        return { v: o.v, i: (o.i + dir + imgs.length) % imgs.length };
      }),
    [vehicles],
  );

  useEffect(() => {
    if (!open) return;
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

  return (
    <>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {vehicles.map((v, vi) => {
          const hasImages = v.images.length > 0;
          return (
            <div key={vi} className="flex h-full flex-col overflow-hidden rounded-2xl bg-paper ring-1 ring-ink/8">
              {/* Couverture cliquable si photos */}
              <button
                type="button"
                onClick={() => hasImages && setOpen({ v: vi, i: 0 })}
                disabled={!hasImages}
                className="group relative aspect-4/3 overflow-hidden bg-sand-100 disabled:cursor-default"
                aria-label={hasImages ? `${v.name} — ${v.images.length} ${labels.photos}` : v.name}
              >
                {hasImages ? (
                  <>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={v.images[0]}
                      alt={v.name}
                      loading="lazy"
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    {v.images.length > 1 && (
                      <span className="absolute right-2 top-2 inline-flex items-center gap-1 rounded-full bg-black/60 px-2.5 py-1 text-xs font-semibold text-white">
                        <ImageIcon size={13} />
                        {v.images.length}
                      </span>
                    )}
                  </>
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-baobab/40">
                    <Car size={48} />
                  </div>
                )}
              </button>

              <div className="flex flex-1 flex-col p-5">
                <h3 className="font-display text-lg font-semibold text-ink">{v.name}</h3>
                <p className="mt-1.5 flex-1 text-sm leading-relaxed text-ink-soft">{v.description}</p>

                {(v.priceWithDriver || v.priceWithoutDriver) && (
                  <div className="mt-4 space-y-1.5 border-t border-sand-200 pt-4 text-sm">
                    {v.priceWithDriver && (
                      <div className="flex items-center justify-between gap-3">
                        <span className="inline-flex items-center gap-1.5 text-ink-soft">
                          <UserCheck size={15} className="text-baobab" />
                          {labels.withDriver}
                        </span>
                        <span className="font-semibold text-ink">{v.priceWithDriver}</span>
                      </div>
                    )}
                    {v.priceWithoutDriver && (
                      <div className="flex items-center justify-between gap-3">
                        <span className="inline-flex items-center gap-1.5 text-ink-soft">
                          <KeyRound size={15} className="text-baobab" />
                          {labels.withoutDriver}
                        </span>
                        <span className="font-semibold text-ink">{v.priceWithoutDriver}</span>
                      </div>
                    )}
                  </div>
                )}
                <button
                  type="button"
                  onClick={() => setBooking(v.name)}
                  className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full bg-baobab px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-baobab-dark"
                >
                  <CalendarCheck size={16} />
                  {lang === "fr" ? "Réserver" : "Book"}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Visionneuse */}
      {current && open && (
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

          {current.images.length > 1 && (
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

          <figure className="w-full max-w-4xl" onClick={(e) => e.stopPropagation()}>
            <div className="aspect-video overflow-hidden rounded-2xl bg-black shadow-2xl">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={current.images[open.i]} alt={current.name} decoding="async" className="h-full w-full object-contain" />
            </div>
            <figcaption className="mt-3 text-center text-sm text-white/80">
              {current.name} · {open.i + 1}/{current.images.length}
            </figcaption>
          </figure>
        </div>
      )}

      {booking && (
        <CarBookingModal
          vehicles={vehicles.map((v) => v.name)}
          initialVehicle={booking}
          lang={lang}
          onClose={() => setBooking(null)}
        />
      )}
    </>
  );
}
