"use client";
import { useState } from "react";
import { Section, Reveal, GoldCard, Button, inputClass, Field } from "@/components/ui/primitives";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  return (
    <main className="bg-[#080808] pt-32 pb-24">
      <Section>
        <Reveal>
          <GoldCard className="mx-auto max-w-md p-8">
            <h1 className="text-2xl font-black text-[#F5F0E8]">Forgot password</h1>
            <p className="mt-2 text-sm text-[#F5F0E8]/55">Enter your email and we'll send a reset link.</p>
            {sent ? <p className="mt-6 text-emerald-400">Reset link sent — check your inbox.</p> : (
              <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} className="mt-6 grid gap-4">
                <Field label="Email"><input type="email" required className={inputClass} value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" /></Field>
                <Button type="submit" variant="gold" className="w-full justify-center">Send reset link</Button>
              </form>
            )}
          </GoldCard>
        </Reveal>
      </Section>
    </main>
  );
}
