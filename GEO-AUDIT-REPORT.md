# GEO Audit Report: Smile Connection Dental Studio

**Audit Date:** 17 November 2026
**URL:** https://www.smileconnection.co.za/
**Business Type:** Local Business (dental practice — general & cosmetic dentistry, Newlands, Pretoria)
**Pages Analyzed:** 11 (all sitemap URLs) + robots.txt, sitemap.xml, llms.txt

---

## Executive Summary

**Overall GEO Score: 46/100 (Poor)**

The site is technically sound — statically rendered, fast, fully crawlable by every AI bot, with consistent Dentist/FAQ/MedicalProcedure schema and well-structured service pages. What holds it back is everything *off* the page and around trust: the brand has almost no entity footprint for AI systems, third-party directories publish a **conflicting old address, phone number, a second dentist and paediatric care**, reviews are invisible to crawlers, and the medical content has no named reviewer, dates, citations or privacy policy. A single-line URL fix (apex → www) also repairs every canonical, sitemap and schema URL at once.

### Score Breakdown

| Category | Score | Weight | Weighted Score |
|---|---|---|---|
| AI Citability | 58/100 | 25% | 14.5 |
| Brand Authority | 15/100 | 20% | 3.0 |
| Content E-E-A-T | 46/100 | 20% | 9.2 |
| Technical GEO | 78/100 | 15% | 11.7 |
| Schema & Structured Data | 39/100 | 10% | 3.9 |
| Platform Optimization | 41/100 | 10% | 4.1 |
| **Overall GEO Score** | | | **46/100** |

---

## Critical Issues (Fix Immediately)

1. **Conflicting business data on third-party directories (NAP).** Several listings still show an old address — *342 Glenwood Rd / Cnr Glenwood & Fairy Glen Rd, Lynnwood Glen/Park* — phone **012 348 4182**, and different hours (e.g. Mon 09:00–18:00). The site says 197 Lois Ave, Newlands 0081 · 079 471 6319. AI engines repeat these listings in their answers.
   - [WhatClinic](https://www.whatclinic.com/dentists/south-africa/pretoria/smile-connection-dental-studio), [SA Business Directory](https://www.southafricabusinessdirectory.co.za/company/1099864373489664/smile-connection-dental-studio/pretoria/dentists), [Cylex](https://www.cylex.net.za/company/smile-connection-dental-studio-17301032.html). Medpages (orgcode 261817) already shows Newlands.
   - **Fix:** claim and correct each listing; confirm Google Business Profile and Bing Places match the site exactly.
2. **WhatClinic describes "adult and paediatric" care and names "Dr Vilje Truscott" as co-founder.** This contradicts the brand positioning (no child dentistry) and the current team, and surfaced in every AI-style search summary during the audit. **Fix:** client to confirm the facts, then correct/claim the listing.
3. **Every canonical points at a redirect.** Canonical, `og:url`, schema `@id`/`url`, sitemap `<loc>`s and robots `Host`/`Sitemap` all use `https://smileconnection.co.za`, which **308-redirects** to `https://www.smileconnection.co.za`. **Fix:** `lib/site.ts:21` → `url: "https://www.smileconnection.co.za"` (single source; feeds `app/layout.tsx`, `lib/seo.ts`, `lib/schema.ts`, `app/sitemap.ts`, `app/robots.ts`).
4. **No privacy policy on any page.** The site collects name/email/phone (WhatsApp modal, GHL form) and runs Meta Pixel + GTM — a POPIA gap for a health provider, and a trust signal AI/Google weigh heavily on YMYL sites. **Fix:** client to supply a POPIA privacy policy; link it in the footer.

## High Priority Issues

5. **No H1 on /about-us, /services, /gallery, /contact-us.** `SectionHeading` only allows `h2|h3` (`components/ui/SectionHeading.tsx:9`). Add `"h1"` and use `as="h1"` for each page's first heading.
6. **Reviews are invisible to crawlers.** The Google reviews widget (SociableKit) renders client-side; static HTML shows only "Loading Google reviews…". **Fix:** with client permission, render 3–5 real Google review excerpts as static text + link to the GBP review page. Do **not** add self-serving AggregateRating.
7. **No named clinical reviewer on medical pages** (all 6 service pages). Add a visible "Clinically reviewed by Dr Eugene Kleynhans, BChD (UP), HPCSA registered — [date]" once he has actually reviewed the copy, plus `reviewedBy` schema.
8. **No Person schema for Dr Eugene Kleynhans**, no WebSite node, no `@graph`. Ready-to-use JSON-LD in the Schema deep dive below.
9. **Weak entity graph (sameAs).** Only `facebook.com/drerkleynhans` (looks personal, and the site never links it). No GBP, Instagram, LinkedIn or Wikidata. **Fix:** client to supply real profile URLs; create LinkedIn company page + Wikidata item.
10. **No llms.txt** (`/llms.txt`, `/llms-full.txt` → 404).
11. **Factual mismatch: "HPCSA-registered dentists" (plural)** at `components/sections/Hero.tsx:10`, and hero alt "Smile Connection dentists" (`Hero.tsx:63`) — the practice has one dentist. Change to "HPCSA-registered dentist" / "clinicians".
12. **/facial-aesthetics has no citable content** — its key FAQ answer defers to "confirm with our team". Still blocked on the client's confirmed treatment list.
13. **No dates anywhere** (no visible "last reviewed", no `dateModified`).

## Medium Priority Issues

14. **No hard facts in the service copy** — no durations, visit counts, cost factors or comparison tables (citability capped ~60–70). Needs clinician-confirmed figures.
15. **No outbound citations** to authorities (HPCSA register, SADA patient info) for clinical claims.
16. **Missing security headers:** CSP, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy (HSTS present but no `includeSubDomains`). Add `headers()` in `next.config.js`; start CSP as Report-Only (allow GTM, Meta, GHL).
17. **Meta Pixel noscript `<img>` is hoisted into a `<link rel="preload">`** for all visitors → wasted request and possible double PageView. Render the noscript via `dangerouslySetInnerHTML` (`app/layout.tsx` ~98–107).
18. **Placeholder geo data published:** approximate coordinates and a search-URL `hasMap` (`lib/site.ts:50–52`). Replace with exact pin + GBP place URL.
19. **Schema tightening:** `addressLocality` should be `Pretoria` (Newlands into `streetAddress`); `medicalSpecialty` → `https://schema.org/Dentistry`; `logo` as ImageObject; `priceRange: "$$"` unsupported — confirm or remove; strip city from MedicalProcedure `name`.
20. **Thin pages:** /contact-us (~120 words in main), /gallery (~165, "coming soon"), /services (~270).
21. **Copy reads as templated** ("Absolutely. Our goal is…", "designed to last") — add practice-specific voice and experience.
22. **Not verified in Bing Webmaster Tools** (no `msvalidate.01`); no IndexNow — matters for Copilot and ChatGPT (Bing index).

## Low Priority Issues

23. Logo PNG (85 KB) preloaded with high priority competes with hero LCP — drop `priority`, serve WebP/SVG.
24. ~79 KB inline RSC payload per page; trim client props where possible.
25. No `speakable` markup; no medical "information only" disclaimer.
26. No `Content-Signal` line in robots.txt (optional: `search=yes, ai-retrieval=yes, ai-train=<client choice>`).
27. No YouTube / Reddit presence.

---

## Category Deep Dives

### AI Citability (58/100)
Top five blocks scored 72, 70, 66, 62, 60. FAQ answers are self-contained and quotable; the site lacks numbers and original, practice-specific facts.

**Strong passages**
- /root-canal-treatment (72): *"When the soft tissue (the pulp) inside a tooth becomes infected or inflamed… Root canal treatment removes the infection, relieves the pain and saves your natural tooth."*
- Home FAQ (70): *"We're open Monday to Thursday from 08:00 to 17:00 and Friday from 08:00 to 13:00…"*
- /tooth-replacement FAQ (66): *"The three most common options are dental implants, bridges and dentures. The right choice depends on…"*

**Weak passages**
- /facial-aesthetics FAQ (12): *"The specific facial aesthetic treatments available are best confirmed directly with our team…"*
- Home hero (22): *"…we help you look better, feel better and smile brighter."*
- /tooth-replacement (25): *"…modern tooth-replacement solutions are built to last for years."*

**Rewrite templates** (figures in [brackets] must come from the clinician — no invented data)
1. "Dental implants are titanium posts that fuse with the jawbone over roughly [X–Y] months before a crown is fitted. At Smile Connection in Newlands, Pretoria, Dr Eugene Kleynhans (BChD, University of Pretoria, 1995) assesses bone and gum health first; most single implants take [N] visits."
2. "A root canal at Smile Connection usually takes [1–2] appointments of about [60–90] minutes under local anaesthetic, with a crown typically placed [N] weeks later on back teeth."
3. Facial aesthetics: "Smile Connection offers [treatment A, treatment B], performed by [named HPCSA-registered clinician]. A consultation is required first."

Also: open each "Understanding X" section with a 40–60 word direct answer; add one comparison table (implants vs bridges vs dentures).

### Brand Authority (15/100)

| Platform | Status |
|---|---|
| Wikipedia / Wikidata | Absent |
| Reddit | Absent |
| YouTube | Absent |
| LinkedIn | Absent |
| Facebook | Minimal (facebook.com/drerkleynhans — unverified, not linked from site) |
| Directories | WhatClinic, Medpages, Cylex, SA Business Directory, Wanderlog, Qanomed — **several with outdated/conflicting data** |
| Google Business Profile | Indirect only — third-party aggregators show ~4.6★ (26–38 reviews); not verifiable from here |

The practice did not surface in searches for "dentist Newlands Pretoria", "root canal Pretoria" or "dental implants Pretoria east" — WhatClinic aggregator pages and competitors dominate.

### Content E-E-A-T (46/100)

| Dimension | Score | Notes |
|---|---|---|
| Experience | 8/25 | Real clinic/team photos; one before/after; gallery "coming soon"; no cases |
| Expertise | 11/25 | Dr Kleynhans' BChD + HPCSA shown, but one-line bio, no author/reviewer |
| Authoritativeness | 9/25 | "Est. 2009" + HPCSA only; no outbound authority links, memberships, press |
| Trustworthiness | 13/25 | HTTPS, full NAP, hours, emergency line; **no privacy policy, disclaimer or dates**; reviews JS-only |

Client to supply: fuller dentist bio (focus areas, CPD, memberships e.g. SADA if applicable), consented before/after cases, permission to quote real reviews, privacy policy.

### Technical GEO (78/100)
- **SSR:** excellent — all content in initial HTML (Next.js static on Vercel).
- **Crawlers:** robots.txt `User-Agent: * Allow: /` — GPTBot, OAI-SearchBot, ClaudeBot, PerplexityBot, Google-Extended all allowed. Sitemap referenced.
- **Redirects:** apex → www 308; trailing slash normalises in one hop; real 404s; `/home` → `/` 301.
- **Passes:** `lang="en-ZA"`, correct viewport (zoom allowed), `poweredByHeader: false`, next/image AVIF/WebP, dimensions on all images, alt text on all content images.
- **Gaps:** canonical host (Critical #3), missing H1s, llms.txt, security headers, pixel preload.

### Schema & Structured Data (39/100)
34 valid JSON-LD blocks; Dentist identical on all 11 pages; FAQPage (7 pages) matches visible text word-for-word; NAP and hours match. Missing: Person, WebSite, `@graph`, `employee` link, sameAs breadth, dates. Note: Google limits FAQ rich results to authoritative health/government sites — keep FAQPage for AI parsing, don't expand for rich results.

**Recommended additions** (facts from `lib/site.ts` only; assumes www host):

```json
{
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": "https://www.smileconnection.co.za/#dr-eugene-kleynhans",
  "name": "Dr Eugene Kleynhans",
  "honorificPrefix": "Dr",
  "jobTitle": "Dentist",
  "image": "https://www.smileconnection.co.za/images/team/dr-eugene-kleynhans-dentist-newlands-pretoria.jpg",
  "url": "https://www.smileconnection.co.za/about-us",
  "worksFor": { "@id": "https://www.smileconnection.co.za/#dentist" },
  "alumniOf": { "@type": "CollegeOrUniversity", "name": "University of Pretoria" },
  "hasCredential": [
    { "@type": "EducationalOccupationalCredential", "name": "Bachelor of Dental Surgery (BChD)", "credentialCategory": "degree", "dateCreated": "1995",
      "recognizedBy": { "@type": "CollegeOrUniversity", "name": "University of Pretoria" } },
    { "@type": "EducationalOccupationalCredential", "name": "HPCSA registration", "credentialCategory": "license",
      "recognizedBy": { "@type": "Organization", "name": "Health Professions Council of South Africa" } }
  ]
}
```

```json
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://www.smileconnection.co.za/#website",
  "url": "https://www.smileconnection.co.za/",
  "name": "Smile Connection Dental Studio",
  "alternateName": "Smile Connection",
  "inLanguage": "en-ZA",
  "publisher": { "@id": "https://www.smileconnection.co.za/#dentist" }
}
```

Dentist node changes: `employee: [{ "@id": "…/#dr-eugene-kleynhans" }]`, `logo` as ImageObject (562×248), `addressLocality: "Pretoria"` with `streetAddress: "197 Lois Ave, Newlands"`, `medicalSpecialty: "https://schema.org/Dentistry"`, add GBP URL to `sameAs` once supplied.

### Platform Optimization (41/100)

| Platform | Score | Top action |
|---|---|---|
| Google AI Overviews | 50 | Direct-answer openers + comparison table; fix canonical host |
| ChatGPT Search | 37 | Person/reviewedBy schema, dates, sameAs; Bing indexing |
| Perplexity | 37 | Server-rendered reviews; fix directory listings; llms.txt |
| Gemini | 40 | Complete GBP (Dentist category, services, photos, www website); YouTube clips |
| Bing Copilot | 40 | Bing Webmaster Tools + IndexNow; Bing Places with matching NAP; LinkedIn page |

---

## Quick Wins (Implement This Week)

1. **Switch `lib/site.ts:21` to the www host** — fixes canonical/sitemap/schema/robots in one line.
2. **Add H1s** to About, Services, Gallery, Contact.
3. **Fix "dentists" → "dentist"** in the hero trust list and alt text.
4. **Publish `/llms.txt`** listing the 11 pages with one-line summaries and NAP.
5. **Add Person + WebSite schema** (snippets above) and the `employee` link.

## 30-Day Action Plan

### Week 1: Technical & schema fixes (agency)
- [ ] www host in `lib/site.ts`; verify canonicals/sitemap after deploy
- [ ] H1s on 4 pages; hero "dentist" wording
- [ ] llms.txt; Person + WebSite schema; Dentist node tightening
- [ ] Security headers in `next.config.js`; fix pixel noscript preload

### Week 2: Entity & NAP cleanup (client + agency)
- [ ] Client confirms facts re: old Lynnwood address, 012 348 4182, Dr Vilje Truscott
- [ ] Claim/correct WhatClinic, Cylex, SA Business Directory; remove paediatric mention
- [ ] Confirm GBP + create Bing Places with identical NAP; supply GBP place URL + exact pin
- [ ] Bing Webmaster Tools verification + sitemap; IndexNow

### Week 3: Trust & E-E-A-T (client supplies, agency implements)
- [ ] POPIA privacy policy + footer link; medical information disclaimer
- [ ] Dr Kleynhans reviews service copy → "Clinically reviewed by… [date]" + `reviewedBy`/`dateModified`
- [ ] Fuller dentist bio; 3–5 real Google review excerpts rendered server-side
- [ ] LinkedIn company page; extend sameAs with confirmed profiles

### Week 4: Citability content (clinician-confirmed facts)
- [ ] 40–60 word direct-answer openers on each service page
- [ ] Durations / visit counts / cost factors per service; implants vs bridges vs dentures table
- [ ] Expand /contact-us (parking, directions, first visit, medical aid) and /services
- [ ] Facial aesthetics treatment list (when confirmed); consented before/after cases for gallery

---

## Appendix: Pages Analyzed

| URL | Title | Words | GEO Issues |
|---|---|---|---|
| / | Dentist in Newlands, Pretoria \| Smile Connection Dental Studio | 867 | 5 (canonical, "dentists", JS-only reviews, no dates, no Person) |
| /about-us | About Us \| Dentist in Newlands, Pretoria | 542 | 4 (no H1, thin bio, no Person schema, canonical) |
| /services | Dental Services in Pretoria | 435 | 3 (no H1, thin, canonical) |
| /gallery | Smile Gallery \| Before & After Dental Results | 335 | 3 (no H1, "coming soon", canonical) |
| /contact-us | Contact Us \| Book a Dentist in Newlands, Pretoria | 287 | 3 (no H1, thin, canonical) |
| /tooth-replacement | Tooth Replacement Pretoria | 1015 | 4 (no reviewer, dates, citations, hard facts) |
| /restorative-treatments | Restorative Dentistry Pretoria | 929 | 4 (same) |
| /smile-makeover | Smile Makeover Pretoria | 950 | 4 (same) |
| /root-canal-treatment | Root Canal Treatment Pretoria | 949 | 4 (same) |
| /preventive-dentistry | Preventive Dentistry Pretoria | 886 | 4 (same) |
| /facial-aesthetics | Facial Aesthetics Pretoria | 789 | 5 (same + no citable treatment list) |

Word counts are whole-page text; main-content counts are lower. All 11 pages returned 200 in under 1 s. Not fetched: /llms.txt and /llms-full.txt (404). Third-party review counts and the GBP could not be verified directly from the audit environment.
