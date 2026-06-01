"use client";
import Link from "next/link";
import { Section, Reveal, GoldCard, Button, SectionHeader } from "@/components/ui/primitives";

export default function ConsultationPage() {
  return (
    <main className="bg-[#080808] pt-32 pb-24">
      <div className="pointer-events-none fixed inset-0 -z-10" style={{ backgroundImage: "linear-gradient(rgba(201,168,76,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,0.03) 1px, transparent 1px)", backgroundSize: "48px 48px" }} />
      <Section>
        <Reveal><SectionHeader center eyebrow="Free consultation" title="Book a 30-minute call." subtitle="We discuss your project, scope the work, and give you an honest recommendation." /></Reveal>
        <Reveal delay={0.1}><GoldCard className="mx-auto max-w-lg text-center p-8">
          <p className="text-[#F5F0E8]/60 mb-6">Schedule via WhatsApp or email — we'll confirm within 2 hours.</p>
          <div className="grid gap-3">
            <a href="https://wa.me/919876543210?text=Hi+Orbitix!+I'd+like+to+book+a+free+consultation." target="_blank" rel="noopener noreferrer"><Button variant="gold" className="w-full justify-center">Chat on WhatsApp</Button></a>
            <a href="mailto:admin@orbitix.in?subject=Free consultation request"><Button variant="outline" className="w-full justify-center">Email us</Button></a>
          </div>
        </GoldCard></Reveal>
      </Section>
    </main>
  );
}
