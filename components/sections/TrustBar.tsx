import { site } from "@/lib/site";

/**
 * Trust bar — verifiable signals only (no invented stats or awards).
 */
export function TrustBar() {
  return (
    <section aria-label="Why patients trust us" className="border-y border-navy-50 bg-white">
      <div className="container-px py-8 sm:py-10">
        <div className="grid grid-cols-2 gap-x-6 gap-y-7 sm:gap-8 lg:grid-cols-4">
          {site.trustBadges.map((b) => (
            <div key={b.label} className="flex flex-col items-center text-center">
              <p className="text-lg font-bold text-navy-800 sm:text-xl">{b.label}</p>
              <p className="mt-1 text-xs leading-snug text-slate-500 sm:text-sm">{b.sub}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
