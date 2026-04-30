import { ArrowRight, Download, LucideIcon } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import Link from 'next/link'

interface CourseCardProps {
  subtitle: string
  title: string
  icon: LucideIcon
  courseName: string
  partners: string[]
  batchSize: number
  duration: string
  features: string[]
  name:string
}

export function CourseCard({
  subtitle,
  title,
  icon: Icon,
  courseName,
  partners,
  batchSize,
  duration,
  features,
  name
}: CourseCardProps) {
  return (
    <Card className="max-w-sm bg-[#131B2E] text-white border border-[#4CC9F0]/20 shadow-lg shadow-[#4CC9F0]/5">
      <CardHeader className="space-y-6">
        <div className="space-y-2 flex items-center justify-between">
          <div>
            <p className="text-sm text-[#4CC9F0]">{subtitle}</p>
            <h3 className="text-3xl font-semibold">
              <span className="text-[#4CC9F0]">{title.split(' ')[0]}</span>
              <br />
              {title.split(' ').slice(1).join(' ')}
            </h3>
          </div>
          <div className="relative w-24 h-24">
            <div className="absolute inset-0 bg-[#4CC9F0]/10 rounded-lg" />
            <Icon className="w-12 h-12 text-[#4CC9F0] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
          </div>
        </div>
        <h2 className="text-2xl font-bold text-[#4CC9F0]">{courseName}</h2>
        <div className="flex flex-wrap gap-2 text-sm">
          <span className="text-gray-400">Partnered with</span>
          {partners.map((partner, index) => (
            <span key={index} className="font-medium text-gray-300">
              {partner}
              {index < partners.length - 1 && index !== partners.length - 2 && ", "}
              {index === partners.length - 2 && " and "}
            </span>
          ))}
        </div>
        <div className="flex flex-wrap gap-3">
          <div className="flex items-center gap-2 bg-[#1D2A3F] px-3 py-1.5 rounded-md text-sm">
            <Icon className="w-4 h-4 text-[#4CC9F0]" />
            Batch Size: {batchSize}
          </div>
          <div className="flex items-center gap-2 bg-[#1D2A3F] px-3 py-1.5 rounded-md text-sm text-[#4CC9F0]">
            <Icon className="w-4 h-4" />
            Duration: {duration}
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <ul className="space-y-3">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center gap-2 text-sm text-gray-300">
              <div className="w-1.5 h-1.5 rounded-full bg-[#4CC9F0]" />
              {feature}
            </li>
          ))}
        </ul>
        <div className="flex flex-wrap gap-3">
          <Button
            variant="outline"
            className="w-full border-[#4CC9F0]/20 bg-[#1D2A3F] text-[#4CC9F0] hover:bg-[#4CC9F0]/10 hover:text-white"
          >
            <Download className="mr-2 h-4 w-4" />
            Download Brochure
          </Button>
          <Link className='w-full' href={`/pages/courses/${name}`}>
          <Button
            className="w-full bg-[#4CC9F0] text-[#0F1729] hover:bg-[#4CC9F0]/90"
          >
            Learn more

            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
            </Link>
        </div>
      </CardContent>
    </Card>
  )
}

