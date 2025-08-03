import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { 
  Globe, 
  Github, 
  DollarSign, 
  BarChart3, 
  Shield, 
  RefreshCw,
  ExternalLink
} from "lucide-react";

export const ProjectsSection = () => {
  const [activeFilter, setActiveFilter] = useState("all");

  const projects = [
    {
      title: "FinMentor",
      category: "fullstack",
      icon: DollarSign,
      iconColor: "text-blue-500",
      description: "Smart Expense Tracker Web Application with real-time analytics, budget management, and financial insights powered by modern web technologies.",
      technologies: ["React.js", "Node.js", "MongoDB", "Express.js"],
      githubUrl: "https://github.com/dineshpriyantha/finmentor",
      liveUrl: "#",
      hasLiveDemo: false,
      image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2026&q=80"
    },
    {
      title: "PriceSense", 
      category: "ai",
      icon: BarChart3,
      iconColor: "text-blue-500",
      description: "AI-Powered Smart Price Predictor using machine learning algorithms to forecast market trends and provide accurate pricing insights.",
      technologies: ["Python", "TensorFlow", "React.js", "FastAPI"],
      githubUrl: "https://github.com/dineshpriyantha/pricesense",
      liveUrl: "#",
      hasLiveDemo: false,
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
    },
    {
      title: "VacciCare",
      category: "fullstack", 
      icon: Shield,
      iconColor: "text-blue-500",
      description: "Comprehensive Family Vaccination Management System with appointment scheduling, medical records, and vaccination tracking capabilities.",
      technologies: ["React.js", "Node.js", "MySQL", "Express.js"],
      githubUrl: "https://github.com/dineshpriyantha/vaccicare",
      liveUrl: "#",
      hasLiveDemo: false,
      image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80"
    },
    {
      title: "EcoTracker",
      category: "fullstack",
      icon: Globe,
      iconColor: "text-blue-500",
      description: "Environmental Impact Tracking Platform for monitoring carbon footprint, sustainability metrics, and eco-friendly lifestyle recommendations.",
      technologies: ["Next.js", "TypeScript", "PostgreSQL", "Prisma"],
      githubUrl: "#",
      liveUrl: "#",
      hasLiveDemo: false,
      image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80"
    },
    {
      title: "SmartAnalytics",
      category: "ai",
      icon: BarChart3,
      iconColor: "text-blue-500",
      description: "Advanced Data Analytics Platform with machine learning capabilities for business intelligence and predictive analytics.",
      technologies: ["Python", "Pandas", "Scikit-learn", "Streamlit"],
      githubUrl: "#",
      liveUrl: "#",
      hasLiveDemo: false,
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2015&q=80"
    },
    {
      title: "DevConnect",
      category: "fullstack",
      icon: RefreshCw,
      iconColor: "text-blue-500",
      description: "Professional networking platform for developers with project collaboration, skill matching, and career opportunities.",
      technologies: ["React.js", "Node.js", "GraphQL", "MongoDB"],
      githubUrl: "#",
      liveUrl: "#",
      hasLiveDemo: false,
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80"
    }
  ];

  const filterCategories = [
    { id: "all", label: "All Projects" },
    { id: "fullstack", label: "Full Stack" },
    { id: "ai", label: "AI/ML" },
  ];

  const filteredProjects = activeFilter === "all" 
    ? projects 
    : projects.filter(project => project.category === activeFilter);

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            My <span className="text-blue-500">Portfolio</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Featured projects showcasing my expertise in full-stack development and AI/ML solutions
          </p>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div 
          className="flex flex-wrap justify-center mb-12 gap-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {filterCategories.map((category) => (
            <Button
              key={category.id}
              variant={activeFilter === category.id ? "default" : "outline"}
              className={`px-6 py-3 font-semibold transition-all duration-300 ${
                activeFilter === category.id 
                  ? "professional-button" 
                  : "professional-card text-muted-foreground hover:text-blue-500"
              }`}
              onClick={() => setActiveFilter(category.id)}
            >
              {category.label}
            </Button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
            >
              <Card className="professional-card h-full overflow-hidden group">
                {/* Project Image */}
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  <div className="absolute top-4 right-4 w-12 h-12 bg-accent rounded-lg flex items-center justify-center">
                    <project.icon className={`w-6 h-6 ${project.iconColor}`} />
                  </div>
                  <div className="absolute bottom-4 left-4">
                    <Badge variant="secondary" className="bg-background/90 text-foreground">
                      {project.category === "fullstack" ? "Full Stack" : "AI/ML"}
                    </Badge>
                  </div>
                </div>

                <div className="p-6">
                  {/* Project Title */}
                  <h3 className="text-xl font-bold text-foreground mb-3">
                    {project.title}
                  </h3>

                  {/* Project Description */}
                  <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
                    {project.description}
                  </p>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.technologies.map((tech, techIndex) => (
                      <Badge 
                        key={techIndex} 
                        variant="outline" 
                        className="text-xs text-blue-500 border-blue-500/20"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-3">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 professional-card text-muted-foreground hover:text-blue-500"
                      asChild
                    >
                      <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                        <Github className="w-4 h-4 mr-2" />
                        GitHub
                      </a>
                    </Button>
                    
                    {project.hasLiveDemo && (
                      <Button
                        size="sm"
                        className="professional-button"
                        asChild
                      >
                        <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="w-4 h-4 mr-2" />
                          Live Demo
                        </a>
                      </Button>
                    )}
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <p className="text-lg text-muted-foreground mb-6">
            Interested in working together on your next project?
          </p>
          <Button 
            className="professional-button px-8 py-3"
            onClick={() => {
              const contactSection = document.getElementById('contact');
              if (contactSection) {
                contactSection.scrollIntoView({ behavior: 'smooth' });
              }
            }}
          >
            Let's Build Something Amazing
          </Button>
        </motion.div>
      </div>
    </section>
  );
};
