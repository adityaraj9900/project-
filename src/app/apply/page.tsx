import { ApplicationForm } from "@/components/forms/platform-forms";
import { SimpleMarketingPage } from "@/components/sections/public-sections";
import { PremiumCard } from "@/components/ui/primitives";

export default function Page() {
  return <SimpleMarketingPage eyebrow="Apply" title="Apply for a project-based internship." body="Submit your application, create or reuse your student account, and track approval from your dashboard."><PremiumCard className="mx-auto max-w-2xl"><ApplicationForm /></PremiumCard></SimpleMarketingPage>;
}
