"use client";

import { MailCheck } from "lucide-react";
import { Button, PremiumCard } from "@/components/ui/primitives";
import { usePlatformStore } from "@/store/platform-store";

export default function Page() {
  const toast = usePlatformStore((state) => state.toast);
  return <main className="grid min-h-screen place-items-center px-6"><PremiumCard className="w-full max-w-md text-center"><MailCheck className="mx-auto text-aurora" size={52} /><h1 className="mt-4 text-4xl font-black">Email verification</h1><p className="mt-3 text-white/60">Placeholder for provider-backed verification links and resend handling.</p><Button className="mt-6" onClick={() => toast("Verification email placeholder resent.", "success")}>Resend email</Button></PremiumCard></main>;
}
