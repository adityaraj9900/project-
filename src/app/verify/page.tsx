"use client";

import { QRCodeCanvas } from "qrcode.react";
import { useEffect, useState } from "react";
import { Award, ShieldCheck } from "lucide-react";
import { usePlatformStore } from "@/store/platform-store";
import { Button, Field, inputClass, PremiumCard, Section, StatusBadge } from "@/components/ui/primitives";

export default function Page() {
  const [query, setQuery] = useState("ORB-FS-2026-0001");
  const { certificates, users, programs } = usePlatformStore((state) => state.db);
  const certificate = certificates.find((item) => item.certificateNo.toLowerCase() === query.toLowerCase() || users.find((u) => u.id === item.studentId)?.email.toLowerCase() === query.toLowerCase());
  const student = users.find((u) => u.id === certificate?.studentId);
  const program = programs.find((p) => p.id === certificate?.programId);

  useEffect(() => {
    const id = new URLSearchParams(window.location.search).get("id");
    if (id) setQuery(id);
  }, []);
  return (
    <main className="pt-28">
      <Section>
        <p className="text-sm uppercase tracking-[0.3em] text-aurora">Certificate verification</p>
        <h1 className="mt-4 text-5xl font-black md:text-7xl">Verify a certificate ID or student email.</h1>
        <div className="mt-10 grid gap-5 lg:grid-cols-[0.8fr_1.2fr]">
          <PremiumCard>
            <Field label="Certificate ID or email"><input value={query} onChange={(event) => setQuery(event.target.value)} className={inputClass} /></Field>
            <Button className="mt-4">Verify record</Button>
          </PremiumCard>
          <PremiumCard>
            {certificate ? (
              <div className="grid gap-5 md:grid-cols-[1fr_auto]">
                <div>
                  <ShieldCheck className="text-aurora" size={42} />
                  <h2 className="mt-4 text-3xl font-bold">{certificate.status === "revoked" ? "Certificate revoked" : "Certificate verified"}</h2>
                  <div className="mt-4 grid gap-2 text-white/65">
                    <p>ID: {certificate.certificateNo}</p>
                    <p>Student: {student?.name}</p>
                    <p>Program: {program?.title}</p>
                    <p>Completion date: {certificate.issuedAt}</p>
                    <p>Digital signature: Orbit Labs Academy placeholder</p>
                    <p>Organization seal: verified seal placeholder</p>
                  </div>
                  <div className="mt-5"><StatusBadge status={certificate.status} /></div>
                </div>
                <div className="rounded-2xl bg-white p-4"><QRCodeCanvas value={certificate.verificationUrl} size={150} /></div>
              </div>
            ) : (
              <div className="text-center">
                <Award className="mx-auto text-white/35" size={52} />
                <h2 className="mt-4 text-2xl font-bold">No certificate found</h2>
                <p className="mt-2 text-white/55">Try ORB-FS-2026-0001 or student@orbitlabs.dev.</p>
              </div>
            )}
          </PremiumCard>
        </div>
      </Section>
    </main>
  );
}
