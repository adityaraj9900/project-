import Link from "next/link";
import { Button } from "@/components/ui/primitives";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[#080808] px-6 text-center">
      <div className="text-8xl font-black text-[#C9A84C] opacity-20">404</div>
      <h1 className="mt-4 text-3xl font-black text-[#F5F0E8]">Page not found</h1>
      <p className="mt-3 text-[#F5F0E8]/50">This page doesn't exist or was moved.</p>
      <div className="mt-8"><Link href="/"><Button variant="gold">Return home</Button></Link></div>
    </main>
  );
}
