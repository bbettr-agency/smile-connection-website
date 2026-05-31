import Link from "next/link";
import { Breadcrumbs } from "@/components/sections/Breadcrumbs";
import { FAQ } from "@/components/sections/FAQ";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { Reviews } from "@/components/sections/Reviews";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { Button } from "@/components/ui/Button";
import { JsonLd } from "@/components/ui/JsonLd";
import { ServiceIcon, CheckIcon, ArrowRightIcon, PhoneIcon, WhatsAppIcon, CalendarIcon, AlertIcon } from "@/components/ui/Icons";
import { site } from "@/lib/site";
import { routes } from "@/lib/routes";
import { services, type Service } from "@/lib/services";
import { breadcrumbSchema, faqSchema, serviceSchema } from "@/lib/schema";

/**
 * Reusable, SEO + conversion optimised template for every service page.
 * Structure: Hero → Explanation → Who it's for → Benefits → Process →
 * Treatments → Related services → Reviews → FAQ → Final CTA.
 */
export function ServicePageTemplate({ service }: { service: Service }) {
  const related = service.related
    .map((slug) => services.find((s) => s.slug === slug))
    .filter((s): s is Service => Boolean(s));

  return (
    <>
      {/* Structured data */}
      <JsonLd data={serviceSchema({ name: service.h1, description: service.seoDescription, path: service.path })} />
      <JsonLd data={faqSchema(service.faqs)} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: routes.home.path },
          { name: "Services", path: routes.services.path },
          { name: service.label, path: service.path },
        ])}
      />

      <Breadcrumbs items={[{ name: "Services", path: routes.services.path }, { name: service.label, path: service.path }]} />

      {/* Hero */}
      <section className="bg-soft-blue">
        <div className="container-px grid grid-cols-1 items-center gap-10 py-12 sm:py-16 lg:grid-cols-2 lg:gap-12">
          <div className="flex flex-col gap-6">
            <span className="eyebrow w-fit">
              <ServiceIcon name={service.icon} className="h-4 w-4" /> {service.label} · Pretoria
            </span>
            <h1 className="text-4xl leading-[1.1] sm:text-5xl">{service.h1}</h1>
            <p className="max-w-xl text-base leading-relaxed text-slate-600 sm:text-lg">{service.heroSubtitle}</p>
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
          </div>
          <ImagePlaceholder
            ratio="wide"
            label={`${service.label} — client photoshoot image`}
            alt={service.heroImageAlt}
            rounded="rounded-3xl"
            className="shadow-soft"
          />
        </div>
      </section>

      {/* Urgent note (e.g. root canal pain) */}
      {service.note && !service.note.startsWith("[PLACEHOLDER]") && (
        <div className="container-px py-6">
          <div className="flex items-center gap-3 rounded-2xl border border-brand-green/30 bg-brand-green-light px-5 py-4">
            <AlertIcon className="h-5 w-5 shrink-0 text-brand-green-dark" />
            <p className="text-sm font-semibold text-navy-800">{service.note}</p>
          </div>
        </div>
      )}

      {/* Explanation */}
      <section className="bg-white">
        <div className="container-px py-16 sm:py-20">
          <div className="mx-auto max-w-3xl">
            <SectionHeading
              align="left"
              eyebrow="What it is"
              title={`Understanding ${service.label.toLowerCase()}`}
            />
            <div className="mt-6 flex flex-col gap-4">
              {service.intro.map((p, i) => (
                <p key={i} className="text-base leading-relaxed text-slate-600 sm:text-lg">{p}</p>
              ))}
            </div>

            {service.treatments && (
              <div className="mt-8 rounded-2xl border border-navy-50 bg-soft-blue p-6">
                <h3 className="text-lg font-bold text-navy-800">What this includes</h3>
                <ul className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {service.treatments.map((t) => (
                    <li key={t} className="flex items-start gap-2.5 text-sm font-medium text-navy-700">
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-green text-white">
                        <CheckIcon className="h-3 w-3" />
                      </span>
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {service.note && service.note.startsWith("[PLACEHOLDER]") && (
              <p className="mt-6 rounded-xl border border-dashed border-navy-200 bg-white px-4 py-3 text-xs italic text-slate-500">
                {service.note}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Who it's for */}
      <section className="bg-soft-blue">
        <div className="container-px py-16 sm:py-20">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-14">
            <ImagePlaceholder
              ratio="square"
              label={`${service.label} — who it's for (client photoshoot)`}
              alt={`PLACEHOLDER — real photo illustrating who ${service.label.toLowerCase()} at Smile Connection Dental Studio is suitable for`}
            />
            <div>
              <SectionHeading align="left" eyebrow="Is this for you?" title={service.whoFor.title} />
              <ul className="mt-6 flex flex-col gap-3.5">
                {service.whoFor.points.map((p) => (
                  <li key={p} className="flex items-start gap-3 text-base text-navy-700">
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-green text-white">
                      <CheckIcon className="h-3.5 w-3.5" />
                    </span>
                    {p}
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <Button href={routes.contact.path} variant="primary" size="lg">
                  Book a Consultation
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="bg-white">
        <div className="container-px py-16 sm:py-20">
          <SectionHeading eyebrow="Benefits" title={`Why choose ${service.label.toLowerCase()} at Smile Connection`} />
          <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {service.benefits.map((b) => (
              <div key={b.title} className="flex flex-col rounded-2xl border border-navy-50 bg-soft-blue p-6 shadow-card">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-green text-white">
                  <CheckIcon className="h-6 w-6" />
                </span>
                <h3 className="mt-4 text-lg font-bold text-navy-800">{b.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{b.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="bg-soft-blue">
        <div className="container-px py-16 sm:py-20">
          <SectionHeading eyebrow="The Process" title="What to expect, step by step" />
          <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {service.process.map((step) => (
              <div key={step.step} className="relative rounded-2xl border border-navy-50 bg-white p-6 shadow-card">
                <span className="text-3xl font-extrabold text-brand-green/30">{step.step}</span>
                <h3 className="mt-2 text-lg font-bold text-navy-800">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews */}
      <Reviews />

      {/* FAQ (with schema above) */}
      <FAQ items={service.faqs} title={`${service.label}: your questions answered`} />

      {/* Related services — internal linking */}
      {related.length > 0 && (
        <section className="bg-white">
          <div className="container-px py-16 sm:py-20">
            <SectionHeading eyebrow="Related Treatments" title="You might also be interested in" />
            <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-3">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  href={r.path}
                  className="group flex flex-col rounded-2xl border border-navy-50 bg-soft-blue p-6 shadow-card transition-all hover:-translate-y-1 hover:border-brand-green/40"
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-white text-navy-800 group-hover:bg-brand-green group-hover:text-white">
                    <ServiceIcon name={r.icon} className="h-6 w-6" />
                  </span>
                  <h3 className="mt-4 text-lg font-bold text-navy-800">{r.label}</h3>
                  <p className="mt-2 flex-1 text-sm text-slate-600">{r.teaser}</p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-brand-green-dark">
                    Learn more <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <FinalCTA />
    </>
  );
}
