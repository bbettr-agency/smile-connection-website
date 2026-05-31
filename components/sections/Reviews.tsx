"use client";

import { useEffect, useRef, useState } from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { site } from "@/lib/site";

/**
 * Reusable Google Reviews section (SociableKit embed).
 * - Loads the widget script once.
 * - Premium framing that matches the site design.
 * - overflow-x hidden + max-width guards so it never breaks mobile layout.
 * - Smooth fade-in with a graceful loading state.
 */
export function Reviews({
  heading = true,
  className = "",
}: {
  heading?: boolean;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const SRC = site.embeds.googleReviewsScript;

    // Inject the SociableKit script only once across the whole app.
    if (!document.querySelector(`script[src="${SRC}"]`)) {
      const s = document.createElement("script");
      s.src = SRC;
      s.defer = true;
      document.body.appendChild(s);
    } else if (typeof (window as any).SociableKit_Init === "function") {
      // Re-initialise if the user navigates back to a page with the widget.
      try {
        (window as any).SociableKit_Init();
      } catch {
        /* no-op */
      }
    }

    // Reveal once the widget injects content (or after a short fallback).
    const el = ref.current;
    let done = false;
    const reveal = () => {
      if (done) return;
      done = true;
      setLoaded(true);
    };
    const observer = el
      ? new MutationObserver(() => {
          if (el.querySelector("iframe, .sk_reviews, [class*='sk-']")) reveal();
        })
      : null;
    if (el && observer) observer.observe(el, { childList: true, subtree: true });
    const fallback = setTimeout(reveal, 2500);

    return () => {
      observer?.disconnect();
      clearTimeout(fallback);
    };
  }, []);

  return (
    <section id="reviews" className={`bg-white ${className}`}>
      <div className="container-px py-16 sm:py-20">
        {heading && (
          <SectionHeading
            eyebrow="Patient Reviews"
            title="What our patients say"
            subtitle="Genuine Google reviews from the people who matter most — our patients in Pretoria."
          />
        )}

        <div className="mx-auto mt-10 max-w-5xl">
          <div className="embed-safe relative rounded-3xl border border-navy-50 bg-soft-blue p-3 shadow-card sm:p-5">
            {/* Loading shimmer */}
            {!loaded && (
              <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 rounded-3xl bg-soft-blue">
                <div className="h-9 w-9 animate-spin rounded-full border-[3px] border-navy-100 border-t-brand-green" />
                <p className="text-sm font-medium text-navy-500">Loading Google reviews…</p>
              </div>
            )}

            <div
              ref={ref}
              className={`embed-safe transition-opacity duration-700 ${loaded ? "opacity-100" : "opacity-0"}`}
            >
              {/* SociableKit Google Reviews widget */}
              <div
                className="sk-ww-google-reviews"
                data-embed-id={site.embeds.googleReviewsEmbedId}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
