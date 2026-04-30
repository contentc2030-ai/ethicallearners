import Link from 'next/link'
import Image from 'next/image'
const courses = [
  { title: 'FREE TYPESCRIPT', duration: '4 hour', level: 'Intermediate', image: '/placeholder.svg?height=200&width=300' },
  { title: 'GOOGLE SHEETS', duration: '11 Hours', level: 'Beginner', image: '/placeholder.svg?height=200&width=300' },
  { title: 'TAILWIND COURSE', duration: '2 hour 50 min', level: 'Beginner', image: '/placeholder.svg?height=200&width=300' },
]

export default function CertificationCourses() {
  return (
    <section className="bg-gray-900 py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-white mb-12">Certification Courses</h2>
        <div className="flex flex-wrap -mx-4">
          {courses.map((course, index) => (
            <div key={index} className="w-full md:w-1/3 px-4 mb-8">
              <div className="bg-gray-800 rounded-lg overflow-hidden">
                <Image  width={0} height={0}  src={course.image} alt={course.title} className="w-full h-48 object-cover" />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-2">{course.title}</h3>
                  <p className="text-gray-400 mb-4">{course.duration} • {course.level}</p>
                  <Link href={`/course/${course.title.toLowerCase().replace(' ', '-')}`} className="text-green-400 hover:text-green-300">
                    Learn more
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

