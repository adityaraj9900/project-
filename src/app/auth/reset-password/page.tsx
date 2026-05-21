"use client";

import { useState } from "react";
import { Button, Field, inputClass, PremiumCard } from "@/components/ui/primitives";
import { usePlatformStore } from "@/store/platform-store";

export default function Page() {
  const [password, setPassword] = useState("");
  const toast = usePlatformStore((state) => state.toast);
  return <main className="grid min-h-screen place-items-center px-6"><PremiumCard className="w-full max-w-md"><h1 className="text-4xl font-black">Reset password</h1><p className="mt-3 text-white/60">Secure token handling can be connected to your auth provider.</p><div className="mt-6 grid gap-4"><Field label="New password"><input className={inputClass} type="password" value={password} onChange={(e) => setPassword(e.target.value)} /></Field><Button disabled={password.length < 6} onClick={() => toast("Password reset placeholder completed.", "success")}>Reset password</Button></div></PremiumCard></main>;
}
