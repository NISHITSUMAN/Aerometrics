import { motion } from "framer-motion";
import { WeatherData, getAQILevel } from "@/utils/weatherApi";
import { Brain, AlertTriangle, CheckCircle, Info } from "lucide-react";

interface AIInsightProps {
  data: WeatherData;
}

export const AIInsight = ({ data }: AIInsightProps) => {
  const aqiInfo = getAQILevel(data.pm25);

  const getInsight = () => {
    if (data.pm25 <= 12) {
      return {
        icon: <CheckCircle className="h-6 w-6 text-green-400" />,
        title: "Excellent Air Quality",
        message: "Air quality is excellent. Perfect conditions for outdoor activities and exercise.",
        recommendations: [
          "Great time for outdoor activities",
          "No protective measures needed",
          "Ideal for sensitive groups",
        ],
      };
    } else if (data.pm25 <= 35.4) {
      return {
        icon: <Info className="h-6 w-6 text-primary" />,
        title: "Moderate Air Quality",
        message: "Air quality is acceptable. Sensitive individuals should consider reducing prolonged outdoor exposure during certain hours.",
        recommendations: [
          "Reduce exposure during peak pollution hours (typically 6-10 AM and 5-9 PM)",
          "Sensitive groups may consider wearing masks during outdoor activities",
          "Keep windows closed during high-traffic periods",
        ],
      };
    } else if (data.pm25 <= 55.4) {
      return {
        icon: <AlertTriangle className="h-6 w-6 text-yellow-400" />,
        title: "Unhealthy for Sensitive Groups",
        message: "Members of sensitive groups may experience health effects. The general public is less likely to be affected.",
        recommendations: [
          "Sensitive groups should limit prolonged outdoor exertion",
          "Consider indoor activities during poor air quality periods",
          "Use air purifiers indoors",
          "Monitor symptoms and adjust activities accordingly",
        ],
      };
    } else {
      return {
        icon: <AlertTriangle className="h-6 w-6 text-destructive" />,
        title: "Unhealthy Air Quality",
        message: "Everyone may begin to experience health effects. Members of sensitive groups may experience more serious effects.",
        recommendations: [
          "Avoid prolonged outdoor exertion",
          "Keep windows and doors closed",
          "Use air purifiers",
          "Wear N95 masks if going outside",
          "Monitor local air quality updates",
        ],
      };
    }
  };

  const insight = getInsight();

  return (
    <motion.div
      className="glass-panel rounded-2xl p-8 space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="flex items-center gap-4">
        <Brain className="h-8 w-8 text-secondary animate-pulse-glow" />
        <h3 className="text-2xl font-bold text-foreground">AI Environmental Analysis</h3>
      </div>

      <div className="flex items-start gap-4">
        {insight.icon}
        <div className="space-y-2">
          <h4 className="text-xl font-semibold" style={{ color: aqiInfo.color }}>
            {insight.title}
          </h4>
          <p className="text-muted-foreground">{insight.message}</p>
        </div>
      </div>

      <div className="space-y-3">
        <h5 className="font-semibold text-foreground">Recommendations:</h5>
        <ul className="space-y-2">
          {insight.recommendations.map((rec, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="flex items-start gap-3 text-sm text-muted-foreground"
            >
              <div className="mt-1 w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
              <span>{rec}</span>
            </motion.li>
          ))}
        </ul>
      </div>

      <div className="pt-4 border-t border-border">
        <div className="text-xs text-muted-foreground">
          Analysis based on current PM2.5 levels: {data.pm25.toFixed(1)} µg/m³ | 
          AQI Category: {aqiInfo.level}
        </div>
      </div>
    </motion.div>
  );
};
