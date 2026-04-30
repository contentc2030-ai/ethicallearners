import { Card, CardContent, CardHeader, CardTitle } from "@/components/dashboard-component/ui/card"

export function WeeklyProgress() {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium">Weekly Progress</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center">
          <div className="relative h-40 w-40">
            <svg className="h-full w-full" viewBox="0 0 100 100">
              <circle className="stroke-muted stroke-2" cx="50" cy="50" r="45" fill="none" />
              <circle
                className="stroke-primary stroke-2"
                cx="50"
                cy="50"
                r="45"
                fill="none"
                strokeDasharray="282.7"
                strokeDashoffset={282.7 * (1 - 25 / 50)}
                transform="rotate(-90 50 50)"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className="text-3xl font-bold">25</div>
              <div className="text-sm text-muted-foreground">Out of 50</div>
            </div>
          </div>
          <p className="mt-2 text-sm text-muted-foreground">lessons this week</p>
        </div>
      </CardContent>
    </Card>
  )
}

