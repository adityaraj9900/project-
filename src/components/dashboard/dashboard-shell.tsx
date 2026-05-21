"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { BarChart3, Bell, BriefcaseBusiness, FileCheck2, GraduationCap, Home, LogOut, Moon, Settings, Shield, Sun, UserRound } from "lucide-react";
import { useEffect } from "react";
import { cn } from "@/lib/utils";
import { usePlatformStore } from "@/store/platform-store";
import type { Role } from "@/types";

const navByRole: Record<string, { label: string; href: string; icon: React.ReactNode }[]> = {
  student: [
    { label: "Overview", href: "/student", icon: <Home size={17} /> },
    { label: "Tasks", href: "/student#tasks", icon: <FileCheck2 size={17} /> },
    { label: "Payments", href: "/student#payments", icon: <BriefcaseBusiness size={17} /> },
    { label: "Certificates", href: "/student#certificates", icon: <Shield size={17} /> }
  ],
  mentor: [
    { label: "Review", href: "/mentor", icon: <FileCheck2 size={17} /> },
    { label: "Students", href: "/mentor#students", icon: <GraduationCap size={17} /> },
    { label: "Announcements", href: "/mentor#announcements", icon: <Bell size={17} /> }
  ],
  client: [
    { label: "Projects", href: "/client", icon: <BriefcaseBusiness size={17} /> },
    { label: "Invoices", href: "/client#invoices", icon: <FileCheck2 size={17} /> },
    { label: "Messages", href: "/client#messages", icon: <Bell size={17} /> }
  ],
  admin: [
    { label: "Analytics", href: "/admin", icon: <BarChart3 size={17} /> },
    { label: "Applications", href: "/admin#applications", icon: <GraduationCap size={17} /> },
    { label: "Agency", href: "/admin#agency", icon: <BriefcaseBusiness size={17} /> },
    { label: "CMS", href: "/admin#cms", icon: <Settings size={17} /> }
  ]
};

export function DashboardShell({ children, allowed }: { children: React.ReactNode; allowed: Role[] }) {
  const router = useRouter();
  const pathname = usePathname();
  const { currentUser, logout, theme, toggleTheme } = usePlatformStore();
  const roleKey = currentUser?.role === "super-admin" ? "admin" : currentUser?.role ?? "student";

  useEffect(() => {
    if (!currentUser) router.replace("/auth/login");
    else if (!allowed.includes(currentUser.role)) router.replace("/unauthorized");
  }, [currentUser, allowed, router]);

  if (!currentUser || !allowed.includes(currentUser.role)) {
    return <main className="grid min-h-screen place-items-center px-6 text-white/70">Checking secure session...</main>;
  }

  return (
    <main className="min-h-screen bg-ink text-white">
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-72 border-r border-white/10 bg-ink/85 p-5 backdrop-blur-xl lg:block">
        <Link href="/" className="flex items-center gap-3 rounded-2xl bg-white/8 p-3">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-aurora text-ink"><GraduationCap /></span>
          <span><span className="block font-bold">Orbit Labs</span><span className="text-xs text-white/45">Mission control</span></span>
        </Link>
        <nav className="mt-8 grid gap-2">
          {navByRole[roleKey].map((item) => (
            <Link key={item.href} href={item.href} className={cn("flex items-center gap-3 rounded-2xl px-4 py-3 text-sm text-white/62 hover:bg-white/8 hover:text-white", pathname === item.href && "bg-white/10 text-white")}>{item.icon}{item.label}</Link>
          ))}
        </nav>
      </aside>
      <section className="lg:pl-72">
        <header className="sticky top-0 z-30 flex items-center justify-between border-b border-white/10 bg-ink/80 px-5 py-4 backdrop-blur-xl">
          <div>
            <p className="text-sm text-white/45">Logged in as {currentUser.role}</p>
            <h1 className="text-xl font-bold">{currentUser.name}</h1>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={toggleTheme} className="rounded-full border border-white/10 p-3">{theme === "dark" ? <Sun size={17} /> : <Moon size={17} />}</button>
            <button className="rounded-full border border-white/10 p-3"><UserRound size={17} /></button>
            <button onClick={logout} className="rounded-full border border-white/10 p-3"><LogOut size={17} /></button>
          </div>
        </header>
        <div className="p-5 md:p-8">{children}</div>
      </section>
    </main>
  );
}
