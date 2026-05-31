import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/sections/Breadcrumbs";
import { ContactForm } from "@/components/sections/ContactForm";
import { EmergencyBlock } from "@/components/sections/EmergencyBlock";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { JsonLd } from "@/components/ui/JsonLd";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbSchema } from "@/lib/schema";
import { routes } from "@/lib/routes";
import { site } from "@/lib/site";
import { PhoneIcon, WhatsAppIcon, MailIcon, PinIcon, ClockIcon, AlertIcon } from "@/components/ui/Icons";

export const metadata: Metadata = buildMetadata({
  path: routes.contact.path,
  title: "Contact Us | Book a Dentist in Newlands, Pretoria | Smile Connection",
  description:
    "Contact Smile Connection Dental Studio at 197 Lois Ave, Newlands, Pretoria. Call or WhatsApp 079 471 6319, or book your dental appointment online. Mon–Fri appointments available.",
  ogTitle: "Contact Smile Connection Dental Studio, Newlands Pretoria",
  ogDescription:
    "Book your appointment at Smile Connection Dental Studio in Newlands, Pretoria. Call, WhatsApp or use our online form.",
});

export default function ContactPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: routes.home.path },
          { name: "Contact Us", path: routes.contact.path },
        ])}
      />
      <Breadcrumbs items={[{ name: "Contact Us", path: routes.contact.path }]} />

      <section className="bg-soft-blue">
        <div className="container-px py-12 sm:py-16">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-12">
            {/* Details */}
            <div className="flex flex-col gap-8">
              <SectionHeading
                align="left"
                eyebrow="Contact Us"
                title="Book your visit to Smile Connection"
                subtitle="We'd love to welcome you to our dental studio in Newlands, Pretoria. Reach out by phone, WhatsApp or the booking form — whatever's easiest for you."
              />

              {/* Quick actions */}
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <Button href={`tel:${site.contact.phoneTel}`} external variant="secondary" size="lg" className="w-full">
                  <PhoneIcon className="h-5 w-5" /> Call {site.contact.phoneDisplay}
                </Button>
                <Button href={site.contact.whatsappLink} external variant="primary" size="lg" className="w-full">
                  <WhatsAppIcon className="h-5 w-5" /> WhatsApp Us
                </Button>
              </div>

              {/* Info cards */}
              <div className="flex flex-col gap-4">
                <a href={site.address.mapsLink} target="_blank" rel="noopener noreferrer" className="flex items-start gap-4 rounded-2xl border border-navy-50 bg-white p-5 shadow-card transition-colors hover:border-brand-green/40">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-green-light text-brand-green-dark">
                    <PinIcon className="h-5 w-5" />
                  </span>
                  <span>
                    <span className="block text-sm font-bold text-navy-800">Visit Us</span>
                    <span className="block text-sm text-slate-600">{site.address.full}</span>
                  </span>
                </a>
                <a href={`mailto:${site.contact.email}`} className="flex items-start gap-4 rounded-2xl border border-navy-50 bg-white p-5 shadow-card transition-colors hover:border-brand-green/40">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-green-light text-brand-green-dark">
                    <MailIcon className="h-5 w-5" />
                  </span>
                  <span>
                    <span className="block text-sm font-bold text-navy-800">Email Us</span>
                    <span className="block break-all text-sm text-slate-600">{site.contact.email}</span>
                  </span>
                </a>

                {/* Opening hours */}
                <div className="rounded-2xl border border-navy-50 bg-white p-5 shadow-card">
                  <div className="flex items-center gap-3">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-green-light text-brand-green-dark">
                      <ClockIcon className="h-5 w-5" />
                    </span>
                    <span className="text-sm font-bold text-navy-800">Opening Hours</span>
                  </div>
                  <ul className="mt-4 flex flex-col gap-1.5 text-sm">
                    {site.hours.map((h) => (
                      <li key={h.day} className="flex items-center justify-between gap-4">
                        <span className="text-slate-600">{h.day}</span>
                        <span className={h.open ? "font-semibold text-navy-800" : "text-slate-400"}>{h.label}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Emergency note */}
                <div className="flex items-start gap-3 rounded-2xl border border-brand-green/30 bg-brand-green-light p-5">
                  <AlertIcon className="mt-0.5 h-5 w-5 shrink-0 text-brand-green-dark" />
                  <p className="text-sm font-semibold text-navy-800">{site.emergency.text}</p>
                </div>
              </div>
            </div>

            {/* Booking form */}
            <div>
              <div className="lg:sticky lg:top-24">
                <h2 className="mb-4 text-xl font-bold text-navy-800">Request your consultation</h2>
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map */}
      <section aria-label="Find us" className="bg-white">
        <div className="container-px pb-12">
          <div className="overflow-hidden rounded-3xl border border-navy-50 shadow-card">
            <iframe
              title="Map to Smile Connection Dental Studio, 197 Lois Ave, Newlands, Pretoria"
              src="https://www.google.com/maps?q=197%20Lois%20Ave,%20Newlands,%20Pretoria,%200081&output=embed"
              width="100%"
              height="380"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full border-0"
            />
          </div>
        </div>
      </section>

      <EmergencyBlock />
    </>
  );
}
