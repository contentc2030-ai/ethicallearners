"use client"

import { BookOpen, Home, LayoutDashboard, MessageSquare, Table, Trophy ,User2Icon } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/dashboard-component/ui/sidebar"

const items = [
  {
    title: "Home page",
    href: "/pages/userDashboard/",
    icon: Home,
  },
  {
    title: "Profile",
    href: "/pages/userDashboard/profile",
    icon: User2Icon,
  },
  {
    title: "Courses",
    href: "/pages/userDashboard/courses",
    icon: LayoutDashboard,
  },
  {
    title: "Monthly Test",
    href: "/pages/userDashboard/tests",
    icon: BookOpen,
  },
  {
    title: "Final Results",
    href: "/pages/userDashboard/results",
    icon: Trophy,
  },
  {
    title: "Ticketing System",
    href: "/pages/userDashboard/tickets",
    icon: MessageSquare,
  },
  {
    title: "Time Table",                                    //when opening the sidebar the whole screen is getting dark
    href: "/pages/userDashboard/timetable",
    icon: Table,
  },
]

export function MainNav() {
  const pathname = usePathname()

  return (
    <SidebarMenu>
      {items.map((item) => (
        <SidebarMenuItem key={item.href}>
          <SidebarMenuButton asChild isActive={pathname === item.href} tooltip={item.title}>
            <Link href={item.href}>
              <item.icon className="h-5 w-5" />
              <span>{item.title}</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  )
}

