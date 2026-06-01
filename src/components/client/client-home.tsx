"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { FolderKanban, CheckCircle2, Clock, IndianRupee } from "lucide-react";
import { GoldCard, Badge } from "@/components/ui/primitives";

interface ClientData {
  user: { name: string; email: string };
  projects: {
    id: string;
    title: string;
    status: string;
    progress: number;
    budget: number;
    milestones: { id: string; title: string; status: string; amount: number; dueDate?: string }[];
  }[];
  payments: { id: string; purpose: string; amount: number; status: string; createdAt: string }[];
}

export function ClientHome() {
  const { data: session } = useSession();
  const [data, setData] = useState<ClientData | null>(null);

  useEffect(() => {
    fetch("/api/client/me").then((r) => r.json()).then(setData);
  }, []);

  const totalSpend = (data?.payments ?? []).filter((p) => p.status === "approved").reduce((s, p) => s + p.amount, 0);
  const activeProjects = (data?.projects ?? []).filter((p) => p.status === "In Progress").length;
  const completedMilestones = (data?.projects ?? []).flatMap((p) => p.milestones).filter((m) => m.status === "completed").length;

  return (
    <div className="space-y-6">
      {/* Welcome */}
      <div className="relative overflow-hidden rounded-2xl border border-[rgba(201,168,76,0.2)] bg-gradient-to-br from-[rgba(201,168,76,0.08)] to-[rgba(201,168,76,0.02)] p-6">
        <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-[rgba(201,168,76,0.06)] blur-3xl" />
        <p className="text-sm font-semibold uppercase tracking-widest text-[#C9A84C]/70">Client Portal</p>
        <h2 className="mt-1 text-3xl font-black text-[#F5F0E8]">
          Welcome back, {session?.user?.name?.split(" ")[0] ?? "Client"}
        </h2>
        <p className="mt-1 text-sm text-[#F5F0E8]/45">Track your projects, milestones, and payments.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {[
          { label: "Active Projects", value: activeProjects, icon: FolderKanban, color: "text-[#C9A84C]" },
          { label: "Milestones Done", value: completedMilestones, icon: CheckCircle2, color: "text-emerald-400" },
          { label: "Pending Payments", value: (data?.payments ?? []).filter((p) => p.status === "pending").length, icon: Clock, color: "text-amber-400" },
          { label: "Total Paid", value: `₹${(totalSpend / 1000).toFixed(0)}K`, icon: IndianRupee, color: "text-[#C9A84C]" },
        ].map((s) => (
          <GoldCard key={s.label} hover={false} className="flex flex-col gap-2">
            <s.icon size={18} className={s.color} />
            <div className={`text-2xl font-black ${s.color}`}>{s.value}</div>
            <div className="text-xs text-[#F5F0E8]/45">{s.label}</div>
          </GoldCard>
        ))}
      </div>

      {/* Projects overview */}
      {(data?.projects ?? []).length > 0 && (
        <div>
          <h3 className="mb-3 text-sm font-black uppercase tracking-widest text-[#F5F0E8]/50">Your Projects</h3>
          <div className="space-y-3">
            {data!.projects.map((p) => (
              <GoldCard key={p.id}>
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h4 className="font-black text-[#F5F0E8]">{p.title}</h4>
                    <p className="text-xs text-[#F5F0E8]/40">
                      {p.milestones.filter((m) => m.status === "completed").length}/{p.milestones.length} milestones
                    </p>
                  </div>
                  <Badge tone={p.status === "Delivered" ? "success" : p.status === "In Progress" ? "info" : "default"}>
                    {p.status}
                  </Badge>
                </div>
                <div className="mt-4">
                  <div className="mb-1.5 flex justify-between text-xs">
                    <span className="text-[#F5F0E8]/40">Progress</span>
                    <span className="font-bold text-[#C9A84C]">{p.progress}%</span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-[rgba(201,168,76,0.08)]">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-[#C9A84C] to-[#E8C97A] transition-all"
                      style={{ width: `${p.progress}%` }}
                    />
                  </div>
                </div>
              </GoldCard>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
