import { useState } from "react";
import { EarthScene } from "@/components/EarthScene";
import { ModeSelector } from "@/components/ModeSelector";
import { Dashboard } from "@/components/Dashboard";
import { WeatherData, getNashikDemoData, getLiveWeatherData } from "@/utils/weatherApi";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [mode, setMode] = useState<"idle" | "live" | "demo">("idle");
  const [isScanning, setIsScanning] = useState(false);
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const { toast } = useToast();

  const enableLiveMode = async () => {
    setIsScanning(true);
    
    try {
      if (!navigator.geolocation) {
        toast({
          title: "Geolocation not supported",
          description: "Your browser doesn't support geolocation. Using demo mode instead.",
          variant: "destructive",
        });
        enableManualMode();
        return;
      }

      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const data = await getLiveWeatherData(
              position.coords.latitude,
              position.coords.longitude
            );
            setWeatherData(data);
            setMode("live");
            toast({
              title: "Live data loaded",
              description: "Successfully retrieved environmental data for your location.",
            });
          } catch (error) {
            console.error("Error fetching live data:", error);
            toast({
              title: "Failed to fetch live data",
              description: "Falling back to demo mode.",
              variant: "destructive",
            });
            enableManualMode();
          } finally {
            setIsScanning(false);
          }
        },
        (error) => {
          console.error("Geolocation error:", error);
          toast({
            title: "Location access denied",
            description: "Using demo mode instead.",
            variant: "destructive",
          });
          enableManualMode();
        }
      );
    } catch (error) {
      console.error("Error enabling live mode:", error);
      enableManualMode();
    }
  };

  const enableManualMode = () => {
    setIsScanning(true);
    setTimeout(() => {
      const data = getNashikDemoData();
      setWeatherData(data);
      setMode("demo");
      setIsScanning(false);
      toast({
        title: "Demo mode activated",
        description: "Showing environmental data for Nashik.",
      });
    }, 1000);
  };

  const handleModeSelect = (selectedMode: "live" | "demo") => {
    if (selectedMode === "live") {
      enableLiveMode();
    } else {
      enableManualMode();
    }
  };

  const handleBack = () => {
    setMode("idle");
    setWeatherData(null);
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      <EarthScene />
      
      {mode === "idle" && (
        <ModeSelector onSelectMode={handleModeSelect} isScanning={isScanning} />
      )}

      {mode !== "idle" && weatherData && (
        <Dashboard data={weatherData} mode={mode} onBack={handleBack} />
      )}
    </div>
  );
};

export default Index;
