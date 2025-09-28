import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatsCardProps {
  title: string;
  value: string;
  change?: string;
  trend?: "up" | "down" | "neutral";
  icon: LucideIcon;
  className?: string;
  delay?: number;
}

export function StatsCard({ 
  title, 
  value, 
  change, 
  trend = "neutral", 
  icon: Icon, 
  className,
  delay = 0 
}: StatsCardProps) {
  return (
    <Card 
      className={cn(
        "hover-lift soft-shadow animate-scale-in border-0 bg-gradient-to-br from-card to-card/50",
        className
      )}
      style={{ animationDelay: `${delay}ms` }}
    >
      <CardHeader className="flex flex-row items-center justify-between pb-3">
        <div className="space-y-1">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="text-2xl font-bold text-foreground">{value}</p>
        </div>
        <div className="p-3 bg-primary/10 rounded-2xl">
          <Icon className="h-6 w-6 text-primary" />
        </div>
      </CardHeader>
      {change && (
        <CardContent className="pt-0">
          <div className="flex items-center text-sm">
            <span className={cn(
              "font-medium",
              trend === "up" && "text-success",
              trend === "down" && "text-destructive",
              trend === "neutral" && "text-muted-foreground"
            )}>
              {change}
            </span>
            <span className="text-muted-foreground ml-1">from last month</span>
          </div>
        </CardContent>
      )}
    </Card>
  );
}