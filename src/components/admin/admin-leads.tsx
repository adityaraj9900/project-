"use client";

import { useEffect, useState } from "react";
import { GoldCard, Badge, Button, SearchBar, StatusBadge } from "@/components/ui/primitives";
import { Download } from "lucide-react";

type Lead = { id: string; name: string; email: string; company?: string | null; serviceId?: string | null; budget?: string | null; status: string; message?: string | null; createdAt: string };

const STATUS_OPTIONS = ["New", "Contacted", "Qualified", "Proposal Sent", "Won", "Lost"];

export function AdminLeads() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<Lead | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/leads").then(r => r.json()).then(d => { setLeads(d.leads ?? []); setLoading(false); });
  }, []);

  const filtered = leads.filter(l => l.name.toLowerCase().includes(search.toLowerCase()) || l.email.toLowerCase().includes(search.toLowerCase()));

  async function updateStatus(id: string, status: string) {
    await fetch("/api/admin/leads", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id, status }) });
    setLeads(prev => prev.map(l => l.id === id ? { ...l, status } : l));
    if (selected?.id === id) setSelected(prev => prev ? { ...prev, status } : null);
  }

  return (
    <div className="grid gap-5 lg:grid-cols-[1fr_380px]">
      <GoldCard>
        <div className="mb-5 flex items-center justify-between gap-4">
          <h2 className="text-lg font-black text-[#F5F0E8]">Leads CRM</h2>
          <Button variant="outline" size="sm"><Download size={14} /> Export CSV</Button>
        </div>
        <SearchBar value={search} onChange={setSearch} placeholder="Search leads…" />
        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[rgba(201,168,76,0.1)] text-left text-xs text-[#F5F0E8]/40">
                {["Name", "Company", "Service", "Budget", "Status", "Date"].map(h => <th key={h} className="pb-3 pr-4 font-medium">{h}</th>)}
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={6} className="pt-8 text-center text-[#F5F0E8]/35 text-sm">Loading…</td></tr>
              ) : filtered.length === 0 ? (
                <tr><td colSpan={6} className="pt-8 text-center text-[#F5F0E8]/35 text-sm">No leads yet.</td></tr>
              ) : filtered.map(l => (
                <tr key={l.id} onClick={() => setSelected(l)} className="cursor-pointer border-b border-[rgba(201,168,76,0.06)] transition hover:bg-[rgba(201,168,76,0.04)]">
                  <td className="py-3 pr-4"><div className="font-medium text-[#F5F0E8]/90">{l.name}</div><div className="text-xs text-[#F5F0E8]/40">{l.email}</div></td>
                  <td className="py-3 pr-4 text-[#F5F0E8]/60">{l.company ?? "—"}</td>
                  <td className="py-3 pr-4 text-[#F5F0E8]/60">{l.serviceId ?? "—"}</td>
                  <td className="py-3 pr-4 text-[#F5F0E8]/60">{l.budget ?? "—"}</td>
                  <td className="py-3 pr-4"><StatusBadge status={l.status} /></td>
                  <td className="py-3 text-xs text-[#F5F0E8]/35">{l.createdAt?.slice(0, 10)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </GoldCard>

      {selected && (
        <GoldCard>
          <div className="mb-4 flex items-start justify-between">
            <h3 className="font-black text-[#F5F0E8]">{selected.name}</h3>
            <button onClick={() => setSelected(null)} className="text-[#F5F0E8]/35 hover:text-[#F5F0E8]/70">✕</button>
          </div>
          <div className="grid gap-2 text-sm">
            <div className="text-[#F5F0E8]/45">{selected.email}</div>
            {selected.company && <div className="text-[#F5F0E8]/60">{selected.company}</div>}
            {selected.message && <p className="mt-3 rounded-xl border border-[rgba(201,168,76,0.1)] p-3 text-[#F5F0E8]/60">{selected.message}</p>}
          </div>
          <div className="mt-5">
            <div className="mb-2 text-xs text-[#F5F0E8]/45">Update status</div>
            <div className="grid gap-2">
              {STATUS_OPTIONS.map(s => (
                <button key={s} onClick={() => updateStatus(selected.id, s)} className={`rounded-lg border px-3 py-2 text-left text-xs font-semibold transition ${selected.status === s ? "border-[rgba(201,168,76,0.5)] bg-[rgba(201,168,76,0.1)] text-[#C9A84C]" : "border-[rgba(201,168,76,0.1)] text-[#F5F0E8]/50 hover:border-[rgba(201,168,76,0.25)]"}`}>{s}</button>
              ))}
            </div>
          </div>
        </GoldCard>
      )}
    </div>
  );
}
