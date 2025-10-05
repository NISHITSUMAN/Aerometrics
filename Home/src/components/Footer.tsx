import { motion } from 'framer-motion';
import { Globe, Github, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-card border-t border-border mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-bold text-gradient mb-4">Aeromatrics</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Real-time air quality forecasting using NASA satellite data and AI predictions.
            </p>
            <div className="flex gap-3">
              <a href="https://aerometrics.vercel.app/#" className="p-2 bg-muted hover:bg-accent/20 rounded-lg transition-colors">
                <Globe className="w-5 h-5" />
              </a>
              <a href="https://github.com/NISHITSUMAN/Aerometrics" className="p-2 bg-muted hover:bg-accent/20 rounded-lg transition-colors">
                <Github className="w-5 h-5" />
              </a>
              <a href="mailto:hacathon13@gmail.com" className="p-2 bg-muted hover:bg-accent/20 rounded-lg transition-colors">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-4 text-foreground">Data Sources</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• NASA TEMPO Satellite</li>
              <li>• OpenAQ Ground Stations</li>
              <li>• Weather API Integration</li>
              <li>• Real-time Data Processing</li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-4 text-foreground">Credits</h4>
            <p className="text-sm text-muted-foreground mb-2">
              Developed by <span className="text-accent font-semibold">Team Asura Legion</span>
            </p>
            <p className="text-xs text-muted-foreground">
              NASA Space Apps Challenge 2025
            </p>
            <div className="mt-4 pt-4 border-t border-border">
              <p className="text-xs text-muted-foreground">
                © 2025 Aeromatrics AQ Forecast. Built with NASA Open Data.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
