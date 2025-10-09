import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { 
  FaReact, 
  FaNodeJs, 
  FaPython, 
  FaJava, 
  FaDocker,
  FaAws,
  FaGitAlt,
  FaJs
} from "react-icons/fa";
import { 
  SiTypescript, 
  SiKubernetes, 
  SiMongodb, 
  SiPostgresql,
  SiTailwindcss,
  SiNextdotjs,
  SiExpress,
  SiTensorflow
} from "react-icons/si";

interface FloatingIcon {
  id: number;
  icon: any;
  x: number;
  y: number;
  color: string;
  size: number;
  duration: number;
  delay: number;
}

export const FloatingTechIcons = () => {
  const [icons, setIcons] = useState<FloatingIcon[]>([]);

  const techStack = [
    { icon: FaReact, color: "#61DAFB", size: "text-4xl" },
    { icon: FaNodeJs, color: "#339933", size: "text-3xl" },
    { icon: FaPython, color: "#3776AB", size: "text-4xl" },
    { icon: SiTypescript, color: "#3178C6", size: "text-3xl" },
    { icon: FaJava, color: "#ED8B00", size: "text-4xl" },
    { icon: FaDocker, color: "#2496ED", size: "text-3xl" },
    { icon: SiKubernetes, color: "#326CE5", size: "text-3xl" },
    { icon: FaAws, color: "#FF9900", size: "text-4xl" },
    { icon: SiMongodb, color: "#47A248", size: "text-3xl" },
    { icon: SiPostgresql, color: "#336791", size: "text-3xl" },
    { icon: SiTailwindcss, color: "#06B6D4", size: "text-3xl" },
    { icon: SiNextdotjs, color: "#000000", size: "text-4xl" },
    { icon: FaJs, color: "#F7DF1E", size: "text-3xl" },
    { icon: SiTensorflow, color: "#FF6F00", size: "text-3xl" },
    { icon: FaGitAlt, color: "#F05032", size: "text-3xl" },
    { icon: SiExpress, color: "#000000", size: "text-3xl" },
  ];

  useEffect(() => {
    const generateFloatingIcons = () => {
      const newIcons: FloatingIcon[] = [];
      
      techStack.forEach((tech, index) => {
        // Create multiple instances of each icon
        for (let i = 0; i < 2; i++) {
          newIcons.push({
            id: index * 2 + i,
            icon: tech.icon,
            x: Math.random() * 90 + 5, // 5% to 95% to avoid edges
            y: Math.random() * 90 + 5,
            color: tech.color,
            size: Math.random() * 20 + 30, // 30-50px
            duration: Math.random() * 10 + 15, // 15-25 seconds
            delay: Math.random() * 5, // 0-5 seconds delay
          });
        }
      });

      setIcons(newIcons);
    };

    generateFloatingIcons();
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {icons.map((iconData) => (
        <motion.div
          key={iconData.id}
          className="absolute"
          initial={{
            x: `${iconData.x}vw`,
            y: `-10vh`,
            rotate: 0,
            scale: 0,
          }}
          animate={{
            y: `110vh`,
            rotate: [0, 180, 360],
            scale: [0, 1, 0.8, 1, 0],
            x: [
              `${iconData.x}vw`,
              `${iconData.x + (Math.random() - 0.5) * 20}vw`,
              `${iconData.x + (Math.random() - 0.5) * 40}vw`,
            ],
          }}
          transition={{
            duration: iconData.duration,
            delay: iconData.delay,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{
            fontSize: `${iconData.size}px`,
            color: iconData.color,
            filter: "drop-shadow(0 0 10px rgba(59, 130, 246, 0.5))",
          }}
        >
          <motion.div
            animate={{
              rotateY: [0, 360],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            <iconData.icon />
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
};