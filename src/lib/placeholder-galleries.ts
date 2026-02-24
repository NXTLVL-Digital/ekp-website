import type { GalleryImageData } from '@/components/shared/GalleryGrid'

/**
 * Placeholder gallery data using images from Emily's current website.
 * These will be replaced by Sanity CMS data when content is populated.
 */

function img(
  key: string,
  src: string,
  alt: string,
  w: number,
  h: number,
): GalleryImageData {
  return {
    _key: key,
    alt,
    asset: {
      url: src,
      metadata: { dimensions: { width: w, height: h } },
    },
  }
}

export const seniorGalleryImages: GalleryImageData[] = [
  img('s1', '/placeholder/senior-1.jpeg', 'Senior portrait — editorial style', 411, 639),
  img('s2', '/placeholder/senior-2.jpeg', 'Senior portrait session', 413, 641),
  img('s3', '/placeholder/senior-3.jpeg', 'Senior portrait outdoors', 413, 639),
  img('s4', '/placeholder/senior-4.jpeg', 'Senior portrait — Danville VA', 330, 360),
  img('s5', '/placeholder/senior-5.jpeg', 'Senior portrait — Halifax County', 330, 360),
  img('s6', '/placeholder/senior-6.jpeg', 'Senior portrait — Person High School', 330, 360),
  img('s7', '/placeholder/senior-7.jpeg', 'Senior portrait — Gretna High School', 330, 360),
  img('s8', '/placeholder/senior-8.jpeg', 'Senior portrait — Gretna VA', 330, 360),
  img('s9', '/placeholder/senior-9.jpeg', 'Senior portrait — Roanoke VA', 330, 360),
  img('s10', '/placeholder/senior-10.jpeg', 'Senior portrait — Roxboro NC', 330, 360),
  img('s11', '/placeholder/senior-11.jpeg', 'Senior portrait — Smith Mountain Lake', 330, 360),
  img('s12', '/placeholder/senior-12.jpeg', 'Senior portrait — William Campbell VA', 330, 360),
]

export const familyGalleryImages: GalleryImageData[] = [
  img('f1', '/placeholder/family-1.jpeg', 'Family portrait session', 1440, 1795),
  img('f2', '/placeholder/family-2.jpeg', 'Family portrait outdoors', 1440, 1440),
  img('f3', '/placeholder/family-3.jpeg', 'Family portrait — South-Central Virginia', 3096, 5500),
  img('f4', '/placeholder/family-4.jpeg', 'Family portrait — golden hour', 1200, 1200),
  img('f5', '/placeholder/family-5.jpeg', 'Family portrait — relaxed session', 1440, 1800),
  img('f6', '/placeholder/family-6.jpeg', 'Family portrait — outdoor session', 1440, 1800),
]

/** Curated mix of senior + family for homepage "best of" gallery */
export const homepageGalleryImages: GalleryImageData[] = [
  img('h1', '/placeholder/senior-1.jpeg', 'Senior portrait — editorial style', 411, 639),
  img('h2', '/placeholder/family-1.jpeg', 'Family portrait session', 1440, 1795),
  img('h3', '/placeholder/senior-2.jpeg', 'Senior portrait session', 413, 641),
  img('h4', '/placeholder/gallery-2.jpeg', 'Portrait photography by Emily Kathryn', 3000, 2352),
  img('h5', '/placeholder/senior-3.jpeg', 'Senior portrait outdoors', 413, 639),
  img('h6', '/placeholder/family-5.jpeg', 'Family portrait — relaxed session', 1440, 1800),
  img('h7', '/placeholder/gallery-1.jpeg', 'Portrait session — South-Central Virginia', 413, 641),
  img('h8', '/placeholder/family-2.jpeg', 'Family portrait outdoors', 1440, 1440),
  img('h9', '/placeholder/senior-4.jpeg', 'Senior portrait — Danville VA', 330, 360),
  img('h10', '/placeholder/family-6.jpeg', 'Family portrait — outdoor session', 1440, 1800),
]
