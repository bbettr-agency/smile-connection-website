import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Breadcrumbs } from "@/components/sections/Breadcrumbs";
import { JsonLd } from "@/components/ui/JsonLd";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbSchema } from "@/lib/schema";
import { routes } from "@/lib/routes";
import { site } from "@/lib/site";

/**
 * POPIA privacy notice. Describes ONLY the data flows that actually exist on
 * this website (contact form, WhatsApp enquiry modal, analytics/ad pixels,
 * reviews widget). Client should have it reviewed before relying on it legally.
 */
export const metadata: Metadata = buildMetadata({
  path: routes.privacy.path,
  title: "Privacy Policy | Smile Connection Dental Studio, Pretoria",
  description:
    "How Smile Connection Dental Studio in Newlands, Pretoria collects, uses and protects personal information submitted through this website, in line with POPIA.",
});

const updated = new Date(site.contentUpdated).toLocaleDateString("en-ZA", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

const sections: { title: string; body: ReactNode }[] = [
  {
    title: "Who we are",
    body: (
      <p>
        {site.name} (&ldquo;we&rdquo;, &ldquo;us&rdquo;) is a dental practice at {site.address.full}. We are the
        responsible party for personal information collected through this website, as defined in the
        Protection of Personal Information Act 4 of 2013 (POPIA). You can contact us at{" "}
        <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a> or {site.contact.phoneDisplay}.
      </p>
    ),
  },
  {
    title: "What we collect and why",
    body: (
      <ul>
        <li>
          <strong>Appointment / contact form</strong> — the details you enter (such as your name, phone
          number, email address and message) so that we can respond to your enquiry and arrange an
          appointment.
        </li>
        <li>
          <strong>WhatsApp enquiries</strong> — before opening WhatsApp, we ask for your name, email and
          phone number, together with the page you were on and any campaign information in the link
          (e.g. UTM tags). We use this to follow up on your enquiry. Your WhatsApp conversation itself
          is handled by WhatsApp (Meta) under its own privacy terms.
        </li>
        <li>
          <strong>Website usage information</strong> — pages visited, device and browser information and
          approximate location, collected through cookies and similar technologies (see below), to
          understand how the website is used and to measure our advertising.
        </li>
      </ul>
    ),
  },
  {
    title: "Health information",
    body: (
      <p>
        Please don&apos;t include detailed medical information in website forms or messages. Information about
        your health is special personal information under POPIA and is collected and kept confidential at
        the practice as part of your clinical care, not through this website.
      </p>
    ),
  },
  {
    title: "Cookies, analytics and advertising",
    body: (
      <>
        <p>This website uses the following third-party services, which may set cookies or collect usage data:</p>
        <ul>
          <li>Google Tag Manager and Google advertising/analytics tags (Google LLC)</li>
          <li>Meta Pixel (Meta Platforms, Inc.) — to measure visits and enquiries from our Facebook and Instagram adverts</li>
          <li>Vercel Web Analytics (Vercel Inc.) — privacy-friendly page-view statistics</li>
          <li>A Google Reviews display widget (SociableKit) and an embedded Google Map</li>
        </ul>
        <p>
          You can block or delete cookies in your browser settings, and manage ad preferences in your
          Google and Meta account settings. The website will still work without them.
        </p>
      </>
    ),
  },
  {
    title: "Who we share it with",
    body: (
      <p>
        We do not sell your personal information. Enquiry details are stored in our customer-relationship
        system, operated for us by our website and marketing service providers, who may only use it to
        provide services to us. Some of these providers store data outside South Africa; where this
        happens we rely on providers bound by data-protection obligations comparable to POPIA. We may
        also disclose information where required by law.
      </p>
    ),
  },
  {
    title: "How long we keep it",
    body: (
      <p>
        We keep enquiry information only for as long as needed to respond to you and manage our
        relationship with you, or as required by law. Clinical records are kept as required by the
        Health Professions Council of South Africa and applicable legislation.
      </p>
    ),
  },
  {
    title: "Your rights",
    body: (
      <p>
        You may ask us what personal information we hold about you, ask us to correct or delete it, object
        to its use for direct marketing, or withdraw your consent at any time by contacting{" "}
        <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a>. If you are unhappy with how we
        handle your information, you may lodge a complaint with the{" "}
        <a href="https://inforegulator.org.za/" target="_blank" rel="noopener noreferrer">
          Information Regulator (South Africa)
        </a>
        .
      </p>
    ),
  },
  {
    title: "Security",
    body: (
      <p>
        This website is served over an encrypted (HTTPS) connection, and we take reasonable technical and
        organisational measures to protect your information against loss, misuse and unauthorised access.
      </p>
    ),
  },
  {
    title: "Changes to this policy",
    body: <p>We may update this policy from time to time. The latest version will always be published on this page.</p>,
  },
];

export default function PrivacyPolicyPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: routes.home.path },
          { name: "Privacy Policy", path: routes.privacy.path },
        ])}
      />
      <Breadcrumbs items={[{ name: "Privacy Policy", path: routes.privacy.path }]} />
      <section className="bg-white">
        <div className="container-px py-12 sm:py-16">
          <div className="mx-auto max-w-3xl">
            <span className="eyebrow">Legal</span>
            <h1 className="mt-4 text-3xl leading-tight text-navy-800 sm:text-4xl">Privacy Policy</h1>
            <p className="mt-3 text-sm text-slate-500">
              Last updated: <time dateTime={site.contentUpdated}>{updated}</time>
            </p>
            <div className="mt-10 flex flex-col gap-10 text-base leading-relaxed text-slate-600 [&_a]:font-medium [&_a]:text-navy-800 [&_a]:underline [&_a]:underline-offset-2 [&_li]:mt-2 [&_ul]:list-disc [&_ul]:pl-5">
              {sections.map((s) => (
                <div key={s.title} className="flex flex-col gap-3">
                  <h2 className="text-xl font-bold text-navy-800">{s.title}</h2>
                  {s.body}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
