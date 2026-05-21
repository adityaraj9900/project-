"use client";

export default function ErrorPage({ reset }: { error: Error; reset: () => void }) {
  return (
    <main className="mx-auto flex min-h-screen max-w-3xl flex-col items-center justify-center px-6 text-center">
      <p className="text-sm uppercase tracking-[0.35em] text-coral">Error boundary</p>
      <h1 className="mt-4 text-5xl font-semibold">Something misfired.</h1>
      <p className="mt-4 text-white/65">The app caught the issue safely. You can retry the current flow.</p>
      <button onClick={reset} className="mt-8 rounded-full bg-white px-6 py-3 font-semibold text-ink">Retry</button>
    </main>
  );
}
