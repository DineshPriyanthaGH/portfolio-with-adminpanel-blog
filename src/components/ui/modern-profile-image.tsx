import { motion } from "framer-motion";

interface ModernProfileImageProps {
  src: string;
  alt: string;
  size?: number;
  className?: string;
}

export const ModernProfileImage = ({ 
  src, 
  alt, 
  size = 200, 
  className = "" 
}: ModernProfileImageProps) => {
  return (
    <div className={`relative ${className}`} style={{ width: size, height: size }}>
      {/* Outer Animated Circle Ring */}
      <motion.div
        className="absolute inset-0 rounded-full border-4 border-slate-400/30"
        animate={{
          scale: [1, 1.1, 1],
          borderColor: [
            "rgba(148, 163, 184, 0.3)",
            "rgba(203, 213, 225, 0.6)",
            "rgba(148, 163, 184, 0.3)"
          ],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      {/* Second Animated Ring */}
      <motion.div
        className="absolute inset-2 rounded-full border-2 border-blue-400/40"
        animate={{
          scale: [1.05, 0.95, 1.05],
          borderColor: [
            "rgba(96, 165, 250, 0.4)",
            "rgba(147, 197, 253, 0.7)",
            "rgba(96, 165, 250, 0.4)"
          ],
        }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.5
        }}
      />

      {/* Profile Image Container (No Spinning) */}
      <motion.div
        className="absolute inset-4 rounded-full overflow-hidden shadow-2xl bg-gradient-to-r from-slate-700 via-slate-600 to-slate-700 p-1"
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.3 }}
      >
        <div className="w-full h-full rounded-full overflow-hidden">
          <img
            src={src}
            alt={alt}
            className="w-full h-full object-cover"
          />
          
          {/* Hover Overlay */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-t from-slate-900/20 via-transparent to-slate-900/20"
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </motion.div>

      {/* Floating Particles Around Image */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-blue-400 rounded-full"
          style={{
            left: '50%',
            top: '50%',
          }}
          animate={{
            x: [
              0,
              Math.cos((i * 60 * Math.PI) / 180) * (size * 0.6),
            ],
            y: [
              0,
              Math.sin((i * 60 * Math.PI) / 180) * (size * 0.6),
            ],
            opacity: [0, 1, 0],
            scale: [0, 1.5, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            delay: i * 0.3,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Pulsing Glow Effect */}
      <motion.div
        className="absolute inset-0 rounded-full opacity-20"
        style={{
          background: `radial-gradient(circle, rgba(96, 165, 250, 0.3) 0%, transparent 70%)`,
          scale: 1.2,
        }}
        animate={{
          scale: [1.2, 1.4, 1.2],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
};