import type { Metadata } from "next";
import { CheckIcon } from "@/components/ui/Icons";
import { site } from "@/lib/site";
import { ThankYouActions } from "./ThankYouActions";

/**
 * Post-submission bridge page for the GoHighLevel form.
 * GHL redirects here after a successful submission, passing a completed
 * WhatsApp URL in the `wa` query param (e.g. /thank-you?wa=<encoded-url>).
 *
 * Hidden from search: noindex/nofollow, excluded from sitemap (it's not in the
 * route registry), and not linked from navigation.
 */
export const metadata: Metadata = {
  title: "Thank You",
  description: "Thank you for your appointment request at Smile Connection Dental Studio.",
  robots: {
    index: false,
    follow: false,
    googleBot: { index: false, follow: false },
  },
};

/**
 * Safely resolve the `wa` param to a real WhatsApp URL.
 * Decodes if still percent-encoded, then validates it points to WhatsApp —
 * anything else (missing, malformed, or an off-domain URL) falls back to the
 * practice's default WhatsApp number, which also prevents open-redirect abuse.
 */
function resolveWhatsAppUrl(raw?: string | string[]): string {
  const fallback = site.contact.whatsappLink; // https://wa.me/27794716319
  const value = Array.isArray(raw) ? raw[0] : raw;
  if (!value) return fallback;

  let candidate = value;
  // Next.js already decodes the query string once, so GHL's (double-encoded)
  // WhatsApp link arrives here as a ready-to-use
  // "https://wa.me/...?text=...%0A..." URL. We must NOT decode it again — that
  // would turn %0A into real newlines, which the URL parser then strips,
  // destroying the message line breaks. Only decode when the value isn't yet
  // an absolute URL (defensive, e.g. if it ever arrives still-encoded).
  if (!/^https?:\/\//i.test(candidate)) {
    try {
      candidate = decodeURIComponent(candidate);
    } catch {
      /* malformed encoding — keep the raw value and let URL parsing decide */
    }
  }

  try {
    const url = new URL(candidate);
    const host = url.hostname.toLowerCase();
    const isWhatsApp =
      host === "wa.me" ||
      host === "whatsapp.com" ||
      host === "api.whatsapp.com" ||
      host.endsWith(".whatsapp.com");
    // Return the validated original string (not url.toString(), which would
    // re-encode/strip characters and break the message's encoded newlines).
    if (url.protocol === "https:" && isWhatsApp) return candidate;
  } catch {
    /* not a valid absolute URL */
  }
  return fallback;
}

export default function ThankYouPage({
  searchParams,
}: {
  searchParams: { wa?: string | string[] };
}) {
  const waUrl = resolveWhatsAppUrl(searchParams?.wa);

  return (
    <section className="relative overflow-hidden bg-soft-blue">
      <div className="absolute inset-0 bg-hero-glow" aria-hidden="true" />
      <div className="container-px relative flex min-h-[80vh] items-center justify-center pt-[68px]">
        <div className="w-full max-w-xl rounded-3xl border border-navy-50 bg-white p-8 text-center shadow-card sm:p-12">
          <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-green-light text-brand-green-dark">
            <CheckIcon className="h-8 w-8" />
          </span>

          <h1 className="mt-6 text-3xl font-bold leading-tight text-navy-900 sm:text-4xl">
            Thank you — we&apos;ve received your appointment request.
          </h1>

          <p className="mt-4 text-base leading-relaxed text-slate-600 sm:text-lg">
            To help us assist you faster, please continue to WhatsApp with your
            appointment details already prepared.
          </p>

          <ThankYouActions waUrl={waUrl} />
        </div>
      </div>
    </section>
  );
}
