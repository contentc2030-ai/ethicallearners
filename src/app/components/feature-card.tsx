import Image from 'next/image'

interface FeatureCardProps {
    title: string
    description: string
    imageUrl: string
}

export function FeatureCard({ title, description, imageUrl }: FeatureCardProps) {
    return (
        <div className="bg-[#0c192e] rounded-lg p-8 shadow-md border border-[#4CC9F0]/20 h-[400px] flex flex-col items-center">
            {/* Image Container */}
            <div className="w-[95%] h-[180px] bg-gradient-to-b from-[#4CC9F0] to-[#0F1729] rounded-md overflow-hidden mb-6 flex justify-center items-center">
                <Image
                    src={imageUrl}
                    alt={title}
                    width={400} // Increased width for larger screens
                    height={160} // Rectangular aspect ratio
                    className="w-full h-full object-cover"
                />
            </div>
            {/* Text Content */}
            <h3 className="font-semibold text-[#4CC9F0] text-2xl mb-4 text-center">{title}</h3>
            <p className="text-lg text-gray-300 text-center">{description}</p>
        </div>
    )
}
