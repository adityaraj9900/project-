import Link from "next/link";
import { Button } from "@/components/ui/primitives";

export default function Page() {
  return <main className="grid min-h-screen place-items-center px-6 text-center"><div><p className="text-sm uppercase tracking-[0.3em] text-coral">Unauthorized</p><h1 className="mt-4 text-5xl font-black">Role access required.</h1><p className="mt-4 text-white/60">Login with the correct account type to access this dashboard.</p><Link href="/auth/login" className="mt-8 inline-block"><Button>Go to login</Button></Link></div></main>;
}
