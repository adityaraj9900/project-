"use client";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Section, Reveal, GoldCard, Button, SectionHeader } from "@/components/ui/primitives";

export default function QuotePage() {
  return (
    <main className="bg-[#080808] pt-32 pb-24">
      <div className="pointer-events-none fixed inset-0 -z-10" style={{ backgroundImage: "linear-gradient(rgba(201,168,76,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,0.03) 1px, transparent 1px)", backgroundSize: "48px 48px" }} />
      <Section>
        <Reveal><SectionHeader center eyebrow="Get a quote" title="Tell us what you need." subtitle="We'll scope your project and send a fixed-price proposal within 24 hours." /></Reveal>
        <Reveal delay={0.1}><div className="flex justify-center"><Link href="/contact"><Button variant="gold" size="lg">Go to contact form <ArrowRight size={15} /></Button></Link></div></Reveal>
      </Section>
    </main>
  );
}
