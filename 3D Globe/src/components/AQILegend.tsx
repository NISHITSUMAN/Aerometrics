import { motion } from 'framer-motion';

const aqiLevels = [
  { range: '0-50', label: 'Good', color: '#00e400' },
  { range: '51-100', label: 'Moderate', color: '#ffff00' },
  { range: '101-150', label: 'Unhealthy for Sensitive', color: '#ff7e00' },
  { range: '151-200', label: 'Unhealthy', color: '#ff0000' },
  { range: '201-300', label: 'Very Unhealthy', color: '#8f3f97' },
  { range: '301+', label: 'Hazardous', color: '#7e0023' },
];

const AQILegend = () => {
  return (
    <motion.div
      initial={{ x: -400, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: 0.3 }}
      className="fixed top-20 left-6 z-40 bg-card/95 backdrop-blur-xl rounded-xl border border-border shadow-lg card-glow p-4 max-w-xs"
    >
      <h3 className="text-sm font-semibold text-foreground mb-3">AQI Scale</h3>
      <div className="space-y-2">
        {aqiLevels.map((level, index) => (
          <div key={index} className="flex items-center gap-3">
            <div
              className="w-8 h-8 rounded-lg flex-shrink-0"
              style={{ backgroundColor: level.color }}
            />
            <div className="flex-1 min-w-0">
              <div className="text-xs font-medium text-foreground">{level.label}</div>
              <div className="text-xs text-muted-foreground">{level.range}</div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-4 pt-4 border-t border-border">
        <p className="text-xs text-muted-foreground">
          Data powered by NASA TEMPO Satellite and OpenAQ ground sensors
        </p>
      </div>
    </motion.div>
  );
};

export default AQILegend;
