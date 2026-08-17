import type { MetadataRoute } from "next";
import { getSettings } from "@/lib/data";

export default async function robots(): Promise<MetadataRoute.Robots> {
  const { url } = await getSettings();
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/admin",
    },
    sitemap: `${url}/sitemap.xml`,
    host: url,
  };
}
