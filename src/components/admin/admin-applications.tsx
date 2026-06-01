"use client";

import { useEffect, useState } from "react";
import { GoldCard, Button, Badge, StatusBadge } from "@/components/ui/primitives";
import { CheckCircle2, X } from "lucide-react";

type App = { id: string; studentName: string; studentEmail: string; programTitle: string; status: string; motivation?: string | null; createdAt: string };

export function AdminApplications() {
  const [apps, setApps] = useState<App[]>([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/applications").then(r => r.json()).then(d => { setApps(d.applications ?? []); setLoading(false); });
  }, []);

  async function updateStatus(id: string, status: "approved" | "rejected") {
    await fetch("/api/admin/applications", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id, status }) });
    setApps(prev => prev.map(a => a.id === id ? { ...a, status } : a));
  }

  const filtered = apps.filter(a => filter === "all" ? true : a.status === filter);

  return (
    <GoldCard>
      <div className="mb-5 flex flex-wrap items-center gap-3">
        <h2 className="text-lg font-black text-[#F5F0E8]">Applications</h2>
        <div className="ml-auto flex gap-2">
          {["all", "pending", "approved", "rejected"].map(f => (
            <button key={f} onClick={() => setFilter(f)} className={`rounded-full border px-3 py-1 text-xs font-semibold capitalize transition ${filter === f ? "border-[rgba(201,168,76,0.5)] bg-[rgba(201,168,76,0.12)] text-[#C9A84C]" : "border-[rgba(201,168,76,0.1)] text-[#F5F0E8]/45 hover:border-[rgba(201,168,76,0.25)]"}`}>{f}</button>
          ))}
        </div>
      </div>
      <div className="grid gap-4">
        {loading ? <div className="py-8 text-center text-sm text-[#F5F0E8]/35">Loading…</div>
          : filtered.length === 0 ? <div className="py-8 text-center text-sm text-[#F5F0E8]/35">No applications.</div>
          : filtered.map(a => (
          <div key={a.id} className="rounded-xl border border-[rgba(201,168,76,0.1)] p-4">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <div className="font-semibold text-[#F5F0E8]/90">{a.studentName}</div>
                <div className="text-xs text-[#F5F0E8]/45">{a.studentEmail} · {a.programTitle}</div>
              </div>
              <div className="flex items-center gap-2">
                <StatusBadge status={a.status} />
                {a.status === "pending" && (
                  <>
                    <Button variant="gold" size="sm" onClick={() => updateStatus(a.id, "approved")}><CheckCircle2 size={13} /> Approve</Button>
                    <Button variant="outline" size="sm" onClick={() => updateStatus(a.id, "rejected")}><X size={13} /> Reject</Button>
                  </>
                )}
              </div>
            </div>
            {a.motivation && <p className="mt-3 text-sm text-[#F5F0E8]/55 border-t border-[rgba(201,168,76,0.08)] pt-3">{a.motivation}</p>}
            <div className="mt-2 text-xs text-[#F5F0E8]/30">{a.createdAt?.slice(0, 10)}</div>
          </div>
        ))}
      </div>
    </GoldCard>
  );
}
