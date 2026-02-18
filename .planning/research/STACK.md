# Stack Research

**Domain:** Conversion-optimized photography portfolio with headless CMS and hyper-local SEO
**Researched:** 2026-02-18
**Confidence:** HIGH

---

## Recommended Stack

### Core Technologies

| Technology | Version | Purpose | Why Recommended |
|------------|---------|---------|-----------------|
| Next.js | 15.5.12 | React meta-framework, SSR/ISR/SSG | Production-stable for 14+ months. Built-in image optimization with AVIF/WebP, App Router with RSC for performance, ISR for CMS-driven revalidation. Vercel deployment is zero-config. Next.js 16 exists but is too new (Dec 2025) for a client project -- 15.5.x is the battle-tested choice. |
| React | 19.0.x | UI library | Stable release compatible with both Next.js 15.5 (`^19.0.0`) and Sanity Studio v4 (`^18 \|\| ^19`). React 19.2 is only required by Sanity v5 which we skip (see rationale below). Use 19.0.x to stay in the broadest compatibility window. |
| Sanity Studio | 4.22.0 | Headless CMS + visual editor | **Winner of Sanity vs Prismic evaluation** (see detailed comparison below). Code-first schema, real-time visual editing via Presentation tool, built-in image CDN with on-the-fly transforms, GROQ query language. Free tier covers this project comfortably. |
| next-sanity | 11.6.12 | Sanity toolkit for Next.js | Official integration: handles draft mode, visual editing, Content Source Maps, ISR revalidation hooks. v11 supports Next.js 15 + Sanity v4. Do NOT use v12 (requires Next.js 16 + Sanity v5 + React 19.2). |
| TypeScript | ~5.9 | Type safety | Non-negotiable for any production Next.js project. Catches CMS schema/query mismatches at build time. |
| Tailwind CSS | 4.x | Utility-first CSS | CSS-first config (`@theme` directives), 70% smaller production output than v3. Pairs with `@tailwindcss/postcss` for Next.js. No reason to use v3 for new projects in 2026. |

### CMS Layer (Sanity)

| Technology | Version | Purpose | Why Recommended |
|------------|---------|---------|-----------------|
| sanity | 4.22.0 | Studio + content management | Latest v4 stable. Embedded in the Next.js app at `/studio` route. Visual editing, real-time collaboration, portable text editor. |
| @sanity/client | ^7.13.2 | GROQ query client | Required peer dep of next-sanity. Handles fetch-based caching and revalidation native to Next.js. |
| @sanity/image-url | 2.0.3 | Image URL builder | Generates CDN URLs with crop, hotspot, width/height/format params from Sanity's image pipeline. |
| @sanity/vision | (bundled) | GROQ query explorer | Dev tool for testing queries against the dataset. Ships with Sanity Studio. |

### Email & Forms

| Technology | Version | Purpose | Why Recommended |
|------------|---------|---------|-----------------|
| Resend | 6.9.2 | Transactional email API | Modern, developer-friendly email API. Free tier: 3,000 emails/month (100/day) -- more than sufficient for inquiry forms. Works natively with Next.js Server Actions. Beautiful React-based email templates. |
| @react-email/components | 1.0.7 | Email template components | Build email templates in JSX/React. Type-safe, renders to HTML email. Used with Resend for branded inquiry notifications. |
| Zod | 4.x | Form validation | Schema-based validation that works on both client and server. Pairs with Server Actions for type-safe form handling. |

### Styling & UI

| Technology | Version | Purpose | Why Recommended |
|------------|---------|---------|-----------------|
| Tailwind CSS | 4.1.18 | Utility CSS framework | See core technologies. |
| @tailwindcss/postcss | 4.1.18 | PostCSS integration | Required for Tailwind v4 with Next.js (replaces the old `tailwindcss` PostCSS plugin). |
| Motion | 12.x | Animation library | Formerly Framer Motion -- rebranded as Motion in 2025. Gallery transitions, scroll-based reveals, page transitions. Use `motion` package, NOT `framer-motion`. |
| Lucide React | 0.574.x | Icon library | Tree-shakeable SVG icons. Lighter than Heroicons, consistent style, active maintenance. |

### SEO & Analytics

| Technology | Version | Purpose | Why Recommended |
|------------|---------|---------|-----------------|
| next-sitemap | 4.2.3 | XML sitemap generation | Auto-generates sitemap.xml and robots.txt at build time. Critical for local SEO crawlability across 7 city landing pages. |
| schema-dts | 1.1.5 | TypeScript types for Schema.org | Type-safe JSON-LD structured data. Catches schema errors at build time. Use with manual `<script type="application/ld+json">` in RSC page components. |
| @vercel/analytics | 1.6.1 | Web analytics | Privacy-friendly, zero-config on Vercel. Tracks page views, Web Vitals, conversions. No cookie banner required. |
| @vercel/speed-insights | 1.3.1 | Core Web Vitals monitoring | Real-user monitoring for LCP, CLS, INP. Essential to validate the < 2.5s LCP target. |

### Infrastructure

| Technology | Version | Purpose | Why Recommended |
|------------|---------|---------|-----------------|
| Vercel | (platform) | Hosting + CDN + Edge Network | Native Next.js host. ISR works out of the box. Global CDN for image delivery. Automatic HTTPS, preview deployments for CMS content review. Free tier covers hobby/small business sites. |
| Sanity CDN | (service) | Image delivery + API caching | Sanity's built-in CDN delivers images with on-demand transforms (resize, crop, format). 60s TTL for API CDN. Eliminates need for a separate image CDN like Cloudinary. |

### Development Tools

| Tool | Purpose | Notes |
|------|---------|-------|
| ESLint + eslint-config-next | Linting | Ships with `create-next-app`. Next.js-specific rules for performance and accessibility. |
| Prettier | Code formatting | Consistent formatting. Use `prettier-plugin-tailwindcss` for class sorting. |
| @sanity/eslint-config-studio | Sanity linting | Catches common Sanity schema mistakes. |

---

## Sanity vs Prismic: CMS Evaluation

### Recommendation: Sanity

**Sanity wins for this project** because of its image pipeline, schema flexibility, and embedded Studio deployment model.

### Comparison Matrix

| Criterion | Sanity | Prismic | Winner |
|-----------|--------|---------|--------|
| **Image Pipeline** | Built-in CDN with on-the-fly crop, resize, hotspot, format negotiation. Images stored in Sanity, transformed on demand. | Basic media library. No built-in image transformation pipeline. Relies on external services like Imgix or next/image alone. | **Sanity** |
| **Visual Editing** | Presentation tool enables click-to-edit overlays on the live site. Real-time preview with Content Source Maps. | Page Builder with Slice Machine. Drag-and-drop slices, live preview. More constrained but more intuitive for non-technical users. | **Prismic** (slightly) |
| **Client Editability** | Sanity Studio is a full React app. Powerful but has a learning curve. The Presentation tool's click-to-edit makes it approachable for content updates. | Slice Machine page builder is more intuitive for drag-and-drop page composition. Better for teams with zero technical background. | **Prismic** (slightly) |
| **Schema Flexibility** | Code-first schemas. Full control over content modeling. Define exactly the fields needed for photography galleries, service pages, city landing pages. | GUI-based content modeling with Custom Types and Slices. Less flexible than code-first but adequate for most use cases. | **Sanity** |
| **Next.js Integration** | `next-sanity` is official, actively maintained by Sanity. ISR webhook revalidation, draft mode, visual editing -- all first-class. | `@prismicio/next` is official. Good integration but less deep than Sanity's. Slice Machine generates component boilerplate. | **Sanity** |
| **Portfolio/Gallery Needs** | Image hotspot/crop built into the editor. Client can set focal points. Image metadata (dimensions, palette, LQIP) available from the API without extra processing. | Basic image uploads. No hotspot/crop in the editor. Would need additional tooling for focal point management. | **Sanity** |
| **Free Plan** | 1 dataset, 10K documents, 200K API requests/mo, 10GB storage, 10GB bandwidth, 20 users. No overages -- service pauses at limits. | 100GB CDN, basic features. Limits less clearly documented. Historical pricing changes have been disruptive. | **Sanity** |
| **Structured Data for SEO** | GROQ queries can return exactly the shape needed for JSON-LD. Portable Text for rich text. Custom fields for per-page SEO metadata. | Structured content model works for SEO fields. Less query flexibility than GROQ. | **Sanity** |
| **Pricing Predictability** | Free plan clearly defined. Growth at $15/user/mo if needed. No surprise bills. | Free plan available. Standard plan at $10/user/mo. Recent pricing changes (2024) reduced trust. | **Sanity** |
| **Real-time Collaboration** | Built-in. Multiple editors see each other's cursors/changes. | Not a strength. Basic collaboration features. | **Sanity** |
| **Ecosystem/Community** | Large, active community. Extensive plugin ecosystem. Strong documentation. | Smaller community. Good docs but fewer community resources. | **Sanity** |

### Why Not Prismic

Prismic's Slice Machine page builder is genuinely excellent for marketing teams who need to compose pages from pre-built components. For a solo photographer managing their own site, this advantage is minimal -- Emily will primarily be swapping images and editing text, not composing complex page layouts.

Sanity's killer features for this project are:

1. **Image pipeline with hotspot/crop** -- A photographer CMS without built-in focal point management is a non-starter. Sanity lets Emily set the focal point on every image, and it persists across all responsive sizes.
2. **GROQ query flexibility** -- Fetching gallery data, filtering by category, building city-specific content -- GROQ handles this elegantly without complex API chaining.
3. **Embedded Studio** -- Deploying Sanity Studio at `emilykathryn.com/studio` means one URL for everything. No separate CMS login page to remember.
4. **Image metadata** -- Sanity's image pipeline returns LQIP (Low-Quality Image Placeholders), dominant colors, and dimensions from the API. This is critical for preventing CLS and building blur-up loading patterns.

### When Prismic Would Be Better

Choose Prismic if: the client needs drag-and-drop page building with many different page layouts, or if the content team is non-technical and would struggle with Sanity Studio's interface. Not applicable to this project.

---

## Version Compatibility Matrix

This is the critical dependency chain. All versions verified on npm as of 2026-02-18.

```
Next.js 15.5.12
  requires: react ^18.2.0 || ^19.0.0

React 19.0.x (use 19.0.4)
  compatible with: Next.js 15.5.x, Sanity 4.22.0, next-sanity 11.6.12

Sanity 4.22.0
  requires: react ^18 || ^19, styled-components ^6.1.15

next-sanity 11.6.12
  requires: next ^15.1.0, react ^18.3 || ^19, sanity ^4.22.0, @sanity/client ^7.13.2

Tailwind CSS 4.1.18
  requires: @tailwindcss/postcss 4.1.18 (for Next.js)
```

### Why NOT Next.js 16

| Factor | Next.js 15.5.x | Next.js 16.1.x |
|--------|----------------|----------------|
| Stability | 14+ months in production | Released Dec 2025 (2 months) |
| React version | ^19.0.0 (broad) | ^19.0.0 (broad) |
| Sanity compat | next-sanity v11 (stable) | next-sanity v12 (requires Sanity v5 + React 19.2) |
| ISR | Stable, well-documented | Works but ecosystem catching up |
| Risk | LOW | MEDIUM -- newer ecosystem, fewer community solutions |

Next.js 15.5 is the right call. Upgrade to 16 after the site launches and the ecosystem stabilizes.

### Why NOT Sanity v5

Sanity v5 requires React 19.2+, which means next-sanity v12, which means Next.js 16. The entire dependency chain shifts up. Sanity v4.22.0 is fully supported, receives security patches, and has identical features to v5 (the only breaking change in v5 was the React 19.2 requirement). There is no functional reason to use v5 for this project.

---

## Installation

```bash
# Create Next.js project
npx create-next-app@15 emilykathryn --typescript --tailwind --app --src-dir

# Core framework (already installed by create-next-app)
# next@15.5.x, react@19.x, react-dom@19.x, typescript, tailwindcss, @tailwindcss/postcss

# Sanity CMS
npm install sanity@4 next-sanity@11 @sanity/client @sanity/image-url @sanity/vision styled-components

# Email & Forms
npm install resend @react-email/components zod

# Animation & UI
npm install motion lucide-react

# SEO
npm install next-sitemap schema-dts

# Analytics (Vercel)
npm install @vercel/analytics @vercel/speed-insights

# Dev dependencies
npm install -D @types/node prettier prettier-plugin-tailwindcss eslint-config-next
```

---

## Alternatives Considered

| Recommended | Alternative | When to Use Alternative |
|-------------|-------------|-------------------------|
| Sanity (headless CMS) | Prismic | When non-technical team needs drag-and-drop page builder. Not this project. |
| Sanity (headless CMS) | Contentful | Larger enterprise teams with complex content workflows. Overkill and expensive for a solo photographer. |
| Sanity (headless CMS) | WordPress headless | When there is an existing WordPress site with years of content to preserve. Not applicable. |
| Resend (email) | SendGrid | When you need high-volume email (50K+/mo). Resend is simpler for transactional inquiry forms. |
| Resend (email) | Nodemailer + SMTP | When you want zero third-party dependencies. But SMTP is fragile, deliverability is poor, and cold-start is slow in serverless. |
| Motion (animation) | CSS animations only | When you have simple fade/slide transitions. Motion is worth the bundle for gallery transitions and scroll reveals. |
| Motion (animation) | GSAP | When you need timeline-based complex animation. Overkill for portfolio scroll reveals and page transitions. |
| Tailwind CSS | CSS Modules | When the team strongly prefers traditional CSS. Tailwind is faster for responsive, utility-first design on small teams. |
| Vercel (hosting) | Netlify | When you need more generous free-tier bandwidth. Vercel is better for Next.js (they build it). |
| Vercel (hosting) | Cloudflare Pages | When you need unlimited bandwidth and edge-first architecture. Less mature Next.js support than Vercel. |
| next-sitemap | Manual sitemap | Never for a site with 7+ city landing pages. Automated generation prevents missed pages. |
| Zod (validation) | Yup | Legacy projects already using Yup. Zod is the modern standard with better TypeScript inference. |

---

## What NOT to Use

| Avoid | Why | Use Instead |
|-------|-----|-------------|
| `framer-motion` package | Deprecated package name. Rebranded to `motion` in 2025. `framer-motion` still installs but points to legacy. | `motion` (same API, new package) |
| Cloudinary | Adds unnecessary complexity and cost when Sanity already has a built-in image CDN with transforms. Double-CDN is wasteful. | Sanity image pipeline + `next/image` |
| WordPress (any mode) | Heavy, security surface area, plugin dependency hell. Antithetical to the performance targets (LCP < 2.5s). | Sanity headless CMS |
| Chakra UI / MUI / shadcn | Component libraries add bundle weight and constrain design. A photography portfolio needs custom visual design, not a component system. | Tailwind CSS with custom components |
| next-seo | Largely unnecessary with Next.js 15 App Router -- `generateMetadata` export handles 90% of use cases natively. | Built-in Next.js Metadata API + `schema-dts` for JSON-LD |
| Tailwind CSS v3 | Legacy. v4 is stable, smaller output, better DX. No migration burden on a new project. | Tailwind CSS v4 |
| React 18 | Next.js 15.5 supports it, but Sanity v4 works with React 19, and React 19 has RSC improvements and Server Actions stability. No reason to use 18 in a new project. | React 19.0.x |
| Next.js 16 | Too new (2 months old). Ecosystem hasn't caught up. Forces Sanity v5 + React 19.2 dependency chain. | Next.js 15.5.x |
| Sanity v5 | Only breaking change is React 19.2 requirement. Forces next-sanity v12 and Next.js 16. No feature benefit for this project. | Sanity v4.22.0 |
| Prismic | See detailed evaluation above. Lacks built-in image pipeline with hotspot/crop, less flexible querying. | Sanity |
| Google Analytics | Requires cookie consent banner (GDPR/CCPA). Vercel Analytics is privacy-friendly and provides Web Vitals tracking. | @vercel/analytics + @vercel/speed-insights |

---

## Stack Patterns by Variant

**If ISR revalidation on CMS publish:**
- Configure Sanity webhook to hit `/api/revalidate` route
- Use `revalidateTag()` in the webhook handler
- Tag Sanity fetches with relevant tags in server components
- This gives near-instant updates without full rebuilds

**If the client needs to preview unpublished content:**
- Use Sanity Presentation tool + next-sanity draft mode
- `draftMode()` from Next.js enables preview overlay
- Content Source Maps power click-to-edit in the Studio

**If gallery images need blur placeholders:**
- Sanity's image pipeline returns `lqip` (base64 blur) and `palette` metadata
- Pass LQIP string directly to `next/image` `blurDataURL` prop
- Zero extra processing -- the CMS provides the placeholder

**If adding a blog later:**
- Sanity Portable Text handles rich content with embedded images
- Add a `post` document type to the schema
- Same ISR revalidation pattern applies

---

## Confidence Assessment

| Decision | Confidence | Basis |
|----------|------------|-------|
| Next.js 15.5.x | HIGH | npm registry verified, 14+ months stable, peer deps confirmed |
| React 19.0.x | HIGH | npm registry verified, compatible with all deps |
| Sanity v4.22.0 (over Prismic) | HIGH | Official docs, npm peer deps, feature comparison against project requirements |
| next-sanity v11.6.12 | HIGH | npm peer deps verified, official Sanity toolkit |
| Tailwind CSS v4 | HIGH | npm registry verified, official Next.js guide available |
| Resend for email | MEDIUM | Widely recommended in Next.js ecosystem. Free tier adequate. Could swap to any email provider with minimal code change. |
| Motion for animation | MEDIUM | Stable, actively maintained. The rename from framer-motion is verified. Bundle impact is the main risk for a performance-focused site -- use dynamic imports. |
| schema-dts for JSON-LD | MEDIUM | npm verified. Could also hand-write JSON-LD objects without this library. Adds safety, not functionality. |
| next-sitemap | HIGH | Standard tool, npm verified, no alternatives needed |
| Vercel hosting | HIGH | Native Next.js platform. Free tier sufficient for small business. |

---

## Sources

### npm Registry (verified 2026-02-18) -- HIGH confidence
- next@15.5.12 -- peer deps: react ^18.2.0 || ^19.0.0
- next-sanity@11.6.12 -- peer deps: next ^15.1.0, sanity ^4.22.0, react ^18.3 || ^19
- next-sanity@12.1.0 -- peer deps: next ^16.0.0, sanity ^5.0.0, react ^19.2.3
- sanity@4.22.0 -- peer deps: react ^18 || ^19
- react@19.0.4 (latest 19.0.x), react@19.2.4 (latest overall)
- tailwindcss@4.1.18, motion@12.34.1, zod@4.3.6, resend@6.9.2

### Official Documentation -- HIGH confidence
- [Next.js JSON-LD Guide](https://nextjs.org/docs/app/guides/json-ld) -- structured data implementation pattern
- [Sanity Visual Editing with Next.js App Router](https://www.sanity.io/docs/visual-editing/visual-editing-with-next-js-app-router) -- Presentation tool setup
- [Sanity Pricing](https://www.sanity.io/pricing) -- free tier limits: 10K documents, 200K API requests/mo
- [Tailwind CSS Next.js Setup](https://tailwindcss.com/docs/guides/nextjs) -- v4 installation with @tailwindcss/postcss
- [Resend Next.js Integration](https://resend.com/nextjs) -- Server Actions pattern

### Web Search (verified with official sources) -- MEDIUM confidence
- [Sanity vs Prismic comparison](https://www.sanity.io/sanity-vs-prismic) -- feature comparison
- [Next.js 15 vs 16 comparison](https://www.descope.com/blog/post/nextjs15-vs-nextjs16) -- stability assessment
- [Motion upgrade guide](https://motion.dev/docs/react-upgrade-guide) -- framer-motion to motion migration
- [Sanity Studio v5 announcement](https://www.sanity.io/blog/sanity-studio-v5) -- v5 only changes React requirement

---
*Stack research for: Emily Kathryn Photography -- conversion-optimized photography portfolio*
*Researched: 2026-02-18*
