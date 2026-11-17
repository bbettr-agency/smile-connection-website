import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { allRoutes } from "@/lib/routes";

/**
 * Generates /sitemap.xml from the central route registry.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return allRoutes.map((r) => {
    const isLegal = r.path === "/privacy-policy";
    return {
      url: `${site.url}${r.path}`,
      lastModified: now,
      changeFrequency: isLegal ? "yearly" : r.isService ? "monthly" : "weekly",
      priority: r.path === "/" ? 1 : isLegal ? 0.3 : r.isService ? 0.8 : 0.7,
    };
  });
}
