"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { Users, ClipboardCheck, CheckCircle2 } from "lucide-react";
import { GoldCard } from "@/components/ui/primitives";

export function MentorHome() {
  const { data: session } = useSession();
  const [interns, setInterns] = useState<any[]>([]);
  const [submissions, setSubmissions] = useState<any[]>([]);

  useEffect(() => {
    Promise.all([
      fetch("/api/mentor/interns").then((r) => r.json()),
      fetch("/api/mentor/submissions").then((r) => r.json()),
    ]).then(([i, s]) => {
      setInterns(Array.isArray(i) ? i : []);
      setSubmissions(Array.isArray(s) ? s : []);
    });
  }, []);

  const pending = submissions.filter((s) => s.submission?.status === "submitted" || s.submission?.status === "review");
  const approved = submissions.filter((s) => s.submission?.status === "approved");

  return (
    <div className="space-y-6">
      <div className="relative overflow-hidden rounded-2xl border border-[rgba(201,168,76,0.2)] bg-gradient-to-br from-[rgba(201,168,76,0.08)] to-[rgba(201,168,76,0.02)] p-6">
        <p className="text-sm font-semibold uppercase tracking-widest text-[#C9A84C]/70">Mentor Portal</p>
        <h2 className="mt-1 text-3xl font-black text-[#F5F0E8]">
          Hey, {session?.user?.name?.split(" ")[0] ?? "Mentor"}
        </h2>
        <p className="mt-1 text-sm text-[#F5F0E8]/45">Review submissions, track intern progress, and issue documents.</p>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Interns", value: interns.length, icon: Users, color: "text-[#C9A84C]" },
          { label: "Pending Reviews", value: pending.length, icon: ClipboardCheck, color: "text-amber-400" },
          { label: "Approved", value: approved.length, icon: CheckCircle2, color: "text-emerald-400" },
        ].map((s) => (
          <GoldCard key={s.label} hover={false} className="text-center">
            <s.icon size={18} className={`mx-auto ${s.color}`} />
            <div className={`mt-2 text-2xl font-black ${s.color}`}>{s.value}</div>
            <div className="text-xs text-[#F5F0E8]/40">{s.label}</div>
          </GoldCard>
        ))}
      </div>

      {pending.length > 0 && (
        <GoldCard>
          <h3 className="mb-4 text-sm font-black uppercase tracking-widest text-[#F5F0E8]/50">Needs Review</h3>
          <div className="space-y-3">
            {pending.slice(0, 5).map(({ submission: s, task, student }) => (
              <div key={s.id} className="flex items-center justify-between gap-3 rounded-xl border border-[rgba(201,168,76,0.08)] bg-[rgba(201,168,76,0.03)] px-4 py-3">
                <div>
                  <p className="text-sm font-semibold text-[#F5F0E8]/80">{task?.title ?? "Task"}</p>
                  <p className="text-xs text-[#F5F0E8]/40">{student?.name ?? "Student"}</p>
                </div>
                <span className="text-xs font-bold text-amber-400">{s.status}</span>
              </div>
            ))}
          </div>
        </GoldCard>
      )}
    </div>
  );
}
