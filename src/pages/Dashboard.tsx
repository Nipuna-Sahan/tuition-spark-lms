import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  Users,
  BookOpen,
  ClipboardList,
  TrendingUp,
  Calendar,
  Bell,
  Award,
  Clock,
} from "lucide-react";

const Dashboard = () => {
  const stats = [
    {
      title: "Total Students",
      value: "156",
      change: "+12%",
      trend: "up",
      icon: Users,
      color: "text-primary",
    },
    {
      title: "Active Courses",
      value: "8",
      change: "+2",
      trend: "up",
      icon: BookOpen,
      color: "text-success",
    },
    {
      title: "Pending Assignments",
      value: "23",
      change: "-5",
      trend: "down",
      icon: ClipboardList,
      color: "text-warning",
    },
    {
      title: "Average Grade",
      value: "85%",
      change: "+3%",
      trend: "up",
      icon: Award,
      color: "text-success",
    },
  ];

  const recentActivity = [
    {
      action: "New assignment submitted",
      student: "Sarah Johnson",
      subject: "Mathematics",
      time: "2 hours ago",
    },
    {
      action: "Grade updated",
      student: "Mike Chen",
      subject: "Physics",
      time: "4 hours ago",
    },
    {
      action: "New student enrolled",
      student: "Emma Wilson",
      subject: "Chemistry",
      time: "1 day ago",
    },
  ];

  const upcomingClasses = [
    {
      subject: "Mathematics",
      time: "10:00 AM",
      students: 25,
      room: "Room A",
    },
    {
      subject: "Physics",
      time: "2:00 PM",
      students: 18,
      room: "Room B",
    },
    {
      subject: "Chemistry",
      time: "4:00 PM", 
      students: 22,
      room: "Room C",
    },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back! Here's an overview of your tuition class.</p>
        </div>
        <Button className="hover-scale">
          <Bell className="h-4 w-4 mr-2" />
          View All Notifications
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <Card key={index} className="shadow-card hover-scale animate-scale-in" style={{ animationDelay: `${index * 0.1}s` }}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <TrendingUp className="h-3 w-3" />
                <span className={stat.trend === "up" ? "text-success" : "text-warning"}>
                  {stat.change}
                </span>
                <span>from last month</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Recent Activity */}
        <Card className="col-span-2 shadow-card animate-slide-in-right">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Recent Activity
            </CardTitle>
            <CardDescription>Latest updates from your classes</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg hover-scale animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                  <div>
                    <p className="font-medium">{activity.action}</p>
                    <p className="text-sm text-muted-foreground">
                      {activity.student} - {activity.subject}
                    </p>
                  </div>
                  <Badge variant="secondary">{activity.time}</Badge>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-4 hover-scale">
              View All Activity
            </Button>
          </CardContent>
        </Card>

        {/* Today's Schedule */}
        <Card className="shadow-card animate-slide-in-right" style={{ animationDelay: '0.2s' }}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Today's Classes
            </CardTitle>
            <CardDescription>Your schedule for today</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {upcomingClasses.map((class_, index) => (
                <div key={index} className="p-3 border rounded-lg hover-scale animate-fade-in" style={{ animationDelay: `${0.3 + index * 0.1}s` }}>
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-medium">{class_.subject}</h4>
                    <Badge variant="outline">{class_.time}</Badge>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Users className="h-3 w-3" />
                      {class_.students} students
                    </span>
                    <span>{class_.room}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Course Performance */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle>Course Performance Overview</CardTitle>
          <CardDescription>Average performance across all courses</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {[
              { subject: "Mathematics", progress: 88, students: 45 },
              { subject: "Physics", progress: 92, students: 38 },
              { subject: "Chemistry", progress: 85, students: 42 },
              { subject: "Biology", progress: 90, students: 31 },
            ].map((course, index) => (
              <div key={index} className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">{course.subject}</span>
                    <span>{course.progress}%</span>
                  </div>
                  <Progress value={course.progress} className="mt-1" />
                </div>
                <p className="text-xs text-muted-foreground">{course.students} students enrolled</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;