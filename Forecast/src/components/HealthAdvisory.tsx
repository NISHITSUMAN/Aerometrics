import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, Heart, Activity } from "lucide-react";

interface AdvisoryItem {
  category: string;
  message: string;
  color: string;
  icon: React.ReactNode;
}

interface HealthAdvisoryProps {
  aqiCategory: string;
}

export const HealthAdvisory = ({ aqiCategory }: HealthAdvisoryProps) => {
  const getAdvisory = (category: string): AdvisoryItem => {
    const advisories: Record<string, AdvisoryItem> = {
      Good: {
        category: "Good",
        message: "Air quality is satisfactory. Outdoor activities are safe for everyone.",
        color: "bg-aqi-good/10 border-aqi-good",
        icon: <Heart className="w-6 h-6 text-aqi-good" />,
      },
      Moderate: {
        category: "Moderate",
        message: "Air quality is acceptable. Unusually sensitive people should consider reducing prolonged outdoor exertion.",
        color: "bg-aqi-moderate/10 border-aqi-moderate",
        icon: <Activity className="w-6 h-6 text-aqi-moderate" />,
      },
      "Unhealthy for Sensitive Groups": {
        category: "Unhealthy for Sensitive Groups",
        message: "Sensitive groups should limit prolonged outdoor exertion. General public is not likely to be affected.",
        color: "bg-aqi-sensitive/10 border-aqi-sensitive",
        icon: <AlertCircle className="w-6 h-6 text-aqi-sensitive" />,
      },
      Unhealthy: {
        category: "Unhealthy",
        message: "Everyone may begin to experience health effects. Sensitive groups should avoid outdoor activities.",
        color: "bg-aqi-unhealthy/10 border-aqi-unhealthy",
        icon: <AlertCircle className="w-6 h-6 text-aqi-unhealthy" />,
      },
      "Very Unhealthy": {
        category: "Very Unhealthy",
        message: "Health alert: Everyone should avoid outdoor exposure. Stay indoors and keep activity levels low.",
        color: "bg-aqi-veryUnhealthy/10 border-aqi-veryUnhealthy",
        icon: <AlertCircle className="w-6 h-6 text-aqi-veryUnhealthy" />,
      },
      Hazardous: {
        category: "Hazardous",
        message: "Health warning of emergency conditions. Everyone should avoid all outdoor exertion.",
        color: "bg-aqi-hazardous/10 border-aqi-hazardous",
        icon: <AlertCircle className="w-6 h-6 text-aqi-hazardous" />,
      },
    };

    return advisories[category] || advisories.Good;
  };

  const advisory = getAdvisory(aqiCategory);

  return (
    <Card className={`border-2 ${advisory.color} shadow-medium`}>
      <CardHeader>
        <CardTitle className="flex items-center gap-3 text-xl font-semibold text-foreground">
          {advisory.icon}
          Health Advisory
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="text-sm font-semibold text-foreground">{advisory.category}</div>
          <p className="text-sm text-muted-foreground leading-relaxed">{advisory.message}</p>
        </div>
      </CardContent>
    </Card>
  );
};
