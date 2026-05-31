import Link from "next/link";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ServiceIcon, ArrowRightIcon } from "@/components/ui/Icons";
import { Button } from "@/components/ui/Button";
import { services } from "@/lib/services";
import { routes } from "@/lib/routes";

/**
 * Services preview grid. Used on the homepage and the Services index.
 */
export function ServicesPreview({
  heading = true,
  showAllCta = true,
}: {
  heading?: boolean;
  showAllCta?: boolean;
}) {
  return (
    <section id="services" className="bg-soft-blue">
      <div className="container-px py-16 sm:py-20">
        {heading && (
          <SectionHeading
            eyebrow="Our Dental Services"
            title="Complete dental care in Newlands, Pretoria"
            subtitle="From everyday prevention to life-changing smile makeovers, explore the treatments offered at Smile Connection Dental Studio."
          />
        )}

        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <Link
              key={s.slug}
              href={s.path}
              className="group flex flex-col rounded-2xl border border-navy-50 bg-white p-6 shadow-card transition-all duration-200 hover:-translate-y-1 hover:border-brand-green/40 hover:shadow-soft"
            >
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-green-light text-navy-800 transition-colors group-hover:bg-brand-green group-hover:text-white">
                <ServiceIcon name={s.icon} className="h-7 w-7" />
              </span>
              <h3 className="mt-5 text-xl font-bold text-navy-800">{s.label}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">{s.teaser}</p>
              <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-brand-green-dark">
                Learn more
                <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          ))}
        </div>

        {showAllCta && (
          <div className="mt-12 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button href={routes.services.path} variant="secondary" size="lg">
              View All Services
            </Button>
            <Button href={routes.contact.path} variant="primary" size="lg">
              Book an Appointment
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
