import type { GalleryImageData } from '@/components/shared/GalleryGrid'

/**
 * Curated local portfolio images supplied by Emily Kathryn Photography.
 * Sanity content can override these collections once the CMS is populated.
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
  img('s1', '/images/seniors/EKP_2401.jpg', 'Graduate in cap and gown at golden hour', 3327, 5000),
  img('s2', '/images/seniors/EKP_1337.jpg', 'Senior dancer in a sunlit country setting', 5000, 3337),
  img('s3', '/images/seniors/EKP_5960.jpg', 'Relaxed senior portrait on a bridge', 3327, 5000),
  img('s4', '/images/seniors/EKP_5436-Edit.jpg', 'Editorial senior portrait among spring blossoms', 2002, 3000),
  img('s5', '/images/seniors/EKP_7812.jpg', 'Senior boy portrait among historic stonework', 5000, 3327),
  img('s6', '/images/seniors/EKP_8089.jpg', 'Senior portrait in a garden setting', 3659, 5500),
  img('s7', '/images/seniors/EKP_0913.jpg', 'Fashion-forward senior portrait with a wide-brim hat', 3050, 2036),
  img('s8', '/images/seniors/EKP_8750.jpg', 'Editorial senior boy portrait in autumn', 2050, 1368),
  img('s9', '/images/seniors/EKP_0030.jpg', 'Senior portrait in a woodland setting', 1368, 2050),
  img('s10', '/images/seniors/EKP_8081.jpg', 'Senior boy portrait with a vintage truck', 5000, 3327),
  img('s11', '/images/seniors/EKP_8368.jpg', 'Graduation portrait in a wildflower field', 1335, 2000),
  img('s12', '/images/seniors/EKP_5643.jpg', 'Senior portrait with a creative outdoor setting', 3327, 5000),
  img('s13', '/images/seniors/EKP_5407.jpg', 'Senior fashion portrait beneath an architectural bridge', 3571, 5000),
  img('s14', '/images/seniors/EKP_9695.jpg', 'Senior portrait in an elegant black dress', 3270, 4914),
  img('s15', '/images/seniors/EKP_5990.jpg', 'Senior boy portrait at sunset', 5000, 3327),
  img('s16', '/images/seniors/EKP_5166.jpg', 'Bright floral senior portrait', 3327, 5000),
  img('s17', '/images/seniors/EKP_7683.jpg', 'Senior boy portrait in a natural setting', 3327, 5000),
  img('s18', '/images/seniors/EKP_1226_2.jpg', 'Senior portrait beside a historic stone wall', 3500, 2500),
  img('s19', '/images/seniors/EKP_5455.jpg', 'Creative close-up senior portrait', 5000, 3337),
  img('s20', '/images/seniors/EKP_8781.jpg', 'Senior athlete portrait with a letterman jacket', 1368, 2050),
  img('s21', '/images/seniors/EKP_8529.jpg', 'Senior portrait in a flowing floral dress', 3659, 5500),
  img('s22', '/images/seniors/EKP_5321.jpg', 'Senior portrait holding a colorful bouquet', 3327, 5000),
  img('s23', '/images/seniors/EKP_7803.jpg', 'Senior boy portrait at a rustic location', 3327, 5000),
  img('s24', '/images/seniors/EKP_5446.jpg', 'Joyful senior portrait among spring blossoms', 2336, 3500),
]

export const familyGalleryImages: GalleryImageData[] = [
  img('f1', '/images/families/EKP_1145.jpg', 'Extended family walking together at a rustic farm', 5500, 3659),
  img('f2', '/images/families/EKP_1186.jpg', 'Mother and daughters sharing a playful moment', 5000, 3327),
  img('f3', '/images/families/EKP_1211.jpg', 'Family portrait in warm evening light', 3659, 5500),
  img('f4', '/images/families/EKP_1477.jpg', 'Multi-generational family portrait at a country cabin', 5500, 3659),
  img('f5', '/images/families/EKP_1707-2.jpg', 'Children playing with a red wagon in a field', 5500, 3659),
  img('f6', '/images/families/EKP_2152.jpg', 'Brother and sister portrait outdoors', 3327, 5000),
  img('f7', '/images/families/HUTCHINSON-11.jpg', 'Mother with her children in the countryside', 2500, 1669),
  img('f8', '/images/families/WOF_8576.jpg', 'Natural child portrait beside a stone wall', 1369, 2050),
  img('f9', '/images/families/WOF_8608.jpg', 'Young girl portrait in soft natural light', 1368, 2050),
]

/** Curated mix of senior + family for city landing pages */
export const cityGalleryImages: GalleryImageData[] = [
  seniorGalleryImages[0],
  familyGalleryImages[0],
  seniorGalleryImages[5],
  familyGalleryImages[2],
  seniorGalleryImages[7],
  familyGalleryImages[4],
  seniorGalleryImages[13],
  familyGalleryImages[5],
]

/** Curated mix of senior + family for homepage "best of" gallery */
export const homepageGalleryImages: GalleryImageData[] = [
  seniorGalleryImages[1],
  familyGalleryImages[0],
  seniorGalleryImages[3],
  familyGalleryImages[1],
  seniorGalleryImages[2],
  familyGalleryImages[2],
  seniorGalleryImages[5],
  familyGalleryImages[3],
  seniorGalleryImages[7],
  familyGalleryImages[5],
]
