"use client";

import { useEffect, useState } from "react";
import { CheckCircle2, Clock, AlertCircle, X, Code2, Globe } from "lucide-react";
import { GoldCard, Badge } from "@/components/ui/primitives";
import { cn } from "@/lib/utils";

interface Task {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  points: number;
  submission: {
    id: string;
    status: string;
    githubUrl?: string;
    liveUrl?: string;
    notes?: string;
    feedback?: string;
  } | null;
}

function statusTone(s: string): "success" | "warning" | "danger" | "info" | "default" {
  if (s === "approved") return "success";
  if (s === "pending") return "warning";
  if (s === "rejected") return "danger";
  return "default";
}

function daysLeft(due: string) {
  const d = Math.ceil((new Date(due).getTime() - Date.now()) / 86400000);
  return d;
}

export function StudentTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState<Task | null>(null);
  const [form, setForm] = useState({ githubUrl: "", liveUrl: "" });
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    fetch("/api/student/tasks")
      .then((r) => r.json())
      .then((d) => { setTasks(Array.isArray(d) ? d : []); setLoading(false); });
  }, []);

  function openModal(task: Task) {
    setModal(task);
    setSuccess(false);
    setForm({
      githubUrl: task.submission?.githubUrl ?? "",
      liveUrl: task.submission?.liveUrl ?? "",
    });
  }

  async function submit() {
    if (!modal) return;
    setSaving(true);
    await fetch("/api/student/submissions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ taskId: modal.id, githubUrl: form.githubUrl, liveUrl: form.liveUrl }),
    });
    setSaving(false);
    setSuccess(true);
    const updated = await fetch("/api/student/tasks").then((r) => r.json());
    setTasks(Array.isArray(updated) ? updated : []);
    setTimeout(() => setModal(null), 1200);
  }

  if (loading) {
    return (
      <div className="space-y-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-24 animate-pulse rounded-xl bg-[rgba(201,168,76,0.04)] border border-[rgba(201,168,76,0.08)]" />
        ))}
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <GoldCard>
        <p className="py-8 text-center text-sm text-[#F5F0E8]/45">No tasks assigned yet.</p>
      </GoldCard>
    );
  }

  return (
    <>
      <div className="space-y-4">
        {tasks.map((task) => {
          const dl = task.dueDate ? daysLeft(task.dueDate) : null;
          const overdue = dl !== null && dl < 0;
          return (
            <GoldCard key={task.id} className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="font-black text-[#F5F0E8]">{task.title}</h3>
                  {task.submission && (
                    <Badge tone={statusTone(task.submission.status)}>{task.submission.status}</Badge>
                  )}
                </div>
                <p className="mt-1 text-sm text-[#F5F0E8]/45 line-clamp-2">{task.description}</p>
                <div className="mt-2 flex flex-wrap gap-3 text-xs text-[#F5F0E8]/35">
                  {task.dueDate && (
                    <span className={cn("flex items-center gap-1", overdue && "text-red-400")}>
                      {overdue ? <AlertCircle size={11} /> : <Clock size={11} />}
                      {overdue ? `Overdue by ${Math.abs(dl!)}d` : `${dl}d left`}
                    </span>
                  )}
                  <span className="flex items-center gap-1">
                    <CheckCircle2 size={11} className="text-[#C9A84C]" />
                    {task.points} pts
                  </span>
                </div>
                {task.submission?.feedback && (
                  <p className="mt-2 rounded-lg border border-[rgba(201,168,76,0.12)] bg-[rgba(201,168,76,0.04)] px-3 py-2 text-xs text-[#F5F0E8]/60">
                    <span className="font-semibold text-[#C9A84C]">Mentor feedback:</span> {task.submission.feedback}
                  </p>
                )}
              </div>
              <button
                onClick={() => openModal(task)}
                className="shrink-0 rounded-xl border border-[rgba(201,168,76,0.25)] bg-[rgba(201,168,76,0.08)] px-4 py-2 text-xs font-bold text-[#C9A84C] transition-all hover:bg-[rgba(201,168,76,0.15)]"
              >
                {task.submission ? "Re-submit" : "Submit"}
              </button>
            </GoldCard>
          );
        })}
      </div>

      {/* Submit modal */}
      {modal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur">
          <div className="w-full max-w-lg rounded-2xl border border-[rgba(201,168,76,0.2)] bg-[#0D0D0D] p-6 shadow-2xl">
            <div className="mb-4 flex items-start justify-between">
              <div>
                <p className="text-xs uppercase tracking-widest text-[#C9A84C]/60">Submit Task</p>
                <h3 className="text-lg font-black text-[#F5F0E8]">{modal.title}</h3>
              </div>
              <button onClick={() => setModal(null)} className="text-[#F5F0E8]/40 hover:text-[#F5F0E8]"><X size={18} /></button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold text-[#F5F0E8]/50">
                  <Code2 size={12} /> GitHub URL
                </label>
                <input
                  className="w-full rounded-xl border border-[rgba(201,168,76,0.15)] bg-[rgba(201,168,76,0.04)] px-4 py-2.5 text-sm text-[#F5F0E8] placeholder-[#F5F0E8]/25 focus:outline-none focus:border-[rgba(201,168,76,0.4)]"
                  placeholder="https://github.com/yourrepo"
                  value={form.githubUrl}
                  onChange={(e) => setForm({ ...form, githubUrl: e.target.value })}
                />
              </div>
              <div>
                <label className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold text-[#F5F0E8]/50">
                  <Globe size={12} /> Live URL (optional)
                </label>
                <input
                  className="w-full rounded-xl border border-[rgba(201,168,76,0.15)] bg-[rgba(201,168,76,0.04)] px-4 py-2.5 text-sm text-[#F5F0E8] placeholder-[#F5F0E8]/25 focus:outline-none focus:border-[rgba(201,168,76,0.4)]"
                  placeholder="https://yourproject.vercel.app"
                  value={form.liveUrl}
                  onChange={(e) => setForm({ ...form, liveUrl: e.target.value })}
                />
              </div>
            </div>
            <div className="mt-5 flex gap-3">
              <button onClick={() => setModal(null)} className="flex-1 rounded-xl border border-[rgba(201,168,76,0.15)] py-2.5 text-sm text-[#F5F0E8]/50 hover:text-[#F5F0E8]/80 transition-colors">
                Cancel
              </button>
              <button
                onClick={submit}
                disabled={saving || success}
                className="flex-1 rounded-xl bg-[#C9A84C] py-2.5 text-sm font-bold text-[#080808] transition-all hover:bg-[#E8C97A] disabled:opacity-60"
              >
                {success ? "Submitted!" : saving ? "Submitting..." : "Submit"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
