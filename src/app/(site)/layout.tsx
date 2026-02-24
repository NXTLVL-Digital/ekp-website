import { Cormorant_Garamond } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { JsonLd } from "@/components/shared/JsonLd";
import { buildLocalBusinessSchema } from "@/lib/schemas/localBusiness";

// SanityLive enables visual editing preview. Uncomment when NEXT_PUBLIC_SANITY_PROJECT_ID
// is configured — defineLive requires a valid projectId at module-evaluation time.
// import { SanityLive } from "@/sanity/lib/live";

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
      <JsonLd data={buildLocalBusinessSchema()} />
      <Header />

      <main className="pt-16">{children}</main>

      <Footer />

      {/* <SanityLive /> */}
      <Analytics />
      <SpeedInsights />
    </div>
  );
}
