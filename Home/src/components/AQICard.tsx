import { motion } from 'framer-motion';
import { MapPin, Wind, Droplets } from 'lucide-react';

interface AQICardProps {
  city: string;
  country: string;
  aqi: number;
  pollutant: string;
  humidity: number;
  windSpeed: number;
  status: 'good' | 'moderate' | 'unhealthy' | 'very-unhealthy' | 'hazardous';
}

const statusConfig = {
  good: { label: 'Good', color: 'aqi-good' },
  moderate: { label: 'Moderate', color: 'aqi-moderate' },
  unhealthy: { label: 'Unhealthy', color: 'aqi-unhealthy' },
  'very-unhealthy': { label: 'Very Unhealthy', color: 'aqi-very-unhealthy' },
  hazardous: { label: 'Hazardous', color: 'aqi-hazardous' },
};

export default function AQICard({ city, country, aqi, pollutant, humidity, windSpeed, status }: AQICardProps) {
  const config = statusConfig[status];
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      className="bg-card border border-border rounded-lg p-6 card-glow backdrop-blur-sm"
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <MapPin className="w-4 h-4 text-accent" />
            <h3 className="text-lg font-semibold text-foreground">{city}</h3>
          </div>
          <p className="text-sm text-muted-foreground">{country}</p>
        </div>
        <div className={`px-3 py-1 rounded-full text-xs font-medium bg-${config.color}/20 text-${config.color}`}>
          {config.label}
        </div>
      </div>

      <div className="mb-4">
        <div className="text-5xl font-bold mb-1 text-gradient">{aqi}</div>
        <p className="text-sm text-muted-foreground">Air Quality Index</p>
      </div>

      <div className="grid grid-cols-3 gap-3 pt-4 border-t border-border">
        <div>
          <p className="text-xs text-muted-foreground mb-1">Pollutant</p>
          <p className="text-sm font-medium text-foreground">{pollutant}</p>
        </div>
        <div className="flex items-center gap-1">
          <Droplets className="w-3 h-3 text-accent" />
          <div>
            <p className="text-xs text-muted-foreground">Humidity</p>
            <p className="text-sm font-medium text-foreground">{humidity}%</p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <Wind className="w-3 h-3 text-accent" />
          <div>
            <p className="text-xs text-muted-foreground">Wind</p>
            <p className="text-sm font-medium text-foreground">{windSpeed}m/s</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
