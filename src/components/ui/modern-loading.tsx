import { motion } from "framer-motion";

export const ModernLoading = () => {
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 backdrop-blur-md z-50 flex items-center justify-center">
      <div className="relative">
        {/* Central Pulsing Circle */}
        <motion.div
          className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-400 to-blue-600"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.7, 1, 0.7],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        
        {/* Outer Ring */}
        <motion.div
          className="absolute inset-0 w-16 h-16 rounded-full border-2 border-blue-400/30"
          animate={{
            scale: [1, 1.4, 1],
            opacity: [0.3, 0.8, 0.3],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.2,
          }}
        />
        
        {/* Second Outer Ring */}
        <motion.div
          className="absolute inset-0 w-16 h-16 rounded-full border border-slate-400/20"
          animate={{
            scale: [1, 1.6, 1],
            opacity: [0.2, 0.6, 0.2],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.4,
          }}
        />

        {/* Floating Particles */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1.5 h-1.5 bg-blue-400 rounded-full"
            style={{
              left: '50%',
              top: '50%',
            }}
            animate={{
              x: [
                0,
                Math.cos((i * 60 * Math.PI) / 180) * 50,
              ],
              y: [
                0,
                Math.sin((i * 60 * Math.PI) / 180) * 50,
              ],
              opacity: [0, 1, 0],
              scale: [0, 1.5, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 0.2,
              ease: "easeInOut",
            }}
          />
        ))}


      </div>
    </div>
  );
};