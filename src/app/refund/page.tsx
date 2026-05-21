import { SimpleMarketingPage } from "@/components/sections/public-sections";
import { PremiumCard } from "@/components/ui/primitives";

export default function Page() {
  return <SimpleMarketingPage eyebrow="Refund Policy" title="Refund status is tracked transparently." body="Payment records include pending, approved, rejected, and refund placeholders for production finance workflows."><PremiumCard><p className="text-white/65">Certificate and project milestone refunds depend on review status, service delivery stage, and admin approval.</p></PremiumCard></SimpleMarketingPage>;
}
