import { SimpleMarketingPage } from "@/components/sections/public-sections";
import { GoldCard } from "@/components/ui/primitives";

export default function TermsPage() {
  return (
    <SimpleMarketingPage eyebrow="Terms & Conditions" title="Platform usage terms.">
      <GoldCard>
        <div className="grid gap-4 text-sm text-[#F5F0E8]/65 leading-relaxed">
          <p>By using Orbitix platforms (website, intern dashboard, client portal), you agree to these terms.</p>
          <p><strong className="text-[#F5F0E8]/80">Internships:</strong> Applications are free. Certificates are free. No payment of any kind is required from students or interns. Any attempt to charge interns is a violation of our policy.</p>
          <p><strong className="text-[#F5F0E8]/80">Submissions:</strong> All submitted work must be your own. Plagiarism results in immediate disqualification and certificate revocation.</p>
          <p><strong className="text-[#F5F0E8]/80">Agency projects:</strong> Client payments are milestone-based. Payment disputes are handled through admin mediation.</p>
          <p><strong className="text-[#F5F0E8]/80">Conduct:</strong> Respectful communication is required at all times on all platform channels.</p>
          <p>For questions, contact admin@orbitix.in.</p>
        </div>
      </GoldCard>
    </SimpleMarketingPage>
  );
}
