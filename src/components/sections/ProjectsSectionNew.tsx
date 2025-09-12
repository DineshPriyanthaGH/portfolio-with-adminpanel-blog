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
  Monitor,
} from "lucide-react";

export const ProjectsSection = () => {
  const [activeFilter, setActiveFilter] = useState("all");

  const projects = [
    {
      title: "FinMentor",
      category: "fullstack",
      icon: DollarSign,
      iconColor: "text-green-500",
      description:
        "Cutting-edge expense tracking application that simplifies financial management with AI-powered receipt scanning. Automatically extracts transaction details and delivers real-time financial insights for easier expense management.",
      technologies: [
        "JavaScript",
        "Next.js",
        "Tailwind CSS",
        "PostgreSQL",
        "Prisma",
        "Clerk Authentication",
      ],
      githubUrl: "https://github.com/DineshPriyanthaGH/finmentor-expense-tracker",
      liveUrl: "https://finmentor-ai-powered-expense-tracker-6yd1.vercel.app/",
      hasLiveDemo: true,
      image:
        "https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2026&q=80",
    },
    {
      title: "PriceSense",
      category: "ai",
      icon: BarChart3,
      iconColor: "text-blue-500",
      description:
        "AI-powered price prediction system that uses machine learning to forecast future electronic item prices. Offers real-time price trends and visual insights through an intuitive interface with multi-category support and cloud deployment.",
      technologies: [
        "Python",
        "Flask",
        "Scikit-learn",
        "Frontend Development",
      
      ],
      githubUrl: "https://github.com/DineshPriyanthaGH/pricesense-smart-electronic-item-price-predictor",
      liveUrl: "https://github.com/DineshPriyanthaGH/pricesense-smart-electronic-item-price-predictor",
      hasLiveDemo: true,
      image:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    },
    {
  title: "Ceylon Power Tracker",
  category: "fullstack",
  icon: Zap,
  iconColor: "text-yellow-500",
  description:
    "AI-powered web app for Sri Lankan households to monitor electricity usage and costs. Features include manual meter input with accurate CEB tariff calculations, appliance-level tracking, AI insights and bill predictions, cost-saving tips, bill history, anomaly alerts, and an integrated Gemini-powered chatbot. Future-ready logic is included for SMS-based bill retrieval and IoT/mobile integration. Cloud deployed for maximum scalability and accessibility.",
  technologies: [
  "Next.js",
  "Tailwind CSS",
  "Node.js",
  "Scikit-learn",
  "MongoDB",
  
  "Email APIs",
  
  "Google Gemini API",
  "AWS",
  "Visual Studio Code",
  "Git & GitHub",
  "Postman",
  "MongoDB Atlas"
]
,
  githubUrl: "https://github.com/DineshPriyanthaGH/voltbuddy-Smart-Home-Electricity-Bill-Tracker-with-AI-Insights", // Update if your actual repo is different.
  liveUrl: "https://voltbuddy-smart-home-electricity-bi-five.vercel.app/",
  hasLiveDemo: true,
  image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2071&q=80",
  isOngoing: false // Mark as ongoing for badge display
}
,
    {
  title: "VacciCare Mobile App",
  category: "fullstack",
  icon: Shield,
  iconColor: "text-purple-500",
  description:
    "Family Vaccination Management System to streamline the management of family and pet vaccination records. Features include family and doctor dashboards, member and pet profiles, vaccination tracking, and automatic notification reminders.",
  technologies: [
    "Flutter",
    "Dart",
    "Firebase (Authentication, Firestore, Cloud Functions)",
    "Figma",
  ],
  githubUrl: "https://github.com/DineshPriyanthaGH/project_familyvacciguard",
  liveUrl: "https://github.com/DineshPriyanthaGH/project_familyvacciguard",
  hasLiveDemo: true,
  image:
    "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=2069&q=80",
  timePeriod: "May 2024 - Jul 2024",
  associatedWith: "Sabaragamuwa University of Sri Lanka",
  contributions: [
    "Developed features for adding and managing family members and pets.",
    "Implemented Firebase integration for real-time database management and authentication.",
    "Created a notification system to remind users about upcoming vaccinations.",
  ],
  skills: ["Flutter", "Dart", "Firebase", "UI/UX Design", "Team Collaboration"],
}
,
    {
      title: "ElevateHire AI",
      category: "fullstack",
      icon: Users,
      iconColor: "text-indigo-500",
      description:
        "Ongoing. Intelligent interview analysis and candidate evaluation platform leveraging AI for video interview processing, automated scoring, and actionable hiring insights. Features video upload and analysis, AI-powered candidate scoring, reporting, and analytics dashboards.",
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
      githubUrl: "https://github.com/DineshPriyanthaGH/elevatehire-ai-platform",
      liveUrl: "https://github.com/DineshPriyanthaGH/elevatehire-ai-platform",
      hasLiveDemo: true,
      image:
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2015&q=80",
      isOngoing: true,
    },
    // You can add further projects below as needed with the same format
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
              <Card className="professional-card h-full overflow-hidden group relative">
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
                  {project.isOngoing && (
                    <div className="absolute top-4 left-4 z-20">
                      <span className="bg-red-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-lg select-none">
                        Ongoing
                      </span>
                    </div>
                  )}
                </div>

                <div className="p-6">
                  {/* Project Title */}
                  <h3 className="text-xl font-bold text-foreground mb-3">{project.title}</h3>
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
                          <Globe className="w-4 h-4 mr-2" />
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
