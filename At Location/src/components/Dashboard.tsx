import { motion } from "framer-motion";
import { WeatherData } from "@/utils/weatherApi";
import { PollutantCard } from "./PollutantCard";
import { WeatherInfo } from "./WeatherInfo";
import { TrendGraph } from "./TrendGraph";
import { AIInsight } from "./AIInsight";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

interface DashboardProps {
  data: WeatherData;
  mode: "live" | "demo";
  onBack: () => void;
}

export const Dashboard = ({ data, mode, onBack }: DashboardProps) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="relative z-10 min-h-screen p-6 overflow-y-auto"
    >
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <motion.div variants={itemVariants} className="flex items-center justify-between">
          <Button
            onClick={onBack}
            variant="outline"
            className="border-primary/50 text-primary hover:bg-primary/10"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          <div className="text-right">
            <h2 className="text-2xl font-bold glow-text">Environmental Monitor</h2>
            <p className="text-muted-foreground">
              Mode: {mode === "live" ? "Live Data" : "Demo - Nashik"}
            </p>
          </div>
        </motion.div>

        {/* Weather Info */}
        <motion.div variants={itemVariants}>
          <WeatherInfo data={data} />
        </motion.div>

        {/* Pollutants Grid */}
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          <PollutantCard
            name="PM2.5"
            value={data.pm25}
            unit="µg/m³"
            trend={0.02}
          />
          <PollutantCard
            name="PM10"
            value={data.pm10}
            unit="µg/m³"
            trend={-0.01}
          />
          <PollutantCard
            name="CO"
            value={data.co}
            unit="ppb"
            trend={0.03}
          />
          <PollutantCard
            name="SO₂"
            value={data.so2}
            unit="ppb"
            trend={0}
          />
          <PollutantCard
            name="NO₂"
            value={data.no2}
            unit="ppb"
            trend={-0.02}
          />
          <PollutantCard
            name="O₃"
            value={data.o3}
            unit="ppb"
            trend={0.01}
          />
        </motion.div>

        {/* 24h Trend */}
        <motion.div variants={itemVariants}>
          <TrendGraph data={data} />
        </motion.div>

        {/* AI Insight */}
        <motion.div variants={itemVariants}>
          <AIInsight data={data} />
        </motion.div>
      </div>
    </motion.div>
  );
};
