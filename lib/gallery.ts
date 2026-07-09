/**
 * Gallery items — real Smile Connection Dental Studio photography.
 * Images live in /public/images/** and are served responsively via next/image.
 */
export type GalleryCategory =
  | "Before & After"
  | "Smile Transformations"
  | "Practice Photos"
  | "Team Photos"
  | "Office Photos";

export type GalleryItem = {
  id: string;
  category: GalleryCategory;
  label: string;
  alt: string;
  src: string;
  /** Masonry sizing hint */
  size?: "tall" | "wide" | "square";
  /** How the image fits its box. Use "contain" for before/after composites so
   *  the full transformation stays visible (never cropped). Defaults to cover. */
  fit?: "cover" | "contain";
};

export const galleryCategories: GalleryCategory[] = [
  "Before & After",
  "Smile Transformations",
  "Practice Photos",
  "Team Photos",
  "Office Photos",
];

export const galleryItems: GalleryItem[] = [
  // Before & After — real treatment results. Config-driven: drop a new
  // before/after composite in /public/images/treatments and add an entry here;
  // it appears on the homepage showcase AND the gallery "Before & After" filter.
  { id: "ba-dental-crowns", category: "Before & After", size: "tall", fit: "contain", label: "Dental Crowns", alt: "Before and after dental crowns by Dr Eugene Kleynhans at Smile Connection Dental Studio, Newlands, Pretoria", src: "/images/treatments/dental-crowns-before-after-smile-connection.jpg" },
  { id: "ba-dental-implants", category: "Before & After", size: "tall", fit: "contain", label: "Dental Implants", alt: "Before and after dental implants tooth replacement at Smile Connection Dental Studio, Newlands, Pretoria", src: "/images/treatments/dental-implants-before-after-smile-connection.jpg" },
  { id: "ba-gum-pigmentation", category: "Before & After", size: "tall", fit: "contain", label: "Gum Pigmentation Removal", alt: "Before and after laser gum pigmentation removal at Smile Connection Dental Studio, Newlands, Pretoria", src: "/images/treatments/laser-gum-pigmentation-removal-smile-connection.jpg" },
  { id: "ba-porcelain-veneers", category: "Before & After", size: "tall", fit: "contain", label: "Porcelain Veneers", alt: "Before and after porcelain veneers smile makeover at Smile Connection Dental Studio, Newlands, Pretoria", src: "/images/treatments/porcelain-veneers-before-after-smile-connection.jpg" },
  { id: "ba-teeth-whitening", category: "Before & After", size: "tall", fit: "contain", label: "Teeth Whitening", alt: "Before and after teeth whitening result at Smile Connection Dental Studio, Newlands, Pretoria", src: "/images/treatments/teeth-whitening-before-after-smile-connection.jpg" },

  // Smile Transformations
  { id: "smile-happy", category: "Smile Transformations", size: "tall", label: "A happy, healthy smile", alt: "A smiling patient with a bright, healthy smile at Smile Connection Dental Studio in Newlands, Pretoria", src: "/images/gallery/happy-patient-smile-smile-connection-pretoria.jpg" },

  // Practice Photos
  { id: "practice-room", category: "Practice Photos", size: "wide", label: "Treatment room", alt: "A modern dental treatment room at Smile Connection Dental Studio, Newlands, Pretoria", src: "/images/clinic/smile-connection-dental-treatment-room-pretoria.jpg" },
  { id: "practice-care", category: "Practice Photos", size: "tall", label: "Patient care in progress", alt: "Dr Eugene Kleynhans and a dental assistant treating a patient at Smile Connection Dental Studio", src: "/images/clinic/dentist-treating-patient-smile-connection-pretoria.jpg" },
  { id: "practice-model", category: "Practice Photos", size: "wide", label: "Precision dental work", alt: "A Smile Connection dentist holding a dental study model at the practice in Newlands, Pretoria", src: "/images/gallery/smile-connection-dental-study-model-newlands-pretoria.jpg" },
  { id: "practice-instruments", category: "Practice Photos", size: "wide", label: "Modern dental equipment", alt: "Modern dental handpieces and equipment at Smile Connection Dental Studio in Newlands, Pretoria", src: "/images/clinic/dental-instruments-smile-connection-pretoria.jpg" },
  { id: "practice-surgery", category: "Practice Photos", size: "wide", label: "In the surgery", alt: "Dr Eugene Kleynhans working in a treatment room at Smile Connection Dental Studio, Pretoria", src: "/images/clinic/dr-eugene-kleynhans-surgery-newlands-pretoria.jpg" },
  { id: "practice-prep", category: "Practice Photos", size: "wide", label: "Preparing for a patient", alt: "A Smile Connection dental professional preparing in a treatment room in Newlands, Pretoria", src: "/images/gallery/smile-connection-dental-professional-treatment-room-pretoria.jpg" },
  { id: "practice-surgery-wide", category: "Practice Photos", size: "wide", label: "Treatment in progress", alt: "Dr Eugene Kleynhans and a dental assistant treating a patient in the surgery at Smile Connection Dental Studio, Pretoria", src: "/images/gallery/dentist-treating-patient-surgery-smile-connection-pretoria.jpg" },
  { id: "practice-treatment", category: "Practice Photos", size: "tall", label: "Gentle, focused care", alt: "A patient receiving dental treatment at Smile Connection Dental Studio in Newlands, Pretoria", src: "/images/gallery/dental-treatment-patient-smile-connection-newlands-pretoria.jpg" },

  // Team Photos
  { id: "team-group", category: "Team Photos", size: "tall", label: "The Smile Connection team", alt: "The Smile Connection Dental Studio team, led by Dr Eugene Kleynhans, in Newlands, Pretoria", src: "/images/hero/smile-connection-dental-team-newlands-pretoria.jpg" },
  { id: "team-dentist", category: "Team Photos", size: "tall", label: "Dr Eugene Kleynhans", alt: "Dr Eugene Kleynhans, dentist at Smile Connection Dental Studio in Newlands, Pretoria", src: "/images/team/dr-eugene-kleynhans-dentist-newlands-pretoria.jpg" },
  { id: "team-prosthetics", category: "Team Photos", size: "tall", label: "Crafting your smile", alt: "A Smile Connection team member holding a dental model in Newlands, Pretoria", src: "/images/gallery/dental-prosthetics-smile-connection-pretoria.jpg" },
  { id: "team-scrubs", category: "Team Photos", size: "wide", label: "Dr ER Kleynhans", alt: "Dr ER Kleynhans's branded scrubs with dental instruments at Smile Connection Dental Studio, Pretoria", src: "/images/gallery/dr-eugene-kleynhans-scrubs-smile-connection-pretoria.jpg" },

  // Office Photos
  { id: "office-reception", category: "Office Photos", size: "wide", label: "Reception & waiting area", alt: "The branded reception area at Smile Connection Dental Studio, Newlands, Pretoria", src: "/images/clinic/smile-connection-reception-area-newlands-pretoria.jpg" },
  { id: "office-waiting", category: "Office Photos", size: "wide", label: "Reception & waiting room", alt: "The reception and waiting area at Smile Connection Dental Studio in Newlands, Pretoria", src: "/images/gallery/smile-connection-reception-waiting-area-newlands-pretoria.jpg" },
  { id: "office-welcome", category: "Office Photos", size: "wide", label: "A warm welcome", alt: "Receptionist at the front desk welcoming patients to Smile Connection Dental Studio, Pretoria", src: "/images/team/smile-connection-receptionist-newlands-pretoria.jpg" },
  { id: "office-lab", category: "Office Photos", size: "tall", label: "On-site dental laboratory", alt: "The on-site dental laboratory at Smile Connection Dental Studio in Newlands, Pretoria", src: "/images/clinic/dental-laboratory-smile-connection-pretoria.jpg" },
];
