import { Suspense } from 'react'
import MentorRegistrationForm from "@/components/mentor/MentorRegistrationForm"

export default function MentorRegistrationPage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center min-h-screen">Loading...</div>}>
      <MentorRegistrationForm />
    </Suspense>
  )
} 