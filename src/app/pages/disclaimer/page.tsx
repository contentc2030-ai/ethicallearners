import { LegalHero } from "@/components/policy/legal-hero"
import { DisclaimerContent } from "@/components/policy/disclaimer-content"

export default function DisclaimerPage() {
  return (
    <main className="min-h-screen bg-[#0F1729]">
      <LegalHero title="Disclaimer" description="Last updated: February 12, 2024" />
      <DisclaimerContent />
    </main>
  )
}

