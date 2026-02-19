"use client";

import { useState, useCallback } from "react";
import dynamic from "next/dynamic";
import { GalleryGrid } from "./GalleryGrid";
import type { GalleryImageData } from "./GalleryGrid";

export type { GalleryImageData };

/**
 * Dynamically import GalleryLightbox -- JS only loads on first image click.
 * This is the critical performance optimization: zero lightbox JS in the
 * initial page bundle.
 */
const GalleryLightbox = dynamic(
  () =>
    import("./GalleryLightbox").then((mod) => ({
      default: mod.GalleryLightbox,
    })),
  { ssr: false },
);

interface GalleryClientProps {
  images: GalleryImageData[];
  displayStyle?: "masonry" | "grid";
  /** Number of above-the-fold images to load eagerly with fetchpriority="high". Default: 4 */
  priorityCount?: number;
}

/**
 * Client Component wrapper for the gallery.
 *
 * Manages lightbox open/close state and renders:
 * 1. GalleryGrid (the image grid itself)
 * 2. GalleryLightbox (dynamically imported, only when an image is clicked)
 *
 * The thin client boundary keeps JS cost minimal -- only click handler
 * state management runs on the client.
 */
export function GalleryClient({
  images,
  displayStyle = "masonry",
  priorityCount,
}: GalleryClientProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number>(-1);

  const handleImageClick = useCallback((index: number) => {
    setLightboxIndex(index);
  }, []);

  const handleClose = useCallback(() => {
    setLightboxIndex(-1);
  }, []);

  return (
    <>
      <GalleryGrid
        images={images}
        displayStyle={displayStyle}
        onImageClick={handleImageClick}
        priorityCount={priorityCount}
      />
      {lightboxIndex >= 0 && (
        <GalleryLightbox
          images={images}
          index={lightboxIndex}
          onClose={handleClose}
        />
      )}
    </>
  );
}
