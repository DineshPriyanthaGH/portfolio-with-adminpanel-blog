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
      title: "ElevateHire AI - Intelligent Recruitment Management Platform",
      category: "fullstack",
      icon: Users,
      iconColor: "text-indigo-500",
      description:
        "Built a full-stack AI-powered recruitment platform featuring advanced CV parsing, automated interview scheduling, real-time analytics, and AI-driven video analysis for smarter, insight-based hiring. Currently in the final development stage, deploying with DevOps practices on AWS to enable scalable performance and continuous self-learning improvements.",
      technologies: [
        "Django 5.2",
        "PostgreSQL",
        "TypeScript",
        "React",
        "JWT Authentication",
        "Tailwind CSS",
        "REST APIs",
        "Docker",
        "AWS"
      ],
      githubUrl: "https://github.com/DineshPriyanthaGH/elevatehire-ai-platform",
      liveUrl: "https://github.com/DineshPriyanthaGH/elevatehire-ai-platform",
      hasLiveDemo: false,
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2015&q=80",
      isOngoing: true,
    },
    {
      title: "SUSL Hostel Management Full-Stack Web Application",
      category: "fullstack",
      icon: Users,
      iconColor: "text-blue-500",
      description:
        "Developed a full-stack web app for managing student accommodations at Sabaragamuwa University, automating hostel assignments, student data, and PDF reports with secure, real-time admin control.",
      technologies: [
        "PHP",
        "Laravel 8",
        "MySQL",
        "Bootstrap 5",
        "JavaScript",
        "DomPDF",
        "Blade Templating",
        "HTML5/CSS3"
      ],
      githubUrl: "https://github.com/DineshPriyanthaGH",
      liveUrl: "https://github.com/DineshPriyanthaGH",
      hasLiveDemo: false,
      image: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=2069&q=80",
    },
    {
      title: "SmartLodge - AI-Powered Hotel Discovery & Booking Platform",
      category: "fullstack",
      icon: Globe,
      iconColor: "text-green-500",
      description:
        "Developed an AI-powered hotel booking platform offering personalized recommendations, seamless booking, and intelligent travel insights using Google Gemini AI. Integrated real-time availability, secure payment handling, interactive galleries, personalized travel suggestions, and 24/7 chatbot assistance for enhanced user experience.",
      technologies: [
        "React.js",
        "JavaScript",
        "Node.js",
        "Express.js",
        "MongoDB",
        "Stripe API",
        "Google Gemini AI",
        "Clerk Auth",
        "TailwindCSS",
        "AWS",
        "Jenkins",
        "CI/CD",
        "Docker"
      ],
      githubUrl: "https://github.com/DineshPriyanthaGH",
      liveUrl: "https://github.com/DineshPriyanthaGH",
      hasLiveDemo: false,
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    },
    {
      title: "VoltBuddy - Smart Home Electricity Bill Tracker with AI Insights",
      category: "fullstack",
      icon: Zap,
      iconColor: "text-yellow-500",
      description:
        "Created an AI-powered web application to help households monitor and optimize electricity usage with real-time bill tracking, energy-saving insights, and analytics powered by Google Gemini AI. Built features including tier-based billing, appliance management, real-time monitoring, automated alerts, and 24/7 chatbot support to enhance user engagement and efficiency.",
      technologies: [
        "React.js",
        "JavaScript",
        "Node.js",
        "Express.js",
        "MongoDB",
        "Google Gemini API",
        "JWT",
        "TailwindCSS",
        "Nodemailer",
        "PDF Generation"
      ],
      githubUrl: "https://github.com/DineshPriyanthaGH/voltbuddy-Smart-Home-Electricity-Bill-Tracker-with-AI-Insights",
      liveUrl: "https://voltbuddy-smart-home-electricity-bi-five.vercel.app/",
      hasLiveDemo: true,
      image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2071&q=80",
    },
    {
      title: "Smart Expense Tracking and Management Web Application",
      category: "fullstack",
      icon: DollarSign,
      iconColor: "text-green-500",
      description:
        "Developed a modern expense tracking application with intelligent receipt scanning to automatically extract key details such as date, amount, and category, minimizing manual data entry. Implemented real-time dashboards and transaction tracking to help users manage spending and maintain better financial awareness.",
      technologies: [
        "JavaScript",
        "Next.js",
        "Tailwind CSS",
        "PostgreSQL",
        "Prisma",
        "Clerk Authentication"
      ],
      githubUrl: "https://github.com/DineshPriyanthaGH/finmentor-expense-tracker",
      liveUrl: "https://finmentor-ai-powered-expense-tracker-6yd1.vercel.app/",
      hasLiveDemo: true,
      image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2026&q=80",
    },
    {
      title: "Cloud Deployment Automation for VoltBuddy Full-Stack Application",
      category: "devops",
      icon: Monitor,
      iconColor: "text-orange-500",
      description:
        "Containerized full-stack VoltBuddy application using Docker and automated infrastructure provisioning with Terraform on AWS (ECS Fargate, ECR, ALB). Implemented CI/CD pipelines with GitHub Actions for automated build, test, and zero-downtime deployment, securing credentials through GitHub Secrets. Configured monitoring and cost optimization using CloudWatch, Prometheus, and Grafana dashboards.",
      technologies: [
        "AWS",
        "Terraform", 
        "Docker",
        "ECS Fargate",
        "ECR",
        "GitHub Actions",
        "Prometheus",
        "Grafana",
        "CloudWatch",
        "MERN Stack"
      ],
      githubUrl: "https://github.com/DineshPriyanthaGH",
      liveUrl: "https://medium.com/@dineshpriyantha200248",
      hasLiveDemo: true,
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=2072&q=80",
      isOngoing: true,
      mediumButton: true
    },
    {
      title: "SmartLodge Full Stack Application Cloud Deployment – DevOps Pipeline Implementation",
      category: "devops", 
      icon: RefreshCw,
      iconColor: "text-green-500",
      description:
        "Built a complete CI/CD pipeline for the SmartLodge Hotel Booking full-stack application using Jenkins, GitLab, and Docker, automating build, test, and deployment workflows on AWS EC2. Configured Nginx reverse proxy, SSL setup, and domain management with Cloudflare. Integrated SonarQube for code quality checks and implemented continuous monitoring and logging using CloudWatch.",
      technologies: [
        "Jenkins",
        "GitLab", 
        "Docker",
        "Nginx",
        "AWS EC2",
        "Cloudflare",
        "SonarQube", 
        "React.js",
        "JavaScript",
        "Node.js",
        "Express.js",
        "MongoDB"
      ],
      githubUrl: "https://github.com/DineshPriyanthaGH",
      liveUrl: "https://medium.com/@dineshpriyantha200248",
      hasLiveDemo: true,
      image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      mediumButton: true
    },
    {
      title: "Cloud-Hosted Full-Stack Game with AWS Deployment",
      category: "devops",
      icon: Shield,
      iconColor: "text-blue-500", 
      description:
        "Deployed a full-stack sample game (React frontend, Spring Boot backend) on AWS with high availability and scalability using EC2, RDS, and ALB. Configured secure cloud infrastructure with VPC, IAM roles, SSL certificates, WAF, and Secrets Manager for network isolation and data protection. Implemented monitoring and performance tracking using CloudWatch and CloudFront for optimized delivery.",
      technologies: [
        "AWS EC2",
        "S3", 
        "CloudFront",
        "RDS (MySQL)",
        "VPC",
        "IAM",
        "ALB",
        "WAF", 
        "KMS",
        "Secrets Manager",
        "CloudWatch",
        "Git",
        "Linux"
      ],
      githubUrl: "https://github.com/DineshPriyanthaGH",
      liveUrl: "https://medium.com/@dineshpriyantha200248", 
      hasLiveDemo: true,
      image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=2125&q=80",
      mediumButton: true
    }
  ];

  const filterCategories = [
    { id: "all", label: "All Projects" },
    { id: "fullstack", label: "Full Stack" },
    { id: "devops", label: "DevOps" },
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
            Featured projects showcasing my expertise in full-stack development and DevOps solutions
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
                      {project.category === "fullstack" ? "Full Stack" : "DevOps"}
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
                          {project.mediumButton ? (
                            <>
                              <ExternalLink className="w-4 h-4 mr-2" />
                              Medium
                            </>
                          ) : (
                            <>
                              <Globe className="w-4 h-4 mr-2" />
                              Live Demo
                            </>
                          )}
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
