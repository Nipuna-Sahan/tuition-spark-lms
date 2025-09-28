import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { StatsCard } from "@/components/StatsCard";
import {
  Users,
  BookOpen,
  ClipboardList,
  Award,
  Calendar,
  Bell,
  Clock,
  TrendingUp,
  PlayCircle,
} from "lucide-react";

const Dashboard = () => {
  const stats = [
    {
      title: "Total Students",
      value: "156",
      change: "+12%",
      trend: "up" as const,
      icon: Users,
    },
    {
      title: "Active Courses",
      value: "8",
      change: "+2",
      trend: "up" as const,
      icon: BookOpen,
    },
    {
      title: "Pending Assignments",
      value: "23",
      change: "-5",
      trend: "down" as const,
      icon: ClipboardList,
    },
    {
      title: "Average Grade",
      value: "85%",
      change: "+3%",
      trend: "up" as const,
      icon: Award,
    },
  ];

  const recentActivity = [
    {
      action: "New assignment submitted",
      student: "Sarah Johnson",
      subject: "Mathematics",
      time: "2 hours ago",
      type: "submission"
    },
    {
      action: "Grade updated",
      student: "Mike Chen",
      subject: "Physics", 
      time: "4 hours ago",
      type: "grade"
    },
    {
      action: "New student enrolled",
      student: "Emma Wilson",
      subject: "Chemistry",
      time: "1 day ago",
      type: "enrollment"
    },
    {
      action: "Live class started",
      student: "Class 10A",
      subject: "Mathematics",
      time: "2 hours ago",
      type: "live-class"
    },
  ];

  const upcomingClasses = [
    {
      subject: "Mathematics",
      time: "10:00 AM",
      duration: "1h 30m",
      students: 25,
      room: "Room A",
      status: "upcoming"
    },
    {
      subject: "Physics", 
      time: "2:00 PM",
      duration: "2h",
      students: 18,
      room: "Room B", 
      status: "live"
    },
    {
      subject: "Chemistry",
      time: "4:00 PM",
      duration: "1h 45m",
      students: 22,
      room: "Room C",
      status: "upcoming"
    },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div className="space-y-2">
        <h1 className="text-4xl font-bold gradient-text">
          Welcome back, John! 👋
        </h1>
        <p className="text-lg text-muted-foreground">
          Here's what's happening in your tuition classes today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <StatsCard
            key={stat.title}
            title={stat.title}
            value={stat.value}
            change={stat.change}
            trend={stat.trend}
            icon={stat.icon}
            delay={index * 100}
          />
        ))}
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Recent Activity */}
        <Card className="lg:col-span-2 soft-shadow border-0 animate-fade-in">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl flex items-center gap-2">
                  <Bell className="h-5 w-5 text-primary" />
                  Recent Activity
                </CardTitle>
                <CardDescription>Latest updates from your classes</CardDescription>
              </div>
              <Button variant="outline" size="sm" className="hover-scale">
                View All
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div 
                  key={index} 
                  className="flex items-center gap-4 p-4 bg-muted/50 rounded-xl hover-lift transition-all duration-200"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className={`p-2 rounded-lg ${
                    activity.type === 'submission' ? 'bg-primary/10' :
                    activity.type === 'grade' ? 'bg-success/10' :
                    activity.type === 'enrollment' ? 'bg-warning/10' :
                    'bg-destructive/10'
                  }`}>
                    {activity.type === 'submission' ? <ClipboardList className="h-4 w-4 text-primary" /> :
                     activity.type === 'grade' ? <Award className="h-4 w-4 text-success" /> :
                     activity.type === 'enrollment' ? <Users className="h-4 w-4 text-warning" /> :
                     <PlayCircle className="h-4 w-4 text-destructive" />}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-foreground">{activity.action}</p>
                    <p className="text-sm text-muted-foreground">
                      {activity.student} • {activity.subject}
                    </p>
                  </div>
                  <Badge variant="secondary" className="text-xs">{activity.time}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Today's Schedule */}
        <Card className="soft-shadow border-0 animate-fade-in" style={{ animationDelay: '200ms' }}>
          <CardHeader className="pb-4">
            <CardTitle className="text-xl flex items-center gap-2">
              <Calendar className="h-5 w-5 text-primary" />
              Today's Classes
            </CardTitle>
            <CardDescription>Your schedule for today</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingClasses.map((class_, index) => (
                <div 
                  key={index} 
                  className="p-4 border border-border/50 rounded-xl hover-lift transition-all duration-200"
                  style={{ animationDelay: `${300 + index * 100}ms` }}
                >
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="font-semibold text-foreground">{class_.subject}</h4>
                      <p className="text-sm text-muted-foreground">{class_.room}</p>
                    </div>
                    <Badge 
                      variant={class_.status === "live" ? "destructive" : "secondary"}
                      className="animate-pulse"
                    >
                      {class_.status === "live" ? "Live" : class_.time}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-4 text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Users className="h-3 w-3" />
                        {class_.students}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {class_.duration}
                      </span>
                    </div>
                    {class_.status === "live" && (
                      <Button size="sm" className="h-8 hover-scale">
                        <PlayCircle className="h-3 w-3 mr-1" />
                        Join
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-4 hover-scale">
              <Calendar className="h-4 w-4 mr-2" />
              View Full Schedule
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Course Performance */}
      <Card className="soft-shadow border-0">
        <CardHeader>
          <CardTitle className="text-xl">Course Performance Overview</CardTitle>
          <CardDescription>Average performance and engagement across all courses</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[
              { subject: "Mathematics", progress: 88, students: 45, color: "bg-blue-500" },
              { subject: "Physics", progress: 92, students: 38, color: "bg-green-500" },
              { subject: "Chemistry", progress: 85, students: 42, color: "bg-purple-500" },
              { subject: "Biology", progress: 90, students: 31, color: "bg-orange-500" },
            ].map((course, index) => (
              <div 
                key={index} 
                className="space-y-4 p-4 bg-muted/30 rounded-xl hover-lift transition-all duration-200"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${course.color}`} />
                  <h4 className="font-medium text-foreground">{course.subject}</h4>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Progress</span>
                    <span className="font-medium">{course.progress}%</span>
                  </div>
                  <Progress value={course.progress} className="h-2" />
                </div>
                <p className="text-xs text-muted-foreground">
                  {course.students} students enrolled
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;