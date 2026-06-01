"use client";

import { useEffect, useState } from "react";
import { CheckCircle2, Circle, Clock, AlertCircle } from "lucide-react";
import { GoldCard, Badge } from "@/components/ui/primitives";

interface Milestone {
  id: string;
  title: string;
  status: string;
  amount: number;
  dueDate?: string;
}

interface Project {
  id: string;
  title: string;
  status: string;
  progress: number;
  budget: number;
  milestones: Milestone[];
}

function statusTone(s: string): "success" | "warning" | "info" | "default" {
  if (s === "Delivered") return "success";
  if (s === "Review") return "warning";
  if (s === "In Progress") return "info";
  return "default";
}

export function ClientProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/client/me")
      .then((r) => r.json())
      .then((d) => { setProjects(d.projects ?? []); setLoading(false); });
  }, []);

  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2].map((i) => (
          <div key={i} className="h-40 animate-pulse rounded-xl bg-[rgba(201,168,76,0.04)] border border-[rgba(201,168,76,0.08)]" />
        ))}
      </div>
    );
  }

  if (projects.length === 0) {
    return (
      <GoldCard>
        <p className="py-8 text-center text-sm text-[#F5F0E8]/45">No projects yet. Contact us to start a project.</p>
      </GoldCard>
    );
  }

  return (
    <div className="space-y-6">
      {projects.map((project) => (
        <GoldCard key={project.id}>
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <h3 className="text-xl font-black text-[#F5F0E8]">{project.title}</h3>
              {project.budget && (
                <p className="mt-0.5 text-xs text-[#F5F0E8]/40">
                  Budget: ₹{(project.budget / 1000).toFixed(0)}K
                </p>
              )}
            </div>
            <Badge tone={statusTone(project.status)}>{project.status}</Badge>
          </div>

          {/* Progress bar */}
          <div className="mt-4">
            <div className="mb-1.5 flex justify-between text-xs">
              <span className="text-[#F5F0E8]/40">Overall progress</span>
              <span className="font-bold text-[#C9A84C]">{project.progress}%</span>
            </div>
            <div className="h-2.5 w-full overflow-hidden rounded-full bg-[rgba(201,168,76,0.08)]">
              <div
                className="h-full rounded-full bg-gradient-to-r from-[#C9A84C] to-[#E8C97A] transition-all"
                style={{ width: `${project.progress}%` }}
              />
            </div>
          </div>

          {/* Milestones */}
          {project.milestones.length > 0 && (
            <div className="mt-5">
              <h4 className="mb-3 text-xs font-black uppercase tracking-widest text-[#F5F0E8]/40">Milestones</h4>
              <div className="relative space-y-3 pl-6">
                <div className="absolute left-2 top-2 bottom-2 w-px bg-[rgba(201,168,76,0.12)]" />
                {project.milestones.map((m) => {
                  const isOverdue = m.dueDate && new Date(m.dueDate) < new Date() && m.status === "pending";
                  return (
                    <div key={m.id} className="relative flex items-start gap-3">
                      <div className="absolute -left-4 top-1">
                        {m.status === "completed" || m.status === "approved"
                          ? <CheckCircle2 size={16} className="text-[#C9A84C]" />
                          : isOverdue
                          ? <AlertCircle size={16} className="text-red-400" />
                          : <Circle size={16} className="text-[#F5F0E8]/20" />}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between gap-2">
                          <p className={`text-sm font-semibold ${m.status === "completed" || m.status === "approved" ? "text-[#F5F0E8]/80" : "text-[#F5F0E8]/50"}`}>
                            {m.title}
                          </p>
                          {m.amount && (
                            <span className="text-xs font-bold text-[#C9A84C]">₹{(m.amount / 1000).toFixed(0)}K</span>
                          )}
                        </div>
                        {m.dueDate && (
                          <p className={`mt-0.5 flex items-center gap-1 text-xs ${isOverdue ? "text-red-400" : "text-[#F5F0E8]/30"}`}>
                            <Clock size={10} />
                            {new Date(m.dueDate).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                          </p>
                        )}
                      </div>
                      <Badge tone={m.status === "completed" || m.status === "approved" ? "success" : "default"}>
                        {m.status}
                      </Badge>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </GoldCard>
      ))}
    </div>
  );
}
