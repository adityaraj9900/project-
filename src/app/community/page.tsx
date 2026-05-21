import { MessageCircle, UsersRound } from "lucide-react";
import { SimpleMarketingPage } from "@/components/sections/public-sections";
import { PremiumCard } from "@/components/ui/primitives";

export default function Page() {
  return <SimpleMarketingPage eyebrow="Community" title="A builder community around real projects." body="Discord, WhatsApp, Telegram, announcements, resources, and leaderboard hooks are ready for production integrations."><div className="grid gap-5 md:grid-cols-2"><PremiumCard><UsersRound className="text-aurora" /><h2 className="mt-4 text-2xl font-bold">Peer learning</h2><p className="mt-3 text-white/60">Cohort rooms, batch updates, and mentor office hours.</p></PremiumCard><PremiumCard><MessageCircle className="text-solar" /><h2 className="mt-4 text-2xl font-bold">Communication links</h2><p className="mt-3 text-white/60">WhatsApp and Telegram placeholders for announcements and support.</p></PremiumCard></div></SimpleMarketingPage>;
}
