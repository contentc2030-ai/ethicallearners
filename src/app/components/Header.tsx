import Link from 'next/link'
import Image from 'next/image'

export default function Header() {
  return (
    <header className="bg-gray-900 text-white p-4">
      <nav className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">
          <Image width={0} height={0}  src="/placeholder.svg?height=40&width=120" alt="Ethical Learner Logo" className="h-10" />
        </Link>
        <ul className="flex space-x-4">
          <li><Link href="/full-stack">Full Stack - MERN</Link></li>
          <li><Link href="/data-science">Data Science & Gen-AI</Link></li>
          <li><Link href="/level-up">Level Up</Link></li>
        </ul>
        <div className="flex space-x-4">
          <Link href="/sign-in" className="text-white hover:text-green-400">Sign In</Link>
          <Link href="/request-callback" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
            Request Callback
          </Link>
        </div>
      </nav>
    </header>
  )
}

