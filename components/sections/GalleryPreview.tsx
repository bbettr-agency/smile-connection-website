import { SectionHeading } from "@/components/ui/SectionHeading";
import { AppImage } from "@/components/ui/AppImage";
import { Button } from "@/components/ui/Button";
import { galleryItems } from "@/lib/gallery";
import { routes } from "@/lib/routes";

/**
 * Homepage gallery teaser. Shows a few placeholder tiles and links to the
 * full gallery page. Real photoshoot images replace the placeholders later.
 */
export function GalleryPreview() {
  const previewIds = ["team-group", "smile-happy", "practice-room", "smile-veneers"];
  const preview = previewIds
    .map((id) => galleryItems.find((g) => g.id === id))
    .filter((g): g is (typeof galleryItems)[number] => Boolean(g));
  return (
    <section className="bg-soft-blue">
      <div className="container-px py-16 sm:py-20">
        <SectionHeading
          eyebrow="Our Gallery"
          title="Real smiles, real results"
          subtitle="A glimpse inside Smile Connection Dental Studio in Newlands, Pretoria — our team, our practice and real patient transformations."
        />

        <div className="mt-12 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {preview.map((item, i) => (
            <AppImage
              key={item.id}
              src={item.src}
              alt={item.alt}
              ratio={i % 2 === 0 ? "portrait" : "square"}
              className={i % 2 === 0 ? "" : "sm:mt-8"}
              position="center top"
              sizes="(max-width: 1024px) 50vw, 25vw"
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
