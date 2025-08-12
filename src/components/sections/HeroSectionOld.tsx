import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Github, Linkedin, Mail, Download, ArrowDown, MapPin } from "lucide-react";
import { motion } from "framer-motion";
import { FaReact, FaNodeJs, FaDocker, FaPython, FaAws } from "react-icons/fa";
import { SiMongodb, SiExpress, SiKubernetes, SiTensorflow, SiPython } from "react-icons/si";

export const HeroSection = () => {
  const [typewriterText, setTypewriterText] = useState("");
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  
  const roles = [
    "Full Stack Developer",
    "DevOps Engineer", 
    "AI/ML Engineer",
    "Software Architect"
  ];

  useEffect(() => {
    let index = 0;
    const currentRole = roles[currentRoleIndex];
    
    const typeInterval = setInterval(() => {
      if (index <= currentRole.length) {
        setTypewriterText(currentRole.substring(0, index));
        index++;
      } else {
        clearInterval(typeInterval);
        // Switch to next role after 2 seconds
        setTimeout(() => {
          setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
        }, 2000);
      }
    }, 80);

    return () => clearInterval(typeInterval);
  }, [currentRoleIndex]);

  const socialLinks = [
    { 
      icon: Github, 
      href: "https://github.com/dineshpriyantha", 
      label: "GitHub",
      color: "hover:bg-gray-800 dark:hover:bg-gray-600"
    },
    { 
      icon: Linkedin, 
      href: "https://linkedin.com/in/dineshpriyantha", 
      label: "LinkedIn",
      color: "hover:bg-blue-600"
    },
    { 
      icon: Mail, 
      href: "mailto:dinesh.priyantha@gmail.com", 
      label: "Email",
      color: "hover:bg-red-600"
    },
  ];

  const skillCategories = [
    {
      category: "MERN Stack",
      icon: FaReact,
      skills: ["React", "Node.js", "MongoDB", "Express.js"],
      technologies: [
        { Icon: FaReact, color: "text-blue-500" },
        { Icon: FaNodeJs, color: "text-green-600" },
        { Icon: SiMongodb, color: "text-green-500" },
        { Icon: SiExpress, color: "text-gray-600 dark:text-gray-400" }
      ]
    },
    {
      category: "DevOps",
      icon: FaDocker,
      skills: ["Docker", "Kubernetes", "AWS", "CI/CD"],
      technologies: [
        { Icon: FaDocker, color: "text-blue-600" },
        { Icon: SiKubernetes, color: "text-blue-700" },
        { Icon: FaAws, color: "text-orange-500" }
      ]
    },
    {
      category: "AI/ML",
      icon: SiTensorflow,
      skills: ["TensorFlow", "Python", "Machine Learning"],
      technologies: [
        { Icon: SiTensorflow, color: "text-orange-600" },
        { Icon: FaPython, color: "text-yellow-600" },
        { Icon: SiPython, color: "text-purple-600" }
      ]
    }
  ];

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center py-20 bg-background relative overflow-hidden">
      {/* Professional Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-grid-small-pattern opacity-20" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-info/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
              <motion.div 
            className="relative flex justify-center lg:justify-end"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="relative">
              {/* Main Profile Container */}
              <motion.div 
                className="relative w-80 h-80 md:w-96 md:h-96"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                {/* Background Pattern */}
                <div className="absolute inset-0 bg-primary/10 rounded-3xl rotate-6 animate-pulse-professional" />
                <div className="absolute inset-0 bg-accent rounded-3xl -rotate-6" />
                
                {/* Profile Image */}
                <div className="relative w-full h-full bg-card rounded-3xl overflow-hidden shadow-xl border border-border">
                  <img 
                    src="/src/assets/hizkia-portrait.jpg" 
                    alt="Dinesh Priyantha"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      // Fallback if image doesn't exist
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      const fallback = target.nextElementSibling as HTMLElement;
                      if (fallback) fallback.style.display = 'flex';
                    }}
                  />
                  {/* Fallback Avatar */}
                  <div className="absolute inset-0 bg-primary/20 rounded-3xl flex items-center justify-center text-6xl font-bold text-primary" style={{ display: 'none' }}>
                    DP
                  </div>
                </div>

                {/* Floating Tech Badges */}
                <motion.div
                  className="absolute -top-4 -right-4 bg-card border border-border rounded-xl p-3 shadow-lg"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 2.2 }}
                  whileHover={{ scale: 1.1 }}
                >
                  <FaReact className="w-8 h-8 text-blue-500" />
                </motion.div>

                <motion.div
                  className="absolute -bottom-4 -left-4 bg-card border border-border rounded-xl p-3 shadow-lg"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 2.4 }}
                  whileHover={{ scale: 1.1 }}
                >
                  <SiTensorflow className="w-8 h-8 text-orange-600" />
                </motion.div>

                <motion.div
                  className="absolute top-1/4 -left-6 bg-card border border-border rounded-xl p-3 shadow-lg"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 2.6 }}
                  whileHover={{ scale: 1.1 }}
                >
                  <FaDocker className="w-8 h-8 text-blue-600" />
                </motion.div>

                <motion.div
                  className="absolute top-3/4 -right-6 bg-card border border-border rounded-xl p-3 shadow-lg"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 2.8 }}
                  whileHover={{ scale: 1.1 }}
                >
                  <FaAws className="w-8 h-8 text-orange-500" />
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
          <motion.div 
            className="space-y-8"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Location Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Badge variant="outline" className="professional-card text-muted-foreground">
                <MapPin className="w-3 h-3 mr-1" />
                Colombo, Sri Lanka
              </Badge>
            </motion.div>

            {/* Main Heading */}
            <div className="space-y-4">
              <motion.h1 
                className="text-5xl md:text-6xl lg:text-7xl font-bold text-foreground leading-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                Hi, I'm{" "}
                <span className="text-primary">Dinesh</span>
              </motion.h1>
              
              <motion.div
                className="h-16 flex items-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <h2 className="text-2xl md:text-3xl font-semibold text-muted-foreground">
                  {typewriterText}
                  <span className="animate-pulse-professional text-primary">|</span>
                </h2>
              </motion.div>
            </div>

            {/* Skills Section */}
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <h3 className="text-lg font-semibold text-foreground mb-4">Specialized in</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {skillCategories.map((category, index) => (
                  <motion.div
                    key={category.category}
                    className="professional-card p-4 text-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 1 + index * 0.2 }}
                    whileHover={{ scale: 1.05 }}
                  >
                    <div className="flex justify-center mb-3">
                      <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center">
                        <category.icon className="w-6 h-6 text-primary" />
                      </div>
                    </div>
                    <h4 className="font-semibold text-foreground mb-2">{category.category}</h4>
                    <div className="flex justify-center space-x-2">
                      {category.technologies.map((tech, techIndex) => (
                        <tech.Icon key={techIndex} className={`w-5 h-5 ${tech.color}`} />
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Description */}
            <motion.p 
              className="text-lg text-muted-foreground leading-relaxed max-w-2xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.6 }}
            >
              Passionate about building scalable web applications, implementing robust DevOps practices, 
              and leveraging AI/ML to create intelligent solutions that solve real-world problems.
            </motion.p>

            {/* Action Buttons */}
            <motion.div 
              className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.8 }}
            >
              <Button 
                className="professional-button px-8 py-3"
                onClick={() => scrollToSection('contact')}
              >
                <Mail className="w-5 h-5 mr-2" />
                Get In Touch
              </Button>
              <Button 
                variant="outline" 
                className="professional-card border-border text-foreground hover:bg-accent px-8 py-3"
              >
                <Download className="w-5 h-5 mr-2" />
                Download CV
              </Button>
            </motion.div>

            {/* Social Links */}
            <motion.div 
              className="flex space-x-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 2 }}
            >
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-12 h-12 bg-accent text-muted-foreground ${social.color} hover:text-white rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-sm hover:shadow-md`}
                  aria-label={social.label}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Content - Profile Image with Modern Design */}
      
        </div>

        {/* Scroll Down Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 3 }}
        >
          <Button
            variant="ghost"
            className="flex flex-col items-center text-muted-foreground hover:text-foreground transition-colors duration-300"
            onClick={() => scrollToSection('about')}
          >
            <span className="text-sm mb-2">Explore More</span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <ArrowDown className="w-5 h-5" />
            </motion.div>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="min-h-screen flex items-center py-20 pt-32 relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Content */}
          <motion.div 
            className="space-y-8"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Greeting */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex items-center space-x-2"
            >
              <span className="text-2xl"></span>
              <span className="text-lg text-gray-600 dark:text-gray-300">Hi, I'm</span>
            </motion.div>

            {/* Main Heading */}
            <motion.div 
              className="space-y-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <h1 className="text-5xl lg:text-7xl font-bold text-gray-900 dark:text-white">
                Dinesh{" "}
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Priyantha
                </span>
              </h1>
              
              <div className="flex items-center space-x-2">
                <h2 className="text-2xl lg:text-3xl font-semibold text-gray-700 dark:text-gray-300">
                  As a {typewriterText}
                  <span className="animate-pulse">|</span>
                </h2>
              </div>
            </motion.div>

            {/* Description */}
            <motion.p 
              className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed max-w-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              With expertise in Software Development, I craft scalable and efficient digital solutions, 
              from front-end experiences to back-end architecture.
            </motion.p>

            {/* Action Buttons */}
            <motion.div 
              className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <Button 
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold px-8 py-3 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                onClick={() => scrollToSection('contact')}
              >
                <Mail className="w-5 h-5 mr-2" />
                Contact me
              </Button>
              <Button 
                variant="outline" 
                className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white font-bold px-8 py-3 transform hover:scale-105 transition-all duration-300"
              >
                <Download className="w-5 h-5 mr-2" />
                My Resume
              </Button>
            </motion.div>

            {/* Social Links */}
            <motion.div 
              className="flex space-x-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1 }}
            >
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  className="w-12 h-12 bg-gray-100 dark:bg-gray-800 hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600 text-gray-600 dark:text-gray-400 hover:text-white rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-lg"
                  aria-label={social.label}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </motion.div>

            {/* Scroll Down Indicator */}
            <motion.div
              className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.2 }}
            >
              <Button
                variant="ghost"
                className="flex flex-col items-center text-gray-500 hover:text-blue-600 transition-colors duration-300"
                onClick={() => scrollToSection('about')}
              >
                <span className="text-sm mb-2">Scroll Down</span>
                <motion.div
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <ArrowDown className="w-5 h-5" />
                </motion.div>
              </Button>
            </motion.div>
          </motion.div>

          {/* Right Content - Floating Icons */}
          <motion.div 
            className="relative flex justify-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="relative w-96 h-96">
              {/* Central Profile Area */}
              <motion.div 
                className="absolute inset-0 flex items-center justify-center"
                whileHover={{ scale: 1.05 }}
              >
                <div className="w-48 h-48 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center shadow-2xl">
                  <div className="w-44 h-44 bg-white dark:bg-gray-900 rounded-full flex items-center justify-center">
                    <Code className="w-20 h-20 text-blue-600" />
                  </div>
                </div>
              </motion.div>

              {/* Floating Tech Icons */}
              {techIcons.map((tech, index) => (
                <motion.div
                  key={index}
                  className={`absolute ${tech.position} w-16 h-16 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center shadow-lg border-2 border-gray-100 dark:border-gray-700`}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ 
                    duration: 0.5, 
                    delay: tech.delay,
                    type: "spring",
                    stiffness: 200 
                  }}
                  whileHover={{ scale: 1.2, rotate: 360 }}
                  style={{
                    animation: `float 2s ease-in-out infinite`,
                    animationDelay: `${tech.delay}s`,
                  }}
                >
                  <tech.Icon className={`w-8 h-8 ${tech.color}`} />
                </motion.div>
              ))}

              {/* Orbital rings */}
              <div className="absolute inset-0 border-2 border-blue-200 dark:border-blue-800 rounded-full opacity-20 animate-spin-slow"></div>
              <div className="absolute inset-4 border-2 border-purple-200 dark:border-purple-800 rounded-full opacity-20 animate-spin-reverse"></div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};