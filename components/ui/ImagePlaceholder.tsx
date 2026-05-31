import { ArrowRightIcon } from "./Icons";

/**
 * Clearly-labelled image placeholder.
 *
 * IMPORTANT (for the client/agency):
 * Every placeholder shows the intended `alt` text and a note so you know
 * exactly which real photo to drop in. To replace:
 *   1. Add the real image to /public/images/...
 *   2. Swap this <ImagePlaceholder> for a Next <Image> with the same `alt`.
 *
 * No fake or stock imagery is used anywhere in this template.
 */
type Props = {
  label: string;
  /** The alt text the real image should use (also shown to the editor) */
  alt: string;
  className?: string;
  ratio?: "video" | "square" | "portrait" | "wide" | "tall";
  rounded?: string;
};

const ratioClass: Record<NonNullable<Props["ratio"]>, string> = {
  video: "aspect-video",
  square: "aspect-square",
  portrait: "aspect-[3/4]",
  wide: "aspect-[16/10]",
  tall: "aspect-[4/5]",
};

export function ImagePlaceholder({
  label,
  alt,
  className = "",
  ratio = "video",
  rounded = "rounded-2xl",
}: Props) {
  return (
    <div
      role="img"
      aria-label={alt}
      className={`relative flex ${ratioClass[ratio]} w-full items-center justify-center overflow-hidden ${rounded} border-2 border-dashed border-navy-200 bg-soft-blue ${className}`}
    >
      {/* Subtle dental-blue pattern */}
      <div className="absolute inset-0 bg-hero-glow opacity-60" aria-hidden="true" />
      <div className="relative z-10 flex max-w-[88%] flex-col items-center gap-2 p-4 text-center">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-white/80 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-navy-600 shadow-sm">
          <ArrowRightIcon className="h-3 w-3" /> Replace with real photo
        </span>
        <p className="text-sm font-semibold text-navy-700">{label}</p>
        <p className="text-xs leading-snug text-slate-500">
          <span className="font-medium">alt:</span> {alt}
        </p>
      </div>
    </div>
  );
}
