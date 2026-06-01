"use client";

import { useEffect, useState } from "react";
import { CheckCircle2, Clock, IndianRupee, Download } from "lucide-react";
import { GoldCard, Badge } from "@/components/ui/primitives";

interface Payment {
  id: string;
  purpose: string;
  amount: number;
  status: string;
  createdAt: string;
  razorpayOrderId?: string;
}

function statusTone(s: string): "success" | "warning" | "danger" | "default" {
  if (s === "approved") return "success";
  if (s === "pending") return "warning";
  if (s === "rejected") return "danger";
  return "default";
}

function downloadReceipt(payment: Payment) {
  const content = `
ORBITIX IT SOLUTIONS
Payment Receipt

Receipt ID: ${payment.id}
Date: ${new Date(payment.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}

Purpose: ${payment.purpose ?? "Project milestone"}
Amount: ₹${payment.amount.toLocaleString("en-IN")}
Status: ${payment.status.toUpperCase()}
${payment.razorpayOrderId ? `Order ID: ${payment.razorpayOrderId}` : ""}

Thank you for choosing ORBITIX IT Solutions.
For queries: admin@orbitix.in
`.trim();

  const blob = new Blob([content], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `receipt-${payment.id}.txt`;
  a.click();
  URL.revokeObjectURL(url);
}

export function ClientPayments() {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/client/me")
      .then((r) => r.json())
      .then((d) => { setPayments(d.payments ?? []); setLoading(false); });
  }, []);

  const totalPaid = payments.filter((p) => p.status === "approved").reduce((s, p) => s + p.amount, 0);

  if (loading) {
    return (
      <div className="space-y-3">
        {[1, 2].map((i) => (
          <div key={i} className="h-20 animate-pulse rounded-xl bg-[rgba(201,168,76,0.04)] border border-[rgba(201,168,76,0.08)]" />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Summary */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Total Paid", value: `₹${(totalPaid / 1000).toFixed(0)}K`, icon: IndianRupee, color: "text-[#C9A84C]" },
          { label: "Approved", value: payments.filter((p) => p.status === "approved").length, icon: CheckCircle2, color: "text-emerald-400" },
          { label: "Pending", value: payments.filter((p) => p.status === "pending").length, icon: Clock, color: "text-amber-400" },
        ].map((s) => (
          <GoldCard key={s.label} hover={false} className="text-center">
            <s.icon size={18} className={`mx-auto ${s.color}`} />
            <div className={`mt-2 text-xl font-black ${s.color}`}>{s.value}</div>
            <div className="text-xs text-[#F5F0E8]/40">{s.label}</div>
          </GoldCard>
        ))}
      </div>

      {/* Important note */}
      <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 px-4 py-3 text-xs text-amber-400">
        <strong>Note:</strong> Payments are for professional client project services only. Internship programs are 100% free — students are never charged.
      </div>

      {/* Payment list */}
      {payments.length === 0 ? (
        <GoldCard>
          <p className="py-6 text-center text-sm text-[#F5F0E8]/45">No payment records yet.</p>
        </GoldCard>
      ) : (
        <div className="space-y-3">
          {payments.map((p) => (
            <GoldCard key={p.id}>
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h4 className="font-semibold text-[#F5F0E8]">{p.purpose ?? "Project milestone"}</h4>
                  <p className="text-xs text-[#F5F0E8]/35">
                    {new Date(p.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-black text-[#C9A84C]">₹{p.amount.toLocaleString("en-IN")}</span>
                  <Badge tone={statusTone(p.status)}>{p.status}</Badge>
                </div>
              </div>
              {p.status === "approved" && (
                <button
                  onClick={() => downloadReceipt(p)}
                  className="mt-3 flex items-center gap-1.5 text-xs text-[#F5F0E8]/40 hover:text-[#C9A84C] transition-colors"
                >
                  <Download size={11} /> Download receipt
                </button>
              )}
            </GoldCard>
          ))}
        </div>
      )}
    </div>
  );
}
