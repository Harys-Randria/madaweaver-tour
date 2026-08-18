"use client";

import { useEffect, useRef } from "react";
import "leaflet/dist/leaflet.css";

export type MapPoint = { lat: number; lng: number; label: string };

// Carte interactive gratuite (Leaflet + OpenStreetMap). Trace une ligne reliant
// les étapes du circuit dans l'ordre. Leaflet est importé dynamiquement pour
// n'être chargé que côté navigateur (il a besoin de `window`).
export default function CircuitMap({ points }: { points: MapPoint[] }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || points.length === 0) return;
    let map: import("leaflet").Map | undefined;
    let cancelled = false;

    (async () => {
      const L = (await import("leaflet")).default;
      if (cancelled || !containerRef.current) return;

      map = L.map(containerRef.current, {
        scrollWheelZoom: false,
        attributionControl: true,
      });

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        maxZoom: 18,
      }).addTo(map);

      const latlngs = points.map((p) => [p.lat, p.lng] as [number, number]);

      // Marqueurs numérotés (pas d'image → aucun souci de chargement d'icône).
      points.forEach((p, i) => {
        const icon = L.divIcon({
          className: "",
          html: `<div style="background:#c2622d;color:#fff;width:26px;height:26px;border-radius:9999px;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:13px;border:2px solid #fff;box-shadow:0 1px 4px rgba(0,0,0,.45)">${i + 1}</div>`,
          iconSize: [26, 26],
          iconAnchor: [13, 13],
        });
        L.marker([p.lat, p.lng], { icon })
          .addTo(map!)
          .bindPopup(`<strong>${i + 1}.</strong> ${p.label}`);
      });

      // Ligne du trajet (une seule étape = pas de ligne, juste le marqueur).
      if (latlngs.length > 1) {
        L.polyline(latlngs, {
          color: "#c2622d",
          weight: 3,
          opacity: 0.9,
          dashArray: "6 8",
        }).addTo(map);
        map.fitBounds(L.latLngBounds(latlngs), { padding: [40, 40] });
      } else {
        map.setView(latlngs[0], 9);
      }
    })();

    return () => {
      cancelled = true;
      if (map) map.remove();
    };
  }, [points]);

  if (points.length === 0) return null;

  return (
    <div
      ref={containerRef}
      className="h-80 w-full overflow-hidden rounded-2xl ring-1 ring-ink/8 sm:h-96"
      style={{ zIndex: 0 }}
    />
  );
}
