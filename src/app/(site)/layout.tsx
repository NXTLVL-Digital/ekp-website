import { Cormorant_Garamond } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});

// Acrom is a commercial font (Inhouse Type). Once .woff2 files are available,
// uncomment the localFont config below and place files in src/fonts/.
// import localFont from "next/font/local";
// const acrom = localFont({
//   src: [
//     { path: "../../fonts/Acrom-Regular.woff2", weight: "400", style: "normal" },
//     { path: "../../fonts/Acrom-Medium.woff2", weight: "500", style: "normal" },
//     { path: "../../fonts/Acrom-Bold.woff2", weight: "700", style: "normal" },
//   ],
//   variable: "--font-acrom",
//   display: "swap",
// });

export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={`${cormorant.variable} font-body`}>
      <header className="border-b border-border px-4 py-3">
        <nav className="mx-auto flex max-w-7xl items-center justify-between">
          <span className="font-heading text-lg tracking-wide">
            emily kathryn photography
          </span>
          <span className="text-sm text-muted-foreground">Menu</span>
        </nav>
      </header>

      <main>{children}</main>

      <footer className="border-t border-border px-4 py-8">
        <div className="mx-auto max-w-7xl text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Emily Kathryn Photography. All rights reserved.</p>
        </div>
      </footer>

      <Analytics />
      <SpeedInsights />
    </div>
  );
}
