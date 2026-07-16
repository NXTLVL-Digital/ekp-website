import type { Metadata } from "next";
import { StaticHtmlPage } from "@/components/static/StaticHtmlPage";
import { loadStaticPage } from "@/lib/staticPages";

const page = loadStaticPage("portfolio.html");

export const metadata: Metadata = {
  title: page.title,
  description: page.description,
};

export default function PortfolioPage() {
  return <StaticHtmlPage html={page.html} />;
}
