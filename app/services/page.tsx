import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/sections/Breadcrumbs";
import { ServicesPreview } from "@/components/sections/ServicesPreview";
import { EmergencyBlock } from "@/components/sections/EmergencyBlock";
import { Reviews } from "@/components/sections/Reviews";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { JsonLd } from "@/components/ui/JsonLd";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbSchema } from "@/lib/schema";
import { routes } from "@/lib/routes";
import { site } from "@/lib/site";
import { CalendarIcon, PhoneIcon } from "@/components/ui/Icons";

export const metadata: Metadata = buildMetadata({
  path: routes.services.path,
  title: "Dental Services in Pretoria | Smile Connection Dental Studio, Newlands",
  description:
    "Explore our full range of dental services in Newlands, Pretoria: preventive dentistry, restorative treatments, root canal, tooth replacement, smile makeovers & facial aesthetics.",
  ogTitle: "Dental Services in Newlands, Pretoria",
  ogDescription:
    "Preventive, restorative and cosmetic dentistry at Smile Connection Dental Studio in Newlands, Pretoria.",
});

export default function ServicesPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: routes.home.path },
          { name: "Services", path: routes.services.path },
        ])}
      />
      <Breadcrumbs items={[{ name: "Services", path: routes.services.path }]} />

      <section className="bg-soft-blue">
        <div className="container-px py-12 sm:py-16">
          <div className="mx-auto max-w-3xl text-center">
            <SectionHeading
              eyebrow="Our Dental Services"
              title="Comprehensive dental care in Newlands, Pretoria"
              subtitle="From a routine check-up to a complete smile makeover, Smile Connection Dental Studio offers the full spectrum of dental care under one roof — using modern materials and technology for comfortable, lasting results."
            />
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button href={routes.contact.path} variant="primary" size="lg">
                <CalendarIcon className="h-5 w-5" /> Book Appointment
              </Button>
              <Button href={`tel:${site.contact.phoneTel}`} external variant="secondary" size="lg">
                <PhoneIcon className="h-5 w-5" /> Call {site.contact.phoneDisplay}
              </Button>
            </div>
          </div>
        </div>
      </section>

      <ServicesPreview heading={false} showAllCta={false} />
      <EmergencyBlock />
      <Reviews />
      <FinalCTA />
    </>
  );
}
