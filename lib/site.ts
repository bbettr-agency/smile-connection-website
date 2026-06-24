/**
 * Bbettr Website OS — Central Business Configuration
 * ---------------------------------------------------
 * This is the SINGLE SOURCE OF TRUTH for the whole website.
 * To re-skin this premium dental template for a future client,
 * edit this file (and lib/services.ts + tailwind.config.ts) only.
 *
 * Current client: Smile Connection Dental Studio
 * All details below are REAL and verified. Do not invent data.
 */

export const site = {
  name: "Smile Connection Dental Studio",
  shortName: "Smile Connection",
  legalName: "Smile Connection Dental Studio",
  tagline: "Look Better. Feel Better. Smile Brighter.",
  // Verified positioning from the existing website.
  positioning:
    "A premium dental studio in Newlands, Pretoria — offering the full spectrum of care from routine check-ups to advanced cosmetic smile makeovers.",
  founded: "2009",
  url: "https://smileconnection.co.za",
  // Logo lives in /public. This is the official Smile Connection artwork.
  logo: "/logo.png",
  ogImage: "/og-image.png", // Branded share image (1200x630) generated from the official logo.

  contact: {
    phoneDisplay: "079 471 6319",
    phoneTel: "+27794716319",
    whatsapp: "27794716319", // wa.me number (no +)
    whatsappLink: "https://wa.me/27794716319",
    email: "mydentist@smileconnection.co.za",
  },

  // Emergency line as supplied by the client for severe pain / trauma.
  emergency: {
    text: "In case of severe pain or trauma, please PHONE 079 471 6319",
    phoneDisplay: "079 471 6319",
    phoneTel: "+27794716319",
  },

  address: {
    street: "197 Lois Ave",
    suburb: "Newlands",
    city: "Pretoria",
    province: "Gauteng",
    postalCode: "0081",
    country: "South Africa",
    countryCode: "ZA",
    full: "197 Lois Ave, Newlands, Pretoria, 0081",
    // Approximate coordinates for Newlands, Pretoria. Confirm exact pin if needed.
    geo: { lat: -25.7806, lng: 28.2825 },
    // PLACEHOLDER: replace with the practice's exact Google Maps embed/share URL.
    mapsLink:
      "https://www.google.com/maps/search/?api=1&query=Smile+Connection+Dental+Studio+197+Lois+Ave+Newlands+Pretoria",
  },

  hours: [
    { day: "Sunday", open: null, close: null, label: "Closed" },
    { day: "Monday", open: "08:00", close: "17:00", label: "08:00 – 17:00" },
    { day: "Tuesday", open: "08:00", close: "17:00", label: "08:00 – 17:00" },
    { day: "Wednesday", open: "08:00", close: "17:00", label: "08:00 – 17:00" },
    { day: "Thursday", open: "08:00", close: "17:00", label: "08:00 – 17:00" },
    { day: "Friday", open: "08:00", close: "13:00", label: "08:00 – 13:00" },
    { day: "Saturday", open: null, close: null, label: "Closed" },
  ],

  // Schema.org opening hours specification (machine readable).
  openingHoursSchema: [
    { days: ["Monday", "Tuesday", "Wednesday", "Thursday"], opens: "08:00", closes: "17:00" },
    { days: ["Friday"], opens: "08:00", closes: "13:00" },
  ],

  // CORE team — shown on the homepage team section.
  // Only the dentist and the oral hygienist. No other dentists/practitioners.
  // Do not invent qualifications, awards, registrations or detailed bios.
  team: [
    {
      name: "Dr Eugene Kleynhans",
      role: "Dentist",
      // VERIFIED from research: BChD, University of Pretoria (1995), HPCSA registered.
      credentials: "BChD (University of Pretoria, 1995) · HPCSA registered",
      bio: "Dr Eugene Kleynhans qualified with a Bachelor of Dentistry from the University of Pretoria in 1995 and is registered with the Health Professions Council of South Africa (HPCSA).",
      image: "/images/team/dr-eugene-kleynhans-dentist-newlands-pretoria.jpg",
      imageAlt: "Dr Eugene Kleynhans, dentist at Smile Connection Dental Studio in Newlands, Pretoria",
    },
    {
      name: "Elmien",
      role: "Oral Hygienist",
      credentials: "",
      bio: "",
      image: "/images/team/smile-connection-oral-hygienist-newlands-pretoria.jpg",
      imageAlt: "Oral hygienist at Smile Connection Dental Studio in Newlands, Pretoria",
    },
  ],

  // Additional support team — shown only on the full About "Meet The Team".
  // Names/roles are PLACEHOLDERS for the client to confirm. Do not invent bios.
  supportTeam: [
    {
      name: "C. De Jager",
      role: "Receptionist",
      credentials: "",
      bio: "",
      image: "/images/team/smile-connection-receptionist-newlands-pretoria.jpg",
      imageAlt: "Receptionist at the Smile Connection Dental Studio reception desk in Newlands, Pretoria",
    },
    {
      name: "Violet",
      role: "Dental Assistant",
      credentials: "",
      bio: "",
      image: "/images/team/smile-connection-dental-assistant-newlands-pretoria.jpg",
      imageAlt: "Dental assistant at Smile Connection Dental Studio in Newlands, Pretoria",
    },
  ],

  // High-trust, verifiable signals only (no invented stats/awards).
  trustBadges: [
    { label: "Established 2009", sub: "Trusted Newlands dental studio" },
    { label: "HPCSA Registered", sub: "Qualified dental professionals" },
    { label: "Check-up to Cosmetic", sub: "Full-spectrum dental care" },
    { label: "Newlands, Pretoria", sub: "Convenient Pretoria-East location" },
  ],

  social: {
    // VERIFIED Facebook page for Dr Eugene Kleynhans @ Smile Connection.
    facebook: "https://www.facebook.com/drerkleynhans/",
    instagram: "", // PLACEHOLDER: add if available
  },

  // Agency embeds (supplied by client/agency).
  embeds: {
    contactFormId: "P2Y5WxKuwfIy22vRECc1",
    contactFormSrc: "https://link.bbettragency.com/widget/form/P2Y5WxKuwfIy22vRECc1",
    contactFormScript: "https://link.bbettragency.com/js/form_embed.js",
    googleReviewsEmbedId: "25685841",
    googleReviewsScript: "https://widgets.sociablekit.com/google-reviews/widget.js",
  },
} as const;

export type Site = typeof site;
