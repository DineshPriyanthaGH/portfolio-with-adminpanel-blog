import { motion } from "framer-motion";

interface CircleZoomTransitionProps {
  isVisible: boolean;
  color?: string;
  size?: number;
}

export const CircleZoomTransition = ({ 
  isVisible, 
  color = "rgb(59, 130, 246)", // Blue color
  size = 100 
}: CircleZoomTransitionProps) => {
  return (
    <motion.div
      className="fixed inset-0 z-40 pointer-events-none"
      initial={{ opacity: 0 }}
      animate={{ opacity: isVisible ? 1 : 0 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        className="absolute top-1/2 left-1/2"
        style={{
          backgroundColor: color,
          borderRadius: "50%",
        }}
        initial={{
          width: 0,
          height: 0,
          x: "-50%",
          y: "-50%",
        }}
        animate={{
          width: isVisible ? size * 50 : 0, // Large circle that covers screen
          height: isVisible ? size * 50 : 0,
          x: "-50%",
          y: "-50%",
        }}
        transition={{
          duration: 0.8,
          ease: [0.25, 0.46, 0.45, 0.94], // Custom easing
        }}
      />
    </motion.div>
  );
};