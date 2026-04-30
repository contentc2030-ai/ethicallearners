"use client";

import { useState, useEffect, useCallback } from "react";
import {
  format,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameDay,
  isToday,
} from "date-fns";
import {
  CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Check,
  X,
  Clock,
  Loader2,
  Save,
} from "lucide-react";
import { Button } from "@/components/dashboard-component/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/dashboard-component/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/dashboard-component/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/dashboard-component/ui/table";
import { Badge } from "@/components/dashboard-component/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

// Types
interface Student {
  id: string;
  name: string;
  email: string;
  studentId: string;
}

interface Course {
  id: string;
  name: string;
  code: string;
}

interface AttendanceRecord {
  studentId: string;
  status: "present" | "absent" | "late";
}

interface AttendanceData {
  date: string;
  courseId: string;
  records: AttendanceRecord[];
}

// Mock data
const mockCourses: Course[] = [
  { id: "1", name: "Cybersecurity Fundamentals", code: "CS101" },
  { id: "2", name: "Network Security", code: "CS201" },
  { id: "3", name: "Ethical Hacking", code: "CS301" },
  { id: "4", name: "Digital Forensics", code: "CS401" },
];

const mockStudents: Student[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john.doe@example.com",
    studentId: "STU001",
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    studentId: "STU002",
  },
  {
    id: "3",
    name: "Alex Johnson",
    email: "alex.johnson@example.com",
    studentId: "STU003",
  },
  {
    id: "4",
    name: "Sarah Williams",
    email: "sarah.williams@example.com",
    studentId: "STU004",
  },
  {
    id: "5",
    name: "Michael Brown",
    email: "michael.brown@example.com",
    studentId: "STU005",
  },
  {
    id: "6",
    name: "Emily Davis",
    email: "emily.davis@example.com",
    studentId: "STU006",
  },
  {
    id: "7",
    name: "David Miller",
    email: "david.miller@example.com",
    studentId: "STU007",
  },
  {
    id: "8",
    name: "Lisa Wilson",
    email: "lisa.wilson@example.com",
    studentId: "STU008",
  },
];

// Mock attendance data
const mockAttendanceData: { [key: string]: AttendanceData } = {
  // Format: "YYYY-MM-DD_courseId": { date, courseId, records }
};

export default function AttendanceTab() {
  const { toast } = useToast();
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedCourse, setSelectedCourse] = useState<string>("");
  const [attendanceRecords, setAttendanceRecords] = useState<
    AttendanceRecord[]
  >([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Generate days for the current month view
  const daysInMonth = eachDayOfInterval({
    start: startOfMonth(currentDate),
    end: endOfMonth(currentDate),
  });

  // Load attendance data for the selected date and course
  const loadAttendanceData = useCallback(() => {
    setIsLoading(true);

    // In a real app, this would be an API call
    setTimeout(() => {
      const key = `${format(selectedDate, "yyyy-MM-dd")}_${selectedCourse}`;
      const existingData = mockAttendanceData[key];

      if (existingData) {
        setAttendanceRecords(existingData.records);
      } else {
        // Initialize with all students marked as absent
        setAttendanceRecords(
          mockStudents.map((student) => ({
            studentId: student.id,
            status: "absent" as "present" | "absent" | "late",
          })),
        );
      }

      setIsLoading(false);
    }, 500); // Simulate API delay
  }, [selectedDate, selectedCourse]);

  // Effect to load attendance data when date or course changes
  useEffect(() => {
    if (selectedCourse) {
      loadAttendanceData();
    } else {
      setAttendanceRecords([]);
    }
  }, [selectedDate, selectedCourse, loadAttendanceData]);

  // Handle attendance status change
  const handleStatusChange = (
    studentId: string,
    status: "present" | "absent" | "late",
  ) => {
    setAttendanceRecords((prevRecords) =>
      prevRecords.map((record) =>
        record.studentId === studentId ? { ...record, status } : record,
      ),
    );
  };

  // Save attendance data
  const saveAttendance = () => {
    if (!selectedCourse) {
      toast({
        title: "Error",
        description: "Please select a course",
        variant: "destructive",
      });
      return;
    }

    setIsSaving(true);

    // In a real app, this would be an API call
    setTimeout(() => {
      const key = `${format(selectedDate, "yyyy-MM-dd")}_${selectedCourse}`;

      // Update mock data (in a real app, this would be saved to a database)
      mockAttendanceData[key] = {
        date: format(selectedDate, "yyyy-MM-dd"),
        courseId: selectedCourse,
        records: attendanceRecords,
      };

      toast({
        title: "Success",
        description: "Attendance saved successfully",
      });

      setIsSaving(false);
    }, 1000); // Simulate API delay
  };

  // Navigate to previous month
  const previousMonth = () => {
    setCurrentDate((prevDate) => subMonths(prevDate, 1));
  };

  // Navigate to next month
  const nextMonth = () => {
    setCurrentDate((prevDate) => addMonths(prevDate, 1));
  };

  // Select a date
  const selectDate = (date: Date) => {
    setSelectedDate(date);
  };

  // Get attendance status for a student
  const getAttendanceStatus = (studentId: string) => {
    const record = attendanceRecords.find((r) => r.studentId === studentId);
    return record ? record.status : "absent";
  };

  // Get attendance statistics
  const getAttendanceStats = () => {
    const present = attendanceRecords.filter(
      (r) => r.status === "present",
    ).length;
    const absent = attendanceRecords.filter(
      (r) => r.status === "absent",
    ).length;
    const late = attendanceRecords.filter((r) => r.status === "late").length;

    return { present, absent, late, total: mockStudents.length };
  };

  const stats = getAttendanceStats();

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start gap-6">
        {/* Left Column - Calendar and Course Selection */}
        <div className="w-full md:w-1/3 space-y-6">
          <Card className="bg-[#1D2A3F] border-[#4CC9F0]/20">
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                <span>
                  <CalendarIcon className="inline-block mr-2 h-5 w-5 text-[#4CC9F0]" />
                  Calendar
                </span>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={previousMonth}
                    className="h-8 w-8 border-[#4CC9F0]/30 text-[#4CC9F0] hover:bg-[#4CC9F0]/10">
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <span className="text-sm font-medium">
                    {format(currentDate, "MMMM yyyy")}
                  </span>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={nextMonth}
                    className="h-8 w-8 border-[#4CC9F0]/30 text-[#4CC9F0] hover:bg-[#4CC9F0]/10">
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </CardTitle>
              <CardDescription className="text-white">
                Select a date to view or mark attendance
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* Calendar Grid */}
              <div className="grid grid-cols-7 gap-1 text-center text-white">
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
                  (day) => (
                    <div
                      key={day}
                      className="text-xs font-medium text-white py-1">
                      {day}
                    </div>
                  ),
                )}

                {/* Fill in empty days at the start of the month */}
                {Array.from({ length: startOfMonth(currentDate).getDay() }).map(
                  (_, i) => (
                    <div
                      key={`empty-start-${i}`}
                      className="h-10 rounded-md"></div>
                  ),
                )}

                {/* Days of the month */}
                {daysInMonth.map((day) => {
                  const isSelected = isSameDay(day, selectedDate);
                  const isCurrent = isToday(day);

                  // Check if there's attendance data for this day
                  const hasAttendance = Object.keys(mockAttendanceData).some(
                    (key) => key.startsWith(format(day, "yyyy-MM-dd")),
                  );

                  return (
                    <button
                      key={day.toString()}
                      type="button"
                      onClick={() => selectDate(day)}
                      className={cn(
                        "h-10 rounded-md flex items-center justify-center text-sm transition-colors",
                        isSelected && "bg-[#4CC9F0] text-[#0F1729] font-bold",
                        !isSelected &&
                          isCurrent &&
                          "border border-[#4CC9F0] text-[#4CC9F0]",
                        !isSelected && !isCurrent && "hover:bg-[#4CC9F0]/10",
                        hasAttendance &&
                          !isSelected &&
                          "border-b-2 border-[#4CC9F0]",
                      )}>
                      {format(day, "d")}
                    </button>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-[#1D2A3F] border-[#4CC9F0]/20">
            <CardHeader>
              <CardTitle>Course Selection</CardTitle>
              <CardDescription className="text-white">
                Select a course to view or mark attendance
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Select value={selectedCourse} onValueChange={setSelectedCourse}>
                <SelectTrigger className="bg-[#131B2E] border-[#4CC9F0]/30 text-white">
                  <SelectValue placeholder="Select a course" />
                </SelectTrigger>
                <SelectContent className="bg-[#1D2A3F] border-[#4CC9F0]/30 text-white">
                  {mockCourses.map((course) => (
                    <SelectItem key={course.id} value={course.id}>
                      {course.name} ({course.code})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          {selectedCourse && attendanceRecords.length > 0 && (
            <Card className="bg-[#1D2A3F] border-[#4CC9F0]/20">
              <CardHeader>
                <CardTitle className="text-white">Attendance Summary</CardTitle>
                <CardDescription className="text-white">
                  {format(selectedDate, "EEEE, MMMM d, yyyy")}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-2">
                  <div className="bg-[#131B2E] p-3 rounded-md text-center">
                    <div className="text-2xl font-bold text-green-400">
                      {stats.present}
                    </div>
                    <div className="text-xs text-white">Present</div>
                  </div>
                  <div className="bg-[#131B2E] p-3 rounded-md text-center">
                    <div className="text-2xl font-bold text-red-400">
                      {stats.absent}
                    </div>
                    <div className="text-xs text-white">Absent</div>
                  </div>
                  <div className="bg-[#131B2E] p-3 rounded-md text-center">
                    <div className="text-2xl font-bold text-yellow-400">
                      {stats.late}
                    </div>
                    <div className="text-xs text-white">Late</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Right Column - Attendance Marking */}
        <div className="w-full md:w-2/3">
          <Card className="bg-[#1D2A3F] border-[#4CC9F0]/20">
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                <span className="text-white">Attendance Management</span>
                <Badge
                  variant="outline"
                  className="border-[#4CC9F0]/50 text-[#4CC9F0] bg-[#131B2E]">
                  {format(selectedDate, "EEEE, MMMM d, yyyy")}
                </Badge>
              </CardTitle>
              <CardDescription className="text-white">
                {selectedCourse
                  ? `Marking attendance for ${mockCourses.find((c) => c.id === selectedCourse)?.name || ""}`
                  : "Select a course to mark attendance"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {!selectedCourse ? (
                <div className="text-center py-8 text-white">
                  Please select a course from the dropdown to view or mark
                  attendance
                </div>
              ) : isLoading ? (
                <div className="flex justify-center items-center py-8">
                  <Loader2 className="h-8 w-8 animate-spin text-[#4CC9F0]" />
                </div>
              ) : (
                <div className="rounded-md border border-[#4CC9F0]/20 overflow-hidden text-white">
                  <Table>
                    <TableHeader className="bg-[#131B2E]">
                      <TableRow>
                        <TableHead className="w-[60px]">#</TableHead>
                        <TableHead>Student ID</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead className="text-right">Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {mockStudents.map((student, index) => (
                        <TableRow key={student.id}>
                          <TableCell className="font-medium">
                            {index + 1}
                          </TableCell>
                          <TableCell>{student.studentId}</TableCell>
                          <TableCell>{student.name}</TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button
                                variant="outline"
                                size="icon"
                                onClick={() =>
                                  handleStatusChange(student.id, "present")
                                }
                                className={cn(
                                  "h-8 w-8",
                                  getAttendanceStatus(student.id) === "present"
                                    ? "bg-green-500/20 border-green-500 text-green-500"
                                    : "border-green-500/30 text-green-500/70 hover:bg-green-500/10",
                                )}>
                                <Check className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="outline"
                                size="icon"
                                onClick={() =>
                                  handleStatusChange(student.id, "absent")
                                }
                                className={cn(
                                  "h-8 w-8",
                                  getAttendanceStatus(student.id) === "absent"
                                    ? "bg-red-500/20 border-red-500 text-red-500"
                                    : "border-red-500/30 text-red-500/70 hover:bg-red-500/10",
                                )}>
                                <X className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="outline"
                                size="icon"
                                onClick={() =>
                                  handleStatusChange(student.id, "late")
                                }
                                className={cn(
                                  "h-8 w-8",
                                  getAttendanceStatus(student.id) === "late"
                                    ? "bg-yellow-500/20 border-yellow-500 text-yellow-500"
                                    : "border-yellow-500/30 text-yellow-500/70 hover:bg-yellow-500/10",
                                )}>
                                <Clock className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
            <CardFooter className="flex justify-between">
              <div className="text-sm text-white">
                {selectedCourse && attendanceRecords.length > 0 && (
                  <>Total Students: {mockStudents.length}</>
                )}
              </div>
              <Button
                onClick={saveAttendance}
                disabled={!selectedCourse || isSaving}
                className="bg-[#4CC9F0] hover:bg-[#3DB8E0] text-[#0F1729]">
                {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                <Save className="mr-2 h-4 w-4" />
                Save Attendance
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
