import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/sections/Breadcrumbs";
import { TeamSection } from "@/components/sections/TeamSection";
import { TrustBar } from "@/components/sections/TrustBar";
import { EmergencyBlock } from "@/components/sections/EmergencyBlock";
import { Reviews } from "@/components/sections/Reviews";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { Button } from "@/components/ui/Button";
import { JsonLd } from "@/components/ui/JsonLd";
import { CheckIcon } from "@/components/ui/Icons";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbSchema } from "@/lib/schema";
import { routes } from "@/lib/routes";

export const metadata: Metadata = buildMetadata({
  path: routes.about.path,
  title: "About Us | Family Dentist in Newlands, Pretoria | Smile Connection",
  description:
    "Meet Smile Connection Dental Studio — a family dental practice in Newlands, Pretoria, caring for smiles since 2009. Meet Dr Eugene Kleynhans and our friendly dental team.",
  ogTitle: "About Smile Connection Dental Studio, Newlands Pretoria",
  ogDescription:
    "A trusted family dental studio in Newlands, Pretoria since 2009. Meet Dr Eugene Kleynhans and our team, and discover our caring, aesthetic approach.",
});

const values = [
  { title: "Aesthetic focus", text: "Founded with a passion for beautiful, natural-looking dentistry that boosts confidence." },
  { title: "Family-friendly", text: "Caring for every generation — from a child's first visit to adult restorative care." },
  { title: "Modern dentistry", text: "We use the latest materials and technology for comfortable, lasting results." },
  { title: "Patient-first", text: "A safe, friendly environment where your comfort and goals come first." },
];

export default function AboutPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: routes.home.path },
          { name: "About Us", path: routes.about.path },
        ])}
      />
      <Breadcrumbs items={[{ name: "About Us", path: routes.about.path }]} />

      {/* Intro */}
      <section className="bg-soft-blue">
        <div className="container-px grid grid-cols-1 items-center gap-10 py-12 sm:py-16 lg:grid-cols-2 lg:gap-14">
          <div>
            <SectionHeading
              align="left"
              eyebrow="About Smile Connection"
              title="Caring for Pretoria smiles since 2009"
              subtitle="Smile Connection Dental Studio has been caring for Newlands and Pretoria families since 2009. Led by dentist Dr Eugene Kleynhans, our team combines aesthetic dentistry with comprehensive, family-focused care."
            />
            <div className="mt-6 flex flex-col gap-4 text-base leading-relaxed text-slate-600 sm:text-lg">
              <p>
                Based in Newlands, Pretoria, our studio offers the full spectrum of
                treatment — from preventive check-ups and children&apos;s dentistry to
                restorative care and cosmetic smile makeovers. Our philosophy is simple:
                help every patient look better, feel better and smile brighter.
              </p>
              <p>
                We believe great dentistry should feel calm, modern and reassuring. That&apos;s
                why we invest in modern materials and technology, and take the time to
                understand each patient&apos;s needs and goals.
              </p>
            </div>
            <div className="mt-8">
              <Button href={routes.contact.path} variant="primary" size="lg">
                Book an Appointment
              </Button>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <ImagePlaceholder
              ratio="tall"
              label="Practice interior (client photoshoot)"
              alt="PLACEHOLDER — real photo of the Smile Connection Dental Studio interior in Newlands, Pretoria"
              className="mt-8"
            />
            <ImagePlaceholder
              ratio="tall"
              label="Friendly dental care (client photoshoot)"
              alt="PLACEHOLDER — real photo of a Smile Connection dentist with a patient"
            />
          </div>
        </div>
      </section>

      <TrustBar />

      {/* Values */}
      <section className="bg-white">
        <div className="container-px py-16 sm:py-20">
          <SectionHeading eyebrow="Our Values" title="What makes Smile Connection different" />
          <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v) => (
              <div key={v.title} className="flex flex-col rounded-2xl border border-navy-50 bg-soft-blue p-6 shadow-card">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-green text-white">
                  <CheckIcon className="h-6 w-6" />
                </span>
                <h3 className="mt-4 text-lg font-bold text-navy-800">{v.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{v.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Full team */}
      <TeamSection variant="full" />

      <EmergencyBlock />
      <Reviews />
      <FinalCTA />
    </>
  );
}
