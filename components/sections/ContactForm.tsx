"use client";

import { useEffect, useState } from "react";
import { site } from "@/lib/site";
import { getStoredUtmsQuery } from "@/lib/whatsapp";

/**
 * GoHighLevel inline form embed (exact embed supplied by the agency).
 * Loaded as a client component so the form_embed.js script initialises it.
 * The wrapper guards against horizontal overflow on mobile.
 *
 * Attribution: captured Meta/UTM params (from the landing page / session) are
 * appended to the iframe URL so the resulting GHL appointment lead retains
 * attribution — the safest supported passthrough (GHL reads them from the URL).
 *
 * Conversion tracking note:
 * Meta Pixel `LeadSubmitted(method:"appointment")` / `AppointmentRequest` /
 * `Contact` are fired on the /thank-you bridge page (where GHL redirects after a
 * successful submission), NOT here — keeping the embed clean and Lead counted
 * once per genuine submission.
 */
export function ContactForm() {
  const [loaded, setLoaded] = useState(false);
  const [formSrc, setFormSrc] = useState("");

  useEffect(() => {
    const SRC = site.embeds.contactFormScript;
    if (!document.querySelector(`script[src="${SRC}"]`)) {
      const s = document.createElement("script");
      s.src = SRC;
      s.async = true;
      document.body.appendChild(s);
    }
    // Append captured attribution to the GHL form URL (client-side only).
    setFormSrc(`${site.embeds.contactFormSrc}${getStoredUtmsQuery()}`);
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
      {formSrc && (
        <iframe
          src={formSrc}
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
      )}
    </div>
  );
}
