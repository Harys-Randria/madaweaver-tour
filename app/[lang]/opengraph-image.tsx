import { ImageResponse } from "next/og";
import { getSettings } from "@/lib/data";
import { isLocale, t, type Locale } from "@/lib/i18n";

export const alt = "Madaweaver Tour — Madagascar";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Vignette affichée quand un lien du site est partagé (WhatsApp, Facebook, X…).
export default async function Image({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const locale: Locale = isLocale(lang) ? lang : "en";
  const s = await getSettings();

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "linear-gradient(135deg, #2b1a12 0%, #7a3b1d 55%, #c2622d 100%)",
          color: "#fdf6ee",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              width: 54,
              height: 54,
              borderRadius: 999,
              background: "#fdf6ee",
              color: "#7a3b1d",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 34,
              fontWeight: 700,
            }}
          >
            M
          </div>
          <div style={{ fontSize: 34, fontWeight: 700, letterSpacing: -0.5 }}>{s.name}</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div style={{ fontSize: 66, fontWeight: 700, lineHeight: 1.05, maxWidth: 900 }}>
            {t(s.tagline, locale)}
          </div>
          <div style={{ fontSize: 30, color: "#f2d9c4", maxWidth: 900 }}>
            {locale === "fr"
              ? "Circuits sur-mesure à Madagascar · Baobabs, lémuriens, tsingy, plages"
              : "Tailor-made tours in Madagascar · Baobabs, lemurs, tsingy, beaches"}
          </div>
        </div>

        <div style={{ display: "flex", fontSize: 26, color: "#f2d9c4" }}>
          {s.url.replace(/^https?:\/\//, "")}
        </div>
      </div>
    ),
    { ...size },
  );
}
