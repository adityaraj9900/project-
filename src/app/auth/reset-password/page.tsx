"use client";
import { useState } from "react";
import { Section, Reveal, GoldCard, Button, inputClass, Field } from "@/components/ui/primitives";

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [done, setDone] = useState(false);
  return (
    <main className="bg-[#080808] pt-32 pb-24">
      <Section>
        <Reveal>
          <GoldCard className="mx-auto max-w-md p-8">
            <h1 className="text-2xl font-black text-[#F5F0E8]">Reset password</h1>
            {done ? <p className="mt-6 text-emerald-400">Password updated. You can now sign in.</p> : (
              <form onSubmit={(e) => { e.preventDefault(); setDone(true); }} className="mt-6 grid gap-4">
                <Field label="New password"><input type="password" required minLength={6} className={inputClass} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Min 6 characters" /></Field>
                <Button type="submit" variant="gold" disabled={password.length < 6} className="w-full justify-center">Reset password</Button>
              </form>
            )}
          </GoldCard>
        </Reveal>
      </Section>
    </main>
  );
}
