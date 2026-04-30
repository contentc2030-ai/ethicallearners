"use client"

import { useState } from "react"
import { Layout } from "@/components/dashboard-component/dashboard-layout"
import { Button } from "@/components/dashboard-component/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/dashboard-component/ui/card"
import { Plus } from "lucide-react"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"

export default function TasksPage() {
  const { toast } = useToast()
  const [tasks, setTasks] = useState([
    { id: 1, title: "Arabic Lesson 1", type: "homework", completed: false },
    { id: 2, title: "English Exam", type: "exam", completed: false },
    { id: 3, title: "Math Quiz", type: "quiz", completed: false },
  ])

  const toggleTask = (id: number) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ))
    const task = tasks.find(t => t.id === id)
    toast({
      title: task?.completed ? "Task Marked Incomplete" : "Task Completed",
      description: `${task?.title} has been ${task?.completed ? "marked as incomplete" : "completed"}`,
    })
  }

  return (
    <Layout>
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">Tasks & Homework</h2>
          <Button 
            onClick={() => {
              toast({
                title: "Add New Task",
                description: "Opening task creation form...",
              })
            }}
          >
            <Plus className="mr-2 h-4 w-4" />
            Add New Task
          </Button>
        </div>
        <div className="grid gap-4">
          {tasks.map((task) => (
            <Card 
              key={task.id} 
              className={`cursor-pointer transition-all hover:shadow-md ${
                task.completed ? "opacity-75" : ""
              }`}
              onClick={() => toggleTask(task.id)}
            >
              <CardHeader>
                <CardTitle className={task.completed ? "line-through text-muted-foreground" : ""}>
                  {task.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="capitalize text-sm text-muted-foreground">Type: {task.type}</p>
                {task.completed && (
                  <p className="text-sm text-primary mt-2">✓ Completed</p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  )
}

