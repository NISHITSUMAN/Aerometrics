import { Wind, Menu, X, Moon, Sun } from "lucide-react";
import { useState } from "react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

interface NavbarProps {
  currentAQI?: number;
  aqiCategory?: string;
}

export const Navbar = ({ currentAQI = 42, aqiCategory = "Good" }: NavbarProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  const getAQIColor = (category: string) => {
    const colors: Record<string, string> = {
      Good: "bg-aqi-good",
      Moderate: "bg-aqi-moderate",
      "Unhealthy for Sensitive Groups": "bg-aqi-sensitive",
      Unhealthy: "bg-aqi-unhealthy",
      "Very Unhealthy": "bg-aqi-veryUnhealthy",
      Hazardous: "bg-aqi-hazardous",
    };
    return colors[category] || "bg-aqi-good";
  };

  return (
    <nav className="sticky top-0 z-50 bg-card/95 backdrop-blur-md border-b border-border shadow-soft">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <Wind className="w-8 h-8 text-primary" />
            <div>
              <h1 className="font-bold text-lg text-foreground">AirWatch</h1>
              <p className="text-xs text-muted-foreground">EarthData Forecast</p>
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <a href="https://aerometrics-wine.vercel.app/#home" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
              Home
            </a>
            <a href="https://at-location.vercel.app/" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
              At Location
            </a>
            <a href="https://forecast-git-main-nishit-sumans-projects.vercel.app" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
              Forecast
            </a>
            <a href="https://aero-ai-mu.vercel.app/" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
              AI
            </a>
          
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 space-y-3 animate-slide-up">
            <a
              href="#home"
              className="block px-3 py-2 text-sm font-medium text-foreground hover:bg-muted rounded-md transition-colors"
            >
              Home
            </a>
            <a
              href="#forecast"
              className="block px-3 py-2 text-sm font-medium text-foreground hover:bg-muted rounded-md transition-colors"
            >
              Forecast
            </a>
            <a
              href="#about"
              className="block px-3 py-2 text-sm font-medium text-foreground hover:bg-muted rounded-md transition-colors"
            >
              About
            </a>
            <a
              href="#contact"
              className="block px-3 py-2 text-sm font-medium text-foreground hover:bg-muted rounded-md transition-colors"
            >
              Contact
            </a>
            <div className="flex items-center gap-2 px-3 py-2 rounded-md bg-muted">
              <div className={`w-2 h-2 rounded-full ${getAQIColor(aqiCategory)}`} />
              <span className="text-xs font-semibold text-foreground">AQI {currentAQI}</span>
              <span className="text-xs text-muted-foreground">{aqiCategory}</span>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
