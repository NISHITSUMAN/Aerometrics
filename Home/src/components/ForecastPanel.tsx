import { motion } from 'framer-motion';
import { Calendar, TrendingUp, AlertTriangle } from 'lucide-react';

interface ForecastData {
  date: string;
  aqi: number;
  trend: 'up' | 'down' | 'stable';
  alert?: string;
}

const forecasts: ForecastData[] = [
  { date: 'Today', aqi: 42, trend: 'stable' },
  { date: 'Tomorrow', aqi: 55, trend: 'up', alert: 'Moderate levels expected' },
  { date: 'Day 3', aqi: 38, trend: 'down' },
  { date: 'Day 4', aqi: 45, trend: 'up' },
  { date: 'Day 5', aqi: 40, trend: 'stable' },
];

export default function ForecastPanel() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="bg-card border border-border rounded-lg p-6 card-glow"
    >
      <div className="flex items-center gap-2 mb-6">
        <Calendar className="w-5 h-5 text-accent" />
        <h2 className="text-xl font-bold text-foreground">5-Day Forecast</h2>
      </div>

      <div className="space-y-4">
        {forecasts.map((forecast, index) => (
          <motion.div
            key={forecast.date}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-center justify-between p-4 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors"
          >
            <div>
              <p className="font-medium text-foreground">{forecast.date}</p>
              {forecast.alert && (
                <div className="flex items-center gap-1 mt-1">
                  <AlertTriangle className="w-3 h-3 text-aqi-moderate" />
                  <p className="text-xs text-aqi-moderate">{forecast.alert}</p>
                </div>
              )}
            </div>
            
            <div className="flex items-center gap-3">
              <span className="text-2xl font-bold text-gradient">{forecast.aqi}</span>
              <TrendingUp 
                className={`w-5 h-5 ${
                  forecast.trend === 'up' ? 'text-aqi-moderate rotate-0' :
                  forecast.trend === 'down' ? 'text-aqi-good rotate-180' :
                  'text-muted-foreground rotate-90'
                }`}
              />
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-primary/10 border border-primary/20 rounded-lg">
        <h3 className="text-sm font-semibold text-primary mb-2">AI Health Alert</h3>
        <p className="text-xs text-muted-foreground">
          Air quality is expected to improve over the next 48 hours. Safe for outdoor activities.
        </p>
      </div>
    </motion.div>
  );
}
