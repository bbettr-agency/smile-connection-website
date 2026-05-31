import { Button } from "@/components/ui/Button";
import { site } from "@/lib/site";
import { routes } from "@/lib/routes";
import { PhoneIcon, WhatsAppIcon, CalendarIcon, PinIcon, ClockIcon } from "@/components/ui/Icons";

/**
 * Conversion-focused CTA band shown before the footer on every page.
 * Includes primary (book), secondary (call) and WhatsApp actions.
 */
export function FinalCTA({
  title = "Ready for a healthier, brighter smile?",
  subtitle = "Book your appointment at Smile Connection Dental Studio in Newlands, Pretoria — or reach out on WhatsApp and our team will help you straight away.",
}: {
  title?: string;
  subtitle?: string;
}) {
  return (
    <section aria-label="Book your appointment" className="relative overflow-hidden bg-navy-gradient">
      <div className="absolute inset-0 bg-hero-glow" aria-hidden="true" />
      <div className="container-px relative py-16 sm:py-20">
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <span className="eyebrow">Book Your Visit</span>
          <h2 className="mt-4 text-3xl leading-tight text-white sm:text-4xl lg:text-[2.6rem]">{title}</h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-navy-100 sm:text-lg">{subtitle}</p>

          <div className="mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:flex-wrap sm:justify-center">
            <Button href={routes.contact.path} variant="primary" size="lg" className="w-full sm:w-auto">
              <CalendarIcon className="h-5 w-5" /> Book Appointment
            </Button>
            <Button href={`tel:${site.contact.phoneTel}`} external variant="white" size="lg" className="w-full sm:w-auto">
              <PhoneIcon className="h-5 w-5" /> Call {site.contact.phoneDisplay}
            </Button>
            <Button href={site.contact.whatsappLink} external variant="secondary" size="lg" className="w-full sm:w-auto">
              <WhatsAppIcon className="h-5 w-5 text-brand-green" /> WhatsApp
            </Button>
          </div>

          <div className="mt-10 flex flex-col items-center gap-3 text-sm text-navy-100 sm:flex-row sm:gap-8">
            <a href={site.address.mapsLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 hover:text-white">
              <PinIcon className="h-4 w-4 text-brand-green" /> {site.address.full}
            </a>
            <span className="inline-flex items-center gap-2">
              <ClockIcon className="h-4 w-4 text-brand-green" /> Mon–Thu 08:00–17:00 · Fri 08:00–13:00
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
