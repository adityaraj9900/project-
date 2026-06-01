"use client";

import { X } from "lucide-react";
import { useEffect } from "react";
import { usePlatformStore } from "@/store/platform-store";
import { cn } from "@/lib/utils";

export function Toasts() {
  const { toasts, dismissToast } = usePlatformStore();

  useEffect(() => {
    const timers = toasts.map((toast) =>
      setTimeout(() => dismissToast(toast.id), 4200)
    );
    return () => timers.forEach(clearTimeout);
  }, [toasts, dismissToast]);

  return (
    <div className="fixed bottom-4 right-4 z-[80] grid w-[min(92vw,380px)] gap-3">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={cn(
            "flex items-start justify-between gap-3 rounded-2xl border bg-[#0F0F0F] p-4 text-sm shadow-[0_8px_40px_rgba(0,0,0,0.6)] transition-all",
            toast.type === "success" && "border-emerald-500/40 text-emerald-300",
            toast.type === "error" && "border-red-500/40 text-red-300",
            toast.type === "info" && "border-[rgba(201,168,76,0.4)] text-[#C9A84C]",
            !toast.type && "border-[rgba(201,168,76,0.2)] text-[#F5F0E8]/80"
          )}
        >
          <p className="leading-snug">{toast.message}</p>
          <button
            onClick={() => dismissToast(toast.id)}
            aria-label="Dismiss"
            className="shrink-0 text-[#F5F0E8]/40 hover:text-[#F5F0E8]/80 transition-colors"
          >
            <X size={15} />
          </button>
        </div>
      ))}
    </div>
  );
}
