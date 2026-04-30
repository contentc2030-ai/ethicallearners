"use client"

import { ReactNode } from 'react'
import { useSearchParams } from 'next/navigation'

type SearchParamsProviderProps = {
  children: (email: string) => ReactNode
}

export function SearchParamsProvider({ children }: SearchParamsProviderProps) {
  const searchParams = useSearchParams()
  const email = searchParams.get('email') || ''
  
  return <>{children(email)}</>
} 