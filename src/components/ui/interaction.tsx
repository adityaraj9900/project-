"use client";

import { Loader2, X } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/primitives";

export function Modal({ title, children, trigger }: { title: string; children: React.ReactNode; trigger: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button onClick={() => setOpen(true)}>{trigger}</button>
      {open && (
        <div className="fixed inset-0 z-[70] grid place-items-center bg-black/65 p-4 backdrop-blur-sm">
          <div className="glass w-full max-w-lg rounded-3xl p-6">
            <div className="mb-5 flex items-center justify-between"><h2 className="text-2xl font-bold">{title}</h2><button onClick={() => setOpen(false)}><X /></button></div>
            {children}
          </div>
        </div>
      )}
    </>
  );
}

export function Drawer({ title, children, trigger }: { title: string; children: React.ReactNode; trigger: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button onClick={() => setOpen(true)}>{trigger}</button>
      {open && (
        <div className="fixed inset-0 z-[70] bg-black/60 backdrop-blur-sm">
          <aside className="glass ml-auto h-full w-full max-w-md overflow-y-auto p-6">
            <div className="mb-5 flex items-center justify-between"><h2 className="text-2xl font-bold">{title}</h2><button onClick={() => setOpen(false)}><X /></button></div>
            {children}
          </aside>
        </div>
      )}
    </>
  );
}

export function Skeleton({ className }: { className?: string }) {
  return <div className={cn("animate-pulse rounded-2xl bg-white/10", className)} />;
}

export function EmptyState({ title, body, action }: { title: string; body: string; action?: React.ReactNode }) {
  return <div className="rounded-3xl border border-dashed border-white/15 p-10 text-center"><h3 className="text-2xl font-bold">{title}</h3><p className="mx-auto mt-2 max-w-md text-white/55">{body}</p>{action && <div className="mt-6">{action}</div>}</div>;
}

export function Loader() {
  return <div className="grid min-h-52 place-items-center"><Loader2 className="animate-spin text-aurora" size={34} /></div>;
}

export function ConfirmDialog({ label, onConfirm }: { label: string; onConfirm: () => void }) {
  return <Modal title="Confirm action" trigger={<span className="rounded-full bg-coral px-4 py-2 text-sm font-semibold text-white">{label}</span>}><p className="text-white/60">This action changes the current record state.</p><Button className="mt-5 bg-coral text-white" onClick={onConfirm}>Confirm</Button></Modal>;
}

export function Tabs({ tabs }: { tabs: { label: string; content: React.ReactNode }[] }) {
  const [active, setActive] = useState(0);
  return (
    <div>
      <div className="flex flex-wrap gap-2 rounded-2xl bg-white/8 p-2">
        {tabs.map((tab, index) => <button key={tab.label} onClick={() => setActive(index)} className={cn("rounded-xl px-4 py-2 text-sm", active === index ? "bg-aurora text-ink" : "text-white/60")}>{tab.label}</button>)}
      </div>
      <div className="mt-5">{tabs[active]?.content}</div>
    </div>
  );
}
