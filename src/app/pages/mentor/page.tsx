"use client"

import { useState } from "react"
import { Tabs, TabsContent } from "@/components/dashboard-component/ui/tabs"
import MentorDashboard from "@/components/mentor/mentor-dashboard"
import MentorProfile from "@/components/mentor/mentor-profile"
import MentorTests from "@/components/mentor/mentor-tests"
import MentorQueries from "@/components/mentor/mentor-queries"
import MentorSchedule from "@/components/mentor/mentor-schedule"
import AttendanceTab from "@/components/mentor/attendance-tab"
import { LayoutDashboard, UserCircle, FileText, MessageSquare, Calendar, ClipboardCheck, Menu, X } from "lucide-react"
import { Button } from "@/components/dashboard-component/ui/button"
import { cn } from "@/lib/utils"

export default function MentorPage() {
  const [activeTab, setActiveTab] = useState("dashboard")
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "profile", label: "Profile", icon: UserCircle },
    { id: "tests", label: "Tests", icon: FileText },
    { id: "queries", label: "Queries", icon: MessageSquare },
    { id: "schedule", label: "Schedule", icon: Calendar },
    { id: "attendance", label: "Attendance", icon: ClipboardCheck },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0F1729] via-[#131B2E] to-[#0F1729] text-white">
      {/* Mobile menu toggle */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="bg-[#1D2A3F] border-[#4CC9F0]/30 text-[#4CC9F0] hover:bg-[#4CC9F0]/10"
        >
          {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <div
          className={cn(
            "fixed inset-y-0 left-0 z-40 w-64 bg-[#1D2A3F] border-r border-[#4CC9F0]/20 transition-transform duration-300 ease-in-out lg:translate-x-0 flex flex-col",
            sidebarOpen ? "translate-x-0" : "-translate-x-full",
          )}
        >
          <div className="p-6 border-b border-[#4CC9F0]/20">
            <h1 className="text-2xl font-bold">
              <span className="text-[#4CC9F0]">Ethical </span>Learner
            </h1>
            <p className="text-sm text-white mt-1">Mentor Portal</p>
          </div>

          <nav className="flex-1 p-4 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id)
                    setSidebarOpen(false)
                  }}
                  className={cn(
                    "flex items-center w-full px-4 py-3 rounded-md transition-colors",
                    activeTab === item.id
                      ? "bg-[#4CC9F0] text-[#0F1729]"
                      : "text-white hover:bg-[#4CC9F0]/10 hover:text-white",
                  )}
                >
                  <Icon className="h-5 w-5 mr-3" />
                  {item.label}
                </button>
              )
            })}
          </nav>

          <div className="p-4 border-t border-[#4CC9F0]/20">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#131B2E] flex items-center justify-center text-[#4CC9F0]">
                AT
              </div>
              <div>
                <p className="font-medium">Dr. Alan Turing</p>
                <p className="text-xs text-white">Senior Mentor</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 lg:ml-64">
          <div className="p-6 md:p-8">
            <h1 className="text-3xl font-bold mb-8 lg:mb-10 mt-8 lg:mt-0">
              <span className="text-[#4CC9F0]">{navItems.find((item) => item.id === activeTab)?.label}</span>
            </h1>

            <Tabs value={activeTab} className="space-y-6">
              <TabsContent value="dashboard">
                <MentorDashboard />
              </TabsContent>

              <TabsContent value="profile">
                <MentorProfile />
              </TabsContent>

              <TabsContent value="tests">
                <MentorTests />
              </TabsContent>

              <TabsContent value="queries">
                <MentorQueries />
              </TabsContent>

              <TabsContent value="schedule">
                <MentorSchedule />
              </TabsContent>

              <TabsContent value="attendance">
                <AttendanceTab />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-30 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}
    </div>
  )
}

