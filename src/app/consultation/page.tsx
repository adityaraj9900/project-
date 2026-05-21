import { LeadForm } from "@/components/forms/platform-forms";
import { SimpleMarketingPage } from "@/components/sections/public-sections";
import { PremiumCard } from "@/components/ui/primitives";

export default function Page() {
  return <SimpleMarketingPage eyebrow="Book consultation" title="Plan a premium product build." body="Use this form to request a discovery call. In production this can connect to Google Calendar or Calendly."><PremiumCard className="mx-auto max-w-2xl"><LeadForm /></PremiumCard></SimpleMarketingPage>;
}
