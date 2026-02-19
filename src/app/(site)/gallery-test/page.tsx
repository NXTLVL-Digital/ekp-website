import type { Metadata } from "next";
import { GalleryClient } from "@/components/shared/GalleryClient";
import type { GalleryImageData } from "@/components/shared/GalleryClient";

export const metadata: Metadata = {
  title: "Gallery Test | Emily Kathryn Photography",
  robots: { index: false, follow: false },
};

/**
 * 1x1 pixel gray PNG as a minimal LQIP placeholder.
 * Used for mock images since we don't have real Sanity LQIP data.
 */
const MOCK_LQIP =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN88P/BfwAJhAPk3KFb2AAAAABJRU5ErkJggg==";

/**
 * Generate 24 mock gallery images with varied aspect ratios.
 * Mix of portrait (3:4, 2:3) and landscape (4:3) to properly test masonry layout.
 * Uses picsum.photos for reliable placeholder images.
 */
function generateMockImages(): GalleryImageData[] {
  const configs: Array<{
    id: number;
    width: number;
    height: number;
    alt: string;
    caption?: string;
  }> = [
    { id: 10, width: 800, height: 1200, alt: "Senior portrait in golden hour light", caption: "Class of 2026" },
    { id: 11, width: 800, height: 1067, alt: "Family session at Smith Mountain Lake" },
    { id: 12, width: 1000, height: 750, alt: "Landscape view of Chatham countryside" },
    { id: 13, width: 800, height: 1200, alt: "Senior girl in field of wildflowers", caption: "Spring mini session" },
    { id: 14, width: 900, height: 1200, alt: "Family of four laughing together" },
    { id: 15, width: 1000, height: 667, alt: "Sunset at Dan Daniel Memorial Park" },
    { id: 16, width: 800, height: 1200, alt: "Senior boy with letterman jacket" },
    { id: 17, width: 800, height: 1000, alt: "Mother and daughter portrait" },
    { id: 18, width: 1000, height: 750, alt: "Downtown Danville brick architecture" },
    { id: 19, width: 800, height: 1200, alt: "Senior girl in cap and gown", caption: "Graduation portraits" },
    { id: 20, width: 900, height: 1350, alt: "Family walking through autumn leaves" },
    { id: 21, width: 1000, height: 667, alt: "Blue Ridge mountain vista" },
    { id: 22, width: 800, height: 1200, alt: "Senior portraits at railroad tracks" },
    { id: 23, width: 800, height: 1067, alt: "Siblings playing in sunlit meadow" },
    { id: 24, width: 1200, height: 800, alt: "Wide shot of lakeside session" },
    { id: 25, width: 800, height: 1200, alt: "Senior girl with vintage truck" },
    { id: 26, width: 900, height: 1200, alt: "Family holiday card portrait", caption: "Holiday minis" },
    { id: 27, width: 1000, height: 750, alt: "Lynchburg skyline at dusk" },
    { id: 28, width: 800, height: 1200, alt: "Senior boy on forest trail" },
    { id: 29, width: 800, height: 1067, alt: "Couple with newborn baby" },
    { id: 30, width: 1000, height: 667, alt: "Smith Mountain Lake dock at sunrise" },
    { id: 31, width: 800, height: 1200, alt: "Senior girl in flowing dress", caption: "Editorial style" },
    { id: 32, width: 900, height: 1350, alt: "Extended family group portrait" },
    { id: 33, width: 800, height: 1200, alt: "Senior portraits with confetti" },
  ];

  return configs.map((config, i) => ({
    _key: `mock-${String(i + 1).padStart(3, "0")}`,
    alt: config.alt,
    caption: config.caption,
    asset: {
      _id: `image-test-${String(i + 1).padStart(3, "0")}`,
      url: `https://picsum.photos/id/${config.id}/${config.width}/${config.height}`,
      metadata: {
        lqip: MOCK_LQIP,
        dimensions: {
          width: config.width,
          height: config.height,
          aspectRatio: config.width / config.height,
        },
      },
    },
  }));
}

/**
 * Gallery test page for development verification and Lighthouse auditing.
 *
 * Renders 24 mock images via GalleryClient in masonry layout to verify:
 * - Responsive column counts (2 mobile, 3 tablet, 4 desktop)
 * - Lightbox opens on click with counter, thumbnails, keyboard nav
 * - Dynamic import keeps lightbox JS out of initial bundle
 * - Core Web Vitals (LCP, CLS) are acceptable
 *
 * This page is marked noindex -- it's a development/verification tool only.
 */
export default function GalleryTestPage() {
  const images = generateMockImages();

  return (
    <main className="mx-auto max-w-7xl px-4 py-12">
      <div className="mb-8">
        <h1 className="font-heading text-3xl font-bold tracking-tight md:text-4xl">
          Gallery Test Page
        </h1>
        <p className="mt-2 text-stone-600">
          This is a development test page with 24 mock images. It is not indexed
          by search engines. Use this page to verify gallery layout, lightbox
          functionality, and Core Web Vitals performance.
        </p>
      </div>

      <GalleryClient images={images} displayStyle="masonry" />
    </main>
  );
}
