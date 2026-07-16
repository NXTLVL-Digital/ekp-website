"use client";

import { usePathname } from "next/navigation";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";

const STATIC_ROUTES = new Set([
  "/",
  "/about",
  "/contact",
  "/journal",
  "/family",
  "/senior",
  "/investment",
  "/portfolio",
]);

export function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const normalized = pathname === "/" ? "/" : pathname.replace(/\/$/, "");

  if (STATIC_ROUTES.has(normalized)) {
    return <>{children}</>;
  }

  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}
