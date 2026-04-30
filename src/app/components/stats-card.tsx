interface StatsCardProps {
  value: string
  label: string
  className?: string
}

export function StatsCard({ value, label, className = "" }: StatsCardProps) {
  return (
    <div className={`p-4 rounded-xl ${className}`}>
      <div className="text-2xl md:text-3xl font-bold text-[#4CC9F0] mb-1">{value}</div>
      <div className="text-sm text-gray-400">{label}</div>
    </div>
  )
}
