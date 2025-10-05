import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AQICard from '@/components/AQICard';
import ForecastPanel from '@/components/ForecastPanel';
import AQIChart from '@/components/AQIChart';
import { ArrowDown, Satellite, Database, Brain } from 'lucide-react';
import spaceHero from '@/assets/space-hero.jpg';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${spaceHero})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background/70 to-background" />
        
        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-gradient">
              Aerometrics
            </h1>
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-foreground">
              Air Quality Forecast System
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Real-time air quality monitoring and AI-powered forecasting using NASA's TEMPO satellite data 
              combined with ground station measurements from OpenAQ.
            </p>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex gap-4 justify-center flex-wrap"
            >
              <a 
                href="https://globe-3d-chi.vercel.app/" 
                className="px-8 py-3 bg-primary hover:bg-primary/80 text-primary-foreground rounded-lg font-medium transition-colors"
              >
                Explore 3D Earth
              </a>
              <a 
                href="https://forecast-894y.vercel.app/" 
                className="px-8 py-3 bg-accent hover:bg-accent/80 text-accent-foreground rounded-lg font-medium transition-colors"
              >
                View Forecast
              </a>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1.5, repeat: Infinity }}
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          >
            <ArrowDown className="w-8 h-8 text-accent animate-bounce" />
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4 text-foreground">How It Works</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Combining satellite observations with ground truth data and AI predictions
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-card border border-border rounded-lg p-8 text-center card-glow"
            >
              <div className="inline-block p-4 bg-primary/10 rounded-full mb-4">
                <Satellite className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-foreground">NASA TEMPO Data</h3>
              <p className="text-muted-foreground">
                High-resolution satellite measurements of air pollutants across North America
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-card border border-border rounded-lg p-8 text-center card-glow"
            >
              <div className="inline-block p-4 bg-accent/10 rounded-full mb-4">
                <Database className="w-8 h-8 text-accent" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-foreground">OpenAQ Ground Data</h3>
              <p className="text-muted-foreground">
                Real-time air quality measurements from thousands of monitoring stations worldwide
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="bg-card border border-border rounded-lg p-8 text-center card-glow"
            >
              <div className="inline-block p-4 bg-aqi-good/10 rounded-full mb-4">
                <Brain className="w-8 h-8 text-aqi-good" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-foreground">AI Predictions</h3>
              <p className="text-muted-foreground">
                Machine learning models forecast air quality and provide personalized health alerts
              </p>
            </motion.div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Index;
