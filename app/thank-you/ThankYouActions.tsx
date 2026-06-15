"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { WhatsAppIcon } from "@/components/ui/Icons";
import { routes } from "@/lib/routes";

/**
 * Client-side actions for the /thank-you bridge page.
 *  - Fires Meta Pixel `Lead` exactly once on load — but only once window.fbq
 *    is actually available. The Meta Pixel base code loads `afterInteractive`,
 *    so on this page it can initialise *after* this effect runs; we therefore
 *    poll briefly until `fbq` exists and only then fire (and lock the guard).
 *  - On "Continue to WhatsApp": fires `Contact`, waits briefly so the beacon
 *    dispatches, then navigates to the (already-validated) WhatsApp URL.
 *
 * Uses the existing global Meta Pixel — no new pixel is installed.
 */
export function ThankYouActions({ waUrl }: { waUrl: string }) {
  const leadFired = useRef(false);

  useEffect(() => {
    if (leadFired.current) return;

    const RETRY_MS = 250;
    const MAX_ATTEMPTS = 40; // ~10s ceiling, then give up
    let attempts = 0;
    let timer: ReturnType<typeof setInterval> | undefined;

    const fireLead = () => {
      if (leadFired.current) {
        if (timer) clearInterval(timer);
        return;
      }
      if (typeof window.fbq === "function") {
        window.fbq("track", "Lead");
        leadFired.current = true; // only lock the guard AFTER it actually fires
        if (timer) clearInterval(timer);
        return;
      }
      attempts += 1;
      if (attempts >= MAX_ATTEMPTS && timer) clearInterval(timer);
    };

    fireLead(); // try immediately (fbq may already be ready)
    if (!leadFired.current) timer = setInterval(fireLead, RETRY_MS);

    return () => {
      if (timer) clearInterval(timer);
    };
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
