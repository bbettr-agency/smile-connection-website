/**
 * Bbettr Website OS — SEO metadata helper.
 * Generates a consistent Next.js Metadata object (title, description,
 * Open Graph, canonical) for every page from a small input.
 */
import type { Metadata } from "next";
import { site } from "./site";

type SeoInput = {
  title: string;
  description: string;
  path: string; // route path, e.g. "/home"
  ogTitle?: string;
  ogDescription?: string;
  image?: string;
};

export function buildMetadata({
  title,
  description,
  path,
  ogTitle,
  ogDescription,
  image,
}: SeoInput): Metadata {
  const canonical = `${site.url}${path}`;
  const ogImage = image ?? site.ogImage;
  return {
    // Each page provides a complete, hand-tuned SEO title, so bypass the
    // layout's "%s | Brand" template to avoid duplicating the brand name.
    title: { absolute: title },
    description,
    alternates: { canonical },
    openGraph: {
      title: ogTitle ?? title,
      description: ogDescription ?? description,
      url: canonical,
      siteName: site.name,
      locale: "en_ZA",
      type: "website",
      images: [{ url: ogImage, width: 1200, height: 630, alt: site.name }],
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle ?? title,
      description: ogDescription ?? description,
      images: [ogImage],
    },
  };
}
