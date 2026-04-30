import { Card, CardContent, CardHeader, CardTitle } from "@/components/dashboard-component/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/dashboard-component/ui/avatar"
import { Medal } from "lucide-react"

export function TopStudents() {
  const students = [
    { name: "Joshua Ashiru", points: 9.6, medal: "gold" },
    { name: "Adeola Ayo", points: 9.0, medal: "silver" },
    { name: "Olawuyi Tobi", points: 8.5, medal: "bronze" },
    { name: "Mayowa Ade", points: 7.0, medal: "none" },
  ]

  const medalColors = {
    gold: "text-yellow-500",
    silver: "text-gray-400",
    bronze: "text-amber-700",
    none: "text-muted-foreground",
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Top Performing Students</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {students.map((student) => (
          <div key={student.name} className="flex items-center justify-between rounded-lg bg-muted/50 p-3">
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarImage src="/placeholder-user.jpg" />
                <AvatarFallback>
                  {student.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div>
                <div className="font-semibold">{student.name}</div>
                <div className="text-sm text-muted-foreground">{student.points}/10 points</div>
              </div>
            </div>
            <Medal className={`h-5 w-5 ${medalColors[student.medal]}`} />
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

