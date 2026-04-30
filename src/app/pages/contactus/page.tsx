import { ContactHero } from "@/components/contactus/contact-hero"
import { ContactForm } from "@/components/contactus/contact-form"
import { ProjectCTA } from "@/components/contactus/project-cta"

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[#0F1729]">
      <ContactHero />
      <ContactForm />
      <ProjectCTA />
    </main>
  )
}

