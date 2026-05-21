import { SimpleMarketingPage } from "@/components/sections/public-sections";
import { PremiumCard } from "@/components/ui/primitives";

export default function Page() {
  return <SimpleMarketingPage eyebrow="Privacy Policy" title="Privacy-first by design." body="The production platform should connect secure auth, storage, analytics, and consent controls."><PremiumCard><p className="text-white/65">We collect profile, application, submission, payment proof, project, and support data only to operate internships and agency delivery.</p></PremiumCard></SimpleMarketingPage>;
}
