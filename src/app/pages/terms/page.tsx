import { LegalHero } from "@/components/policy/legal-hero"
import { PrivacyContent } from "@/components/policy/privacy-content"

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-[#0F1729]">
      <LegalHero title="Privacy Policy" description="Last updated: February 12, 2024" />
      <PrivacyContent />
    </main>
  )
}

