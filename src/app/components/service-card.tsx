import { type LucideIcon } from 'lucide-react'

interface ServiceCardProps {
    icon: LucideIcon
    title: string
    description: string
    size?: 'normal' | 'large'
}

export function ServiceCard({ icon: Icon, title, description, size = 'normal' }: ServiceCardProps) {
    return (
        <div className={`bg-[#1D2A3F] rounded-lg p-6 border border-[#4CC9F0]/20 ${size === 'large' ? 'w-full h-[300px]' : 'w-40 h-40'} mb-6`}>
            <Icon className="w-12 h-12 text-[#4CC9F0] mb-4" />
            <h3 className="font-semibold text-[#4CC9F0] mb-2">{title}</h3>
            <p className="text-sm text-gray-300">{description}</p>
        </div>
    )
}
