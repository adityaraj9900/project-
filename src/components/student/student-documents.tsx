"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { FileText, Award, Star, Download, CheckCircle2, Clock, Lock } from "lucide-react";
import { GoldCard, Badge } from "@/components/ui/primitives";
import { cn } from "@/lib/utils";

type Tab = "offer" | "certificate" | "lor";

interface DocsData {
  enrollment: {
    enrollment: { startDate: string; endDate?: string; progress: number };
    program: { title: string; duration: string };
  } | null;
  offerLetter: { id: string; issuedAt: string; content?: string } | null;
  certificate: { id: string; certNumber: string; issuedAt: string; grade?: string } | null;
  lor: { id: string; issuedAt: string; content?: string } | null;
}

function downloadTextDoc(filename: string, content: string) {
  const blob = new Blob([content], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

export function StudentDocuments() {
  const { data: session } = useSession();
  const [tab, setTab] = useState<Tab>("offer");
  const [docs, setDocs] = useState<DocsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/student/documents")
      .then((r) => r.json())
      .then((d) => { setDocs(d); setLoading(false); });
  }, []);

  const name = session?.user?.name ?? "Intern";
  const programTitle = docs?.enrollment?.program?.title ?? "Full-Stack Product Engineering";
  const duration = docs?.enrollment?.program?.duration ?? "12 weeks";
  const startDate = docs?.enrollment?.enrollment?.startDate
    ? new Date(docs.enrollment.enrollment.startDate).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })
    : new Date().toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });

  const TABS = [
    { key: "offer" as Tab, label: "Offer Letter", icon: FileText },
    { key: "certificate" as Tab, label: "Certificate", icon: Award },
    { key: "lor" as Tab, label: "Letter of Rec.", icon: Star },
  ];

  const offerContent = `
ORBITIX IT SOLUTIONS
Internship Offer Letter

Date: ${startDate}

Dear ${name},

We are pleased to offer you a position as an Intern at ORBITIX IT Solutions under our
${programTitle} track.

Program Duration: ${duration}
Start Date: ${startDate}
Stipend: This is an unpaid internship. All certificates, LORs, and documents are provided FREE of cost.

During your internship, you will work on real-world projects, receive mentor guidance, and
build a portfolio of client-ready work.

This internship is entirely free of charge. There are no fees for the program, certificate,
or any document.

Congratulations and welcome to the ORBITIX family!

Regards,
Team ORBITIX IT Solutions
admin@orbitix.in
`.trim();

  const certContent = docs?.certificate
    ? `
ORBITIX IT SOLUTIONS
Certificate of Completion

Certificate No: ${docs.certificate.certNumber}
Date: ${new Date(docs.certificate.issuedAt).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}

This is to certify that

${name}

has successfully completed the

${programTitle}

internship program at ORBITIX IT Solutions.

Grade: ${docs.certificate.grade ?? "Excellent"}

This certificate is issued FREE of charge.

Verify at: https://orbitix.in/verify?id=${docs.certificate.certNumber}

Team ORBITIX IT Solutions
`.trim()
    : null;

  const lorContent = docs?.lor
    ? `
ORBITIX IT SOLUTIONS
Letter of Recommendation

Date: ${new Date(docs.lor.issuedAt).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}

To Whom It May Concern,

This letter serves as a recommendation for ${name}, who completed the ${programTitle}
internship program at ORBITIX IT Solutions.

During the internship, ${name} demonstrated strong technical skills, consistent performance,
and a professional attitude. We worked on real client projects and ${name} contributed
meaningfully to the team's output.

We recommend ${name} without reservation for any technical or creative role.

${docs.lor.content ? `\nAdditional Notes:\n${docs.lor.content}` : ""}

Regards,
Mentor Team
ORBITIX IT Solutions
admin@orbitix.in
`.trim()
    : null;

  const progress = docs?.enrollment?.enrollment?.progress ?? 0;
  const certUnlocked = progress >= 100 && !!docs?.certificate;
  const lorUnlocked = progress >= 80 && !!docs?.lor;

  if (loading) {
    return (
      <div className="space-y-3">
        {[1, 2].map((i) => (
          <div key={i} className="h-32 animate-pulse rounded-xl bg-[rgba(201,168,76,0.04)] border border-[rgba(201,168,76,0.08)]" />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Free badge */}
      <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/25 bg-emerald-500/8 px-4 py-2 text-xs font-bold text-emerald-400">
        <CheckCircle2 size={13} />
        All documents are 100% FREE — no charges ever
      </div>

      {/* Tabs */}
      <div className="flex gap-1 rounded-xl border border-[rgba(201,168,76,0.12)] bg-[rgba(201,168,76,0.03)] p-1">
        {TABS.map(({ key, label, icon: Icon }) => (
          <button
            key={key}
            onClick={() => setTab(key)}
            className={cn(
              "flex flex-1 items-center justify-center gap-2 rounded-lg py-2.5 text-xs font-bold transition-all",
              tab === key
                ? "bg-[rgba(201,168,76,0.15)] text-[#C9A84C]"
                : "text-[#F5F0E8]/40 hover:text-[#F5F0E8]/70"
            )}
          >
            <Icon size={13} /> <span className="hidden sm:inline">{label}</span>
          </button>
        ))}
      </div>

      {/* Offer Letter Tab */}
      {tab === "offer" && (
        <div className="space-y-4">
          <GoldCard>
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[rgba(201,168,76,0.3)] bg-[rgba(201,168,76,0.08)]">
                  <FileText size={18} className="text-[#C9A84C]" />
                </div>
                <div>
                  <h3 className="font-black text-[#F5F0E8]">Internship Offer Letter</h3>
                  <p className="text-xs text-[#F5F0E8]/45">
                    {docs?.offerLetter
                      ? `Issued on ${new Date(docs.offerLetter.issuedAt).toLocaleDateString("en-IN")}`
                      : "Pending admin issuance"}
                  </p>
                </div>
              </div>
              <Badge tone="success">FREE</Badge>
            </div>
          </GoldCard>

          {/* Preview */}
          <GoldCard hover={false}>
            <pre className="whitespace-pre-wrap font-mono text-xs text-[#F5F0E8]/65 leading-relaxed max-h-72 overflow-y-auto">
              {offerContent}
            </pre>
          </GoldCard>

          <button
            onClick={() => downloadTextDoc(`offer-letter-${name.replace(/\s+/g, "-")}.txt`, offerContent)}
            className="flex items-center gap-2 rounded-xl bg-[#C9A84C] px-5 py-2.5 text-sm font-bold text-[#080808] hover:bg-[#E8C97A] transition-colors"
          >
            <Download size={15} /> Download Offer Letter
          </button>
        </div>
      )}

      {/* Certificate Tab */}
      {tab === "certificate" && (
        <div className="space-y-4">
          {!certUnlocked ? (
            <GoldCard className="text-center py-8">
              <div className="flex flex-col items-center gap-3">
                <Lock size={28} className="text-[#F5F0E8]/20" />
                <div>
                  <p className="font-black text-[#F5F0E8]/60">Certificate Locked</p>
                  <p className="text-sm text-[#F5F0E8]/35 mt-1">Complete 100% of the program to unlock your certificate</p>
                </div>
                <div className="mt-2 w-48">
                  <div className="mb-1 flex justify-between text-xs text-[#F5F0E8]/40">
                    <span>Progress</span>
                    <span>{progress}%</span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-[rgba(201,168,76,0.08)]">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-[#C9A84C] to-[#E8C97A]"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>
              </div>
            </GoldCard>
          ) : (
            <>
              <GoldCard>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[rgba(201,168,76,0.3)] bg-[rgba(201,168,76,0.08)]">
                      <Award size={18} className="text-[#C9A84C]" />
                    </div>
                    <div>
                      <h3 className="font-black text-[#F5F0E8]">Certificate of Completion</h3>
                      <p className="text-xs text-[#F5F0E8]/45">
                        Cert #{docs!.certificate!.certNumber} · {new Date(docs!.certificate!.issuedAt).toLocaleDateString("en-IN")}
                      </p>
                    </div>
                  </div>
                  <Badge tone="success">FREE</Badge>
                </div>
              </GoldCard>
              <GoldCard hover={false}>
                <pre className="whitespace-pre-wrap font-mono text-xs text-[#F5F0E8]/65 leading-relaxed max-h-72 overflow-y-auto">
                  {certContent}
                </pre>
              </GoldCard>
              <button
                onClick={() => downloadTextDoc(`certificate-${docs!.certificate!.certNumber}.txt`, certContent!)}
                className="flex items-center gap-2 rounded-xl bg-[#C9A84C] px-5 py-2.5 text-sm font-bold text-[#080808] hover:bg-[#E8C97A] transition-colors"
              >
                <Download size={15} /> Download Certificate
              </button>
            </>
          )}
        </div>
      )}

      {/* LOR Tab */}
      {tab === "lor" && (
        <div className="space-y-4">
          {!lorUnlocked ? (
            <GoldCard className="text-center py-8">
              <div className="flex flex-col items-center gap-3">
                <Lock size={28} className="text-[#F5F0E8]/20" />
                <div>
                  <p className="font-black text-[#F5F0E8]/60">LOR Locked</p>
                  <p className="text-sm text-[#F5F0E8]/35 mt-1">Complete 80% of the program to unlock your Letter of Recommendation</p>
                </div>
                <div className="mt-2 flex items-center gap-2 text-xs text-[#F5F0E8]/40">
                  <Clock size={11} />
                  <span>Current progress: {progress}% / 80% required</span>
                </div>
              </div>
            </GoldCard>
          ) : (
            <>
              <GoldCard>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[rgba(201,168,76,0.3)] bg-[rgba(201,168,76,0.08)]">
                      <Star size={18} className="text-[#C9A84C]" />
                    </div>
                    <div>
                      <h3 className="font-black text-[#F5F0E8]">Letter of Recommendation</h3>
                      <p className="text-xs text-[#F5F0E8]/45">
                        Issued {new Date(docs!.lor!.issuedAt).toLocaleDateString("en-IN")}
                      </p>
                    </div>
                  </div>
                  <Badge tone="success">FREE</Badge>
                </div>
              </GoldCard>
              <GoldCard hover={false}>
                <pre className="whitespace-pre-wrap font-mono text-xs text-[#F5F0E8]/65 leading-relaxed max-h-72 overflow-y-auto">
                  {lorContent}
                </pre>
              </GoldCard>
              <button
                onClick={() => downloadTextDoc(`lor-${name.replace(/\s+/g, "-")}.txt`, lorContent!)}
                className="flex items-center gap-2 rounded-xl bg-[#C9A84C] px-5 py-2.5 text-sm font-bold text-[#080808] hover:bg-[#E8C97A] transition-colors"
              >
                <Download size={15} /> Download LOR
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}
