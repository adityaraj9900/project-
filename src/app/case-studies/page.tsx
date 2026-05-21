import { SimpleMarketingPage } from "@/components/sections/public-sections";
import { PremiumCard, ProgressBar } from "@/components/ui/primitives";

export default function Page() {
  return <SimpleMarketingPage eyebrow="Case studies" title="How we move from brief to shipped product." body="Each case study captures the business goal, scope, intern contribution, mentor QA, and delivery outcome."><div className="grid gap-5 md:grid-cols-2">{["FleetZen Operations Portal", "AI Admissions Assistant"].map((title, index) => <PremiumCard key={title}><h2 className="text-2xl font-bold">{title}</h2><p className="mt-3 text-white/60">Discovery, dashboard architecture, milestone tracking, QA, and launch handover.</p><div className="mt-5"><ProgressBar value={index ? 84 : 56} /></div></PremiumCard>)}</div></SimpleMarketingPage>;
}
