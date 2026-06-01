"use client";

import { useEffect, useState } from "react";
import { CheckCircle2, XCircle, ExternalLink, MessageSquare } from "lucide-react";
import { GoldCard, Badge } from "@/components/ui/primitives";

interface ReviewRow {
  submission: { id: string; status: string; githubUrl?: string; liveUrl?: string; feedback?: string; submittedAt: string };
  task: { id: string; title: string; points: number } | null;
  student: { id: string; name: string } | null;
}

function statusTone(s: string): "success" | "warning" | "danger" | "info" | "default" {
  if (s === "approved") return "success";
  if (s === "review" || s === "submitted") return "warning";
  if (s === "revision_needed") return "danger";
  return "default";
}

export function MentorReview() {
  const [rows, setRows] = useState<ReviewRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [feedback, setFeedback] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState<string | null>(null);

  useEffect(() => { load(); }, []);

  async function load() {
    const d = await fetch("/api/mentor/submissions").then((r) => r.json());
    setRows(Array.isArray(d) ? d : []);
    setLoading(false);
  }

  async function review(id: string, status: string) {
    setSaving(id);
    await fetch("/api/mentor/submissions", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status, feedback: feedback[id] ?? "", pointsEarned: status === "approved" ? (rows.find(r => r.submission.id === id)?.task?.points ?? 100) : 0 }),
    });
    setSaving(null);
    await load();
  }

  if (loading) {
    return (
      <div className="space-y-3">
        {[1, 2].map((i) => <div key={i} className="h-32 animate-pulse rounded-xl bg-[rgba(201,168,76,0.04)] border border-[rgba(201,168,76,0.08)]" />)}
      </div>
    );
  }

  const pending = rows.filter((r) => r.submission.status === "submitted" || r.submission.status === "review");
  const reviewed = rows.filter((r) => r.submission.status === "approved" || r.submission.status === "revision_needed");

  return (
    <div className="space-y-6">
      {/* Pending */}
      <div>
        <h3 className="mb-3 text-sm font-black uppercase tracking-widest text-[#F5F0E8]/50">
          Pending Review ({pending.length})
        </h3>
        {pending.length === 0 ? (
          <GoldCard>
            <p className="py-6 text-center text-sm text-emerald-400">All submissions reviewed!</p>
          </GoldCard>
        ) : (
          <div className="space-y-4">
            {pending.map(({ submission: s, task, student }) => (
              <GoldCard key={s.id}>
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <h4 className="font-black text-[#F5F0E8]">{task?.title ?? "Task"}</h4>
                    <p className="text-xs text-[#F5F0E8]/40">by {student?.name ?? "Student"}</p>
                  </div>
                  <Badge tone="warning">{s.status}</Badge>
                </div>

                <div className="mt-3 flex flex-wrap gap-3">
                  {s.githubUrl && (
                    <a href={s.githubUrl} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 text-xs text-[#F5F0E8]/50 hover:text-[#C9A84C]">
                      GitHub <ExternalLink size={10} />
                    </a>
                  )}
                  {s.liveUrl && (
                    <a href={s.liveUrl} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 text-xs text-[#F5F0E8]/50 hover:text-[#C9A84C]">
                      Live demo <ExternalLink size={10} />
                    </a>
                  )}
                </div>

                <div className="mt-3">
                  <label className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold text-[#F5F0E8]/45">
                    <MessageSquare size={11} /> Feedback
                  </label>
                  <textarea
                    rows={2}
                    className="w-full resize-none rounded-xl border border-[rgba(201,168,76,0.15)] bg-[rgba(201,168,76,0.04)] px-4 py-2.5 text-sm text-[#F5F0E8] placeholder-[#F5F0E8]/20 focus:outline-none focus:border-[rgba(201,168,76,0.4)]"
                    placeholder="Write feedback for the student..."
                    value={feedback[s.id] ?? ""}
                    onChange={(e) => setFeedback({ ...feedback, [s.id]: e.target.value })}
                  />
                </div>

                <div className="mt-3 flex gap-2">
                  <button
                    onClick={() => review(s.id, "approved")}
                    disabled={saving === s.id}
                    className="flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-emerald-500/15 py-2.5 text-xs font-bold text-emerald-400 transition-all hover:bg-emerald-500/25 disabled:opacity-60"
                  >
                    <CheckCircle2 size={13} /> Approve
                  </button>
                  <button
                    onClick={() => review(s.id, "revision_needed")}
                    disabled={saving === s.id}
                    className="flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-amber-500/10 py-2.5 text-xs font-bold text-amber-400 transition-all hover:bg-amber-500/20 disabled:opacity-60"
                  >
                    <XCircle size={13} /> Request Revision
                  </button>
                </div>
              </GoldCard>
            ))}
          </div>
        )}
      </div>

      {/* Reviewed */}
      {reviewed.length > 0 && (
        <div>
          <h3 className="mb-3 text-sm font-black uppercase tracking-widest text-[#F5F0E8]/50">
            Reviewed ({reviewed.length})
          </h3>
          <div className="space-y-3">
            {reviewed.map(({ submission: s, task, student }) => (
              <GoldCard key={s.id} hover={false}>
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <h4 className="text-sm font-semibold text-[#F5F0E8]/70">{task?.title}</h4>
                    <p className="text-xs text-[#F5F0E8]/35">{student?.name}</p>
                  </div>
                  <Badge tone={statusTone(s.status)}>{s.status}</Badge>
                </div>
                {s.feedback && (
                  <p className="mt-2 text-xs text-[#F5F0E8]/40 italic">{s.feedback}</p>
                )}
              </GoldCard>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
