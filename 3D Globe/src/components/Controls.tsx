import { motion } from 'framer-motion';
import { RotateCw, PauseCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ControlsProps {
  autoRotate: boolean;
  onToggleRotate: () => void;
}

const Controls = ({ autoRotate, onToggleRotate }: ControlsProps) => {
  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.5 }}
      className="fixed bottom-6 left-6 z-40"
    >
      <div className="bg-card/95 backdrop-blur-xl rounded-xl border border-border shadow-lg card-glow p-4">
        <div className="flex items-center gap-3">
          <Button
            variant={autoRotate ? "default" : "outline"}
            size="sm"
            onClick={onToggleRotate}
            className="gap-2"
          >
            {autoRotate ? (
              <>
                <RotateCw className="w-4 h-4 animate-spin" />
                <span className="hidden sm:inline">Auto-Rotate On</span>
              </>
            ) : (
              <>
                <PauseCircle className="w-4 h-4" />
                <span className="hidden sm:inline">Auto-Rotate Off</span>
              </>
            )}
          </Button>
          
          <div className="flex items-center gap-2 px-3 py-2 bg-muted/30 rounded-lg">
            <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span className="text-xs text-muted-foreground hidden sm:inline">
              Live Data
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Controls;
