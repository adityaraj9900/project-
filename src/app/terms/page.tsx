import { SimpleMarketingPage } from "@/components/sections/public-sections";
import { PremiumCard } from "@/components/ui/primitives";

export default function Page() {
  return <SimpleMarketingPage eyebrow="Terms & Conditions" title="Platform usage terms." body="Use the platform respectfully, submit original work, and follow program and project rules."><PremiumCard><p className="text-white/65">Internship access, client delivery, payment proofs, certificate issuance, revocation, support, and content usage are governed by admin-reviewed policies. This placeholder is ready for legal copy.</p></PremiumCard></SimpleMarketingPage>;
}
