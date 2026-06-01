"use client";

import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Section, Reveal, GoldCard, Badge, Button, SectionHeader, GoldDivider } from "@/components/ui/primitives";

const PROGRAMS = [
  { slug: "full-stack-product-engineering", title: "Full-Stack Product Engineering", category: "Engineering", level: "Intermediate", duration: "12 weeks", stack: ["Next.js", "TypeScript", "PostgreSQL", "Tailwind", "Zod"], summary: "Build SaaS dashboards, APIs, auth flows, and client-ready product modules on real briefs.", benefits: ["Real project work", "Mentor code reviews", "Portfolio case study", "Free certificate"] },
  { slug: "ai-automation-systems", title: "AI Automation Systems", category: "AI", level: "Advanced", duration: "10 weeks", stack: ["OpenAI API", "Node.js", "Next.js", "Supabase", "n8n"], summary: "Design AI workflows, CRM automations, and production-ready prompt systems.", benefits: ["Automation portfolio", "Client-style briefs", "Mentor critique", "Free certificate"] },
  { slug: "ui-ux-product-design", title: "UI/UX Product Design", category: "Design", level: "Beginner", duration: "8 weeks", stack: ["Figma", "FigJam", "Framer", "Design tokens", "Lottie"], summary: "Research, wireframe, prototype, and hand off premium SaaS interfaces for real clients.", benefits: ["Portfolio-ready work", "Design review", "Live redesign briefs", "Free certificate"] },
];

export default function ProgramsPage() {
  return (
    <main className="bg-[#080808] pt-32 pb-24">
      <div className="pointer-events-none fixed inset-0 -z-10" style={{ backgroundImage: "linear-gradient(rgba(201,168,76,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,0.03) 1px, transparent 1px)", backgroundSize: "48px 48px" }} />
      <Section>
        <Reveal><SectionHeader eyebrow="Free internship programs" title="Learn by building real things" subtitle="Three tracks. Real clients. Senior mentors. Zero fees. We mean it." /></Reveal>
        <Reveal>
          <div className="mb-10 inline-flex items-center gap-2 rounded-full border border-emerald-500/25 bg-emerald-500/8 px-5 py-2.5 text-sm font-semibold text-emerald-400">
            <CheckCircle2 size={14} />
            100% Free — no application fee, no certificate fee, no hidden charges. Ever.
          </div>
        </Reveal>
        <div className="grid gap-8 lg:grid-cols-3">
          {PROGRAMS.map((p, i) => (
            <Reveal key={p.slug} delay={i * 0.1}>
              <GoldCard className="flex h-full flex-col gap-5">
                <div className="flex items-center gap-2">
                  <Badge tone="gold">{p.category}</Badge>
                  <Badge tone="default">{p.level}</Badge>
                </div>
                <div>
                  <h2 className="text-2xl font-black text-[#F5F0E8]">{p.title}</h2>
                  <p className="mt-3 text-sm text-[#F5F0E8]/55 leading-relaxed">{p.summary}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {p.stack.map((s) => <span key={s} className="rounded-md border border-[rgba(201,168,76,0.12)] bg-[rgba(201,168,76,0.04)] px-2.5 py-1 text-xs text-[#F5F0E8]/55">{s}</span>)}
                </div>
                <div className="grid gap-2">
                  {p.benefits.map((b) => <div key={b} className="flex items-center gap-2 text-sm text-[#F5F0E8]/65"><CheckCircle2 size={13} className="shrink-0 text-[#C9A84C]" />{b}</div>)}
                </div>
                <div className="mt-auto flex items-center justify-between border-t border-[rgba(201,168,76,0.1)] pt-4">
                  <div className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-emerald-400" /><span className="text-xs font-bold text-emerald-400">100% FREE</span></div>
                  <span className="text-sm text-[#F5F0E8]/40">{p.duration}</span>
                </div>
                <Link href={`/programs/${p.slug}`}><Button variant="gold" className="w-full justify-center">Apply Now <ArrowRight size={14} /></Button></Link>
              </GoldCard>
            </Reveal>
          ))}
        </div>
      </Section>
    </main>
  );
}
