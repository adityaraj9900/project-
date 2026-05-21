"use client";

import { PortfolioPreview, SimpleMarketingPage } from "@/components/sections/public-sections";

export default function Page() {
  return <><SimpleMarketingPage eyebrow="Portfolio" title="Project showcase and live previews." body="A curated view of client projects, internal builds, and intern portfolio artifacts." /><PortfolioPreview /></>;
}
