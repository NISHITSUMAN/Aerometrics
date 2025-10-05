import { motion } from "framer-motion";
import { WeatherData } from "@/utils/weatherApi";
import { useMemo } from "react";

interface TrendGraphProps {
  data: WeatherData;
}

export const TrendGraph = ({ data }: TrendGraphProps) => {
  // Generate simulated 24h trend data
  const trendData = useMemo(() => {
    const hours = 24;
    const points = [];
    const baseValue = data.pm25;

    for (let i = 0; i < hours; i++) {
      const variation = Math.sin(i / 4) * 5 + (Math.random() - 0.5) * 3;
      points.push({
        hour: i,
        value: Math.max(0, baseValue + variation),
      });
    }

    return points;
  }, [data.pm25]);

  const maxValue = Math.max(...trendData.map((p) => p.value));
  const minValue = Math.min(...trendData.map((p) => p.value));
  const range = maxValue - minValue || 1;

  const getYPosition = (value: number) => {
    const normalized = (value - minValue) / range;
    return 100 - normalized * 80; // 80% of height
  };

  const pathPoints = trendData
    .map((point, i) => {
      const x = (i / (trendData.length - 1)) * 100;
      const y = getYPosition(point.value);
      return `${i === 0 ? "M" : "L"} ${x} ${y}`;
    })
    .join(" ");

  return (
    <div className="glass-panel rounded-2xl p-8">
      <h3 className="text-2xl font-bold text-foreground mb-6">24-Hour PM2.5 Trend</h3>

      <div className="relative h-64 w-full">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          {/* Gradient fill under line */}
          <defs>
            <linearGradient id="trendGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.3" />
              <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.05" />
            </linearGradient>
          </defs>

          {/* Fill area */}
          <motion.path
            d={`${pathPoints} L 100 100 L 0 100 Z`}
            fill="url(#trendGradient)"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          />

          {/* Line */}
          <motion.path
            d={pathPoints}
            fill="none"
            stroke="hsl(var(--primary))"
            strokeWidth="0.5"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          />

          {/* Data points */}
          {trendData.map((point, i) => (
            <motion.circle
              key={i}
              cx={(i / (trendData.length - 1)) * 100}
              cy={getYPosition(point.value)}
              r="0.8"
              fill="hsl(var(--primary))"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: i * 0.05, duration: 0.3 }}
            />
          ))}
        </svg>

        {/* Time labels */}
        <div className="absolute bottom-0 left-0 right-0 flex justify-between text-xs text-muted-foreground mt-2">
          <span>Now</span>
          <span>6h</span>
          <span>12h</span>
          <span>18h</span>
          <span>24h</span>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-center gap-4 text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-primary" />
          <span>PM2.5 Concentration</span>
        </div>
      </div>
    </div>
  );
};
