import { Github, Linkedin, Mail } from "lucide-react";

export const Footer = () => {
  return (
    <footer id="contact" className="bg-card border-t border-border py-12 mt-16">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">From EarthData to Action</h3>
            <p className="text-sm text-muted-foreground">
              Built for EarthData Hackathon 2025
            </p>
          </div>

          <div className="flex items-center justify-center gap-6">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              <Github className="w-5 h-5" />
              <span>GitHub</span>
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              <Linkedin className="w-5 h-5" />
              <span>LinkedIn</span>
            </a>
            <a
              href="mailto:contact@airwatch.com"
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              <Mail className="w-5 h-5" />
              <span>Contact</span>
            </a>
          </div>

          <div className="text-xs text-muted-foreground pt-6 border-t border-border">
            <p>
              Powered by NASA TEMPO Satellite Data, Weather API & Ground Sensors
            </p>
            <p className="mt-2">
              © 2025 AirWatch. Predicting Cleaner, Safer Skies.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
