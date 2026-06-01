"use client";

import { useEffect, useState } from "react";
import { MessageCircle, X } from "lucide-react";

const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "919876543210";

export function WhatsAppWidget() {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    function onScroll() {
      if (window.scrollY > 300) setVisible(true);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible || dismissed) return null;

  const href = `https://wa.me/${WHATSAPP_NUMBER}?text=Hi%20Orbitix%2C%20I%27d%20like%20to%20know%20more%20about%20your%20services.`;

  return (
    <div className="fixed bottom-6 left-6 z-50 flex flex-col items-start gap-2">
      <div className="flex items-center gap-2">
        <a
          href={href}
          target="_blank"
          rel="noreferrer"
          className="group flex items-center gap-2 rounded-full border border-[#25D366]/30 bg-[#25D366] px-4 py-3 text-sm font-bold text-white shadow-[0_0_24px_rgba(37,211,102,0.3)] transition-all hover:bg-[#1EB854] hover:shadow-[0_0_32px_rgba(37,211,102,0.5)]"
        >
          <span className="relative flex h-3 w-3">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-60" />
            <span className="relative inline-flex h-3 w-3 rounded-full bg-white" />
          </span>
          <MessageCircle size={18} className="fill-white" />
          <span className="hidden sm:inline">Chat on WhatsApp</span>
        </a>
        <button
          onClick={() => setDismissed(true)}
          className="flex h-7 w-7 items-center justify-center rounded-full bg-[#080808]/80 text-white/50 hover:text-white transition-colors border border-white/10"
        >
          <X size={13} />
        </button>
      </div>
    </div>
  );
}
