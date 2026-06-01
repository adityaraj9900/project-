import { SimpleMarketingPage } from "@/components/sections/public-sections";
import { GoldCard } from "@/components/ui/primitives";

export default function RefundPage() {
  return (
    <SimpleMarketingPage eyebrow="Refund Policy" title="Refunds for client projects.">
      <GoldCard>
        <div className="grid gap-4 text-sm text-[#F5F0E8]/65 leading-relaxed">
          <p><strong className="text-[#F5F0E8]/80">Students / Interns:</strong> There is nothing to refund. Orbitix internships are 100% free. No fees are charged to students at any stage.</p>
          <p><strong className="text-[#F5F0E8]/80">Agency clients:</strong> Payments are milestone-based. If a milestone is not delivered to agreed specification, a revision or partial refund will be offered at admin discretion.</p>
          <p>Refund requests must be submitted within 7 days of milestone payment via admin@orbitix.in with proof of the unmet deliverable.</p>
          <p>Refunds are processed within 5-7 business days to the original payment method.</p>
        </div>
      </GoldCard>
    </SimpleMarketingPage>
  );
}
