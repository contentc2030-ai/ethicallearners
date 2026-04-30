"use client"

import { Layout } from "@/components/dashboard-component/dashboard-layout"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/dashboard-component/ui/avatar"
import { Button } from "@/components/dashboard-component/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/dashboard-component/ui/card"
import { Calendar, Clock, Users } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function TestsPage() {
  const { toast } = useToast()
  
  const tests = [
    {
      id: 1,
      title: "Arabic Language Proficiency Test",
      date: "2024-02-15",
      time: "10:00 AM",
      duration: "2 hours",
      participants: 45,
      instructor: {
        name: "Dr. Ahmed",
        avatar: "/placeholder-user.jpg",
      },
      status: "upcoming",
    },
    {
      id: 2,
      title: "Islamic Studies Monthly Assessment",
      date: "2024-02-22",
      time: "2:00 PM",
      duration: "1.5 hours",
      participants: 38,
      instructor: {
        name: "Dr. Sarah",
        avatar: "/placeholder-user.jpg",
      },
      status: "open",
    },
  ]

  return (
    <Layout>
      <div className="flex-1 space-y-8 p-8 pt-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Monthly Tests</h2>
          <p className="text-muted-foreground">View and join upcoming tests</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {tests.map((test) => (
            <Card key={test.id} className="relative overflow-hidden">
              <div className="absolute right-4 top-4">
                <Button 
                  variant={test.status === "upcoming" ? "secondary" : "default"} 
                  className="h-8"
                  onClick={() => {
                    if (test.status === "open") {
                      toast({
                        title: "Joining Test",
                        description: `You are now joining ${test.title}`,
                      })
                    }
                  }}
                >
                  {test.status === "upcoming" ? "Upcoming" : "Join Now"}
                </Button>
              </div>
              <CardHeader>
                <CardTitle className="line-clamp-2">{test.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-4">
                  <Avatar>
                    <AvatarImage src={test.instructor.avatar} />
                    <AvatarFallback>{test.instructor.name[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">{test.instructor.name}</p>
                    <p className="text-sm text-muted-foreground">Instructor</p>
                  </div>
                </div>
                <div className="flex flex-col gap-2 text-sm">
                  <div className="flex items-center">
                    <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                    {test.date} at {test.time}
                  </div>
                  <div className="flex items-center">
                    <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                    Duration: {test.duration}
                  </div>
                  <div className="flex items-center">
                    <Users className="mr-2 h-4 w-4 text-muted-foreground" />
                    {test.participants} participants
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  className="w-full" 
                  variant={test.status === "upcoming" ? "outline" : "default"}
                  onClick={() => {
                    if (test.status === "upcoming") {
                      toast({
                        title: "Reminder Set",
                        description: `Reminder set for ${test.title} on ${test.date}`,
                      })
                    } else {
                      toast({
                        title: "Starting Test",
                        description: `Starting ${test.title}. Good luck!`,
                      })
                    }
                  }}
                >
                  {test.status === "upcoming" ? "Set Reminder" : "Start Test"}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  )
}

