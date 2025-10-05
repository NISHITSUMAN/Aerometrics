import { useState } from 'react';
import { motion } from 'framer-motion';
import Globe3D from '@/components/Globe3D';
import Header from '@/components/Header';
import CityInfoPanel from '@/components/CityInfoPanel';
import Controls from '@/components/Controls';
import AQILegend from '@/components/AQILegend';
import { CityData } from '@/data/cityData';

const Index = () => {
  const [selectedCity, setSelectedCity] = useState<CityData | null>(null);
  const [autoRotate, setAutoRotate] = useState(true);

  const handleCityClick = (city: CityData) => {
    setSelectedCity(city);
  };

  const handleClosePanel = () => {
    setSelectedCity(null);
  };

  const handleToggleRotate = () => {
    setAutoRotate(!autoRotate);
  };

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <Header />
      
      {/* Background stars effect */}
      <div className="absolute inset-0 opacity-30">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-foreground rounded-full"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0.2, 1, 0.2],
            }}
            transition={{
              duration: 2 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Main Globe */}
      <Globe3D onCityClick={handleCityClick} autoRotate={autoRotate} />

      {/* UI Components */}
      <AQILegend />
      <Controls autoRotate={autoRotate} onToggleRotate={handleToggleRotate} />
      <CityInfoPanel city={selectedCity} onClose={handleClosePanel} />

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="fixed bottom-6 right-6 z-30"
      >
        <div className="bg-card/80 backdrop-blur-sm rounded-lg px-4 py-2 border border-border">
          <p className="text-xs text-muted-foreground">
            Made by <span className="text-secondary font-semibold">Team Asura Legion</span>
          </p>
        </div>
      </motion.footer>

      
    </div>
  );
};

export default Index;
