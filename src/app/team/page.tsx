import { SimpleMarketingPage } from "@/components/sections/public-sections";
import { PremiumCard } from "@/components/ui/primitives";

export default function Page() {
  return <SimpleMarketingPage eyebrow="Founder / Team" title="Mentors, builders, operators." body="The team page is CMS-ready and showcases founder story, mentor profiles, delivery leads, and hiring opportunities."><div className="grid gap-5 md:grid-cols-3">{["Aarav Superadmin · Founder", "Maya Mentor · Engineering mentor", "Riya Sharma · Intern builder"].map((person) => <PremiumCard key={person}><div className="h-28 rounded-2xl bg-gradient-to-br from-aurora/30 to-plasma/30" /><h2 className="mt-5 text-xl font-bold">{person}</h2><p className="mt-2 text-white/55">Product craft, mentorship, and delivery excellence.</p></PremiumCard>)}</div></SimpleMarketingPage>;
}
