import Link from "next/link";

/**
 * The body of the 404 page, shared by both not-found entry points:
 * src/app/not-found.tsx (unmatched routes, brings its own header/footer) and
 * src/app/(site)/not-found.tsx (notFound() inside the site group, which
 * already has chrome from that group's layout).
 *
 * Keeping the markup here means the two can never drift apart.
 */

const DESTINATIONS = [
  {
    href: "/senior-portraits",
    label: "Senior Portraits",
    blurb: "Editorial sessions for the class of 2027.",
  },
  {
    href: "/family-portraits",
    label: "Family Portraits",
    blurb: "Everyone in one frame, printed and framed.",
  },
  {
    href: "/contact",
    label: "Start a Conversation",
    blurb: "Tell me about the session you have in mind.",
  },
];

function ArrowMark() {
  return (
    <svg
      width="24"
      height="8"
      viewBox="0 0 24 8"
      fill="none"
      aria-hidden="true"
      className="shrink-0 transition-transform duration-300 group-hover:translate-x-1"
    >
      <path
        d="M0 4H22M22 4L18.5 0.5M22 4L18.5 7.5"
        stroke="currentColor"
        strokeWidth="0.75"
        className="text-brand-gold"
      />
    </svg>
  );
}

export function NotFoundContent() {
  return (
    // pt-52/md:pt-56 clears the fixed header: the stacked logo is 184px tall
    // and will sit on top of the first line of content with anything less.
    // Same clearance the interior page heroes use.
    <section className="bg-foreground text-white">
      <div className="mx-auto max-w-[1400px] px-6 pt-52 pb-24 md:pt-56 md:pb-32 lg:px-10">
        <div className="h-px w-12 bg-brand-gold" />
        <p className="editorial-label mt-6 text-brand-gold">Error 404</p>

        <h1 className="mt-4 max-w-3xl font-heading text-5xl font-light leading-[0.95] tracking-tight sm:text-6xl md:text-7xl">
          This page went missing.
        </h1>

        <p className="mt-6 max-w-md text-sm leading-relaxed text-white/70 md:text-base">
          The link may be out of date, or the page may have moved when the site
          was rebuilt. Here is where most people are headed.
        </p>

        <ul className="mt-12 grid gap-px border-t border-white/10 md:mt-16 md:grid-cols-3">
          {DESTINATIONS.map(({ href, label, blurb }) => (
            <li key={href} className="border-b border-white/10 md:border-b-0">
              <Link
                href={href}
                className="group flex min-h-11 flex-col gap-2 py-6 md:py-8 md:pr-8"
              >
                <span className="flex items-center gap-3">
                  <span className="editorial-label transition-colors duration-300 group-hover:text-brand-gold">
                    {label}
                  </span>
                  <ArrowMark />
                </span>
                <span className="text-sm leading-relaxed text-white/60">
                  {blurb}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
