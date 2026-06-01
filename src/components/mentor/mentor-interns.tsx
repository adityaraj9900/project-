"use client";

import { useEffect, useState } from "react";
import { GoldCard, Badge } from "@/components/ui/primitives";

export function MentorInterns() {
  const [interns, setInterns] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/mentor/interns")
      .then((r) => r.json())
      .then((d) => { setInterns(Array.isArray(d) ? d : []); setLoading(false); });
  }, []);

  if (loading) {
    return (
      <div className="space-y-3">
        {[1, 2].map((i) => (
          <div key={i} className="h-24 animate-pulse rounded-xl bg-[rgba(201,168,76,0.04)] border border-[rgba(201,168,76,0.08)]" />
        ))}
      </div>
    );
  }

  if (interns.length === 0) {
    return (
      <GoldCard>
        <p className="py-8 text-center text-sm text-[#F5F0E8]/45">No interns assigned yet.</p>
      </GoldCard>
    );
  }

  return (
    <div className="space-y-4">
      {interns.map(({ enrollment, program, student }) => (
        <GoldCard key={enrollment.id}>
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[rgba(201,168,76,0.25)] bg-[rgba(201,168,76,0.08)] font-bold text-[#C9A84C]">
                {(student?.name ?? "S")[0]}
              </div>
              <div>
                <h4 className="font-black text-[#F5F0E8]">{student?.name ?? "Unknown"}</h4>
                <p className="text-xs text-[#F5F0E8]/40">{student?.email}</p>
              </div>
            </div>
            <Badge tone={enrollment.status === "active" ? "success" : "default"}>{enrollment.status}</Badge>
          </div>
          <div className="mt-3 text-xs text-[#F5F0E8]/50">
            <span className="font-semibold text-[#C9A84C]">{program?.title ?? "Program"}</span>
            {" · "}{program?.duration}
          </div>
          <div className="mt-3">
            <div className="mb-1.5 flex justify-between text-xs">
              <span className="text-[#F5F0E8]/40">Progress</span>
              <span className="font-bold text-[#C9A84C]">{enrollment.progress}%</span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-[rgba(201,168,76,0.08)]">
              <div
                className="h-full rounded-full bg-gradient-to-r from-[#C9A84C] to-[#E8C97A]"
                style={{ width: `${enrollment.progress}%` }}
              />
            </div>
          </div>
        </GoldCard>
      ))}
    </div>
  );
}
