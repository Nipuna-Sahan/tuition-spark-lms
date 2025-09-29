import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Users, 
  Clock, 
  Calendar, 
  BookOpen,
  Play,
  Star,
  MapPin
} from "lucide-react";
import { cn } from "@/lib/utils";

interface ClassCardProps {
  title: string;
  subject: string;
  teacher: {
    name: string;
    avatar?: string;
  };
  schedule: {
    day: string;
    time: string;
  };
  enrolled: number;
  capacity: number;
  rating?: number;
  price?: string;
  status?: "active" | "upcoming" | "completed";
  isLive?: boolean;
  className?: string;
}

export function ClassCard({
  title,
  subject,
  teacher,
  schedule,
  enrolled,
  capacity,
  rating = 4.8,
  price,
  status = "active",
  isLive = false,
  className
}: ClassCardProps) {
  const getSubjectBadgeClass = (subject: string) => {
    const subjectLower = subject.toLowerCase();
    if (subjectLower.includes('math')) return "subject-badge-math";
    if (subjectLower.includes('science') || subjectLower.includes('physics') || subjectLower.includes('chemistry')) return "subject-badge-science";
    if (subjectLower.includes('english') || subjectLower.includes('language')) return "subject-badge-english";
    return "subject-badge-math"; // default
  };

  return (
    <Card className={cn(
      "academic-card hover-lift overflow-hidden group",
      className
    )}>
      {/* Clean Header with subject badge */}
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Badge 
                className={cn("px-2 py-1 text-xs font-medium rounded-md", getSubjectBadgeClass(subject))}
              >
                <BookOpen className="h-3 w-3 mr-1" />
                {subject}
              </Badge>
              {isLive && (
                <Badge className="bg-red-50 text-red-700 border border-red-200 animate-pulse">
                  <div className="w-2 h-2 rounded-full bg-red-500 mr-1" />
                  Live
                </Badge>
              )}
            </div>
            <h3 className="text-lg font-semibold text-gray-900 group-hover:text-primary transition-colors">
              {title}
            </h3>
          </div>
          {rating && (
            <div className="flex items-center gap-1 text-sm bg-amber-50 px-2 py-1 rounded-md">
              <Star className="h-4 w-4 fill-amber-400 text-amber-500" />
              <span className="font-medium text-amber-700">{rating}</span>
            </div>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Clean Teacher Info */}
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10 border-2 border-gray-200">
            <AvatarImage src={teacher.avatar} />
            <AvatarFallback className="bg-gray-100 text-gray-700 font-medium">
              {teacher.name.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium text-gray-900">{teacher.name}</p>
            <p className="text-sm text-gray-500">Instructor</p>
          </div>
        </div>

        {/* Professional Class Details */}
        <div className="space-y-3">
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span>{schedule.day}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{schedule.time}</span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1 text-sm">
              <Users className="h-4 w-4 text-gray-400" />
              <span className="text-gray-600">
                {enrolled}/{capacity} students
              </span>
            </div>
            {price && (
              <div className="text-lg font-bold text-primary bg-primary-subtle px-2 py-1 rounded-md">
                {price}
              </div>
            )}
          </div>

          {/* Clean Progress Bar */}
          <div className="w-full bg-gray-100 rounded-full h-2">
            <div 
              className="bg-primary h-2 rounded-full transition-all duration-500"
              style={{ width: `${(enrolled / capacity) * 100}%` }}
            />
          </div>
        </div>

        {/* Professional Action Buttons */}
        <div className="flex gap-2 pt-2">
          {isLive ? (
            <Button className="academic-button-primary flex-1">
              <Play className="h-4 w-4 mr-2" />
              Join Live Class
            </Button>
          ) : (
            <>
              <Button className="academic-button-secondary flex-1">
                View Details
              </Button>
              <Button className="academic-button-primary flex-1">
                {status === "upcoming" ? "Enroll Now" : "Enter Class"}
              </Button>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
}