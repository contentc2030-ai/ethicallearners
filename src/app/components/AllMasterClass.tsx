import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const masterclasses = [
  {
    title: "React Mastery",
    description: "Learn React from scratch to advanced.",
    image: "/placeholder.svg?height=200&width=300&text=Ethical+Hacking",
    status: "Upcoming",
    duration: "16 Mar, 2024 - 12:00 PM",
    category: "Web Development",
  },
  {
    title: "Django Deep Dive",
    description: "Master Django and build powerful web apps.",
    image: "/placeholder.svg?height=200&width=300&text=Ethical+Hacking",
    status: "Ongoing",
    duration: "90 Minutes",
    category: "Backend Development",
  },
  // Add more masterclasses here
];

export default function AllMasterClass() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const filteredMasterclasses = masterclasses.filter((mc) =>
    (filter === "All" || mc.category === filter) &&
    mc.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold text-white mb-6">All Masterclasses</h1>
      <div className="flex justify-between items-center mb-6">
        <Input
          placeholder="Search masterclasses..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-1/3 bg-[#131B2E] border-[#4CC9F0]/20 text-white"
        />
        <Select onValueChange={setFilter}>
          <SelectTrigger className="w-48 bg-[#131B2E] border-[#4CC9F0]/20 text-white">
            <SelectValue placeholder="Filter by Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All</SelectItem>
            <SelectItem value="Web Development">Web Development</SelectItem>
            <SelectItem value="Backend Development">Backend Development</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMasterclasses.map((masterclass, index) => (
          <Card
            key={index}
            className="flex-none w-[300px] bg-[#131B2E] border-[#4CC9F0]/20 snap-start relative"
          >
            <div className="relative">
              <h3 className="absolute top-2 right-2 px-3 py-1 text-sm font-semibold text-[#4CC9F0] bg-[#0F1729] border border-[#4CC9F0]/50 rounded-xl">
                {masterclass.status}
              </h3>
              <Image
                src={masterclass.image}
                alt={masterclass.title}
                width={300}
                height={200}
                className="w-full h-[200px] object-cover rounded-t-lg"
              />
            </div>
            <div className="p-4 space-y-4">
              <h3 className="font-semibold text-white">{masterclass.title}</h3>
              <p className="text-gray-400 text-sm">{masterclass.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-white text-sm font-semibold">{masterclass.duration}</span>
                <Button variant="outline" className="border-[#4CC9F0] bg-[#4CC9F0] text-[#0F1729]">
                  Register
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}