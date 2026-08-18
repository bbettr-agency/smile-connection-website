"use client";

import { useEffect, useRef } from "react";

/**
 * Fires the Meta Pixel custom event `ReceptionistApplication` exactly once when
 * this success page loads — reusing the existing GLOBAL pixel (no second pixel,
 * no base-code duplication). This page is only reached after a genuine
 * successful GHL application submission (GHL redirects here on success), so the
 * event represents a real completed application.
 *
 * The base pixel loads `afterInteractive` and can initialise after this effect
 * runs, so we poll briefly until `window.fbq` exists, then fire once and lock
 * the guard — preventing duplicate fires within the page lifecycle.
 */
export function SubmittedTracker() {
  const fired = useRef(false);

  useEffect(() => {
    if (fired.current) return;

    const RETRY_MS = 250;
    const MAX_ATTEMPTS = 40; // ~10s ceiling
    let attempts = 0;
    let timer: ReturnType<typeof setInterval> | undefined;

    const fire = () => {
      if (fired.current) {
        if (timer) clearInterval(timer);
        return;
      }
      if (typeof window.fbq === "function") {
        window.fbq("trackCustom", "ReceptionistApplication");
        fired.current = true; // lock only after it actually fires
        if (timer) clearInterval(timer);
        return;
      }
      attempts += 1;
      if (attempts >= MAX_ATTEMPTS && timer) clearInterval(timer);
    };

    fire(); // fbq may already be ready
    if (!fired.current) timer = setInterval(fire, RETRY_MS);

    return () => {
      if (timer) clearInterval(timer);
    };
  }, []);

  return null;
}
