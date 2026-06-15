/**
 * Bbettr Website OS — Service catalogue.
 * Content is SEO-optimised and conversion-focused.
 * Only treatments VERIFIED from the existing Smile Connection website /
 * client information are described as offered. Anything uncertain is
 * clearly marked [PLACEHOLDER] for the client to confirm.
 */
import { routes } from "./routes";

export type FAQItem = { q: string; a: string };

export type Service = {
  slug: string;
  path: string;
  /** Short nav/card label */
  label: string;
  /** Card teaser */
  teaser: string;
  /** Emoji/icon token used by the simple inline icon set */
  icon: string;
  /** SEO */
  seoTitle: string;
  seoDescription: string;
  ogTitle: string;
  ogDescription: string;
  /** On-page */
  h1: string;
  heroSubtitle: string;
  heroImageAlt: string;
  /** Real hero image. Before/after composites live under /images/treatments/. */
  heroImage?: string;
  /** Real "who it's for" supporting image + its alt text. */
  whoForImage?: string;
  whoForImageAlt?: string;
  intro: string[];
  whoFor: { title: string; points: string[] };
  benefits: { title: string; text: string }[];
  process: { step: string; title: string; text: string }[];
  treatments?: string[];
  faqs: FAQItem[];
  /** Slugs of related services for internal linking */
  related: string[];
  /** Optional honesty note rendered subtly on the page */
  note?: string;
};

export const services: Service[] = [
  {
    slug: "tooth-replacement",
    path: routes.toothReplacement.path,
    label: "Tooth Replacement",
    teaser:
      "Restore missing teeth with dental implants, bridges and dentures that look, feel and function naturally.",
    icon: "implant",
    seoTitle: "Tooth Replacement Pretoria | Dental Implants, Bridges & Dentures | Smile Connection",
    seoDescription:
      "Replace missing teeth in Pretoria with dental implants, bridges and dentures at Smile Connection Dental Studio in Newlands. Natural-looking, long-lasting results. Book today.",
    ogTitle: "Tooth Replacement in Pretoria — Implants, Bridges & Dentures",
    ogDescription:
      "Missing teeth? Smile Connection Dental Studio in Newlands, Pretoria offers dental implants, bridges and dentures to restore your smile.",
    h1: "Tooth Replacement in Pretoria",
    heroSubtitle:
      "Missing one tooth or several? Our Newlands dental studio restores your bite and your confidence with dental implants, bridges and dentures designed to last.",
    heroImageAlt:
      "Before and after dental implant tooth replacement by Dr Eugene Kleynhans at Smile Connection Dental Studio, Pretoria",
    heroImage: "/images/treatments/dental-implants-before-after-smile-connection.jpg",
    whoForImage: "/images/clinic/dentist-treating-patient-smile-connection-pretoria.jpg",
    whoForImageAlt:
      "Dr Eugene Kleynhans and a dental assistant treating a patient at Smile Connection Dental Studio, Pretoria",
    intro: [
      "Losing a tooth affects far more than your smile. Gaps can change the way you chew and speak, place extra strain on neighbouring teeth, and over time lead to bone loss in the jaw. At Smile Connection Dental Studio in Newlands, Pretoria, we replace missing teeth with solutions that look and feel completely natural.",
      "Whether you need a single tooth replaced or a full-arch solution, we take the time to assess your oral health and recommend the option that best suits your needs, budget and long-term wellbeing.",
    ],
    whoFor: {
      title: "Who is tooth replacement for?",
      points: [
        "You have one or more missing teeth and want a permanent, natural-looking solution",
        "You are tired of an uncomfortable or loose-fitting denture",
        "A missing tooth is affecting how you chew, speak or smile",
        "You want to prevent the bone loss and tooth shifting that follows tooth loss",
      ],
    },
    benefits: [
      { title: "Natural look & feel", text: "Replacements are colour-matched and shaped to blend seamlessly with your natural teeth." },
      { title: "Protect your jaw", text: "Dental implants help preserve the jawbone and keep surrounding teeth stable." },
      { title: "Eat & speak with confidence", text: "Restore full chewing function and clear speech without worrying about slipping." },
      { title: "Long-lasting results", text: "With good care, modern tooth-replacement solutions are built to last for years." },
    ],
    process: [
      { step: "01", title: "Consultation & assessment", text: "We examine your mouth, discuss your goals and recommend the best replacement option for you." },
      { step: "02", title: "Tailored treatment plan", text: "You receive a clear plan and quote — whether that's an implant, bridge or denture." },
      { step: "03", title: "Precision treatment", text: "Using modern materials and technology, we fit your replacement with care and accuracy." },
      { step: "04", title: "Aftercare & review", text: "We guide you through caring for your new teeth and review your results to ensure a perfect fit." },
    ],
    treatments: [
      "Dental implants — surgically placed to replace individual missing teeth",
      "Dental bridges — fixed replacements anchored to neighbouring teeth",
      "Dentures — removable full or partial replacements for missing teeth",
    ],
    faqs: [
      { q: "What are my options for replacing a missing tooth?", a: "The three most common options are dental implants, bridges and dentures. The right choice depends on how many teeth are missing, the health of your gums and jawbone, and your budget. We'll talk you through each option at your consultation." },
      { q: "Are dental implants painful?", a: "Implant placement is carried out under local anaesthetic, so you should be comfortable throughout. Most patients are surprised by how manageable recovery is, and any tenderness afterwards is usually well controlled with simple pain relief." },
      { q: "How long does tooth replacement take?", a: "It depends on the treatment. A denture or bridge can often be completed in a few visits, while dental implants involve a healing period to allow the implant to integrate with the bone. We'll give you a clear timeline at your consultation." },
      { q: "Will my replacement tooth look natural?", a: "Yes. We colour-match and shape your replacement so it blends in with your surrounding teeth for a natural, confident smile." },
    ],
    related: ["restorative-treatments", "smile-makeover", "preventive-dentistry"],
  },

  {
    slug: "restorative-treatments",
    path: routes.restorative.path,
    label: "Restorative Treatments",
    teaser:
      "Repair damaged or decayed teeth with tooth-coloured fillings, crowns and restorative dentistry that brings back strength and comfort.",
    icon: "crown",
    seoTitle: "Restorative Dentistry Pretoria | Fillings, Crowns & Repairs | Smile Connection",
    seoDescription:
      "Restorative dentistry in Pretoria — tooth-coloured fillings, porcelain crowns and repairs at Smile Connection Dental Studio, Newlands. Restore damaged teeth. Book today.",
    ogTitle: "Restorative Dentistry in Pretoria — Fillings & Crowns",
    ogDescription:
      "Repair damaged or decayed teeth at Smile Connection Dental Studio in Newlands, Pretoria with fillings, crowns and restorative care.",
    h1: "Restorative Dentistry in Pretoria",
    heroSubtitle:
      "From a small cavity to a badly damaged tooth, our Newlands studio rebuilds your teeth with durable, natural-looking fillings and crowns.",
    heroImageAlt:
      "Before and after dental crowns by Dr Eugene Kleynhans at Smile Connection Dental Studio, Pretoria",
    heroImage: "/images/treatments/dental-crowns-before-after-smile-connection.jpg",
    whoForImage: "/images/clinic/smile-connection-dental-treatment-room-pretoria.jpg",
    whoForImageAlt:
      "A modern dental treatment room at Smile Connection Dental Studio in Newlands, Pretoria",
    intro: [
      "Damaged, decayed or worn teeth don't just affect how your smile looks — they can cause pain, sensitivity and bigger problems if left untreated. Restorative dentistry repairs your teeth, relieves discomfort and restores full function.",
      "At Smile Connection Dental Studio in Newlands, Pretoria, we use modern materials and technology to repair teeth so they look natural and feel comfortable, helping you eat, speak and smile with ease.",
    ],
    whoFor: {
      title: "Who is restorative dentistry for?",
      points: [
        "You have a cavity, chipped or cracked tooth that needs repair",
        "An old filling has worn down, discoloured or broken",
        "A tooth is badly damaged and needs the strength of a crown",
        "You're experiencing pain or sensitivity when eating or drinking",
      ],
    },
    benefits: [
      { title: "Tooth-coloured & discreet", text: "Modern fillings and porcelain crowns blend with your natural teeth — no dark metal." },
      { title: "Restore strength", text: "Crowns rebuild and protect badly damaged teeth so you can chew with confidence." },
      { title: "Relieve discomfort", text: "Treating decay and damage early stops pain and prevents bigger problems later." },
      { title: "Protect your smile", text: "Timely repairs help you keep your natural teeth for as long as possible." },
    ],
    process: [
      { step: "01", title: "Examination", text: "We assess the affected tooth, often with X-rays, to understand the extent of the damage." },
      { step: "02", title: "Gentle preparation", text: "Under local anaesthetic, we remove decay or damage and prepare the tooth comfortably." },
      { step: "03", title: "Restore the tooth", text: "We place a tooth-coloured filling or fit a custom porcelain crown to rebuild the tooth." },
      { step: "04", title: "Polish & review", text: "We refine your bite, polish the restoration and check everything feels natural." },
    ],
    treatments: [
      "Tooth-coloured (composite) fillings",
      "Porcelain dental crowns for damaged teeth",
      "Repair of chipped, cracked and worn teeth",
    ],
    faqs: [
      { q: "What's the difference between a filling and a crown?", a: "A filling repairs a smaller area of decay or damage, while a crown is a tooth-shaped cover that fits over a badly damaged tooth to restore its strength and appearance. We'll recommend the right option after examining your tooth." },
      { q: "Are your fillings tooth-coloured?", a: "Yes — we use tooth-coloured composite fillings that blend in with your natural teeth for a discreet, natural result." },
      { q: "What is a dental crown made of?", a: "Crowns can be made from porcelain to restore strength and aesthetics while looking like a natural tooth. We'll discuss the best material for your tooth at your visit." },
      { q: "Will the treatment hurt?", a: "Restorative treatments are carried out under local anaesthetic so you stay comfortable. Most patients feel relief once a painful or sensitive tooth has been treated." },
    ],
    related: ["root-canal-treatment", "tooth-replacement", "smile-makeover"],
  },

  {
    slug: "smile-makeover",
    path: routes.smileMakeover.path,
    label: "Smile Makeover",
    teaser:
      "Transform your smile with cosmetic dentistry — veneers, teeth whitening and crowns combined into a tailored makeover.",
    icon: "sparkle",
    seoTitle: "Smile Makeover Pretoria | Veneers, Whitening & Cosmetic Dentistry | Smile Connection",
    seoDescription:
      "Smile makeovers in Pretoria — porcelain veneers, professional teeth whitening and cosmetic dentistry at Smile Connection Dental Studio, Newlands. Book your consultation.",
    ogTitle: "Smile Makeover in Pretoria — Veneers & Whitening",
    ogDescription:
      "Transform your smile with cosmetic dentistry at Smile Connection Dental Studio in Newlands, Pretoria — veneers, whitening and more.",
    h1: "Smile Makeover in Pretoria",
    heroSubtitle:
      "Cosmetic dentistry tailored to you. Our Newlands studio combines veneers, whitening and more to design a brighter, more confident smile.",
    heroImageAlt:
      "Before and after porcelain veneers smile makeover by Dr Eugene Kleynhans at Smile Connection Dental Studio, Pretoria",
    heroImage: "/images/treatments/porcelain-veneers-before-after-smile-connection.jpg",
    whoForImage: "/images/gallery/happy-patient-smile-smile-connection-pretoria.jpg",
    whoForImageAlt:
      "A smiling patient with a bright, healthy smile at Smile Connection Dental Studio, Pretoria",
    intro: [
      "A smile makeover is a personalised combination of cosmetic treatments designed to improve the appearance of your smile. Whether you're bothered by staining, chips, gaps or worn teeth, we create a plan that delivers a natural, balanced result that suits your face and personality.",
      "Smile Connection Dental Studio was founded with a focus on aesthetic dentistry, and our team in Newlands, Pretoria uses modern materials and techniques to help you look better, feel better and smile brighter.",
    ],
    whoFor: {
      title: "Who is a smile makeover for?",
      points: [
        "You feel self-conscious about stained, chipped or uneven teeth",
        "You'd like to close gaps or improve the shape of your teeth",
        "You want whiter, brighter teeth for a special occasion or a fresh start",
        "You're ready to invest in a smile you feel proud to show off",
      ],
    },
    benefits: [
      { title: "Tailored to you", text: "Every makeover is custom-designed around your goals, features and budget." },
      { title: "Natural-looking results", text: "We craft veneers and restorations that look like beautiful, healthy natural teeth." },
      { title: "Boost your confidence", text: "A smile you love can transform how you feel in photos, at work and in social settings." },
      { title: "Combined treatments", text: "We blend whitening, veneers and crowns for a cohesive, lasting transformation." },
    ],
    process: [
      { step: "01", title: "Smile consultation", text: "We listen to what you'd like to change and assess your teeth, gums and bite." },
      { step: "02", title: "Custom smile design", text: "We design a personalised treatment plan combining the right cosmetic options for you." },
      { step: "03", title: "Your transformation", text: "We carry out your treatments — such as whitening, veneers or crowns — with precision and care." },
      { step: "04", title: "Reveal & maintain", text: "You reveal your new smile, and we share tips to keep it looking its best." },
    ],
    treatments: [
      "Porcelain, ceramic & composite veneers",
      "Professional teeth whitening",
      "Cosmetic crowns and tooth reshaping",
      "Combination smile makeovers",
    ],
    faqs: [
      { q: "What is a smile makeover?", a: "A smile makeover is a personalised combination of cosmetic dental treatments — such as veneers, whitening and crowns — designed to improve the overall look of your smile. We tailor the plan to your goals and features." },
      { q: "What are veneers?", a: "Veneers are thin, tooth-coloured shells made from porcelain, ceramic or composite material that are bonded to the front of your teeth. They can improve the look of stained, chipped, crooked or gapped teeth." },
      { q: "How white will my teeth be after whitening?", a: "Professional teeth whitening removes stains and lifts the shade of your natural teeth for a brighter smile. Results vary from person to person, and we'll set realistic expectations at your consultation." },
      { q: "Will my new smile look natural?", a: "Absolutely. Our goal is a result that looks like beautiful, healthy natural teeth — balanced to suit your face — never artificial." },
    ],
    related: ["restorative-treatments", "facial-aesthetics", "tooth-replacement"],
  },

  {
    slug: "root-canal-treatment",
    path: routes.rootCanal.path,
    label: "Root Canal Treatment",
    teaser:
      "Save an infected or painful tooth and find relief with gentle, modern root canal therapy.",
    icon: "tooth",
    seoTitle: "Root Canal Treatment Pretoria | Gentle Root Canal Therapy | Smile Connection",
    seoDescription:
      "Root canal treatment in Pretoria at Smile Connection Dental Studio, Newlands. Relieve tooth pain and save your natural tooth with gentle, modern root canal therapy. Book today.",
    ogTitle: "Root Canal Treatment in Pretoria — Save Your Tooth",
    ogDescription:
      "In pain? Root canal therapy at Smile Connection Dental Studio in Newlands, Pretoria relieves pain and saves your natural tooth.",
    h1: "Root Canal Treatment in Pretoria",
    heroSubtitle:
      "A toothache doesn't have to mean losing the tooth. Our Newlands studio uses gentle, modern root canal therapy to relieve pain and save your natural tooth.",
    heroImageAlt:
      "A calm, modern treatment room at Smile Connection Dental Studio in Newlands, Pretoria",
    heroImage: "/images/clinic/smile-connection-dental-surgery-room-pretoria.jpg",
    whoForImage: "/images/clinic/dr-eugene-kleynhans-surgery-newlands-pretoria.jpg",
    whoForImageAlt:
      "Dr Eugene Kleynhans working in a treatment room at Smile Connection Dental Studio, Pretoria",
    intro: [
      "When the soft tissue (the pulp) inside a tooth becomes infected or inflamed, it can cause severe pain and, if left untreated, lead to losing the tooth. Root canal treatment removes the infection, relieves the pain and saves your natural tooth.",
      "Modern root canal therapy at Smile Connection Dental Studio in Newlands, Pretoria is far more comfortable than its reputation suggests. Carried out under local anaesthetic, the goal is simple: get you out of pain and keep your tooth.",
    ],
    whoFor: {
      title: "Do you need a root canal?",
      points: [
        "You have severe or lingering toothache, especially when biting or chewing",
        "You feel prolonged sensitivity to hot or cold that doesn't settle",
        "There's swelling or tenderness in the gum near a painful tooth",
        "A tooth has darkened or you've been told the nerve is infected",
      ],
    },
    benefits: [
      { title: "Relieves the pain", text: "Removing the infected pulp brings fast relief from a painful, throbbing tooth." },
      { title: "Saves your natural tooth", text: "Root canal therapy lets you keep your own tooth rather than extracting it." },
      { title: "Stops infection spreading", text: "Treating the infection protects your surrounding teeth, gum and bone." },
      { title: "Comfortable & modern", text: "Carried out under local anaesthetic for a calm, comfortable experience." },
    ],
    process: [
      { step: "01", title: "Diagnosis", text: "We examine the tooth, often with X-rays, to confirm the infection and plan treatment." },
      { step: "02", title: "Comfortable numbing", text: "We fully numb the area with local anaesthetic so you stay comfortable throughout." },
      { step: "03", title: "Clean & seal", text: "We carefully remove the infected pulp, clean the canals and seal the tooth." },
      { step: "04", title: "Protect the tooth", text: "We often recommend a crown afterwards to protect and strengthen the treated tooth." },
    ],
    faqs: [
      { q: "Is a root canal painful?", a: "Modern root canal treatment is carried out under local anaesthetic, so you should be comfortable during the procedure. For most patients, the treatment actually relieves the pain they arrived with." },
      { q: "Why not just remove the tooth?", a: "Saving your natural tooth is almost always the best option — it preserves your bite, keeps neighbouring teeth stable and avoids the need to replace the tooth later. Root canal therapy lets you keep your own tooth." },
      { q: "How many appointments will I need?", a: "Root canal treatment can often be completed in one or two visits depending on the tooth and the infection. We'll give you a clear plan after examining your tooth." },
      { q: "What happens after a root canal?", a: "Once the tooth has been treated and sealed, we often recommend a crown to protect and strengthen it. We'll explain the best way to care for your tooth long-term." },
    ],
    related: ["restorative-treatments", "preventive-dentistry", "tooth-replacement"],
    note:
      "Experiencing severe tooth pain right now? Please phone us on 079 471 6319 so we can help you as soon as possible.",
  },

  {
    slug: "preventive-dentistry",
    path: routes.preventive.path,
    label: "Preventive Dentistry",
    teaser:
      "Keep your smile healthy for life with regular check-ups, professional cleanings and early prevention.",
    icon: "shield",
    seoTitle: "Preventive Dentistry Pretoria | Check-ups & Cleanings | Smile Connection",
    seoDescription:
      "Preventive dentistry in Pretoria — dental check-ups, professional cleanings, fissure sealing and fluoride at Smile Connection Dental Studio, Newlands. Book today.",
    ogTitle: "Preventive Dentistry in Pretoria — Check-ups & Cleanings",
    ogDescription:
      "Keep your smile healthy with check-ups and cleanings at Smile Connection Dental Studio in Newlands, Pretoria.",
    h1: "Preventive Dentistry in Pretoria",
    heroSubtitle:
      "Prevention is the foundation of a healthy smile. Our Newlands studio offers check-ups, professional cleanings and preventive care to keep problems away.",
    heroImageAlt:
      "A dental check-up in a modern treatment room at Smile Connection Dental Studio, Newlands, Pretoria",
    heroImage: "/images/clinic/smile-connection-dental-treatment-room-pretoria.jpg",
    whoForImage: "/images/clinic/dental-instruments-smile-connection-pretoria.jpg",
    whoForImageAlt:
      "Modern dental equipment used for check-ups and cleanings at Smile Connection Dental Studio, Pretoria",
    intro: [
      "The healthiest, most affordable dentistry is the kind that stops problems before they start. Preventive dentistry focuses on keeping your teeth and gums healthy through regular check-ups, professional cleanings and early detection of any issues.",
      "At Smile Connection Dental Studio in Newlands, Pretoria, we focus on keeping your teeth and gums healthy for the long term. We generally recommend a dental check-up and cleaning every six months to catch any issues early.",
    ],
    whoFor: {
      title: "Who is preventive dentistry for?",
      points: [
        "Everyone benefits from regular dental care",
        "Anyone looking for a long-term dental home in Pretoria East",
        "Anyone who hasn't had a check-up and clean in the last six months",
        "Patients who want to catch small problems before they become big ones",
      ],
    },
    benefits: [
      { title: "Catch problems early", text: "Regular check-ups detect decay and gum issues while they're still small and simple to treat." },
      { title: "Healthier gums", text: "Professional cleanings remove plaque and tartar that brushing alone can't reach." },
      { title: "Save time & money", text: "Prevention helps you avoid more involved and costly treatment down the line." },
      { title: "Friendly, gentle care", text: "We provide relaxed, modern preventive care in a calm and welcoming environment." },
    ],
    process: [
      { step: "01", title: "Comprehensive check-up", text: "We examine your teeth, gums and mouth to spot any early signs of problems." },
      { step: "02", title: "Professional cleaning", text: "We remove plaque and tartar build-up and polish your teeth for a fresh, healthy feel." },
      { step: "03", title: "Prevention", text: "Where helpful, we apply fissure sealants or fluoride to protect against decay." },
      { step: "04", title: "Personalised advice", text: "We share tailored oral-hygiene tips and schedule your next six-month visit." },
    ],
    treatments: [
      "Dental check-ups and examinations",
      "Professional teeth cleaning (scale & polish)",
      "Fissure sealing to protect against decay",
      "Fluoride treatments",
      "Personalised oral-hygiene advice",
    ],
    faqs: [
      { q: "How often should I visit the dentist?", a: "For most people we recommend a check-up and professional cleaning every six months. This allows us to catch any problems early and keep your teeth and gums healthy." },
      { q: "What is fissure sealing?", a: "Fissure sealants are protective coatings applied to the grooves of back teeth to help prevent decay. They're a simple, effective way to protect teeth from cavities over time." },
      { q: "Why are professional cleanings important?", a: "Even with great brushing at home, plaque can harden into tartar that only a professional clean can remove. Regular cleanings keep your gums healthy and your smile fresh." },
    ],
    related: ["restorative-treatments", "smile-makeover", "root-canal-treatment"],
  },

  {
    slug: "facial-aesthetics",
    path: routes.facialAesthetics.path,
    label: "Facial Aesthetics",
    teaser:
      "Aesthetic care that complements your smile. Speak to our team about facial aesthetic options to enhance your natural look.",
    icon: "face",
    seoTitle: "Facial Aesthetics Pretoria | Aesthetic Treatments | Smile Connection Dental Studio",
    seoDescription:
      "Facial aesthetics in Pretoria at Smile Connection Dental Studio, Newlands — aesthetic care that complements your smile. Enquire about facial aesthetic options today.",
    ogTitle: "Facial Aesthetics in Pretoria — Smile Connection Dental Studio",
    ogDescription:
      "Aesthetic care to complement your smile at Smile Connection Dental Studio in Newlands, Pretoria. Enquire today.",
    h1: "Facial Aesthetics in Pretoria",
    heroSubtitle:
      "A beautiful smile is part of a balanced, confident look. Speak to our Newlands team about facial aesthetic options to complement your smile.",
    heroImageAlt:
      "Before and after laser gum pigmentation removal by Dr Eugene Kleynhans at Smile Connection Dental Studio, Pretoria",
    heroImage: "/images/treatments/laser-gum-pigmentation-removal-smile-connection.jpg",
    whoForImage: "/images/clinic/dr-eugene-kleynhans-surgery-newlands-pretoria.jpg",
    whoForImageAlt:
      "Dr Eugene Kleynhans in a treatment room at Smile Connection Dental Studio, Newlands, Pretoria",
    intro: [
      "Smile Connection Dental Studio was founded with a strong focus on aesthetics — helping patients look better and feel more confident. Facial aesthetics extends that philosophy beyond the teeth to support a naturally balanced, refreshed appearance that frames your smile.",
      "Because facial aesthetic treatments vary from practice to practice, we'd love to discuss exactly what's right for you in person. Contact our Newlands team to find out which facial aesthetic options are available and suitable for your goals.",
    ],
    whoFor: {
      title: "Who is facial aesthetics for?",
      points: [
        "You're investing in your smile and want a balanced, refreshed overall look",
        "You'd like to discuss aesthetic options with a qualified dental professional",
        "You prefer natural-looking, conservative enhancements",
        "You want a trusted, registered practice for your aesthetic care",
      ],
    },
    benefits: [
      { title: "Complements your smile", text: "Facial aesthetics works alongside cosmetic dentistry for a balanced, harmonious result." },
      { title: "Qualified, registered care", text: "Treatment with HPCSA-registered dental professionals you can trust." },
      { title: "Natural-looking approach", text: "Our focus is always on subtle, natural enhancement — never overdone." },
      { title: "Personalised consultation", text: "We discuss your goals and recommend only what's right for you." },
    ],
    process: [
      { step: "01", title: "Enquire", text: "Get in touch with our Newlands team to ask about available facial aesthetic options." },
      { step: "02", title: "Consultation", text: "We discuss your goals and assess whether a treatment is suitable for you." },
      { step: "03", title: "Personalised plan", text: "If appropriate, we put together a tailored plan with clear information and pricing." },
      { step: "04", title: "Treatment & review", text: "We carry out your chosen treatment with care and review your results together." },
    ],
    faqs: [
      { q: "What facial aesthetic treatments do you offer?", a: "Smile Connection was founded with a focus on aesthetics. The specific facial aesthetic treatments available are best confirmed directly with our team — please contact us and we'll be glad to talk you through your options." },
      { q: "How is facial aesthetics related to dentistry?", a: "Dentists have detailed knowledge of facial anatomy, which makes facial aesthetics a natural complement to cosmetic dentistry. Together, they help create a balanced, confident overall appearance." },
      { q: "Will results look natural?", a: "Our philosophy is subtle, natural enhancement. We aim for results that refresh your appearance without looking obvious or overdone." },
      { q: "How do I find out more?", a: "The easiest way is to contact our Newlands practice on 079 471 6319 or via our contact form. We'll happily explain which options are available and suitable for you." },
    ],
    related: ["smile-makeover", "restorative-treatments", "preventive-dentistry"],
  },
];

export function getService(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}
