import Link from "next/link";
import { Section, Reveal, GoldCard, SectionHeader, Button } from "@/components/ui/primitives";

export default function CommunityPage() {
  return (
    <main className="bg-[#080808] pt-32 pb-24">
      <div className="pointer-events-none fixed inset-0 -z-10" style={{ backgroundImage: "linear-gradient(rgba(201,168,76,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,0.03) 1px, transparent 1px)", backgroundSize: "48px 48px" }} />
      <Section>
        <Reveal><SectionHeader eyebrow="Community" title="Built by builders, for builders." subtitle="A space for Orbitix interns and alumni to share, learn, and grow." /></Reveal>
        <Reveal delay={0.1}><GoldCard className="text-center p-10">
          <p className="text-[#F5F0E8]/55 mb-6">Join the intern community — announcements, resources, leaderboard, and peer support.</p>
          <Link href="/auth/login"><Button variant="gold">Access your dashboard</Button></Link>
        </GoldCard></Reveal>
      </Section>
    </main>
  );
}
