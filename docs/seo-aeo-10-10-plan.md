# Road to 10/10 — SEO & AEO Master Plan

**Goal:** every category of the SEO/AEO audit at 10/10. Authoritative audit: **`Skills/SEO-Auditor/Output/SEO-AUDIT-emilykathryn.com-v3.md`** (2026-08-01, post-Phase-1 re-audit; supersedes v2's scores, carries its history).
**Method:** phases, each independently shippable as one PR (main requires PR + passing "Validate project" CI). Knock them out one at a time, in order — each phase's acceptance criteria are the definition of done.

**Standing constraints (do not violate):**
- **SAB rule:** no street address on site or in schema, ever — Emily is a service-area business; the street goes to Google privately via GBP only. Phone stays hidden until the real number lands in `siteConfig.ts`. (The audit items suggesting street/phone additions are superseded by this rule.)
- **Free tiers only.** No paid tools, fonts, or services.
- **Pricing is unconfirmed** ($400 Sanity fallback is placeholder; $799/$899 are research anchors). Nothing new that states prices ships until Jeff confirms — this gates parts of llms.txt and the Investment page.
- Sanity is the eventual home for content; hardcoded fallbacks are the current pattern. Either is acceptable for a phase — don't block content on CMS plumbing.

**State after the 2026-08-01 build-out (PRs #22 #23 #24 #25 #26, all verified live):** every on-site lever that could ship without human inputs has shipped. Live sweep confirms: exactly **one** business entity on every page, **zero** rating assertions, 3 indexable guides, sitemap at 20 URLs with honest lastmod, llms.txt ×2, homepage FAQ, /gretna live, 8 unique city OG cards, Person + founder + breadcrumbs + WebPage dates throughout. What still separates the site from 10-across-the-board is exactly the human-dependency list at the bottom of this file plus: GSC submission (Google re-auth), the CSP enforce flip (needs its clean week + GA4/Clarity activation), PSI/CrUX confirmation of mobile perf (lab measurement on the local rig is anomalous; see 6.9), and the v4 re-audit (6.7).

**Category scores → target (v3 re-audit, 2026-08-01, taken BEFORE the same-day build-out above):**

| Category | v2 | **v3 now** | Remaining path to 10 |
|----------|:---:|:---:|:---|
| Technical Foundation | 4 | **9** | 2.7 lastmod · 1.5 icon alias · 1.5 journal link |
| Crawlability | 5 | **8** | GSC submit (§6.1a, blocked on re-auth) → verified index recovery |
| Performance | 8 | **8** | PERF-04 project (below) — Jeff decision gate |
| On-Page SEO | 7 | **9** | 1.5 keyword subtitle + desc trim |
| Structured Data | 6 | **7** | 1.5 (SD-06 defuse, logo, Person) + P3 (entity merge, breadcrumbs, sameAs) |
| Content Quality | 5 | **7** | 2.6 /terms · 4.4 /gretna · P5 guides |
| Images & Media | 6 | **9** | 4.9 unique city OG images |
| AEO Readiness | 5 | **6** | P5 wholesale (homepage FAQ first) |
| E-E-A-T & Trust | 5 | **7** | 1.5 Person · handles confirmation · 3.6 proof numbers · P4 GBP loop |
| Local SEO | 6 | **7** | P4 wholesale (GBP is the lever) |
| Mobile | 8 | **9** | rides on PERF-04 only |
| Accessibility | 7 | **9** | 1.5 hamburger markup fix → W3C 0 errors |
| Security | 5 | **8** | 6.8 CSP enforce after clean week (Observatory B→A-) |

**PERF-04 — the scoped mobile-performance project (Jeff decision gate).** Mobile 88 / LCP 3.5s vs target 95 / 2.5s; desktop is 100. Measurement has already ruled out the assets: the LCP element is the **header logo** (fetchpriority shipped in #19; hero exonerated at 41KB/254ms; payload healthy at 615KB). Remaining levers in yield order: (1) `<link rel="preload">` for the logo in the root head, (2) logo as AVIF/WebP (~22KB→~9KB), (3) client-component JS audit — TestimonialCarousel/GalleryClient/RevealOnScroll candidates for server-side or lazy hydration off the ~154KB first-load, (4) cap hero entrance-animation delays (H1 sits at `opacity: 0` for 0.9s and becomes the LCP ceiling once the logo is fixed). Decide whether mobile-95 is worth the project; 88/100-desktop is already top-decile for portfolio sites.

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

## Phase 1 — Technical & polish sprint ✅ BUILT 2026-08-01 (branch `feat/phase1-technical-polish`)

Everything mechanical that gets Technical/Security/A11y/Performance/Mobile to 10.

| # | Task | File(s) | Acceptance | Status |
|---|------|---------|-----------|--------|
| 1.1 | **S-01** Security headers: X-Content-Type-Options nosniff, X-Frame-Options DENY, Referrer-Policy strict-origin-when-cross-origin, Permissions-Policy camera=(), microphone=(), geolocation=(self) | `next.config.ts` `headers()` | Observatory ≥ B+ | ✅ all 4 verified on the wire |
| 1.2 | **T-05/M-03** Branded 404: hero-style layout, header/footer, links to /senior-portraits, /family-portraits, /contact | `src/app/not-found.tsx` (new root) + `NotFoundContent.tsx` shared with `(site)/not-found.tsx` | 404 shows brand page, single title tag | ✅ 404 status, exactly 1 `<title>` |
| 1.3 | **T-08** Apple touch icon 180×180 from `logo-submark.png` (white bg) | `src/app/apple-icon.png` | `/apple-icon.png` 200 | ✅ 200 image/png, `sizes="180x180"` link emitted |
| 1.4 | **A-01** Footer contrast ≥ 4.5:1 | `Footer.tsx` | Lighthouse a11y 100, zero contrast fails | ✅ a11y **100**; `/30`→`/60`, `/40`→`/60`, `/50`→`/70` |
| 1.5 | **A-02** Footer "ek." link needs an accessible name | `Footer.tsx` | Lighthouse link-name passes | ✅ `aria-label` on link, `aria-hidden` on SVG |
| 1.6 | **PERF-01** Hero LCP: `priority` + accurate `sizes`; `quality={60–65}` | `components/home/Hero.tsx` | Lab mobile LCP ≤ 2.5s, perf ≥ 95 | ⏳ `quality={65}` + `fetchPriority="high"` added; **LCP must be measured on production** |
| 1.7 | **M-04** Trim /smith-mountain-lake title to ≤ 60c | `(site)/[city]/page.tsx` `generateMetadata` | Title ≤ 60c | ✅ SML now 57c; all 7 cities ≤ 59c |
| 1.8 | **S-01b** CSP in Report-Only first, flip to enforcing after a clean week | `next.config.ts` | No CSP violations in report-only | ⏳ shipped Report-Only, **zero violations locally**; needs a prod week before enforcing |
| 1.9 | **PERF-02** Explicit dimensions/aspect-ratio wrappers on gallery images | `GalleryGrid.tsx` | unsized-images audit passes | ✅ wrapper `aspect-ratio` from real metadata + non-undefined fallback |

**Verified locally** (prod build on :3100): Lighthouse **accessibility 100 · SEO 100 · best-practices 96**, canonicals intact on `/`, `/about`, `/danville`, `/senior-portraits`, all 21 gallery images laid out at correct ratios.

### Measured on production after deploy (PR #18 + #19, 2026-08-01)

Lighthouse mobile against `https://emilykathryn.com/`, trace hosts confirmed to be emilykathryn.com (the check that caught the baseline misattribution):

| | Before P1 | After #18 | After #19 | Target |
|---|:---:|:---:|:---:|:---:|
| Performance | 90 (pre-redesign) | 79 | **88** | 95 |
| Accessibility | 91 | **100** | **100** | 100 ✅ |
| Best practices | — | **100** | **100** | — ✅ |
| SEO | — | **100** | **100** | — ✅ |
| LCP | 3.2s | 3.7s | **3.5s** | ≤ 2.5s |
| TBT | — | 340ms | **100ms** | — |
| CLS | 0 | **0** | **0** | 0 ✅ |

**⚠️ PERF-01 is NOT met. Performance 88 and LCP 3.5s both miss the 95 / 2.5s target — Performance is the one category Phase 1 did not carry to 10.**

What the measurement established, so the next attempt does not re-tread it:
- **The LCP element is the header logo, not the hero photo.** Lighthouse's `lcp-discovery-insight` named it: `header.fixed > nav > a > img.w-auto` (`/brand/logo-stacked.png`, 230×144). The hero sits behind a gradient at `opacity-70`, so it never wins LCP.
- The hero is genuinely fast and needs no further work: `quality={65}` delivers 41KB in 254ms.
- #19 fixed the one thing Lighthouse flagged (`fetchpriority=high` absent → now present) and took perf 79 → 88, TBT 340ms → 100ms. Some of the TBT gain is likely run-to-run variance; treat 88 as approximate.
- The logo is correctly sized already (507×318 source for a 230×144 render at 2x), so resampling it buys nothing.
- **Remaining gap is the critical render path, not any single asset**: total payload is a healthy 615KB over 38 requests with no Lighthouse opportunity above 31KB. Closing 88 → 95 means reducing JS on the critical path, which is a scoped performance project rather than a polish item. Worth deciding whether 95 is the right bar for a photography site before spending on it.

**Also still open:**
- Mozilla Observatory grade (expect B+, then A- once CSP enforces)
- One clean week of CSP report-only before flipping the header name to `Content-Security-Policy` and re-adding `upgrade-insecure-requests` (inert and console-noisy in report-only, so deliberately left out)
- The CSP allowlist has not been exercised by GA4 or Clarity — both dormant until Jeff supplies IDs. Re-read the console once they go live.

**Category exits:** Technical 10 · Security 10 (after 1.8 enforce) · Accessibility 10 · Mobile 10 · Images 10 · **Performance 8, still open.**

---

## Phase 1.5 — v3 quick wins ✅ SHIPPED 2026-08-01 (PR #22, verified live)

Everything the v3 audit surfaced that needs no input from Jeff/Emily and no observation window. Pulls the non-gated parts of Phase 3 forward.

| # | Task | File(s) | Acceptance |
|---|------|---------|-----------|
| 1.5.1 | **SD-06 (High, latent)** Defuse the review builder: remove hardcoded `ratingValue: 5` and the synthetic `AggregateRating` — quote-only `Review` is the approved shape (was 2.2). Then wire the 8 real testimonials from `testimonialContent.ts` into quote-only Review blocks on /raves, `itemReviewed` → `#business` | `src/lib/schemas/review.ts`, raves page | Rich Results: Reviews valid, **zero rating values anywhere**; populating Sanity can no longer fabricate stars |
| 1.5.2 | **A-03** Hamburger `div`-in-`button` → `span` (sole W3C error) | `HeaderClient.tsx` | W3C Nu: 0 errors |
| 1.5.3 | **SD-05** `logo: /brand/logo-primary.png` on both business schema builders | `localBusiness.ts` | property present, file 200 |
| 1.5.4 | **SD-02** Person schema for Emily on /about: name, jobTitle, worksFor→`#business`, knowsAbout, image. **No sameAs yet** (handles unconfirmed — added in 3.1) | new `schemas/person.ts`, about page | validates |
| 1.5.5 | **M-01** Keyword-bearing subtitle: upgrade the hero's editorial label to "Senior & Family Portraits · South-Central Virginia" (H1 hook untouched) | `Hero.tsx` call site | label visible, contains service+geo |
| 1.5.6 | **M-05** Trim /senior-portraits description 191c → ≤160c | senior-portraits page | ≤160c |
| 1.5.7 | **T-09** Redirect `/apple-touch-icon.png` + `-precomposed` → `/apple-icon.png` | `next.config.ts` | both 308→200 |
| 1.5.8 | **T-10** Footer "Journal" link under Explore (kills the sitemap-listed-but-orphaned inconsistency; P5 relinks it anyway) | `siteConfig.ts` nav or `Footer.tsx` | /journal reachable by internal link |

**Category exits:** Accessibility 10 · On-Page 10 · Structured Data → 8 (rest in P3).

---

## Phase 2 — Content restoration (raves + journal) (one PR, ~1 day)

Source material is already in `docs/legacy-content/` — this phase is porting, not writing from scratch.

**v3 status: mostly overtaken by events.** #14 restored 5 journal posts (2.3/2.4 ✅ — BlogPosting + real dates + 1:1 redirects 2.5 ✅), then #16 rebuilt /raves with 8 real attributed testimonials (2.1 ✅ at 999 words) and **retired the journal posts to `noindex, follow`** (decision: archive posts no longer sell what Emily sells). 2.2 is superseded by 1.5.1's quote-only implementation. What survives:

| # | Task | Acceptance |
|---|------|-----------|
| 2.6 | **C-04** /terms page (session agreement summary, print release, image usage); retarget the `/terms-conditions` redirect (currently parks on /privacy) | /terms 200, in sitemap |
| 2.7 | **T-07** Sitemap lastmod from real content dates (per-page constants or Sanity `_updatedAt`) | lastmod varies per URL |
| 2.8 | *(optional)* /about +150 words of specifics — pairs with 3.6 proof numbers when Emily supplies them | about ≥ 600 words |

**Category exit:** Content Quality 10 arrives with P5's guides + 4.4's /gretna, not here.

---

## Phase 3 — Schema & entity graph — non-gated half ✅ SHIPPED 2026-08-01 (PR #23)

Shipped and verified live: 3.3 entity merge (city pages now emit exactly **one** ProfessionalService; the per-city block became a `Service` with `provider → #business` and City+geo `areaServed`) · 3.5 breadcrumbs on city + service pages · business `image` array (OG + 3 portfolio photos) · `founder → /about#emily`.

⚠️ **Still gated on Jeff/Emily: 3.1 (sameAs handles) and 3.6 (proof numbers).** Audit evidence says live accounts are `@emilykathrynphotos` (IG, 2,184 followers; TikTok same) while the site links `@emilykathrynphotography` (only Facebook uses that handle). Confirm, don't assume.

| # | Task | Acceptance |
|---|------|-----------|
| 3.1 | **SD-01/EEAT-01** Correct IG/TikTok URLs in footer + `sameAs`; add the other live profiles (YouTube `@Emilykathryn`, Pinterest `emilykathrynva`, SmugMug); add the confirmed handles to 1.5.4's Person `sameAs` | Every link resolves to a live profile |
| 3.2 | ~~Person schema~~ → shipped un-gated in 1.5.4; this slot is now just the `founder` ref from the business block to the Person `@id` | Validates |
| 3.3 | **SD-04** City pages: merge the duplicate ProfessionalService entities — city block keeps geo/areaServed specificity but shares the canonical `#business` `@id` (or becomes `department` of it) | **One** business entity per page, Rich Results clean |
| 3.4 | ~~logo~~ → shipped in 1.5.3; this slot is now the `image` array (3–4 representative session photos) on the business block | Validates |
| 3.5 | **SD-07** BreadcrumbList on city + service pages | Validates |
| 3.6 | **EEAT-02** One proof line per service page (real numbers from Emily: years shooting, seniors photographed, schools served) | Present on both service pages |

**Category exit:** Structured Data 10 · E-E-A-T to 8 (10 after P4's GBP reviews loop).

---

## Phase 4 — Local SEO & GBP (mostly off-site; needs Jeff/Emily) (~half day active)

The step-by-step guides already exist: `docs/google-business-profile-setup.md` + `docs/apple-business-connect-setup.md`.

**On-site half ✅ SHIPPED 2026-08-01:** 4.4 `/gretna` live (deepest city page: home-base story, Gretna High continuity, 5 FAQs, **no pricing** since the page is new content and pricing is unconfirmed; auto-joined sitemap/footer/llms.txt; Gretna added to business `areaServed`) · 4.5 the four templated city closers rewritten, each anchored to one real location (courthouse streets, River District, foothills/brick, the docks) · 4.9 all 8 city pages now have unique OG cards generated from real session photos (`/og/cities/*.jpg`). **Remaining rows below are the off-site half and need Jeff/Emily.**

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
| 4.9 | **I-04 (v3)** Unique OG images for the 7 city pages (session photo from/near each city + city name), replacing the shared `/og/default.jpg` | each city og:image unique, 200 |

**Category exit:** Local SEO 10 · E-E-A-T 10 (review velocity flowing) · Images 10.

---

## Phase 5 — AEO build-out ✅ SHIPPED 2026-08-01 (one PR: homepage FAQ, llms.txt ×2, dates, 3 guides, Speakable)

All items below shipped except the pricing lines, which stay out until pricing confirms. The three guides are live at `/journal/when-to-book-senior-photos-virginia`, `/journal/what-to-wear-senior-pictures`, `/journal/how-to-choose-senior-photographer`: indexable (the archive posts stay noindex), in the sitemap with real lastmod, BlogPosting with `author → Person` + dateModified, FAQ schema each, breadcrumbs, cited from the senior page's FAQ rail. Sitemap is now 19 URLs. 2.7 (real lastmod sitemap-wide) shipped in the same PR.

| # | Task | Acceptance |
|---|------|-----------|
| 5.0 | **AEO-04 (elevated per v3 — Jeff asked, answer is yes)** Homepage FAQ section (4–6 Qs, editorial styling) with FAQPage schema — the only key page without it, and the page AI engines cite first. Suggested Qs: who/where/what-areas, booking lead time, what-happens-at-a-session, prints-vs-digitals. Pricing Q only after pricing confirms | Validates; homepage carries FAQPage |
| 5.1 | **AEO-01** `llms.txt` route handler: business summary, service pages, city list, contact — absolute URLs. **Pricing line only after Jeff confirms real pricing** | /llms.txt 200 text/plain, accurate |
| 5.2 | llms-full.txt with expanded per-page descriptions | 200, consistent with llms.txt |
| 5.3 | **AEO-02** `dateModified` on service/city pages (from Sanity/_manual constants) | In schema on all key pages |
| 5.4 | **AEO-03** 3 answer-shaped journal guides, each opening with a 2-sentence direct answer + FAQ schema: "When should you book senior photos in Virginia?" / "What to wear for senior pictures" (distill from /style-guide) / "How to choose a senior photographer" | Each ≥ 800 words, FAQ markup, cited internally from service pages |
| 5.6 | Speakable schema on homepage + service pages (low effort, forward bet) | Validates |

**Category exit:** AEO Readiness 10 · Content Quality locked at 10.

---

## Phase 6 — Verification, monitoring & index recovery (ongoing, light)

| # | Task | Cadence |
|---|------|---------|
| 6.1 | **T-06** GSC domain property (DNS TXT via Vercel DNS — env `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` already wired), submit sitemap, URL-inspect the 4 biggest legacy URLs to confirm 308s | Once, then weekly Page-Indexing check ×6 weeks |
| 6.1a | **Submission queue** — sitemap first (no quota cost), then Request Indexing in this order. Daily quota is ~10–12 URLs, so day 1 stops at #11. **Journal posts are excluded on purpose**: they are `noindex, follow` and out of the sitemap as of #16, so submitting them would contradict the directive. **Status 2026-08-01:** domain re-verified (new DNS TXT added to Vercel DNS; keep both google-site-verification records). **Sitemap submitted successfully** (20 URLs). Request Indexing: **0 of 11 sent — account-level daily quota was already exhausted** (shared across properties on jeff@nxtlvl-digital.com; the Hughes property's indexing backlog consumes it daily). Diagnostics: homepage "URL is on Google"; `/meet-emily` last crawled **Jul 29, pre-redirect** ("Crawled - currently not indexed"), so Google hasn't seen the 308s yet; Pages baseline **9 indexed / 40 not indexed** (report dated 7/23, pre-launch). **Protocol (Jeff, 2026-08-01): parallel max-out FIRST, sequencing only as fallback.** Day 1 (2026-08-02 ~7:57 AM): submit the 11-URL queue (`/gretna` replaces `/forest` in slot 11 — the one page Google has never seen) while Hughes independently runs its own; both succeeding proves per-property quota and both clients run daily in parallel. EKP 11/11 with Hughes then failing proves shared quota → fallback: EKP pauses, Hughes finishes its backlog (≈08-05), EKP resumes evenings from 08-06. EKP 0/11 before Hughes ran → new-owner throttle, retry mornings. **Outcome: 0/20 submitted after three consecutive zero-quota days (08-01/02/03) — diagnosed as a post-verification owner throttle, and Jeff TABLED the decision 2026-08-04.** The workstream now has its own handoff with the full resume procedure, 20-URL order, options, and re-open triggers: **`docs/gsc-indexing-handoff.md`**. The sitemap (submitted 08-01, Success) drives recrawl regardless. |
| 6.2 | Lighthouse + PSI re-run after P1 (expect 95+/100/100/100 mobile); pull CrUX as field data accrues | After each phase |
| 6.3 | Rank tracking: "[city] senior photographer", "[city] family photographer", "senior pictures [school name]" ×7 cities | Weekly (free: GSC queries report) |
| 6.4 | AI citation spot-check: ChatGPT/Perplexity/Google AI Mode "best senior photographer near Danville VA" | Monthly |
| 6.5 | SPF/DKIM for Workspace + Resend sending domain (from Brain launch notes) | Once |
| 6.6 | Old origin decommission: content is recovered → old Cloudflare zone can be deleted whenever access allows; GHL already inaccessible | When possible |
| 6.7 | Re-run `/seo-auditor` full audit (v4); every category 10/10 is the exit criterion for this plan | After P5 |
| 6.8 | **S-02** Flip CSP from Report-Only to enforcing + re-add `upgrade-insecure-requests`; re-scan Observatory (expect B→A-) | After 1 clean prod week **and** after GA4/Clarity activate |
| 6.9 | **PERF-04** — levers 1/2/4 shipped 2026-08-01 (PR #24: head preload, lossless WebP logo 22→13KB, hero delays halved). TBT now 10ms, CLS 0. **Lab mobile stuck at 89 due to a measurement anomaly, not a site defect**: observed first paint is ~2.3s ONLY when Lighthouse runs against production under mobile emulation on this rig; the identical build on localhost paints at 137ms, desktop at 312ms, and a warmed /privacy at 259ms. JS-audit lever skipped as moot (render delay dominates; TBT already 10ms). **Next measurement: PSI API when its quota resets, then CrUX field data (~3-4 weeks) — field data is what ranking actually uses.** | PSI + CrUX confirm ≥ 95, or field LCP ≤ 2.5s |

---

### 6.1a — GSC submission queue (ready to run)

Live sitemap is **16 URLs** as of 2026-08-01 (journal posts correctly absent). Submit `https://emilykathryn.com/sitemap.xml` first — sitemap submission costs no indexing quota. Then Request Indexing in this order, ranked by commercial intent and how much each page changed in the relaunch:

| # | URL | Why here |
|---|---|---|
| 1 | `/` | Homepage. Brand queries and the entry point for everything |
| 2 | `/senior-portraits` | Primary money page, the bulk of the business |
| 3 | `/family-portraits` | Second money page |
| 4 | `/contact` | The conversion endpoint; worthless if unindexed |
| 5 | `/danville` | Largest city in the immediate service area, high commercial intent |
| 6 | `/lynchburg` | Largest metro in the service area |
| 7 | `/about` | Carries E-E-A-T and the Emily-name queries |
| 8 | `/raves` | Rebuilt with 8 real testimonials in #16, so the indexed copy is stale |
| 9 | `/chatham` | Home-area city page |
| 10 | `/smith-mountain-lake` | Affluent destination market |
| 11 | `/forest` | Remaining city with the most search volume |

**Day 2** (quota resets): `/altavista`, `/evington`, `/style-guide`, `/journal`, `/privacy`.

**Do not submit** the 5 `/journal/*` post URLs. They are `noindex, follow` and were removed from the sitemap in #16; requesting indexing would send Google a directly contradictory signal.

Also worth doing in the same session: URL-inspect `/home`, `/meet-emily`, `/experience`, `/gallery` to confirm Google sees the 308s (all verified serving correctly on 2026-08-01).

---

## Dependencies needing a human (collect once, unblocks everything)

1. **Confirmed social handles** (gates 3.1) — likely `@emilykathrynphotos` IG/TikTok.
2. **Real phone number** (gates 4.6; SAB rule keeps it hidden until then).
3. **Real pricing** (gates llms.txt pricing line, Investment page un-hiding).
4. **GBP verification** access + private street address (gates 4.1).
5. **Emily's proof numbers** — years, sessions, schools (gates 3.6).
6. **Real ratings?** If clients left starred reviews anywhere, 2.2 can add reviewRating; otherwise quotes-only.
