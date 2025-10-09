import { motion } from "framer-motion";

interface CircleZoomTransitionProps {
  isVisible: boolean;
  color?: string;
  size?: number;
}

export const CircleZoomTransition = ({ 
  isVisible, 
  color = "hsl(var(--primary))",
  size = 100 
}: CircleZoomTransitionProps) => {
  return (
    <motion.div
      className="fixed inset-0 z-40 pointer-events-none"
      initial={{ opacity: 0 }}
      animate={{ opacity: isVisible ? 1 : 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Outer Glow Ring */}
      <motion.div
        className="absolute top-1/2 left-1/2"
        style={{
          background: `radial-gradient(circle, ${color}40 0%, ${color}20 30%, transparent 70%)`,
          borderRadius: "50%",
        }}
        initial={{
          width: 0,
          height: 0,
          x: "-50%",
          y: "-50%",
        }}
        animate={{
          width: isVisible ? size * 60 : 0,
          height: isVisible ? size * 60 : 0,
          x: "-50%",
          y: "-50%",
        }}
        transition={{
          duration: 1.2,
          ease: [0.25, 0.46, 0.45, 0.94],
          delay: 0.1,
        }}
      />
      
      {/* Main Circle */}
      <motion.div
        className="absolute top-1/2 left-1/2"
        style={{
          background: `linear-gradient(135deg, ${color} 0%, ${color}CC  100%)`,
          borderRadius: "50%",
          boxShadow: `0 0 100px ${color}80`,
        }}
        initial={{
          width: 0,
          height: 0,
          x: "-50%",
          y: "-50%",
          scale: 0,
        }}
        animate={{
          width: isVisible ? size * 50 : 0,
          height: isVisible ? size * 50 : 0,
          x: "-50%",
          y: "-50%",
          scale: isVisible ? 1 : 0,
        }}
        transition={{
          duration: 0.8,
          ease: [0.25, 0.46, 0.45, 0.94],
        }}
      />
      
      {/* Inner Sparkle Effects */}
      {isVisible && [...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute top-1/2 left-1/2 w-2 h-2 bg-white rounded-full"
          style={{
            filter: 'blur(0.5px)',
          }}
          initial={{
            x: "-50%",
            y: "-50%",
            scale: 0,
            opacity: 0,
          }}
          animate={{
            x: `calc(-50% + ${Math.cos((i * 30 * Math.PI) / 180) * 200}px)`,
            y: `calc(-50% + ${Math.sin((i * 30 * Math.PI) / 180) * 200}px)`,
            scale: [0, 1, 0],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 1.5,
            delay: 0.3 + (i * 0.05),
            ease: "easeOut",
          }}
        />
      ))}
    </motion.div>
  );
};