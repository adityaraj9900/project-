"use client";

import { Button } from "@/components/ui/primitives";

export default function ErrorPage({ reset }: { error: Error; reset: () => void }) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[#080808] px-6 text-center">
      <div className="text-8xl font-black text-red-500 opacity-20">!</div>
      <h1 className="mt-4 text-3xl font-black text-[#F5F0E8]">Something went wrong</h1>
      <p className="mt-3 text-[#F5F0E8]/50">An unexpected error occurred.</p>
      <div className="mt-8"><Button variant="gold" onClick={reset}>Try again</Button></div>
    </main>
  );
}
