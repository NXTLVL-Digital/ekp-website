# Phase 4: SEO Infrastructure - Research

**Researched:** 2026-02-24
**Domain:** Structured Data (JSON-LD), XML Sitemap, Robots.txt, ISR Webhook Validation, Google Search Console
**Confidence:** HIGH

## Summary

Phase 4 adds structured data (JSON-LD) to every page type, creates an XML sitemap and robots.txt, validates the existing ISR webhook, and adds Google Search Console verification support. The project already has a generic `JsonLd<T>` component using `schema-dts` for type safety and a functional `/api/revalidate` webhook -- this phase creates specific schema implementations and discovery infrastructure on top of that foundation.

**Critical research findings that affect CONTEXT.md decisions:**
1. **FAQPage rich results are restricted** since August 2023 -- Google only shows FAQ rich snippets for authoritative government/health sites. The JSON-LD is still valid and harmless but will NOT produce visible rich results for a photography business. It still provides machine-readable semantic structure for AI and voice search.
2. **Self-serving Review markup on LocalBusiness/Organization is ineligible** for star-rating rich results in Google. Emily's own site cannot display curated testimonials as Review schema and get stars in SERPs. However, Review entities still provide semantic value for AI assistants and non-Google surfaces.
3. **Speakable schema is beta, US-English news publishers only**, and may be discontinued in early 2026. Not recommended for implementation.
4. **ProfessionalService is deprecated** by Schema.org (confusion with Service type), though schema-dts still exports it and it remains technically valid as a LocalBusiness subtype.

**Primary recommendation:** Implement all schemas as planned (LocalBusiness, Service, FAQPage, Review) since they provide semantic value beyond Google rich results -- but set realistic expectations that only LocalBusiness knowledge panel enhancements are likely to produce visible SERP features. Use `LocalBusiness` with `"@type": "ProfessionalService"` since Google still processes it and it provides the most specific categorization.

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions
- **All decisions should maximize GBP ranking, SERP exposure, and lead generation** -- this is the primary optimization target across every choice in this phase
- **LocalBusiness Schema:** ProfessionalService subtype, Gretna address for verification (hidden per SAB guidelines), areaServed covering all 7 service cities, openingHoursSpecification Mon-Fri 9-5 + Saturday by appointment, paymentAccepted (Cash, Credit Card, Venmo/digital), priceRange for premium portrait photography
- **Service Schema:** JSON-LD on Senior Portraits and Family Portraits pages, linked back to parent LocalBusiness via @id
- **FAQPage Schema:** JSON-LD on Senior Portraits and Family Portraits pages (both have FAQ sections), include Speakable markup for voice search / AEO readiness
- **Review Schema:** Individual Review entities + AggregateRating summary, default all curated testimonials to 5-star rating (no new Sanity field), Claude's discretion on which pages carry Review schema
- **Sitemap:** Include robots.txt with sitemap reference and crawl directives; Claude's discretion on generation method and image sitemap inclusion
- **Google Search Console:** Emily does NOT have GSC set up yet; GOOGLE_SITE_VERIFICATION env var in Vercel renders meta tag automatically; include step-by-step non-technical setup guide for Emily

### Claude's Discretion
- Address visibility strategy in LocalBusiness schema (optimize for GBP ranking)
- Review schema page placement (optimize for SERP rich snippets)
- Sitemap generation approach and image sitemap inclusion
- Exact priceRange value and payment method list
- FAQPage Speakable implementation details
- JSON-LD @id and cross-referencing strategy between schemas

### Deferred Ideas (OUT OF SCOPE)
None -- discussion stayed within phase scope
</user_constraints>

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| SEO-01 | JSON-LD LocalBusiness schema (service area business -- no physical address displayed) on all pages | LocalBusiness with ProfessionalService @type, siteConfig as data source, placed in root layout or shared component; schema-dts WithContext<LocalBusiness> type available |
| SEO-02 | JSON-LD Service schema for Senior Portraits and Family Portraits | schema-dts Service type with provider @id reference to LocalBusiness; placed in service page components |
| SEO-03 | JSON-LD FAQPage schema on pages with FAQ sections | schema-dts FAQPage type; Google restricted rich results to gov/health sites in Aug 2023 but schema still valid for AI/voice search |
| SEO-04 | JSON-LD Review schema for testimonials | schema-dts Review + AggregateRating types; self-serving reviews on LocalBusiness ineligible for Google star snippets but still provide semantic value |
| SEO-08 | XML sitemap generation with all pages | Next.js built-in sitemap.ts convention in app directory; supports image sitemaps natively |
| INFRA-02 | Sanity webhook to trigger ISR revalidation on content changes | Webhook already exists at /api/revalidate with parseBody validation; this phase validates end-to-end flow |
</phase_requirements>

## Standard Stack

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| schema-dts | 1.1.5 | TypeScript types for Schema.org JSON-LD | Already installed; Google-maintained; compile-time type safety with zero runtime cost |
| next (App Router) | 15.5.12 | sitemap.ts, robots.ts, metadata verification | Built-in file conventions for SEO metadata; no external packages needed |
| next-sanity | 11.6.12 | parseBody for webhook signature validation | Already installed; handles HMAC validation of Sanity webhooks |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| (none needed) | - | - | All required libraries are already installed |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| schema-dts types | next-seo | next-seo adds runtime JS; schema-dts is types-only with zero bundle cost. Project already uses schema-dts pattern. |
| Built-in sitemap.ts | next-sitemap | next-sitemap adds build-step complexity; Next.js built-in convention handles this site's scale (< 50 pages) cleanly |
| Manual JSON-LD objects | react-schemaorg | react-schemaorg wraps schema-dts but adds React dependency; direct script tag is what Next.js officially recommends |

**Installation:**
```bash
# No new packages needed -- all dependencies already installed
```

## Architecture Patterns

### Recommended Project Structure
```
src/
├── lib/
│   └── siteConfig.ts           # Canonical NAP data (exists)
│   └── schemas/                 # NEW: JSON-LD schema builder functions
│       ├── localBusiness.ts     # LocalBusiness + ProfessionalService schema
│       ├── service.ts           # Service schema for service pages
│       ├── faqPage.ts           # FAQPage schema
│       └── review.ts            # Review + AggregateRating schema
├── components/
│   └── shared/
│       └── JsonLd.tsx           # Generic renderer (exists)
├── app/
│   ├── sitemap.ts               # NEW: XML sitemap generation
│   ├── robots.ts                # NEW: robots.txt generation
│   ├── (site)/
│   │   └── layout.tsx           # Add LocalBusiness JsonLd + GSC verification
│   │   └── senior-portraits/
│   │       └── page.tsx         # Add Service + FAQPage + Review JsonLd
│   │   └── family-portraits/
│   │       └── page.tsx         # Add Service + FAQPage + Review JsonLd
│   │   └── [other pages]        # Review JsonLd where appropriate
│   └── api/
│       └── revalidate/
│           └── route.ts         # (exists) -- validate end-to-end
└── .env.example                 # Add GOOGLE_SITE_VERIFICATION
```

### Pattern 1: Schema Builder Functions
**What:** Centralized functions that construct typed JSON-LD objects from siteConfig data
**When to use:** Every page that needs structured data
**Why:** Single source of truth for business data; type-safe; testable; no duplication across pages
**Example:**
```typescript
// Source: Next.js JSON-LD guide + schema-dts types
// src/lib/schemas/localBusiness.ts
import type { LocalBusiness, WithContext } from 'schema-dts'
import { siteConfig } from '@/lib/siteConfig'

const BUSINESS_ID = `${siteConfig.url}/#business`

export function buildLocalBusinessSchema(): WithContext<LocalBusiness> {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': BUSINESS_ID,
    name: siteConfig.name,
    url: siteConfig.url,
    telephone: siteConfig.phone,
    email: siteConfig.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: siteConfig.address.street,
      addressLocality: siteConfig.address.city,
      addressRegion: siteConfig.address.state,
      postalCode: siteConfig.address.zip,
      addressCountry: 'US',
    },
    areaServed: [
      { '@type': 'City', name: 'Chatham', containedInPlace: { '@type': 'State', name: 'Virginia' } },
      { '@type': 'City', name: 'Danville', containedInPlace: { '@type': 'State', name: 'Virginia' } },
      // ... all 7 cities
    ],
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '09:00',
        closes: '17:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Saturday',
        opens: '09:00',
        closes: '17:00',
        // "By appointment" communicated via description, not schema
      },
    ],
    priceRange: '$$$',
    paymentAccepted: 'Cash, Credit Card, Venmo',
    image: `${siteConfig.url}/og/default.jpg`,
    sameAs: [
      siteConfig.social.instagram,
      siteConfig.social.facebook,
      siteConfig.social.tiktok,
    ],
  }
}
```

### Pattern 2: @id Cross-Referencing Between Schemas
**What:** Use @id URIs to link Service schemas back to the parent LocalBusiness entity
**When to use:** Service pages that need to express "this service is provided by this business"
**Why:** Creates a connected knowledge graph that search engines and AI can traverse
**Example:**
```typescript
// src/lib/schemas/service.ts
import type { Service, WithContext } from 'schema-dts'
import { siteConfig } from '@/lib/siteConfig'

const BUSINESS_ID = `${siteConfig.url}/#business`

export function buildServiceSchema(service: {
  name: string
  description: string
  url: string
}): WithContext<Service> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.name,
    description: service.description,
    url: service.url,
    provider: { '@id': BUSINESS_ID },
    areaServed: {
      '@type': 'State',
      name: 'Virginia',
    },
  }
}
```

### Pattern 3: Next.js Built-in Sitemap Convention
**What:** Export a default function from `app/sitemap.ts` returning `MetadataRoute.Sitemap`
**When to use:** Generating the XML sitemap for the entire site
**Why:** Zero-dependency, cached by default, supports image sitemaps natively
**Example:**
```typescript
// Source: Next.js official docs (sitemap.xml file convention)
// src/app/sitemap.ts
import type { MetadataRoute } from 'next'

const BASE_URL = 'https://emilykathryn.com'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: `${BASE_URL}/senior-portraits`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE_URL}/family-portraits`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE_URL}/about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/contact`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/investment`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/raves`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.6 },
    { url: `${BASE_URL}/style-guide`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
  ]
}
```

### Pattern 4: Google Search Console Verification via Metadata API
**What:** Use Next.js `verification` metadata field in root layout to render GSC meta tag
**When to use:** Root layout metadata to inject `<meta name="google-site-verification">` site-wide
**Why:** No manual `<head>` manipulation needed; env var keeps the code clean across environments
**Example:**
```typescript
// Source: Next.js generateMetadata API reference (verification field)
// In app/layout.tsx or app/(site)/layout.tsx metadata
export const metadata: Metadata = {
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  },
}
// Renders: <meta name="google-site-verification" content="..." />
```

### Pattern 5: Multiple JSON-LD Blocks Per Page
**What:** Render multiple `<script type="application/ld+json">` tags on a single page
**When to use:** Service pages that need LocalBusiness + Service + FAQPage + Review schemas
**Why:** Google explicitly supports multiple JSON-LD blocks per page; each schema type gets its own script tag for clarity and maintainability
**Example:**
```tsx
// In service page component
<>
  <JsonLd data={buildLocalBusinessSchema()} />
  <JsonLd data={buildServiceSchema({ name: 'Senior Portraits', ... })} />
  <JsonLd data={buildFaqPageSchema(seniorFaqs)} />
  <JsonLd data={buildReviewSchema(testimonials)} />
  {/* ... page content ... */}
</>
```

### Anti-Patterns to Avoid
- **Duplicating business data across schema builders:** Extract all NAP data from siteConfig.ts; never hardcode business info in schema functions
- **Using react-schemaorg or next-seo for JSON-LD:** Adds unnecessary runtime JS; the existing JsonLd component with schema-dts types is the correct pattern per Next.js official guidance
- **Putting all schemas in a single mega-object:** Multiple smaller JSON-LD blocks are easier to maintain, test, and validate than one nested object
- **Adding Review schema to LocalBusiness schema object:** Self-serving reviews nested in LocalBusiness are explicitly ineligible for Google rich results; keep them as separate Review entities
- **Using @graph for connecting schemas:** While valid, @graph adds complexity; individual @id cross-references between separate JSON-LD blocks is simpler and equally effective

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| XML sitemap generation | Custom API route or build script | `app/sitemap.ts` built-in convention | Next.js handles XML serialization, caching, Content-Type headers automatically |
| robots.txt | Static file in public/ | `app/robots.ts` built-in convention | Programmatic generation allows pulling sitemap URL from siteConfig; avoids URL hardcoding |
| JSON-LD type safety | Manual type interfaces | `schema-dts` `WithContext<T>` types | Google-maintained, complete Schema.org vocabulary, catches property errors at compile time |
| Webhook signature validation | Manual HMAC comparison | `next-sanity/webhook` `parseBody` | Handles Sanity-specific signature format, timing attack prevention, CDN sync waiting |
| Sitemap XML formatting | Template literals with XML | `MetadataRoute.Sitemap` return type | Next.js handles proper XML encoding, namespaces for image sitemaps, etc. |

**Key insight:** Every component of this phase has a standard solution built into Next.js or already installed in the project. The only new code needed is the schema builder functions in `src/lib/schemas/` and wiring them into page components.

## Common Pitfalls

### Pitfall 1: Expecting FAQPage Rich Results
**What goes wrong:** Developer adds FAQPage schema, tests with Rich Results Test (passes!), but FAQ rich snippets never appear in Google SERPs
**Why it happens:** Google restricted FAQPage rich results to authoritative government and health websites in August 2023. The schema validates fine but Google simply does not render the rich result for other sites.
**How to avoid:** Set correct expectations with the client. FAQPage schema still provides semantic value for AI assistants, voice search, and non-Google search engines -- just no visible Google SERP enhancement.
**Warning signs:** Rich Results Test shows "valid" but "Page is not eligible for rich results" or rich results never appear after indexing.

### Pitfall 2: Self-Serving Review Stars Never Appearing
**What goes wrong:** Developer adds Review + AggregateRating to the business's own website, expects star ratings in Google SERPs, but they never appear
**Why it happens:** Google's 2019 policy update: "If the entity that's being reviewed controls the reviews about itself, their pages that use LocalBusiness or any other type of Organization structured data are ineligible for star review feature."
**How to avoid:** Implement Review schema for semantic/AI value, but do not promise or expect Google star ratings in SERPs. Stars come from Google Business Profile reviews, not website schema.
**Warning signs:** Reviews on your own site, especially curated/hand-picked ones, will never show star snippets.

### Pitfall 3: Sitemap Placed in Wrong Directory
**What goes wrong:** sitemap.ts placed inside `app/(site)/` route group instead of `app/` root -- the sitemap either doesn't work or generates at wrong URL path
**Why it happens:** Route groups with `()` don't affect URL structure, but sitemap.ts must be in the `app/` root to generate at `/sitemap.xml`
**How to avoid:** Always place `sitemap.ts` and `robots.ts` directly in `app/` directory (not inside route groups)
**Warning signs:** `/sitemap.xml` returns 404

### Pitfall 4: LocalBusiness Address Visibility for SAB
**What goes wrong:** Including full street address in visible schema for a Service Area Business, which conflicts with Google SAB guidelines
**Why it happens:** Schema.org requires address for LocalBusiness, but Google SAB guidelines say to hide the address from public display
**How to avoid:** Include the address in JSON-LD schema (Google needs it for verification/proximity), but do NOT display it visibly on the website. The schema is read by bots, not displayed to users. The siteConfig already has the address for the schema -- just don't render it in UI components.
**Warning signs:** Google SAB guidelines violation; potential GBP suspension if address is prominently displayed

### Pitfall 5: Stale Environment Variable for GSC Verification
**What goes wrong:** google-site-verification meta tag renders empty or undefined because env var isn't set
**Why it happens:** NEXT_PUBLIC_ prefix required for client-accessible env vars; verification code not yet obtained from GSC
**How to avoid:** Use NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION env var; conditionally render the verification metadata only when the value is present; document the setup process for Emily
**Warning signs:** Empty `content=""` in the meta tag; GSC verification fails

### Pitfall 6: ProfessionalService Deprecation Confusion
**What goes wrong:** Developer avoids ProfessionalService because Schema.org marks it deprecated, uses plain LocalBusiness instead
**Why it happens:** Schema.org deprecated ProfessionalService "due to confusion with Service" -- it was about subtype hierarchy (Dentist, Attorney, etc.), not the type itself
**How to avoid:** ProfessionalService still exists in schema-dts, Google still processes it, and it provides more specific categorization than bare LocalBusiness. Use `"@type": "ProfessionalService"` -- it extends LocalBusiness and is the best fit for a photography studio. The deprecation note refers to the subtypes being reorganized, not removal.
**Warning signs:** None -- this is safe to use.

## Code Examples

Verified patterns from official sources:

### robots.ts (Next.js Built-in)
```typescript
// Source: https://nextjs.org/docs/app/api-reference/file-conventions/metadata/robots
// app/robots.ts
import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/studio/', '/api/'],
    },
    sitemap: 'https://emilykathryn.com/sitemap.xml',
  }
}
```

### sitemap.ts with Image Sitemaps (Next.js Built-in)
```typescript
// Source: https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap
// app/sitemap.ts
import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const BASE_URL = 'https://emilykathryn.com'
  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
      images: [`${BASE_URL}/og/default.jpg`],
    },
    {
      url: `${BASE_URL}/senior-portraits`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
      images: [`${BASE_URL}/og/senior-portraits.jpg`],
    },
    // ... other pages
  ]
}
```

### FAQPage Schema Builder
```typescript
// Source: schema-dts types + Google FAQPage structured data docs
// src/lib/schemas/faqPage.ts
import type { FAQPage, WithContext } from 'schema-dts'

interface FaqItem {
  question: string
  answer: string
}

export function buildFaqPageSchema(faqs: FaqItem[]): WithContext<FAQPage> {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }
}
```

### Review + AggregateRating Schema Builder
```typescript
// Source: schema-dts types + Google Review snippet structured data docs
// src/lib/schemas/review.ts
import type { Review, WithContext } from 'schema-dts'
import { siteConfig } from '@/lib/siteConfig'

interface TestimonialData {
  name: string
  quote: string
  service?: string
}

const BUSINESS_ID = `${siteConfig.url}/#business`

export function buildReviewSchema(
  testimonials: TestimonialData[]
): WithContext<Review>[] {
  return testimonials.map((t) => ({
    '@context': 'https://schema.org',
    '@type': 'Review',
    author: { '@type': 'Person', name: t.name },
    reviewBody: t.quote,
    reviewRating: {
      '@type': 'Rating',
      ratingValue: 5,
      bestRating: 5,
    },
    itemReviewed: { '@id': BUSINESS_ID },
  }))
}
```

### Metadata Verification for GSC
```typescript
// Source: https://nextjs.org/docs/app/api-reference/functions/generate-metadata#verification
// In app/layout.tsx root metadata
export const metadata: Metadata = {
  // ... existing fields
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  },
}
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| FAQPage rich results for all sites | Restricted to gov/health sites | August 2023 | No visible SERP benefit for EKP; schema still valid for AI/voice |
| Self-serving Review stars in SERPs | Ineligible for self-served reviews | 2019 | Stars only from GBP; website Review schema is semantic-only |
| Speakable for all sites | Beta, US-English news publishers only | Ongoing beta | Not recommended for implementation -- may be discontinued early 2026 |
| ProfessionalService as primary | Deprecated by Schema.org | 2023 | Still valid and processed; use as @type under LocalBusiness |
| next-sitemap package | Built-in sitemap.ts convention | Next.js 13.3+ | No external dependency needed |
| Manual robots.txt in public/ | Built-in robots.ts convention | Next.js 13.3+ | Programmatic, type-safe generation |

**Deprecated/outdated:**
- **Speakable markup:** Beta-only, news publishers only, potential discontinuation in 2026. NOT recommended for this project despite CONTEXT.md mentioning it. The planner should note this as a research finding that contradicts the original plan -- implement FAQPage without Speakable.
- **next-seo package:** Still functional but unnecessary; Next.js built-in Metadata API + schema-dts covers all use cases with less complexity
- **react-schemaorg:** Wrapper around schema-dts that adds React dependency; direct script tag rendering is the official Next.js recommendation

## Discretion Recommendations

Based on research, here are recommendations for areas left to Claude's discretion:

### Address Visibility Strategy
**Recommendation:** Include full address in JSON-LD schema (required for LocalBusiness, needed for GBP proximity ranking), but do NOT display it on the website UI. The siteConfig already has the address data. The schema `<script>` tag is invisible to users but readable by Google. This follows Google's SAB guidelines perfectly.

### Review Schema Page Placement
**Recommendation:** Place Review schema on:
- **Homepage** (featured testimonials) -- highest traffic page
- **Senior Portraits** page (service-filtered testimonials)
- **Family Portraits** page (service-filtered testimonials)
- **Raves** page (all testimonials)

Skip Review schema on About, Contact, Investment, Style Guide -- these pages don't have testimonials in their current implementation.

### Sitemap Generation Approach
**Recommendation:** Use Next.js built-in `app/sitemap.ts` convention. For this site's scale (~15-20 pages including future city pages), a single static sitemap function is sufficient. No need for generateSitemaps (multiple sitemaps) or dynamic fetching.

### Image Sitemap Inclusion
**Recommendation:** YES, include image sitemaps. For a photography business, image search is a significant traffic driver. Include OG images for each page at minimum. When real portfolio images are added via Sanity CMS, the sitemap can be updated to include them (Phase 5 city pages will benefit from this foundation).

### priceRange Value
**Recommendation:** Use `"$$$"` -- Emily Kathryn is premium portrait photography in a mid-size Virginia market. `$$$$` implies luxury/destination pricing, `$$` implies budget. Three dollar signs signals premium without being exclusionary.

### paymentAccepted List
**Recommendation:** `"Cash, Credit Card, Venmo"` -- simple comma-separated string per Schema.org convention.

### @id Cross-Referencing Strategy
**Recommendation:** Use fragment-based @id URIs anchored to the site URL:
- LocalBusiness: `https://emilykathryn.com/#business`
- Senior Service: `https://emilykathryn.com/senior-portraits/#service`
- Family Service: `https://emilykathryn.com/family-portraits/#service`

Services reference the business via `provider: { '@id': 'https://emilykathryn.com/#business' }`. This creates a clean linked knowledge graph.

### Speakable Implementation
**Recommendation:** SKIP Speakable markup. Research shows it is beta-only, restricted to US-English news publishers, and may be discontinued in early 2026. The FAQPage schema without Speakable still provides voice search value through the Question/Answer structure itself. AI assistants parse FAQPage mainEntity directly.

## Open Questions

1. **siteConfig address accuracy**
   - What we know: siteConfig has placeholder address data (`123 Main Street`)
   - What's unclear: Emily's actual Gretna address for GBP verification
   - Recommendation: Implement with placeholder; Emily updates before launch. The schema builder should pull from siteConfig so updating is a single change.

2. **siteConfig phone and email accuracy**
   - What we know: Phone has `(434) XXX-XXXX` placeholder, email has `emily@emilykathryn.com`
   - What's unclear: Whether these are final
   - Recommendation: Same as address -- implement with current values, Emily verifies before launch.

3. **Testimonials for Review schema at build time**
   - What we know: Testimonials come from Sanity CMS via sanityFetch; the Raves page and service pages already fetch them
   - What's unclear: Whether there are testimonials in Sanity yet (CMS may be empty)
   - Recommendation: Build the schema builder to accept testimonial data from the existing fetch; render Review JSON-LD only when testimonials exist (conditional rendering already used on all pages)

4. **GSC verification code timing**
   - What we know: Emily doesn't have GSC set up yet
   - What's unclear: When she'll complete setup to get the verification code
   - Recommendation: Implement the env var pattern now; it renders nothing when empty. Create a setup guide doc as a deliverable of this phase.

## Sources

### Primary (HIGH confidence)
- [Next.js sitemap.ts docs](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap) - Complete API for sitemap generation including image sitemaps
- [Next.js robots.ts docs](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/robots) - Complete API for robots.txt generation
- [Next.js JSON-LD guide](https://nextjs.org/docs/app/guides/json-ld) - Official recommendation for structured data in App Router
- [Next.js generateMetadata API](https://nextjs.org/docs/app/api-reference/functions/generate-metadata) - Verification metadata field for GSC
- [Google FAQPage structured data](https://developers.google.com/search/docs/appearance/structured-data/faqpage) - Current eligibility restrictions
- [Google Review snippet structured data](https://developers.google.com/search/docs/appearance/structured-data/review-snippet) - Self-serving review restrictions
- [Google LocalBusiness structured data](https://developers.google.com/search/docs/appearance/structured-data/local-business) - Required/recommended properties
- [Google Blog: HowTo/FAQ changes Aug 2023](https://developers.google.com/search/blog/2023/08/howto-faq-changes) - Official announcement of FAQPage restrictions
- schema-dts v1.1.5 TypeScript types - Verified ProfessionalService, LocalBusiness, Service, FAQPage, Review types exist

### Secondary (MEDIUM confidence)
- [schema.org ProfessionalService](https://schema.org/ProfessionalService) - Deprecation note and subtype relationship
- [schema.org Speakable](https://schema.org/speakable) - Beta status, news publisher restriction
- [Google Speakable docs](https://developers.google.com/search/docs/appearance/structured-data/speakable) - Beta, US English news only
- [BrightLocal: Review schema rules](https://www.brightlocal.com/learn/review-schema/) - Self-serving review policy explanation
- [Service Area Business schema setup](https://authoritynw.com/blog/service-area-businesses-gmb-schema-setup/) - SAB best practices for schema

### Tertiary (LOW confidence)
- Speakable potential discontinuation in early 2026 - Based on single source about schema changes; not confirmed by Google

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH - All libraries already installed and patterns established in prior phases
- Architecture: HIGH - Follows exact patterns from Next.js official docs and existing project conventions
- Pitfalls: HIGH - FAQPage and Review restrictions well-documented by Google with official announcements
- Speakable status: MEDIUM - Beta restriction confirmed, discontinuation timeline is less certain

**Research date:** 2026-02-24
**Valid until:** 2026-03-24 (stable domain -- Google schema policies change infrequently)
