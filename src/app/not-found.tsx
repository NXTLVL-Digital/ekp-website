import { Cormorant_Garamond } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { NotFoundContent } from "@/components/shared/NotFoundContent";

/**
 * Root 404 — the page Next.js serves for any URL that matches no route.
 *
 * This file matters more than it looks. Without it, Next.js falls back to its
 * built-in not-found page, which ships a bare `<title>` of its own on top of
 * the one the root layout emits: two title tags on every 404 a crawler hits.
 *
 * It lives outside the (site) route group, so the header, footer and font
 * variable that group's layout provides are not inherited. They are wired up
 * here by hand; keep this in sync with src/app/(site)/layout.tsx.
 */

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});

export default function NotFound() {
  return (
    <div className={`${cormorant.variable} font-body`}>
      <Header />
      <main>
        <NotFoundContent />
      </main>
      <Footer />
    </div>
  );
}
