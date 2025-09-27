import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, Clock, Users, MapPin, Plus, ChevronLeft, ChevronRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Schedule = () => {
  const { toast } = useToast();
  const [currentWeek, setCurrentWeek] = useState(new Date());
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const classes = [
    {
      id: 1,
      subject: "Advanced Mathematics",
      time: "10:00 AM - 11:30 AM",
      day: "Monday",
      room: "Room A",
      students: 25,
      instructor: "You",
      color: "bg-primary",
    },
    {
      id: 2,
      subject: "Physics Fundamentals",
      time: "2:00 PM - 3:30 PM",
      day: "Monday",
      room: "Room B",
      students: 18,
      instructor: "You",
      color: "bg-success",
    },
    {
      id: 3,
      subject: "Advanced Mathematics",
      time: "10:00 AM - 11:30 AM",
      day: "Wednesday",
      room: "Room A",
      students: 25,
      instructor: "You",
      color: "bg-primary",
    },
    {
      id: 4,
      subject: "Organic Chemistry",
      time: "4:00 PM - 5:30 PM",
      day: "Wednesday",
      room: "Room C",
      students: 22,
      instructor: "You",
      color: "bg-warning",
    },
    {
      id: 5,
      subject: "Advanced Mathematics",
      time: "10:00 AM - 11:30 AM",
      day: "Friday",
      room: "Room A",
      students: 25,
      instructor: "You",
      color: "bg-primary",
    },
    {
      id: 6,
      subject: "Physics Fundamentals",
      time: "2:00 PM - 3:30 PM",
      day: "Thursday",
      room: "Room B",
      students: 18,
      instructor: "You",
      color: "bg-success",
    },
    {
      id: 7,
      subject: "Biology Essentials",
      time: "3:00 PM - 4:30 PM",
      day: "Friday",
      room: "Room D",
      students: 15,
      instructor: "You",
      color: "bg-accent",
    },
  ];

  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const timeSlots = [
    "9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
    "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM"
  ];

  const handleAddClass = () => {
    toast({
      title: "Class Scheduled",
      description: "New class has been successfully added to your schedule.",
    });
    setIsAddDialogOpen(false);
  };

  const getWeekDates = (date: Date) => {
    const week = [];
    const startOfWeek = new Date(date);
    startOfWeek.setDate(date.getDate() - date.getDay() + 1); // Start from Monday

    for (let i = 0; i < 6; i++) {
      const day = new Date(startOfWeek);
      day.setDate(startOfWeek.getDate() + i);
      week.push(day);
    }
    return week;
  };

  const weekDates = getWeekDates(currentWeek);

  const getClassesForDay = (dayName: string) => {
    return classes.filter(cls => cls.day === dayName);
  };

  const navigateWeek = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentWeek);
    newDate.setDate(currentWeek.getDate() + (direction === 'next' ? 7 : -7));
    setCurrentWeek(newDate);
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const getTodayStats = () => {
    const today = new Date().toLocaleDateString('en-US', { weekday: 'long' });
    const todayClasses = getClassesForDay(today);
    const totalStudents = todayClasses.reduce((acc, cls) => acc + cls.students, 0);
    return { classCount: todayClasses.length, totalStudents };
  };

  const todayStats = getTodayStats();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Schedule</h1>
          <p className="text-muted-foreground">Manage your class schedule and timetable</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-primary hover:bg-primary-hover">
              <Plus className="mr-2 h-4 w-4" />
              Schedule Class
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Schedule New Class</DialogTitle>
              <DialogDescription>Add a new class to your schedule.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="subject" className="text-right">Subject</Label>
                <Select>
                  <SelectTrigger className="col-span-3">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="math">Mathematics</SelectItem>
                    <SelectItem value="physics">Physics</SelectItem>
                    <SelectItem value="chemistry">Chemistry</SelectItem>
                    <SelectItem value="biology">Biology</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="day" className="text-right">Day</Label>
                <Select>
                  <SelectTrigger className="col-span-3">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {days.map(day => (
                      <SelectItem key={day} value={day.toLowerCase()}>{day}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="time" className="text-right">Time</Label>
                <Input id="time" placeholder="e.g., 10:00 AM - 11:30 AM" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="room" className="text-right">Room</Label>
                <Input id="room" className="col-span-3" />
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddClass}>Schedule Class</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Today's Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Today's Classes</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{todayStats.classCount}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Today's Students</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{todayStats.totalStudents}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Weekly Classes</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{classes.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Rooms</CardTitle>
            <MapPin className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {new Set(classes.map(cls => cls.room)).size}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Weekly Schedule */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Weekly Schedule</CardTitle>
              <CardDescription>
                Week of {formatDate(weekDates[0])} - {formatDate(weekDates[5])}
              </CardDescription>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={() => navigateWeek('prev')}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm" onClick={() => navigateWeek('next')}>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-7 gap-4">
            {/* Header row */}
            <div className="font-medium text-center text-sm text-muted-foreground">Time</div>
            {weekDates.map((date, index) => (
              <div key={index} className="text-center">
                <div className="font-medium">{days[index]}</div>
                <div className="text-sm text-muted-foreground">{formatDate(date)}</div>
              </div>
            ))}

            {/* Schedule grid */}
            {timeSlots.map((timeSlot, timeIndex) => (
              <div key={timeIndex} className="contents">
                <div className="text-sm text-muted-foreground py-2 text-center border-t">
                  {timeSlot}
                </div>
                {days.map((day, dayIndex) => {
                  const dayClasses = getClassesForDay(day).filter(cls => 
                    cls.time.startsWith(timeSlot)
                  );
                  
                  return (
                    <div key={dayIndex} className="border-t py-2 min-h-[60px]">
                      {dayClasses.map((cls) => (
                        <div
                          key={cls.id}
                          className={`${cls.color} text-white p-2 rounded-md text-xs mb-1`}
                        >
                          <div className="font-medium truncate">{cls.subject}</div>
                          <div className="flex items-center gap-1 mt-1">
                            <Users className="h-3 w-3" />
                            <span>{cls.students}</span>
                            <MapPin className="h-3 w-3 ml-1" />
                            <span>{cls.room}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Schedule Overview */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Today's Schedule</CardTitle>
            <CardDescription>Your classes for today</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {getClassesForDay(new Date().toLocaleDateString('en-US', { weekday: 'long' })).map((cls) => (
                <div key={cls.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <h4 className="font-medium">{cls.subject}</h4>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {cls.time}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {cls.room}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge variant="outline">
                      <Users className="mr-1 h-3 w-3" />
                      {cls.students}
                    </Badge>
                  </div>
                </div>
              ))}
              {getClassesForDay(new Date().toLocaleDateString('en-US', { weekday: 'long' })).length === 0 && (
                <p className="text-muted-foreground text-center py-4">No classes scheduled for today</p>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Room Utilization</CardTitle>
            <CardDescription>Room usage across the week</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {Array.from(new Set(classes.map(cls => cls.room))).map((room) => {
                const roomClasses = classes.filter(cls => cls.room === room);
                const totalHours = roomClasses.length * 1.5; // Assuming 1.5 hours per class
                
                return (
                  <div key={room} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{room}</span>
                      <span className="text-sm text-muted-foreground">
                        {roomClasses.length} classes • {totalHours}h/week
                      </span>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {roomClasses.map(cls => cls.subject).join(', ')}
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Schedule;