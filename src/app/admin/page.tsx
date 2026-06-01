"use client";

import { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  LayoutDashboard, Users, FileText, Briefcase, CreditCard, BookOpen,
  Settings, Bell, LogOut, ChevronRight, TrendingUp, UserCheck,
  ClipboardList, Award, Menu, X, Megaphone, Star
} from "lucide-react";
import { cn } from "@/lib/utils";
import { GoldCard, Button, Badge, ProgressBar, Tabs, StatusBadge, Skeleton, SectionHeader } from "@/components/ui/primitives";
import { AdminDashboard } from "@/components/admin/admin-dashboard";
import { AdminLeads } from "@/components/admin/admin-leads";
import { AdminApplications } from "@/components/admin/admin-applications";
import { AdminInterns } from "@/components/admin/admin-interns";
import { AdminProjects } from "@/components/admin/admin-projects";
import { AdminPayments } from "@/components/admin/admin-payments";
import { AdminBlog } from "@/components/admin/admin-blog";
import { AdminDocuments } from "@/components/admin/admin-documents";
import { AdminAnnouncements } from "@/components/admin/admin-announcements";
import { AdminSettings } from "@/components/admin/admin-settings";

const NAV = [
  { key: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { key: "leads", label: "Leads CRM", icon: TrendingUp },
  { key: "applications", label: "Applications", icon: ClipboardList },
  { key: "interns", label: "Interns", icon: Users },
  { key: "documents", label: "Offer Letters & LORs", icon: FileText },
  { key: "projects", label: "Projects", icon: Briefcase },
  { key: "payments", label: "Payments", icon: CreditCard },
  { key: "blog", label: "Blog CMS", icon: BookOpen },
  { key: "announcements", label: "Announcements", icon: Megaphone },
  { key: "settings", label: "Settings", icon: Settings },
];

const PANELS: Record<string, React.ReactNode> = {
  dashboard: <AdminDashboard />,
  leads: <AdminLeads />,
  applications: <AdminApplications />,
  interns: <AdminInterns />,
  documents: <AdminDocuments />,
  projects: <AdminProjects />,
  payments: <AdminPayments />,
  blog: <AdminBlog />,
  announcements: <AdminAnnouncements />,
  settings: <AdminSettings />,
};

export default function AdminPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const [active, setActive] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-[#080808]">
      {/* Sidebar */}
      <aside className={cn(
        "fixed inset-y-0 left-0 z-40 flex w-64 flex-col border-r border-[rgba(201,168,76,0.1)] bg-[#0A0A0A] transition-transform duration-300",
        sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      )}>
        {/* Logo */}
        <div className="flex items-center gap-3 border-b border-[rgba(201,168,76,0.1)] px-5 py-5">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[rgba(201,168,76,0.35)] bg-[rgba(201,168,76,0.08)] text-xl font-black text-[#C9A84C]">O</div>
          <div>
            <div className="text-sm font-black tracking-widest text-[#F5F0E8]">ORBITIX</div>
            <div className="text-[10px] uppercase tracking-[0.22em] text-[#C9A84C]/60">Admin</div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto p-3">
          {NAV.map((item) => (
            <button
              key={item.key}
              onClick={() => { setActive(item.key); setSidebarOpen(false); }}
              className={cn(
                "flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all",
                active === item.key
                  ? "bg-[rgba(201,168,76,0.12)] text-[#C9A84C]"
                  : "text-[#F5F0E8]/50 hover:bg-[rgba(201,168,76,0.06)] hover:text-[#F5F0E8]/80"
              )}
            >
              <item.icon size={16} className="shrink-0" />
              {item.label}
            </button>
          ))}
        </nav>

        {/* User */}
        <div className="border-t border-[rgba(201,168,76,0.1)] p-4">
          <div className="mb-3 flex items-center gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[rgba(201,168,76,0.25)] bg-[rgba(201,168,76,0.08)] text-sm font-bold text-[#C9A84C]">
              {session?.user?.name?.[0] ?? "A"}
            </div>
            <div className="min-w-0">
              <div className="truncate text-xs font-semibold text-[#F5F0E8]/80">{session?.user?.name ?? "Admin"}</div>
              <div className="truncate text-[10px] text-[#F5F0E8]/40">{session?.user?.email}</div>
            </div>
          </div>
          <button onClick={() => signOut({ callbackUrl: "/auth/login" })} className="flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-xs text-[#F5F0E8]/40 hover:text-red-400 transition-colors">
            <LogOut size={13} /> Sign out
          </button>
        </div>
      </aside>

      {/* Mobile overlay */}
      {sidebarOpen && <div className="fixed inset-0 z-30 bg-black/60 lg:hidden" onClick={() => setSidebarOpen(false)} />}

      {/* Main content */}
      <div className="flex-1 lg:ml-64">
        {/* Top bar */}
        <header className="sticky top-0 z-20 flex items-center justify-between border-b border-[rgba(201,168,76,0.1)] bg-[rgba(8,8,8,0.95)] px-6 py-4 backdrop-blur">
          <div className="flex items-center gap-3">
            <button onClick={() => setSidebarOpen(true)} className="rounded-lg border border-[rgba(201,168,76,0.15)] p-2 text-[#F5F0E8]/60 lg:hidden">
              <Menu size={18} />
            </button>
            <h1 className="text-base font-black text-[#F5F0E8] capitalize">{active}</h1>
          </div>
          <Badge tone="gold">Super Admin</Badge>
        </header>

        <main className="p-6">
          {PANELS[active] ?? <div className="text-[#F5F0E8]/40 text-sm">Section coming soon.</div>}
        </main>
      </div>
    </div>
  );
}
