import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
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
import { Plus, BookOpen, Users, Clock, MoreHorizontal } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Courses = () => {
  const { toast } = useToast();
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const courses = [
    {
      id: 1,
      name: "Advanced Mathematics",
      description: "Comprehensive mathematics course covering algebra, calculus, and geometry",
      instructor: "You",
      students: 45,
      duration: "12 weeks",
      progress: 68,
      status: "Active",
      startDate: "2024-01-15",
      schedule: "Mon, Wed, Fri - 10:00 AM",
      color: "bg-primary",
    },
    {
      id: 2,
      name: "Physics Fundamentals",
      description: "Introduction to physics principles and practical applications",
      instructor: "You",
      students: 38,
      duration: "10 weeks",
      progress: 45,
      status: "Active",
      startDate: "2024-02-01",
      schedule: "Tue, Thu - 2:00 PM",
      color: "bg-success",
    },
    {
      id: 3,
      name: "Organic Chemistry",
      description: "Deep dive into organic chemistry concepts and laboratory work",
      instructor: "You",
      students: 42,
      duration: "14 weeks",
      progress: 82,
      status: "Active",
      startDate: "2024-01-08",
      schedule: "Mon, Wed - 4:00 PM",
      color: "bg-warning",
    },
    {
      id: 4,
      name: "Biology Essentials",
      description: "Core biology concepts from cellular to ecosystem level",
      instructor: "You",
      students: 31,
      duration: "8 weeks",
      progress: 25,
      status: "Draft",
      startDate: "2024-03-15",
      schedule: "Fri - 3:00 PM",
      color: "bg-accent",
    },
  ];

  const handleAddCourse = () => {
    toast({
      title: "Course Created",
      description: "New course has been successfully added to your curriculum.",
    });
    setIsAddDialogOpen(false);
  };

  const getStatusBadge = (status: string) => {
    const statusColors = {
      Active: "bg-success-light text-success",
      Draft: "bg-warning-light text-warning",
      Completed: "bg-accent text-accent-foreground",
    };
    return <Badge className={statusColors[status as keyof typeof statusColors]}>{status}</Badge>;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Courses</h1>
          <p className="text-muted-foreground">Manage your curriculum and course content</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-primary hover:bg-primary-hover">
              <Plus className="mr-2 h-4 w-4" />
              Create Course
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
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Courses</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{courses.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Courses</CardTitle>
            <BookOpen className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">
              {courses.filter(c => c.status === "Active").length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Enrollments</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {courses.reduce((acc, course) => acc + course.students, 0)}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Progress</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round(courses.reduce((acc, course) => acc + course.progress, 0) / courses.length)}%
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Courses Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {courses.map((course) => (
          <Card key={course.id} className="shadow-card hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className={`w-12 h-12 ${course.color} rounded-lg flex items-center justify-center`}>
                  <BookOpen className="h-6 w-6 text-white" />
                </div>
                <Button variant="ghost" size="sm">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>
              <div>
                <CardTitle className="text-lg">{course.name}</CardTitle>
                <CardDescription className="line-clamp-2">{course.description}</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Progress</span>
                <span className="font-medium">{course.progress}%</span>
              </div>
              <Progress value={course.progress} className="h-2" />
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Students</p>
                  <p className="font-medium flex items-center">
                    <Users className="mr-1 h-3 w-3" />
                    {course.students}
                  </p>
                </div>
                <div>
                  <p className="text-muted-foreground">Duration</p>
                  <p className="font-medium flex items-center">
                    <Clock className="mr-1 h-3 w-3" />
                    {course.duration}
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Schedule</span>
                  {getStatusBadge(course.status)}
                </div>
                <p className="text-sm font-medium">{course.schedule}</p>
              </div>

              <div className="flex gap-2 pt-2">
                <Button variant="outline" size="sm" className="flex-1">
                  Edit Course
                </Button>
                <Button size="sm" className="flex-1">
                  View Details
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Courses;