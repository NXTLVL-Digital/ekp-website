import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Emily Kathryn Photography | Studio",
  description: "Content management studio for Emily Kathryn Photography",
};

export default function StudioLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
