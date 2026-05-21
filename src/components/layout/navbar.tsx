"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { BriefcaseBusiness, GraduationCap, LogOut, Menu, Moon, Sparkles, Sun, UserRound } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { getRoleHome, usePlatformStore } from "@/store/platform-store";

const links = [
  ["Programs", "/programs"],
  ["Services", "/services"],
  ["Portfolio", "/portfolio"],
  ["Pricing", "/pricing"],
  ["Blog", "/blog"],
  ["Contact", "/contact"]
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { currentUser, logout, theme, toggleTheme } = usePlatformStore();

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 py-4">
      <nav className="glass mx-auto flex max-w-7xl items-center justify-between rounded-2xl px-4 py-3">
        <Link href="/" className="flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-aurora text-ink shadow-glow"><Sparkles size={20} /></span>
          <span>
            <span className="block text-sm font-bold tracking-wide">Orbit Labs</span>
            <span className="block text-[11px] uppercase tracking-[0.22em] text-white/50">Academy + Agency</span>
          </span>
        </Link>

        <div className="hidden items-center gap-1 lg:flex">
          {links.map(([label, href]) => (
            <Link key={href} href={href} className={cn("rounded-full px-4 py-2 text-sm text-white/70 transition hover:bg-white/10 hover:text-white", pathname === href && "bg-white/10 text-white")}>{label}</Link>
          ))}
        </div>

        <div className="hidden items-center gap-2 md:flex">
          <button onClick={toggleTheme} aria-label="Toggle theme" className="rounded-full border border-white/10 p-3 text-white/75 hover:bg-white/10">
            {theme === "dark" ? <Sun size={17} /> : <Moon size={17} />}
          </button>
          <Link href="/apply" className="flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-ink"><GraduationCap size={16} /> Apply</Link>
          <Link href="/quote" className="flex items-center gap-2 rounded-full bg-aurora px-4 py-2 text-sm font-semibold text-ink"><BriefcaseBusiness size={16} /> Quote</Link>
          {currentUser ? (
            <>
              <button onClick={() => router.push(getRoleHome(currentUser.role))} className="rounded-full border border-white/10 px-4 py-2 text-sm text-white/80"><UserRound size={16} className="mr-2 inline" /> Dashboard</button>
              <button onClick={logout} className="rounded-full border border-white/10 p-3 text-white/75"><LogOut size={16} /></button>
            </>
          ) : (
            <Link href="/auth/login" className="rounded-full border border-white/10 px-4 py-2 text-sm text-white/80">Login</Link>
          )}
        </div>

        <button className="rounded-full border border-white/10 p-3 lg:hidden" onClick={() => setOpen((value) => !value)} aria-label="Open menu"><Menu size={18} /></button>
      </nav>

      {open && (
        <div className="glass mx-auto mt-2 grid max-w-7xl gap-2 rounded-2xl p-4 lg:hidden">
          {links.map(([label, href]) => <Link key={href} href={href} onClick={() => setOpen(false)} className="rounded-xl px-3 py-3 text-white/80">{label}</Link>)}
          <Link href="/apply" className="rounded-xl bg-white px-3 py-3 font-semibold text-ink">Apply for internship</Link>
          <Link href="/quote" className="rounded-xl bg-aurora px-3 py-3 font-semibold text-ink">Request quote</Link>
          <Link href="/auth/login" className="rounded-xl border border-white/10 px-3 py-3">Login</Link>
        </div>
      )}
    </header>
  );
}
