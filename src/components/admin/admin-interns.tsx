"use client";

import { useEffect, useState } from "react";
import { GoldCard, ProgressBar, Button, Badge } from "@/components/ui/primitives";
import { Award, FileText, Loader2 } from "lucide-react";

type Intern = { id: string; name: string; email: string; programTitle: string; progress: number; status: string; hasCert: boolean; hasOffer: boolean };

export function AdminInterns() {
  const [interns, setInterns] = useState<Intern[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/interns").then(r => r.json()).then(d => { setInterns(d.interns ?? []); setLoading(false); });
  }, []);

  async function issueCertificate(id: string) {
    await fetch("/api/admin/certificates", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ studentId: id }) });
    setInterns(prev => prev.map(i => i.id === id ? { ...i, hasCert: true } : i));
  }

  if (loading) return <GoldCard><div className="py-10 text-center text-[#F5F0E8]/35 flex justify-center"><Loader2 className="animate-spin" /></div></GoldCard>;

  return (
    <div className="grid gap-4">
      {interns.length === 0 ? <GoldCard><div className="py-10 text-center text-[#F5F0E8]/35 text-sm">No interns enrolled yet.</div></GoldCard> : interns.map(intern => (
        <GoldCard key={intern.id}>
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[rgba(201,168,76,0.25)] bg-[rgba(201,168,76,0.08)] text-lg font-black text-[#C9A84C]">{intern.name[0]}</div>
              <div>
                <div className="font-semibold text-[#F5F0E8]/90">{intern.name}</div>
                <div className="text-xs text-[#F5F0E8]/45">{intern.email} · {intern.programTitle}</div>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {!intern.hasCert && <Button variant="outline" size="sm" onClick={() => issueCertificate(intern.id)}><Award size={13} /> Issue Certificate</Button>}
              {intern.hasCert && <Badge tone="success">Certificate issued</Badge>}
              {intern.hasOffer && <Badge tone="gold">Offer letter issued</Badge>}
            </div>
          </div>
          <div className="mt-4">
            <div className="mb-1.5 flex justify-between text-xs text-[#F5F0E8]/45"><span>Progress</span><span>{intern.progress}%</span></div>
            <ProgressBar value={intern.progress} />
          </div>
        </GoldCard>
      ))}
    </div>
  );
}
