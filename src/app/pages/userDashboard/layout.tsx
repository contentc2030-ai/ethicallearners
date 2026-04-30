import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'User Dashboard',
  description: 'User Dashboard',
}

export default function UserDashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <>{children}</>
}
