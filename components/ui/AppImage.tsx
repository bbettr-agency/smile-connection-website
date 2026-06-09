import Image from "next/image";

/**
 * Optimised responsive image wrapper around next/image.
 *
 * Uses `fill` inside an aspect-ratio box so images are always responsive,
 * never cause layout shift, and are served as AVIF/WebP in the right size
 * for each device (see next.config.js). Real client photography only.
 */
type Ratio = "video" | "square" | "portrait" | "wide" | "tall" | "auto";

const ratioClass: Record<Ratio, string> = {
  video: "aspect-video",
  square: "aspect-square",
  portrait: "aspect-[3/4]",
  wide: "aspect-[16/10]",
  tall: "aspect-[4/5]",
  auto: "",
};

export function AppImage({
  src,
  alt,
  ratio = "video",
  className = "",
  rounded = "rounded-2xl",
  priority = false,
  fit = "cover",
  position = "center",
  sizes = "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 40vw",
  quality = 80,
  bg = "",
}: {
  src: string;
  alt: string;
  ratio?: Ratio;
  className?: string;
  rounded?: string;
  priority?: boolean;
  fit?: "cover" | "contain";
  position?: string;
  sizes?: string;
  quality?: number;
  bg?: string;
}) {
  return (
    <div className={`relative ${ratioClass[ratio]} w-full overflow-hidden ${rounded} ${bg} ${className}`}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        quality={quality}
        priority={priority}
        loading={priority ? undefined : "lazy"}
        className={fit === "contain" ? "object-contain" : "object-cover"}
        style={{ objectPosition: position }}
      />
    </div>
  );
}
