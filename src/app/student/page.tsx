"use client";

import Link from "next/link";
import { CalendarDays, Trophy } from "lucide-react";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { PaymentForm, SubmissionForm, TicketForm } from "@/components/forms/platform-forms";
import { DataTable } from "@/components/ui/data-table";
import { PremiumCard, ProgressBar, Section, StatusBadge } from "@/components/ui/primitives";
import { usePlatformStore } from "@/store/platform-store";

export default function Page() {
  const { db, currentUser } = usePlatformStore();
  const userId = currentUser?.id ?? "";
  const enrollments = db.enrollments.filter((item) => item.studentId === userId);
  const applications = db.applications.filter((item) => item.studentId === userId);
  const submissions = db.submissions.filter((item) => item.studentId === userId);
  const payments = db.payments.filter((item) => item.userId === userId);
  const certificates = db.certificates.filter((item) => item.studentId === userId);
  return (
    <DashboardShell allowed={["student"]}>
      <div className="grid gap-6">
        <div className="grid gap-4 md:grid-cols-4">
          <PremiumCard><p className="text-sm text-white/50">Completion</p><p className="mt-2 text-3xl font-bold">{enrollments[0]?.progress ?? 0}%</p><div className="mt-4"><ProgressBar value={enrollments[0]?.progress ?? 0} /></div></PremiumCard>
          <PremiumCard><p className="text-sm text-white/50">Applications</p><p className="mt-2 text-3xl font-bold">{applications.length}</p></PremiumCard>
          <PremiumCard><p className="text-sm text-white/50">Submissions</p><p className="mt-2 text-3xl font-bold">{submissions.length}</p></PremiumCard>
          <PremiumCard><p className="text-sm text-white/50">Badges</p><p className="mt-2 flex items-center gap-2 text-3xl font-bold"><Trophy className="text-solar" /> 4</p></PremiumCard>
        </div>
        <div className="grid gap-5 xl:grid-cols-[1fr_0.8fr]">
          <PremiumCard id="tasks"><h2 className="mb-5 text-2xl font-bold">Submit assigned task</h2><SubmissionForm /></PremiumCard>
          <PremiumCard><h2 className="mb-5 text-2xl font-bold">Internship calendar</h2><div className="grid gap-3">{db.tasks.map((task) => <div key={task.id} className="flex items-center gap-3 rounded-2xl bg-white/8 p-3"><CalendarDays className="text-aurora" /><div><p className="font-semibold">{task.title}</p><p className="text-sm text-white/45">Due {task.deadline}</p></div></div>)}</div></PremiumCard>
        </div>
        <PremiumCard><h2 className="mb-5 text-2xl font-bold">Submission history and feedback</h2><DataTable rows={submissions.map((s) => ({ id: s.id, task: db.tasks.find((t) => t.id === s.taskId)?.title, status: s.status, feedback: s.feedback, submittedAt: s.submittedAt }))} columns={[{ key: "task", label: "Task" }, { key: "status", label: "Status" }, { key: "feedback", label: "Feedback" }, { key: "submittedAt", label: "Submitted" }]} /></PremiumCard>
        <div className="grid gap-5 xl:grid-cols-2">
          <PremiumCard id="payments"><h2 className="mb-5 text-2xl font-bold">Payment status and UPI proof</h2><PaymentForm /><div className="mt-6 grid gap-3">{payments.map((payment) => <div key={payment.id} className="flex items-center justify-between rounded-2xl bg-white/8 p-3"><span>{payment.purpose}</span><StatusBadge status={payment.status} /></div>)}</div></PremiumCard>
          <PremiumCard id="certificates"><h2 className="mb-5 text-2xl font-bold">Certificate status</h2>{certificates.map((certificate) => <div key={certificate.id} className="rounded-2xl bg-white/8 p-4"><p className="font-semibold">{certificate.certificateNo}</p><p className="mt-1 text-sm text-white/50">Issued {certificate.issuedAt}</p><div className="mt-3"><StatusBadge status={certificate.status} /></div><Link href={certificate.verificationUrl} className="mt-4 inline-block text-aurora">Verify / download placeholder</Link></div>)}<h3 className="mt-8 mb-4 text-xl font-bold">Support</h3><TicketForm /></PremiumCard>
        </div>
      </div>
    </DashboardShell>
  );
}
