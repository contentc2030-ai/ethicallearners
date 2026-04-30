import Image, { StaticImageData } from 'next/image';

interface ExpertCardProps {
    name: string;
    role: string;
    imageUrl: string | StaticImageData;
}

export function ExpertCard({ name, role, imageUrl }: ExpertCardProps) {
    return (
        <div className="bg-[#1D2A3F] rounded-lg pt-12 pb-6 px-4 relative border border-[#4CC9F0]/20 shadow-md text-center">
            {/* Image Container */}
            <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 w-36 h-36 rounded-lg overflow-hidden bg-gradient-to-b from-[#4CC9F0] to-[#0F1729] shadow-[0_0_20px_8px] shadow-[#375d67]">
                <Image
                    src={imageUrl}
                    alt={name}
                    width={144}
                    height={144}
                    className="w-full h-full object-cover"
                />
            </div>
            {/* Text Content */}
            <h3 className="mt-20 font-semibold text-xl text-white">{name}</h3>
            <p className="text-sm text-gray-400">{role}</p>
        </div>
    );
}
