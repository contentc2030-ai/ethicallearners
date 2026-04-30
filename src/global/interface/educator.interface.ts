
 interface Educator {
    name: string
    image: string
    badge: {
      type: "LEGEND" | "EXPERT" | "STAR" | "RISING STAR"
      color: string
    }
    credentials: string
    stats: {
      watchMins: string
      followers: string
    }
  }


  export interface EducatorsSectionProps {
    features: string[]
    educators: Educator[]
  }