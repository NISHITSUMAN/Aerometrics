import { motion, AnimatePresence } from 'framer-motion';
import { X, Wind, Droplets, AlertTriangle } from 'lucide-react';
import { CityData, getAQIColor, getAQILevel, getAQIDescription } from '@/data/cityData';
import { Button } from '@/components/ui/button';

interface CityInfoPanelProps {
  city: CityData | null;
  onClose: () => void;
}

const CityInfoPanel = ({ city, onClose }: CityInfoPanelProps) => {
  if (!city) return null;

  const aqiColor = getAQIColor(city.aqi);
  const aqiLevel = getAQILevel(city.aqi);
  const aqiDescription = getAQIDescription(city.aqi);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ x: 400, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: 400, opacity: 0 }}
        transition={{ type: 'spring', damping: 25 }}
        className="fixed top-20 right-6 w-96 max-h-[80vh] overflow-y-auto bg-card/95 backdrop-blur-xl rounded-xl border border-border shadow-2xl card-glow z-40"
      >
        <div className="p-6">
          {/* Header */}
          <div className="flex items-start justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-foreground">{city.city}</h2>
              <p className="text-sm text-muted-foreground">
                {city.lat.toFixed(4)}°N, {city.lng.toFixed(4)}°E
              </p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="hover:bg-muted"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>

          {/* AQI Display */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">Air Quality Index</span>
              <span className="text-xs text-secondary">Real-time</span>
            </div>
            <div
              className="text-6xl font-bold mb-2"
              style={{ color: aqiColor }}
            >
              {city.aqi}
            </div>
            <div
              className="inline-block px-3 py-1 rounded-full text-sm font-semibold"
              style={{
                backgroundColor: `${aqiColor}20`,
                color: aqiColor,
                border: `1px solid ${aqiColor}`,
              }}
            >
              {aqiLevel}
            </div>
          </div>

          {/* Description */}
          <div className="mb-6 p-4 bg-muted/30 rounded-lg border border-border">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-warning flex-shrink-0 mt-0.5" />
              <p className="text-sm text-foreground">{aqiDescription}</p>
            </div>
          </div>

          {/* Pollutant Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3 p-3 bg-muted/20 rounded-lg">
              <Wind className="w-5 h-5 text-secondary" />
              <div>
                <div className="text-xs text-muted-foreground">Main Pollutant</div>
                <div className="text-sm font-semibold text-foreground">
                  {city.mainPollutant || 'N/A'}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-muted/20 rounded-lg">
              <Droplets className="w-5 h-5 text-primary" />
              <div>
                <div className="text-xs text-muted-foreground">Data Source</div>
                <div className="text-sm font-semibold text-foreground">
                  NASA TEMPO + OpenAQ
                </div>
              </div>
            </div>
          </div>

          {/* Health Recommendations */}
          <div className="mt-6 p-4 bg-primary/10 rounded-lg border border-primary/30">
            <h3 className="text-sm font-semibold text-foreground mb-2">Health Recommendations</h3>
            <ul className="text-xs text-muted-foreground space-y-1">
              {city.aqi > 150 ? (
                <>
                  <li>• Avoid outdoor activities</li>
                  <li>• Use air purifiers indoors</li>
                  <li>• Wear N95 masks if going outside</li>
                  <li>• Keep windows closed</li>
                </>
              ) : city.aqi > 100 ? (
                <>
                  <li>• Limit prolonged outdoor exertion</li>
                  <li>• Sensitive groups should reduce activity</li>
                  <li>• Monitor air quality updates</li>
                </>
              ) : (
                <>
                  <li>• Safe for outdoor activities</li>
                  <li>• Enjoy fresh air responsibly</li>
                  <li>• Monitor local conditions</li>
                </>
              )}
            </ul>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default CityInfoPanel;
