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
    <div className="min-h-screen bg-gradient-to-b from-[#0F1729] via-[#131B2E] to-[#0F1729] text-white">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-[#131B2E] min-h-screen border-r border-[#4CC9F0]/20">
          <div className="flex items-center justify-center h-16 bg-[#0F1729]">
            <h1 className="text-[#4CC9F0] text-xl font-bold">Admin Panel</h1>
          </div>
          <nav className="mt-5">
            <Link
              href="/pages/admin/blog"
              className={`flex items-center px-6 py-3 text-gray-100 hover:bg-[#1D2A3F] ${
                pathname === '/pages/admin/blog' ? 'bg-[#1D2A3F] text-[#4CC9F0]' : ''
              }`}
            >
              <span>Blog Management</span>
            </Link>
            <Link
              href="/pages/admin/Course"
              className={`flex items-center px-6 py-3 text-gray-100 hover:bg-[#1D2A3F] ${
                pathname === '/pages/admin/Course' ? 'bg-[#1D2A3F] text-[#4CC9F0]' : ''
              }`}
            >
              <span>Course Management</span>
            </Link>
            <Link
              href="/pages/admin/subscribers"
              className={`flex items-center px-6 py-3 text-gray-100 hover:bg-[#1D2A3F] ${
                pathname === '/pages/admin/subscribers' ? 'bg-[#1D2A3F] text-[#4CC9F0]' : ''
              }`}
            >
              <span>Subscriber Management</span>
            </Link>
            <Link
              href="/pages/admin/forms"
              className={`flex items-center px-6 py-3 text-gray-100 hover:bg-[#1D2A3F] ${
                pathname === '/pages/admin/forms' ? 'bg-[#1D2A3F] text-[#4CC9F0]' : ''
              }`}
            >
              <span>Form Submissions</span>
            </Link>
            <button
              onClick={async () => {
                await fetch('/api/admin/auth/logout', { method: 'POST' });
                router.push('/pages/admin/login');
              }}
              className="w-full flex items-center px-6 py-3 text-gray-100 hover:bg-[#1D2A3F]"
            >
              <span>Logout</span>
            </button>
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          <main>{children}</main>
        </div>
      </div>
    </div>
  );
} 