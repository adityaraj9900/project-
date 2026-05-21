"use client";

import Link from "next/link";
import { ArrowRight, BriefcaseBusiness, CheckCircle2, GraduationCap, Rocket, ShieldCheck, Sparkles, UsersRound } from "lucide-react";
import { usePlatformStore } from "@/store/platform-store";
import { currency } from "@/lib/utils";
import { Badge, Button, PremiumCard, ProgressBar, Reveal, Section } from "@/components/ui/primitives";
import { OrbitScene } from "@/components/three/orbit-scene";

export function HomePage() {
  const { db } = usePlatformStore();
  return (
    <main className="overflow-hidden pt-28">
      <section className="relative mx-auto grid min-h-[82vh] max-w-7xl items-center gap-10 px-6 py-10 lg:grid-cols-[1fr_0.9fr]">
        <div className="absolute inset-0 -z-10 grid-bg opacity-70" />
        <Reveal>
          <Badge tone="success">Internship ecosystem + product studio</Badge>
          <h1 className="mt-6 max-w-4xl text-5xl font-black leading-[0.96] tracking-[-0.03em] md:text-7xl">
            We build digital products for clients and train interns through real project-based work.
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-white/68">
            A premium platform where students ship portfolio-grade modules, mentors review real submissions, clients track agency projects, and admins run the whole operating system.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/apply"><Button><GraduationCap size={18} /> Start internship</Button></Link>
            <Link href="/quote"><Button className="bg-white text-ink"><BriefcaseBusiness size={18} /> Build with us</Button></Link>
          </div>
          <div className="mt-10 grid max-w-2xl grid-cols-3 gap-3">
            {[["3", "live programs"], [String(db.services.length), "agency services"], ["97%", "mentor-reviewed work"]].map(([value, label]) => (
              <div key={label} className="glass rounded-2xl p-4">
                <p className="text-2xl font-bold">{value}</p>
                <p className="text-xs uppercase tracking-[0.18em] text-white/45">{label}</p>
              </div>
            ))}
          </div>
        </Reveal>
        <Reveal>
          <div className="premium-border rounded-[2rem] bg-ink/80 p-1">
            <OrbitScene />
          </div>
        </Reveal>
      </section>
      <ProgramShowcase />
      <ServiceShowcase />
      <WorkflowSections />
      <PortfolioPreview />
      <SuccessAndTestimonials />
      <FaqPreview />
      <FinalCta />
    </main>
  );
}

export function ProgramShowcase() {
  const programs = usePlatformStore((state) => state.db.programs);
  return (
    <Section>
      <Reveal className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
        <div>
          <Badge>Internship programs</Badge>
          <h2 className="mt-4 text-4xl font-bold md:text-5xl">Real project tracks, not passive courses.</h2>
        </div>
        <Link href="/programs" className="inline-flex items-center gap-2 text-aurora">View all programs <ArrowRight size={18} /></Link>
      </Reveal>
      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {programs.map((program) => (
          <Reveal key={program.id}>
            <PremiumCard className="h-full">
              <Badge tone="success">{program.level}</Badge>
              <h3 className="mt-5 text-2xl font-bold">{program.title}</h3>
              <p className="mt-3 text-white/62">{program.summary}</p>
              <div className="mt-5 flex flex-wrap gap-2">{program.stack.slice(0, 4).map((item) => <span key={item} className="rounded-full bg-white/8 px-3 py-1 text-xs text-white/60">{item}</span>)}</div>
              <div className="mt-6 flex items-center justify-between text-sm text-white/55"><span>{program.duration}</span><span>Certificate {currency(program.certificateFee)}</span></div>
              <Link href={`/programs/${program.slug}`} className="mt-6 inline-flex items-center gap-2 font-semibold text-aurora">Explore track <ArrowRight size={16} /></Link>
            </PremiumCard>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

export function ServiceShowcase() {
  const services = usePlatformStore((state) => state.db.services);
  return (
    <Section className="relative">
      <div className="absolute inset-x-0 top-20 -z-10 h-64 bg-gradient-to-r from-aurora/10 via-plasma/10 to-solar/10 blur-3xl" />
      <Reveal>
        <Badge tone="success">Software development agency</Badge>
        <h2 className="mt-4 text-4xl font-bold md:text-5xl">Premium product teams with intern-powered execution.</h2>
      </Reveal>
      <div className="mt-10 grid gap-5 md:grid-cols-2">
        {services.map((service) => (
          <Reveal key={service.id}>
            <PremiumCard>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm uppercase tracking-[0.2em] text-aurora">{service.category}</p>
                  <h3 className="mt-3 text-2xl font-bold">{service.title}</h3>
                </div>
                <Rocket className="text-solar" />
              </div>
              <p className="mt-4 text-white/62">{service.summary}</p>
              <div className="mt-5 grid gap-2">{service.deliverables.slice(0, 3).map((item) => <span key={item} className="flex items-center gap-2 text-sm text-white/65"><CheckCircle2 size={16} className="text-aurora" /> {item}</span>)}</div>
              <div className="mt-6 flex items-center justify-between"><span className="text-white/55">From {currency(service.priceFrom)}</span><Link href={`/services/${service.slug}`} className="text-aurora">Details</Link></div>
            </PremiumCard>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

export function WorkflowSections() {
  const intern = ["Apply", "Get approved", "Receive tasks", "Submit project links", "Mentor review", "Certificate verification"];
  const client = ["Inquiry", "Proposal", "Project setup", "Team assignment", "Milestones", "Delivery"];
  return (
    <Section>
      <div className="grid gap-6 lg:grid-cols-2">
        <Timeline title="Internship workflow" icon={<GraduationCap />} items={intern} />
        <Timeline title="Client project workflow" icon={<BriefcaseBusiness />} items={client} />
      </div>
    </Section>
  );
}

function Timeline({ title, icon, items }: { title: string; icon: React.ReactNode; items: string[] }) {
  return (
    <Reveal>
      <PremiumCard>
        <div className="flex items-center gap-3 text-2xl font-bold">{icon}{title}</div>
        <div className="mt-8 grid gap-5">
          {items.map((item, index) => (
            <div key={item} className="flex gap-4">
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-aurora font-bold text-ink">{index + 1}</span>
              <div>
                <p className="font-semibold">{item}</p>
                <p className="text-sm text-white/55">Tracked with status updates, notifications, and admin visibility.</p>
              </div>
            </div>
          ))}
        </div>
      </PremiumCard>
    </Reveal>
  );
}

export function PortfolioPreview() {
  const projects = usePlatformStore((state) => state.db.projects);
  return (
    <Section>
      <Reveal>
        <Badge>Live project previews</Badge>
        <h2 className="mt-4 text-4xl font-bold md:text-5xl">Agency projects become learning terrain.</h2>
      </Reveal>
      <div className="mt-10 grid gap-5 lg:grid-cols-3">
        {projects.concat(projects).concat(projects).slice(0, 3).map((project, index) => (
          <PremiumCard key={`${project.id}-${index}`}>
            <div className="aspect-video rounded-2xl bg-gradient-to-br from-aurora/25 via-plasma/20 to-solar/20 p-4">
              <div className="h-full rounded-xl border border-white/15 bg-ink/55 p-4">
                <div className="h-3 w-24 rounded-full bg-aurora/60" />
                <div className="mt-8 grid gap-2">{[70, 48, 86].map((w) => <div key={w} className="h-3 rounded-full bg-white/15" style={{ width: `${w}%` }} />)}</div>
              </div>
            </div>
            <h3 className="mt-5 text-xl font-bold">{project.title}</h3>
            <p className="mt-2 text-white/55">Client dashboard, milestone tracking, intern contribution, and mentor oversight.</p>
            <div className="mt-5"><ProgressBar value={project.progress} /></div>
          </PremiumCard>
        ))}
      </div>
    </Section>
  );
}

export function SuccessAndTestimonials() {
  const testimonials = usePlatformStore((state) => state.db.testimonials);
  return (
    <Section>
      <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
        <Reveal>
          <PremiumCard className="h-full">
            <UsersRound className="text-aurora" size={34} />
            <h2 className="mt-5 text-4xl font-bold">Mentor support, community momentum, verified outcomes.</h2>
            <p className="mt-4 text-white/62">Interns receive task feedback, badges, leaderboard progress, resources, announcements, and certificate records that can be publicly verified.</p>
          </PremiumCard>
        </Reveal>
        <div className="grid gap-5">
          {testimonials.map((testimonial) => (
            <Reveal key={testimonial.id}>
              <PremiumCard>
                <p className="text-xl text-white/80">“{testimonial.quote}”</p>
                <p className="mt-4 font-semibold">{testimonial.name}</p>
                <p className="text-sm text-white/45">{testimonial.role}</p>
              </PremiumCard>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}

export function FaqPreview() {
  const faqs = usePlatformStore((state) => state.db.faqs);
  return (
    <Section>
      <Reveal>
        <Badge>FAQ</Badge>
        <h2 className="mt-4 text-4xl font-bold">Clear answers before you commit.</h2>
      </Reveal>
      <div className="mt-8 grid gap-4">
        {faqs.map((faq) => (
          <details key={faq.id} className="glass rounded-2xl p-5">
            <summary className="cursor-pointer font-semibold">{faq.question}</summary>
            <p className="mt-3 text-white/62">{faq.answer}</p>
          </details>
        ))}
      </div>
    </Section>
  );
}

export function FinalCta() {
  return (
    <Section>
      <Reveal>
        <div className="premium-border rounded-[2rem] bg-ink p-8 text-center md:p-14">
          <Sparkles className="mx-auto text-solar" size={42} />
          <h2 className="mx-auto mt-5 max-w-3xl text-4xl font-black md:text-6xl">Join the operating system for real-world product builders.</h2>
          <p className="mx-auto mt-5 max-w-2xl text-white/62">Students get structured work. Clients get premium delivery. Admins get full control across applications, projects, payments, certificates, and content.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/apply"><Button>Apply now</Button></Link>
            <Link href="/consultation"><Button className="bg-white text-ink">Book consultation</Button></Link>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}

export function SimpleMarketingPage({ title, eyebrow, body, children }: { title: string; eyebrow: string; body: string; children?: React.ReactNode }) {
  return (
    <main className="pt-28">
      <Section>
        <Reveal>
          <Badge tone="success">{eyebrow}</Badge>
          <h1 className="mt-5 max-w-4xl text-5xl font-black tracking-[-0.03em] md:text-7xl">{title}</h1>
          <p className="mt-6 max-w-3xl text-lg text-white/65">{body}</p>
        </Reveal>
        <div className="mt-10">{children}</div>
      </Section>
    </main>
  );
}
