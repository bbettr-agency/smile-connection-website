import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { EmergencyBlock } from "@/components/sections/EmergencyBlock";
import { TrustBar } from "@/components/sections/TrustBar";
import { ServicesPreview } from "@/components/sections/ServicesPreview";
import { TeamSection } from "@/components/sections/TeamSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { GalleryPreview } from "@/components/sections/GalleryPreview";
import { Reviews } from "@/components/sections/Reviews";
import { FAQ } from "@/components/sections/FAQ";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { JsonLd } from "@/components/ui/JsonLd";
import { buildMetadata } from "@/lib/seo";
import { faqSchema } from "@/lib/schema";
import { routes } from "@/lib/routes";

const homeFaqs = [
  { q: "Where is Smile Connection Dental Studio located?", a: "We're at 197 Lois Ave, Newlands, Pretoria, 0081 — a convenient dental practice in Pretoria East. You can call or WhatsApp us on 079 471 6319 to book." },
  { q: "What are your opening hours?", a: "We're open Monday to Thursday from 08:00 to 17:00 and Friday from 08:00 to 13:00. We're closed on Saturdays and Sundays. For severe pain or trauma outside these hours, please phone 079 471 6319." },
  { q: "What services do you offer?", a: "We offer preventive dentistry, restorative treatments, root canal treatment, tooth replacement (implants, bridges and dentures), smile makeovers and facial aesthetics. Visit our Services pages to learn more." },
  { q: "How do I book an appointment?", a: "The easiest ways are to call or WhatsApp us on 079 471 6319, or complete the booking form on our Contact Us page and we'll be in touch." },
];

export const metadata: Metadata = buildMetadata({
  path: routes.home.path,
  title: "Dentist in Newlands, Pretoria | Smile Connection Dental Studio",
  description:
    "Smile Connection Dental Studio is a premium dentist in Newlands, Pretoria. Preventive, restorative and cosmetic dentistry, implants, smile makeovers & more. Book today.",
  ogTitle: "Smile Connection Dental Studio — Dentist in Newlands, Pretoria",
  ogDescription:
    "Premium dental care in Newlands, Pretoria. Book your appointment for check-ups, smile makeovers, implants and more.",
});

export default function HomePage() {
  return (
    <>
      <JsonLd data={faqSchema(homeFaqs)} />
      <Hero />
      <EmergencyBlock />
      <TrustBar />
      <ServicesPreview />
      <TeamSection variant="compact" />
      <AboutSection />
      <GalleryPreview />
      <Reviews />
      <FAQ items={homeFaqs} />
      <FinalCTA />
    </>
  );
}
