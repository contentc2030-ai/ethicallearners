"use client"

import { Layout } from "@/components/dashboard-component/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/dashboard-component/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/dashboard-component/ui/tabs"
import {
  Bar,
  BarChart,
  Line,
  LineChart,
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts"

export default function ResultsPage() {
  const performanceData = [
    { subject: "Arabic", score: 85, average: 75 },
    { subject: "Islamic Studies", score: 92, average: 78 },
    { subject: "Quran", score: 88, average: 80 },
    { subject: "History", score: 78, average: 72 },
  ]

  const monthlyProgress = [
    { month: "Jan", score: 75 },
    { month: "Feb", score: 82 },
    { month: "Mar", score: 88 },
    { month: "Apr", score: 85 },
    { month: "May", score: 90 },
  ]

  const skillsData = [
    { subject: "Reading", A: 120, fullMark: 150 },
    { subject: "Writing", A: 98, fullMark: 150 },
    { subject: "Listening", A: 86, fullMark: 150 },
    { subject: "Speaking", A: 99, fullMark: 150 },
    { subject: "Grammar", A: 85, fullMark: 150 },
  ]

  return (
    <Layout>
      <div className="flex-1 space-y-8 p-8 pt-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Final Results</h2>
          <p className="text-muted-foreground">View your performance analytics</p>
        </div>

        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="progress">Progress</TabsTrigger>
            <TabsTrigger value="skills">Skills Analysis</TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Subject Performance Comparison</CardTitle>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={performanceData}>
                    <XAxis dataKey="subject" />
                    <YAxis />
                    <Bar dataKey="score" fill="hsl(var(--primary))" />
                    <Bar dataKey="average" fill="hsl(var(--muted))" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="progress" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Monthly Progress</CardTitle>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={monthlyProgress}>
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Line type="monotone" dataKey="score" stroke="hsl(var(--primary))" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="skills" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Skills Radar</CardTitle>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={skillsData}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="subject" />
                    <PolarRadiusAxis />
                    <Radar
                      name="Skills"
                      dataKey="A"
                      stroke="hsl(var(--primary))"
                      fill="hsl(var(--primary))"
                      fillOpacity={0.5}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  )
}

