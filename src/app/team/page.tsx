import { Section, Reveal, GoldCard, SectionHeader } from "@/components/ui/primitives";

const TEAM = [
  { name: "Aarav Sharma", role: "Founder & CEO", bio: "Full-stack product engineer with 8 years building SaaS products.", initial: "A" },
  { name: "Maya Patel", role: "Lead Mentor & CTO", bio: "Senior engineer and mentor obsessed with clean architecture.", initial: "M" },
  { name: "Rohan Verma", role: "Design Lead", bio: "Product designer specialising in premium B2B interfaces.", initial: "R" },
];

export default function TeamPage() {
  return (
    <main className="bg-[#080808] pt-32 pb-24">
      <div className="pointer-events-none fixed inset-0 -z-10" style={{ backgroundImage: "linear-gradient(rgba(201,168,76,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,0.03) 1px, transparent 1px)", backgroundSize: "48px 48px" }} />
      <Section>
        <Reveal><SectionHeader eyebrow="The team" title="Meet the builders." subtitle="The people who deliver for clients and mentor the next generation." /></Reveal>
        <div className="grid gap-6 md:grid-cols-3">
          {TEAM.map((m, i) => (
            <Reveal key={m.name} delay={i * 0.08}>
              <GoldCard className="text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full border border-[rgba(201,168,76,0.3)] bg-[rgba(201,168,76,0.08)] text-2xl font-black text-[#C9A84C]">{m.initial}</div>
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
