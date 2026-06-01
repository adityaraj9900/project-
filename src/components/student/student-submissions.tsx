"use client";

import { useEffect, useState } from "react";
import { CheckCircle2, Clock, XCircle, ExternalLink } from "lucide-react";
import { GoldCard, Badge } from "@/components/ui/primitives";

interface Row {
  submission: {
    id: string;
    status: string;
    githubUrl?: string;
    liveUrl?: string;
    feedback?: string;
    submittedAt: string;
  };
  task: { id: string; title: string; points: number } | null;
}

function statusTone(s: string): "success" | "warning" | "danger" | "info" | "default" {
  if (s === "approved") return "success";
  if (s === "pending") return "warning";
  if (s === "rejected") return "danger";
  return "default";
}

function StatusIcon({ status }: { status: string }) {
  if (status === "approved") return <CheckCircle2 size={15} className="text-emerald-400" />;
  if (status === "rejected") return <XCircle size={15} className="text-red-400" />;
  return <Clock size={15} className="text-amber-400" />;
}

export function StudentSubmissions() {
  const [rows, setRows] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/student/submissions")
      .then((r) => r.json())
      .then((d) => { setRows(Array.isArray(d) ? d : []); setLoading(false); });
  }, []);

  if (loading) {
    return (
      <div className="space-y-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-20 animate-pulse rounded-xl bg-[rgba(201,168,76,0.04)] border border-[rgba(201,168,76,0.08)]" />
        ))}
      </div>
    );
  }

  if (rows.length === 0) {
    return (
      <GoldCard>
        <p className="py-8 text-center text-sm text-[#F5F0E8]/45">No submissions yet. Complete tasks and submit your work.</p>
      </GoldCard>
    );
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-4 sm:grid-cols-3">
        {[
          { label: "Total", value: rows.length, color: "text-[#C9A84C]" },
          { label: "Approved", value: rows.filter((r) => r.submission.status === "approved").length, color: "text-emerald-400" },
          { label: "Pending", value: rows.filter((r) => r.submission.status === "pending").length, color: "text-amber-400" },
        ].map((s) => (
          <GoldCard key={s.label} hover={false} className="text-center py-3">
            <div className={`text-2xl font-black ${s.color}`}>{s.value}</div>
            <div className="text-xs text-[#F5F0E8]/40">{s.label}</div>
          </GoldCard>
        ))}
      </div>

      <div className="space-y-3">
        {rows.map(({ submission: s, task }) => (
          <GoldCard key={s.id}>
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="flex items-start gap-2.5">
                <StatusIcon status={s.status} />
                <div>
                  <h4 className="font-semibold text-[#F5F0E8]">{task?.title ?? "Task"}</h4>
                  <p className="text-xs text-[#F5F0E8]/35">
                    {new Date(s.submittedAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {task?.points && <span className="text-xs text-[#C9A84C]">{task.points} pts</span>}
                <Badge tone={statusTone(s.status)}>{s.status}</Badge>
              </div>
            </div>

            <div className="mt-3 flex flex-wrap gap-3">
              {s.githubUrl && (
                <a href={s.githubUrl} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 text-xs text-[#F5F0E8]/50 hover:text-[#C9A84C] transition-colors">
                  GitHub <ExternalLink size={10} />
                </a>
              )}
              {s.liveUrl && (
                <a href={s.liveUrl} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 text-xs text-[#F5F0E8]/50 hover:text-[#C9A84C] transition-colors">
                  Live demo <ExternalLink size={10} />
                </a>
              )}
            </div>

            {s.feedback && (
              <div className="mt-3 rounded-lg border border-[rgba(201,168,76,0.12)] bg-[rgba(201,168,76,0.04)] px-3 py-2">
                <p className="text-xs text-[#F5F0E8]/60">
                  <span className="font-semibold text-[#C9A84C]">Mentor: </span>{s.feedback}
                </p>
              </div>
            )}
          </GoldCard>
        ))}
      </div>
    </div>
  );
}
