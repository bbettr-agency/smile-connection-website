# Bbettr Website OS — Premium Dental Template

A reusable, SEO-optimised, mobile-first dental website built with **Next.js 14 (App Router)**, **TypeScript** and **Tailwind CSS**.

**Current client:** Smile Connection Dental Studio — _Dentist in Newlands, Pretoria_.

This codebase is intentionally **config-driven** so it can be re-skinned for future
dental practices by editing a handful of files — no component rewrites required.

---

## Quick start

```bash
npm install
npm run dev      # http://localhost:3000  (redirects to /home)
npm run build    # production build
npm run start    # serve the production build
npm run lint
```

---

## Re-skinning for a new client (the "Website OS" idea)

| What you want to change            | Edit this file                     |
| ---------------------------------- | ---------------------------------- |
| Practice name, contact, hours, team, embeds | `lib/site.ts`             |
| Services (copy, SEO, FAQs, process)| `lib/services.ts`                  |
| Gallery tiles & categories         | `lib/gallery.ts`                   |
| Brand colours, shadows, gradients  | `tailwind.config.ts`               |
| Routes / navigation labels         | `lib/routes.ts`                    |

Everything else (components, schema, sitemap, metadata) derives from the above.

---

## Replacing placeholder images with real photos

**No fake or stock images are used.** Every image is a clearly-labelled
`<ImagePlaceholder>` that shows the intended `alt` text and a "Replace with real photo" badge.

To swap in the client's real photoshoot images:

1. Add the photo to `public/images/...`
2. Replace the `<ImagePlaceholder ... />` with a Next `<Image src="/images/..." alt="(same alt)" />`
3. For the **gallery**, just set the `src` field on the relevant item in `lib/gallery.ts`.

### Logo
A branded **placeholder** logo ships at `public/logo.svg`. Replace it with the
official artwork (e.g. drop in `public/logo.png` and update `logo` in `lib/site.ts`).

### Social share image
`public/og-image.svg` is a placeholder — replace with a real 1200×630 JPG/PNG.

---

## Routes

| Route                      | Page                                  |
| -------------------------- | ------------------------------------- |
| `/` → `/home`              | Redirect to home                      |
| `/home`                    | Homepage                              |
| `/about-us`                | About + full "Meet The Team"          |
| `/Services`                | Services index                        |
| `/Gallery`                 | Masonry gallery + lightbox            |
| `/contact-us`              | Contact, booking form, map            |
| `/Tooth-Replacement`       | Service page                          |
| `/Restorative-Treatments`  | Service page                          |
| `/Smile-Makeover`          | Service page                          |
| `/Root-Canal-Treatment`    | Service page                          |
| `/Preventive-Dentistry`    | Service page                          |
| `/Facial-Aesthetics`       | Service page                          |
| `/sitemap.xml`, `/robots.txt` | Auto-generated                     |

> Route casing matches the client brief exactly (Next.js paths are case-sensitive).

---

## SEO

Per page: hand-tuned **meta title**, **meta description**, **Open Graph** + **Twitter**
tags, **canonical URL**, a single structured **H1** and ordered **H2/H3** hierarchy,
internal links and local-SEO copy.

Structured data (JSON-LD):
- **LocalBusiness / Dentist** schema (global, `lib/schema.ts`)
- **BreadcrumbList** schema (interior pages)
- **FAQPage** schema (homepage + every service page)
- **MedicalProcedure** schema (service pages)

`app/sitemap.ts` and `app/robots.ts` generate the XML sitemap and robots file
from the central route registry.

---

## Conversion features

- Sticky mobile action bar (Call · WhatsApp · Book) — `components/layout/MobileCTABar.tsx`
- Primary (book) + secondary (call) + WhatsApp CTAs on every page
- Emergency call block in the hero and as a reusable band
- `FinalCTA` contact band before the footer on every page

---

## Important content rules honoured

- Real, researched content only — **no invented** doctors, qualifications, reviews,
  awards, stats or patient outcomes.
- Anything not verifiable from the live site is marked **`[PLACEHOLDER]`** in
  `lib/site.ts` / `lib/services.ts` for the client to confirm (e.g. Dr Truscott's
  exact qualifications, the specific Facial Aesthetics treatments offered).
- No lorem ipsum.

## Tech

Next.js 14 · React 18 · TypeScript · Tailwind CSS 3. No runtime UI dependencies —
icons are inline SVG to keep the bundle small.
