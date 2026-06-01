"use client";
import Link from "next/link";
import { Section, Reveal, GoldCard, Button } from "@/components/ui/primitives";

export default function SignupPage() {
  return (
    <main className="bg-[#080808] pt-32 pb-24">
      <Section>
        <Reveal>
          <GoldCard className="mx-auto max-w-md text-center p-10">
            <h1 className="text-2xl font-black text-[#F5F0E8]">Create account</h1>
            <p className="mt-3 text-sm text-[#F5F0E8]/55">Accounts are created by admins when your application is approved.</p>
            <p className="mt-2 text-sm text-[#F5F0E8]/45">Already have one? <Link href="/auth/login" className="text-[#C9A84C] underline">Sign in</Link></p>
            <div className="mt-6"><Link href="/programs"><Button variant="gold" className="w-full justify-center">Apply for a program</Button></Link></div>
          </GoldCard>
        </Reveal>
      </Section>
    </main>
  );
}
