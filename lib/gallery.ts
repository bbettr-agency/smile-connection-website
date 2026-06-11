/**
 * Gallery items — real Smile Connection Dental Studio photography.
 * Images live in /public/images/** and are served responsively via next/image.
 */
export type GalleryCategory =
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
};

export const galleryCategories: GalleryCategory[] = [
  "Smile Transformations",
  "Practice Photos",
  "Team Photos",
  "Office Photos",
];

export const galleryItems: GalleryItem[] = [
  // Smile Transformations
  { id: "smile-happy", category: "Smile Transformations", size: "tall", label: "A happy, healthy smile", alt: "A smiling patient with a bright, healthy smile at Smile Connection Dental Studio in Newlands, Pretoria", src: "/images/gallery/happy-patient-smile-smile-connection-pretoria.jpg" },

  // Practice Photos
  { id: "practice-room", category: "Practice Photos", size: "wide", label: "Treatment room", alt: "A modern dental treatment room at Smile Connection Dental Studio, Newlands, Pretoria", src: "/images/clinic/smile-connection-dental-treatment-room-pretoria.jpg" },
  { id: "practice-care", category: "Practice Photos", size: "tall", label: "Patient care in progress", alt: "Dr Eugene Kleynhans and a dental assistant treating a patient at Smile Connection Dental Studio", src: "/images/clinic/dentist-treating-patient-smile-connection-pretoria.jpg" },
  { id: "practice-model", category: "Practice Photos", size: "wide", label: "Precision dental work", alt: "A Smile Connection dentist holding a dental study model at the practice in Newlands, Pretoria", src: "/images/gallery/smile-connection-dental-study-model-newlands-pretoria.jpg" },
  { id: "practice-instruments", category: "Practice Photos", size: "wide", label: "Modern dental equipment", alt: "Modern dental handpieces and equipment at Smile Connection Dental Studio in Newlands, Pretoria", src: "/images/clinic/dental-instruments-smile-connection-pretoria.jpg" },
  { id: "practice-surgery", category: "Practice Photos", size: "wide", label: "In the surgery", alt: "Dr Eugene Kleynhans working in a treatment room at Smile Connection Dental Studio, Pretoria", src: "/images/clinic/dr-eugene-kleynhans-surgery-newlands-pretoria.jpg" },

  // Team Photos
  { id: "team-group", category: "Team Photos", size: "tall", label: "The Smile Connection team", alt: "The Smile Connection Dental Studio team, led by Dr Eugene Kleynhans, in Newlands, Pretoria", src: "/images/hero/smile-connection-dental-team-newlands-pretoria.jpg" },
  { id: "team-dentist", category: "Team Photos", size: "tall", label: "Dr Eugene Kleynhans", alt: "Dr Eugene Kleynhans, dentist at Smile Connection Dental Studio in Newlands, Pretoria", src: "/images/team/dr-eugene-kleynhans-dentist-newlands-pretoria.jpg" },
  { id: "team-prosthetics", category: "Team Photos", size: "tall", label: "Crafting your smile", alt: "A Smile Connection team member holding a dental model in Newlands, Pretoria", src: "/images/gallery/dental-prosthetics-smile-connection-pretoria.jpg" },

  // Office Photos
  { id: "office-reception", category: "Office Photos", size: "wide", label: "Reception & waiting area", alt: "The branded reception area at Smile Connection Dental Studio, Newlands, Pretoria", src: "/images/clinic/smile-connection-reception-area-newlands-pretoria.jpg" },
  { id: "office-welcome", category: "Office Photos", size: "wide", label: "A warm welcome", alt: "Receptionist at the front desk welcoming patients to Smile Connection Dental Studio, Pretoria", src: "/images/team/smile-connection-receptionist-newlands-pretoria.jpg" },
  { id: "office-lab", category: "Office Photos", size: "tall", label: "On-site dental laboratory", alt: "The on-site dental laboratory at Smile Connection Dental Studio in Newlands, Pretoria", src: "/images/clinic/dental-laboratory-smile-connection-pretoria.jpg" },
];
