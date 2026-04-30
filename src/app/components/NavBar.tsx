"use client";
// 1. Added useEffect and useRef
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { ChevronDown, Menu, X } from "lucide-react";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { VisuallyHidden } from "@/components/ui/visually-hidden";
import { DialogTitle } from "./ui/dialog";
import Link from "next/link";
import navImg from "../assets/Learner.png";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";

export function NavBar() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const pathname = usePathname();
  const router = useRouter();

  // 2. Reference for the dropdown container
  const dropdownRef = useRef<HTMLDivElement>(null);

  const isUserDashboard = [
    "/doc",
    "/pages/userDashboard",
    "/pages/mentor",
  ].includes(pathname);

  // 3. Effect to handle clicking anywhere outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };

    if (dropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownOpen]);

  const navItems = [
    { label: "Summer Training", href: "/pages/summerTraining" },
    { label: "About Us ", href: "/pages/aboutus" },
    { label: "Blogs", href: "/pages/blog/blogs" },
    { label: "Terms And Condition", href: "/pages/terms" },
    {
      label: "Programmes",
      href: "#",
      hasDropdown: true,
      subItems: [
        { label: "Data Science & Gen-AI", href: "/pages/courses/dataScience" },
        {
          label: "Full-Stack Web Development",
          href: "/pages/courses/fullStack",
        },
        { label: "Cyber Security", href: "/pages/courses/cybersecurity" },
        { label: "Campus Training", href: "/pages/training/campus" },
        { label: "Corporate Training", href: "/pages/training/corporate" },
        { label: "View All Courses", href: "/pages/courses/allcourses" },
        { label: "View All MasterClass", href: "/pages/masterclass" },
        // { label: 'Individual Course', href: '/pages/individualCourse' },
      ],
    },
  ];

  const handleSignInClick = () => {
    router.push("/pages/auth");
  };

  return (
    <>
      {!isUserDashboard && (
        <nav className="flex items-center justify-between px-6 md:px-6 py-1 bg-[#0F1729] border-b border-[#4CC9F0]/20">
          <div className="flex items-center gap-8 h-20">
            {/* Logo */}
            <Link href={"/"}>
              <Image
                src={navImg}
                alt="CyberEdu"
                width={350}
                height={250}
                className="h-24 w-auto"
              />
            </Link>

            {/* Navigation Item */}
            <div className="hidden lg:flex items-center gap-6 text-gray-300">
              {navItems.map((item, index) => (
                // 4. Attach ref to the item wrapper
                <div
                  key={index}
                  className="relative"
                  ref={item.hasDropdown ? dropdownRef : null}>
                  {item.hasDropdown ? (
                    <div
                      className="flex items-center gap-1 cursor-pointer hover:text-[#4CC9F0] transition-colors"
                      onClick={() => setDropdownOpen(!dropdownOpen)}>
                      {item.label}
                      <ChevronDown className="h-4 w-4" />
                    </div>
                  ) : (
                    <Link
                      href={item.href}
                      className="hover:text-[#4CC9F0] transition-colors">
                      {item.label}
                    </Link>
                  )}
                  {item.hasDropdown && dropdownOpen && (
                    <div className="absolute left-0 mt-2 w-56 bg-[#1D2A3F] border border-[#4CC9F0]/20 rounded-lg shadow-lg z-50">
                      {item.subItems?.map((subItem, subIndex) => (
                        <Link
                          key={subIndex}
                          href={subItem.href}
                          onClick={() => {
                            setDropdownOpen(false);
                          }}
                          className="block px-4 py-2 text-gray-300 hover:bg-[#4CC9F0]/10 hover:text-[#4CC9F0] transition-colors">
                          {subItem.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Sign in button */}
          <div className="hidden lg:flex items-center gap-4">
            {/* <Button 
            variant="ghost" 
            className="text-gray-300 hover:text-[#4CC9F0] hover:bg-[#4CC9F0]/10"
            onClick={handleSignInClick}
          >
            Sign In
          </Button> */}
            <Button
              className="bg-[#4CC9F0] hover:bg-[#4CC9F0]/90 text-white"
              onClick={handleSignInClick}>
              Sign In
            </Button>
          </div>

          {/* burger navigation sheet for small screen */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="icon" className="text-gray-300">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>

            {isOpen && (
              <SheetContent
                side="right"
                className="w-[300px] sm:w-[400px] bg-[#0F1729] border-l border-[#4CC9F0]/20 p-0">
                <VisuallyHidden>
                  <DialogTitle>Navigation Menu</DialogTitle>
                </VisuallyHidden>
                <div className="flex flex-col h-full">
                  <div className="flex justify-between items-center py-4 px-6 border-b border-[#4CC9F0]/20">
                    <Image
                      src="/placeholder.svg?height=32&width=120&text=CyberEdu"
                      alt="CyberEdu"
                      width={120}
                      height={32}
                      className="h-8 w-auto"
                    />
                    <SheetTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-gray-300">
                        <X className="h-6 w-6" />
                        <span className="sr-only">Close menu</span>
                      </Button>
                    </SheetTrigger>
                  </div>

                  <nav className="flex flex-col gap-4 py-6 px-6">
                    {navItems.map((item, index) => (
                      <div key={index} className="relative">
                        {item.hasDropdown ? (
                          <div
                            className="flex items-center justify-between text-gray-300 hover:text-[#4CC9F0] transition-colors py-2 cursor-pointer"
                            onClick={() => setDropdownOpen(!dropdownOpen)}>
                            {item.label}
                            <ChevronDown className="h-4 w-4" />
                          </div>
                        ) : (
                          <Link
                            href={item.href}
                            className="block text-gray-300 hover:text-[#4CC9F0] transition-colors py-2"
                            onClick={() => setIsOpen(false)}>
                            {item.label}
                          </Link>
                        )}
                        {item.hasDropdown && dropdownOpen && (
                          <div className="pl-4 mt-2 space-y-2">
                            {item.subItems?.map((subItem, subIndex) => (
                              <Link
                                key={subIndex}
                                href={subItem.href}
                                className="block text-gray-400 hover:text-[#4CC9F0] transition-colors"
                                onClick={() => setIsOpen(false)}>
                                {subItem.label}
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </nav>

                  <div className="mt-auto flex flex-col gap-4 py-6 px-6 border-t border-[#4CC9F0]/20">
                    <Button
                      variant="ghost"
                      className="text-gray-300 hover:text-[#4CC9F0] hover:bg-[#4CC9F0]/10 w-full justify-start"
                      onClick={() => setIsOpen(false)}>
                      Sign In
                    </Button>
                    <Button
                      className="bg-[#4CC9F0] hover:bg-[#4CC9F0]/90 text-white w-full"
                      onClick={() => setIsOpen(false)}>
                      Request Demo
                      <span className="ml-1" aria-hidden="true">
                        📞
                      </span>
                    </Button>
                  </div>
                </div>
              </SheetContent>
            )}
          </Sheet>
        </nav>
      )}
    </>
  );
}
