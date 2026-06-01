"use client";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Section, Reveal, SectionHeader, Button } from "@/components/ui/primitives";

export default function CaseStudiesPage() {
  return (
    <main className="bg-[#080808] pt-32 pb-24">
      <div className="pointer-events-none fixed inset-0 -z-10" style={{ backgroundImage: "linear-gradient(rgba(201,168,76,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,0.03) 1px, transparent 1px)", backgroundSize: "48px 48px" }} />
      <Section>
        <Reveal><SectionHeader eyebrow="Case studies" title="Projects in depth." subtitle="Detailed breakdowns of how we approached, built, and delivered each project." /></Reveal>
        <Reveal delay={0.1}><div className="text-center"><Link href="/portfolio"><Button variant="gold" size="lg">View portfolio <ArrowRight size={15} /></Button></Link></div></Reveal>
      </Section>
    </main>
  );
}
