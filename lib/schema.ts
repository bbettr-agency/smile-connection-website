/**
 * Bbettr Website OS — JSON-LD structured data generators.
 * Implements LocalBusiness/Dentist, Breadcrumb and FAQ schema.
 */
import { site } from "./site";
import type { FAQItem } from "./services";

const fullUrl = (path = "") => `${site.url}${path}`;
const DENTIST_PERSON_ID = `${site.url}/#dr-eugene-kleynhans`;

/** LocalBusiness + Dentist schema for the practice. */
export function dentistSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Dentist",
    "@id": `${site.url}/#dentist`,
    name: site.name,
    description: site.positioning,
    slogan: site.tagline,
    legalName: site.legalName,
    alternateName: site.shortName,
    url: `${site.url}/`,
    logo: {
      "@type": "ImageObject",
      url: fullUrl(site.logo),
      width: 562,
      height: 248,
    },
    image: [
      fullUrl(site.ogImage),
      fullUrl("/images/hero/smile-connection-dental-team-newlands-pretoria.jpg"),
      fullUrl("/images/clinic/smile-connection-reception-area-newlands-pretoria.jpg"),
      fullUrl("/images/team/dr-eugene-kleynhans-dentist-newlands-pretoria.jpg"),
    ],
    telephone: site.contact.phoneTel,
    email: site.contact.email,
    foundingDate: site.founded,
    address: {
      "@type": "PostalAddress",
      streetAddress: `${site.address.street}, ${site.address.suburb}`,
      addressLocality: site.address.city,
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
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "appointments",
      telephone: site.contact.phoneTel,
      email: site.contact.email,
      areaServed: "ZA",
      availableLanguage: "en",
    },
    employee: [{ "@id": DENTIST_PERSON_ID }],
    sameAs: [site.social.facebook, site.social.instagram].filter(Boolean),
    medicalSpecialty: "https://schema.org/Dentistry",
  };
}

/** Person schema for the practice dentist (verified credentials only). */
export function dentistPersonSchema() {
  const dr = site.team[0];
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": DENTIST_PERSON_ID,
    name: dr.name,
    honorificPrefix: "Dr",
    jobTitle: dr.role,
    description: dr.bio,
    image: fullUrl(dr.image),
    url: `${site.url}/about-us`,
    worksFor: { "@id": `${site.url}/#dentist` },
    alumniOf: { "@type": "CollegeOrUniversity", name: "University of Pretoria" },
    knowsAbout: ["General dentistry", "Cosmetic dentistry", "Restorative dentistry"],
    hasCredential: [
      {
        "@type": "EducationalOccupationalCredential",
        name: "Bachelor of Dental Surgery (BChD)",
        credentialCategory: "degree",
        dateCreated: "1995",
        recognizedBy: { "@type": "CollegeOrUniversity", name: "University of Pretoria" },
      },
      {
        "@type": "EducationalOccupationalCredential",
        name: "HPCSA registration",
        credentialCategory: "license",
        recognizedBy: {
          "@type": "Organization",
          name: "Health Professions Council of South Africa",
          url: "https://www.hpcsa.co.za/",
        },
      },
    ],
  };
}

/** WebSite schema, published by the practice. */
export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${site.url}/#website`,
    url: `${site.url}/`,
    name: site.name,
    alternateName: site.shortName,
    inLanguage: "en-ZA",
    publisher: { "@id": `${site.url}/#dentist` },
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

/** MedicalWebPage schema for a treatment page (adds freshness + entity links). */
export function medicalWebPageSchema(opts: {
  name: string;
  description: string;
  path: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    "@id": `${fullUrl(opts.path)}#webpage`,
    url: fullUrl(opts.path),
    name: opts.name,
    description: opts.description,
    inLanguage: "en-ZA",
    isPartOf: { "@id": `${site.url}/#website` },
    publisher: { "@id": `${site.url}/#dentist` },
    about: { "@type": "MedicalProcedure", name: opts.name },
    audience: { "@type": "PeopleAudience", name: "Patients" },
    dateModified: site.contentUpdated,
  };
}

/** Helper component-friendly serialiser. */
export function jsonLd(data: unknown): string {
  return JSON.stringify(data);
}
