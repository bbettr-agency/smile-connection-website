"use client";

import { useEffect, useState } from "react";

/**
 * GoHighLevel inline form embed for the Dental Receptionist application.
 * GHL hosts the fields, CV upload, submission storage, email/CRM processing and
 * notifications. Loaded as a client component so form_embed.js initialises the
 * iframe (it also handles dynamic height resizing).
 */
const FORM_ID = "dRjYbbbdYgShy9DW7lkf";
const FORM_SRC = `https://link.bbettragency.com/widget/form/${FORM_ID}`;
const SCRIPT_SRC = "https://link.bbettragency.com/js/form_embed.js";

export function ApplicationEmbed() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!document.querySelector(`script[src="${SCRIPT_SRC}"]`)) {
      const s = document.createElement("script");
      s.src = SCRIPT_SRC;
      s.async = true;
      document.body.appendChild(s);
    }
    const t = setTimeout(() => setLoaded(true), 600);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="embed-safe relative w-full overflow-hidden rounded-2xl border border-navy-50 bg-white shadow-card">
      {!loaded && (
        <div className="absolute inset-0 z-10 flex items-center justify-center gap-3 bg-white">
          <div className="h-8 w-8 animate-spin rounded-full border-[3px] border-navy-100 border-t-brand-green" />
          <span className="text-sm font-medium text-navy-500">Loading application form…</span>
        </div>
      )}
      <iframe
        src={FORM_SRC}
        id={`inline-${FORM_ID}`}
        title="Dental Receptionist Application Form"
        style={{ width: "100%", minHeight: "720px", border: "none", borderRadius: "8px" }}
        data-layout="{'id':'INLINE'}"
        data-trigger-type="alwaysShow"
        data-trigger-value=""
        data-activation-type="alwaysActivated"
        data-activation-value=""
        data-deactivation-type="neverDeactivate"
        data-deactivation-value=""
        data-form-name="Dental Receptionist Application"
        data-height="undefined"
        data-layout-iframe-id={`inline-${FORM_ID}`}
        data-form-id={FORM_ID}
        className="w-full"
      />
    </div>
  );
}
