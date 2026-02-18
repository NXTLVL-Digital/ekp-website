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
      <Link
        href="/"
        className="mt-8 inline-block rounded bg-brand-gold px-5 py-2.5 text-sm font-medium tracking-wide text-white transition-colors hover:bg-brand-gold-dark"
      >
        Return Home
      </Link>
    </div>
  );
}
