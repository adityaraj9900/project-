import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { GoldDivider } from "@/components/ui/primitives";

const columns = [
  {
    title: "Platform",
    links: [
      ["Programs", "/programs"],
      ["Verify Certificate", "/verify"],
      ["Careers", "/careers"],
      ["Community", "/community"],
    ],
  },
  {
    title: "Agency",
    links: [
      ["Services", "/services"],
      ["Portfolio", "/portfolio"],
      ["Pricing", "/pricing"],
      ["Contact", "/contact"],
    ],
  },
  {
    title: "Company",
    links: [
      ["About", "/about"],
      ["Blog", "/blog"],
      ["Team", "/team"],
      ["FAQ", "/faq"],
    ],
  },
  {
    title: "Legal",
    links: [
      ["Terms", "/terms"],
      ["Privacy", "/privacy"],
      ["Refund Policy", "/refund"],
    ],
  },
];

export function Footer() {
  return (
    <footer className="relative border-t border-[rgba(201,168,76,0.1)] bg-[#080808] px-6 py-16">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(201,168,76,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,0.03) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />
      <div className="relative mx-auto max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_2fr]">
          {/* Brand column */}
          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-[rgba(201,168,76,0.35)] bg-[rgba(201,168,76,0.08)] text-2xl font-black text-[#C9A84C]">
                O
              </div>
              <div>
                <p className="text-base font-black tracking-widest text-[#F5F0E8]">ORBITIX</p>
                <p className="text-xs uppercase tracking-[0.22em] text-[#C9A84C]/70">IT Solutions</p>
              </div>
            </div>
            <p className="mt-6 max-w-sm text-[#F5F0E8]/55 leading-relaxed">
              Premium IT services agency delivering world-class digital products — and running free
              internship programs where students ship real work.
            </p>
            <div className="mt-6 inline-flex items-center gap-1.5 rounded-full border border-emerald-500/25 bg-emerald-500/8 px-4 py-2 text-xs font-semibold text-emerald-400">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Internships are 100% Free. Always.
            </div>
            <div className="mt-8 flex gap-4 text-[#F5F0E8]/35">
              <Link href="#" className="flex items-center gap-1 text-xs hover:text-[#C9A84C] transition-colors"><ExternalLink size={12} /> Twitter</Link>
              <Link href="#" className="flex items-center gap-1 text-xs hover:text-[#C9A84C] transition-colors"><ExternalLink size={12} /> LinkedIn</Link>
            </div>
          </div>

          {/* Link columns */}
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {columns.map((col) => (
              <div key={col.title}>
                <p className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-[#C9A84C]">
                  {col.title}
                </p>
                <div className="grid gap-3 text-sm text-[#F5F0E8]/50">
                  {col.links.map(([label, href]) => (
                    <Link
                      key={href}
                      href={href}
                      className="transition-colors hover:text-[#F5F0E8]/90"
                    >
                      {label}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <GoldDivider className="my-10" />

        <div className="flex flex-col justify-between gap-4 text-xs text-[#F5F0E8]/30 md:flex-row">
          <span>© 2026 Orbitix IT Solutions. All rights reserved.</span>
          <span>admin@orbitix.in · orbitix.in</span>
        </div>
      </div>
    </footer>
  );
}
