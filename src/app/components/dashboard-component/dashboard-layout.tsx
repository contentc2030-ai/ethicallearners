"use client"

import { Bell } from "lucide-react"
import Image from "next/image"
import Link from "next/link"                  //Side Navbar
import type React from "react"

import { Button } from "@/components/dashboard-component/ui/button"
import { Sidebar, SidebarContent, SidebarHeader, SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/dashboard-component/ui/sidebar"
import { Toaster } from "@/components/dashboard-component/ui/toaster"
import { useToast } from "@/hooks/use-toast"
import { MainNav } from "./main-nav"
import { UserNav } from "./user-nav"

export function Layout({ children }: { children: React.ReactNode }) {
  const { toast } = useToast()

  return (
    <SidebarProvider>
      <Sidebar collapsible="icon" className="border-r border-border">
        <SidebarHeader className="border-b border-border p-4">
          <Link href="/" className="flex items-center gap-2 group-data-[collapsible=icon]:justify-center">
            <div className="rounded-lg bg-primary p-1">
              <Image src="/placeholder.svg" width={24} height={24} alt="Smart Class" className="h-6 w-6" />
            </div>
            <span className="font-semibold text-primary group-data-[collapsible=icon]:hidden">Smart Class</span>
          </Link>
        </SidebarHeader>
        <SidebarContent>
          <MainNav />
        </SidebarContent>
      </Sidebar>
      <SidebarInset>
        <header className="flex h-14 items-center gap-4 border-b border-border bg-card px-4 lg:h-16 shrink-0">
          <SidebarTrigger />
          <div className="ml-auto flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              className="text-foreground/70 hover:text-primary"
              onClick={() => {
                toast({
                  title: "Notifications",
                  description: "You have no new notifications",
                })
              }}
            >
              <Bell className="h-5 w-5" />
              <span className="sr-only">Notifications</span>
            </Button>
            <UserNav />
          </div>
        </header>
        <main className="flex-1 bg-background overflow-y-auto">{children}</main>
      </SidebarInset>
      <Toaster />
    </SidebarProvider>
  )
}

