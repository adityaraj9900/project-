"use client";

import { useState } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { ShieldCheck, Award, Search } from "lucide-react";
import { Section, Reveal, GoldCard, Button, Badge, SectionHeader, inputClass } from "@/components/ui/primitives";

export default function VerifyPage() {
  const [certNo, setCertNo] = useState("");
  const [result, setResult] = useState<null | { found: boolean; name?: string; program?: string; issuedAt?: string; certNo?: string }>(null);
  const [loading, setLoading] = useState(false);

  async function handleVerify() {
    if (!certNo.trim()) return;
    setLoading(true);
    const res = await fetch(`/api/certificates/verify?id=${encodeURIComponent(certNo.trim())}`);
    const data = await res.json();
    setResult(data);
    setLoading(false);
  }

  return (
    <main className="bg-[#080808] pt-32 pb-24">
      <div className="pointer-events-none fixed inset-0 -z-10" style={{ backgroundImage: "linear-gradient(rgba(201,168,76,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,0.03) 1px, transparent 1px)", backgroundSize: "48px 48px" }} />
      <Section>
        <Reveal><SectionHeader center eyebrow="Certificate verification" title="Verify a certificate" subtitle="Enter the certificate number to instantly verify an Orbitix certificate." /></Reveal>
        <div className="mx-auto max-w-lg">
          <Reveal>
            <GoldCard>
              <div className="flex gap-3">
                <input value={certNo} onChange={(e) => setCertNo(e.target.value)} onKeyDown={(e) => e.key === "Enter" && handleVerify()} placeholder="e.g. ORB-FS-2026-0001" className={inputClass + " flex-1"} />
                <Button variant="gold" onClick={handleVerify} disabled={loading}>
                  <Search size={16} />
                </Button>
              </div>
              {result && (
                <div className="mt-6">
                  {result.found ? (
                    <div className="rounded-xl border border-emerald-500/25 bg-emerald-500/8 p-6 text-center">
                      <ShieldCheck size={40} className="mx-auto text-emerald-400 mb-3" />
                      <Badge tone="success">Verified</Badge>
                      <h3 className="mt-4 text-xl font-black text-[#F5F0E8]">{result.name}</h3>
                      <p className="mt-1 text-sm text-[#F5F0E8]/55">{result.program}</p>
                      <p className="mt-1 text-xs text-[#F5F0E8]/35">Issued: {result.issuedAt}</p>
                      <p className="mt-1 text-xs text-[#C9A84C]">{result.certNo}</p>
                      {result.certNo && <div className="mt-4 flex justify-center"><QRCodeCanvas value={`https://orbitix.in/verify?id=${result.certNo}`} size={100} bgColor="#0F0F0F" fgColor="#C9A84C" /></div>}
                    </div>
                  ) : (
                    <div className="rounded-xl border border-red-500/25 bg-red-500/8 p-6 text-center">
                      <Award size={40} className="mx-auto text-red-400 mb-3" />
                      <p className="font-semibold text-red-400">Certificate not found</p>
                      <p className="mt-1 text-sm text-[#F5F0E8]/45">Check the certificate number and try again.</p>
                    </div>
                  )}
                </div>
              )}
            </GoldCard>
          </Reveal>
        </div>
      </Section>
    </main>
  );
}
