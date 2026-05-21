"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { CheckCircle2 } from "lucide-react";
import { usePlatformStore } from "@/store/platform-store";
import { Button, PremiumCard, Section, StatusBadge } from "@/components/ui/primitives";
import { currency } from "@/lib/utils";

export default function Page() {
  const slug = String(useParams().slug);
  const { programs, batches, tasks } = usePlatformStore((state) => state.db);
  const program = programs.find((item) => item.slug === slug) ?? programs[0];
  return (
    <main className="pt-28">
      <Section>
        <div className="grid gap-8 lg:grid-cols-[1fr_0.42fr]">
          <div>
            <p className="text-sm uppercase tracking-[0.28em] text-aurora">{program.category} · {program.level}</p>
            <h1 className="mt-4 text-5xl font-black md:text-7xl">{program.title}</h1>
            <p className="mt-6 text-lg text-white/65">{program.summary}</p>
            <div className="mt-8 flex flex-wrap gap-3"><Link href="/apply"><Button>Apply for this program</Button></Link><Link href="/verify"><Button className="bg-white text-ink">Verify certificate</Button></Link></div>
          </div>
          <PremiumCard><h2 className="text-2xl font-bold">Program snapshot</h2><div className="mt-5 grid gap-3 text-white/65"><p>Duration: {program.duration}</p><p>Application: Free</p><p>Certificate: {currency(program.certificateFee)}</p><p>Active batches: {batches.filter((b) => b.programId === program.id).length}</p></div></PremiumCard>
        </div>
        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          <PremiumCard><h2 className="text-xl font-bold">Syllabus</h2><div className="mt-4 grid gap-3">{program.syllabus.map((item) => <span className="flex gap-2 text-white/65" key={item}><CheckCircle2 className="text-aurora" size={18} />{item}</span>)}</div></PremiumCard>
          <PremiumCard><h2 className="text-xl font-bold">Roadmap</h2><div className="mt-4 grid gap-3">{program.roadmap.map((item, index) => <span key={item} className="text-white/65">{index + 1}. {item}</span>)}</div></PremiumCard>
          <PremiumCard><h2 className="text-xl font-bold">Program tasks</h2><div className="mt-4 grid gap-3">{tasks.filter((t) => t.programId === program.id).map((task) => <div key={task.id} className="rounded-2xl bg-white/8 p-3"><p className="font-semibold">{task.title}</p><p className="mt-1 text-sm text-white/50">{task.points} points · due {task.deadline}</p><StatusBadge status="active" /></div>)}</div></PremiumCard>
        </div>
      </Section>
    </main>
  );
}
