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
