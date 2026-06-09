"use client";

import { useMemo, useState, useEffect, useCallback } from "react";
import { AppImage } from "@/components/ui/AppImage";
import { galleryCategories, galleryItems, type GalleryItem } from "@/lib/gallery";

/**
 * Premium masonry gallery with category filters and a built-in lightbox.
 * Works with placeholders today and with real images later (set item.src).
 * Fully responsive: masonry uses CSS columns so there's no horizontal scroll.
 */
export function GalleryGrid() {
  const [active, setActive] = useState<"All" | string>("All");
  const [lightbox, setLightbox] = useState<number | null>(null);

  const filters = ["All", ...galleryCategories];

  const items = useMemo(
    () => (active === "All" ? galleryItems : galleryItems.filter((i) => i.category === active)),
    [active]
  );

  const close = useCallback(() => setLightbox(null), []);
  const next = useCallback(
    () => setLightbox((i) => (i === null ? null : (i + 1) % items.length)),
    [items.length]
  );
  const prev = useCallback(
    () => setLightbox((i) => (i === null ? null : (i - 1 + items.length) % items.length)),
    [items.length]
  );

  // Keyboard controls + body scroll lock for the lightbox
  useEffect(() => {
    if (lightbox === null) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [lightbox, close, next, prev]);

  const ratioFor = (it: GalleryItem) =>
    it.size === "tall" ? "portrait" : it.size === "wide" ? "wide" : "square";

  return (
    <div>
      {/* Filters */}
      <div className="mb-8 flex flex-wrap justify-center gap-2.5">
        {filters.map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => setActive(f)}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
              active === f
                ? "bg-navy-800 text-white shadow-card"
                : "bg-white text-navy-700 ring-1 ring-navy-100 hover:bg-brand-green-light"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Masonry via CSS columns — no horizontal scroll on any device */}
      <div className="[column-fill:_balance] gap-4 sm:columns-2 lg:columns-3 [&>*]:mb-4">
        {items.map((item, idx) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setLightbox(idx)}
            className="group block w-full break-inside-avoid overflow-hidden rounded-2xl text-left focus:outline-none focus-visible:ring-4 focus-visible:ring-brand-green/40"
            aria-label={`Open ${item.label}`}
          >
            <div className="relative">
              <AppImage
                src={item.src}
                alt={item.alt}
                ratio={ratioFor(item)}
                className="transition-transform duration-300 group-hover:scale-[1.02]"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
              <span className="pointer-events-none absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-navy-700 shadow-sm">
                {item.category}
              </span>
            </div>
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {lightbox !== null && items[lightbox] && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-navy-900/90 p-4 animate-fade-in"
          role="dialog"
          aria-modal="true"
          aria-label={items[lightbox].label}
          onClick={close}
        >
          <button
            type="button"
            onClick={close}
            className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
            aria-label="Close gallery"
          >
            ✕
          </button>
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); prev(); }}
            className="absolute left-3 top-1/2 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-2xl text-white hover:bg-white/20 sm:flex"
            aria-label="Previous image"
          >
            ‹
          </button>
          <div className="w-full max-w-3xl" onClick={(e) => e.stopPropagation()}>
            <AppImage
              src={items[lightbox].src}
              alt={items[lightbox].alt}
              ratio={ratioFor(items[lightbox])}
              fit="contain"
              bg="bg-navy-900/60"
              rounded="rounded-3xl"
              sizes="(max-width: 768px) 100vw, 768px"
            />
            <p className="mt-3 text-center text-sm font-medium text-white/90">
              {items[lightbox].label} — {items[lightbox].category}
            </p>
          </div>
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); next(); }}
            className="absolute right-3 top-1/2 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-2xl text-white hover:bg-white/20 sm:flex"
            aria-label="Next image"
          >
            ›
          </button>
        </div>
      )}
    </div>
  );
}
