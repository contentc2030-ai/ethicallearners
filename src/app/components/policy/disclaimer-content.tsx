"use client"

import { motion } from "framer-motion"

export function DisclaimerContent() {
  const sections = [
    {
      title: "Educational Content Disclaimer",
      content: [
        "The content provided on this platform is for educational purposes only. While we strive to keep the information up to date and accurate, we make no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, suitability, or availability of the information, products, services, or related graphics contained on the platform for any purpose.",
      ],
    },
    {
      title: "Professional Advice",
      content: [
        "The information provided through our services should not be considered as professional advice. Users should consult with appropriate professionals for specific advice tailored to their situation.",
        "We do not guarantee job placement, career advancement, or specific skill acquisition through the use of our services.",
      ],
    },
    {
      title: "Third-Party Content",
      content: [
        "Our platform may include content from third-party sources. We do not warrant the accuracy, completeness, or usefulness of this information.",
        "Links to third-party websites are provided for convenience only and do not imply endorsement.",
      ],
    },
    {
      title: "Limitation of Liability",
      content: [
        "To the maximum extent permitted by law, we shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues.",
        "Your use of our services is at your sole risk.",
      ],
    },
  ]

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          {sections.map((section, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="mb-12"
            >
              <h2 className="text-2xl font-bold text-white mb-4">{section.title}</h2>
              <div className="space-y-4">
                {section.content.map((text, i) => (
                  <p key={i} className="text-gray-400">
                    {text}
                  </p>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

