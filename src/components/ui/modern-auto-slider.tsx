import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";

interface ModernSliderProps {
  items: Array<{
    id: string;
    title: string;
    description: string;
    icon?: any;
  }>;
  direction?: "left" | "right";
  speed?: number;
  className?: string;
}

export const ModernAutoSlider = ({ 
  items, 
  direction = "left", 
  speed = 50,
  className = "" 
}: ModernSliderProps) => {
  const controls = useAnimation();

  useEffect(() => {
    const slideDistance = -100 * items.length;
    
    controls.start({
      x: direction === "left" ? [0, slideDistance] : [slideDistance, 0],
      transition: {
        duration: speed,
        repeat: Infinity,
        ease: "linear",
      },
    });
  }, [controls, direction, speed, items.length]);

  return (
    <div className={`overflow-hidden ${className}`}>
      <motion.div
        className="flex space-x-8"
        animate={controls}
        style={{ width: `${(items.length + 1) * 100}%` }}
      >
        {/* Original items */}
        {items.map((item, index) => (
          <motion.div
            key={`${item.id}-original`}
            className="flex-shrink-0 w-80 h-48 bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-6 border border-slate-700 backdrop-blur-sm shadow-xl"
            whileHover={{ 
              scale: 1.05,
              y: -10,
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
            }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex flex-col h-full justify-between">
              <div className="flex items-center space-x-3 mb-4">
                {item.icon && (
                  <motion.div
                    className="text-2xl text-blue-400"
                    animate={{
                      rotate: [0, 5, -5, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: index * 0.2,
                    }}
                  >
                    <item.icon />
                  </motion.div>
                )}
                <h3 className="text-xl font-bold text-white">{item.title}</h3>
              </div>
              
              <p className="text-slate-300 text-sm leading-relaxed flex-1">
                {item.description}
              </p>
              
              {/* Modern Progress Bar */}
              <motion.div
                className="w-full h-1 bg-slate-700 rounded-full mt-4 overflow-hidden"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <motion.div
                  className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full"
                  initial={{ width: "0%" }}
                  whileInView={{ width: "100%" }}
                  transition={{ duration: 2, delay: index * 0.2 }}
                />
              </motion.div>
            </div>
            
            {/* Corner Accent */}
            <motion.div
              className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-blue-500/20 to-transparent rounded-tr-2xl"
              animate={{
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: index * 0.3,
              }}
            />
          </motion.div>
        ))}
        
        {/* Duplicate items for seamless loop */}
        {items.map((item, index) => (
          <motion.div
            key={`${item.id}-duplicate`}
            className="flex-shrink-0 w-80 h-48 bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-6 border border-slate-700 backdrop-blur-sm shadow-xl"
            whileHover={{ 
              scale: 1.05,
              y: -10,
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
            }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex flex-col h-full justify-between">
              <div className="flex items-center space-x-3 mb-4">
                {item.icon && (
                  <motion.div
                    className="text-2xl text-blue-400"
                    animate={{
                      rotate: [0, 5, -5, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: index * 0.2,
                    }}
                  >
                    <item.icon />
                  </motion.div>
                )}
                <h3 className="text-xl font-bold text-white">{item.title}</h3>
              </div>
              
              <p className="text-slate-300 text-sm leading-relaxed flex-1">
                {item.description}
              </p>
              
              <motion.div
                className="w-full h-1 bg-slate-700 rounded-full mt-4 overflow-hidden"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <motion.div
                  className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full"
                  initial={{ width: "0%" }}
                  whileInView={{ width: "100%" }}
                  transition={{ duration: 2, delay: index * 0.2 }}
                />
              </motion.div>
            </div>
            
            <motion.div
              className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-blue-500/20 to-transparent rounded-tr-2xl"
              animate={{
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: index * 0.3,
              }}
            />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};