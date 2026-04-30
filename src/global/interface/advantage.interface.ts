import { Activity, TrendingUp, Headphones, Users } from "lucide-react"


 interface Advantage {
    icon: keyof typeof icons
    title: string
    description: string
    iconBg: string
  }


  const icons = {
    Activity,
    TrendingUp,
    Headphones,
    Users,
  }


  export interface CampusAdvantagesProps {
    title: string
    description: string
    advantages: Advantage[]
  }