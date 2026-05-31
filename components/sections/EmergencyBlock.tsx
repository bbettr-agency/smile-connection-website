import { site } from "@/lib/site";
import { PhoneIcon, AlertIcon } from "@/components/ui/Icons";

/**
 * Standalone emergency call band. Reusable across pages.
 */
export function EmergencyBlock() {
  return (
    <section aria-label="Dental emergency" className="bg-navy-gradient">
      <div className="container-px py-7 sm:py-8">
        <div className="flex flex-col items-center gap-4 text-center sm:flex-row sm:justify-between sm:text-left">
          <div className="flex items-center gap-4">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-brand-green text-white">
              <AlertIcon className="h-6 w-6" />
            </span>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-brand-green">Dental Emergency?</p>
              <p className="text-base font-semibold text-white sm:text-lg">
                {site.emergency.text}
              </p>
            </div>
          </div>
          <a
            href={`tel:${site.emergency.phoneTel}`}
            className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand-green px-7 py-3.5 text-base font-bold text-white shadow-cta transition-all hover:-translate-y-0.5 hover:bg-brand-green-dark sm:w-auto"
            aria-label="Phone the dental emergency line now"
          >
            <PhoneIcon className="h-5 w-5" /> Phone {site.emergency.phoneDisplay}
          </a>
        </div>
      </div>
    </section>
  );
}
