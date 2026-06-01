"use client";

import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";

/* ─── Layout ────────────────────────────────────────────────── */

export function Section({
  children,
  className,
  id,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className={cn("mx-auto max-w-7xl px-6 py-20", className)}>
      {children}
    </section>
  );
}

export function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─── GoldCard ──────────────────────────────────────────────── */

export function GoldCard({
  children,
  className,
  id,
  hover = true,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
  hover?: boolean;
}) {
  return (
    <div
      id={id}
      className={cn(
        "relative rounded-2xl border border-[rgba(201,168,76,0.15)] bg-[#0F0F0F] p-6 transition-all duration-300",
        hover && [
          "hover:-translate-y-1",
          "hover:border-[rgba(201,168,76,0.35)]",
          "hover:shadow-[0_0_40px_rgba(201,168,76,0.12)]",
        ],
        className
      )}
    >
      {children}
    </div>
  );
}

/* ─── Button ────────────────────────────────────────────────── */

type ButtonVariant = "gold" | "outline" | "ghost";

export function Button({
  children,
  className,
  type = "button",
  onClick,
  disabled,
  variant = "gold",
  size = "md",
}: {
  children: React.ReactNode;
  className?: string;
  type?: "button" | "submit";
  onClick?: () => void;
  disabled?: boolean;
  variant?: ButtonVariant;
  size?: "sm" | "md" | "lg";
}) {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-50",
        size === "sm" && "px-4 py-2 text-xs",
        size === "md" && "px-5 py-3 text-sm",
        size === "lg" && "px-7 py-4 text-base",
        variant === "gold" && [
          "bg-[#C9A84C] text-[#080808]",
          "hover:bg-[#E8C97A] hover:scale-[1.02]",
          "shadow-[0_0_20px_rgba(201,168,76,0.25)]",
        ],
        variant === "outline" && [
          "border border-[rgba(201,168,76,0.4)] text-[#C9A84C] bg-transparent",
          "hover:border-[rgba(201,168,76,0.7)] hover:bg-[rgba(201,168,76,0.06)]",
        ],
        variant === "ghost" && [
          "text-[#F5F0E8]/70 bg-transparent",
          "hover:bg-[rgba(255,255,255,0.06)] hover:text-[#F5F0E8]",
        ],
        className
      )}
    >
      {children}
    </button>
  );
}

/* ─── Badge ─────────────────────────────────────────────────── */

type BadgeTone = "gold" | "success" | "warning" | "danger" | "info" | "default";

export function Badge({
  children,
  tone = "gold",
  className,
}: {
  children: React.ReactNode;
  tone?: BadgeTone;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em]",
        tone === "gold" && "border-[rgba(201,168,76,0.35)] bg-[rgba(201,168,76,0.08)] text-[#C9A84C]",
        tone === "success" && "border-emerald-500/30 bg-emerald-500/10 text-emerald-400",
        tone === "warning" && "border-amber-400/30 bg-amber-400/10 text-amber-400",
        tone === "danger" && "border-red-500/30 bg-red-500/10 text-red-400",
        tone === "info" && "border-sky-400/30 bg-sky-400/10 text-sky-400",
        tone === "default" && "border-white/10 bg-white/5 text-white/60",
        className
      )}
    >
      {children}
    </span>
  );
}

/* ─── GoldDivider ───────────────────────────────────────────── */

export function GoldDivider({ className }: { className?: string }) {
  return (
    <div className={cn("relative flex items-center", className)}>
      <div className="h-px flex-1 bg-[rgba(201,168,76,0.15)]" />
      <div className="mx-4 h-2 w-2 rotate-45 border border-[#C9A84C] bg-[#C9A84C]" />
      <div className="h-px flex-1 bg-[rgba(201,168,76,0.15)]" />
    </div>
  );
}

/* ─── StatCard ──────────────────────────────────────────────── */

export function StatCard({
  value,
  label,
  suffix,
  className,
}: {
  value: string | number;
  label: string;
  suffix?: string;
  className?: string;
}) {
  return (
    <GoldCard className={cn("text-center", className)}>
      <div className="text-4xl font-black text-[#C9A84C]">
        {value}
        {suffix && <span className="text-2xl">{suffix}</span>}
      </div>
      <div className="mt-1 text-sm text-[#F5F0E8]/55">{label}</div>
    </GoldCard>
  );
}

/* ─── Tabs ──────────────────────────────────────────────────── */

export function Tabs({
  tabs,
  active,
  onChange,
  className,
}: {
  tabs: { key: string; label: string }[];
  active: string;
  onChange: (key: string) => void;
  className?: string;
}) {
  return (
    <div className={cn("flex gap-1 border-b border-[rgba(201,168,76,0.12)]", className)}>
      {tabs.map((tab) => (
        <button
          key={tab.key}
          onClick={() => onChange(tab.key)}
          className={cn(
            "relative px-5 py-3 text-sm font-medium transition-colors duration-200",
            active === tab.key
              ? "text-[#C9A84C]"
              : "text-[#F5F0E8]/45 hover:text-[#F5F0E8]/75"
          )}
        >
          {tab.label}
          {active === tab.key && (
            <motion.div
              layoutId="tab-indicator"
              className="absolute inset-x-0 bottom-0 h-0.5 bg-[#C9A84C]"
            />
          )}
        </button>
      ))}
    </div>
  );
}

/* ─── ProgressBar ───────────────────────────────────────────── */

export function ProgressBar({
  value,
  className,
}: {
  value: number;
  className?: string;
}) {
  return (
    <div className={cn("h-2 overflow-hidden rounded-full bg-white/8", className)}>
      <div
        className="h-full rounded-full bg-gradient-to-r from-[#8A6F2E] via-[#C9A84C] to-[#E8C97A] transition-all duration-500"
        style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
      />
    </div>
  );
}

/* ─── SearchBar ─────────────────────────────────────────────── */

export function SearchBar({
  value,
  onChange,
  placeholder = "Search…",
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-[rgba(201,168,76,0.15)] bg-[#0F0F0F] px-4 py-3 focus-within:border-[rgba(201,168,76,0.4)] transition-colors">
      <Search size={16} className="shrink-0 text-[#F5F0E8]/35" />
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="min-w-0 flex-1 bg-transparent text-sm text-[#F5F0E8] outline-none placeholder:text-[#F5F0E8]/30"
      />
    </div>
  );
}

/* ─── Form primitives ───────────────────────────────────────── */

export function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="grid gap-2 text-sm">
      <span className="text-[#F5F0E8]/60">{label}</span>
      {children}
      {error && <span className="text-xs text-red-400">{error}</span>}
    </label>
  );
}

export const inputClass =
  "w-full rounded-xl border border-[rgba(201,168,76,0.15)] bg-[#0F0F0F] px-4 py-3 text-[#F5F0E8] outline-none transition placeholder:text-[#F5F0E8]/30 focus:border-[rgba(201,168,76,0.5)] focus:shadow-[0_0_0_2px_rgba(201,168,76,0.08)]";

/* ─── StatusBadge ───────────────────────────────────────────── */

export function StatusBadge({ status }: { status: string }) {
  const toneMap: Record<string, BadgeTone> = {
    approved: "success",
    completed: "success",
    paid: "success",
    Won: "success",
    active: "success",
    rejected: "danger",
    revoked: "danger",
    Lost: "danger",
    pending: "warning",
    review: "warning",
    draft: "default",
    "revision needed": "warning",
  };
  const tone = toneMap[status.toLowerCase()] ?? toneMap[status] ?? "default";
  return <Badge tone={tone}>{status}</Badge>;
}

/* ─── SectionHeader ─────────────────────────────────────────── */

export function SectionHeader({
  eyebrow,
  title,
  subtitle,
  center = false,
  className,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  center?: boolean;
  className?: string;
}) {
  return (
    <div className={cn("mb-14", center && "text-center", className)}>
      {eyebrow && (
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[rgba(201,168,76,0.25)] bg-[rgba(201,168,76,0.06)] px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-[#C9A84C]">
          {eyebrow}
        </div>
      )}
      <h2 className="text-4xl font-black text-[#F5F0E8] lg:text-5xl">{title}</h2>
      {subtitle && (
        <p className="mt-4 max-w-2xl text-base text-[#F5F0E8]/55 lg:text-lg">
          {subtitle}
        </p>
      )}
    </div>
  );
}

/* ─── Skeleton ──────────────────────────────────────────────── */

export function Skeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-xl bg-[rgba(201,168,76,0.06)]",
        className
      )}
    />
  );
}

export function SkeletonCard() {
  return (
    <GoldCard hover={false}>
      <Skeleton className="mb-3 h-4 w-1/3" />
      <Skeleton className="mb-2 h-6 w-2/3" />
      <Skeleton className="h-3 w-full" />
      <Skeleton className="mt-1 h-3 w-4/5" />
    </GoldCard>
  );
}
