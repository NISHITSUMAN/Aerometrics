import { Search, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import heroBackground from "@/assets/hero-background.jpg";

interface HeroProps {
  onSearch: (location: string) => void;
}

export const Hero = ({ onSearch }: HeroProps) => {
  const [location, setLocation] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (location.trim()) {
      onSearch(location);
    }
  };

  return (
    <section
      id="home"
      className="relative h-[600px] flex items-center justify-center overflow-hidden"
      style={{
        backgroundImage: `url(${heroBackground})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-primary/60 via-primary/40 to-background/90" />
      
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto space-y-6 animate-fade-in">
        <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight">
          Forecast Air Quality.<br />Protect Your Health.
        </h1>
        <p className="text-lg md:text-xl text-white/90 font-medium">
          Powered by NASA TEMPO, Weather & Ground Sensors
        </p>

        <form onSubmit={handleSearch} className="mt-8 max-w-2xl mx-auto">
          <div className="flex flex-col sm:flex-row gap-3 p-2 bg-card rounded-2xl shadow-strong">
            <div className="flex-1 flex items-center gap-2 px-4">
              <MapPin className="w-5 h-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Enter city or location..."
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="border-0 focus-visible:ring-0 bg-transparent text-foreground placeholder:text-muted-foreground"
              />
            </div>
            <Button type="submit" size="lg" className="gap-2 bg-primary hover:bg-primary/90">
              <Search className="w-5 h-5" />
              Get Forecast
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
};
