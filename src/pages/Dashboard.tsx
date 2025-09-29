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
  Plus,
  MessageCircle,
  FileText,
  Activity,
  DollarSign,
} from "lucide-react";

const Dashboard = () => {
  const activities = [
    {
      title: "New assignment submitted",
      description: "Sarah Johnson submitted Math Homework #5",
      time: "2 hours ago",
      icon: ClipboardList,
      color: "bg-primary-subtle text-primary",
    },
    {
      title: "Grade updated", 
      description: "Mike Chen received A+ in Physics Quiz",
      time: "4 hours ago",
      icon: Award,
      color: "bg-emerald-50 text-emerald-600",
    },
    {
      title: "New student enrolled",
      description: "Emma Wilson joined Chemistry Class",
      time: "1 day ago",
      icon: Users,
      color: "bg-amber-50 text-amber-600",
    },
    {
      title: "Live class started",
      description: "Mathematics Advanced - 25 students joined",
      time: "2 hours ago",
      icon: PlayCircle,
      color: "bg-red-50 text-red-600",
    },
  ];

  const upcomingClasses = [
    { name: "Mathematics Advanced", time: "10:00 AM", students: 25 },
    { name: "Physics Lab", time: "2:00 PM", students: 18 },
    { name: "Chemistry Theory", time: "4:00 PM", students: 22 },
  ];


  return (
    <div className="space-y-8 animate-fade-in">
      {/* Clean Academic Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
          <p className="text-gray-600">Welcome back! Here's what's happening with your classes today.</p>
        </div>
        <Button className="academic-button-primary hover-lift">
          <Plus className="h-4 w-4 mr-2" />
          Create Class
        </Button>
      </div>

      {/* Professional Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Students"
          value="248"
          change="+12.5%"
          trend="up"
          icon={Users}
          delay={0}
        />
        <StatsCard
          title="Active Classes"
          value="12"
          change="+2"
          trend="up"
          icon={BookOpen}
          delay={100}
        />
        <StatsCard
          title="This Month Revenue"
          value="$15,240"
          change="+18.2%"
          trend="up"
          icon={DollarSign}
          delay={200}
        />
        <StatsCard
          title="Completion Rate"
          value="94.2%"
          change="+2.1%"
          trend="up"
          icon={TrendingUp}
          delay={300}
        />
      </div>

      {/* Clean Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Activity Feed */}
        <Card className="lg:col-span-2 academic-card">
          <CardHeader className="border-b border-gray-100">
            <CardTitle className="flex items-center gap-2 text-gray-900">
              <Activity className="h-5 w-5 text-primary" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-4">
              {activities.map((activity, index) => (
                <div key={index} className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className={`p-2 rounded-lg ${activity.color}`}>
                    <activity.icon className="h-4 w-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                    <p className="text-sm text-gray-600">{activity.description}</p>
                    <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Sidebar Actions */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <Card className="academic-card">
            <CardHeader className="border-b border-gray-100">
              <CardTitle className="text-gray-900">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-3">
              <Button className="academic-button-secondary w-full justify-start hover-lift">
                <Plus className="h-4 w-4 mr-2" />
                Create Assignment
              </Button>
              <Button className="academic-button-secondary w-full justify-start hover-lift">
                <MessageCircle className="h-4 w-4 mr-2" />
                Send Message
              </Button>
              <Button className="academic-button-secondary w-full justify-start hover-lift">
                <FileText className="h-4 w-4 mr-2" />
                Generate Report
              </Button>
              <Button className="academic-button-secondary w-full justify-start hover-lift">
                <Calendar className="h-4 w-4 mr-2" />
                Schedule Class
              </Button>
            </CardContent>
          </Card>

          {/* Today's Schedule */}
          <Card className="academic-card">
            <CardHeader className="border-b border-gray-100">
              <CardTitle className="flex items-center gap-2 text-gray-900">
                <Clock className="h-5 w-5 text-primary" />
                Today's Schedule
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-3">
                {upcomingClasses.map((classItem, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                    <div className="w-3 h-3 rounded-full bg-primary"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">{classItem.name}</p>
                      <p className="text-xs text-gray-500">{classItem.time}</p>
                    </div>
                    <Badge className="bg-primary-subtle text-primary border border-primary-light text-xs">
                      {classItem.students} students
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;