"use client";

import { useEffect, useState } from "react";
import { GoldCard, StatCard, ProgressBar, Badge } from "@/components/ui/primitives";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { TrendingUp, Users, Briefcase, FileText } from "lucide-react";

const CHART_DATA = [
  { month: "Jan", revenue: 85000 }, { month: "Feb", revenue: 140000 },
  { month: "Mar", revenue: 110000 }, { month: "Apr", revenue: 210000 },
  { month: "May", revenue: 180000 }, { month: "Jun", revenue: 265000 },
];

const ACTIVITY = [
  { action: "Approved Riya's application to Full-Stack", time: "2 hours ago" },
  { action: "New lead from FleetZen — SaaS project", time: "5 hours ago" },
  { action: "Maya reviewed dashboard submission", time: "Yesterday" },
  { action: "Certificate issued: ORB-FS-2026-0001", time: "2 days ago" },
  { action: "New client payment approved: ₹1,05,000", time: "3 days ago" },
];

export function AdminDashboard() {
  return (
    <div className="grid gap-6">
      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { value: "3", label: "Active Leads", icon: TrendingUp, tone: "gold" as const },
          { value: "1", label: "Active Projects", icon: Briefcase, tone: "gold" as const },
          { value: "1", label: "Active Interns", icon: Users, tone: "gold" as const },
          { value: "1", label: "Pending Applications", icon: FileText, tone: "gold" as const },
        ].map((s) => (
          <GoldCard key={s.label}>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-black text-[#C9A84C]">{s.value}</div>
                <div className="mt-1 text-xs text-[#F5F0E8]/50">{s.label}</div>
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[rgba(201,168,76,0.2)] bg-[rgba(201,168,76,0.08)]">
                <s.icon size={18} className="text-[#C9A84C]" />
              </div>
            </div>
          </GoldCard>
        ))}
      </div>

      {/* Revenue chart */}
      <GoldCard>
        <h2 className="mb-6 text-lg font-black text-[#F5F0E8]">Revenue (client payments only)</h2>
        <ResponsiveContainer width="100%" height={220}>
          <LineChart data={CHART_DATA}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(201,168,76,0.08)" />
            <XAxis dataKey="month" tick={{ fill: "rgba(245,240,232,0.4)", fontSize: 12 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: "rgba(245,240,232,0.4)", fontSize: 12 }} axisLine={false} tickLine={false} tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}K`} />
            <Tooltip formatter={(v) => [`₹${Number(v).toLocaleString()}`, "Revenue"]} contentStyle={{ background: "#0F0F0F", border: "1px solid rgba(201,168,76,0.2)", borderRadius: "12px", color: "#F5F0E8" }} />
            <Line type="monotone" dataKey="revenue" stroke="#C9A84C" strokeWidth={2.5} dot={{ fill: "#C9A84C", r: 4 }} activeDot={{ r: 6 }} />
          </LineChart>
        </ResponsiveContainer>
      </GoldCard>

      {/* Activity feed */}
      <GoldCard>
        <h2 className="mb-5 text-lg font-black text-[#F5F0E8]">Recent activity</h2>
        <div className="grid gap-3">
          {ACTIVITY.map((a, i) => (
            <div key={i} className="flex items-center justify-between gap-4 rounded-xl border border-[rgba(201,168,76,0.08)] bg-[rgba(201,168,76,0.03)] px-4 py-3">
              <span className="text-sm text-[#F5F0E8]/75">{a.action}</span>
              <span className="shrink-0 text-xs text-[#F5F0E8]/35">{a.time}</span>
            </div>
          ))}
        </div>
      </GoldCard>
    </div>
  );
}
