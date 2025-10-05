import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { useState, useEffect } from "react";

interface PollutantCardProps {
  name: string;
  value: number;
  unit: string;
  trend: number;
}

export const PollutantCard = ({ name, value, unit, trend }: PollutantCardProps) => {
  const [displayValue, setDisplayValue] = useState(value);

  useEffect(() => {
    const interval = setInterval(() => {
      setDisplayValue((prev) => {
        const variation = (Math.random() - 0.5) * Math.abs(trend) * 10;
        return Math.max(0, prev + variation);
      });
    }, 2000);

    return () => clearInterval(interval);
  }, [trend]);

  const getTrendIcon = () => {
    if (trend > 0.01) return <TrendingUp className="h-4 w-4 text-destructive" />;
    if (trend < -0.01) return <TrendingDown className="h-4 w-4 text-green-400" />;
    return <Minus className="h-4 w-4 text-muted-foreground" />;
  };

  return (
    <motion.div
      className="glass-panel rounded-xl p-6 space-y-4"
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-foreground">{name}</h3>
        {getTrendIcon()}
      </div>

      <div className="space-y-2">
        <motion.div
          key={displayValue}
          initial={{ opacity: 0.7 }}
          animate={{ opacity: 1 }}
          className="text-4xl font-bold text-primary"
        >
          {displayValue.toFixed(1)}
        </motion.div>
        <div className="text-sm text-muted-foreground">{unit}</div>
      </div>

      {/* Visual indicator bar */}
      <div className="h-2 bg-muted rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-primary to-secondary rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${Math.min((displayValue / 100) * 100, 100)}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>
    </motion.div>
  );
};
