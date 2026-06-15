"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { WhatsAppIcon } from "@/components/ui/Icons";
import { routes } from "@/lib/routes";

/**
 * Client-side actions for the /thank-you bridge page.
 *  - Fires Meta Pixel `Lead` exactly once on load (uses the existing pixel —
 *    no new pixel is installed).
 *  - On "Continue to WhatsApp": fires `Contact`, waits briefly so the beacon
 *    dispatches, then navigates to the (already-validated) WhatsApp URL.
 */
export function ThankYouActions({ waUrl }: { waUrl: string }) {
  const leadFired = useRef(false);

  useEffect(() => {
    if (leadFired.current) return; // once per page load
    leadFired.current = true;
    window.fbq?.("track", "Lead");
  }, []);

  const handleContinue = () => {
    window.fbq?.("track", "Contact");
    // Give the pixel a moment to send before leaving the page.
    window.setTimeout(() => {
      window.location.href = waUrl;
    }, 250);
  };

  return (
    <>
      <div className="mt-8">
        <button
          type="button"
          onClick={handleContinue}
          className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand-green px-7 py-3.5 text-base font-semibold text-white shadow-cta transition-all duration-200 hover:-translate-y-0.5 hover:bg-brand-green-dark focus:outline-none focus-visible:ring-4 focus-visible:ring-brand-green/40 active:translate-y-0 sm:w-auto"
        >
          <WhatsAppIcon className="h-5 w-5" /> Continue to WhatsApp
        </button>
      </div>

      <p className="mt-4 text-xs leading-relaxed text-slate-500">
        Please press send once WhatsApp opens so our team can assist you quickly.
      </p>

      <div className="mt-8 border-t border-navy-50 pt-6">
        <Link
          href={routes.home.path}
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-navy-700 transition-colors hover:text-brand-green-dark"
        >
          <span aria-hidden="true">←</span> Back to Homepage
        </Link>
      </div>
    </>
  );
}
