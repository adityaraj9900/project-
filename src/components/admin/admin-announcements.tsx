"use client";

import { useEffect, useState } from "react";
import { GoldCard, Button, inputClass, Field, Badge } from "@/components/ui/primitives";
import { Plus, Loader2 } from "lucide-react";

type Ann = { id: string; title: string; body: string; audience: string; createdAt: string };

export function AdminAnnouncements() {
  const [announcements, setAnnouncements] = useState<Ann[]>([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [form, setForm] = useState({ title: "", body: "", audience: "all" as "all" | "students" | "clients" | "mentors" });

  useEffect(() => {
    fetch("/api/admin/announcements").then(r => r.json()).then(d => { setAnnouncements(d.announcements ?? []); setLoading(false); });
  }, []);

  async function create() {
    const res = await fetch("/api/admin/announcements", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
    const d = await res.json();
    setAnnouncements(prev => [d.announcement, ...prev]);
    setCreating(false);
    setForm({ title: "", body: "", audience: "all" });
  }

  return (
    <GoldCard>
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-lg font-black text-[#F5F0E8]">Announcements</h2>
        <Button variant="gold" size="sm" onClick={() => setCreating(!creating)}><Plus size={14} /> New</Button>
      </div>
      {creating && (
        <div className="mb-6 rounded-xl border border-[rgba(201,168,76,0.2)] bg-[rgba(201,168,76,0.04)] p-5 grid gap-4">
          <Field label="Title"><input className={inputClass} value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} /></Field>
          <Field label="Message"><textarea rows={4} className={inputClass + " resize-none"} value={form.body} onChange={e => setForm({ ...form, body: e.target.value })} /></Field>
          <Field label="Audience">
            <select className={inputClass} value={form.audience} onChange={e => setForm({ ...form, audience: e.target.value as "all" | "students" | "clients" | "mentors" })}>
              <option value="all">Everyone</option>
              <option value="students">Students only</option>
              <option value="clients">Clients only</option>
              <option value="mentors">Mentors only</option>
            </select>
          </Field>
          <div className="flex gap-3"><Button variant="gold" onClick={create}>Post</Button><Button variant="ghost" onClick={() => setCreating(false)}>Cancel</Button></div>
        </div>
      )}
      {loading ? <div className="flex justify-center py-10"><Loader2 className="animate-spin text-[#C9A84C]" /></div> : (
        <div className="grid gap-3">
          {announcements.map(a => (
            <div key={a.id} className="rounded-xl border border-[rgba(201,168,76,0.1)] p-4">
              <div className="flex items-start justify-between gap-3">
                <div className="font-semibold text-[#F5F0E8]/90">{a.title}</div>
                <Badge tone="gold">{a.audience}</Badge>
              </div>
              <p className="mt-2 text-sm text-[#F5F0E8]/55">{a.body}</p>
              <div className="mt-2 text-xs text-[#F5F0E8]/30">{a.createdAt?.slice(0, 10)}</div>
            </div>
          ))}
        </div>
      )}
    </GoldCard>
  );
}
