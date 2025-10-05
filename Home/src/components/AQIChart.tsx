import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';

const data = [
  { time: '00:00', aqi: 45, pm25: 12, pm10: 20, no2: 15 },
  { time: '04:00', aqi: 42, pm25: 10, pm10: 18, no2: 14 },
  { time: '08:00', aqi: 55, pm25: 18, pm10: 25, no2: 20 },
  { time: '12:00', aqi: 62, pm25: 22, pm10: 30, no2: 25 },
  { time: '16:00', aqi: 48, pm25: 14, pm10: 22, no2: 18 },
  { time: '20:00', aqi: 38, pm25: 8, pm10: 15, no2: 12 },
];

export default function AQIChart() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-card border border-border rounded-lg p-6 card-glow"
    >
      <h2 className="text-xl font-bold text-foreground mb-6">24-Hour AQI Trend</h2>
      
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="aqiGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="hsl(var(--accent))" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="hsl(var(--accent))" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
          <XAxis 
            dataKey="time" 
            stroke="hsl(var(--muted-foreground))"
            style={{ fontSize: '12px' }}
          />
          <YAxis 
            stroke="hsl(var(--muted-foreground))"
            style={{ fontSize: '12px' }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: 'hsl(var(--card))',
              border: '1px solid hsl(var(--border))',
              borderRadius: '8px',
              color: 'hsl(var(--foreground))',
            }}
          />
          <Area
            type="monotone"
            dataKey="aqi"
            stroke="hsl(var(--accent))"
            strokeWidth={2}
            fill="url(#aqiGradient)"
          />
        </AreaChart>
      </ResponsiveContainer>

      <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-border">
        <div>
          <p className="text-xs text-muted-foreground mb-1">PM2.5</p>
          <p className="text-lg font-bold text-foreground">12 μg/m³</p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground mb-1">PM10</p>
          <p className="text-lg font-bold text-foreground">20 μg/m³</p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground mb-1">NO₂</p>
          <p className="text-lg font-bold text-foreground">15 μg/m³</p>
        </div>
      </div>
    </motion.div>
  );
}
