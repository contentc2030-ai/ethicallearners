"use client"

import { Layout } from "@/components/dashboard-component/dashboard-layout"
import { Button } from "@/components/dashboard-component/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/dashboard-component/ui/card"
import { Progress } from "@/components/dashboard-component/ui/progress"
import { Clock, Users } from "lucide-react"
import Image from "next/image"
import { useToast } from "@/hooks/use-toast"

export default function CoursesPage() {
  const { toast } = useToast()
  const myCourses = [
    {
      id: 1,
      name: "Arabic Language",
      progress: 65,
      students: 120,
      hours: 40,
      image: "/placeholder.svg?height=200&width=400",
    },
    {
      id: 2,
      name: "Islamic Studies",
      progress: 45,
      students: 85,
      hours: 30,
      image: "/placeholder.svg?height=200&width=400",
    },
  ]

  const availableCourses = [
    {
      id: 3,
      name: "Quran Memorization",
      students: 200,
      hours: 50,
      price: "$99",
      image: "/placeholder.svg?height=200&width=400",
    },
    {
      id: 4,
      name: "Arabic Calligraphy",
      students: 150,
      hours: 25,
      price: "$79",
      image: "/placeholder.svg?height=200&width=400",
    },
    {
      id:5,
      name: "Data Science with Generarive AI",
      students: 300,
      hours: 80,
      price: "$200",
      image: "/placeholder.svg?height=200&width=400",
    },
    {
      id:6,
      name: "CyberSecurity",
      students: 50,
      hours: 90,
      price: "$150",
      image: "/placeholder.svg?height=200&width=400",
    },
    {
      id:7,
      name: "Web Development",
      students: 100,
      hourse: 100,
      price: "$80",
      image: "/placeholder.svg?height=200&width=400",
    },
    {
      id:8,
      name: "Graphic Design",
      students: 70,
      hourse: 60,
      price: "$90",
      image: "/placeholder.svg?height=200&width=400",
    }

  ]

  return (
    <Layout>
      <div className="flex-1 space-y-8 p-8 pt-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">My Courses</h2>
          <p className="text-muted-foreground">Continue your learning journey</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {myCourses.map((course) => (
            <Card key={course.id} className="overflow-hidden">
              <div className="relative h-48">
                <Image src={course.image || "/placeholder.svg"} alt={course.name} fill className="object-cover" />
              </div>
              <CardHeader>
                <CardTitle>{course.name}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between text-sm">
                  <div className="flex items-center">
                    <Users className="mr-1 h-4 w-4" />
                    {course.students} students
                  </div>
                  <div className="flex items-center">
                    <Clock className="mr-1 h-4 w-4" />
                    {course.hours} hours
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Progress</span>
                    <span>{course.progress}%</span>
                  </div>
                  <Progress value={course.progress} />
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  className="w-full"
                  onClick={() => {
                    toast({
                      title: "Continuing Course",
                      description: `Resuming ${course.name}. Let's continue learning!`,
                    })
                  }}
                >
                  Continue Learning
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div>
          <h2 className="text-2xl font-bold tracking-tight">Available Courses</h2>
          <p className="text-muted-foreground">Expand your knowledge with new courses</p>
        </div>
            {/* available courses section */}
            
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {availableCourses.map((course) => (
            <Card key={course.id} className="overflow-hidden">
              <div className="relative h-48">
                <Image src={course.image || "/placeholder.svg"} alt={course.name} fill className="object-cover" />
                <div className="absolute right-2 top-2">
                  <Button variant="secondary" className="h-8">
                    {course.price}
                  </Button>
                </div>
              </div>
              <CardHeader>
                <CardTitle>{course.name}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between text-sm">
                  <div className="flex items-center">
                    <Users className="mr-1 h-4 w-4" />
                    {course.students} students
                  </div>
                  <div className="flex items-center">
                    <Clock className="mr-1 h-4 w-4" />
                    {course.hours} hours
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  className="w-full"
                  onClick={() => {
                    toast({
                      title: "Enrollment Successful",
                      description: `You have successfully enrolled in ${course.name}!`,
                    })
                  }}
                >
                  Enroll Now
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  )
}

