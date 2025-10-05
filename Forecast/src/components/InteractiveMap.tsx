import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin } from "lucide-react";

interface MapLocation {
  name: string;
  aqi: number;
  lat: number;
  lng: number;
  category: string;
}

interface InteractiveMapProps {
  locations: MapLocation[];
}

export const InteractiveMap = ({ locations }: InteractiveMapProps) => {
  const getAQIColor = (category: string) => {
    const colors: Record<string, string> = {
      Good: "#5cb85c",
      Moderate: "#f0ad4e",
      "Unhealthy for Sensitive Groups": "#ff9800",
      Unhealthy: "#d9534f",
      "Very Unhealthy": "#9c27b0",
      Hazardous: "#8b0000",
    };
    return colors[category] || "#5cb85c";
  };

  return (
    <Card className="shadow-medium">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-foreground">Real-Time AQI Map</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative h-[400px] bg-muted rounded-lg overflow-hidden">
          {/* Simplified map visualization - In production, integrate with Mapbox or Google Maps */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10">
            <div className="w-full h-full flex items-center justify-center">
              <div className="text-center space-y-4">
                <MapPin className="w-16 h-16 mx-auto text-primary" />
                <p className="text-sm text-muted-foreground">Interactive map visualization</p>
              </div>
            </div>
          </div>

          {/* Location markers overlay */}
          <div className="absolute inset-0 p-6">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {locations.map((location, idx) => (
                <div
                  key={idx}
                  className="bg-card/95 backdrop-blur-sm rounded-lg p-3 shadow-soft hover:shadow-medium transition-shadow cursor-pointer"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: getAQIColor(location.category) }}
                    />
                    <span className="text-xs font-semibold text-foreground">{location.name}</span>
                  </div>
                  <div className="text-lg font-bold text-foreground">{location.aqi}</div>
                  <div className="text-xs text-muted-foreground">{location.category}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
