import { Button } from "@/components/ui/Button";
import { AppImage } from "@/components/ui/AppImage";
import { site } from "@/lib/site";
import { routes } from "@/lib/routes";
import { PhoneIcon, WhatsAppIcon, CalendarIcon, CheckIcon, AlertIcon } from "@/components/ui/Icons";

const heroTrust = [
  "Trusted Newlands dental studio since 2009",
  "HPCSA-registered dentists",
  "Check-ups to cosmetic makeovers",
];

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-soft-blue pt-[68px]">
      <div className="absolute inset-0 bg-hero-glow" aria-hidden="true" />
      <div className="container-px relative grid grid-cols-1 items-center gap-10 py-12 sm:py-16 lg:grid-cols-2 lg:gap-12 lg:py-20">
        {/* Copy */}
        <div className="flex flex-col gap-6 animate-fade-up">
          <span className="eyebrow w-fit">Dentist in Newlands, Pretoria</span>
          <h1 className="text-4xl leading-[1.08] sm:text-5xl lg:text-[3.4rem]">
            Premium dental care for{" "}
            <span className="text-brand-green-dark">healthy, confident smiles</span>
          </h1>
          <p className="max-w-xl text-base leading-relaxed text-slate-600 sm:text-lg">
            {site.shortName} is a dental studio in Newlands, Pretoria. From
            preventive check-ups to advanced cosmetic makeovers, we help you look
            better, feel better and smile brighter.
          </p>

          {/* Primary + secondary CTAs */}
          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Button href={routes.contact.path} variant="primary" size="lg">
              <CalendarIcon className="h-5 w-5" /> Book Appointment
            </Button>
            <Button href={`tel:${site.contact.phoneTel}`} external variant="secondary" size="lg">
              <PhoneIcon className="h-5 w-5" /> Call {site.contact.phoneDisplay}
            </Button>
            <Button href={site.contact.whatsappLink} external variant="ghost" size="lg">
              <WhatsAppIcon className="h-5 w-5 text-brand-green" /> WhatsApp
            </Button>
          </div>

          {/* Trust elements */}
          <ul className="mt-1 flex flex-col gap-2">
            {heroTrust.map((t) => (
              <li key={t} className="flex items-center gap-2.5 text-sm font-medium text-navy-700">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-green text-white">
                  <CheckIcon className="h-3 w-3" />
                </span>
                {t}
              </li>
            ))}
          </ul>
        </div>

        {/* Imagery + emergency block */}
        <div className="flex flex-col gap-4 animate-fade-up [animation-delay:120ms]">
          <div className="relative">
            <AppImage
              src="/images/hero/smile-connection-dental-team-newlands-pretoria.jpg"
              alt="The Smile Connection Dental Studio team, led by dentist Dr Eugene Kleynhans, at their practice in Newlands, Pretoria"
              ratio="portrait"
              rounded="rounded-3xl"
              className="shadow-soft"
              priority
              position="center top"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            {/* Floating trust chip */}
            <div className="absolute -bottom-4 left-4 right-4 mx-auto flex max-w-sm items-center gap-3 rounded-2xl border border-navy-50 bg-white/95 p-3 shadow-card backdrop-blur sm:left-6 sm:right-auto">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-green-light text-brand-green-dark">
                <CheckIcon className="h-6 w-6" />
              </div>
              <div className="leading-tight">
                <p className="text-sm font-bold text-navy-800">Gentle, modern dentistry</p>
                <p className="text-xs text-slate-500">Latest materials &amp; technology</p>
              </div>
            </div>
          </div>

          {/* Emergency block */}
          <div className="mt-3 flex flex-col gap-3 rounded-2xl border border-brand-green/30 bg-white p-4 shadow-card sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-green-light text-brand-green-dark">
                <AlertIcon className="h-5 w-5" />
              </span>
              <p className="text-sm font-semibold leading-snug text-navy-800">
                {site.emergency.text}
              </p>
            </div>
            <Button
              href={`tel:${site.emergency.phoneTel}`}
              external
              variant="primary"
              size="md"
              className="w-full shrink-0 animate-pulse-ring sm:w-auto"
              ariaLabel="Phone the dental emergency line now"
            >
              <PhoneIcon className="h-4 w-4" /> Emergency Call
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
