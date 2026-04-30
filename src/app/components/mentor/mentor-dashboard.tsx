"use client";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/dashboard-component/ui/card";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/dashboard-component/ui/avatar";
import { Badge } from "@/components/dashboard-component/ui/badge";
import { Progress } from "@/components/dashboard-component/ui/progress";
import { Users, BookOpen, Award, Clock } from "lucide-react";

// Mock data
const courseData = [
  { name: "CS101", students: 24, avgScore: 78, color: "#4CC9F0" },
  { name: "CS201", students: 18, avgScore: 82, color: "#F72585" },
  { name: "CS301", students: 15, avgScore: 75, color: "#7209B7" },
  { name: "CS401", students: 12, avgScore: 88, color: "#3A0CA3" },
];

const attendanceData = [
  { name: "Present", value: 78, color: "#4ade80" },
  { name: "Absent", value: 12, color: "#f87171" },
  { name: "Late", value: 10, color: "#facc15" },
];

const topStudents = [
  {
    id: "1",
    name: "John Doe",
    course: "CS401",
    score: 98,
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "2",
    name: "Jane Smith",
    course: "CS201",
    score: 96,
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "3",
    name: "Alex Johnson",
    course: "CS301",
    score: 95,
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "4",
    name: "Sarah Williams",
    course: "CS101",
    score: 94,
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "5",
    name: "Michael Brown",
    course: "CS401",
    score: 93,
    avatar: "/placeholder.svg?height=40&width=40",
  },
];

const mentorStats = {
  name: "Dr. Alan Turing",
  role: "Senior Cybersecurity Mentor",
  courses: 4,
  students: 69,
  rating: 4.8,
  experience: "8+ years",
  expertise: [
    "Network Security",
    "Ethical Hacking",
    "Digital Forensics",
    "Cryptography",
  ],
  avatar: "/placeholder.svg?height=100&width=100",
};

export default function MentorDashboard() {
  return (
    <div className="space-y-6">
      {/* Top Row - Mentor Profile and Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-[#1D2A3F] border-[#4CC9F0]/20 md:col-span-1">
          <CardHeader>
            <CardTitle className="text-white">Mentor Profile</CardTitle>
            <CardDescription className="text-white">
              Your information
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center text-center">
            <Avatar className="h-24 w-24 mb-4">
              <AvatarImage src={mentorStats.avatar} alt={mentorStats.name} />
              <AvatarFallback className="bg-[#131B2E] text-[#4CC9F0]">
                {mentorStats.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <h3 className="text-xl font-bold">{mentorStats.name}</h3>
            <p className="text-[#4CC9F0] mb-2">{mentorStats.role}</p>
            <div className="flex flex-wrap justify-center gap-2 mt-2">
              {mentorStats.expertise.map((skill, i) => (
                <Badge
                  key={i}
                  variant="outline"
                  className="border-[#4CC9F0]/50 text-[#4CC9F0]">
                  {skill}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#1D2A3F] border-[#4CC9F0]/20 md:col-span-2">
          <CardHeader>
            <CardTitle className="text-white">Overview</CardTitle>
            <CardDescription className="text-white">
              Your teaching statistics
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-[#131B2E] p-4 rounded-lg flex flex-col items-center">
                <div className="bg-[#4CC9F0]/20 p-2 rounded-full mb-2">
                  <BookOpen className="h-6 w-6 text-[#4CC9F0]" />
                </div>
                <div className="text-2xl font-bold">{mentorStats.courses}</div>
                <div className="text-xs text-white">Courses</div>
              </div>
              <div className="bg-[#131B2E] p-4 rounded-lg flex flex-col items-center">
                <div className="bg-[#F72585]/20 p-2 rounded-full mb-2">
                  <Users className="h-6 w-6 text-[#F72585]" />
                </div>
                <div className="text-2xl font-bold">{mentorStats.students}</div>
                <div className="text-xs text-white">Students</div>
              </div>
              <div className="bg-[#131B2E] p-4 rounded-lg flex flex-col items-center">
                <div className="bg-[#7209B7]/20 p-2 rounded-full mb-2">
                  <Award className="h-6 w-6 text-[#7209B7]" />
                </div>
                <div className="text-2xl font-bold">{mentorStats.rating}</div>
                <div className="text-xs text-white">Rating</div>
              </div>
              <div className="bg-[#131B2E] p-4 rounded-lg flex flex-col items-center">
                <div className="bg-[#3A0CA3]/20 p-2 rounded-full mb-2">
                  <Clock className="h-6 w-6 text-[#3A0CA3]" />
                </div>
                <div className="text-2xl font-bold">
                  {mentorStats.experience}
                </div>
                <div className="text-xs text-white">Experience</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Middle Row - Course Stats and Attendance */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-[#1D2A3F] border-[#4CC9F0]/20">
          <CardHeader>
            <CardTitle className="text-white">Course Statistics</CardTitle>
            <CardDescription className="text-white">
              Student enrollment and performance
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={courseData}
                  margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#2D3748" />
                  <XAxis dataKey="name" stroke="#A0AEC0" />
                  <YAxis stroke="#A0AEC0" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1D2A3F",
                      borderColor: "#4CC9F0",
                      color: "#FFFFFF",
                    }}
                    labelStyle={{ color: "#FFFFFF" }}
                  />
                  <Bar dataKey="students" name="Students" fill="#4CC9F0" />
                  <Bar dataKey="avgScore" name="Avg. Score" fill="#F72585" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#1D2A3F] border-[#4CC9F0]/20">
          <CardHeader>
            <CardTitle className="text-white">Attendance Overview</CardTitle>
            <CardDescription className="text-white">
              Overall attendance statistics
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            <div className="h-[250px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={attendanceData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                    label={({ name, percent }) =>
                      `${name} ${((percent ?? 0) * 100).toFixed(0)}%`
                    }
                    labelLine={false}>
                    {attendanceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1D2A3F",
                      borderColor: "#4CC9F0",
                      color: "#FFFFFF",
                    }}
                    labelStyle={{ color: "#FFFFFF" }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-center gap-4 mt-4">
              {attendanceData.map((entry, index) => (
                <div key={index} className="flex items-center">
                  <div
                    className="h-3 w-3 rounded-full mr-1"
                    style={{ backgroundColor: entry.color }}></div>
                  <span className="text-xs text-white">{entry.name}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Row - Top Students */}
      <Card className="bg-[#1D2A3F] border-[#4CC9F0]/20">
        <CardHeader>
          <CardTitle className="text-white">Top Performing Students</CardTitle>
          <CardDescription className="text-white">
            Students with highest scores
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {topStudents.map((student, index) => (
              <div
                key={student.id}
                className="flex items-center justify-between bg-[#131B2E] p-3 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center h-8 w-8 rounded-full bg-[#0F1729] text-[#4CC9F0] font-bold">
                    {index + 1}
                  </div>
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={student.avatar} alt={student.name} />
                    <AvatarFallback className="bg-[#4CC9F0]/20 text-[#4CC9F0]">
                      {student.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">{student.name}</div>
                    <div className="text-xs text-white">{student.course}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Progress
                    value={student.score}
                    className="w-24 h-2 bg-[#0F1729]"
                  />
                  <span className="text-sm font-medium">{student.score}%</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
