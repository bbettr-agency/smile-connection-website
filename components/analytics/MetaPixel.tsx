"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

/** Meta Pixel ID — single source of truth for the whole site. */
export const META_PIXEL_ID = "1727615574819876";

declare global {
  interface Window {
    // Injected by the Meta Pixel base code in the root layout.
    fbq?: (...args: unknown[]) => void;
  }
}

/**
 * Fires a Meta Pixel `PageView` on App Router client-side navigations.
 *
 * The *initial* PageView is already fired by the base pixel snippet in the
 * root layout, so we skip the first render here to avoid double-counting.
 * This makes PageView fire automatically on every page, including SPA route
 * changes (which don't trigger a full document reload).
 */
export function MetaPixelView() {
  const pathname = usePathname();
  const isFirstLoad = useRef(true);

  useEffect(() => {
    if (isFirstLoad.current) {
      isFirstLoad.current = false;
      return;
    }
    window.fbq?.("track", "PageView");
  }, [pathname]);

  return null;
}

/**
 * Helper for FUTURE standard-event tracking. NOT used yet — wired up so events
 * can be added later without touching the base install. Example future calls:
 *
 *   trackMetaPixel("Lead");                       // consultation form submission
 *   trackMetaPixel("Contact");                    // WhatsApp / phone clicks
 *   trackMetaPixel("ViewContent", {               // service pages
 *     content_name: "Smile Makeover",
 *   });
 *   trackMetaPixel("Schedule");                    // appointment requests
 */
export function trackMetaPixel(event: string, params?: Record<string, unknown>) {
  if (typeof window === "undefined" || typeof window.fbq !== "function") return;
  window.fbq("track", event, params);
}
