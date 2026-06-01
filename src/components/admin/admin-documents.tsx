"use client";

import { useState, useEffect } from "react";
import { GoldCard, Button, Tabs, Badge, inputClass, Field } from "@/components/ui/primitives";
import { FileText, Download, Loader2 } from "lucide-react";

export function AdminDocuments() {
  const [tab, setTab] = useState("offer");
  const [interns, setInterns] = useState<{ id: string; name: string; programId: string; programTitle: string }[]>([]);
  const [selected, setSelected] = useState("");
  const [content, setContent] = useState("");
  const [generating, setGenerating] = useState(false);
  const [issued, setIssued] = useState(false);

  useEffect(() => {
    fetch("/api/admin/interns").then(r => r.json()).then(d => setInterns(d.interns ?? []));
  }, []);

  const intern = interns.find(i => i.id === selected);

  useEffect(() => {
    if (!intern) return;
    if (tab === "offer") {
      setContent(`INTERNSHIP OFFER LETTER\n\nDear ${intern.name},\n\nWe are pleased to offer you the position of Intern in our ${intern.programTitle} program at Orbitix IT Solutions.\n\nDuration: 12 weeks | Start Date: 2026-06-01\nMode: Remote | Stipend: Unpaid (Portfolio + Certificate)\n\nYou will work under the mentorship of Maya Mentor on real client-grade projects.\n\nWarm regards,\nAarav Superadmin\nFounder, Orbitix IT Solutions\nadmin@orbitix.in`);
    } else {
      setContent(`LETTER OF RECOMMENDATION\n\nTo Whom It May Concern,\n\nIt is my pleasure to recommend ${intern.name} who completed our ${intern.programTitle} internship at Orbitix IT Solutions.\n\nDuring this period, ${intern.name} demonstrated exceptional skills and consistently delivered high-quality work.\n\nI recommend them without reservation.\n\nMaya Mentor\nLead Mentor, Orbitix IT Solutions`);
    }
    setIssued(false);
  }, [selected, tab]);

  async function handleIssue() {
    if (!intern) return;
    setGenerating(true);
    await fetch("/api/admin/documents", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ type: tab, studentId: intern.id, programId: intern.programId, content }) });
    setGenerating(false);
    setIssued(true);
  }

  async function downloadPDF() {
    if (!intern) return;
    const response = await fetch("/api/admin/documents/pdf", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ type: tab, studentId: intern.id, content, name: intern.name, program: intern.programTitle }) });
    const blob = await response.blob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${tab}-${intern.name.replace(/\s+/g, "-")}.pdf`;
    a.click();
  }

  return (
    <div className="grid gap-5 lg:grid-cols-[280px_1fr]">
      <GoldCard>
        <h3 className="mb-4 font-black text-[#F5F0E8]">Select intern</h3>
        <div className="grid gap-2">
          {interns.map(i => (
            <button key={i.id} onClick={() => setSelected(i.id)} className={`rounded-xl border px-3 py-2.5 text-left transition ${selected === i.id ? "border-[rgba(201,168,76,0.5)] bg-[rgba(201,168,76,0.1)]" : "border-[rgba(201,168,76,0.1)] hover:border-[rgba(201,168,76,0.25)]"}`}>
              <div className="text-sm font-semibold text-[#F5F0E8]/90">{i.name}</div>
              <div className="text-xs text-[#F5F0E8]/40">{i.programTitle}</div>
            </button>
          ))}
        </div>
      </GoldCard>

      <GoldCard>
        <Tabs tabs={[{ key: "offer", label: "Offer Letter" }, { key: "lor", label: "LOR" }]} active={tab} onChange={setTab} className="mb-6" />
        {!selected ? (
          <div className="py-10 text-center text-sm text-[#F5F0E8]/35">Select an intern to generate a document.</div>
        ) : (
          <div className="grid gap-4">
            <Field label="Document content (editable)">
              <textarea rows={16} className={inputClass + " resize-none font-mono text-xs"} value={content} onChange={(e) => setContent(e.target.value)} />
            </Field>
            <div className="flex flex-wrap gap-3">
              <Button variant="gold" onClick={handleIssue} disabled={generating || issued}>
                {generating && <Loader2 size={14} className="animate-spin" />}
                {issued ? "Issued ✓" : `Issue ${tab === "offer" ? "Offer Letter" : "LOR"}`}
              </Button>
              <Button variant="outline" onClick={downloadPDF}><Download size={14} /> Download PDF</Button>
            </div>
            {issued && <p className="text-sm text-emerald-400">Document issued successfully. Intern can view it in their dashboard.</p>}
          </div>
        )}
      </GoldCard>
    </div>
  );
}
