"use client";

import Lightbox from "yet-another-react-lightbox";
import Counter from "yet-another-react-lightbox/plugins/counter";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";

/**
 * YARL CSS imports are inside this dynamically-imported component,
 * NOT in globals.css. This ensures lightbox CSS only loads when the
 * lightbox is opened, adding zero CSS to the initial page bundle.
 */
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/counter.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";

import { urlFor } from "@/sanity/lib/image";
import type { GalleryImageData } from "./GalleryGrid";

interface GalleryLightboxProps {
  images: GalleryImageData[];
  index: number;
  onClose: () => void;
}

/**
 * Check if the image asset is from the Sanity CDN.
 * Only Sanity CDN URLs can be passed to urlFor() safely.
 * Non-Sanity images (e.g., picsum.photos for testing) use the raw URL directly.
 */
function isSanityAsset(asset: GalleryImageData["asset"]): boolean {
  return !!(asset.url && asset.url.includes("cdn.sanity.io"));
}

/**
 * Lightbox component wrapping yet-another-react-lightbox (YARL) with
 * Counter and Thumbnails plugins.
 *
 * - Uses Sanity CDN URLs (with auto-format) for lightbox slides -- no Vercel billing
 * - Does NOT use the custom NextJsImage render function (per RESEARCH.md recommendation)
 * - Supports arrow key navigation, swipe gestures, Escape to close (YARL built-in)
 * - Counter shows "X / Y" format
 * - Thumbnail strip at bottom for non-linear browsing
 *
 * This component is dynamically imported by GalleryClient, so its JS and CSS
 * only load when a user clicks an image to open the lightbox.
 */
export function GalleryLightbox({
  images,
  index,
  onClose,
}: GalleryLightboxProps) {
  const slides = images.map((image) => {
    // For Sanity images, build optimized lightbox URL via urlFor
    // For external images (test/dev), use the URL directly
    const src = isSanityAsset(image.asset)
      ? urlFor(image.asset).width(1920).auto("format").quality(85).url()
      : image.asset.url || "";

    return {
      src,
      alt: image.alt || "",
      width: image.asset.metadata?.dimensions?.width || 1920,
      height: image.asset.metadata?.dimensions?.height || 1280,
    };
  });

  return (
    <Lightbox
      open={true}
      close={onClose}
      index={index}
      slides={slides}
      plugins={[Counter, Thumbnails]}
      counter={{ separator: " / " }}
      thumbnails={{ width: 80, height: 60, gap: 8 }}
      animation={{ fade: 200, swipe: 300 }}
      carousel={{ preload: 2 }}
      controller={{ closeOnBackdropClick: true }}
    />
  );
}
