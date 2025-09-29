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
        "academic-card hover-lift animate-fade-in",
        className
      )}
      style={{ animationDelay: `${delay}ms` }}
    >
      <CardHeader className="flex flex-row items-center justify-between pb-3">
        <div className="space-y-1">
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
        </div>
        <div className="p-3 bg-primary-subtle rounded-xl border border-primary-light">
          <Icon className="h-6 w-6 text-primary" />
        </div>
      </CardHeader>
      {change && (
        <CardContent className="pt-0">
          <div className="flex items-center text-sm">
            <span className={cn(
              "font-medium",
              trend === "up" && "text-emerald-600",
              trend === "down" && "text-red-600",
              trend === "neutral" && "text-gray-500"
            )}>
              {change}
            </span>
            <span className="text-gray-500 ml-1">from last month</span>
          </div>
        </CardContent>
      )}
    </Card>
  );
}