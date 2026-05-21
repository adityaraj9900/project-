import { ShieldCheck, Sparkles, UsersRound } from "lucide-react";
import { SimpleMarketingPage } from "@/components/sections/public-sections";
import { PremiumCard } from "@/components/ui/primitives";

export default function Page() {
  return (
    <SimpleMarketingPage eyebrow="About" title="A product studio built around applied learning." body="Orbit Labs Academy merges internship training, mentor review, and client delivery into one operating system. Students learn by shipping, while clients receive transparent product execution.">
      <div className="grid gap-5 md:grid-cols-3">
        {[["Real briefs", "Students work on scoped product modules with acceptance criteria.", <Sparkles key="i" />], ["Mentor review", "Submissions get feedback, resubmission paths, and progress tracking.", <UsersRound key="i" />], ["Verified outcomes", "Certificates include public IDs, QR-ready URLs, and revocation states.", <ShieldCheck key="i" />]].map(([title, body, icon]) => <PremiumCard key={String(title)}><span className="text-aurora">{icon}</span><h2 className="mt-4 text-2xl font-bold">{title}</h2><p className="mt-3 text-white/62">{body}</p></PremiumCard>)}
      </div>
    </SimpleMarketingPage>
  );
}
