"use client";

import { useWhatsAppLead } from "./WhatsAppLeadProvider";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

/**
 * A WhatsApp CTA that opens the lead-capture modal on click. It renders as a
 * real anchor to the pre-filled wa.me link, so if JS fails the click still
 * opens WhatsApp directly (progressive enhancement — WhatsApp is never blocked).
 * Visual styling comes entirely from `className`, so it adapts to every CTA
 * context (button pill, footer link, mobile bar cell, …).
 */
export function WhatsAppLink({
  className = "",
  ariaLabel,
  children,
}: {
  className?: string;
  ariaLabel?: string;
  children: React.ReactNode;
}) {
  const { open } = useWhatsAppLead();
  return (
    <a
      href={buildWhatsAppUrl()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={ariaLabel}
      className={className}
      onClick={(e) => {
        e.preventDefault();
        open();
      }}
    >
      {children}
    </a>
  );
}
