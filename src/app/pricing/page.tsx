import { SimpleMarketingPage } from "@/components/sections/public-sections";
import { PremiumCard } from "@/components/ui/primitives";

export default function Page() {
  return <SimpleMarketingPage eyebrow="Pricing" title="Transparent pricing for learning and product delivery." body="Applications can be free, certificates can be paid, and agency projects are scoped through proposal milestones."><div className="grid gap-5 md:grid-cols-3">{[["Internship application", "₹0", "Apply free and wait for approval."], ["Certificate review", "₹999-₹1,999", "Manual UPI proof and admin approval."], ["Agency projects", "₹65K+", "Proposal, milestones, invoices, and delivery tracking."]].map(([title, price, body]) => <PremiumCard key={title}><h2 className="text-xl font-bold">{title}</h2><p className="mt-4 text-4xl font-black text-aurora">{price}</p><p className="mt-3 text-white/60">{body}</p></PremiumCard>)}</div></SimpleMarketingPage>;
}
