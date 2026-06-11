# CLAUDE.md — Smile Connection Dental Studio website

Project memory for Claude Code. Keep this current as the site evolves.

## Project
- **Client:** Smile Connection Dental Studio — a premium dental practice in Newlands, Pretoria, South Africa (est. 2009).
- **Stack:** Next.js 14 (App Router) + TypeScript + Tailwind CSS. Static-generated (`next build` → 17 routes).
- **Single source of truth:** `lib/site.ts` (business details), `lib/services.ts` (service pages), `lib/gallery.ts` (gallery), `tailwind.config.ts` (theme).
- **Agency:** Bbettr Agency (https://bbettragency.com).

## Working conventions (agreed with client)
- **Push directly to `main`.** The client explicitly authorized this; Vercel auto-deploys `main`. Only branch off if there's a build error. (Default dev branch was `claude/wonderful-wright-mA5Q5`, now superseded by the push-to-main instruction.)
- **Always run before pushing:** `npm run lint` and `npm run build` — both must pass.
- **Deployment:** push to `main` → Vercel auto-deploy. Production domain (if connected): https://smileconnection.co.za. Exact Vercel preview/prod URL only visible in the client's Vercel dashboard (no API access here).
- **GitHub:** writes go through git push over the credential proxy AND the GitHub MCP. Repo scope: `bbettr-agency/smile-connection-website`. Do not create PRs unless asked.

## Brand / content rules
- **Positioning:** general + cosmetic dentistry. **Do NOT mention** child / children's / pediatric / family / kids dentistry anywhere (copy, metadata, schema, alt text). This was deliberately stripped out.
- **Logo:** official artwork at `public/logo.png` (trimmed lockup, 562×248). Brandmark also drives `favicon-32x32.png`, `apple-touch-icon.png`, `og-image.png`. No placeholder logos.
- **Footer:** "Designed by Bbettr Agency" → https://bbettragency.com (new tab, subtle styling).
- **No invented data:** don't fabricate names, credentials, awards, or services. Team support-role names/bios are still unconfirmed placeholders.

## Image system
- **Component:** `components/ui/AppImage.tsx` wraps `next/image` (fill + aspect-ratio box, responsive `srcset`, AVIF/WebP via `next.config.js`, lazy except `priority`). `fit="contain"` for before/after composites. `ImagePlaceholder` remains only as a fallback.
- **Folders:** `public/images/{hero,team,clinic,gallery,treatments}` (each has `.gitkeep`).
- **Optimization workflow:** `sharp` is installed `--no-save` (NOT a project dependency — it's only used at asset-prep time by Claude). Resize (hero ≤1600w, portraits ≤1000w, practice ≤1300–1400w, before/after ≤1200w), `jpeg({quality:80-86, progressive, mozjpeg})`, EXIF stripped. Commit the optimized JPGs; remove oversized originals. Originals were ~100 MB total; optimized set is a few MB.
- **SEO filenames:** descriptive + location, e.g. `dr-eugene-kleynhans-dentist-newlands-pretoria.jpg`. **Alt text:** descriptive + location on every image.
- **Hero (home):** `public/images/hero/smile-connection-dental-team-hands-logo-pretoria.jpg` — clinicians forming the logo with gloved hands over a light box (priority-loaded). Client prefers conversion/trust (people, real clinic) over empty rooms.

## Team roster (as wired in `lib/site.ts`)
- **Dr Eugene Kleynhans** — Dentist. BChD (Univ. Pretoria, 1995), HPCSA registered. Photo: `team/dr-eugene-kleynhans-dentist-newlands-pretoria.jpg`.
- **Oral Hygienist** — the **blonde woman with the braid** (client-confirmed). Photo: `team/smile-connection-oral-hygienist-newlands-pretoria.jpg`. (Name unconfirmed.)
- **Receptionist** — blonde, white top. Photo: `team/smile-connection-receptionist-newlands-pretoria.jpg`. (Name unconfirmed.)
- **Dental Assistant** — `team/smile-connection-dental-assistant-newlands-pretoria.jpg`. (Name unconfirmed.)
- Note: `public/images/team/staff.jpg` (surgical-cap team member, ~2 MB, unoptimized) is committed but **unused** — awaiting a decision on where to place it (or remove).

## Workflow gotchas (important)
- **Uploaded chat images often do NOT reach the filesystem** — they're visual context only. Several "uploads" arrived as **2-byte empty placeholder files** when committed (e.g. `braces-model.jpg`, original `Full Team`/`Oral hygienis`). Always verify a committed image is a real JPEG (>100 KB / `file` says "JPEG") before using it.
- **Recovering originals:** earlier full-res originals can be recovered from git history, e.g. `git show <commit>^:public/images/gallery/DSC03695.jpg`.
- **Client sometimes commits images to the repo ROOT** instead of `public/images/...` — move + optimize + SEO-rename them, then `git rm` the root originals.
- Watch for **duplicate** images (e.g. DSC03340 == existing instruments shot) — skip dupes.

## Outstanding TODO
1. **Home About section** — client wants two specific images there: "image 2" (hands holding an orthodontic braces demo model) + "image 3" (dental light + polishing handpiece, already recovered as `gallery/DSC03695.jpg` from history, ready to optimize). **Blocked:** image 2 keeps arriving as a 2-byte empty file. Need the real file (>100 KB) in `public/images/clinic/` or a direct download link.
2. **`staff.jpg`** — decide placement or remove.
3. **Facial Aesthetics page** — an FAQ answer in `lib/services.ts` still contains a visible `[PLACEHOLDER: confirm exact facial aesthetic services]` note (deliberate honesty placeholder; needs the client to confirm real services before writing copy).

## Key components/files
- Layout: `components/layout/{Navbar,Footer,MobileCTABar}.tsx`
- Sections: `components/sections/{Hero,AboutSection,TeamSection,GalleryGrid,GalleryPreview,ServicePageTemplate,...}.tsx`
- SEO/schema: `lib/seo.ts`, `lib/schema.ts` (LocalBusiness/Dentist, FAQ, Breadcrumb, Service JSON-LD). `medicalSpecialty: "Dentistry"`.
- Service pages share `ServicePageTemplate`; each service in `lib/services.ts` has optional `heroImage` / `whoForImage` (before/after composites live in `public/images/treatments/`).
