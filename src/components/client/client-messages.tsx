"use client";

import { useState } from "react";
import { MessageSquare, Send, Phone, Mail } from "lucide-react";
import { GoldCard } from "@/components/ui/primitives";

export function ClientMessages() {
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  async function send() {
    if (!message.trim()) return;
    setSent(true);
    setMessage("");
    setTimeout(() => setSent(false), 3000);
  }

  return (
    <div className="space-y-6">
      <GoldCard>
        <h3 className="mb-4 flex items-center gap-2 font-black text-[#F5F0E8]">
          <MessageSquare size={16} className="text-[#C9A84C]" /> Send a Message
        </h3>
        <p className="mb-4 text-sm text-[#F5F0E8]/45">
          Need an update, have a question, or want to share feedback? Send us a message and we'll respond within 24 hours.
        </p>
        <textarea
          rows={5}
          className="w-full resize-none rounded-xl border border-[rgba(201,168,76,0.15)] bg-[rgba(201,168,76,0.04)] px-4 py-3 text-sm text-[#F5F0E8] placeholder-[#F5F0E8]/20 focus:outline-none focus:border-[rgba(201,168,76,0.4)]"
          placeholder="Your message to the Orbitix team..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        {sent && (
          <p className="mt-2 text-xs text-emerald-400">Message sent! We'll be in touch shortly.</p>
        )}
        <button
          onClick={send}
          disabled={!message.trim() || sent}
          className="mt-4 flex items-center gap-2 rounded-xl bg-[#C9A84C] px-5 py-2.5 text-sm font-bold text-[#080808] transition-all hover:bg-[#E8C97A] disabled:opacity-50"
        >
          <Send size={14} /> Send Message
        </button>
      </GoldCard>

      {/* Contact options */}
      <GoldCard hover={false}>
        <h3 className="mb-4 font-black text-[#F5F0E8]">Direct Contact</h3>
        <div className="space-y-3">
          <a
            href="mailto:admin@orbitix.in"
            className="flex items-center gap-3 rounded-xl border border-[rgba(201,168,76,0.1)] px-4 py-3 text-sm text-[#F5F0E8]/70 transition-colors hover:border-[rgba(201,168,76,0.25)] hover:text-[#C9A84C]"
          >
            <Mail size={15} className="text-[#C9A84C]" />
            admin@orbitix.in
          </a>
          <a
            href="https://wa.me/919876543210"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-3 rounded-xl border border-[rgba(201,168,76,0.1)] px-4 py-3 text-sm text-[#F5F0E8]/70 transition-colors hover:border-[rgba(201,168,76,0.25)] hover:text-[#C9A84C]"
          >
            <Phone size={15} className="text-[#C9A84C]" />
            WhatsApp: +91 98765 43210
          </a>
        </div>
      </GoldCard>
    </div>
  );
}
