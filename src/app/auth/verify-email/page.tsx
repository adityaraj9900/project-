"use client";
import { Section, Reveal, GoldCard, Button } from "@/components/ui/primitives";
import { MailCheck } from "lucide-react";

export default function VerifyEmailPage() {
  return (
    <main className="bg-[#080808] pt-32 pb-24">
      <Section>
        <Reveal>
          <GoldCard className="mx-auto max-w-md p-10 text-center">
            <MailCheck size={52} className="mx-auto text-[#C9A84C]" />
            <h1 className="mt-4 text-2xl font-black text-[#F5F0E8]">Check your email</h1>
            <p className="mt-3 text-sm text-[#F5F0E8]/55">A verification link has been sent. Click it to activate your account.</p>
            <div className="mt-6"><Button variant="outline" className="w-full justify-center">Resend email</Button></div>
          </GoldCard>
        </Reveal>
      </Section>
    </main>
  );
}
