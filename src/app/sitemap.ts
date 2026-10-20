import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/site";

/** Empty until NEXT_PUBLIC_SITE_URL is set — URLs are never guessed. */
export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl();
  if (!siteUrl) return [];
  return [{ url: new URL("/", siteUrl).toString(), changeFrequency: "monthly", priority: 1 }];
}
