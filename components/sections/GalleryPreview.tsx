import { SectionHeading } from "@/components/ui/SectionHeading";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { Button } from "@/components/ui/Button";
import { galleryItems } from "@/lib/gallery";
import { routes } from "@/lib/routes";

/**
 * Homepage gallery teaser. Shows a few placeholder tiles and links to the
 * full gallery page. Real photoshoot images replace the placeholders later.
 */
export function GalleryPreview() {
  const preview = galleryItems.slice(0, 4);
  return (
    <section className="bg-soft-blue">
      <div className="container-px py-16 sm:py-20">
        <SectionHeading
          eyebrow="Our Gallery"
          title="Real smiles, real results"
          subtitle="A glimpse inside Smile Connection Dental Studio. The client's real photoshoot images will appear here — these are clearly-marked placeholders for now."
        />

        <div className="mt-12 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {preview.map((item, i) => (
            <ImagePlaceholder
              key={item.id}
              ratio={i % 2 === 0 ? "portrait" : "square"}
              label={item.label}
              alt={item.alt}
              className={i % 2 === 0 ? "" : "sm:mt-8"}
            />
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <Button href={routes.gallery.path} variant="secondary" size="lg">
            View Full Gallery
          </Button>
        </div>
      </div>
    </section>
  );
}
