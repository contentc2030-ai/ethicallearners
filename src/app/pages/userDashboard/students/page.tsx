"use client"

import { Layout } from "@/components/dashboard-component/dashboard-layout"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/dashboard-component/ui/avatar"
import { Button } from "@/components/dashboard-component/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/dashboard-component/ui/table"
import { Plus } from "lucide-react"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"

export default function StudentsPage() {
  const { toast } = useToast()
  const students = [
    { id: 1, name: "Joshua Ashiru", email: "j.ashiru@example.com", grade: "A" },
    { id: 2, name: "Adeola Ayo", email: "a.ayo@example.com", grade: "A" },
    { id: 3, name: "Olawuyi Tobi", email: "o.tobi@example.com", grade: "B+" },
  ]

  return (
    <Layout>
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">My Students</h2>
          <Button 
            onClick={() => {
              toast({
                title: "Add New Student",
                description: "Opening student registration form...",
              })
            }}
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Student
          </Button>
        </div>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Grade</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {students.map((student) => (
                <TableRow 
                  key={student.id}
                  className="cursor-pointer hover:bg-muted/50 transition-colors"
                  onClick={() => {
                    toast({
                      title: "Student Profile",
                      description: `Viewing profile for ${student.name}`,
                    })
                  }}
                >
                  <TableCell>
                    <div className="flex items-center gap-4">
                      <Avatar>
                        <AvatarImage src="/placeholder-user.jpg" />
                        <AvatarFallback>
                          {student.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      {student.name}
                    </div>
                  </TableCell>
                  <TableCell>{student.email}</TableCell>
                  <TableCell>{student.grade}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </Layout>
  )
}

