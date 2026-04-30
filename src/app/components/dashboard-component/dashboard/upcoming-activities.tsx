import { Card, CardContent, CardHeader, CardTitle } from "@/components/dashboard-component/ui/card"
import { CalendarDays } from "lucide-react"
import Link from "next/link"

export function UpcomingActivities() {
  const activities = [
    {
      id: 1,
      title: "Meeting with the...",
      date: "9:00 - 11:00",
      type: "Due soon",
    },
    {
      id: 2,
      title: "Meeting with the...",
      date: "10:00 - 11:00",
      type: "Upcoming",
    },
    {
      id: 3,
      title: "Class B middle s...",
      date: "10:00 - 11:00",
      type: "Upcoming",
    },
    {
      id: 4,
      title: "Send Mr Ayo cla...",
      date: "10:00 - 11:00",
      type: "Upcoming",
    },
  ]

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Upcoming Activities</CardTitle>
        <Link href="/calendar" className="text-sm text-purple-600">
          See all
        </Link>
      </CardHeader>
      <CardContent className="space-y-3">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-center gap-4 rounded-lg bg-muted/50 p-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100 text-purple-700">
              {activity.id}
            </div>
            <div className="flex-1">
              <div className="font-semibold">{activity.title}</div>
              <div className="flex items-center text-xs text-muted-foreground">
                <CalendarDays className="mr-1 h-3 w-3" />
                {activity.date}
              </div>
            </div>
            <div className="text-xs font-medium text-purple-600">{activity.type}</div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

