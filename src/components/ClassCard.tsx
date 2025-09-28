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
  return (
    <Card className={cn(
      "hover-lift soft-shadow border-0 bg-gradient-to-br from-card to-card/50 overflow-hidden group",
      className
    )}>
      {/* Header with subject badge and status */}
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Badge 
                variant="secondary" 
                className="bg-primary/10 text-primary border-0"
              >
                <BookOpen className="h-3 w-3 mr-1" />
                {subject}
              </Badge>
              {isLive && (
                <Badge variant="destructive" className="animate-pulse">
                  <div className="w-2 h-2 rounded-full bg-white mr-1" />
                  Live
                </Badge>
              )}
            </div>
            <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
              {title}
            </h3>
          </div>
          {rating && (
            <div className="flex items-center gap-1 text-sm">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="font-medium">{rating}</span>
            </div>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Teacher Info */}
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10 border-2 border-primary/20">
            <AvatarImage src={teacher.avatar} />
            <AvatarFallback className="bg-primary/10 text-primary">
              {teacher.name.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium text-foreground">{teacher.name}</p>
            <p className="text-sm text-muted-foreground">Instructor</p>
          </div>
        </div>

        {/* Class Details */}
        <div className="space-y-3">
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
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
              <Users className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">
                {enrolled}/{capacity} students
              </span>
            </div>
            {price && (
              <div className="text-lg font-bold text-primary">
                {price}
              </div>
            )}
          </div>

          {/* Progress bar for enrollment */}
          <div className="w-full bg-muted rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-primary to-primary/80 h-2 rounded-full transition-all duration-500"
              style={{ width: `${(enrolled / capacity) * 100}%` }}
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 pt-2">
          {isLive ? (
            <Button className="flex-1 bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary">
              <Play className="h-4 w-4 mr-2" />
              Join Live Class
            </Button>
          ) : (
            <>
              <Button variant="outline" className="flex-1">
                View Details
              </Button>
              <Button className="flex-1">
                {status === "upcoming" ? "Enroll Now" : "Enter Class"}
              </Button>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
}