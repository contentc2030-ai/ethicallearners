"use client"

import { Layout } from "@/components/dashboard-component/dashboard-layout"
import { Button } from "@/components/dashboard-component/ui/button"
import { Card, CardContent } from "@/components/dashboard-component/ui/card"
import { Plus } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"

export default function ClassesPage() {
  const { toast } = useToast()
  const classes = [
    { id: 1, name: "Class A Arabic" },
    { id: 2, name: "Class B Arabic" },
    { id: 3, name: "Class C Arabic" },
    { id: 4, name: "Class D Arabic" },
    { id: 5, name: "Class E Arabic" },
  ]

  return (
    <Layout>
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">Classes</h2>
          <Button 
            onClick={() => {
              toast({
                title: "Add New Class",
                description: "Opening class creation form...",
              })
            }}
          >
            <Plus className="mr-2 h-4 w-4" />
            Add New Class
          </Button>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {classes.map((cls) => (
            <Link href={`/classes/${cls.id}`} key={cls.id}>
              <Card className="hover:bg-muted/50 transition-colors">
                <CardContent className="p-6">
                  <div className="flex flex-col items-center gap-4">
                    <Image
                      src="/placeholder.svg"
                      alt="Class illustration"
                      width={200}
                      height={200}
                      className="rounded-lg"
                    />
                    <h3 className="text-lg font-semibold">{cls.name}</h3>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </Layout>
  )
}

