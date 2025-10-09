import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ModernHeader } from "@/components/ui/modern-header";
import { HeroSection } from "@/components/sections/HeroSection";
import { ModernStarBackground } from "@/components/ui/modern-star-background";
import { FloatingTechIcons } from "@/components/ui/floating-tech-icons";
import { CircleZoomTransition } from "@/components/ui/circle-zoom-transition";

const HomePage = () => {
  const [showCircleTransition, setShowCircleTransition] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowCircleTransition(false);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* Primary Circle Animation for Home */}
      <CircleZoomTransition 
        isVisible={showCircleTransition} 
        color="hsl(var(--primary))" // Primary theme color for home
        size={100}
      />
      
      <motion.div 
        className="min-h-screen bg-background relative overflow-hidden"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ 
          scale: showCircleTransition ? 0.8 : 1, 
          opacity: showCircleTransition ? 0 : 1 
        }}
        transition={{ 
          duration: 0.8, 
          ease: "easeInOut",
          delay: showCircleTransition ? 0 : 0.6
        }}
      >
        {/* Simple Blue Background like your current design */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800" />
        <FloatingTechIcons />
        <motion.div 
          className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5"
          initial={{ opacity: 0 }}
          animate={{ opacity: showCircleTransition ? 0 : 1 }}
          transition={{ duration: 1, delay: 0.8 }}
        />
        <div className="relative z-10">
          <ModernHeader />
          <main>
            <motion.section 
              id="home"
              initial={{ y: 50, opacity: 0 }}
              animate={{ 
                y: showCircleTransition ? 50 : 0, 
                opacity: showCircleTransition ? 0 : 1 
              }}
              transition={{ duration: 0.8, delay: 1 }}
            >
              <HeroSection />
            </motion.section>
          </main>
        </div>
      </motion.div>
    </>
  );
};

export default HomePage;
