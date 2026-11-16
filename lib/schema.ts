/**
 * Bbettr Website OS — JSON-LD structured data generators.
 * Implements LocalBusiness/Dentist, Breadcrumb and FAQ schema.
 */
import { site } from "./site";
import type { FAQItem } from "./services";

const fullUrl = (path = "") => `${site.url}${path}`;

/** LocalBusiness + Dentist schema for the practice. */
export function dentistSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Dentist",
    "@id": `${site.url}/#dentist`,
    name: site.name,
    description: site.positioning,
    slogan: site.tagline,
    url: site.url,
    logo: fullUrl(site.logo),
    image: [
      fullUrl(site.ogImage),
      fullUrl("/images/hero/smile-connection-dental-team-newlands-pretoria.jpg"),
      fullUrl("/images/clinic/smile-connection-reception-area-newlands-pretoria.jpg"),
      fullUrl("/images/team/dr-eugene-kleynhans-dentist-newlands-pretoria.jpg"),
    ],
    telephone: site.contact.phoneTel,
    email: site.contact.email,
    foundingDate: site.founded,
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.street,
      addressLocality: `${site.address.suburb}, ${site.address.city}`,
      addressRegion: site.address.province,
      postalCode: site.address.postalCode,
      addressCountry: site.address.countryCode,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: site.address.geo.lat,
      longitude: site.address.geo.lng,
    },
    hasMap: site.address.mapsLink,
    areaServed: [
      { "@type": "City", name: "Pretoria" },
      { "@type": "Place", name: "Newlands, Pretoria" },
      { "@type": "Place", name: "Pretoria East" },
      { "@type": "Place", name: "Lynnwood, Pretoria" },
      { "@type": "Place", name: "Lynnwood Ridge, Pretoria" },
      { "@type": "Place", name: "Faerie Glen, Pretoria" },
      { "@type": "Place", name: "Garsfontein, Pretoria" },
      { "@type": "Place", name: "Moreleta Park, Pretoria" },
      { "@type": "Place", name: "Menlo Park, Pretoria" },
      { "@type": "Place", name: "Constantia Park, Pretoria" },
      { "@type": "Place", name: "Waterkloof, Pretoria" },
    ],
    openingHoursSpecification: site.openingHoursSchema.map((o) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: o.days,
      opens: o.opens,
      closes: o.closes,
    })),
    sameAs: [site.social.facebook, site.social.instagram].filter(Boolean),
    medicalSpecialty: "Dentistry",
  };
}

/** Breadcrumb schema from an ordered list of {name, path}. */
export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: fullUrl(item.path),
    })),
  };
}

/** FAQ schema from FAQ items. */
export function faqSchema(faqs: FAQItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

/** Service schema for an individual treatment page. */
export function serviceSchema(opts: {
  name: string;
  description: string;
  path: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "MedicalProcedure",
    name: opts.name,
    description: opts.description,
    url: fullUrl(opts.path),
    provider: { "@id": `${site.url}/#dentist` },
  };
}

/** Helper component-friendly serialiser. */
export function jsonLd(data: unknown): string {
  return JSON.stringify(data);
}
