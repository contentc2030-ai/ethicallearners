"use client"

import { Shield, Database, Share2, Lock } from "lucide-react"
import { TableOfContents } from "./table-of-contents"
import { SectionCard } from "./section-card"

export function PrivacyContent() {
  const sections = [
    {
      id: "information-we-collect",
      title: "Information We Collect",
      icon: <Database className="h-8 w-8" />,
      content: [
        "We collect information you provide directly to us, including:",
        "• Personal information (name, email address, phone number)",
        "• Payment information",
        "• Communication preferences",
        "• Course progress and completion data",
      ],
    },
    {
      id: "how-we-use-your-information",
      title: "How We Use Your Information",
      icon: <Shield className="h-8 w-8" />,
      content: [
        "We use the information we collect to:",
        "• Provide, maintain, and improve our services",
        "• Process your transactions",
        "• Send you technical notices and support messages",
        "• Communicate with you about products, services, and events",
      ],
    },
    {
      id: "information-sharing",
      title: "Information Sharing",
      icon: <Share2 className="h-8 w-8" />,
      content: [
        "We may share your information with:",
        "• Service providers and business partners",
        "• Legal authorities when required by law",
        "• Other parties with your consent",
      ],
    },
    {
      id: "data-security",
      title: "Data Security",
      icon: <Lock className="h-8 w-8" />,
      content: [
        "We implement appropriate security measures to protect your personal information, including:",
        "• Encryption of sensitive data",
        "• Regular security assessments",
        "• Access controls and authentication",
      ],
    },
  ]

  return (
    <section className="py-16 relative">
      <TableOfContents sections={sections} />
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          {sections.map((section) => (
            <SectionCard key={section.id} title={section.title} icon={section.icon}>
              <div id={section.id} className="space-y-4">
                {section.content.map((text, i) => (
                  <p key={i} className="text-gray-400">
                    {text}
                  </p>
                ))}
              </div>
            </SectionCard>
          ))}
        </div>
      </div>
    </section>
  )
}

