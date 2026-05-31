import { site } from "@/lib/site";
import { routes } from "@/lib/routes";
import { PhoneIcon, WhatsAppIcon, CalendarIcon } from "@/components/ui/Icons";

/**
 * Sticky bottom action bar on mobile only — keeps Call, WhatsApp and Book
 * always one tap away for conversions. Hidden on large screens.
 */
export function MobileCTABar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-navy-50 bg-white/95 backdrop-blur lg:hidden">
      <div className="grid grid-cols-3 gap-1 px-2 py-2 pb-[max(0.5rem,env(safe-area-inset-bottom))]">
        <a
          href={`tel:${site.contact.phoneTel}`}
          className="flex flex-col items-center justify-center gap-0.5 rounded-xl py-1.5 text-[11px] font-semibold text-navy-700"
          aria-label="Call Smile Connection"
        >
          <PhoneIcon className="h-5 w-5 text-navy-800" />
          Call
        </a>
        <a
          href={site.contact.whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center gap-0.5 rounded-xl py-1.5 text-[11px] font-semibold text-brand-green-dark"
          aria-label="WhatsApp Smile Connection"
        >
          <WhatsAppIcon className="h-5 w-5 text-brand-green" />
          WhatsApp
        </a>
        <a
          href={routes.contact.path}
          className="flex flex-col items-center justify-center gap-0.5 rounded-xl bg-brand-green py-1.5 text-[11px] font-bold text-white shadow-cta"
          aria-label="Book an appointment"
        >
          <CalendarIcon className="h-5 w-5" />
          Book
        </a>
      </div>
    </div>
  );
}
