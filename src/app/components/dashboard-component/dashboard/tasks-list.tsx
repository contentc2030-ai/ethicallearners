"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/dashboard-component/ui/card"
import { Checkbox } from "@/components/dashboard-component/ui/checkbox"

export function TasksList() {
  const [tasks, setTasks] = useState([
    { id: 1, title: "Create Arabic lesson", completed: true },
    { id: 2, title: "Create homework", completed: true },
    { id: 3, title: "Make complain", completed: false },
    { id: 4, title: "Create English Exam", completed: false },
    { id: 5, title: "Reply message", completed: false },
  ])

  const toggleTask = (id: number) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ))
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Tasks</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {tasks.map((task) => (
          <div 
            key={task.id} 
            className="flex items-start space-x-2 cursor-pointer hover:bg-muted/50 rounded-md p-2 -m-2 transition-colors"
            onClick={() => toggleTask(task.id)}
          >
            <Checkbox 
              id={`task-${task.id}`} 
              checked={task.completed}
              onCheckedChange={() => toggleTask(task.id)}
            />
            <label
              htmlFor={`task-${task.id}`}
              className={`text-sm leading-none cursor-pointer peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${
                task.completed ? "text-muted-foreground line-through" : ""
              }`}
            >
              {task.title}
            </label>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

