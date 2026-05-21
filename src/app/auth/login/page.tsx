import Link from "next/link";
import { LoginForm } from "@/components/forms/platform-forms";
import { PremiumCard } from "@/components/ui/primitives";

export default function Page() {
  return <main className="grid min-h-screen place-items-center px-6 py-20"><PremiumCard className="w-full max-w-md"><p className="text-sm uppercase tracking-[0.25em] text-aurora">Secure login</p><h1 className="mt-3 text-4xl font-black">Enter mission control.</h1><div className="mt-6"><LoginForm /></div><div className="mt-5 flex justify-between text-sm text-white/55"><Link href="/auth/signup">Create account</Link><Link href="/auth/forgot-password">Forgot password</Link></div></PremiumCard></main>;
}
