"use client";
import Link from "next/link";
import { Section, Reveal, SectionHeader, Button } from "@/components/ui/primitives";

export default function SuccessStoriesPage() {
  return (
    <main className="bg-[#080808] pt-32 pb-24">
      <div className="pointer-events-none fixed inset-0 -z-10" style={{ backgroundImage: "linear-gradient(rgba(201,168,76,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,0.03) 1px, transparent 1px)", backgroundSize: "48px 48px" }} />
      <Section>
        <Reveal><SectionHeader eyebrow="Success stories" title="From interns to engineers." subtitle="How Orbitix graduates have gone on to land jobs and ship products." /></Reveal>
        <Reveal delay={0.1}><div className="text-center"><Link href="/testimonials"><Button variant="gold">Read testimonials</Button></Link></div></Reveal>
      </Section>
    </main>
  );
}
