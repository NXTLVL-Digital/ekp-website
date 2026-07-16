"use client";

import { useEffect } from "react";

type StaticHtmlPageProps = {
  html: string;
};

export function StaticHtmlPage({ html }: StaticHtmlPageProps) {
  useEffect(() => {
    const root = document.querySelector(".ekp-static-site");
    if (!root) return;

    const toggle = root.querySelector<HTMLButtonElement>(".nav-mobile-toggle");
    const panel = root.querySelector<HTMLElement>(".nav-mobile-panel");

    const onToggle = () => {
      const expanded = toggle?.getAttribute("aria-expanded") === "true";
      toggle?.setAttribute("aria-expanded", String(!expanded));
      panel?.classList.toggle("is-open", !expanded);
    };

    toggle?.addEventListener("click", onToggle);

    const galleryItems = Array.from(root.querySelectorAll<HTMLElement>(".portfolio-grid .tile img"));
    const onImageClick = (event: Event) => {
      const target = event.currentTarget as HTMLImageElement;
      window.open(target.src, "_blank", "noopener,noreferrer");
    };
    galleryItems.forEach((image) => {
      image.style.cursor = "zoom-in";
      image.addEventListener("click", onImageClick);
    });

    return () => {
      toggle?.removeEventListener("click", onToggle);
      galleryItems.forEach((image) => image.removeEventListener("click", onImageClick));
    };
  }, [html]);

  return <div className="ekp-static-site" dangerouslySetInnerHTML={{ __html: html }} />;
}
