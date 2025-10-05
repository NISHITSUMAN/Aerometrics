import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Satellite, MapPin } from "lucide-react";

interface ModeSelectorProps {
  onSelectMode: (mode: "live" | "demo") => void;
  isScanning: boolean;
}

export const ModeSelector = ({ onSelectMode, isScanning }: ModeSelectorProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="flex flex-col items-center justify-center min-h-screen relative z-10"
    >
      <motion.div
        className="text-center space-y-8"
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="space-y-4">
          <h1 className="text-6xl md:text-7xl font-bold glow-text">
            Aeromatrics
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground">
            From EarthData to Action
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mt-12">
          <Button
            onClick={() => onSelectMode("live")}
            disabled={isScanning}
            size="lg"
            className="group relative overflow-hidden bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-lg rounded-xl glow-primary transition-all duration-300 hover:scale-105"
          >
            <Satellite className="mr-2 h-6 w-6" />
            {isScanning ? "Scanning..." : "Scan My Sky (Live)"}
          </Button>

          <Button
            onClick={() => onSelectMode("demo")}
            disabled={isScanning}
            size="lg"
            variant="outline"
            className="group relative overflow-hidden border-2 border-secondary text-secondary hover:bg-secondary/10 px-8 py-6 text-lg rounded-xl transition-all duration-300 hover:scale-105"
          >
            <MapPin className="mr-2 h-6 w-6" />
            Demo Mode (Nashik)
          </Button>
        </div>
      </motion.div>
    </motion.div>
  );
};
