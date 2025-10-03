import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Header } from "@/components/layout/Header";
import { AboutSection } from "@/components/sections/AboutSectionNew";
import { AnimatedBackground } from "@/components/ui/animated-background";
import { CircleZoomTransition } from "@/components/ui/circle-zoom-transition";

const AboutPage = () => {
  const [showCircleTransition, setShowCircleTransition] = useState(true);

  useEffect(() => {
    // Hide circle transition after animation completes
    const timer = setTimeout(() => {
      setShowCircleTransition(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* Primary Circle Animation */}
      <CircleZoomTransition 
        isVisible={showCircleTransition} 
        color="hsl(var(--primary))" // Primary theme color matching home
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
        <AnimatedBackground />
        <motion.div 
          className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5"
          initial={{ opacity: 0 }}
          animate={{ opacity: showCircleTransition ? 0 : 1 }}
          transition={{ duration: 1, delay: 0.8 }}
        />
        <div className="relative z-10">
          <Header />
          <main className="pt-20">
            <motion.section 
              id="about"
              initial={{ y: 50, opacity: 0 }}
              animate={{ 
                y: showCircleTransition ? 50 : 0, 
                opacity: showCircleTransition ? 0 : 1 
              }}
              transition={{ duration: 0.8, delay: 1 }}
            >
              <AboutSection />
            </motion.section>
          </main>
        </div>
      </motion.div>
    </>
  );
};

export default AboutPage;
