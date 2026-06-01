import { Section, Reveal, GoldCard, SectionHeader, GoldDivider, Button, Badge } from "@/components/ui/primitives";
import { CheckCircle2, X } from "lucide-react";
import Link from "next/link";

export default function PricingPage() {
  return (
    <main className="bg-[#080808] pt-32 pb-24">
      <div className="pointer-events-none fixed inset-0 -z-10" style={{ backgroundImage: "linear-gradient(rgba(201,168,76,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,0.03) 1px, transparent 1px)", backgroundSize: "48px 48px" }} />
      <Section>
        <Reveal><SectionHeader center eyebrow="Pricing" title="Transparent from day one." subtitle="Internships are always free. Agency projects are scoped through milestones." /></Reveal>
        <div className="mb-14 grid gap-6 lg:grid-cols-2">
          <Reveal delay={0.05}>
            <GoldCard className="border-emerald-500/20">
              <Badge tone="success" className="mb-4">For students</Badge>
              <h2 className="text-3xl font-black text-[#F5F0E8]">Intern programs</h2>
              <div className="my-6 text-5xl font-black text-emerald-400">₹0</div>
              <p className="text-sm text-[#F5F0E8]/55 mb-6">Free. Forever. No exceptions.</p>
              <div className="grid gap-3">
                {["Apply for any program", "Mentor reviews & feedback", "Real client-grade tasks", "Portfolio case study", "Digital certificate (free)", "Letter of Recommendation"].map((f) => (
                  <div key={f} className="flex items-center gap-2 text-sm text-[#F5F0E8]/75"><CheckCircle2 size={14} className="shrink-0 text-emerald-400" />{f}</div>
                ))}
                <div className="flex items-center gap-2 text-sm text-[#F5F0E8]/35"><X size={14} className="shrink-0" />No payment. No fee. Ever.</div>
              </div>
              <div className="mt-6"><Link href="/programs"><Button variant="gold" className="w-full justify-center">Apply as intern →</Button></Link></div>
            </GoldCard>
          </Reveal>
          <Reveal delay={0.1}>
            <GoldCard>
              <Badge tone="gold" className="mb-4">For businesses</Badge>
              <h2 className="text-3xl font-black text-[#F5F0E8]">Agency projects</h2>
              <div className="my-6 text-5xl font-black text-[#C9A84C]">₹65K+</div>
              <p className="text-sm text-[#F5F0E8]/55 mb-6">Scoped through milestones. Pay only on delivery.</p>
              <div className="grid gap-3">
                {["Discovery & requirements scoping", "Design system + UI delivery", "Full-stack development", "Testing & QA", "Deployment & handover", "30-day post-launch support"].map((f) => (
                  <div key={f} className="flex items-center gap-2 text-sm text-[#F5F0E8]/75"><CheckCircle2 size={14} className="shrink-0 text-[#C9A84C]" />{f}</div>
                ))}
              </div>
              <div className="mt-6"><Link href="/contact"><Button variant="outline" className="w-full justify-center">Get a free quote →</Button></Link></div>
            </GoldCard>
          </Reveal>
        </div>
        <GoldDivider className="my-12" />
        <Reveal>
          <div className="text-center">
            <h3 className="text-2xl font-black text-[#F5F0E8]">Custom requirements?</h3>
            <p className="mt-2 text-[#F5F0E8]/50">We scope every project individually. Book a free call.</p>
            <div className="mt-6"><Link href="/contact"><Button variant="ghost">Book a free consultation</Button></Link></div>
          </div>
        </Reveal>
      </Section>
    </main>
  );
}
