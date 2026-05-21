"use client";

import { Check, FileDown, X } from "lucide-react";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { AnalyticsCharts, CertificatePie, ProjectCards, StatGrid } from "@/components/dashboard/dashboard-widgets";
import { DataTable } from "@/components/ui/data-table";
import { Button, PremiumCard, StatusBadge } from "@/components/ui/primitives";
import { usePlatformStore } from "@/store/platform-store";

export default function Page() {
  const { db, setApplicationStatus, setPaymentStatus, setLeadStatus, reviewSubmission, updateAnyRecord, toast } = usePlatformStore();
  const cmsCollections = ["programs", "services", "blogs", "faqs", "testimonials", "settings"] as const;
  const cmsRecordId = (collection: (typeof cmsCollections)[number]) => {
    const first = db[collection][0] as { id?: string; key?: string } | undefined;
    return first?.id ?? first?.key ?? "";
  };
  return (
    <DashboardShell allowed={["super-admin", "admin"]}>
      <div className="grid gap-6">
        <StatGrid />
        <AnalyticsCharts />
        <div className="grid gap-5 xl:grid-cols-[1fr_0.45fr]">
          <PremiumCard id="applications">
            <div className="mb-5 flex items-center justify-between"><h2 className="text-2xl font-bold">Manage applications</h2><Button className="bg-white text-ink" onClick={() => toast("CSV export placeholder generated.", "success")}><FileDown size={16} /> Export CSV</Button></div>
            <DataTable rows={db.applications.map((a) => ({ id: a.id, student: db.users.find((u) => u.id === a.studentId)?.name, program: db.programs.find((p) => p.id === a.programId)?.title, status: a.status, createdAt: a.createdAt }))} columns={[{ key: "student", label: "Student" }, { key: "program", label: "Program" }, { key: "status", label: "Status" }, { key: "createdAt", label: "Created" }]} actions={(row) => <div className="flex gap-2"><button onClick={() => setApplicationStatus(String(row.id), "approved")} className="rounded-full bg-aurora p-2 text-ink"><Check size={15} /></button><button onClick={() => setApplicationStatus(String(row.id), "rejected")} className="rounded-full bg-coral p-2 text-white"><X size={15} /></button></div>} />
          </PremiumCard>
          <CertificatePie />
        </div>
        <PremiumCard><h2 className="mb-5 text-2xl font-bold">Review submissions</h2><DataTable rows={db.submissions.map((s) => ({ id: s.id, student: db.users.find((u) => u.id === s.studentId)?.name, task: db.tasks.find((t) => t.id === s.taskId)?.title, status: s.status, feedback: s.feedback }))} columns={[{ key: "student", label: "Student" }, { key: "task", label: "Task" }, { key: "status", label: "Status" }, { key: "feedback", label: "Feedback" }]} actions={(row) => <div className="flex gap-2"><Button className="px-3 py-2" onClick={() => reviewSubmission(String(row.id), "approved", "Approved by admin. Excellent work.")}>Approve</Button><Button className="bg-solar px-3 py-2 text-ink" onClick={() => reviewSubmission(String(row.id), "pending", "Please resubmit with clearer documentation.")}>Resubmit</Button></div>} /></PremiumCard>
        <div className="grid gap-5 xl:grid-cols-2">
          <PremiumCard><h2 className="mb-5 text-2xl font-bold">Manage payments</h2><DataTable rows={db.payments.map((p) => ({ id: p.id, user: db.users.find((u) => u.id === p.userId)?.name, purpose: p.purpose, amount: p.amount, status: p.status }))} columns={[{ key: "user", label: "User" }, { key: "purpose", label: "Purpose" }, { key: "amount", label: "Amount" }, { key: "status", label: "Status" }]} actions={(row) => <div className="flex gap-2"><Button className="px-3 py-2" onClick={() => setPaymentStatus(String(row.id), "approved")}>Approve</Button><Button className="bg-coral px-3 py-2 text-white" onClick={() => setPaymentStatus(String(row.id), "rejected")}>Reject</Button></div>} /></PremiumCard>
          <PremiumCard id="agency"><h2 className="mb-5 text-2xl font-bold">Lead pipeline</h2><DataTable rows={db.leads.map((l) => ({ id: l.id, name: l.name, company: l.company, budget: l.budget, status: l.status }))} columns={[{ key: "name", label: "Lead" }, { key: "company", label: "Company" }, { key: "budget", label: "Budget" }, { key: "status", label: "Status" }]} actions={(row) => <select className="rounded-xl bg-white/10 p-2" value={String(row.status)} onChange={(e) => setLeadStatus(String(row.id), e.target.value as never)}><option>New</option><option>Contacted</option><option>Proposal Sent</option><option>Won</option><option>Lost</option></select>} /></PremiumCard>
        </div>
        <PremiumCard><h2 className="mb-5 text-2xl font-bold">Client project management</h2><ProjectCards /></PremiumCard>
        <PremiumCard id="cms"><h2 className="mb-5 text-2xl font-bold">CMS and platform settings</h2><div className="grid gap-3 md:grid-cols-3">{cmsCollections.map((collection) => <button key={collection} onClick={() => updateAnyRecord(collection, cmsRecordId(collection), { updatedAt: new Date().toISOString() })} className="rounded-2xl border border-white/10 bg-white/8 p-4 text-left capitalize hover:border-aurora/50">{collection}<p className="mt-2 text-sm text-white/45">Create, edit, delete, publish placeholder</p></button>)}</div></PremiumCard>
        <PremiumCard><h2 className="mb-5 text-2xl font-bold">Activity logs</h2><div className="grid gap-3">{db.activityLogs.map((log) => <div key={log.id} className="flex justify-between rounded-2xl bg-white/8 p-3"><span>{log.actor}: {log.action}</span><span className="text-white/45">{log.createdAt}</span></div>)}</div></PremiumCard>
      </div>
    </DashboardShell>
  );
}
