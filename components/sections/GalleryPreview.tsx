import { SectionHeading } from "@/components/ui/SectionHeading";
import { AppImage } from "@/components/ui/AppImage";
import { Button } from "@/components/ui/Button";
import { galleryItems } from "@/lib/gallery";
import { routes } from "@/lib/routes";

/**
 * Homepage gallery teaser — showcases real before/after treatment results to
 * build trust and drive enquiries. Config-driven: any gallery item in the
 * "Before & After" category appears here automatically.
 */
export function GalleryPreview() {
  const results = galleryItems.filter((g) => g.category === "Before & After");
  return (
    <section className="bg-soft-blue">
      <div className="container-px py-16 sm:py-20">
        <SectionHeading
          eyebrow="Before & After"
          title="Real results, real smiles"
          subtitle="See the difference for yourself — real before-and-after results from treatments carried out at our Newlands, Pretoria studio."
        />

        <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5 lg:grid-cols-5">
          {results.map((item) => (
            <figure
              key={item.id}
              className="group flex flex-col overflow-hidden rounded-2xl border border-navy-50 bg-white shadow-card transition-shadow duration-300 hover:shadow-soft"
            >
              <AppImage
                src={item.src}
                alt={item.alt}
                ratio="tall"
                fit={item.fit ?? "contain"}
                bg="bg-soft-blue"
                rounded="rounded-none"
                position="center"
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                className="transition-transform duration-300 group-hover:scale-[1.03]"
              />
              <figcaption className="px-2 py-3 text-center text-sm font-semibold text-navy-800">
                {item.label}
              </figcaption>
            </figure>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button href={routes.contact.path} variant="primary" size="lg">
            Book a Consultation
          </Button>
          <Button href={routes.gallery.path} variant="secondary" size="lg">
            View Gallery
          </Button>
        </div>
      </div>
    </section>
  );
}
