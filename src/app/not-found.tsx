import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-screen max-w-3xl flex-col items-center justify-center px-6 text-center">
      <p className="text-sm uppercase tracking-[0.35em] text-aurora">404</p>
      <h1 className="mt-4 text-5xl font-semibold">This orbit is uncharted.</h1>
      <p className="mt-4 text-white/65">The page does not exist, but the platform navigation can bring you back into mission control.</p>
      <Link href="/" className="mt-8 rounded-full bg-aurora px-6 py-3 font-semibold text-ink">Return home</Link>
    </main>
  );
}
