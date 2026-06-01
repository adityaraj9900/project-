"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { CheckCircle2, ArrowLeft } from "lucide-react";
import { Section, Reveal, GoldCard, Badge, Button, GoldDivider } from "@/components/ui/primitives";

const PROGRAMS = [
  { slug: "full-stack-product-engineering", title: "Full-Stack Product Engineering", category: "Engineering", level: "Intermediate", duration: "12 weeks", stack: ["Next.js", "TypeScript", "PostgreSQL", "Tailwind", "Zod"], summary: "Build SaaS dashboards, APIs, auth flows, and client-ready product modules on real briefs.", syllabus: ["Next.js App Router", "TypeScript architecture", "API contracts", "Database modeling", "Deployment reviews"], roadmap: ["Foundation sprint", "Feature sprint", "Client simulation", "Production polish", "Portfolio launch"] },
  { slug: "ai-automation-systems", title: "AI Automation Systems", category: "AI", level: "Advanced", duration: "10 weeks", stack: ["OpenAI API", "Node.js", "Next.js", "Supabase", "n8n"], summary: "Design AI workflows, CRM automations, and production-ready prompt systems.", syllabus: ["AI product discovery", "Workflow automation", "Vector search basics", "API integration", "Monitoring"], roadmap: ["Use-case map", "Prototype", "Integration", "Evaluation", "Client demo"] },
  { slug: "ui-ux-product-design", title: "UI/UX Product Design", category: "Design", level: "Beginner", duration: "8 weeks", stack: ["Figma", "FigJam", "Framer", "Design tokens", "Lottie"], summary: "Research, wireframe, prototype, and hand off premium SaaS interfaces for real clients.", syllabus: ["Research", "Information architecture", "Design systems", "Prototype testing", "Developer handoff"], roadmap: ["Audit", "Flows", "Components", "Prototype", "Case study"] },
];

export default function ProgramDetailPage() {
  const { slug } = useParams();
  const program = PROGRAMS.find((p) => p.slug === slug) ?? PROGRAMS[0];
  return (
    <main className="bg-[#080808] pt-32 pb-24">
      <div className="pointer-events-none fixed inset-0 -z-10" style={{ backgroundImage: "linear-gradient(rgba(201,168,76,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,0.03) 1px, transparent 1px)", backgroundSize: "48px 48px" }} />
      <Section>
        <Reveal><Link href="/programs" className="mb-8 inline-flex items-center gap-2 text-sm text-[#F5F0E8]/45 hover:text-[#C9A84C] transition-colors"><ArrowLeft size={14} /> All programs</Link></Reveal>
        <Reveal>
          <div className="mb-4 flex items-center gap-2"><Badge tone="gold">{program.category}</Badge><Badge tone="default">{program.level}</Badge><div className="ml-2 flex items-center gap-1.5 rounded-full border border-emerald-500/25 bg-emerald-500/8 px-3 py-1 text-xs font-bold text-emerald-400"><span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />100% FREE</div></div>
          <h1 className="text-5xl font-black text-[#F5F0E8] md:text-7xl">{program.title}</h1>
          <p className="mt-6 max-w-2xl text-lg text-[#F5F0E8]/55 leading-relaxed">{program.summary}</p>
          <div className="mt-8 flex flex-wrap gap-4"><Link href="/auth/login"><Button variant="gold" size="lg">Apply Now — Free</Button></Link><Link href="/verify"><Button variant="outline">Verify Certificate</Button></Link></div>
        </Reveal>
        <GoldDivider className="my-12" />
        <div className="grid gap-6 lg:grid-cols-3">
          <Reveal delay={0.05}><GoldCard><h2 className="mb-5 text-xl font-black text-[#F5F0E8]">Syllabus</h2><div className="grid gap-3">{program.syllabus.map((item) => <div key={item} className="flex items-center gap-2 text-sm text-[#F5F0E8]/70"><CheckCircle2 size={14} className="shrink-0 text-[#C9A84C]" />{item}</div>)}</div></GoldCard></Reveal>
          <Reveal delay={0.1}><GoldCard><h2 className="mb-5 text-xl font-black text-[#F5F0E8]">Roadmap</h2><div className="grid gap-3">{program.roadmap.map((item, i) => <div key={item} className="flex items-center gap-3 text-sm text-[#F5F0E8]/70"><span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-[rgba(201,168,76,0.3)] text-xs font-bold text-[#C9A84C]">{i + 1}</span>{item}</div>)}</div></GoldCard></Reveal>
          <Reveal delay={0.15}><GoldCard><h2 className="mb-5 text-xl font-black text-[#F5F0E8]">Tech stack</h2><div className="flex flex-wrap gap-2">{program.stack.map((s) => <span key={s} className="rounded-md border border-[rgba(201,168,76,0.2)] bg-[rgba(201,168,76,0.06)] px-3 py-1.5 text-sm text-[#C9A84C]">{s}</span>)}</div><div className="mt-6 border-t border-[rgba(201,168,76,0.1)] pt-5 text-sm text-[#F5F0E8]/45">Duration: {program.duration}</div></GoldCard></Reveal>
        </div>
      </Section>
    </main>
  );
}
