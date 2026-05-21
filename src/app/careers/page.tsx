import { SimpleMarketingPage } from "@/components/sections/public-sections";
import { PremiumCard } from "@/components/ui/primitives";

export default function Page() {
  return <SimpleMarketingPage eyebrow="Careers / Become mentor" title="Help interns become builders." body="Mentors review submissions, guide batches, write resources, and help client delivery teams maintain quality."><PremiumCard><h2 className="text-2xl font-bold">Open role: Technical Mentor</h2><p className="mt-3 text-white/60">Experience with Next.js, product thinking, code review, and humane feedback required.</p></PremiumCard></SimpleMarketingPage>;
}
