"use client";

import { useEffect, useState } from "react";
import { CheckCircle2, Circle, Clock, BookOpen, Layers } from "lucide-react";
import { GoldCard, Badge } from "@/components/ui/primitives";

const SYLLABUS: Record<string, string[]> = {
  "full-stack-product-engineering": [
    "Next.js App Router & project setup",
    "TypeScript fundamentals & advanced patterns",
    "Tailwind CSS design systems",
    "Database design with PostgreSQL/SQLite",
    "Drizzle ORM & migrations",
    "REST API design & validation (Zod)",
    "Authentication with NextAuth",
    "Role-based access control",
    "React Hook Form & advanced forms",
    "Recharts dashboards",
    "Deployment to Vercel",
    "Final capstone project",
  ],
  "ai-automation-systems": [
    "OpenAI API fundamentals",
    "Prompt engineering patterns",
    "Streaming completions with Next.js",
    "n8n workflow automation",
    "CRM automation with Zapier / n8n",
    "Document generation pipelines",
    "Supabase real-time integration",
    "Building AI copilots",
    "Evaluation & safety layers",
    "Production deployment",
  ],
  "ui-ux-product-design": [
    "Design thinking & user research",
    "Figma mastery — components & variables",
    "Wireframing & information architecture",
    "Design systems & token-based theming",
    "Interactive prototyping",
    "Usability testing",
    "Lottie animations",
    "Developer handoff with Figma",
  ],
};

const ROADMAP: Record<string, { week: string; goal: string }[]> = {
  "full-stack-product-engineering": [
    { week: "Week 1–2", goal: "Project setup, TypeScript, component architecture" },
    { week: "Week 3–4", goal: "Database design, Drizzle ORM, API routes" },
    { week: "Week 5–6", goal: "Authentication, middleware, protected routes" },
    { week: "Week 7–8", goal: "Dashboard build, recharts, admin UI" },
    { week: "Week 9–10", goal: "File uploads, PDF generation, email flows" },
    { week: "Week 11–12", goal: "Capstone project + portfolio write-up" },
  ],
  "ai-automation-systems": [
    { week: "Week 1–2", goal: "OpenAI API, prompt engineering basics" },
    { week: "Week 3–4", goal: "n8n workflows, CRM automations" },
    { week: "Week 5–6", goal: "Document pipelines, streaming responses" },
    { week: "Week 7–8", goal: "AI copilot build + deployment" },
    { week: "Week 9–10", goal: "Capstone automation project" },
  ],
  "ui-ux-product-design": [
    { week: "Week 1–2", goal: "User research, Figma fundamentals" },
    { week: "Week 3–4", goal: "Wireframes & information architecture" },
    { week: "Week 5–6", goal: "Design system & component library" },
    { week: "Week 7", goal: "Interactive prototype & usability testing" },
    { week: "Week 8", goal: "Developer handoff + portfolio case study" },
  ],
};

interface EnrollmentData {
  enrollment: { progress: number; startDate: string; status: string };
  program: { title: string; slug: string; duration: string; category: string; description?: string };
}

export function StudentProgram() {
  const [data, setData] = useState<{ enrollment: EnrollmentData | null } | null>(null);

  useEffect(() => {
    fetch("/api/student/me").then((r) => r.json()).then(setData);
  }, []);

  const enrollment = data?.enrollment as EnrollmentData | null;
  const slug = enrollment?.program?.slug ?? "full-stack-product-engineering";
  const syllabus = SYLLABUS[slug] ?? SYLLABUS["full-stack-product-engineering"];
  const roadmap = ROADMAP[slug] ?? ROADMAP["full-stack-product-engineering"];
  const progress = enrollment?.enrollment?.progress ?? 0;
  const completedItems = Math.floor((progress / 100) * syllabus.length);

  if (!enrollment) {
    return (
      <GoldCard>
        <p className="text-center text-sm text-[#F5F0E8]/45 py-8">No program assigned yet.</p>
      </GoldCard>
    );
  }

  return (
    <div className="space-y-6">
      <GoldCard>
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <Badge tone="gold" className="mb-2">{enrollment.program.category}</Badge>
            <h2 className="text-2xl font-black text-[#F5F0E8]">{enrollment.program.title}</h2>
            <p className="mt-1 text-sm text-[#F5F0E8]/45 flex items-center gap-2">
              <Clock size={13} /> {enrollment.program.duration}
            </p>
          </div>
          <Badge tone={enrollment.enrollment.status === "active" ? "success" : "warning"}>
            {enrollment.enrollment.status}
          </Badge>
        </div>
        <div className="mt-5">
          <div className="mb-1.5 flex justify-between text-xs">
            <span className="text-[#F5F0E8]/45">Overall progress</span>
            <span className="font-bold text-[#C9A84C]">{progress}%</span>
          </div>
          <div className="h-2.5 w-full overflow-hidden rounded-full bg-[rgba(201,168,76,0.08)]">
            <div
              className="h-full rounded-full bg-gradient-to-r from-[#C9A84C] to-[#E8C97A] transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </GoldCard>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Syllabus */}
        <GoldCard>
          <h3 className="mb-4 flex items-center gap-2 font-black text-[#F5F0E8]">
            <BookOpen size={16} className="text-[#C9A84C]" /> Syllabus
          </h3>
          <div className="space-y-2.5">
            {syllabus.map((item, i) => {
              const done = i < completedItems;
              return (
                <div key={item} className="flex items-start gap-2.5 text-sm">
                  {done
                    ? <CheckCircle2 size={15} className="mt-0.5 shrink-0 text-[#C9A84C]" />
                    : <Circle size={15} className="mt-0.5 shrink-0 text-[#F5F0E8]/20" />}
                  <span className={done ? "text-[#F5F0E8]/80" : "text-[#F5F0E8]/40"}>{item}</span>
                </div>
              );
            })}
          </div>
        </GoldCard>

        {/* Roadmap */}
        <GoldCard>
          <h3 className="mb-4 flex items-center gap-2 font-black text-[#F5F0E8]">
            <Layers size={16} className="text-[#C9A84C]" /> Roadmap
          </h3>
          <div className="relative space-y-4 pl-5">
            <div className="absolute left-1.5 top-2 bottom-2 w-px bg-[rgba(201,168,76,0.15)]" />
            {roadmap.map((r, i) => (
              <div key={r.week} className="relative">
                <div className="absolute -left-4 top-1 h-2 w-2 rounded-full border border-[#C9A84C]/40 bg-[#080808]" />
                <p className="text-xs font-bold text-[#C9A84C]/70 uppercase tracking-wide">{r.week}</p>
                <p className="mt-0.5 text-sm text-[#F5F0E8]/60">{r.goal}</p>
              </div>
            ))}
          </div>
        </GoldCard>
      </div>
    </div>
  );
}
