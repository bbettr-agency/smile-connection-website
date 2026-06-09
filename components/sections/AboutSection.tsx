import { SectionHeading } from "@/components/ui/SectionHeading";
import { AppImage } from "@/components/ui/AppImage";
import { Button } from "@/components/ui/Button";
import { CheckIcon } from "@/components/ui/Icons";
import { routes } from "@/lib/routes";

const highlights = [
  "An established dental studio, caring for Pretoria smiles since 2009",
  "Full spectrum of care — from routine check-ups to cosmetic makeovers",
  "Modern materials and technology for comfortable treatment",
  "A friendly, welcoming dental home in Newlands, Pretoria",
];

export function AboutSection() {
  return (
    <section id="about" className="bg-white">
      <div className="container-px py-16 sm:py-20">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-14">
          {/* Images */}
          <div className="grid grid-cols-2 gap-4">
            <AppImage
              src="/images/clinic/smile-connection-dental-surgery-room-pretoria.jpg"
              alt="A modern treatment room at Smile Connection Dental Studio in Newlands, Pretoria"
              ratio="tall"
              className="mt-8"
              position="center"
            />
            <AppImage
              src="/images/clinic/dentist-treating-patient-smile-connection-pretoria.jpg"
              alt="Dr Eugene Kleynhans and a dental assistant caring for a patient at Smile Connection Dental Studio"
              ratio="tall"
              position="center top"
            />
          </div>

          {/* Copy */}
          <div className="flex flex-col gap-6">
            <SectionHeading
              align="left"
              eyebrow="About Smile Connection"
              title="A trusted dental studio in Newlands, Pretoria"
              subtitle="Founded in 2009, Smile Connection Dental Studio was built around a simple idea: combine beautiful, aesthetic dentistry with caring, comprehensive treatment for every patient."
            />
            <p className="prose-dental">
              <span className="text-base leading-relaxed text-slate-600 sm:text-lg">
                Whether you&apos;re visiting for a routine check-up, restorative
                treatment, or planning a complete smile makeover, our goal is to
                help you look better, feel better and smile brighter — in a safe,
                friendly and modern environment.
              </span>
            </p>
            <ul className="flex flex-col gap-3">
              {highlights.map((h) => (
                <li key={h} className="flex items-start gap-3 text-sm font-medium text-navy-700 sm:text-base">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-green text-white">
                    <CheckIcon className="h-3 w-3" />
                  </span>
                  {h}
                </li>
              ))}
            </ul>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button href={routes.about.path} variant="secondary" size="lg">
                More About Us
              </Button>
              <Button href={routes.contact.path} variant="primary" size="lg">
                Book an Appointment
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
