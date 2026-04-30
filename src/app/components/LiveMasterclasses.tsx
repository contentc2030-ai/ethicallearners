import Image from 'next/image'
import Link from 'next/link'

const masterclasses = [
  {
    title: 'Learn to make a dashboard like Swiggy using Google Sheets',
    instructor: 'Krishna Madan',
    company: 'Ethical Learner',
    date: '16 Mar, 2024',
    registrations: 542,
    image: '/placeholder.svg?height=200&width=300'
  },
  {
    title: 'Introduction to Node.Js: Learn to Build APIs',
    instructor: 'Mainak Ghosh',
    company: 'ION Trading',
    registrations: 1194,
    image: '/placeholder.svg?height=200&width=300'
  },
  {
    title: 'Learn Array in Data Structures',
    instructor: 'Ashish Gupta',
    company: 'Uber',
    registrations: 664,
    image: '/placeholder.svg?height=200&width=300'
  },
  {
    title: 'Prompt Engineering Using ChatGPT',
    instructor: 'Sagar Udasi',
    company: 'Ethical Learner',
    registrations: 1038,
    image: '/placeholder.svg?height=200&width=300'
  }
]

export default function LiveMasterclasses() {
  return (
    <section className="bg-gray-900 py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-white mb-4">Discover, Learn & Grow with our Free Resources</h2>
        <h3 className="text-xl font-semibold text-center text-green-400 mb-12">Live Masterclasses</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {masterclasses.map((masterclass, index) => (
            <div key={index} className="bg-gray-800 rounded-lg overflow-hidden">
              <Image src={masterclass.image} alt={masterclass.title} width={300} height={200} className="w-full h-40 object-cover" />
              <div className="p-4">
                <h4 className="text-lg font-semibold text-white mb-2">{masterclass.title}</h4>
                <p className="text-sm text-gray-400 mb-2">By {masterclass.instructor} | {masterclass.company}</p>
                {masterclass.date && (
                  <p className="text-sm text-gray-400 mb-2">{masterclass.date}</p>
                )}
                <p className="text-sm text-green-400 mb-4">{masterclass.registrations} Already Registered</p>
                <Link href="#" className="inline-block bg-green-500 text-white px-4 py-2 rounded text-sm hover:bg-green-600 transition-colors">
                  {index === 0 ? 'Register Now' : 'Preview'}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

