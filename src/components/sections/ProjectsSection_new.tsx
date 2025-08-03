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
  ExternalLink,
  Users,
  Zap,
} from "lucide-react";

const ProjectsSection = () => {
  const [activeFilter, setActiveFilter] = useState("all");

  const projects = [
    {
      title: "Ceylon Power Tracker",
      category: "ai",
      icon: Zap,
      iconColor: "text-yellow-500",
      iconBg: "bg-yellow-50 dark:bg-yellow-950",
      description:
        "AI-powered web app to help Sri Lankan homeowners manage electricity bills, track consumption patterns, and reduce costs. Features include SMS-based bill retrieval, AI-driven energy-saving recommendations, appliance tracking, and bill notifications. Deployed on AWS for scalability.",
      technologies: [
        "Next.js",
        "Python (Flask/Django)",
        "Scikit-learn",
        "MongoDB",
        "Firebase",
        "Twilio API",
        "Node.js",
      ],
      githubUrl: "https://github.com/dineshpriyantha/ceylon-power-tracker",
      liveUrl: "#",
      hasLiveDemo: false,
      gradient: "from-yellow-400 to-yellow-600",
      isOngoing: true,
    },
    {
      title: "PriceSense",
      category: "ai",
      icon: BarChart3,
      iconColor: "text-blue-500",
      iconBg: "bg-blue-50 dark:bg-blue-950",
      description:
        "AI-powered price prediction system forecasting prices of smartphones, laptops, and appliances. Offers real-time price trends and visual insights with multi-category support, deployed on cloud platforms like Heroku and AWS.",
      technologies: ["Python", "TensorFlow", "React.js", "FastAPI"],
      githubUrl: "https://github.com/dineshpriyantha/pricesense",
      liveUrl: "#",
      hasLiveDemo: false,
      gradient: "from-blue-400 to-cyan-500",
    },
    {
      title: "FinMentor",
      category: "fullstack",
      icon: DollarSign,
      iconColor: "text-green-500",
      iconBg: "bg-green-50 dark:bg-green-950",
      description: "Smart Expense Tracker Web Application.",
      technologies: ["React.js", "Node.js", "MongoDB", "Express.js"],
      githubUrl: "https://github.com/dineshpriyantha/finmentor",
      liveUrl: "#",
      hasLiveDemo: false,
      gradient: "from-green-400 to-emerald-500",
    },
    {
      title: "VacciCare",
      category: "fullstack",
      icon: Shield,
      iconColor: "text-purple-500",
      iconBg: "bg-purple-50 dark:bg-purple-950",
      description: "Family Vaccination Management system.",
      technologies: ["React.js", "Node.js", "MySQL", "Express.js"],
      githubUrl: "https://github.com/dineshpriyantha/vaccicare",
      liveUrl: "#",
      hasLiveDemo: false,
      gradient: "from-purple-400 to-indigo-500",
    },
    {
      title: "ElevateHire AI",
      category: "fullstack",
      icon: Users,
      iconColor: "text-indigo-500",
      iconBg: "bg-indigo-50 dark:bg-indigo-950",
      description:
        "Intelligent interview analysis and candidate evaluation platform leveraging AI for video interview processing, automated scoring, and actionable hiring insights.",
      technologies: [
        "Django 5.2.4",
        "Django REST Framework",
        "PostgreSQL",
        "Celery",
        "Redis",
        "JWT Authentication",
        "Next.js 15",
        "TypeScript",
        "Tailwind CSS",
        "Docker",
        "React",
      ],
      githubUrl: "#",
      liveUrl: "#",
      hasLiveDemo: false,
      gradient: "from-indigo-400 to-indigo-600",
      isOngoing: true,
    },
    {
      title: "Updating",
      category: "fullstack",
      icon: RefreshCw,
      iconColor: "text-orange-500",
      iconBg: "bg-orange-50 dark:bg-orange-950",
      description: "..........",
      technologies: ["Coming Soon"],
      githubUrl: "#",
      liveUrl: "#",
      hasLiveDemo: false,
      gradient: "from-orange-400 to-red-500",
    },
    {
      title: "Updating",
      category: "ai",
      icon: RefreshCw,
      iconColor: "text-teal-500",
      iconBg: "bg-teal-50 dark:bg-teal-950",
      description: "...........",
      technologies: ["Coming Soon"],
      githubUrl: "#",
      liveUrl: "#",
      hasLiveDemo: false,
      gradient: "from-teal-400 to-cyan-500",
    },
  ];

  const filterCategories = [
    { id: "all", label: "All Projects" },
    { id: "fullstack", label: "Full Stack" },
    { id: "ai", label: "AI/ML" },
  ];

  const filteredProjects =
    activeFilter === "all"
      ? projects
      : projects.filter((project) => project.category === activeFilter);

  return (
    <section className="py-20 bg-white dark:bg-gray-900 relative">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            PORTFOLIO
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mb-6"></div>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Most Recent Work
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
                  ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
                  : "text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 border-2 border-gray-300 dark:border-gray-600"
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
              <Card className="h-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 relative">
                {/* Project Header with Gradient */}
                <div
                  className={`h-32 bg-gradient-to-r ${project.gradient} flex items-center justify-center relative`}
                >
                  <div className="absolute inset-0 bg-black/10"></div>
                  <project.icon className="w-16 h-16 text-white z-10" />

                  {/* Ongoing Badge */}
                  {project.isOngoing && (
                    <div className="absolute top-3 right-3 bg-red-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-lg select-none z-20">
                      Ongoing
                    </div>
                  )}
                </div>

                <div className="p-6">
                  {/* Project Title */}
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    {project.title}
                  </h3>

                  {/* Project Description */}
                  <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                    {project.description}
                  </p>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.technologies.map((tech, techIndex) => (
                      <Badge
                        key={techIndex}
                        variant="secondary"
                        className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
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
                      className="flex-1 border-2 border-gray-300 dark:border-gray-600 hover:border-blue-600 hover:text-blue-600 transition-all duration-300"
                      asChild
                    >
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Github className="w-4 h-4 mr-2" />
                        View on GitHub
                      </a>
                    </Button>

                    {project.hasLiveDemo && (
                      <Button
                        size="sm"
                        className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                        asChild
                      >
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
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
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
            Interested in working together?
          </p>
          <Button
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold px-8 py-3 shadow-lg transform hover:scale-105 transition-all duration-300"
            onClick={() => {
              const contactSection = document.getElementById("contact");
              if (contactSection) {
                contactSection.scrollIntoView({ behavior: "smooth" });
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

export default ProjectsSection;
