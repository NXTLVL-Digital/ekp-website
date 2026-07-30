import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://emilykathryn.com"),
  title: {
    default: "Emily Kathryn Photography",
    template: "%s | Emily Kathryn Photography",
  },
  description:
    "Senior portrait and family photographer serving South-Central Virginia. Editorial-style photography in Chatham, Danville, Lynchburg, and beyond.",
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
