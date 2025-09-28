import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ClassCard } from "@/components/ClassCard";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Plus,
  Search,
  Filter,
  BookOpen,
  Users,
  Clock,
  Star,
  Grid,
  List,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Courses = () => {
  const { toast } = useToast();
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const courses = [
    {
      id: 1,
      title: "Advanced Mathematics - Calculus",
      subject: "Mathematics",
      teacher: {
        name: "Dr. Sarah Johnson",
        avatar: "/placeholder.svg",
      },
      schedule: {
        day: "Mon, Wed, Fri",
        time: "10:00 AM - 12:00 PM",
      },
      enrolled: 28,
      capacity: 35,
      rating: 4.9,
      price: "$120/month",
      status: "active" as const,
      isLive: false,
    },
    {
      id: 2,
      title: "Physics Laboratory - Mechanics",
      subject: "Physics",
      teacher: {
        name: "Prof. Michael Chen",
        avatar: "/placeholder.svg",
      },
      schedule: {
        day: "Tue, Thu",
        time: "2:00 PM - 4:30 PM",
      },
      enrolled: 22,
      capacity: 30,
      rating: 4.8,
      price: "$150/month", 
      status: "active" as const,
      isLive: true,
    },
    {
      id: 3,
      title: "Organic Chemistry Fundamentals",
      subject: "Chemistry",
      teacher: {
        name: "Dr. Emma Wilson",
        avatar: "/placeholder.svg",
      },
      schedule: {
        day: "Mon, Thu",
        time: "4:00 PM - 6:00 PM",
      },
      enrolled: 18,
      capacity: 25,
      rating: 4.7,
      price: "$135/month",
      status: "upcoming" as const,
      isLive: false,
    },
    {
      id: 4,
      title: "Biology - Cell Structure & Function",
      subject: "Biology",
      teacher: {
        name: "Dr. James Anderson",
        avatar: "/placeholder.svg",
      },
      schedule: {
        day: "Wed, Sat",
        time: "9:00 AM - 11:00 AM",
      },
      enrolled: 31,
      capacity: 35,
      rating: 4.6,
      price: "$110/month",
      status: "active" as const,
      isLive: false,
    },
    {
      id: 5,
      title: "English Literature - Shakespeare",
      subject: "English",
      teacher: {
        name: "Ms. Lisa Thompson",
        avatar: "/placeholder.svg",
      },
      schedule: {
        day: "Tue, Fri",
        time: "6:00 PM - 8:00 PM",
      },
      enrolled: 15,
      capacity: 20,
      rating: 4.9,
      price: "$95/month",
      status: "active" as const,
      isLive: false,
    },
    {
      id: 6,
      title: "Computer Science - Data Structures",
      subject: "Computer Science",
      teacher: {
        name: "Dr. Alex Kumar",
        avatar: "/placeholder.svg",
      },
      schedule: {
        day: "Sat, Sun",
        time: "1:00 PM - 3:30 PM",
      },
      enrolled: 12,
      capacity: 20,
      rating: 4.8,
      price: "$180/month",
      status: "upcoming" as const,
      isLive: false,
    },
  ];

  const filteredCourses = courses.filter(course =>
    course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    course.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
    course.teacher.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalStudents = courses.reduce((sum, course) => sum + course.enrolled, 0);
  const activeCourses = courses.filter(course => course.status === "active").length;
  const liveCourses = courses.filter(course => course.isLive).length;

  const handleAddCourse = () => {
    toast({
      title: "Course Created",
      description: "New course has been successfully added to your curriculum.",
    });
    setIsAddDialogOpen(false);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-4xl font-bold gradient-text">
            Course Management
          </h1>
          <p className="text-lg text-muted-foreground">
            Manage your courses, schedules, and student enrollments
          </p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="hover-scale">
              <Plus className="h-4 w-4 mr-2" />
              Create New Course
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Create New Course</DialogTitle>
              <DialogDescription>Set up a new course for your students.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="courseName" className="text-right">Name</Label>
                <Input id="courseName" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="duration" className="text-right">Duration</Label>
                <Input id="duration" placeholder="e.g., 12 weeks" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="schedule" className="text-right">Schedule</Label>
                <Input id="schedule" placeholder="e.g., Mon, Wed - 10:00 AM" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="description" className="text-right">Description</Label>
                <Textarea id="description" className="col-span-3" />
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddCourse}>Create Course</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Overview */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="soft-shadow border-0 bg-gradient-to-br from-card to-card/50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Courses</p>
                <p className="text-3xl font-bold text-foreground">{courses.length}</p>
              </div>
              <div className="p-3 bg-primary/10 rounded-2xl">
                <BookOpen className="h-6 w-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="soft-shadow border-0 bg-gradient-to-br from-card to-card/50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Courses</p>
                <p className="text-3xl font-bold text-success">{activeCourses}</p>
              </div>
              <div className="p-3 bg-success/10 rounded-2xl">
                <Users className="h-6 w-6 text-success" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="soft-shadow border-0 bg-gradient-to-br from-card to-card/50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Live Now</p>
                <p className="text-3xl font-bold text-destructive">{liveCourses}</p>
              </div>
              <div className="p-3 bg-destructive/10 rounded-2xl">
                <Clock className="h-6 w-6 text-destructive" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="soft-shadow border-0 bg-gradient-to-br from-card to-card/50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Students</p>
                <p className="text-3xl font-bold text-foreground">{totalStudents}</p>
              </div>
              <div className="p-3 bg-warning/10 rounded-2xl">
                <Star className="h-6 w-6 text-warning" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Controls */}
      <Card className="soft-shadow border-0">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg">Course Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search courses, subjects, or teachers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select defaultValue="all">
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Subject" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Subjects</SelectItem>
                <SelectItem value="mathematics">Mathematics</SelectItem>
                <SelectItem value="physics">Physics</SelectItem>
                <SelectItem value="chemistry">Chemistry</SelectItem>
                <SelectItem value="biology">Biology</SelectItem>
                <SelectItem value="english">English</SelectItem>
              </SelectContent>
            </Select>

            <Select defaultValue="all">
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="upcoming">Upcoming</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
              </SelectContent>
            </Select>

            <div className="flex items-center gap-2 border rounded-lg p-1">
              <Button
                variant={viewMode === "grid" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("grid")}
                className="h-8 w-8 p-0"
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("list")}
                className="h-8 w-8 p-0"
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Course Grid/List */}
      <div className={`grid gap-6 ${
        viewMode === "grid" 
          ? "md:grid-cols-2 lg:grid-cols-3" 
          : "grid-cols-1"
      }`}>
        {filteredCourses.map((course) => (
          <ClassCard
            key={course.id}
            title={course.title}
            subject={course.subject}
            teacher={course.teacher}
            schedule={course.schedule}
            enrolled={course.enrolled}
            capacity={course.capacity}
            rating={course.rating}
            price={course.price}
            status={course.status}
            isLive={course.isLive}
            className={viewMode === "list" ? "max-w-none" : ""}
          />
        ))}
      </div>

      {filteredCourses.length === 0 && (
        <Card className="soft-shadow border-0 text-center py-12">
          <CardContent>
            <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No courses found</h3>
            <p className="text-muted-foreground mb-4">
              Try adjusting your search criteria or create a new course.
            </p>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Create Course
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Courses;