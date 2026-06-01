"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { Button, GoldCard, inputClass } from "@/components/ui/primitives";

const ROLE_HOMES: Record<string, string> = {
  "super-admin": "/admin",
  student: "/student",
  client: "/client",
  mentor: "/mentor",
};

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const result = await signIn("credentials", { email, password, redirect: false });

    if (result?.error) {
      setError("Invalid email or password.");
      setLoading(false);
      return;
    }

    const res = await fetch("/api/auth/session");
    const session = await res.json();
    const role = session?.user?.role;
    router.push(ROLE_HOMES[role] ?? "/");
    router.refresh();
  }

  const demos = [
    { label: "Admin", email: "admin@orbitix.in", password: "admin123" },
    { label: "Student", email: "student@orbitix.in", password: "student123" },
    { label: "Client", email: "client@orbitix.in", password: "client123" },
    { label: "Mentor", email: "mentor@orbitix.in", password: "mentor123" },
  ];

  return (
    <div className="relative flex min-h-screen items-center justify-center px-4">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(201,168,76,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,0.04) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />
      <div className="pointer-events-none absolute left-1/2 top-1/3 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[rgba(201,168,76,0.06)] blur-[120px]" />

      <div className="relative w-full max-w-md">
        <div className="mb-8 text-center">
          <Link href="/" className="inline-flex flex-col items-center gap-2">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-[rgba(201,168,76,0.35)] bg-[rgba(201,168,76,0.08)] text-3xl font-black text-[#C9A84C] shadow-[0_0_30px_rgba(201,168,76,0.15)]">
              O
            </div>
            <div className="text-base font-black tracking-widest text-[#F5F0E8]">ORBITIX</div>
            <div className="text-xs uppercase tracking-[0.22em] text-[#C9A84C]/70">IT Solutions</div>
          </Link>
        </div>

        <GoldCard className="p-8">
          <h1 className="mb-1 text-2xl font-black text-[#F5F0E8]">Welcome back</h1>
          <p className="mb-8 text-sm text-[#F5F0E8]/45">Sign in to your Orbitix account.</p>

          <form onSubmit={handleSubmit} className="grid gap-5">
            <label className="grid gap-2 text-sm">
              <span className="text-[#F5F0E8]/60">Email</span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                className={inputClass}
              />
            </label>

            <label className="grid gap-2 text-sm">
              <span className="text-[#F5F0E8]/60">Password</span>
              <div className="relative">
                <input
                  type={showPass ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className={inputClass + " pr-11"}
                />
                <button
                  type="button"
                  onClick={() => setShowPass((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#F5F0E8]/40 hover:text-[#F5F0E8]/75 transition-colors"
                >
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </label>

            {error && (
              <div className="rounded-xl border border-red-500/25 bg-red-500/8 px-4 py-3 text-sm text-red-400">
                {error}
              </div>
            )}

            <Button type="submit" variant="gold" disabled={loading} className="w-full justify-center py-3.5">
              {loading && <Loader2 size={16} className="animate-spin" />}
              {loading ? "Signing in…" : "Sign in"}
            </Button>
          </form>

          <div className="mt-6 border-t border-[rgba(201,168,76,0.1)] pt-6">
            <p className="mb-3 text-center text-xs text-[#F5F0E8]/35">Demo accounts (click to fill)</p>
            <div className="grid grid-cols-2 gap-2">
              {demos.map((d) => (
                <button
                  key={d.label}
                  type="button"
                  onClick={() => { setEmail(d.email); setPassword(d.password); }}
                  className="rounded-lg border border-[rgba(201,168,76,0.12)] bg-[rgba(201,168,76,0.04)] px-3 py-2 text-left transition hover:border-[rgba(201,168,76,0.3)]"
                >
                  <div className="text-xs font-semibold text-[#C9A84C]">{d.label}</div>
                  <div className="text-[10px] text-[#F5F0E8]/35">{d.email}</div>
                </button>
              ))}
            </div>
          </div>
        </GoldCard>

        <p className="mt-6 text-center text-xs text-[#F5F0E8]/30">
          <Link href="/" className="hover:text-[#C9A84C] transition-colors">← Back to site</Link>
        </p>
      </div>
    </div>
  );
}
