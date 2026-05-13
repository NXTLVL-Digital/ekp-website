# Current SEO, AEO, and GEO Audit

**Emily Kathryn Photography | Search and Answer Engine Audit**  
**Prepared:** May 4, 2026  
**Prepared by:** NXTLVL Digital

**Brand frame:** Editorial senior portraiture, boutique service, parent trust, and confident self-expression.

---

## Executive Summary

Emily Kathryn Photography has a strong emotional offer: high school senior portraits that make girls feel confident, beautiful, and remembered. The current live site communicates that promise, but the technical foundation limits how much search engines and AI answer engines can trust, extract, and cite it.

The largest issues are not visual. They are structural. The homepage is the only page with meaningful metadata in the source HTML. Several important pages expose empty SEO fields in the initial source. The sitemap includes a test URL. The homepage schema contains address conflicts. The site has duplicated body copy, weak heading hierarchy, and no answer-engine-ready FAQ or comparison structure.

The redesign should keep the boutique emotional positioning, but rebuild it as crawlable, page-specific content with local landing-page depth, stronger parent-facing buying clarity, and clean schema.

## Scorecard

| Category | Score | Key Issue |
| --- | ---: | --- |
| Technical Foundation | 5/10 | HTTPS works, but redirects chain from HTTP to www to non-www. Sitemap includes a test path. |
| Crawlability | 5/10 | Core pages exist, but important metadata is missing from several page source responses. |
| Performance | 4/10 | Homepage source is about 696 KB before images and loads many third-party scripts. PageSpeed API was unavailable. |
| On-Page SEO | 4/10 | Homepage title targets Danville seniors, but subpages lack page-level SEO in source. |
| Structured Data | 3/10 | Homepage has LocalBusiness JSON-LD, but NAP conflicts and no FAQ, Person, Service, or Breadcrumb schema. |
| Content Quality | 5/10 | Good emotional copy exists, but duplicate blocks and thin page structures reduce authority. |
| Images and Media | 6/10 | Photography is visually strong, but filenames/alt strategy needs consistent keyword and accessibility work. |
| AEO/GEO Readiness | 3/10 | No llms.txt found, no AI-readable Q&A blocks, and limited direct-answer content. |
| E-E-A-T and Trust | 5/10 | Testimonials and founder story are strong, but credentials, process proof, and review signals need structure. |
| Local SEO | 4/10 | Service areas are named, but city-specific pages and NAP consistency are missing. |
| Mobile | 5/10 | Current site is responsive, but source includes validator issues and heavy scripts. |
| Accessibility | 4/10 | Validator found invalid HTML/CSS patterns; source headings are weak and duplicated. |
| Security | 6/10 | HTTPS and Cloudflare are present; deeper security header scan was not completed. |

## Technical Checklist

| Check | Status | Evidence |
| --- | --- | --- |
| HTTPS enforced | Partial | HTTP redirects to https://www, then to https://emilykathryn.com. |
| Preferred canonical host | Partial | Final host is non-www, but robots points to non-www while some crawls use www. |
| robots.txt present | Pass | Allows all except /private/ and /admin/. Sitemap declared. |
| sitemap.xml present | Partial | 8 URLs found, including /test_path?item=123. |
| Page-level metadata | Fail | Homepage has metadata. Meet, Experience, Gallery, Contact, Raves, and Blog source responses expose empty SEO fields. |
| JSON-LD schema | Partial | Homepage LocalBusiness exists, but address conflicts with contact page. |
| FAQ schema | Fail | No FAQPage schema found. |
| llms.txt | Fail | No llms.txt or llms-full.txt observed. |
| W3C validation | Fail | 398 messages on homepage validation; 397 were errors. |
| PageSpeed API | Unavailable | Google API returned quota exceeded on May 4, 2026. |

## Critical Issues

### Remove the test URL from the sitemap

The sitemap includes `https://emilykathryn.com/test_path?item=123`. This should not be submitted to Google. It wastes crawl attention and can look like a staging or test artifact.

### Fix NAP conflicts across schema, contact page, and business constants

The current contact page lists Jeff and Emily Walker at 8285 Chalk Level Rd, Gretna, VA 24557. The homepage schema references the same street but lists Danville, VA 24540. Local SEO depends on consistent name, address, and phone data. The redesign should use one verified NAP everywhere: footer, contact page, LocalBusiness schema, Google Business Profile, and llms.txt.

### Restore unique metadata on every public page

The homepage source includes a title and description. The other fetched pages show empty title and description fields in source-level page SEO. Every important page needs a unique title, meta description, canonical URL, Open Graph image, and Twitter image.

## Phase 1: Technical Foundation

- Use one canonical host. Recommended: `https://www.emilykathryn.com` or `https://emilykathryn.com`, but not both.
- Remove `/test_path?item=123` from sitemap generation.
- Add self-referencing canonical tags to every page.
- Add a clean 404 page that links back to Senior Portraits, Family Portraits, Gallery, and Contact.
- Keep robots.txt simple, but add explicit sitemap and avoid blocking AI crawlers unless that is intentional.

## Phase 2: Crawlability and Indexation

- Build the redesign with server-rendered or static HTML for all core pages.
- Keep the core value proposition, service copy, FAQ answers, and testimonials visible in initial HTML.
- Avoid putting critical content only inside client-side builders, sliders, or script payloads.
- Add internal links from the homepage to each core service page and from each service page to Contact.

## Phase 3: Page Speed and Core Web Vitals

PageSpeed data could not be retrieved because the public API returned quota exceeded. Observable issues still matter:

- Homepage source size was about 696 KB before loading images and external scripts.
- Current source includes Google Tag Manager, Hotjar, jQuery, OwlCarousel, Cloudflare beacon, and many builder scripts.
- The redesign should use native CSS and minimal JavaScript for galleries and navigation.
- Use responsive image sizes, lazy-load below-fold images, and preload only the primary hero image.

## Phase 4: On-Page SEO

Recommended target pages:

| Page | Primary Search Intent | Recommended Title |
| --- | --- | --- |
| Home | Senior and family photographer in South-Central Virginia | Emily Kathryn Photography | Senior and Family Photographer in Virginia |
| Senior Portraits | High school senior photographer Danville / Lynchburg / Gretna | Senior Portrait Photographer in Danville, Lynchburg and Gretna VA |
| Family Portraits | Family photographer Danville / Gretna / Lynchburg | Family Photographer in South-Central Virginia |
| Investment | Senior portrait pricing and experience | Senior Portrait Investment | Emily Kathryn Photography |
| About | Trust and founder story | Meet Emily | South-Central Virginia Senior Photographer |
| Gallery | Portfolio proof | Senior Portrait Gallery | Danville and Lynchburg VA |
| Contact | Conversion | Inquire With Emily Kathryn Photography |

## Phase 5: Structured Data and Schema

Add a page-specific schema set:

- `LocalBusiness` on all pages with verified NAP.
- `Person` for Emily on About and Home.
- `Service` for Senior Portraits and Family Portraits.
- `FAQPage` on Senior Portraits, Investment, and Contact.
- `BreadcrumbList` on all non-home pages.
- `ImageObject` for featured galleries.
- `Review` or `AggregateRating` only if review data is verified and policy-compliant.

## Phase 6: Images and Media

- Use descriptive filenames before upload: `danville-va-senior-portrait-floral-field.jpg`, not generic camera names.
- Add image alt text that describes the person, setting, and location when relevant.
- Keep decorative logos empty-alt if they are repeated and not informational.
- Create page-specific social images for senior portraits, family portraits, investment, and contact.

## Phase 7: Content Quality and Internal Linking

The current copy has strong emotional language but repeats itself on several pages. The redesign should use each page for a distinct job:

- Home: qualify the audience and route to senior/family paths.
- Senior Portraits: explain the experience, transformation, timeline, products, and FAQs.
- Family Portraits: establish the family offer separately instead of treating it as secondary.
- Investment: clarify starting price, what is included, and what comes next.
- About: build trust through Emily's story, values, experience, and client care.
- Gallery: prove range by location, style, season, and personality.
- Contact: reduce friction and set expectations for reply time, planning call, and booking windows.

## Phase 8: E-E-A-T and Trust Signals

- Put Emily's years of experience near the top of About and Senior Portraits.
- Add proof points: 12+ years, all-inclusive sessions, heirloom products, in-person ordering, senior magazine, and testimonials.
- Add named high schools and locations where sessions have happened, where permission allows.
- Use parent-specific proof: safety, planning, wardrobe help, posing guidance, delivery timeline, print/product help.

## Phase 9: AEO and GEO Optimization

For AI answer engines, the site needs content that answers direct questions in plain language.

Add answer blocks such as:

- What does a senior portrait session with Emily Kathryn include?
- How far in advance should I book senior pictures in South-Central Virginia?
- Where does Emily Kathryn Photography take senior portraits?
- What should I wear for senior pictures?
- Do parents receive help choosing prints and albums?
- What is the difference between a digital-only photographer and a boutique senior portrait experience?

Each answer should be 2 to 4 sentences, followed by detail. Add FAQ schema and use stable URLs.

## Phase 10: Local SEO

Recommended local pages:

- `/danville-va-senior-photographer`
- `/lynchburg-va-senior-photographer`
- `/gretna-va-senior-photographer`
- `/chatham-va-senior-photographer`
- `/altavista-va-senior-photographer`

Each page should include unique location copy, local gallery examples, nearby high schools, travel notes, and a relevant FAQ. Avoid duplicating the same paragraph with only city names changed.

## Phase 11: Mobile and UX

- Keep nav simple: Senior Portraits, Family Portraits, Gallery, Investment, About, Contact.
- Make the inquiry CTA persistent but not intrusive.
- Avoid tiny script-style text for important conversion copy.
- Use dense but elegant service information for parents who are comparing investment and process.

## Phase 12: Accessibility

- Ensure one H1 per page.
- Use real text instead of text baked into images.
- Maintain visible focus states for keyboard navigation.
- Keep contrast high when using blush and aqua.
- Avoid invalid HTML structures such as divs inside buttons.

## Phase 13: Security and Tracking

- Keep analytics lightweight.
- Remove any placeholder tracking code variables before launch.
- Add a privacy-safe cookie/analytics stance if Hotjar remains.
- Consider security headers: Content-Security-Policy, X-Content-Type-Options, Referrer-Policy, and Permissions-Policy.

## Redesign Requirements Derived From Audit

- Build static or server-rendered pages with real headings and page copy.
- Add page-level SEO metadata and schema.
- Create city/service content without duplicating blocks.
- Make the buying path parent-clear: starting price, included planning, products, delivery, and booking timing.
- Preserve the high-end visual brand, but make the site easier to crawl, quote, and choose.

## Sources and Evidence

- Current site homepage: https://www.emilykathryn.com/ (accessed May 4, 2026)
- Current Experience page: https://emilykathryn.com/experience (accessed May 4, 2026)
- Current Contact page search result and page content: https://emilykathryn.com/contact (accessed May 4, 2026)
- robots.txt live fetch: https://www.emilykathryn.com/robots.txt (accessed May 4, 2026)
- sitemap.xml live fetch: https://www.emilykathryn.com/sitemap.xml (accessed May 4, 2026)
- W3C Nu HTML Checker result for https://emilykathryn.com (accessed May 4, 2026)
- Google PageSpeed Insights API attempted May 4, 2026; public API returned quota exceeded.
