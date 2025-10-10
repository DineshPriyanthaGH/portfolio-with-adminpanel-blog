"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import {
  User,
  Target,
  Code,
  Award,
  Briefcase,
  Lightbulb,
  Download,
  ExternalLink,
} from "lucide-react";

export const AboutSection = () => {
  const aboutCards = [
    {
      icon: User,
      color: "text-blue-500",
      title: "Professional Profile",
      description:
        "Passionate Full-Stack Developer with expertise in modern web technologies, cloud computing, and AI/ML. Currently pursuing Computing and Information Systems at Sabaragamuwa University of Sri Lanka, combining academic excellence with practical industry experience.",
    },
    {
      icon: Target,
      color: "text-blue-500",
      title: "Mission & Vision",
      description:
        "Dedicated to creating innovative digital solutions that solve real-world problems. My vision is to bridge the gap between cutting-edge technology and user-centered design, delivering scalable applications that make a meaningful impact.",
    },
    {
      icon: Code,
      color: "text-blue-500",
      title: "Technical Excellence",
      description:
        "Specialized in Full-Stack Development with MERN stack, DevOps practices with containerization and cloud deployment, and AI/ML implementation for intelligent applications. Committed to writing clean, maintainable, and efficient code.",
    },
    {
      icon: Lightbulb,
      color: "text-blue-500",
      title: "Innovation Focus",
      description:
        "Always exploring emerging technologies and best practices. From serverless architectures to machine learning models, I stay at the forefront of technological advancement to deliver cutting-edge solutions.",
    },
  ];

  const achievements = [
    {
      icon: Award,
      title: "Academic Excellence",
      description: "Dean's List recipient with consistent high performance in Computing and Information Systems",
      badge: "Academic"
    },
    {
      icon: Briefcase,
      title: "Project Portfolio",
      description: "Successfully delivered 15+ web applications using modern frameworks and cloud technologies",
      badge: "Professional"
    },
    {
      icon: Code,
      title: "Open Source",
      description: "Active contributor to open-source projects with focus on React and Node.js ecosystems",
      badge: "Community"
    },
    {
      icon: Lightbulb,
      title: "Innovation",
      description: "Developed AI-powered solutions for data analysis and automated decision-making systems",
      badge: "Technical"
    },
  ];

  const technologies = [
    "React", "Node.js", "TypeScript", "Python", "MongoDB", "PostgreSQL",
    "Docker", "Terraform", "AWS", "Next.js",
    "Express.js", "GraphQL", "Redis", "Git", "CI/CD", "Microservices"
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            About <span className="text-blue-500">Me</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            A passionate developer dedicated to creating innovative solutions and pushing the boundaries of technology
          </p>
        </motion.div>

        {/* Professional Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {aboutCards.map((card, index) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="professional-card h-full">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-3">
                    <div className={`w-10 h-10 rounded-lg bg-accent flex items-center justify-center ${card.color}`}>
                      <card.icon className="w-5 h-5" />
                    </div>
                    <span className="text-foreground">{card.title}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    {card.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Achievements Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h3 className="text-3xl font-bold text-foreground mb-8 text-center">
            Key Achievements
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {achievements.map((achievement, index) => (
              <motion.div
                key={achievement.title}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="professional-card p-6 text-center"
              >
                <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center mx-auto mb-4">
                  <achievement.icon className="w-6 h-6 text-blue-500" />
                </div>
                <Badge variant="outline" className="mb-3">
                  {achievement.badge}
                </Badge>
                <h4 className="font-semibold text-foreground mb-2">
                  {achievement.title}
                </h4>
                <p className="text-sm text-muted-foreground">
                  {achievement.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Technologies Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h3 className="text-3xl font-bold text-foreground mb-8 text-center">
            Technology Stack
          </h3>
          <div className="flex flex-wrap justify-center gap-3">
            {technologies.map((tech, index) => (
              <motion.div
                key={tech}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                viewport={{ once: true }}
              >
                <Badge 
                  variant="outline" 
                  className="text-sm px-4 py-2 hover:bg-accent transition-colors cursor-default"
                >
                  {tech}
                </Badge>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Professional Statement */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Card className="professional-card max-w-4xl mx-auto">
            <CardContent className="p-8">
              <blockquote className="text-xl text-muted-foreground italic leading-relaxed mb-6">
                "Technology is not just about code and algorithms—it's about creating solutions that empower people 
                and businesses to achieve their goals. Every project is an opportunity to make a positive impact 
                through thoughtful design and robust implementation."
              </blockquote>
              <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
                <a href="/IWDPriyantha_CV.pdf" download className="professional-button">
                  <Download className="w-4 h-4 mr-2" />
                  Download Resume
                </a>
                
                <Button
                  variant="outline"
                  className="professional-card"
                  onClick={() => window.location.href = "/"}
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  View Portfolio
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};
