"use client";

import { useEffect, useState } from "react";
import { GoldCard, Button, StatusBadge } from "@/components/ui/primitives";
import { CheckCircle2, X, Loader2 } from "lucide-react";

type Payment = { id: string; userName: string; purpose?: string | null; amount: number; status: string; createdAt: string };

export function AdminPayments() {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/payments").then(r => r.json()).then(d => { setPayments(d.payments ?? []); setLoading(false); });
  }, []);

  async function updateStatus(id: string, status: "approved" | "rejected") {
    await fetch("/api/admin/payments", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id, status }) });
    setPayments(prev => prev.map(p => p.id === id ? { ...p, status } : p));
  }

  const total = payments.filter(p => p.status === "approved").reduce((sum, p) => sum + p.amount, 0);

  return (
    <GoldCard>
      <div className="mb-6 flex items-start justify-between">
        <h2 className="text-lg font-black text-[#F5F0E8]">Client payments</h2>
        <div className="text-right">
          <div className="text-xs text-[#F5F0E8]/40">Total revenue</div>
          <div className="text-2xl font-black text-[#C9A84C]">₹{total.toLocaleString()}</div>
        </div>
      </div>
      {loading ? <div className="flex justify-center py-10"><Loader2 className="animate-spin text-[#C9A84C]" /></div> : (
        <div className="grid gap-3">
          {payments.map(p => (
            <div key={p.id} className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-[rgba(201,168,76,0.1)] px-4 py-3">
              <div>
                <div className="font-medium text-[#F5F0E8]/90">{p.userName}</div>
                <div className="text-xs text-[#F5F0E8]/45">{p.purpose} · {p.createdAt?.slice(0, 10)}</div>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-bold text-[#C9A84C]">₹{p.amount.toLocaleString()}</span>
                <StatusBadge status={p.status} />
                {p.status === "pending" && (
                  <>
                    <Button variant="gold" size="sm" onClick={() => updateStatus(p.id, "approved")}><CheckCircle2 size={13} /></Button>
                    <Button variant="outline" size="sm" onClick={() => updateStatus(p.id, "rejected")}><X size={13} /></Button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </GoldCard>
  );
}
