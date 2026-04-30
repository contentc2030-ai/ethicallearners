import { MessageCircle, Users, UserCheck, Award, Rocket, Headphones } from 'lucide-react'

const ecosystemItems = [
  { icon: MessageCircle, title: '1:1 Doubt Support', description: 'Get your doubts cleared FAST by IITians and top Ethical Learner grads' },
  { icon: Users, title: 'Unlimited Mock Interviews', description: 'Get ready for interviews before ACTUAL interviews' },
  { icon: UserCheck, title: 'Dedicated Success Manager', description: 'Your Success BUDDY, for all your program questions!' },
  { icon: Rocket, title: 'Geekathon', description: 'The BEST way to learn is to build awesome projects with peers' },
  { icon: Award, title: 'Virtual Internship', description: 'Get the experience before you get the job. We make it happen!' },
  { icon: Headphones, title: 'Soft-Skills Training', description: 'Speak confidently, work and learn in teams, and get hired!' },
]

export default function LearningEcosystem() {
  return (
    <section className="bg-gray-800 py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-white mb-12">Comprehensive Learning Ecosystem</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {ecosystemItems.map((item, index) => (
            <div key={index} className="bg-gray-700 rounded-lg p-6">
              <item.icon className="w-12 h-12 text-green-400 mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
              <p className="text-gray-300">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

