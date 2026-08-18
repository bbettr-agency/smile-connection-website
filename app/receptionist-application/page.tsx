import type { Metadata } from "next";
import { Logo } from "@/components/ui/Logo";
import { site } from "@/lib/site";
import { ApplicationEmbed } from "./ApplicationEmbed";

/**
 * Private recruitment landing page (destination for a Meta Ads campaign).
 * Lives OUTSIDE the app/(site) route group, so it renders WITHOUT the normal
 * site navbar/footer/mobile CTA — just a minimal, focused application flow.
 * The application form itself is a hosted GoHighLevel embed (fields, CV upload,
 * submission storage and email/CRM handling all live in GHL).
 * Hidden from search: noindex/nofollow, not in lib/routes.ts (so excluded from
 * nav, footer and the sitemap), and not linked from any public page.
 */
export const metadata: Metadata = {
  title: "Dental Receptionist Application",
  description: "Apply for the Dental Receptionist position at Smile Connection Dental Studio.",
  robots: {
    index: false,
    follow: false,
    googleBot: { index: false, follow: false },
  },
};

export default function ReceptionistApplicationPage() {
  const year = new Date().getFullYear();
  return (
    <div className="flex min-h-dvh flex-col bg-soft-blue">
      {/* Minimal header — logo only, no navigation */}
      <header className="border-b border-navy-50 bg-white/90 backdrop-blur">
        <div className="container-px flex h-[68px] items-center">
          <Logo />
        </div>
      </header>

      {/* Focused application flow */}
      <main className="flex-1">
        <div className="container-px py-10 sm:py-14">
          <div className="mx-auto max-w-2xl">
            <div className="text-center">
              <span className="eyebrow w-fit">Careers · Newlands, Pretoria</span>
              <h1 className="mt-4 text-3xl font-bold leading-tight text-navy-900 sm:text-4xl">
                Dental Receptionist Application
              </h1>
              <p className="mx-auto mt-3 max-w-xl text-base leading-relaxed text-slate-600">
                Interested in joining the Smile Connection team? Complete the short application below
                and upload your CV.
              </p>
            </div>

            <div className="mt-8">
              <ApplicationEmbed />
            </div>
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
