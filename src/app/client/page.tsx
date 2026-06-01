"use client";

import { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { LayoutDashboard, FolderKanban, CreditCard, MessageSquare, UserCircle, LogOut, Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/primitives";
import { ClientHome } from "@/components/client/client-home";
import { ClientProjects } from "@/components/client/client-projects";
import { ClientPayments } from "@/components/client/client-payments";
import { ClientMessages } from "@/components/client/client-messages";
import { ClientProfile } from "@/components/client/client-profile";

const NAV = [
  { key: "home", label: "Overview", icon: LayoutDashboard },
  { key: "projects", label: "Projects", icon: FolderKanban },
  { key: "payments", label: "Payments", icon: CreditCard },
  { key: "messages", label: "Messages", icon: MessageSquare },
  { key: "profile", label: "Profile", icon: UserCircle },
];

const PANELS: Record<string, React.ReactNode> = {
  home: <ClientHome />,
  projects: <ClientProjects />,
  payments: <ClientPayments />,
  messages: <ClientMessages />,
  profile: <ClientProfile />,
};

export default function ClientPage() {
  const { data: session } = useSession();
  const [active, setActive] = useState("home");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-[#080808]">
      <aside className={cn("fixed inset-y-0 left-0 z-40 flex w-60 flex-col border-r border-[rgba(201,168,76,0.1)] bg-[#0A0A0A] transition-transform duration-300", sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0")}>
        <div className="flex items-center gap-3 border-b border-[rgba(201,168,76,0.1)] px-5 py-5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-[rgba(201,168,76,0.35)] bg-[rgba(201,168,76,0.08)] font-black text-[#C9A84C]">O</div>
          <div>
            <div className="text-sm font-black tracking-widest text-[#F5F0E8]">ORBITIX</div>
            <div className="text-[10px] uppercase tracking-[0.22em] text-[#C9A84C]">Client</div>
          </div>
        </div>
        <nav className="flex-1 overflow-y-auto p-3">
          {NAV.map(item => (
            <button key={item.key} onClick={() => { setActive(item.key); setSidebarOpen(false); }} className={cn("flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all", active === item.key ? "bg-[rgba(201,168,76,0.12)] text-[#C9A84C]" : "text-[#F5F0E8]/50 hover:bg-[rgba(201,168,76,0.06)] hover:text-[#F5F0E8]/80")}>
              <item.icon size={16} className="shrink-0" />{item.label}
            </button>
          ))}
        </nav>
        <div className="border-t border-[rgba(201,168,76,0.1)] p-4">
          <div className="mb-3 flex items-center gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[rgba(201,168,76,0.25)] bg-[rgba(201,168,76,0.08)] text-sm font-bold text-[#C9A84C]">{session?.user?.name?.[0] ?? "C"}</div>
            <div className="min-w-0"><div className="truncate text-xs font-semibold text-[#F5F0E8]/80">{session?.user?.name}</div><div className="truncate text-[10px] text-[#F5F0E8]/40">{session?.user?.email}</div></div>
          </div>
          <button onClick={() => signOut({ callbackUrl: "/auth/login" })} className="flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-xs text-[#F5F0E8]/40 hover:text-red-400 transition-colors"><LogOut size={13} /> Sign out</button>
        </div>
      </aside>
      {sidebarOpen && <div className="fixed inset-0 z-30 bg-black/60 lg:hidden" onClick={() => setSidebarOpen(false)} />}
      <div className="flex-1 lg:ml-60">
        <header className="sticky top-0 z-20 flex items-center justify-between border-b border-[rgba(201,168,76,0.1)] bg-[rgba(8,8,8,0.95)] px-6 py-4 backdrop-blur">
          <div className="flex items-center gap-3">
            <button onClick={() => setSidebarOpen(true)} className="rounded-lg border border-[rgba(201,168,76,0.15)] p-2 text-[#F5F0E8]/60 lg:hidden"><Menu size={18} /></button>
            <h1 className="text-base font-black text-[#F5F0E8]">{NAV.find(n => n.key === active)?.label}</h1>
          </div>
          <Badge tone="gold">Client</Badge>
        </header>
        <main className="p-6">{PANELS[active]}</main>
      </div>
    </div>
  );
}
