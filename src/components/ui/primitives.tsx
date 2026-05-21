"use client";

import { motion } from "framer-motion";
import { Search, SlidersHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";

export function Section({ children, className, id }: { children: React.ReactNode; className?: string; id?: string }) {
  return <section id={id} className={cn("mx-auto max-w-7xl px-6 py-20", className)}>{children}</section>;
}

export function Reveal({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div initial={{ opacity: 0, y: 26 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.6 }} className={className}>
      {children}
    </motion.div>
  );
}

export function Badge({ children, tone = "default" }: { children: React.ReactNode; tone?: "default" | "success" | "warning" | "danger" }) {
  return (
    <span className={cn(
      "inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em]",
      tone === "default" && "border-white/10 bg-white/8 text-white/70",
      tone === "success" && "border-aurora/30 bg-aurora/10 text-aurora",
      tone === "warning" && "border-solar/30 bg-solar/10 text-solar",
      tone === "danger" && "border-coral/30 bg-coral/10 text-coral"
    )}>{children}</span>
  );
}

export function PremiumCard({ children, className, id }: { children: React.ReactNode; className?: string; id?: string }) {
  return <div id={id} className={cn("glass rounded-3xl p-6 transition duration-300 hover:-translate-y-1 hover:border-aurora/35 hover:shadow-glow", className)}>{children}</div>;
}

export function Button({ children, className, type = "button", onClick, disabled }: { children: React.ReactNode; className?: string; type?: "button" | "submit"; onClick?: () => void; disabled?: boolean }) {
  return <button type={type} disabled={disabled} onClick={onClick} className={cn("inline-flex items-center justify-center gap-2 rounded-full bg-aurora px-5 py-3 text-sm font-bold text-ink transition hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-50", className)}>{children}</button>;
}

export function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <label className="grid gap-2 text-sm">
      <span className="text-white/70">{label}</span>
      {children}
      {error && <span className="text-xs text-coral">{error}</span>}
    </label>
  );
}

export const inputClass = "w-full rounded-2xl border border-white/10 bg-white/8 px-4 py-3 text-white outline-none transition placeholder:text-white/35 focus:border-aurora/60";

export function SearchBar({ value, onChange, placeholder = "Search records" }: { value: string; onChange: (value: string) => void; placeholder?: string }) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/8 px-4 py-3">
      <Search size={18} className="text-white/45" />
      <input value={value} onChange={(event) => onChange(event.target.value)} placeholder={placeholder} className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-white/35" />
      <SlidersHorizontal size={18} className="text-white/35" />
    </div>
  );
}

export function ProgressBar({ value }: { value: number }) {
  return (
    <div className="h-2 overflow-hidden rounded-full bg-white/10">
      <div className="h-full rounded-full bg-gradient-to-r from-aurora via-solar to-plasma transition-all" style={{ width: `${Math.min(100, Math.max(0, value))}%` }} />
    </div>
  );
}

export function StatusBadge({ status }: { status: string }) {
  const tone = status === "approved" || status === "completed" || status === "paid" || status === "Won" ? "success" : status === "rejected" || status === "revoked" || status === "Lost" ? "danger" : "warning";
  return <Badge tone={tone as "success" | "danger" | "warning"}>{status}</Badge>;
}
