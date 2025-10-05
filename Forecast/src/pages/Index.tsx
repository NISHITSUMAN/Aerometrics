import { useEffect, useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { ForecastCard } from "@/components/ForecastCard";
import { PollutantCard } from "@/components/PollutantCard";
import { ForecastChart } from "@/components/ForecastChart";
import { HealthAdvisory } from "@/components/HealthAdvisory";
import { InteractiveMap } from "@/components/InteractiveMap";
import { Footer } from "@/components/Footer";
import { Cloud, Droplet, Wind, Flame, Zap, Factory } from "lucide-react";
import { toast } from "sonner";

const Index = () => {
  const [location, setLocation] = useState("");
  const [showForecast, setShowForecast] = useState(false);
  const [forecastData, setForecastData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchForecast = async (searchLocation: string) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`http://localhost:5000/api/forecast?city=${encodeURIComponent(searchLocation)}`);
      if (!res.ok) throw new Error("Failed to fetch forecast");
      const data = await res.json();
      setForecastData(data);
    } catch (err: any) {
      setError(err.message || "Unknown error");
      setForecastData(null);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (searchLocation: string) => {
    setLocation(searchLocation);
    setShowForecast(true);
    toast.success(`Fetching forecast for ${searchLocation}...`);
    fetchForecast(searchLocation);
    setTimeout(() => {
      document.getElementById("forecast")?.scrollIntoView({ behavior: "smooth" });
    }, 300);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar currentAQI={42} aqiCategory="Good" />
      
      <Hero onSearch={handleSearch} />

      {showForecast && (
        <main id="forecast" className="container mx-auto px-4 py-16 space-y-16 animate-fade-in">
          {/* Current Forecast Section */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-8">
              Current Air Quality - {location}
            </h2>
            {loading && <div className="text-center">Loading...</div>}
            {error && <div className="text-center text-red-500">{error}</div>}
            {forecastData && (
              <div className="grid lg:grid-cols-3 gap-6">
                <div className="lg:col-span-1">
                  <ForecastCard
                    location={forecastData.city}
                    aqi={forecastData.aqi}
                    category={forecastData.category}
                    weather={forecastData.weather}
                  />
                </div>
                <div className="lg:col-span-2">
                  <ForecastChart data={forecastData.forecast5Day.map((d: any, i: number) => ({ day: `Day ${i+1}`, aqi: d.aqi }))} />
                </div>
              </div>
            )}
          </section>

          {/* Pollutant Breakdown Section */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-8">Pollutant Levels</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {forecastData && (
                <>
                  <PollutantCard
                    name="PM2.5"
                    value={forecastData.pm25}
                    unit="µg/m³"
                    icon={Cloud}
                    description="Fine particulate matter smaller than 2.5 micrometers. Primary health concern for respiratory issues."
                    status={forecastData.pm25 <= 12 ? "good" : forecastData.pm25 <= 35 ? "moderate" : "unhealthy"}
                  />
                  <PollutantCard
                    name="PM10"
                    value={forecastData.pm10}
                    unit="µg/m³"
                    icon={Droplet}
                    description="Particulate matter smaller than 10 micrometers. Can irritate airways and lungs."
                    status={forecastData.pm10 <= 54 ? "good" : forecastData.pm10 <= 154 ? "moderate" : "unhealthy"}
                  />
                  <PollutantCard
                    name="NO₂"
                    value={forecastData.no2}
                    unit="ppb"
                    icon={Factory}
                    description="Nitrogen dioxide from vehicle emissions and industrial sources."
                    status={forecastData.no2 <= 53 ? "good" : forecastData.no2 <= 100 ? "moderate" : "unhealthy"}
                  />
                  <PollutantCard
                    name="O₃"
                    value={forecastData.o3}
                    unit="ppb"
                    icon={Zap}
                    description="Ground-level ozone, formed by reactions of pollutants in sunlight."
                    status={forecastData.o3 <= 70 ? "good" : forecastData.o3 <= 120 ? "moderate" : "unhealthy"}
                  />
                  <PollutantCard
                    name="CO"
                    value={forecastData.co}
                    unit="ppm"
                    icon={Flame}
                    description="Carbon monoxide from incomplete combustion of fossil fuels."
                    status={forecastData.co <= 4.4 ? "good" : forecastData.co <= 9.4 ? "moderate" : "unhealthy"}
                  />
                  <PollutantCard
                    name="SO₂"
                    value={forecastData.so2}
                    unit="ppb"
                    icon={Wind}
                    description="Sulfur dioxide from burning coal and oil."
                    status={forecastData.so2 <= 35 ? "good" : forecastData.so2 <= 75 ? "moderate" : "unhealthy"}
                  />
                </>
              )}
            </div>
          </section>

          {/* Health Advisory Section */}
          <section id="about">
            <h2 className="text-3xl font-bold text-foreground mb-8">Health Recommendations</h2>
            {forecastData && <HealthAdvisory aqiCategory={forecastData.category} />}
          </section>

          {/* Interactive Map Section */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-8">Regional Air Quality</h2>
            <InteractiveMap locations={forecastData ? [{ name: forecastData.city, aqi: forecastData.aqi, lat: 28.6139, lng: 77.2090, category: forecastData.category }] : []} />
          </section>
        </main>
      )}

      {!showForecast && (
        <section className="container mx-auto px-4 py-16">
          <div className="text-center space-y-8">
            <h2 className="text-3xl font-bold text-foreground">How It Works</h2>
            <div className="grid md:grid-cols-3 gap-8 mt-12">
              <div className="p-6 bg-card rounded-lg shadow-soft">
                <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
                  <Cloud className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">NASA TEMPO Data</h3>
                <p className="text-sm text-muted-foreground">
                  Real-time satellite observations of air pollutants over North America
                </p>
              </div>
              <div className="p-6 bg-card rounded-lg shadow-soft">
                <div className="w-16 h-16 mx-auto mb-4 bg-secondary/10 rounded-full flex items-center justify-center">
                  <Wind className="w-8 h-8 text-secondary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Weather Integration</h3>
                <p className="text-sm text-muted-foreground">
                  Combined with meteorological data for accurate forecasting
                </p>
              </div>
              <div className="p-6 bg-card rounded-lg shadow-soft">
                <div className="w-16 h-16 mx-auto mb-4 bg-accent/10 rounded-full flex items-center justify-center">
                  <Factory className="w-8 h-8 text-accent" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Ground Sensors</h3>
                <p className="text-sm text-muted-foreground">
                  Validated with ground-level monitoring stations for precision
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
};

export default Index;
