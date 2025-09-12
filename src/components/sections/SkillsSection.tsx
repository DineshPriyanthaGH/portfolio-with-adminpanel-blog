import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { motion } from "framer-motion";
import { Code, Server, Database, Brain, Settings, Users } from "lucide-react";
import { FaReact, FaNodeJs, FaDocker, FaPython, FaAws, FaHtml5, FaCss3Alt, FaJs, FaJava, FaGitAlt, FaLinux } from "react-icons/fa";
import { SiMongodb, SiKubernetes, SiTensorflow, SiTailwindcss, SiExpress, SiMysql, SiTypescript, SiPostgresql, SiFirebase, SiDjango, SiFlask, SiJenkins } from "react-icons/si";

export const SkillsSection = () => {
  const [activeTab, setActiveTab] = useState("frontend");

  const skillCategories = {
    frontend: {
      title: "Frontend Development",
      icon: Code,
      iconColor: "text-blue-500",
      bgColor: "bg-blue-50 dark:bg-blue-950",
      skills: [
        { name: "React.js", level: 85, icon: FaReact, color: "text-blue-400" },
        { name: "Next.js", level: 80, icon: FaReact, color: "text-gray-700" },
        { name: "TypeScript", level: 82, icon: SiTypescript, color: "text-blue-600" },
        { name: "JavaScript", level: 88, icon: FaJs, color: "text-yellow-400" },
        { name: "HTML5", level: 95, icon: FaHtml5, color: "text-orange-500" },
        { name: "CSS3", level: 90, icon: FaCss3Alt, color: "text-blue-500" },
        { name: "Tailwind CSS", level: 90, icon: SiTailwindcss, color: "text-teal-400" },
      ]
    },
    backend: {
      title: "Backend & Languages", 
      icon: Server,
      iconColor: "text-emerald-500",
      bgColor: "bg-emerald-50 dark:bg-emerald-950",
      skills: [
        { name: "Python", level: 85, icon: FaPython, color: "text-yellow-400" },
        
        { name: "Node.js", level: 82, icon: FaNodeJs, color: "text-green-500" },
        { name: "Express.js", level: 80, icon: SiExpress, color: "text-gray-600" },
        { name: "Django", level: 75, icon: SiDjango, color: "text-green-600" },
        { name: "Flask", level: 72, icon: SiFlask, color: "text-gray-700" },
        { name: "Python (ML Libraries)", level: 80, icon: FaPython, color: "text-yellow-400" },
          { name: "PostgreSQL", level: 83, icon: SiPostgresql, color: "text-blue-700" },
        { name: "MySQL", level: 85, icon: SiMysql, color: "text-blue-600" },
        { name: "MongoDB", level: 78, icon: SiMongodb, color: "text-green-400" }
      ]
    },

    devops: {
      title: "DevOps & Tools",
      icon: Settings, 
      iconColor: "text-violet-500",
      bgColor: "bg-violet-50 dark:bg-violet-950",
      skills: [
        { name: "AWS (EC2, S3)", level: 75, icon: FaAws, color: "text-orange-400" },
        { name: "Docker", level: 78, icon: FaDocker, color: "text-blue-500" },
        { name: "Kubernetes", level: 70, icon: SiKubernetes, color: "text-blue-600" },
        { name: "Jenkins", level: 68, icon: SiJenkins, color: "text-red-600" },
        { name: "Git & Version Control", level: 90, icon: FaGitAlt, color: "text-orange-600" },
        { name: "Linux Systems", level: 75, icon: FaLinux, color: "text-gray-800" },
      ]
    },
  
  };

  const tabs = [
    { id: "frontend", label: "Frontend", icon: Code },
    { id: "backend", label: "Backend & Languages", icon: Server },

    { id: "devops", label: "DevOps & Tools", icon: Settings },
   
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
            SKILLS
          </h2>
          <div className="w-24 h-1 bg-blue-700  mx-auto mb-6"></div>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Full Stack Development | DevOps Engineering | Machine Learning
          </p>
        </motion.div>

        {/* Category Tabs */}
        <motion.div 
          className="flex flex-wrap justify-center mb-12 gap-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {tabs.map((tab) => (
            <Button
              key={tab.id}
              variant={activeTab === tab.id ? "default" : "outline"}
              className={`px-6 py-3 font-semibold transition-all duration-300 ${
                activeTab === tab.id 
                  ? "bg-blue-700  text-white shadow-lg" 
                  : "text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 border-2 border-gray-300 dark:border-gray-600"
              }`}
              onClick={() => setActiveTab(tab.id)}
            >
              <tab.icon className="w-5 h-5 mr-2" />
              {tab.label}
            </Button>
          ))}
        </motion.div>

        {/* Skills Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Card className="p-8 shadow-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-center mb-8">
              <div className={`w-16 h-16 ${skillCategories[activeTab].bgColor} rounded-full flex items-center justify-center mr-4`}>
                {React.createElement(skillCategories[activeTab].icon, {
                  className: `w-8 h-8 ${skillCategories[activeTab].iconColor}`
                })}
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                {skillCategories[activeTab].title}
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {skillCategories[activeTab].skills.map((skill, index) => (
                <motion.div
                  key={index}
                  className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <skill.icon className={`w-8 h-8 ${skill.color}`} />
                      <span className="text-lg font-semibold text-gray-900 dark:text-white">
                        {skill.name}
                      </span>
                    </div>
                    <span className="text-sm font-bold text-blue-600 dark:text-blue-400">
                      {skill.level}%
                    </span>
                  </div>
                  <Progress 
                    value={skill.level} 
                    className="h-3 bg-gray-200 dark:bg-gray-700"
                  />
                </motion.div>
              ))}
            </div>
          </Card>
        </motion.div>

       
      </div>
    </section>
  );
};
