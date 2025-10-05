import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface PollutantCardProps {
  name: string;
  value: number;
  unit: string;
  icon: LucideIcon;
  description: string;
  status: "good" | "moderate" | "unhealthy";
}

export const PollutantCard = ({ name, value, unit, icon: Icon, description, status }: PollutantCardProps) => {
  const statusColors = {
    good: "border-aqi-good bg-aqi-good/5",
    moderate: "border-aqi-moderate bg-aqi-moderate/5",
    unhealthy: "border-aqi-unhealthy bg-aqi-unhealthy/5",
  };

  const statusTextColors = {
    good: "text-aqi-good",
    moderate: "text-aqi-moderate",
    unhealthy: "text-aqi-unhealthy",
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Card className={`border-2 ${statusColors[status]} transition-all hover:scale-105 cursor-pointer`}>
            <CardContent className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <Icon className={`w-8 h-8 ${statusTextColors[status]}`} />
                <div className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColors[status]}`}>
                  {status.toUpperCase()}
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground">{name}</h3>
                <div className="mt-2">
                  <span className="text-3xl font-bold text-foreground">{value}</span>
                  <span className="text-sm text-muted-foreground ml-2">{unit}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TooltipTrigger>
        <TooltipContent>
          <p className="max-w-xs">{description}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
