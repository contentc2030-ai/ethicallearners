"use client"

"use client"

import { useState } from "react"
import { Layout } from "@/components/dashboard-component/dashboard-layout"
import { Button } from "@/components/dashboard-component/ui/button"
import { Calendar } from "@/components/dashboard-component/ui/calendar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/dashboard-component/ui/card"
import { Plus } from "lucide-react"
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { useToast } from "@/hooks/use-toast"

export default function TimetablePage() {
  const { toast } = useToast()
  const [date, setDate] = useState<Date | undefined>(new Date())

  const attendanceData = [
    { day: "Mon", attendance: 95 },
    { day: "Tue", attendance: 88 },
    { day: "Wed", attendance: 92 },
    { day: "Thu", attendance: 96 },
    { day: "Fri", attendance: 85 },
  ]

  const upcomingEvents = [
    {
      id: 1,
      title: "Arabic Language Class",
      time: "09:00 AM - 10:30 AM",
      type: "Class",
    },
    {
      id: 2,
      title: "Islamic Studies",
      time: "11:00 AM - 12:30 PM",
      type: "Class",
    },
    {
      id: 3,
      title: "Monthly Test Review",
      time: "02:00 PM - 03:00 PM",
      type: "Meeting",
    },
  ]

  return (
    <Layout>
      <div className="flex-1 space-y-8 p-8 pt-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Time Table</h2>
            <p className="text-muted-foreground">Manage your schedule and track attendance</p>
          </div>
          <Button
            onClick={() => {
              toast({
                title: "Add New Event",
                description: "Opening event creation form...",
              })
            }}
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Event
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Calendar</CardTitle>
            </CardHeader>
            <CardContent>
              <Calendar 
                mode="single" 
                selected={date} 
                onSelect={setDate}
                className="rounded-md border" 
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Weekly Attendance</CardTitle>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={attendanceData}>
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="attendance"
                    stroke="hsl(var(--primary))"
                    fill="hsl(var(--primary))"
                    fillOpacity={0.2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Upcoming Events</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingEvents.map((event) => (
                <div key={event.id} className="flex items-center justify-between rounded-lg border p-4">
                  <div>
                    <h4 className="font-semibold">{event.title}</h4>
                    <p className="text-sm text-muted-foreground">{event.time}</p>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => {
                      toast({
                        title: "Event Details",
                        description: `Viewing details for: ${event.title} at ${event.time}`,
                      })
                    }}
                  >
                    View Details
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  )
}

