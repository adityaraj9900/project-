"use client";

import { X } from "lucide-react";
import { useEffect } from "react";
import { usePlatformStore } from "@/store/platform-store";
import { cn } from "@/lib/utils";

export function Toasts() {
  const { toasts, dismissToast } = usePlatformStore();

  useEffect(() => {
    const timers = toasts.map((toast) => setTimeout(() => dismissToast(toast.id), 4200));
    return () => timers.forEach(clearTimeout);
  }, [toasts, dismissToast]);

  return (
    <div className="fixed bottom-4 right-4 z-[80] grid w-[min(92vw,380px)] gap-3">
      {toasts.map((toast) => (
        <div key={toast.id} className={cn("glass flex items-start justify-between gap-3 rounded-2xl p-4 text-sm", toast.type === "success" && "border-aurora/40", toast.type === "error" && "border-coral/40")}>
          <p>{toast.message}</p>
          <button onClick={() => dismissToast(toast.id)} aria-label="Dismiss"><X size={16} /></button>
        </div>
      ))}
    </div>
  );
}
