"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import {
  ArrowRight, CheckCircle2, ChevronDown, ChevronRight,
  Sparkles, Zap, Users, Star, ShieldCheck, BookOpen, Briefcase, Globe
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Reveal, GoldCard, Button, Badge, GoldDivider,
  SectionHeader, Section,
} from "@/components/ui/primitives";
import { HeroScene } from "@/components/three/hero-scene";

/* ─── SimpleMarketingPage (gold themed wrapper) ─────────── */

export function SimpleMarketingPage({
  eyebrow,
  title,
  body,
  children,
}: {
  eyebrow?: string;
  title: string;
  body?: string;
  children?: React.ReactNode;
}) {
  return (
    <main className="bg-[#080808] pt-32 pb-24">
      <div
        className="pointer-events-none fixed inset-0 -z-10"
        style={{
          backgroundImage:
            "linear-gradient(rgba(201,168,76,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,0.03) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />
      <Section>
        <Reveal>
          <SectionHeader eyebrow={eyebrow} title={title} subtitle={body} />
        </Reveal>
        {children}
      </Section>
    </main>
  );
}

/* ─── HOMEPAGE ──────────────────────────────────────────── */

export function HomePage() {
  return (
    <main className="bg-[#080808]">
      <HeroSection />
      <ServicesPreview />
      <ProgramsSection />
      <WhyOrbitix />
      <TestimonialsMarquee />
      <FaqSection />
      <FinalCTA />
    </main>
  );
}

/* ─── Hero ───────────────────────────────────────────────── */

function HeroSection() {
  return (
    <section className="relative min-h-screen overflow-hidden px-6 pt-28 pb-20">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(201,168,76,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,0.04) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />
      <div className="pointer-events-none absolute left-0 top-0 h-[600px] w-[600px] rounded-full bg-[rgba(201,168,76,0.05)] blur-[160px]" />

      <div className="relative mx-auto flex max-w-7xl flex-col items-start gap-12 lg:flex-row lg:items-center">
        <div className="max-w-2xl flex-1">
          <Reveal>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[rgba(201,168,76,0.25)] bg-[rgba(201,168,76,0.06)] px-4 py-2 text-xs font-semibold text-[#C9A84C]">
              <Zap size={12} className="fill-current" />
              Now accepting intern applications — 100% Free
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="text-5xl font-black leading-[1.05] text-[#F5F0E8] md:text-7xl lg:text-8xl">
              We build the tech.{" "}
              <span className="text-[#C9A84C]">We train the builders.</span>
            </h1>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-6 max-w-xl text-lg text-[#F5F0E8]/55 leading-relaxed">
              Orbitix is a premium IT services agency that delivers world-class digital products —
              and runs{" "}
              <span className="font-medium text-[#F5F0E8]/80">free internship programs</span>{" "}
              where students ship real work.
            </p>
          </Reveal>
          <Reveal delay={0.24}>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link href="/services">
                <Button variant="gold" size="lg">Explore Services <ArrowRight size={16} /></Button>
              </Link>
              <Link href="/programs">
                <Button variant="outline" size="lg">Apply as Intern</Button>
              </Link>
            </div>
          </Reveal>
          <Reveal delay={0.32}>
            <div className="mt-12 flex flex-wrap gap-8">
              {[
                { value: "20+", label: "Services" },
                { value: "100%", label: "Free Programs" },
                { value: "Real", label: "Client Projects" },
              ].map((s) => (
                <div key={s.label}>
                  <div className="text-3xl font-black text-[#C9A84C]">{s.value}</div>
                  <div className="text-sm text-[#F5F0E8]/45">{s.label}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
        <div className="relative w-full flex-1 lg:max-w-lg">
          <Reveal delay={0.1}><HeroScene /></Reveal>
        </div>
      </div>
    </section>
  );
}

/* ─── Services Preview ───────────────────────────────────── */

const PREVIEW_SERVICES = [
  { title: "Web App Development", category: "Engineering", price: 85000, desc: "Premium dashboards, portals, and internal tools." },
  { title: "AI Integration", category: "AI", price: 65000, desc: "Copilots, automation systems, and document workflows." },
  { title: "SaaS Development", category: "Product", price: 150000, desc: "Subscription-ready SaaS with auth, billing, and analytics." },
  { title: "UI/UX Design", category: "Design", price: 45000, desc: "Premium design systems and developer-ready prototypes." },
  { title: "Mobile App Development", category: "Mobile", price: 120000, desc: "Cross-platform apps with polished onboarding and auth." },
  { title: "E-commerce Development", category: "Commerce", price: 70000, desc: "High-converting stores and catalog systems." },
];

function ServicesPreview() {
  const [filter, setFilter] = useState("All");
  const cats = ["All", "Engineering", "AI", "Product", "Design", "Mobile", "Commerce"];
  const filtered = filter === "All" ? PREVIEW_SERVICES : PREVIEW_SERVICES.filter((s) => s.category === filter);

  return (
    <Section id="services">
      <Reveal>
        <SectionHeader eyebrow="What we build" title="World-class digital products" subtitle="From sleek landing pages to complex SaaS platforms — we ship with precision." />
      </Reveal>
      <Reveal>
        <div className="mb-10 flex flex-wrap gap-2">
          {cats.map((c) => (
            <button
              key={c}
              onClick={() => setFilter(c)}
              className={cn(
                "rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-wide transition-all",
                filter === c
                  ? "border-[rgba(201,168,76,0.5)] bg-[rgba(201,168,76,0.12)] text-[#C9A84C]"
                  : "border-[rgba(201,168,76,0.1)] text-[#F5F0E8]/45 hover:border-[rgba(201,168,76,0.25)] hover:text-[#F5F0E8]/75"
              )}
            >
              {c}
            </button>
          ))}
        </div>
      </Reveal>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((svc, i) => (
          <Reveal key={svc.title} delay={i * 0.06}>
            <GoldCard className="flex h-full flex-col gap-4">
              <div className="flex items-start justify-between">
                <Badge tone="gold">{svc.category}</Badge>
                <ArrowRight size={16} className="text-[#C9A84C]/50" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-[#F5F0E8]">{svc.title}</h3>
                <p className="mt-1.5 text-sm text-[#F5F0E8]/50">{svc.desc}</p>
              </div>
              <div className="mt-auto flex items-center justify-between border-t border-[rgba(201,168,76,0.1)] pt-3">
                <span className="text-sm text-[#F5F0E8]/40">From</span>
                <span className="text-base font-bold text-[#C9A84C]">₹{(svc.price / 1000).toFixed(0)}K</span>
              </div>
            </GoldCard>
          </Reveal>
        ))}
      </div>
      <Reveal>
        <div className="mt-10 text-center">
          <Link href="/services">
            <Button variant="outline">View all 20 services <ChevronRight size={15} /></Button>
          </Link>
        </div>
      </Reveal>
    </Section>
  );
}

/* ─── Programs ───────────────────────────────────────────── */

const PROGRAMS = [
  {
    slug: "full-stack-product-engineering",
    title: "Full-Stack Product Engineering",
    category: "Engineering",
    level: "Intermediate",
    duration: "12 weeks",
    stack: ["Next.js", "TypeScript", "PostgreSQL", "Tailwind"],
    desc: "Build SaaS dashboards, APIs, auth flows, and client-ready product modules on real briefs.",
  },
  {
    slug: "ai-automation-systems",
    title: "AI Automation Systems",
    category: "AI",
    level: "Advanced",
    duration: "10 weeks",
    stack: ["OpenAI API", "Node.js", "Next.js", "n8n"],
    desc: "Design AI workflows, CRM automations, and production-ready prompt systems.",
  },
  {
    slug: "ui-ux-product-design",
    title: "UI/UX Product Design",
    category: "Design",
    level: "Beginner",
    duration: "8 weeks",
    stack: ["Figma", "FigJam", "Framer", "Design tokens"],
    desc: "Research, wireframe, prototype, and hand off premium SaaS interfaces for real clients.",
  },
];

function ProgramsSection() {
  return (
    <Section id="programs" className="bg-[#0A0A0A]">
      <Reveal>
        <SectionHeader center eyebrow="Learn by building" title="Free internship programs" subtitle="Real projects. Senior mentors. Zero fees. We mean it." />
      </Reveal>
      <div className="grid gap-6 lg:grid-cols-3">
        {PROGRAMS.map((p, i) => (
          <Reveal key={p.slug} delay={i * 0.1}>
            <GoldCard className="flex h-full flex-col gap-5">
              <div className="flex items-center gap-3">
                <Badge tone="gold">{p.category}</Badge>
                <Badge tone="default">{p.level}</Badge>
              </div>
              <div>
                <h3 className="text-xl font-black text-[#F5F0E8]">{p.title}</h3>
                <p className="mt-2 text-sm text-[#F5F0E8]/50">{p.desc}</p>
              </div>
              <div className="flex flex-wrap gap-2">
                {p.stack.map((s) => (
                  <span key={s} className="rounded-md border border-[rgba(201,168,76,0.12)] bg-[rgba(201,168,76,0.04)] px-2.5 py-1 text-xs text-[#F5F0E8]/55">
                    {s}
                  </span>
                ))}
              </div>
              <div className="mt-auto flex items-center justify-between border-t border-[rgba(201,168,76,0.1)] pt-4">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-emerald-400" />
                  <span className="text-xs font-bold text-emerald-400">100% FREE</span>
                </div>
                <span className="text-sm text-[#F5F0E8]/40">{p.duration}</span>
              </div>
              <Link href={`/programs/${p.slug}`}>
                <Button variant="gold" className="w-full justify-center">Apply Now <ArrowRight size={14} /></Button>
              </Link>
            </GoldCard>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

/* ─── Why Orbitix ────────────────────────────────────────── */

const WHY_ITEMS = [
  { icon: Briefcase, title: "Real client projects", desc: "Interns ship to actual client briefs, not toy exercises." },
  { icon: Users, title: "Senior mentors", desc: "Every intern gets structured feedback from working engineers." },
  { icon: ShieldCheck, title: "Free forever for interns", desc: "Zero fees. Zero hidden charges. That's non-negotiable." },
  { icon: Star, title: "Hire-ready output", desc: "Portfolio + certificate + LOR — everything a recruiter wants." },
];

function WhyOrbitix() {
  return (
    <Section id="why">
      <GoldDivider className="mb-16" />
      <Reveal>
        <SectionHeader center eyebrow="Why Orbitix" title="Not just another agency" subtitle="We built the thing we wished existed — a real studio that also trains people." />
      </Reveal>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {WHY_ITEMS.map((item, i) => (
          <Reveal key={item.title} delay={i * 0.08}>
            <GoldCard className="text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl border border-[rgba(201,168,76,0.2)] bg-[rgba(201,168,76,0.08)]">
                <item.icon size={22} className="text-[#C9A84C]" />
              </div>
              <h3 className="mb-2 font-bold text-[#F5F0E8]">{item.title}</h3>
              <p className="text-sm text-[#F5F0E8]/50">{item.desc}</p>
            </GoldCard>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

/* ─── Testimonials Marquee ───────────────────────────────── */

const TESTIMONIALS = [
  { name: "Riya Sharma", role: "Full-Stack Intern", quote: "The tasks felt like real product work. My portfolio finally has substance." },
  { name: "Dev Mehta", role: "SaaS Founder", quote: "They moved like a premium product studio and kept the build transparent." },
  { name: "Arjun Kapoor", role: "AI Automation Intern", quote: "I shipped an actual automation system. No tutorial could have taught me this." },
  { name: "Priya Nair", role: "E-commerce Brand, CEO", quote: "The team delivered 3 weeks ahead of schedule. Exceptional quality." },
  { name: "Sneha Patel", role: "UI/UX Intern", quote: "Real design briefs, real feedback, real portfolio. This is how you learn." },
  { name: "Rohit Verma", role: "EdTech Startup, CTO", quote: "Orbitix rebuilt our entire dashboard. It now drives our sales demos." },
];

function TestimonialsMarquee() {
  return (
    <section className="overflow-hidden py-20 bg-[#0A0A0A]">
      <Reveal>
        <SectionHeader center eyebrow="What people say" title="Trusted by builders & businesses" className="px-6" />
      </Reveal>
      <div className="relative flex overflow-hidden">
        <motion.div
          className="flex shrink-0 gap-5"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        >
          {[...TESTIMONIALS, ...TESTIMONIALS, ...TESTIMONIALS].map((t, i) => (
            <div
              key={i}
              className="w-80 shrink-0 rounded-2xl border border-[rgba(201,168,76,0.12)] bg-[#0F0F0F] p-6"
            >
              <p className="text-sm text-[#F5F0E8]/70 leading-relaxed">"{t.quote}"</p>
              <div className="mt-4 flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full border border-[rgba(201,168,76,0.2)] bg-[rgba(201,168,76,0.08)] text-xs font-bold text-[#C9A84C]">
                  {t.name[0]}
                </div>
                <div>
                  <div className="text-xs font-semibold text-[#F5F0E8]/80">{t.name}</div>
                  <div className="text-[10px] text-[#F5F0E8]/40">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ─── FAQ ────────────────────────────────────────────────── */

const FAQS = [
  { q: "Are internships paid?", a: "Internships at Orbitix are 100% free. There are no fees, no certificate charges, and no hidden costs for students or interns. Zero. Always." },
  { q: "Do interns work on client projects?", a: "Selected interns contribute to scoped internal or client-style modules under mentor and admin review." },
  { q: "How long are the programs?", a: "Programs run 8–12 weeks. Full-Stack is 12 weeks, AI Automation is 10 weeks, and UI/UX is 8 weeks." },
  { q: "Will I get a certificate?", a: "Yes. After completing all tasks and mentor review, you receive a verifiable digital certificate at absolutely no cost." },
  { q: "Can clients track project progress?", a: "Yes. Clients get a dedicated portal with project timeline, milestones, invoice downloads, messages, and file sharing." },
];

function FaqSection() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <Section id="faq">
      <Reveal>
        <SectionHeader center eyebrow="FAQ" title="Common questions" />
      </Reveal>
      <div className="mx-auto max-w-2xl grid gap-3">
        {FAQS.map((f, i) => (
          <Reveal key={i} delay={i * 0.05}>
            <button
              onClick={() => setOpen(open === i ? null : i)}
              className="w-full rounded-2xl border border-[rgba(201,168,76,0.12)] bg-[#0F0F0F] p-5 text-left transition hover:border-[rgba(201,168,76,0.25)]"
            >
              <div className="flex items-center justify-between gap-4">
                <span className="font-semibold text-[#F5F0E8]/90">{f.q}</span>
                <ChevronDown
                  size={16}
                  className={cn("shrink-0 text-[#C9A84C] transition-transform", open === i && "rotate-180")}
                />
              </div>
              <AnimatePresence initial={false}>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden"
                  >
                    <p className="mt-4 text-sm text-[#F5F0E8]/55 leading-relaxed">{f.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

/* ─── Final CTA ──────────────────────────────────────────── */

function FinalCTA() {
  return (
    <Section>
      <Reveal>
        <div className="rounded-3xl border border-[rgba(201,168,76,0.2)] bg-[#0F0F0F] p-10 text-center shadow-[0_0_80px_rgba(201,168,76,0.06)] md:p-16">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[rgba(201,168,76,0.25)] bg-[rgba(201,168,76,0.06)] px-4 py-1.5 text-xs font-semibold text-[#C9A84C]">
            <Sparkles size={12} />
            Ready to build?
          </div>
          <h2 className="text-4xl font-black text-[#F5F0E8] md:text-5xl">Two paths. One studio.</h2>
          <p className="mx-auto mt-4 max-w-md text-[#F5F0E8]/50">
            Whether you need a product built or want to build one — Orbitix has you covered.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/contact">
              <GoldCard className="flex w-64 flex-col items-start gap-3 text-left transition-transform hover:scale-[1.02]">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[rgba(201,168,76,0.12)]">
                  <Globe size={18} className="text-[#C9A84C]" />
                </div>
                <div>
                  <div className="font-bold text-[#F5F0E8]">I'm a business</div>
                  <div className="text-xs text-[#F5F0E8]/45">Get a project quote →</div>
                </div>
              </GoldCard>
            </Link>
            <Link href="/programs">
              <GoldCard className="flex w-64 flex-col items-start gap-3 text-left transition-transform hover:scale-[1.02]">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10">
                  <BookOpen size={18} className="text-emerald-400" />
                </div>
                <div>
                  <div className="font-bold text-[#F5F0E8]">I'm a student</div>
                  <div className="flex items-center gap-1 text-xs text-emerald-400">
                    <CheckCircle2 size={11} /> Apply for free →
                  </div>
                </div>
              </GoldCard>
            </Link>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
