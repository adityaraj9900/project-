import { LeadForm } from "@/components/forms/platform-forms";
import { SimpleMarketingPage } from "@/components/sections/public-sections";
import { PremiumCard } from "@/components/ui/primitives";

export default function Page() {
  return <SimpleMarketingPage eyebrow="Request quote" title="Tell us what you want to build." body="Your inquiry enters the admin lead pipeline: New, Contacted, Proposal Sent, Won, or Lost."><PremiumCard className="mx-auto max-w-2xl"><LeadForm /></PremiumCard></SimpleMarketingPage>;
}
