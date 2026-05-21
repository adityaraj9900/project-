import { SimpleMarketingPage } from "@/components/sections/public-sections";
import { PremiumCard } from "@/components/ui/primitives";

export default function Page() {
  return <SimpleMarketingPage eyebrow="Student success" title="Portfolio-ready outcomes from real work." body="Students finish with task history, mentor feedback, GitHub/live links, badges, and verifiable certificates."><div className="grid gap-5 md:grid-cols-3">{["Dashboard architect", "AI automation builder", "Product designer"].map((title) => <PremiumCard key={title}><h2 className="text-xl font-bold">{title}</h2><p className="mt-3 text-white/60">Completed project modules, improved after review, and shipped a public artifact.</p></PremiumCard>)}</div></SimpleMarketingPage>;
}
