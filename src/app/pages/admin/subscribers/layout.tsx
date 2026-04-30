'use client';

import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Check if user is authenticated
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/admin/auth/verify');
        if (!response.ok) {
          router.push('/pages/admin/login');
          return;
        }
        setIsAuthenticated(true);
      } catch (error) {
        router.push('/pages/admin/login');
      }
    };

    checkAuth();
  }, [router]);

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-200">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-gray-800 dark:bg-gray-950 min-h-screen ">
          <div className="flex items-center justify-center h-16 bg-gray-900 dark:bg-black">
            <h1 className="text-white text-xl font-bold">Admin Panel</h1>
          </div>
          <nav className="mt-5">
            <Link
              href="/pages/admin/blog"
              className={`flex items-center px-6 py-3 text-gray-100 hover:bg-gray-700 dark:hover:bg-gray-800 ${
                pathname === '/pages/admin/blog' ? 'bg-gray-700 dark:bg-gray-800' : ''
              }`}
            >
              <span>Blog Management</span>
            </Link>
            <Link
              href="/pages/admin/Course"
              className={`flex items-center px-6 py-3 text-gray-100 hover:bg-gray-700 dark:hover:bg-gray-800 ${
                pathname === '/pages/admin/Course' ? 'bg-gray-700 dark:bg-gray-800' : ''
              }`}
            >
              <span>Course Management</span>
            </Link>
            <Link
              href="/pages/admin/subscribers"
              className={`flex items-center px-6 py-3 text-gray-100 hover:bg-gray-700 dark:hover:bg-gray-800 ${
                pathname === '/pages/admin/subscribers' ? 'bg-gray-700 dark:bg-gray-800' : ''
              }`}
            >
              <span>Subscriber Management</span>
            </Link>
            <Link
              href="/pages/admin/forms"
              className={`flex items-center px-6 py-3 text-gray-100 hover:bg-gray-700 ${
                pathname === '/pages/admin/forms' ? 'bg-gray-700' : ''
              }`}
            >
              <span>Form Submissions</span>
            </Link>
            <button
              onClick={async () => {
                await fetch('/api/admin/auth/logout', { method: 'POST' });
                router.push('/pages/admin/login');
              }}
              className="w-full flex items-center px-6 py-3 text-gray-100 hover:bg-gray-700 dark:hover:bg-gray-800"
            >
              <span>Logout</span>
            </button>
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          <main className="">{children}</main>
        </div>
      </div>
    </div>
  );
} 