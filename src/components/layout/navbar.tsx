"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/primitives";

const links: [string, string][] = [
  ["Services", "/services"],
  ["Programs", "/programs"],
  ["Portfolio", "/portfolio"],
  ["Blog", "/blog"],
  ["About", "/about"],
  ["Contact", "/contact"],
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 py-4">
      <nav
        className={cn(
          "mx-auto flex max-w-7xl items-center justify-between rounded-2xl px-5 py-3 transition-all duration-300",
          scrolled
            ? "border border-[rgba(201,168,76,0.2)] bg-[rgba(8,8,8,0.92)] shadow-[0_0_40px_rgba(0,0,0,0.6)] backdrop-blur-xl"
            : "border border-[rgba(201,168,76,0.1)] bg-[rgba(8,8,8,0.6)] backdrop-blur-md"
        )}
      >
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[rgba(201,168,76,0.35)] bg-[rgba(201,168,76,0.08)] text-xl font-black text-[#C9A84C] shadow-[0_0_20px_rgba(201,168,76,0.15)]">
            O
          </div>
          <div>
            <div className="text-sm font-black tracking-widest text-[#F5F0E8]">ORBITIX</div>
            <div className="text-[10px] uppercase tracking-[0.24em] text-[#C9A84C]/70">IT Solutions</div>
          </div>
        </Link>

        {/* Desktop links */}
        <div className="hidden items-center gap-1 lg:flex">
          {links.map(([label, href]) => (
            <Link
              key={href}
              href={href}
              className={cn(
                "rounded-full px-4 py-2 text-sm font-medium transition-colors duration-200",
                pathname === href || pathname?.startsWith(href + "/")
                  ? "text-[#C9A84C]"
                  : "text-[#F5F0E8]/55 hover:text-[#F5F0E8]/90"
              )}
            >
              {label}
            </Link>
          ))}
        </div>

        {/* Desktop CTAs */}
        <div className="hidden items-center gap-3 md:flex">
          <Link href="/auth/login">
            <Button variant="ghost" size="sm">Login</Button>
          </Link>
          <Link href="/programs">
            <Button variant="outline" size="sm">Apply Free</Button>
          </Link>
          <Link href="/contact">
            <Button variant="gold" size="sm">Get Quote</Button>
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="rounded-full border border-[rgba(201,168,76,0.2)] p-2.5 text-[#F5F0E8]/70 lg:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="mx-auto mt-2 grid max-w-7xl gap-1 rounded-2xl border border-[rgba(201,168,76,0.15)] bg-[rgba(8,8,8,0.96)] p-4 backdrop-blur-xl lg:hidden">
          {links.map(([label, href]) => (
            <Link
              key={href}
              href={href}
              className="rounded-xl px-4 py-3 text-sm text-[#F5F0E8]/75 transition hover:bg-[rgba(201,168,76,0.06)] hover:text-[#F5F0E8]"
            >
              {label}
            </Link>
          ))}
          <div className="mt-2 grid gap-2">
            <Link href="/programs" className="rounded-xl border border-[rgba(201,168,76,0.35)] px-4 py-3 text-center text-sm font-semibold text-[#C9A84C]">
              Apply as Intern — Free
            </Link>
            <Link href="/contact" className="rounded-xl bg-[#C9A84C] px-4 py-3 text-center text-sm font-semibold text-[#080808]">
              Get Quote
            </Link>
            <Link href="/auth/login" className="rounded-xl border border-white/10 px-4 py-3 text-center text-sm text-[#F5F0E8]/70">
              Login
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
