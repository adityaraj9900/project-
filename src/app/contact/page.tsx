"use client";

import { useState } from "react";
import { Section, Reveal, GoldCard, Button, SectionHeader, inputClass, Field } from "@/components/ui/primitives";
import { CheckCircle2, Loader2 } from "lucide-react";

export default function ContactPage() {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", company: "", service: "", budget: "", message: "" });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    await fetch("/api/leads", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
    setLoading(false);
    setSent(true);
  }

  return (
    <main className="bg-[#080808] pt-32 pb-24">
      <div className="pointer-events-none fixed inset-0 -z-10" style={{ backgroundImage: "linear-gradient(rgba(201,168,76,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,0.03) 1px, transparent 1px)", backgroundSize: "48px 48px" }} />
      <Section>
        <Reveal><SectionHeader eyebrow="Contact" title="Let's build something." subtitle="Tell us about your project and we'll get back to you within 24 hours." /></Reveal>
        <div className="grid gap-8 lg:grid-cols-2">
          <Reveal delay={0.05}>
            <GoldCard className="h-full">
              <h2 className="mb-6 text-2xl font-black text-[#F5F0E8]">Send an inquiry</h2>
              {sent ? (
                <div className="flex flex-col items-center gap-4 py-10 text-center">
                  <CheckCircle2 size={48} className="text-emerald-400" />
                  <h3 className="text-xl font-bold text-[#F5F0E8]">Message received!</h3>
                  <p className="text-[#F5F0E8]/55">We'll respond within 24 hours.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="grid gap-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field label="Your name"><input required className={inputClass} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Priya Sharma" /></Field>
                    <Field label="Email"><input required type="email" className={inputClass} value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="you@company.com" /></Field>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field label="Phone"><input className={inputClass} value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="+91 98765 43210" /></Field>
                    <Field label="Company"><input className={inputClass} value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} placeholder="Acme Corp" /></Field>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field label="Service needed">
                      <select className={inputClass} value={form.service} onChange={(e) => setForm({ ...form, service: e.target.value })}>
                        <option value="">Select a service</option>
                        {["Web App Development", "SaaS Development", "AI Integration", "Mobile App", "UI/UX Design", "E-commerce", "Other"].map((s) => <option key={s}>{s}</option>)}
                      </select>
                    </Field>
                    <Field label="Budget range">
                      <select className={inputClass} value={form.budget} onChange={(e) => setForm({ ...form, budget: e.target.value })}>
                        <option value="">Select budget</option>
                        {["Under ₹50K", "₹50K – ₹1L", "₹1L – ₹3L", "₹3L – ₹6L", "₹6L+"].map((b) => <option key={b}>{b}</option>)}
                      </select>
                    </Field>
                  </div>
                  <Field label="Tell us what you need"><textarea required rows={4} className={inputClass + " resize-none"} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder="Describe your project, timeline, and any specific requirements..." /></Field>
                  <Button type="submit" variant="gold" disabled={loading} className="w-full justify-center py-3.5">
                    {loading && <Loader2 size={16} className="animate-spin" />}
                    {loading ? "Sending…" : "Send inquiry"}
                  </Button>
                </form>
              )}
            </GoldCard>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="grid gap-5">
              <GoldCard>
                <h3 className="mb-3 font-bold text-[#F5F0E8]">Studio hours</h3>
                <p className="text-sm text-[#F5F0E8]/55">Monday – Friday: 9am – 7pm IST</p>
                <p className="text-sm text-[#F5F0E8]/55">Response time: Within 24 hours</p>
              </GoldCard>
              <GoldCard>
                <h3 className="mb-3 font-bold text-[#F5F0E8]">Email us directly</h3>
                <p className="text-sm text-[#C9A84C]">admin@orbitix.in</p>
              </GoldCard>
              <GoldCard>
                <h3 className="mb-3 font-bold text-[#F5F0E8]">WhatsApp</h3>
                <a href="https://wa.me/919876543210?text=Hi+Orbitix!+I'd+like+to+know+more+about+your+services." target="_blank" rel="noopener noreferrer" className="text-sm text-emerald-400 hover:underline">Chat on WhatsApp →</a>
              </GoldCard>
              <GoldCard>
                <h3 className="mb-3 font-bold text-[#F5F0E8]">Looking to intern?</h3>
                <p className="text-sm text-[#F5F0E8]/55 mb-3">Internship applications are 100% free. Apply through the programs page.</p>
                <a href="/programs" className="text-sm font-semibold text-[#C9A84C]">View programs →</a>
              </GoldCard>
            </div>
          </Reveal>
        </div>
      </Section>
    </main>
  );
}
