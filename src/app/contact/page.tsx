import { LeadForm, TicketForm } from "@/components/forms/platform-forms";
import { SimpleMarketingPage } from "@/components/sections/public-sections";
import { PremiumCard } from "@/components/ui/primitives";

export default function Page() {
  return <SimpleMarketingPage eyebrow="Contact" title="Reach the academy or the agency desk." body="Send a client inquiry or create a support ticket after login. WhatsApp and Telegram placeholders are ready for production links."><div className="grid gap-5 lg:grid-cols-2"><PremiumCard><h2 className="mb-5 text-2xl font-bold">Client inquiry</h2><LeadForm /></PremiumCard><PremiumCard><h2 className="mb-5 text-2xl font-bold">Support ticket</h2><TicketForm /></PremiumCard></div></SimpleMarketingPage>;
}
