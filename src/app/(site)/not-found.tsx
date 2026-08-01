import { NotFoundContent } from "@/components/shared/NotFoundContent";

/**
 * 404 for notFound() calls raised inside the (site) route group — an unknown
 * city slug or journal slug, for example. The group's layout already supplies
 * the header, footer and fonts, so only the body is rendered here.
 *
 * Unmatched URLs are handled by src/app/not-found.tsx instead. Both render the
 * same NotFoundContent so they cannot drift.
 */
export default function NotFound() {
  return <NotFoundContent />;
}
