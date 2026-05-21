"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { CheckCircle2 } from "lucide-react";
import { usePlatformStore } from "@/store/platform-store";
import { currency } from "@/lib/utils";
import { Button, PremiumCard, Section } from "@/components/ui/primitives";

export default function Page() {
  const service = usePlatformStore((state) => state.db.services.find((item) => item.slug === String(useParams().slug)) ?? state.db.services[0]);
  return (
    <main className="pt-28">
      <Section>
        <p className="text-sm uppercase tracking-[0.28em] text-aurora">{service.category}</p>
        <h1 className="mt-4 max-w-4xl text-5xl font-black md:text-7xl">{service.title}</h1>
        <p className="mt-6 max-w-3xl text-lg text-white/65">{service.summary}</p>
        <div className="mt-8 flex gap-3"><Link href="/quote"><Button>Request quote</Button></Link><Link href="/consultation"><Button className="bg-white text-ink">Book consultation</Button></Link></div>
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          <PremiumCard><h2 className="text-2xl font-bold">Deliverables</h2><div className="mt-5 grid gap-3">{service.deliverables.map((item) => <p key={item} className="flex gap-2 text-white/65"><CheckCircle2 size={18} className="text-aurora" />{item}</p>)}</div></PremiumCard>
          <PremiumCard><h2 className="text-2xl font-bold">Commercials</h2><p className="mt-5 text-white/65">Starts at {currency(service.priceFrom)}</p><p className="mt-2 text-white/65">Typical timeline: {service.timeline}</p><p className="mt-5 text-white/55">Lead, proposal, project, milestones, invoices, payment status, messages, and testimonial flow are all represented in the client/admin dashboards.</p></PremiumCard>
        </div>
      </Section>
    </main>
  );
}
