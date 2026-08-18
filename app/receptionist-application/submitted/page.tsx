import type { Metadata } from "next";
import { Logo } from "@/components/ui/Logo";
import { CheckIcon } from "@/components/ui/Icons";
import { site } from "@/lib/site";
import { SubmittedTracker } from "./SubmittedTracker";

/**
 * Recruitment application success page — GHL redirects here after a genuine
 * successful submission. Its sole tracking job is to fire the Meta custom event
 * once on load (see SubmittedTracker). Lives OUTSIDE the app/(site) route group
 * so it has no site chrome. Hidden from search: noindex/nofollow, not in
 * lib/routes.ts (so excluded from nav, footer and the sitemap), unlinked.
 */
export const metadata: Metadata = {
  title: "Application Submitted",
  description: "Your Dental Receptionist application has been received by Smile Connection Dental Studio.",
  robots: {
    index: false,
    follow: false,
    googleBot: { index: false, follow: false },
  },
};

export default function ApplicationSubmittedPage() {
  const year = new Date().getFullYear();
  return (
    <div className="flex min-h-dvh flex-col bg-soft-blue">
      {/* Fires ReceptionistApplication once on load (genuine successful submission) */}
      <SubmittedTracker />

      {/* Minimal header — logo only, no navigation */}
      <header className="border-b border-navy-50 bg-white/90 backdrop-blur">
        <div className="container-px flex h-[68px] items-center">
          <Logo />
        </div>
      </header>

      <main className="flex flex-1 items-center">
        <div className="container-px w-full py-12 sm:py-16">
          <div className="mx-auto max-w-xl rounded-3xl border border-navy-50 bg-white p-8 text-center shadow-card sm:p-10">
            <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-green-light text-brand-green-dark">
              <CheckIcon className="h-8 w-8" />
            </span>
            <h1 className="mt-6 text-2xl font-bold text-navy-900 sm:text-3xl">Application Submitted</h1>
            <p className="mx-auto mt-3 max-w-md text-base leading-relaxed text-slate-600">
              Thank you for applying to join Smile Connection. Your application and CV have been
              received. If your application is shortlisted, the team will contact you regarding the
              next step.
            </p>
          </div>
        </div>
      </main>

      {/* Minimal footer — no navigation */}
      <footer className="border-t border-navy-50 bg-white">
        <div className="container-px py-6 text-center text-xs text-slate-500">
          © {year} {site.name}. Newlands, Pretoria.
        </div>
      </footer>
    </div>
  );
}
