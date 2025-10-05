import { motion } from 'framer-motion';
import { Satellite, Menu } from 'lucide-react';
import { useState } from 'react';
import AQICard from '@/components/AQICard';
import ForecastPanel from '@/components/ForecastPanel';
import AQIChart from '@/components/AQIChart';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border"
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <Satellite className="w-8 h-8 text-accent" />
            </motion.div>
            <div>
              <h1 className="text-xl font-bold text-gradient">Aero AI</h1>
              <p className="text-xs text-muted-foreground">AI for anything, anywher</p>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-6">
            <a href="#home" className="text-sm font-medium hover:text-accent transition-colors">Home</a>
            <a href="https://at-location.vercel.app/" className="text-sm font-medium hover:text-accent transition-colors">At Location</a>
            <a href="https://forecast-plum.vercel.app/" className="text-sm font-medium hover:text-accent transition-colors">Forecast</a>
            <a href="https://aero-ai-mu.vercel.app/" className="text-sm font-medium hover:text-accent transition-colors">AI</a>
          </nav>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 hover:bg-muted rounded-lg transition-colors"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>

        {isMenuOpen && (
          <motion.nav
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden mt-4 pb-4 flex flex-col gap-3"
          >
            <a href="https://aerometrics-wine.vercel.app/#home" className="text-sm font-medium hover:text-accent transition-colors">Home</a>
            <a href="https://globe-3d-chi.vercel.app/" className="text-sm font-medium hover:text-accent transition-colors">3D Earth</a>
            <a href="#forecast" className="text-sm font-medium hover:text-accent transition-colors">Forecast</a>
            <a href="#data" className="text-sm font-medium hover:text-accent transition-colors">Data</a>
            <a href="https://aero-ai-mu.vercel.app/" className="text-sm font-medium hover:text-accent transition-colors">AI</a>
          </motion.nav>
        )}
      </div>
    </motion.header>
  );
}
