import { SimpleMarketingPage } from "@/components/sections/public-sections";
import { GoldCard } from "@/components/ui/primitives";

export default function PrivacyPage() {
  return (
    <SimpleMarketingPage eyebrow="Privacy Policy" title="Privacy-first by design.">
      <GoldCard>
        <div className="grid gap-4 text-sm text-[#F5F0E8]/65 leading-relaxed">
          <p>Orbitix IT Solutions collects only the data required to operate internship programs and deliver agency projects. This includes profile information, application data, submissions, project communications, and payment records (for clients only).</p>
          <p>We never sell your data. We do not share intern data with third parties except where required for program operation (e.g., mentor access).</p>
          <p>Interns: Your name, email, GitHub profile, and submission work may be visible to your assigned mentor and platform administrators.</p>
          <p>Clients: Payment proofs, project files, and communication records are stored securely and accessible only to the assigned project team and administrators.</p>
          <p>For any privacy requests, contact admin@orbitix.in.</p>
        </div>
      </GoldCard>
    </SimpleMarketingPage>
  );
}
