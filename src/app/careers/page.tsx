import { Section, Reveal, GoldCard, SectionHeader, Button, Badge } from "@/components/ui/primitives";
import Link from "next/link";

export default function CareersPage() {
  return (
    <main className="bg-[#080808] pt-32 pb-24">
      <div className="pointer-events-none fixed inset-0 -z-10" style={{ backgroundImage: "linear-gradient(rgba(201,168,76,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,0.03) 1px, transparent 1px)", backgroundSize: "48px 48px" }} />
      <Section>
        <Reveal><SectionHeader eyebrow="Join Orbitix" title="Help interns become builders." subtitle="We're looking for experienced engineers and designers who want to mentor the next generation." /></Reveal>
        <div className="grid gap-6">
          {[
            { role: "Technical Mentor — Full Stack", type: "Part-time / Remote", req: ["3+ years with Next.js or React", "Experience in code review", "Clear, constructive communication", "Available 4–6 hours/week"] },
            { role: "Technical Mentor — AI & Automation", type: "Part-time / Remote", req: ["Experience with OpenAI, LangChain, or similar", "Built at least one production AI feature", "Can explain complex ideas simply", "Available 3–5 hours/week"] },
            { role: "Design Mentor — UI/UX", type: "Part-time / Remote", req: ["3+ years in product design", "Strong Figma skills", "Can run design reviews and critiques", "Available 3–5 hours/week"] },
          ].map((j, i) => (
            <Reveal key={j.role} delay={i * 0.08}>
              <GoldCard className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                <div>
                  <h2 className="text-xl font-black text-[#F5F0E8]">{j.role}</h2>
                  <Badge tone="default" className="mt-2">{j.type}</Badge>
                  <ul className="mt-4 grid gap-1.5">
                    {j.req.map((r) => <li key={r} className="flex items-center gap-2 text-sm text-[#F5F0E8]/60">· {r}</li>)}
                  </ul>
                </div>
                <div className="shrink-0 mt-4 md:mt-0">
                  <Link href="/contact"><Button variant="outline" size="sm">Apply now</Button></Link>
                </div>
              </GoldCard>
            </Reveal>
          ))}
        </div>
      </Section>
    </main>
  );
}
