import Image from 'next/image'

export default function Recognition() {
  const partners = [
    { name: 'Ministry of Commerce and Industry', logo: '/placeholder.svg?height=60&width=120' },
    { name: 'NSDC', logo: '/placeholder.svg?height=60&width=120' },
    { name: 'Startup India', logo: '/placeholder.svg?height=60&width=120' },
    { name: 'IIT Guwahati', logo: '/placeholder.svg?height=60&width=120' },
  ]

  return (
    <section className="bg-gray-800 py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-white mb-12">Recognized by</h2>
        <div className="flex flex-wrap justify-center items-center gap-8">
          {partners.map((partner, index) => (
            <div key={index} className="w-40 h-20 bg-white rounded-lg flex items-center justify-center p-4">
              <Image src={partner.logo} alt={partner.name} width={120} height={60} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

