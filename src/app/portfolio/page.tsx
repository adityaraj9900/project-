import { Section, Reveal, GoldCard, Badge, SectionHeader, Button } from "@/components/ui/primitives";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const PROJECTS = [
  { title: "FleetZen Operations Portal", category: "SaaS", tech: ["Next.js", "PostgreSQL", "Tailwind"], desc: "Full-stack logistics SaaS with driver management, billing dashboards, and milestone tracking.", status: "Delivered" },
  { title: "EduFlow Learning Platform", category: "EdTech", tech: ["React", "Node.js", "MongoDB"], desc: "AI-powered course platform with adaptive learning paths and instructor analytics.", status: "Delivered" },
  { title: "RetailBoost E-commerce Suite", category: "Commerce", tech: ["Next.js", "Shopify API", "Stripe"], desc: "High-converting storefront with smart upsells, loyalty points, and advanced analytics.", status: "Delivered" },
  { title: "LegalDesk CRM", category: "Operations", tech: ["React", "Supabase", "PDF.js"], desc: "Case management and billing system for a 30-lawyer legal firm. Custom document workflows.", status: "Delivered" },
  { title: "Orbit AI Copilot", category: "AI", tech: ["OpenAI API", "Next.js", "Redis"], desc: "Internal AI assistant for a fintech company — document Q&A, data lookup, and action execution.", status: "Delivered" },
  { title: "HealthPulse Mobile App", category: "Mobile", tech: ["React Native", "Firebase", "HealthKit"], desc: "Wellness tracking app with biometric sync, coach messaging, and goal streaks.", status: "Delivered" },
];

export default function PortfolioPage() {
  return (
    <main className="bg-[#080808] pt-32 pb-24">
      <div className="pointer-events-none fixed inset-0 -z-10" style={{ backgroundImage: "linear-gradient(rgba(201,168,76,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,0.03) 1px, transparent 1px)", backgroundSize: "48px 48px" }} />
      <Section>
        <Reveal><SectionHeader eyebrow="Portfolio" title="Work we're proud of." subtitle="A selection of projects delivered for ambitious clients across industries." /></Reveal>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {PROJECTS.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.07}>
              <GoldCard className="flex h-full flex-col gap-4">
                <Badge tone="gold">{p.category}</Badge>
                <div>
                  <h3 className="text-lg font-black text-[#F5F0E8]">{p.title}</h3>
                  <p className="mt-2 text-sm text-[#F5F0E8]/55">{p.desc}</p>
                </div>
                <div className="flex flex-wrap gap-1.5 mt-auto">
                  {p.tech.map((t) => <span key={t} className="rounded-md border border-[rgba(201,168,76,0.12)] bg-[rgba(201,168,76,0.04)] px-2 py-1 text-xs text-[#F5F0E8]/50">{t}</span>)}
                </div>
              </GoldCard>
            </Reveal>
          ))}
        </div>
        <Reveal>
          <div className="mt-12 text-center">
            <h3 className="text-2xl font-black text-[#F5F0E8]">Ready to be our next case study?</h3>
            <p className="mt-2 text-[#F5F0E8]/50">Get a tailored proposal within 24 hours.</p>
            <div className="mt-6"><Link href="/contact"><Button variant="gold" size="lg">Start a project <ArrowRight size={15} /></Button></Link></div>
          </div>
        </Reveal>
      </Section>
    </main>
  );
}
