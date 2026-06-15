"use client";

import { useEffect, useRef, useState } from "react";
import { site } from "@/lib/site";

/**
 * GoHighLevel inline form embed (exact embed supplied by the agency).
 * Loaded as a client component so the form_embed.js script initialises it.
 * The wrapper guards against horizontal overflow on mobile.
 *
 * Meta Pixel "Lead":
 * The GHL form lives in a CROSS-ORIGIN iframe, so we can't read its submit
 * event directly. GHL/LeadConnector communicates with the parent via
 * window.postMessage (used for iframe resizing and, on submit, the redirect).
 * We listen for that message, verify the origin, and fire fbq('track','Lead')
 * exactly once — synchronously, so it runs before the WhatsApp redirect.
 *
 * Tip: append ?ghl_debug=1 to the URL (or set localStorage.ghl_debug="1") to
 * console-log every message coming from the GHL iframe — use this to confirm
 * the exact submit payload, then the match below can be tightened.
 */
export function ContactForm() {
  const [loaded, setLoaded] = useState(false);
  const leadFired = useRef(false);

  useEffect(() => {
    const SRC = site.embeds.contactFormScript;
    if (!document.querySelector(`script[src="${SRC}"]`)) {
      const s = document.createElement("script");
      s.src = SRC;
      s.async = true;
      document.body.appendChild(s);
    }
    const t = setTimeout(() => setLoaded(true), 600);

    // --- Meta Pixel "Lead" on successful GHL form submission ----------------
    const formOrigin = (() => {
      try {
        return new URL(site.embeds.contactFormSrc).origin;
      } catch {
        return "";
      }
    })();

    const isTrustedOrigin = (o: string) =>
      o === formOrigin ||
      o.endsWith(".leadconnectorhq.com") ||
      o.endsWith(".msgsndr.com") ||
      o.endsWith(".gohighlevel.com");

    const debug =
      new URLSearchParams(window.location.search).has("ghl_debug") ||
      window.localStorage?.getItem("ghl_debug") === "1";

    const onMessage = (e: MessageEvent) => {
      if (!isTrustedOrigin(e.origin)) return;

      const data = e.data;
      let text = "";
      if (typeof data === "string") text = data;
      else {
        try {
          text = JSON.stringify(data);
        } catch {
          text = "";
        }
      }

      if (debug) console.log("[GHL message]", e.origin, data);

      // A successful submission is signalled either by an explicit
      // "...submitted" payload, or by the redirect message that carries the
      // WhatsApp URL (this form redirects to WhatsApp on submit).
      const submitted = /form-?submitted|formSubmitted|"submitted"/i.test(text);
      const whatsappRedirect = /wa\.me|api\.whatsapp\.com|whatsapp/i.test(text);

      if ((submitted || whatsappRedirect) && !leadFired.current) {
        leadFired.current = true;
        window.fbq?.("track", "Lead");
        if (debug) console.log("[GHL] fbq('track','Lead') fired");
      }
    };

    window.addEventListener("message", onMessage);
    return () => {
      clearTimeout(t);
      window.removeEventListener("message", onMessage);
    };
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
