import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Page 404 globale (le <html> est dans [lang]/layout.tsx, segment dynamique
  // de premier niveau → on utilise global-not-found, cf. app/global-not-found.tsx).
  experimental: {
    globalNotFound: true,
  },
};

export default nextConfig;
