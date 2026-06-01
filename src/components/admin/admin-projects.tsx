"use client";

import { useEffect, useState } from "react";
import { GoldCard, ProgressBar, Badge, StatusBadge } from "@/components/ui/primitives";
import { Loader2 } from "lucide-react";

type Project = { id: string; title: string; status: string; progress: number; budget?: number | null; clientName: string; milestones: { id: string; title: string; status: string; amount?: number | null; dueDate?: string | null }[] };

export function AdminProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/projects").then(r => r.json()).then(d => { setProjects(d.projects ?? []); setLoading(false); });
  }, []);

  if (loading) return <GoldCard><div className="flex justify-center py-10"><Loader2 className="animate-spin text-[#C9A84C]" /></div></GoldCard>;

  return (
    <div className="grid gap-5">
      {projects.map(p => (
        <GoldCard key={p.id}>
          <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
            <div>
              <h3 className="text-lg font-black text-[#F5F0E8]">{p.title}</h3>
              <div className="mt-1 text-sm text-[#F5F0E8]/45">Client: {p.clientName} {p.budget && `· ₹${(p.budget / 1000).toFixed(0)}K`}</div>
            </div>
            <StatusBadge status={p.status} />
          </div>
          <div className="mb-4">
            <div className="mb-1.5 flex justify-between text-xs text-[#F5F0E8]/45"><span>Progress</span><span>{p.progress}%</span></div>
            <ProgressBar value={p.progress} />
          </div>
          {p.milestones.length > 0 && (
            <div>
              <div className="mb-3 text-xs font-semibold uppercase tracking-widest text-[#F5F0E8]/35">Milestones</div>
              <div className="grid gap-2">
                {p.milestones.map(m => (
                  <div key={m.id} className="flex items-center justify-between rounded-lg border border-[rgba(201,168,76,0.08)] px-3 py-2">
                    <div>
                      <div className="text-sm text-[#F5F0E8]/80">{m.title}</div>
                      {m.dueDate && <div className="text-xs text-[#F5F0E8]/35">{m.dueDate}</div>}
                    </div>
                    <div className="flex items-center gap-3">
                      {m.amount && <span className="text-sm font-semibold text-[#C9A84C]">₹{(m.amount / 1000).toFixed(0)}K</span>}
                      <StatusBadge status={m.status} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </GoldCard>
      ))}
    </div>
  );
}
