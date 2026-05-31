"use client";

import { useState } from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ChevronDownIcon } from "@/components/ui/Icons";
import type { FAQItem } from "@/lib/services";

/**
 * Accessible FAQ accordion. Reusable on the homepage and every service page.
 * FAQ schema is rendered separately via the page's JsonLd.
 */
export function FAQ({
  items,
  heading = true,
  title = "Frequently asked questions",
  subtitle = "Answers to the questions we hear most often. Still unsure? Get in touch with our friendly team.",
}: {
  items: FAQItem[];
  heading?: boolean;
  title?: string;
  subtitle?: string;
}) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="bg-soft-blue">
      <div className="container-px py-16 sm:py-20">
        {heading && <SectionHeading eyebrow="FAQs" title={title} subtitle={subtitle} />}

        <div className="mx-auto mt-10 flex max-w-3xl flex-col gap-3">
          {items.map((item, i) => {
            const isOpen = open === i;
            return (
              <div
                key={item.q}
                className="overflow-hidden rounded-2xl border border-navy-50 bg-white shadow-card"
              >
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left sm:px-6 sm:py-5"
                  aria-expanded={isOpen}
                >
                  <span className="text-base font-bold text-navy-800 sm:text-lg">{item.q}</span>
                  <ChevronDownIcon
                    className={`h-5 w-5 shrink-0 text-brand-green-dark transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <div
                  className={`grid transition-all duration-300 ${
                    isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="px-5 pb-5 text-sm leading-relaxed text-slate-600 sm:px-6 sm:text-base">
                      {item.a}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
