import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { Code, Server, Database, Cloud, Settings, Wrench } from "lucide-react";
import { 
  FaReact, FaNodeJs, FaDocker, FaPython, FaAws, FaJs, FaGitAlt, FaLinux, FaPhp,
  FaNginx, FaGithub
} from "react-icons/fa";
import { 
  SiMongodb, SiTensorflow, SiTypescript, SiPostgresql, SiFirebase, SiDjango, 
  SiLaravel, SiExpress, SiNextdotjs, SiJenkins, SiTerraform, SiPrometheus, 
  SiGrafana, SiCloudwatch, SiGithubactions
} from "react-icons/si";

export const SkillsSection = () => {
  const skillCategories = [
    {
      title: "Languages",
      icon: Code,
      skills: [
        { name: "Python", icon: FaPython, color: "text-yellow-400" },
        { name: "JavaScript", icon: FaJs, color: "text-yellow-500" },
        { name: "TypeScript", icon: SiTypescript, color: "text-blue-600" },
        { name: "PHP", icon: FaPhp, color: "text-indigo-600" }
      ]
    },
    {
      title: "Frameworks & Libraries",
      icon: Server,
      skills: [
        { name: "React.js", icon: FaReact, color: "text-blue-400" },
        { name: "Next.js", icon: SiNextdotjs, color: "text-gray-900" },
        { name: "Node.js", icon: FaNodeJs, color: "text-green-500" },
        { name: "Express.js", icon: SiExpress, color: "text-gray-600" },
        { name: "Django", icon: SiDjango, color: "text-green-600" },
        { name: "Laravel", icon: SiLaravel, color: "text-red-500" }
      ]
    },
    {
      title: "Databases",
      icon: Database,
      skills: [
        { name: "PostgreSQL", icon: SiPostgresql, color: "text-blue-700" },
        { name: "SQL", icon: Database, color: "text-blue-600" },
        { name: "MongoDB", icon: SiMongodb, color: "text-green-400" },
        { name: "Firebase", icon: SiFirebase, color: "text-yellow-500" }
      ]
    },
    {
      title: "DevOps & Cloud",
      icon: Cloud,
      skills: [
        { name: "AWS", icon: FaAws, color: "text-orange-400" },
        { name: "Docker", icon: FaDocker, color: "text-blue-500" },
        { name: "Jenkins", icon: SiJenkins, color: "text-red-600" },
        { name: "Terraform", icon: SiTerraform, color: "text-purple-600" },
        { name: "Prometheus", icon: SiPrometheus, color: "text-orange-500" },
        { name: "Grafana", icon: SiGrafana, color: "text-orange-600" },
        { name: "CI/CD", icon: Settings, color: "text-blue-600" },
        { name: "Linux", icon: FaLinux, color: "text-gray-800" },
        { name: "GitHub Actions", icon: SiGithubactions, color: "text-gray-900" }
      ]
    },
    {
      title: "Tools & Others",
      icon: Wrench,
      skills: [
        { name: "Git", icon: FaGitAlt, color: "text-orange-600" },
        { name: "CloudWatch", icon: Cloud, color: "text-blue-500" },
        { name: "UI/UX", icon: Settings, color: "text-pink-500" }
      ]
    }
  ];

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-800 relative">
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
            TECH STACK
          </h2>
          <div className="w-24 h-1 bg-blue-700 mx-auto mb-6"></div>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Full Stack Development | DevOps Engineering | Cloud Technologies
          </p>
        </motion.div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={categoryIndex}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="p-6 h-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300">
                {/* Category Header */}
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mr-3">
                    <category.icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    {category.title}
                  </h3>
                </div>

                {/* Skills List */}
                <div className="space-y-3">
                  {category.skills.map((skill, skillIndex) => (
                    <motion.div
                      key={skillIndex}
                      className="flex items-center p-3 rounded-lg bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: (categoryIndex * 0.1) + (skillIndex * 0.05) }}
                      viewport={{ once: true }}
                      whileHover={{ scale: 1.02 }}
                    >
                      <skill.icon className={`w-6 h-6 mr-3 ${skill.color}`} />
                      <span className="text-gray-900 dark:text-white font-medium">
                        {skill.name}
                      </span>
                      <Badge 
                        variant="secondary" 
                        className="ml-auto bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 text-xs"
                      >
                        Pro
                      </Badge>
                    </motion.div>
                  ))}
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Additional Info */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
        >
          <p className="text-gray-600 dark:text-gray-300 text-lg">
            Continuously learning and adapting to new technologies to deliver cutting-edge solutions
          </p>
        </motion.div>
      </div>
    </section>
  );
};
