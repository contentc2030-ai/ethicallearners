import { Card, CardContent, CardHeader, CardTitle } from "@/components/dashboard-component/ui/card"

export function WorkloadChart() {
  const data = [4, 5, 3, 6, 4, 4, 4]
  const maxValue = Math.max(...data)

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium">
          Workload
          <span className="ml-2 text-xs text-muted-foreground">Apr 10 - Apr 17</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex h-[150px] items-end gap-2 pr-6">
          {data.map((value, i) => (
            <div
              key={i}
              className="flex-1 bg-primary/20 transition-all hover:bg-primary/40"
              style={{
                height: `${(value / maxValue) * 100}%`,
              }}
            />
          ))}
        </div>
        <div className="mt-2 flex justify-between text-sm text-muted-foreground">
          <div>M</div>
          <div>T</div>
          <div>W</div>
          <div>T</div>
          <div>F</div>
          <div>S</div>
          <div>S</div>
        </div>
      </CardContent>
    </Card>
  )
}

