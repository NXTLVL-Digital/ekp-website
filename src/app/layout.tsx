import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Emily Kathryn Photography",
    template: "%s | Emily Kathryn Photography",
  },
  description:
    "Senior portrait and family photographer serving South-Central Virginia. Editorial-style photography in Chatham, Danville, Lynchburg, and beyond.",
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
