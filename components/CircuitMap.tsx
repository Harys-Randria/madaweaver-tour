"use client";

import { useEffect, useRef } from "react";
import "leaflet/dist/leaflet.css";

export type MapPoint = { lat: number; lng: number; label: string };

type LatLng = [number, number];

// Distance à vol d'oiseau (km).
function haversineKm(a: MapPoint, b: MapPoint): number {
  const R = 6371;
  const dLat = ((b.lat - a.lat) * Math.PI) / 180;
  const dLng = ((b.lng - a.lng) * Math.PI) / 180;
  const la1 = (a.lat * Math.PI) / 180;
  const la2 = (b.lat * Math.PI) / 180;
  const h =
    Math.sin(dLat / 2) ** 2 + Math.cos(la1) * Math.cos(la2) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
}

// Au-delà de ce ratio (route / vol d'oiseau), on considère le tracé routier
// aberrant (trou dans les données OpenStreetMap) → repli ligne droite.
const MAX_DETOUR_RATIO = 2.3;

// Récupère le tracé routier réel entre deux points via OSRM (gratuit, sans clé).
// Renvoie la géométrie qui suit les routes, ou null si aucun itinéraire routier
// (vol, traversée) ou si le trajet fait un détour aberrant → ligne droite.
async function fetchRoad(a: MapPoint, b: MapPoint): Promise<LatLng[] | null> {
  try {
    const url = `https://router.project-osrm.org/route/v1/driving/${a.lng},${a.lat};${b.lng},${b.lat}?overview=full&geometries=geojson`;
    const res = await fetch(url);
    const data = await res.json();
    const route = data?.routes?.[0];
    const coords: [number, number][] | undefined = route?.geometry?.coordinates;
    if (data?.code === "Ok" && coords?.length) {
      const straight = haversineKm(a, b);
      const roadKm = (route.distance ?? 0) / 1000;
      // Détour aberrant (données OSM incomplètes) → on préfère la ligne droite.
      if (straight > 5 && roadKm > straight * MAX_DETOUR_RATIO) return null;
      // GeoJSON = [lng, lat] → Leaflet = [lat, lng]
      return coords.map(([lng, lat]) => [lat, lng] as LatLng);
    }
  } catch {
    /* réseau indisponible → repli ligne droite */
  }
  return null;
}

// Carte interactive gratuite (Leaflet + OpenStreetMap). Le trajet suit les
// routes réelles (OSRM) ; les tronçons non routiers (vols, mer) sont en
// pointillé. Leaflet est importé dynamiquement (nécessite `window`).
export default function CircuitMap({ points }: { points: MapPoint[] }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || points.length === 0) return;
    let map: import("leaflet").Map | undefined;
    let cancelled = false;

    (async () => {
      const L = (await import("leaflet")).default;
      if (cancelled || !containerRef.current) return;

      map = L.map(containerRef.current, { scrollWheelZoom: false });
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        maxZoom: 18,
      }).addTo(map);

      const wpLatLngs: LatLng[] = points.map((p) => [p.lat, p.lng]);

      // Marqueurs numérotés (vectoriels → aucun souci d'image).
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

      // Cadrage initial (avant que les routes arrivent).
      if (wpLatLngs.length === 1) {
        map.setView(wpLatLngs[0], 9);
        return;
      }
      map.fitBounds(L.latLngBounds(wpLatLngs), { padding: [40, 40] });

      // Un tracé par segment consécutif (routier si possible, sinon pointillé).
      const segments = points.slice(0, -1).map((a, i) => [a, points[i + 1]] as const);
      const roads = await Promise.all(segments.map(([a, b]) => fetchRoad(a, b)));
      if (cancelled || !map) return;

      const allLatLngs: LatLng[] = [...wpLatLngs];
      roads.forEach((road, i) => {
        if (road) {
          L.polyline(road, { color: "#c2622d", weight: 4, opacity: 0.9 }).addTo(map!);
          allLatLngs.push(...road);
        } else {
          const [a, b] = segments[i];
          L.polyline(
            [
              [a.lat, a.lng],
              [b.lat, b.lng],
            ],
            { color: "#c2622d", weight: 2.5, opacity: 0.6, dashArray: "5 9" },
          ).addTo(map!);
        }
      });

      // Recadre pour englober les routes (elles peuvent sortir du cadre initial).
      map.fitBounds(L.latLngBounds(allLatLngs), { padding: [40, 40] });
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
