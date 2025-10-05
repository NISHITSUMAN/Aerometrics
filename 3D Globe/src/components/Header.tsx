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
          {/* Left Section - Logo + Title + Live Indicator */}
          <div className="flex items-center gap-5">
            <div className="flex items-center gap-3">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <Satellite className="w-8 h-8 text-accent" />
              </motion.div>
              <div>
                <h1 className="text-xl font-bold text-gradient">Aeromatrics</h1>
                <p className="text-xs text-muted-foreground">Air Quality Forecast System</p>
              </div>
            </div>

            {/* Live TEMPO Satellite Indicator */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 text-sm text-secondary">
                <Satellite className="w-4 h-4" />
                <span className="hidden sm:inline">Live from TEMPO Satellite</span>
              </div>
              <div className="h-2 w-2 rounded-full bg-accent animate-pulse" />
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <a href="https://aerometrics.vercel.app/" className="text-sm font-medium hover:text-accent transition-colors">Home</a>
            <a href="https://globe-3d-chi.vercel.app/" className="text-sm font-medium hover:text-accent transition-colors">3D Earth</a>
            <a href="/components/AQICard" className="text-sm font-medium hover:text-accent transition-colors">Forecast</a>
            <a href="#data" className="text-sm font-medium hover:text-accent transition-colors">Data</a>
            <a href="#AI" className="text-sm font-medium hover:text-accent transition-colors">AI</a>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 hover:bg-muted rounded-lg transition-colors"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>

        {/* Mobile Navigation Dropdown */}
        {isMenuOpen && (
          <motion.nav
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden mt-4 pb-4 flex flex-col gap-3"
          >
            <a href="#home" className="text-sm font-medium hover:text-accent transition-colors">Home</a>
            <a href="#globe" className="text-sm font-medium hover:text-accent transition-colors">3D Earth</a>
            <a href="#forecast" className="text-sm font-medium hover:text-accent transition-colors">Forecast</a>
            <a href="#data" className="text-sm font-medium hover:text-accent transition-colors">Data</a>
          </motion.nav>
        )}
      </div>
    </motion.header>
  );
}
