"use client";

import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { DataTable } from "@/components/ui/data-table";
import { Button, PremiumCard, ProgressBar } from "@/components/ui/primitives";
import { usePlatformStore } from "@/store/platform-store";

export default function Page() {
  const { db, reviewSubmission, toast } = usePlatformStore();
  return (
    <DashboardShell allowed={["mentor"]}>
      <div className="grid gap-6">
        <div className="grid gap-4 md:grid-cols-3">
          <PremiumCard><p className="text-sm text-white/50">Assigned students</p><p className="mt-2 text-3xl font-bold">{db.enrollments.length}</p></PremiumCard>
          <PremiumCard><p className="text-sm text-white/50">Assigned batches</p><p className="mt-2 text-3xl font-bold">{db.batches.length}</p></PremiumCard>
          <PremiumCard><p className="text-sm text-white/50">Pending reviews</p><p className="mt-2 text-3xl font-bold">{db.submissions.filter((s) => s.status === "review").length}</p></PremiumCard>
        </div>
        <PremiumCard>
          <h2 className="mb-5 text-2xl font-bold">Submission review</h2>
          <DataTable rows={db.submissions.map((s) => ({ id: s.id, student: db.users.find((u) => u.id === s.studentId)?.name, task: db.tasks.find((t) => t.id === s.taskId)?.title, github: s.github, status: s.status, feedback: s.feedback }))} columns={[{ key: "student", label: "Student" }, { key: "task", label: "Task" }, { key: "status", label: "Status" }, { key: "feedback", label: "Feedback" }]} actions={(row) => <div className="flex gap-2"><Button className="px-3 py-2" onClick={() => reviewSubmission(String(row.id), "approved", "Mentor approved. Strong implementation.")}>Approve</Button><Button className="bg-solar px-3 py-2 text-ink" onClick={() => reviewSubmission(String(row.id), "pending", "Resubmit after addressing mentor comments.")}>Feedback</Button></div>} />
        </PremiumCard>
        <div id="students" className="grid gap-5 lg:grid-cols-2">
          {db.enrollments.map((enrollment) => <PremiumCard key={enrollment.id}><h2 className="text-xl font-bold">{db.users.find((u) => u.id === enrollment.studentId)?.name}</h2><p className="mt-2 text-white/50">{db.programs.find((p) => p.id === enrollment.programId)?.title}</p><div className="mt-5"><ProgressBar value={enrollment.progress} /></div></PremiumCard>)}
        </div>
        <PremiumCard id="announcements"><h2 className="mb-5 text-2xl font-bold">Announcements</h2><div className="grid gap-3">{db.announcements.map((item) => <button key={item.id} onClick={() => toast("Announcement sent placeholder.", "success")} className="rounded-2xl bg-white/8 p-4 text-left"><p className="font-semibold">{item.title}</p><p className="mt-1 text-white/55">{item.body}</p></button>)}</div></PremiumCard>
      </div>
    </DashboardShell>
  );
}
