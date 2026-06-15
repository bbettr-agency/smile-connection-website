import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/sections/Breadcrumbs";
import { GalleryGrid } from "@/components/sections/GalleryGrid";
import { Reviews } from "@/components/sections/Reviews";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { JsonLd } from "@/components/ui/JsonLd";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbSchema } from "@/lib/schema";
import { routes } from "@/lib/routes";

export const metadata: Metadata = buildMetadata({
  path: routes.gallery.path,
  title: "Smile Gallery | Before & After Dental Results | Smile Connection Pretoria",
  description:
    "Browse the Smile Connection Dental Studio gallery — smile transformations, practice photos and our team in Newlands, Pretoria. Real patient photos coming soon.",
  ogTitle: "Smile Gallery — Smile Connection Dental Studio, Pretoria",
  ogDescription:
    "Smile transformations, practice and team photos from Smile Connection Dental Studio in Newlands, Pretoria.",
});

export default function GalleryPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: routes.home.path },
          { name: "Gallery", path: routes.gallery.path },
        ])}
      />
      <Breadcrumbs items={[{ name: "Gallery", path: routes.gallery.path }]} />

      <section className="bg-white">
        <div className="container-px py-12 sm:py-16">
          <SectionHeading
            eyebrow="Our Gallery"
            title="Smile transformations & our practice"
            subtitle="A look at the smiles we help create and the welcoming space we've built in Newlands, Pretoria."
          />

          <div className="mt-12">
            <GalleryGrid />
          </div>
        </div>
      </section>

      <Reviews />
      <FinalCTA />
    </>
  );
}
