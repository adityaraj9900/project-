"use client";

import { useState, useRef, useEffect } from "react";
import { MessageSquare, X, Send, Sparkles, RotateCcw } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const QUICK_REPLIES = [
  "What services do you offer?",
  "Are internships really free?",
  "How do I apply for a program?",
  "What's the timeline for a project?",
];

const INITIAL_MESSAGE: Message = {
  role: "assistant",
  content: "Hey! I'm Orbit, your ORBITIX assistant 👋 I can help with our services, internship programs, timelines, and pricing. What would you like to know?",
};

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  async function send(text?: string) {
    const content = text ?? input.trim();
    if (!content || loading) return;
    setInput("");

    const next: Message[] = [...messages, { role: "user", content }];
    setMessages(next);
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next }),
      });

      if (!res.ok) throw new Error("API error");
      const reader = res.body?.getReader();
      if (!reader) throw new Error("No reader");

      let accumulated = "";
      setMessages([...next, { role: "assistant", content: "" }]);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = new TextDecoder().decode(value);
        accumulated += chunk;
        setMessages([...next, { role: "assistant", content: accumulated }]);
      }
    } catch {
      setMessages([...next, { role: "assistant", content: "Sorry, I'm having trouble connecting. Please try again or email us at admin@orbitix.in" }]);
    } finally {
      setLoading(false);
    }
  }

  function reset() {
    setMessages([INITIAL_MESSAGE]);
    setInput("");
  }

  return (
    <>
      {/* Trigger button */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#C9A84C] shadow-[0_0_28px_rgba(201,168,76,0.4)] transition-all hover:bg-[#E8C97A] hover:shadow-[0_0_36px_rgba(201,168,76,0.6)]"
      >
        {open ? <X size={22} className="text-[#080808]" /> : <MessageSquare size={22} className="text-[#080808]" />}
        {!open && <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4"><span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#C9A84C] opacity-50" /><span className="relative inline-flex h-4 w-4 items-center justify-center rounded-full bg-emerald-400 text-[8px] font-black text-[#080808]">1</span></span>}
      </button>

      {/* Chat window */}
      {open && (
        <div className="fixed bottom-24 right-6 z-50 flex h-[520px] w-[360px] max-w-[calc(100vw-48px)] flex-col overflow-hidden rounded-2xl border border-[rgba(201,168,76,0.2)] bg-[#0D0D0D] shadow-2xl shadow-black/60">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-[rgba(201,168,76,0.1)] bg-[rgba(201,168,76,0.06)] px-4 py-3">
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-full border border-[rgba(201,168,76,0.35)] bg-[rgba(201,168,76,0.1)]">
                <Sparkles size={15} className="text-[#C9A84C]" />
              </div>
              <div>
                <p className="text-sm font-black text-[#F5F0E8]">Orbit</p>
                <p className="text-[10px] text-emerald-400">● Online</p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button onClick={reset} className="rounded-lg p-1.5 text-[#F5F0E8]/30 hover:text-[#F5F0E8]/70 transition-colors"><RotateCcw size={13} /></button>
              <button onClick={() => setOpen(false)} className="rounded-lg p-1.5 text-[#F5F0E8]/30 hover:text-[#F5F0E8]/70 transition-colors"><X size={15} /></button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[80%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                  m.role === "user"
                    ? "bg-[#C9A84C] text-[#080808] font-medium"
                    : "border border-[rgba(201,168,76,0.12)] bg-[rgba(201,168,76,0.04)] text-[#F5F0E8]/85"
                }`}>
                  {m.content || (loading && i === messages.length - 1 ? <span className="animate-pulse">●●●</span> : "")}
                </div>
              </div>
            ))}
            {loading && messages[messages.length - 1]?.role === "user" && (
              <div className="flex justify-start">
                <div className="rounded-2xl border border-[rgba(201,168,76,0.12)] bg-[rgba(201,168,76,0.04)] px-4 py-2.5 text-sm text-[#F5F0E8]/50">
                  <span className="animate-pulse">●●●</span>
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Quick replies */}
          {messages.length === 1 && (
            <div className="border-t border-[rgba(201,168,76,0.08)] px-3 py-2">
              <div className="flex flex-wrap gap-1.5">
                {QUICK_REPLIES.map((q) => (
                  <button
                    key={q}
                    onClick={() => send(q)}
                    className="rounded-full border border-[rgba(201,168,76,0.2)] bg-[rgba(201,168,76,0.05)] px-3 py-1 text-[10px] font-semibold text-[#C9A84C] transition-all hover:bg-[rgba(201,168,76,0.12)]"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <div className="border-t border-[rgba(201,168,76,0.1)] p-3">
            <div className="flex gap-2">
              <input
                className="flex-1 rounded-xl border border-[rgba(201,168,76,0.15)] bg-[rgba(201,168,76,0.04)] px-4 py-2.5 text-sm text-[#F5F0E8] placeholder-[#F5F0E8]/20 focus:outline-none focus:border-[rgba(201,168,76,0.4)]"
                placeholder="Ask Orbit anything..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && send()}
              />
              <button
                onClick={() => send()}
                disabled={!input.trim() || loading}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#C9A84C] text-[#080808] transition-all hover:bg-[#E8C97A] disabled:opacity-40"
              >
                <Send size={15} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
