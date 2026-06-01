"use client";
import { SimpleMarketingPage } from "@/components/sections/public-sections";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";

const FAQS = [
  { q: "Are internships paid?", a: "Internships at Orbitix are 100% free. No fees, no certificate charges, no hidden costs. Ever." },
  { q: "Do interns work on client projects?", a: "Selected interns contribute to scoped internal or client-style modules under mentor and admin review." },
  { q: "How long are the programs?", a: "Full-Stack: 12 weeks. AI Automation: 10 weeks. UI/UX: 8 weeks." },
  { q: "Will I get a certificate?", a: "Yes. After completing all tasks and mentor review, you receive a verifiable digital certificate at no cost." },
  { q: "Can clients track project progress?", a: "Yes. Clients get a dedicated portal with timeline, milestones, invoice downloads, messages, and file sharing." },
  { q: "How are agency projects priced?", a: "Every project is scoped individually. We provide a fixed-price proposal with milestone-based payments after a free discovery call." },
  { q: "What payment methods do you accept?", a: "UPI, bank transfer, and Razorpay (credit/debit card, net banking) for client projects only." },
  { q: "How do I verify a certificate?", a: "Visit /verify and enter the certificate number. Each certificate has a unique QR code for instant verification." },
];

export default function FaqPage() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <SimpleMarketingPage eyebrow="FAQ" title="Everything important, answered.">
      <div className="mx-auto max-w-2xl grid gap-3">
        {FAQS.map((f, i) => (
          <button key={i} onClick={() => setOpen(open === i ? null : i)} className="w-full rounded-2xl border border-[rgba(201,168,76,0.12)] bg-[#0F0F0F] p-5 text-left transition hover:border-[rgba(201,168,76,0.25)]">
            <div className="flex items-center justify-between gap-4">
              <span className="font-semibold text-[#F5F0E8]/90">{f.q}</span>
              <ChevronDown size={16} className={cn("shrink-0 text-[#C9A84C] transition-transform", open === i && "rotate-180")} />
            </div>
            <AnimatePresence initial={false}>
              {open === i && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }} className="overflow-hidden">
                  <p className="mt-4 text-sm text-[#F5F0E8]/55 leading-relaxed">{f.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        ))}
      </div>
    </SimpleMarketingPage>
  );
}
