import { Cormorant_Garamond } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { SiteChrome } from "@/components/layout/SiteChrome";
import { JsonLd } from "@/components/shared/JsonLd";
import { buildLocalBusinessSchema } from "@/lib/schemas/localBusiness";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});

export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={`${cormorant.variable} font-body`}>
      <JsonLd data={buildLocalBusinessSchema()} />
      <SiteChrome>{children}</SiteChrome>

      <Analytics />
      <SpeedInsights />
    </div>
  );
}
