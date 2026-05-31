/**
 * Gallery items. These are PLACEHOLDERS only — no real or stock images.
 * Drop the client's real photoshoot images into /public/images/gallery/
 * and set the `src` on each item to switch from placeholder to real photo.
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
  /** Set this to a real image path to replace the placeholder */
  src?: string;
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
  { id: "smile-1", category: "Smile Transformations", size: "tall", label: "Before & after smile makeover", alt: "PLACEHOLDER — real before-and-after smile transformation photo from Smile Connection Dental Studio, Pretoria" },
  { id: "smile-2", category: "Smile Transformations", size: "square", label: "Veneers result", alt: "PLACEHOLDER — real photo of a patient's veneers result at Smile Connection Dental Studio" },
  { id: "smile-3", category: "Smile Transformations", size: "wide", label: "Teeth whitening result", alt: "PLACEHOLDER — real before-and-after teeth whitening photo at Smile Connection Dental Studio" },
  { id: "smile-4", category: "Smile Transformations", size: "square", label: "Dental implant smile restored", alt: "PLACEHOLDER — real photo of a restored smile after tooth replacement at Smile Connection Dental Studio" },

  { id: "practice-1", category: "Practice Photos", size: "wide", label: "Treatment room", alt: "PLACEHOLDER — real photo of a treatment room at Smile Connection Dental Studio, Newlands" },
  { id: "practice-2", category: "Practice Photos", size: "tall", label: "Modern dental equipment", alt: "PLACEHOLDER — real photo of modern dental equipment at Smile Connection Dental Studio" },
  { id: "practice-3", category: "Practice Photos", size: "square", label: "Patient consultation", alt: "PLACEHOLDER — real photo of a patient consultation at Smile Connection Dental Studio" },

  { id: "team-1", category: "Team Photos", size: "square", label: "Dr Eugene Kleynhans", alt: "PLACEHOLDER — real photo of Dr Eugene Kleynhans at Smile Connection Dental Studio" },
  { id: "team-2", category: "Team Photos", size: "square", label: "Our oral hygienist", alt: "PLACEHOLDER — real photo of the oral hygienist at Smile Connection Dental Studio" },
  { id: "team-3", category: "Team Photos", size: "wide", label: "The Smile Connection team", alt: "PLACEHOLDER — real group photo of the Smile Connection Dental Studio team" },

  { id: "office-1", category: "Office Photos", size: "tall", label: "Reception & waiting area", alt: "PLACEHOLDER — real photo of the reception and waiting area at Smile Connection Dental Studio" },
  { id: "office-2", category: "Office Photos", size: "square", label: "Practice exterior", alt: "PLACEHOLDER — real photo of the Smile Connection Dental Studio exterior at 197 Lois Ave, Newlands" },
  { id: "office-3", category: "Office Photos", size: "wide", label: "Welcoming patient lounge", alt: "PLACEHOLDER — real photo of the patient lounge at Smile Connection Dental Studio" },
];
