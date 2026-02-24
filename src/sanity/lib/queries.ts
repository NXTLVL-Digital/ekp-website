/**
 * GROQ queries with image metadata projections.
 *
 * IMAGE_FIELDS is a reusable fragment that fetches all image data including
 * LQIP for blur placeholders and dimensions for aspect ratio calculation.
 * Include it in every query that references images.
 */

/**
 * Reusable GROQ projection for image fields.
 * Fetches the dereferenced asset with LQIP metadata, dimensions, hotspot, and crop.
 * Usage in GROQ: `heroImage { ${IMAGE_FIELDS} }`
 */
export const IMAGE_FIELDS = `
  asset->{
    _id,
    url,
    metadata {
      lqip,
      dimensions {
        width,
        height,
        aspectRatio
      }
    }
  },
  hotspot,
  crop,
  alt
`;

/**
 * Fetch the singleton siteSettings document with all fields.
 */
export const SITE_SETTINGS_QUERY = `*[_type == "siteSettings"][0]`;

/**
 * Fetch siteSettings with social links for the footer/header.
 */
export const SITE_SETTINGS_WITH_SOCIAL_QUERY = `*[_type == "siteSettings"][0]{
  businessName,
  tagline,
  phone,
  email,
  address,
  socialLinks
}`;

// ---------------------------------------------------------------------------
// Gallery queries
// ---------------------------------------------------------------------------

/**
 * Fetch a single gallery by slug with full image metadata.
 * Dereferences each image asset for LQIP, dimensions, and URL.
 */
export const GALLERY_BY_SLUG_QUERY = `*[_type == "gallery" && slug.current == $slug][0]{
  title,
  category,
  displayStyle,
  location,
  "images": images[]{
    _key,
    alt,
    caption,
    ${IMAGE_FIELDS}
  }
}`;

/**
 * Fetch all galleries for a given category with preview data.
 * Returns title, slug, and the first image for card/preview display.
 */
export const GALLERIES_BY_CATEGORY_QUERY = `*[_type == "gallery" && category == $category] | order(_createdAt desc) {
  title,
  "slug": slug.current,
  category,
  displayStyle,
  "imageCount": count(images),
  "previewImage": images[0]{
    _key,
    alt,
    ${IMAGE_FIELDS}
  }
}`;

/**
 * Fetch one gallery per category for homepage preview cards.
 * Returns the most recent gallery per category with title, slug, and preview image.
 * Uses the same pattern as GALLERIES_BY_CATEGORY_QUERY but fetches a single
 * representative gallery per category for the homepage portfolio preview.
 */
export const HOMEPAGE_GALLERY_PREVIEW_QUERY = `{
  "senior": *[_type == "gallery" && category == "senior"] | order(_createdAt desc) [0] {
    title,
    "slug": slug.current,
    "previewImage": images[0]{
      _key,
      alt,
      ${IMAGE_FIELDS}
    }
  },
  "family": *[_type == "gallery" && category == "family"] | order(_createdAt desc) [0] {
    title,
    "slug": slug.current,
    "previewImage": images[0]{
      _key,
      alt,
      ${IMAGE_FIELDS}
    }
  }
}`;

// ---------------------------------------------------------------------------
// Pricing queries
// ---------------------------------------------------------------------------

/**
 * Fetch all pricing tiers ordered by sortOrder (ascending).
 */
export const PRICING_TIERS_QUERY = `*[_type == "pricingTier"] | order(sortOrder asc) {
  _id,
  name,
  startingAt,
  description,
  features,
  highlight,
  sortOrder
}`;

// ---------------------------------------------------------------------------
// Testimonial queries
// ---------------------------------------------------------------------------

/**
 * Fetch testimonials with optional filtering.
 * Pass $featured (boolean) and/or $service (string) as params.
 * To fetch all: set both to null.
 * To fetch featured only: set $featured to true and $service to null.
 * To fetch by service: set $service to "senior"/"family"/"general" and $featured to null.
 *
 * Homepage featured testimonials pattern:
 *   sanityFetch({ query: TESTIMONIALS_QUERY, params: { featured: true, service: null }, tags: ['testimonial'] })
 */
export const TESTIMONIALS_QUERY = `*[_type == "testimonial"
  && select(
    defined($featured) && defined($service) => featured == $featured && service == $service,
    defined($featured) => featured == $featured,
    defined($service) => service == $service,
    true
  )
] | order(_createdAt desc) {
  _id,
  name,
  quote,
  service,
  featured,
  "image": image {
    ${IMAGE_FIELDS}
  }
}`;

// ---------------------------------------------------------------------------
// Scarcity cue queries
// ---------------------------------------------------------------------------

/**
 * Fetch the first active scarcity cue.
 * Active means isActive is true AND either no expiresAt or expiresAt is in the future.
 */
export const ACTIVE_SCARCITY_CUE_QUERY = `*[_type == "scarcityCue"
  && isActive == true
  && (
    !defined(expiresAt) || expiresAt > now()
  )
][0]{
  _id,
  message,
  isActive,
  expiresAt
}`;

// ---------------------------------------------------------------------------
// City landing page queries
// ---------------------------------------------------------------------------

/**
 * Fetch a single city page by slug with full image metadata and
 * dereferenced testimonials. Used by the dynamic [city] route.
 */
export const CITY_PAGE_QUERY = `*[_type == "cityPage" && slug.current == $slug][0]{
  title,
  "slug": slug.current,
  headline,
  aeoBlock,
  body,
  metaDescription,
  mapQuery,
  testimonialLabel,
  "galleryImages": galleryImages[]{
    _key,
    alt,
    caption,
    ${IMAGE_FIELDS}
  },
  "testimonials": testimonials[]->{
    _id,
    name,
    quote,
    service,
    "image": image {
      ${IMAGE_FIELDS}
    }
  }
}`;

/**
 * Fetch all city page slugs for generateStaticParams and sitemap.
 */
export const CITY_SLUGS_QUERY = `*[_type == "cityPage"]{ "slug": slug.current }`;
