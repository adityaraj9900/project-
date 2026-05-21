"use client";

import { useState } from "react";
import { Button, Field, inputClass, PremiumCard } from "@/components/ui/primitives";
import { usePlatformStore } from "@/store/platform-store";

export default function Page() {
  const [email, setEmail] = useState("");
  const toast = usePlatformStore((state) => state.toast);
  return <main className="grid min-h-screen place-items-center px-6"><PremiumCard className="w-full max-w-md"><h1 className="text-4xl font-black">Forgot password</h1><p className="mt-3 text-white/60">Email reset placeholder with validation-ready UI.</p><div className="mt-6 grid gap-4"><Field label="Email"><input className={inputClass} value={email} onChange={(e) => setEmail(e.target.value)} /></Field><Button onClick={() => toast("Reset link placeholder sent.", "success")}>Send reset link</Button></div></PremiumCard></main>;
}
