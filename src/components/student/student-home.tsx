"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { BookOpen, CheckCircle2, Clock, Megaphone, Sparkles } from "lucide-react";
import { GoldCard, Badge } from "@/components/ui/primitives";

interface Data {
  user: { name: string; email: string };
  profile: { city?: string } | null;
  enrollment: {
    enrollment: { status: string; startDate: string; progress: number };
    program: { title: string; duration: string; category: string };
  } | null;
  announcements: { id: string; title: string; body: string; createdAt: string }[];
}

export function StudentHome() {
  const { data: session } = useSession();
  const [data, setData] = useState<Data | null>(null);

  useEffect(() => {
    fetch("/api/student/me").then((r) => r.json()).then(setData);
  }, []);

  const firstName = session?.user?.name?.split(" ")[0] ?? "Intern";
  const enrollment = data?.enrollment;

  return (
    <div className="space-y-6">
      {/* Welcome banner */}
      <div className="relative overflow-hidden rounded-2xl border border-[rgba(201,168,76,0.2)] bg-gradient-to-br from-[rgba(201,168,76,0.08)] to-[rgba(201,168,76,0.02)] p-6">
        <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-[rgba(201,168,76,0.06)] blur-3xl" />
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm font-semibold text-[#C9A84C]/70 uppercase tracking-widest">Welcome back</p>
            <h2 className="mt-1 text-3xl font-black text-[#F5F0E8]">Hey, {firstName} 👋</h2>
            <p className="mt-1 text-sm text-[#F5F0E8]/45">
              {data?.profile?.city ? `Based in ${data.profile.city}` : "Your internship journey starts here."}
            </p>
          </div>
          <Sparkles className="text-[#C9A84C]/40" size={32} />
        </div>
        <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-emerald-500/25 bg-emerald-500/8 px-4 py-1.5 text-xs font-bold text-emerald-400">
          <CheckCircle2 size={12} /> 100% Free Internship — Zero Charges
        </div>
      </div>

      {/* Enrollment card */}
      {enrollment ? (
        <GoldCard>
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-[rgba(201,168,76,0.3)] bg-[rgba(201,168,76,0.08)]">
                <BookOpen size={20} className="text-[#C9A84C]" />
              </div>
              <div>
                <p className="text-xs text-[#F5F0E8]/40 uppercase tracking-widest">Current Program</p>
                <h3 className="font-black text-[#F5F0E8]">{enrollment.program.title}</h3>
              </div>
            </div>
            <Badge tone={enrollment.enrollment.status === "active" ? "success" : "warning"}>
              {enrollment.enrollment.status}
            </Badge>
          </div>
          <div className="mt-5">
            <div className="mb-1.5 flex items-center justify-between text-xs">
              <span className="text-[#F5F0E8]/45">Progress</span>
              <span className="font-bold text-[#C9A84C]">{enrollment.enrollment.progress ?? 0}%</span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-[rgba(201,168,76,0.08)]">
              <div
                className="h-full rounded-full bg-gradient-to-r from-[#C9A84C] to-[#E8C97A] transition-all"
                style={{ width: `${enrollment.enrollment.progress ?? 0}%` }}
              />
            </div>
          </div>
          <div className="mt-4 flex items-center gap-5 text-xs text-[#F5F0E8]/45">
            <span className="flex items-center gap-1.5"><Clock size={11} /> {enrollment.program.duration}</span>
            <span className="flex items-center gap-1.5"><Badge tone="gold">{enrollment.program.category}</Badge></span>
          </div>
        </GoldCard>
      ) : (
        <GoldCard>
          <p className="text-center text-sm text-[#F5F0E8]/45 py-4">
            No active enrollment yet. An admin will assign your program shortly.
          </p>
        </GoldCard>
      )}

      {/* Quick stats */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {[
          { label: "Program Fee", value: "₹0", sub: "Always free" },
          { label: "Certificate", value: "FREE", sub: "On completion" },
          { label: "LOR", value: "FREE", sub: "On completion" },
          { label: "Offer Letter", value: "FREE", sub: "On enrollment" },
        ].map((s) => (
          <GoldCard key={s.label} hover={false} className="text-center">
            <div className="text-2xl font-black text-[#C9A84C]">{s.value}</div>
            <div className="mt-1 text-xs font-semibold text-[#F5F0E8]/70">{s.label}</div>
            <div className="text-[10px] text-[#F5F0E8]/35">{s.sub}</div>
          </GoldCard>
        ))}
      </div>

      {/* Latest announcements */}
      {(data?.announcements ?? []).length > 0 && (
        <div>
          <h3 className="mb-3 flex items-center gap-2 text-sm font-black uppercase tracking-widest text-[#F5F0E8]/50">
            <Megaphone size={13} /> Announcements
          </h3>
          <div className="space-y-3">
            {(data?.announcements ?? []).map((a) => (
              <GoldCard key={a.id} hover={false} className="py-3">
                <p className="text-sm font-semibold text-[#F5F0E8]/85">{a.title}</p>
                <p className="mt-0.5 text-xs text-[#F5F0E8]/45 line-clamp-2">{a.body}</p>
              </GoldCard>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
