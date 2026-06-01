import { Section, Reveal, GoldCard, SectionHeader, GoldDivider } from "@/components/ui/primitives";
import { ShieldCheck, Users, Zap } from "lucide-react";

const TEAM = [
  { name: "Aarav Sharma", role: "Founder & CEO", bio: "Full-stack product engineer with 8 years building SaaS products." },
  { name: "Maya Patel", role: "Lead Mentor & CTO", bio: "Senior engineer and mentor obsessed with clean architecture." },
  { name: "Rohan Verma", role: "Design Lead", bio: "Product designer specialising in premium B2B interfaces." },
];

export default function AboutPage() {
  return (
    <main className="bg-[#080808] pt-32 pb-24">
      <div className="pointer-events-none fixed inset-0 -z-10" style={{ backgroundImage: "linear-gradient(rgba(201,168,76,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,0.03) 1px, transparent 1px)", backgroundSize: "48px 48px" }} />
      <Section>
        <Reveal><SectionHeader eyebrow="About Orbitix" title="We build the tech. We train the builders." subtitle="Orbitix is a premium IT services agency that delivers world-class digital products — and runs free internship programs where students ship real work." /></Reveal>
        <div className="grid gap-6 md:grid-cols-3">
          {[{ icon: Zap, title: "Our mission", body: "To close the gap between education and industry by giving students access to real projects, real mentors, and real feedback — at zero cost." }, { icon: Users, title: "Our model", body: "We run a premium IT agency for clients while simultaneously training interns on those same client-grade briefs. Everyone ships real work." }, { icon: ShieldCheck, title: "Our promise", body: "Internships are 100% free. No certificate fee. No application fee. No hidden charges. This is non-negotiable and will never change." }].map((item, i) => (
            <Reveal key={item.title} delay={i * 0.08}>
              <GoldCard>
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl border border-[rgba(201,168,76,0.2)] bg-[rgba(201,168,76,0.08)]">
                  <item.icon size={22} className="text-[#C9A84C]" />
                </div>
                <h3 className="mb-2 font-bold text-[#F5F0E8]">{item.title}</h3>
                <p className="text-sm text-[#F5F0E8]/55">{item.body}</p>
              </GoldCard>
            </Reveal>
          ))}
        </div>
        <GoldDivider className="my-16" />
        <Reveal><SectionHeader eyebrow="Our team" title="The people behind Orbitix" /></Reveal>
        <div className="grid gap-6 md:grid-cols-3">
          {TEAM.map((m, i) => (
            <Reveal key={m.name} delay={i * 0.08}>
              <GoldCard className="text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full border border-[rgba(201,168,76,0.3)] bg-[rgba(201,168,76,0.08)] text-2xl font-black text-[#C9A84C]">{m.name[0]}</div>
                <h3 className="font-bold text-[#F5F0E8]">{m.name}</h3>
                <p className="text-sm text-[#C9A84C]">{m.role}</p>
                <p className="mt-3 text-sm text-[#F5F0E8]/50">{m.bio}</p>
              </GoldCard>
            </Reveal>
          ))}
        </div>
      </Section>
    </main>
  );
}
