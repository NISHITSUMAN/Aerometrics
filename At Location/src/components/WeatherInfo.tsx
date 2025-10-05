import { motion } from "framer-motion";
import { WeatherData, getAQILevel } from "@/utils/weatherApi";
import { Thermometer, Droplets, Wind, Sun } from "lucide-react";

interface WeatherInfoProps {
  data: WeatherData;
}

export const WeatherInfo = ({ data }: WeatherInfoProps) => {
  const aqiInfo = getAQILevel(data.pm25);

  return (
    <div className="glass-panel rounded-2xl p-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* AQI Status */}
        <div className="space-y-4">
          <h3 className="text-2xl font-bold text-foreground">Air Quality Index</h3>
          <div className="flex items-center gap-4">
            <motion.div
              className="text-6xl font-bold"
              style={{ color: aqiInfo.color }}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {Math.round(data.pm25)}
            </motion.div>
            <div className="space-y-1">
              <div className="text-xl font-semibold" style={{ color: aqiInfo.color }}>
                {aqiInfo.level}
              </div>
              <div className="text-sm text-muted-foreground">{data.condition}</div>
            </div>
          </div>
        </div>

        {/* Weather Details */}
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-3 p-4 rounded-lg bg-card/30">
            <Thermometer className="h-6 w-6 text-primary" />
            <div>
              <div className="text-2xl font-bold">{data.temperature.toFixed(1)}°C</div>
              <div className="text-xs text-muted-foreground">Temperature</div>
            </div>
          </div>

          <div className="flex items-center gap-3 p-4 rounded-lg bg-card/30">
            <Droplets className="h-6 w-6 text-primary" />
            <div>
              <div className="text-2xl font-bold">{data.humidity.toFixed(0)}%</div>
              <div className="text-xs text-muted-foreground">Humidity</div>
            </div>
          </div>

          <div className="flex items-center gap-3 p-4 rounded-lg bg-card/30">
            <Wind className="h-6 w-6 text-primary" />
            <div>
              <div className="text-2xl font-bold">{data.wind.toFixed(1)}</div>
              <div className="text-xs text-muted-foreground">Wind (km/h)</div>
            </div>
          </div>

          <div className="flex items-center gap-3 p-4 rounded-lg bg-card/30">
            <Sun className="h-6 w-6 text-primary" />
            <div>
              <div className="text-2xl font-bold">{data.uvIndex}</div>
              <div className="text-xs text-muted-foreground">UV Index</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
