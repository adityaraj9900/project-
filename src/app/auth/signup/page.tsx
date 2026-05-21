import Link from "next/link";
import { SignupForm } from "@/components/forms/platform-forms";
import { PremiumCard } from "@/components/ui/primitives";

export default function Page() {
  return <main className="grid min-h-screen place-items-center px-6 py-20"><PremiumCard className="w-full max-w-md"><p className="text-sm uppercase tracking-[0.25em] text-aurora">Signup</p><h1 className="mt-3 text-4xl font-black">Create your portal.</h1><div className="mt-6"><SignupForm /></div><Link href="/auth/login" className="mt-5 inline-block text-sm text-white/55">Already have an account?</Link></PremiumCard></main>;
}
