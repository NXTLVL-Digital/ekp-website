import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-4xl flex-col items-center justify-center px-4 py-section-sm md:py-section">
      <h1 className="font-heading text-4xl font-light tracking-wide md:text-5xl">
        Page Not Found
      </h1>
      <p className="mt-4 text-muted-foreground">
        The page you are looking for does not exist or has been moved.
      </p>
      <Link href="/" className="group mt-8 inline-flex min-h-11 items-center gap-3">
        <span className="editorial-label text-foreground transition-colors duration-300 group-hover:text-brand-gold">
          Return Home
        </span>
        <svg
          width="24"
          height="8"
          viewBox="0 0 24 8"
          fill="none"
          className="transition-transform duration-300 group-hover:translate-x-1"
        >
          <path
            d="M0 4H22M22 4L18.5 0.5M22 4L18.5 7.5"
            stroke="currentColor"
            strokeWidth="0.75"
            className="text-brand-gold"
          />
        </svg>
      </Link>
    </div>
  );
}
