"use client";

import { useEffect, useState } from "react";
import { site } from "@/lib/site";

/**
 * GoHighLevel inline form embed (exact embed supplied by the agency).
 * Loaded as a client component so the form_embed.js script initialises it.
 * The wrapper guards against horizontal overflow on mobile.
 */
export function ContactForm() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const SRC = site.embeds.contactFormScript;
    if (!document.querySelector(`script[src="${SRC}"]`)) {
      const s = document.createElement("script");
      s.src = SRC;
      s.async = true;
      document.body.appendChild(s);
    }
    const t = setTimeout(() => setLoaded(true), 600);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="embed-safe relative overflow-hidden rounded-3xl border border-navy-50 bg-white p-2 shadow-card sm:p-3">
      {!loaded && (
        <div className="absolute inset-0 z-10 flex items-center justify-center gap-3 bg-white">
          <div className="h-8 w-8 animate-spin rounded-full border-[3px] border-navy-100 border-t-brand-green" />
          <span className="text-sm font-medium text-navy-500">Loading booking form…</span>
        </div>
      )}
      <iframe
        src={site.embeds.contactFormSrc}
        id={`inline-${site.embeds.contactFormId}`}
        title="Dental Consultation Request"
        style={{ width: "100%", height: "951px", border: "none", borderRadius: "3px" }}
        data-layout="{'id':'INLINE'}"
        data-trigger-type="alwaysShow"
        data-trigger-value=""
        data-activation-type="alwaysActivated"
        data-activation-value=""
        data-deactivation-type="neverDeactivate"
        data-deactivation-value=""
        data-form-name="Dental Consultation Request"
        data-height="951"
        data-layout-iframe-id={`inline-${site.embeds.contactFormId}`}
        data-form-id={site.embeds.contactFormId}
        className="w-full"
      />
    </div>
  );
}
