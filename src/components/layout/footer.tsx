import Link from "next/link";
import { Code2, Link2, MessageCircle, Sparkles } from "lucide-react";

const columns = [
  { title: "Platform", links: [["Programs", "/programs"], ["Apply", "/apply"], ["Verify Certificate", "/verify"], ["Community", "/community"]] },
  { title: "Agency", links: [["Services", "/services"], ["Portfolio", "/portfolio"], ["Case Studies", "/case-studies"], ["Book Consultation", "/consultation"]] },
  { title: "Company", links: [["About", "/about"], ["Team", "/team"], ["Careers", "/careers"], ["Contact", "/contact"]] },
  { title: "Legal", links: [["Terms", "/terms"], ["Privacy", "/privacy"], ["Refund Policy", "/refund"], ["FAQ", "/faq"]] }
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/10 px-6 py-16">
      <div className="absolute inset-0 -z-10 grid-bg opacity-50" />
      <div className="mx-auto max-w-7xl">
        <div className="glass rounded-[2rem] p-8 md:p-12">
          <div className="grid gap-10 lg:grid-cols-[1.4fr_2fr]">
            <div>
              <div className="flex items-center gap-3">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-aurora text-ink"><Sparkles /></span>
                <div>
                  <p className="font-bold">Orbit Labs Academy</p>
                  <p className="text-sm text-white/55">Internship ecosystem + software agency</p>
                </div>
              </div>
              <p className="mt-6 max-w-md text-lg text-white/68">We build digital products for clients and train interns through real project-based work.</p>
              <div className="mt-6 flex gap-3 text-white/60">
                <Code2 />
                <Link2 />
                <MessageCircle />
              </div>
            </div>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {columns.map((column) => (
                <div key={column.title}>
                  <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-aurora">{column.title}</p>
                  <div className="grid gap-3 text-sm text-white/65">
                    {column.links.map(([label, href]) => <Link key={href} href={href} className="hover:text-white">{label}</Link>)}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-10 flex flex-col justify-between gap-4 border-t border-white/10 pt-6 text-sm text-white/45 md:flex-row">
            <span>© 2026 Orbit Labs Academy. All rights reserved.</span>
            <span>Manual UPI, Razorpay placeholders, certificate verification, and mock backend included.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
