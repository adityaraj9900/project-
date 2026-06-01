import Link from "next/link";
import { Button } from "@/components/ui/primitives";

export default function UnauthorizedPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[#080808] px-6 text-center">
      <div className="text-7xl font-black text-red-500 opacity-20">403</div>
      <h1 className="mt-4 text-3xl font-black text-[#F5F0E8]">Access denied</h1>
      <p className="mt-3 text-[#F5F0E8]/50">You don't have permission to view this page.</p>
      <div className="mt-8 flex gap-4">
        <Link href="/"><Button variant="ghost">Home</Button></Link>
        <Link href="/auth/login"><Button variant="gold">Sign in</Button></Link>
      </div>
    </main>
  );
}
