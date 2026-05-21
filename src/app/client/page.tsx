"use client";

import { Download, MessageSquare, Star } from "lucide-react";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { ProjectCards } from "@/components/dashboard/dashboard-widgets";
import { DataTable } from "@/components/ui/data-table";
import { Button, PremiumCard, StatusBadge } from "@/components/ui/primitives";
import { usePlatformStore } from "@/store/platform-store";

export default function Page() {
  const { db, currentUser, toast } = usePlatformStore();
  const projects = db.projects.filter((item) => item.clientId === currentUser?.id);
  const invoices = db.invoices.filter((invoice) => projects.some((project) => project.id === invoice.projectId));
  return (
    <DashboardShell allowed={["client"]}>
      <div className="grid gap-6">
        <div className="grid gap-4 md:grid-cols-4">
          <PremiumCard><p className="text-sm text-white/50">Projects</p><p className="mt-2 text-3xl font-bold">{projects.length}</p></PremiumCard>
          <PremiumCard><p className="text-sm text-white/50">Milestones</p><p className="mt-2 text-3xl font-bold">{db.milestones.length}</p></PremiumCard>
          <PremiumCard><p className="text-sm text-white/50">Invoices</p><p className="mt-2 text-3xl font-bold">{invoices.length}</p></PremiumCard>
          <PremiumCard><p className="text-sm text-white/50">Support tickets</p><p className="mt-2 text-3xl font-bold">{db.supportTickets.filter((t) => t.userId === currentUser?.id).length}</p></PremiumCard>
        </div>
        <PremiumCard><h2 className="mb-5 text-2xl font-bold">My projects</h2><ProjectCards /></PremiumCard>
        <PremiumCard><h2 className="mb-5 text-2xl font-bold">Milestones</h2><DataTable rows={db.milestones.map((m) => ({ id: m.id, project: db.projects.find((p) => p.id === m.projectId)?.title, title: m.title, dueDate: m.dueDate, status: m.status }))} columns={[{ key: "project", label: "Project" }, { key: "title", label: "Milestone" }, { key: "dueDate", label: "Due" }, { key: "status", label: "Status" }]} /></PremiumCard>
        <div className="grid gap-5 xl:grid-cols-2">
          <PremiumCard id="invoices"><h2 className="mb-5 text-2xl font-bold">Invoices and payments</h2><DataTable rows={invoices.map((i) => ({ id: i.id, amount: i.amount, dueDate: i.dueDate, status: i.status }))} columns={[{ key: "amount", label: "Amount" }, { key: "dueDate", label: "Due" }, { key: "status", label: "Status" }]} actions={() => <Button className="px-3 py-2" onClick={() => toast("Invoice download placeholder.", "success")}><Download size={15} /> PDF</Button>} /></PremiumCard>
          <PremiumCard id="messages"><h2 className="mb-5 text-2xl font-bold">Files, messages, feedback</h2><div className="grid gap-3">{["Discovery brief.pdf", "Sprint demo link", "Final delivery placeholder"].map((file) => <div key={file} className="flex items-center justify-between rounded-2xl bg-white/8 p-3"><span>{file}</span><StatusBadge status="active" /></div>)}</div><div className="mt-5 flex gap-3"><Button onClick={() => toast("Message sent placeholder.", "success")}><MessageSquare size={16} /> Message team</Button><Button className="bg-white text-ink" onClick={() => toast("Testimonial saved placeholder.", "success")}><Star size={16} /> Testimonial</Button></div></PremiumCard>
        </div>
      </div>
    </DashboardShell>
  );
}
