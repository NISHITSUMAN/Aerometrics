import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Wind, Droplets, Thermometer } from "lucide-react";

interface WeatherData {
  temperature: number;
  humidity: number;
  windSpeed: number;
}

interface ForecastCardProps {
  location: string;
  aqi: number;
  category: string;
  weather: WeatherData;
}

export const ForecastCard = ({ location, aqi, category, weather }: ForecastCardProps) => {
  const getAQIColor = (cat: string) => {
    const colors: Record<string, string> = {
      Good: "bg-aqi-good",
      Moderate: "bg-aqi-moderate",
      "Unhealthy for Sensitive Groups": "bg-aqi-sensitive",
      Unhealthy: "bg-aqi-unhealthy",
      "Very Unhealthy": "bg-aqi-veryUnhealthy",
      Hazardous: "bg-aqi-hazardous",
    };
    return colors[cat] || "bg-aqi-good";
  };

  const getAQITextColor = (cat: string) => {
    const colors: Record<string, string> = {
      Good: "text-aqi-good",
      Moderate: "text-aqi-moderate",
      "Unhealthy for Sensitive Groups": "text-aqi-sensitive",
      Unhealthy: "text-aqi-unhealthy",
      "Very Unhealthy": "text-aqi-veryUnhealthy",
      Hazardous: "text-aqi-hazardous",
    };
    return colors[cat] || "text-aqi-good";
  };

  return (
    <Card className="shadow-medium hover:shadow-strong transition-shadow duration-300">
      <CardHeader className="pb-3">
        <CardTitle className="text-xl font-semibold text-foreground flex items-center justify-between">
          <span>{location}</span>
          <div className={`w-3 h-3 rounded-full ${getAQIColor(category)} animate-pulse-glow`} />
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="text-center py-6 space-y-2">
          <div className="text-6xl font-bold text-foreground">{aqi}</div>
          <div className={`text-lg font-semibold ${getAQITextColor(category)}`}>{category}</div>
          <div className="text-sm text-muted-foreground">Air Quality Index</div>
        </div>

        <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border">
          <div className="text-center space-y-2">
            <Thermometer className="w-5 h-5 mx-auto text-primary" />
            <div className="text-sm font-medium text-foreground">{weather.temperature}°C</div>
            <div className="text-xs text-muted-foreground">Temperature</div>
          </div>
          <div className="text-center space-y-2">
            <Droplets className="w-5 h-5 mx-auto text-primary" />
            <div className="text-sm font-medium text-foreground">{weather.humidity}%</div>
            <div className="text-xs text-muted-foreground">Humidity</div>
          </div>
          <div className="text-center space-y-2">
            <Wind className="w-5 h-5 mx-auto text-primary" />
            <div className="text-sm font-medium text-foreground">{weather.windSpeed} km/h</div>
            <div className="text-xs text-muted-foreground">Wind Speed</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
