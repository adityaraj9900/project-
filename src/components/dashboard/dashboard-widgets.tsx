"use client";

import { Area, AreaChart, Bar, BarChart, CartesianGrid, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Award, BriefcaseBusiness, CreditCard, FileCheck2, GraduationCap, TrendingUp } from "lucide-react";
import { currency } from "@/lib/utils";
import { PremiumCard, ProgressBar, StatusBadge } from "@/components/ui/primitives";
import { usePlatformStore } from "@/store/platform-store";

export function StatGrid() {
  const db = usePlatformStore((state) => state.db);
  const stats = [
    { label: "Total students", value: db.users.filter((u) => u.role === "student").length, icon: <GraduationCap /> },
    { label: "Applications", value: db.applications.length, icon: <FileCheck2 /> },
    { label: "Active interns", value: db.enrollments.filter((e) => e.status === "active").length, icon: <TrendingUp /> },
    { label: "Revenue tracked", value: currency(db.payments.reduce((sum, item) => sum + item.amount, 0)), icon: <CreditCard /> },
    { label: "Certificates", value: db.certificates.length, icon: <Award /> },
    { label: "Client projects", value: db.projects.length, icon: <BriefcaseBusiness /> }
  ];
  return <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">{stats.map((stat) => <PremiumCard key={stat.label}><div className="flex items-center justify-between"><div><p className="text-sm text-white/50">{stat.label}</p><p className="mt-2 text-3xl font-bold">{stat.value}</p></div><span className="text-aurora">{stat.icon}</span></div></PremiumCard>)}</div>;
}

export function AnalyticsCharts() {
  const db = usePlatformStore((state) => state.db);
  const funnel = [
    { name: "Visits", value: 1400 },
    { name: "Applies", value: db.applications.length * 120 },
    { name: "Approved", value: db.applications.filter((a) => a.status === "approved").length * 100 },
    { name: "Completed", value: db.enrollments.filter((e) => e.status === "completed").length * 100 + 42 }
  ];
  const programs = db.programs.map((program) => ({ name: program.category, interns: db.enrollments.filter((e) => e.programId === program.id).length + Math.floor(program.certificateFee / 500), revenue: program.certificateFee }));
  return (
    <div className="grid gap-5 xl:grid-cols-2">
      <PremiumCard>
        <h3 className="mb-6 text-xl font-bold">Conversion funnel</h3>
        <div className="h-72"><ResponsiveContainer><AreaChart data={funnel}><CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,.08)" /><XAxis dataKey="name" stroke="rgba(255,255,255,.45)" /><YAxis stroke="rgba(255,255,255,.45)" /><Tooltip contentStyle={{ background: "#05060f", border: "1px solid rgba(255,255,255,.12)" }} /><Area type="monotone" dataKey="value" stroke="#15f5ba" fill="#15f5ba33" /></AreaChart></ResponsiveContainer></div>
      </PremiumCard>
      <PremiumCard>
        <h3 className="mb-6 text-xl font-bold">Program stats</h3>
        <div className="h-72"><ResponsiveContainer><BarChart data={programs}><CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,.08)" /><XAxis dataKey="name" stroke="rgba(255,255,255,.45)" /><YAxis stroke="rgba(255,255,255,.45)" /><Tooltip contentStyle={{ background: "#05060f", border: "1px solid rgba(255,255,255,.12)" }} /><Bar dataKey="interns" fill="#7c3aed" radius={[8, 8, 0, 0]} /></BarChart></ResponsiveContainer></div>
      </PremiumCard>
    </div>
  );
}

export function ProjectCards() {
  const db = usePlatformStore((state) => state.db);
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      {db.projects.map((project) => (
        <PremiumCard key={project.id}>
          <div className="flex items-center justify-between gap-3"><h3 className="text-xl font-bold">{project.title}</h3><StatusBadge status={project.status} /></div>
          <p className="mt-3 text-sm text-white/55">Team: {project.team.map((id) => db.users.find((u) => u.id === id)?.name).join(", ")}</p>
          <div className="mt-5"><ProgressBar value={project.progress} /></div>
          <p className="mt-2 text-sm text-white/45">{project.progress}% complete · Budget {currency(project.budget)}</p>
        </PremiumCard>
      ))}
    </div>
  );
}

export function CertificatePie() {
  const data = [{ name: "Issued", value: 76, color: "#15f5ba" }, { name: "Pending", value: 18, color: "#f8d66d" }, { name: "Revoked", value: 6, color: "#ff6b6b" }];
  return (
    <PremiumCard>
      <h3 className="mb-4 text-xl font-bold">Certificate analytics</h3>
      <div className="h-56"><ResponsiveContainer><PieChart><Pie data={data} dataKey="value" innerRadius={55} outerRadius={88}>{data.map((entry) => <Cell key={entry.name} fill={entry.color} />)}</Pie><Tooltip contentStyle={{ background: "#05060f", border: "1px solid rgba(255,255,255,.12)" }} /></PieChart></ResponsiveContainer></div>
    </PremiumCard>
  );
}
