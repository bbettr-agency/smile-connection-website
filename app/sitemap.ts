import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { allRoutes } from "@/lib/routes";

/**
 * Generates /sitemap.xml from the central route registry.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return allRoutes.map((r) => ({
    url: `${site.url}${r.path}`,
    lastModified: now,
    changeFrequency: r.isService ? "monthly" : "weekly",
    priority: r.path === "/home" ? 1 : r.isService ? 0.8 : 0.7,
  }));
}
