"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { WhatsAppIcon } from "@/components/ui/Icons";
import { buttonClasses } from "@/components/ui/Button";
import { buildWhatsAppUrl, captureUtms, getStoredUtms } from "@/lib/whatsapp";

type Ctx = { open: () => void };
const WhatsAppLeadContext = createContext<Ctx | null>(null);

export function useWhatsAppLead(): Ctx {
  const ctx = useContext(WhatsAppLeadContext);
  // No-op fallback so a CTA never throws if used outside the provider.
  return ctx ?? { open: () => {} };
}

const inputCls =
  "w-full rounded-xl border border-navy-100 bg-white px-4 py-3 text-base text-navy-900 outline-none transition placeholder:text-slate-400 focus:border-brand-green focus:ring-4 focus:ring-brand-green/20";

/**
 * Best-effort lead capture that NEVER blocks the WhatsApp hand-off.
 * Sends via sendBeacon (fallback: fetch keepalive) so the request survives the
 * page navigating to WhatsApp, then returns immediately — nothing is awaited.
 */
function sendLead(name: string, email: string, phone: string) {
  if (!name && !email && !phone) return; // nothing worth sending
  try {
    const [first, ...rest] = name.trim().split(/\s+/).filter(Boolean);
    const payload = {
      first_name: first ?? "",
      last_name: rest.join(" "),
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
      source: "Meta Ads / Website",
      tag: "Meta Ads - WhatsApp Lead",
      page: window.location.href,
      ...getStoredUtms(),
    };
    const json = JSON.stringify(payload);
    const url = "/api/whatsapp-lead";
    const beacon =
      typeof navigator !== "undefined" && typeof navigator.sendBeacon === "function"
        ? navigator.sendBeacon(url, new Blob([json], { type: "application/json" }))
        : false;
    if (!beacon) {
      // Fire-and-forget fallback; keepalive lets it outlive the navigation.
      fetch(url, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: json,
        keepalive: true,
      }).catch(() => {});
    }
  } catch {
    /* best-effort only — never block WhatsApp */
  }
}

export function WhatsAppLeadProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const firstFieldRef = useRef<HTMLInputElement>(null);

  useEffect(() => captureUtms(), []);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  // Focus first field + lock scroll + Escape to close while open.
  useEffect(() => {
    if (!isOpen) return;
    const t = setTimeout(() => firstFieldRef.current?.focus(), 50);
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      clearTimeout(t);
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [isOpen, close]);

  const handleContinue = (e: React.FormEvent) => {
    e.preventDefault();
    // 1) Best-effort capture (does not block).
    sendLead(name, email, phone);
    // 2) Meta: WhatsAppClick (custom) — user chose the WhatsApp path.
    if (typeof window !== "undefined" && typeof window.fbq === "function") {
      window.fbq("trackCustom", "WhatsAppClick");
    }
    // 3) Open WhatsApp immediately (same tab — most reliable in in-app browsers).
    setIsOpen(false);
    window.location.href = buildWhatsAppUrl();
  };

  return (
    <WhatsAppLeadContext.Provider value={{ open }}>
      {children}

      {isOpen && (
        <div
          className="fixed inset-0 z-[70] flex items-end justify-center bg-navy-900/50 p-0 sm:items-center sm:p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="wa-lead-title"
          onClick={close}
        >
          <div
            className="w-full max-w-md rounded-t-3xl bg-white p-6 shadow-soft sm:rounded-3xl sm:p-7"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-2.5">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-green-light text-brand-green-dark">
                  <WhatsAppIcon className="h-5 w-5" />
                </span>
                <h2 id="wa-lead-title" className="text-lg font-bold text-navy-900">
                  Chat on WhatsApp
                </h2>
              </div>
              <button
                type="button"
                onClick={close}
                aria-label="Close"
                className="-mr-1 -mt-1 flex h-9 w-9 items-center justify-center rounded-full text-navy-500 hover:bg-navy-50"
              >
                ✕
              </button>
            </div>

            <p className="mt-2 text-sm leading-relaxed text-slate-600">
              Leave your details so our team can assist you faster, then continue to WhatsApp.
            </p>

            <form onSubmit={handleContinue} className="mt-5 flex flex-col gap-3">
              <div>
                <label htmlFor="wa-name" className="sr-only">
                  Name
                </label>
                <input
                  ref={firstFieldRef}
                  id="wa-name"
                  type="text"
                  autoComplete="name"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={inputCls}
                />
              </div>
              <div>
                <label htmlFor="wa-email" className="sr-only">
                  Email
                </label>
                <input
                  id="wa-email"
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={inputCls}
                />
              </div>
              <div>
                <label htmlFor="wa-phone" className="sr-only">
                  Phone number
                </label>
                <input
                  id="wa-phone"
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  placeholder="Phone number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className={inputCls}
                />
              </div>

              <button type="submit" className={buttonClasses("primary", "lg", "mt-1 w-full")}>
                <WhatsAppIcon className="h-5 w-5" /> Continue to WhatsApp
              </button>
            </form>
          </div>
        </div>
      )}
    </WhatsAppLeadContext.Provider>
  );
}
