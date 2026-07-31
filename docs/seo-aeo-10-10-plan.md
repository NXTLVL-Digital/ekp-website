# Road to 10/10 — SEO & AEO Master Plan

**Goal:** every category of the SEO/AEO audit (`Skills/SEO-Auditor/Output/SEO-AUDIT-emilykathryn.com-v2.md`) at 10/10.
**Method:** seven phases, each independently shippable as one PR (main requires PR + passing "Validate project" CI). Knock them out one at a time, in order — each phase's acceptance criteria are the definition of done.

**Standing constraints (do not violate):**
- **SAB rule:** no street address on site or in schema, ever — Emily is a service-area business; the street goes to Google privately via GBP only. Phone stays hidden until the real number lands in `siteConfig.ts`. (The audit items suggesting street/phone additions are superseded by this rule.)
- **Free tiers only.** No paid tools, fonts, or services.
- **Pricing is unconfirmed** ($400 Sanity fallback is placeholder; $799/$899 are research anchors). Nothing new that states prices ships until Jeff confirms — this gates parts of llms.txt and the Investment page.
- Sanity is the eventual home for content; hardcoded fallbacks are the current pattern. Either is acceptable for a phase — don't block content on CMS plumbing.

**Category scores → target:**

| Category | Now | After phase |
|----------|:---:|:---:|
| Technical Foundation | 4 | **10** after P0+P1 |
| Crawlability | 5 | **10** after P0+P1 (index recovery verified in P6) |
| Performance | 8 | **10** after P1 |
| On-Page SEO | 7 | **10** after P1 |
| Structured Data | 6 | **10** after P3 |
| Content Quality | 5 | **10** after P2 (+P5 guides) |
| Images & Media | 6 | **10** after P0 (logo) + P1 |
| AEO Readiness | 5 | **10** after P5 |
| E-E-A-T & Trust | 5 | **10** after P2+P3+P4 |
| Local SEO | 6 | **10** after P4 |
| Mobile | 8 | **10** after P1 |
| Accessibility | 7 | **10** after P1 |
| Security | 5 | **10** after P1 |

---

## Phase 0 — Migration triage ✅ SHIPPED 2026-07-31

- [x] **T-01** Legacy 301/308 redirect map in `next.config.ts` (9 routes: /home, /meet-emily, /experience, /gallery, /blog, /blog/b/:slug, /privacy-policy, /terms-conditions, /test_path)
- [x] **T-03** www → apex host redirect (app-level in `next.config.ts`)
- [x] **T-04** Self-referencing canonicals sitewide (`alternates: { canonical: "./" }` in root layout)
- [x] **I-03** Real brand logos extracted from `Official Brand Board.jpg` → `public/brand/{logo-primary,logo-stacked,logo-submark}.png`; header now uses the stacked mark with `shrink-0` (fixes the horizontal-squeeze distortion)
- [x] **C-02/C-03 prerequisite** Legacy GHL content recovered to `docs/legacy-content/` (6 blog posts + 1,561-word testimonial corpus + page copy); 82 images backed up to `deliverables/legacy-scrape/`

**Acceptance (verify post-deploy):** `curl -I` each legacy URL → 308 to mapped target · `https://www.emilykathryn.com/` → 308 apex · `<link rel="canonical">` present on `/`, `/about`, `/danville` · header logo undistorted at 1024px width.
**Post-merge manual step (Jeff):** In Vercel → Settings → Domains, also set www to "Redirect to emilykathryn.com" so the redirect happens at the edge (belt-and-suspenders over the app-level rule).

---

## Phase 1 — Technical & polish sprint (one PR, ~half day)

Everything mechanical that gets Technical/Security/A11y/Performance/Mobile to 10.

| # | Task | File(s) | Acceptance |
|---|------|---------|-----------|
| 1.1 | **S-01** Security headers: X-Content-Type-Options nosniff, X-Frame-Options DENY, Referrer-Policy strict-origin-when-cross-origin, Permissions-Policy camera=(), microphone=(), geolocation=(self) (Maps embed later) | `next.config.ts` `headers()` | Observatory ≥ B+ (CSP comes in 1.8) |
| 1.2 | **T-05/M-03** Branded 404: hero-style layout, header/footer, links to /senior-portraits, /family-portraits, /contact; own metadata (kills double-title) | `src/app/not-found.tsx` (root, replaces default; keep `(site)/not-found.tsx` in sync) | 404 shows brand page, single title tag |
| 1.3 | **T-08** Apple touch icon 180×180 from `logo-submark.png` (white bg) | `src/app/apple-icon.png` | `/apple-icon.png` 200 |
| 1.4 | **A-01** Footer contrast: raise muted footer text/links to ≥ 4.5:1 (one token: `text-white/50` → `text-white/70`-ish; verify each flagged element) | `Footer.tsx` | Lighthouse a11y 100, zero contrast fails |
| 1.5 | **A-02** Footer "ek." link: `aria-label="Emily Kathryn Photography — home"` on the SVG Link | `Footer.tsx` | Lighthouse link-name passes |
| 1.6 | **PERF-01** Hero LCP: `priority` + accurate `sizes` on homepage hero image; `quality={60–65}` | `(site)/page.tsx` hero component | Lab mobile LCP ≤ 2.5s, perf ≥ 95 |
| 1.7 | **M-04** Trim /smith-mountain-lake title to ≤ 60c ("Smith Mountain Lake Portrait Photographer \| Emily Kathryn") | city data source | Title ≤ 60c |
| 1.8 | **S-01b** CSP in Report-Only first (script-src 'self' 'unsafe-inline' + Vercel/Sanity origins; inventory from console), flip to enforcing after a clean week | `next.config.ts` | No CSP violations in report-only; grade A- when enforced |
| 1.9 | **PERF-02** Explicit dimensions/aspect-ratio wrappers on gallery grid images (CLS insurance) | gallery components | unsized-images audit passes |

**Category exits:** Technical 10 · Security 10 (after 1.8 enforce) · Accessibility 10 · Performance 10 · Mobile 10 · Images 10.

---

## Phase 2 — Content restoration (raves + journal) (one PR, ~1 day)

Source material is already in `docs/legacy-content/` — this phase is porting, not writing from scratch.

| # | Task | Acceptance |
|---|------|-----------|
| 2.1 | **C-02** Rebuild /raves from the recovered corpus: 8–12 full testimonials with name + school/class attribution (dedupe the desktop/mobile twins), pull-quote layout consistent with editorial design | /raves ≥ 1,200 words |
| 2.2 | **SD-03** `Review` schema per testimonial attached to `#business` (no invented ratings — quotes only, so omit reviewRating unless real star ratings exist) | Rich Results test passes |
| 2.3 | **C-01/C-03** Seed /journal with 3 recovered posts, rewritten lightly with 2026 framing: "The New Home of EKP" (origin story — evergreen), "Faith — Gretna High" and "Raegan — Altavista" (school-name long-tail). Real `datePublished` (original era) + `dateModified` (2026 republish) | /journal lists 3 posts; each ≥ 400 words |
| 2.4 | **AEO-02 partial** `BlogPosting` schema + visible dates on each post | Schema validates |
| 2.5 | 1:1 redirects: `/blog/b/faith-2019-gretna-high-senior` → its /journal slug, same for raegan + chatham post; keep blanket rule for the rest | curl each → 308 to post |
| 2.6 | **C-04** /terms page (session agreement summary, print release, image usage); update `/terms-conditions` redirect to point at it | /terms 200, in sitemap |
| 2.7 | **T-07** Sitemap lastmod from real content dates (Sanity `_updatedAt` where CMS-backed, git-derived or manual constants otherwise) | lastmod varies per URL |

**Category exit:** Content Quality 10 (journal live + raves restored; P5 guides push it durable).

---

## Phase 3 — Schema & entity graph (one PR, ~half day)

⚠️ **Gate: Jeff/Emily confirm the canonical social handles before this ships.** Audit evidence says live accounts are `@emilykathrynphotos` (IG, 2,184 followers; TikTok same) while the site links `@emilykathrynphotography` (only Facebook uses that handle). Confirm, don't assume.

| # | Task | Acceptance |
|---|------|-----------|
| 3.1 | **SD-01/EEAT-01** Correct IG/TikTok URLs in footer + `sameAs`; add the other live profiles (YouTube `@Emilykathryn`, Pinterest `emilykathrynva`, SmugMug) | Every link resolves to a live profile |
| 3.2 | **SD-02** `Person` schema on /about (Emily Kathryn Walker, jobTitle, worksFor → `#business`, knowsAbout, sameAs) + `founder` ref from business block | Validates; person knowledge panel eligible |
| 3.3 | **SD-04** City pages: merge the duplicate ProfessionalService blocks via shared `@id` | One business entity per page |
| 3.4 | **SD-05 (SAB-safe parts only)** Add `logo` (`/brand/logo-primary.png`) and `image` array to business schema. **No street, no phone** until siteConfig flips | Validates |
| 3.5 | BreadcrumbList on city + service + journal pages | Validates |
| 3.6 | **EEAT-02** One proof line per service page (real numbers from Emily: years shooting, seniors photographed, schools served) | Present on both service pages |

**Category exit:** Structured Data 10 · E-E-A-T to 8 (10 after P4's GBP reviews loop).

---

## Phase 4 — Local SEO & GBP (mostly off-site; needs Jeff/Emily) (~half day active)

The step-by-step guides already exist: `docs/google-business-profile-setup.md` + `docs/apple-business-connect-setup.md`.

| # | Task | Acceptance |
|---|------|-----------|
| 4.1 | **L-02a** Create/claim GBP as **service-area business** (street private, service area = the 7 cities), categories: Photographer / Portrait Studio | GBP live & verified |
| 4.2 | **L-02b** GBP review short-link + map embed on /contact (Maps embed free tier key → env) | Link + map live |
| 4.3 | **L-01** NAP alignment pass across the web to "Gretna, VA" city-level: GBP, Facebook, directories (photlo shows a stale street — request removal/correction per SAB) | Consistent city-level NAP everywhere findable |
| 4.4 | **C-06** `/gretna` city page — home-base page, deepest content of the set (studio-town story, most-used locations) | Page live, in sitemap, FAQ localized |
| 4.5 | **C-05** Localize the near-identical CTA paragraphs on the 7 existing city pages (one named location each) | No CTA paragraph >0.8 similarity between cities |
| 4.6 | Real phone → `siteConfig.ts` when Emily provides it (unhides footer/contact/schema phone in one line) | Phone visible + in schema |
| 4.7 | Apple Business Connect (guide exists) | Listing live |
| 4.8 | GBP posting habit: one photo post per week from recent sessions (Emily, 5 min/week) | 4 consecutive weeks |

**Category exit:** Local SEO 10 · E-E-A-T 10 (review velocity flowing).

---

## Phase 5 — AEO build-out (one PR + writing, ~1 day)

| # | Task | Acceptance |
|---|------|-----------|
| 5.1 | **AEO-01** `llms.txt` route handler: business summary, service pages, city list, contact — absolute URLs. **Pricing line only after Jeff confirms real pricing** | /llms.txt 200 text/plain, accurate |
| 5.2 | llms-full.txt with expanded per-page descriptions | 200, consistent with llms.txt |
| 5.3 | **AEO-02** `dateModified` on service/city pages (from Sanity/_manual constants) | In schema on all key pages |
| 5.4 | **AEO-03** 3 answer-shaped journal guides, each opening with a 2-sentence direct answer + FAQ schema: "When should you book senior photos in Virginia?" / "What to wear for senior pictures" (distill from /style-guide) / "How to choose a senior photographer" | Each ≥ 800 words, FAQ markup, cited internally from service pages |
| 5.5 | Homepage FAQ section (4–6 Qs) with FAQPage schema — the only key page without it | Validates |
| 5.6 | Speakable schema on homepage + service pages (low effort, forward bet) | Validates |

**Category exit:** AEO Readiness 10 · Content Quality locked at 10.

---

## Phase 6 — Verification, monitoring & index recovery (ongoing, light)

| # | Task | Cadence |
|---|------|---------|
| 6.1 | **T-06** GSC domain property (DNS TXT via Vercel DNS — env `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` already wired), submit sitemap, URL-inspect the 4 biggest legacy URLs to confirm 308s | Once, then weekly Page-Indexing check ×6 weeks |
| 6.2 | Lighthouse + PSI re-run after P1 (expect 95+/100/100/100 mobile); pull CrUX as field data accrues | After each phase |
| 6.3 | Rank tracking: "[city] senior photographer", "[city] family photographer", "senior pictures [school name]" ×7 cities | Weekly (free: GSC queries report) |
| 6.4 | AI citation spot-check: ChatGPT/Perplexity/Google AI Mode "best senior photographer near Danville VA" | Monthly |
| 6.5 | SPF/DKIM for Workspace + Resend sending domain (from Brain launch notes) | Once |
| 6.6 | Old origin decommission: content is recovered → old Cloudflare zone can be deleted whenever access allows; GHL already inaccessible | When possible |
| 6.7 | Re-run `/seo-auditor` full audit; every category 10/10 is the exit criterion for this plan | After P5 |

---

## Dependencies needing a human (collect once, unblocks everything)

1. **Confirmed social handles** (gates 3.1) — likely `@emilykathrynphotos` IG/TikTok.
2. **Real phone number** (gates 4.6; SAB rule keeps it hidden until then).
3. **Real pricing** (gates llms.txt pricing line, Investment page un-hiding).
4. **GBP verification** access + private street address (gates 4.1).
5. **Emily's proof numbers** — years, sessions, schools (gates 3.6).
6. **Real ratings?** If clients left starred reviews anywhere, 2.2 can add reviewRating; otherwise quotes-only.
