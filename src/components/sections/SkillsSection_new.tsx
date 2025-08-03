import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { motion } from "framer-motion";
import { Code, Server, Database, Brain, Settings, Users } from "lucide-react";
import { FaReact, FaNodeJs, FaDocker, FaPython, FaAws, FaHtml5, FaCss3Alt, FaJs } from "react-icons/fa";
import { SiMongodb, SiKubernetes, SiTensorflow, SiTailwindcss, SiExpress, SiMysql, SiTypescript } from "react-icons/si";

const SkillsSection = () => {
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
        { name: "Tailwind CSS", level: 90, icon: SiTailwindcss, color: "text-teal-400" },
        { name: "HTML5", level: 95, icon: FaHtml5, color: "text-orange-500" },
        { name: "CSS3", level: 90, icon: FaCss3Alt, color: "text-blue-500" },
        { name: "JavaScript", level: 88, icon: FaJs, color: "text-yellow-400" },
        { name: "TypeScript", level: 75, icon: SiTypescript, color: "text-blue-600" },
      ]
    },
    backend: {
      title: "Backend Development", 
      icon: Server,
      iconColor: "text-emerald-500",
      bgColor: "bg-emerald-50 dark:bg-emerald-950",
      skills: [
        { name: "Node.js", level: 82, icon: FaNodeJs, color: "text-green-500" },
        { name: "Express.js", level: 80, icon: SiExpress, color: "text-gray-600" },
        { name: "SQL", level: 85, icon: SiMysql, color: "text-blue-600" },
        { name: "MongoDB", level: 78, icon: SiMongodb, color: "text-green-400" },
        { name: "Python", level: 75, icon: FaPython, color: "text-yellow-400" },
      ]
    },
    devops: {
      title: "DevOps & AI/ML",
      icon: Settings, 
      iconColor: "text-violet-500",
      bgColor: "bg-violet-50 dark:bg-violet-950",
      skills: [
        { name: "Docker", level: 70, icon: FaDocker, color: "text-blue-500" },
        { name: "Kubernetes", level: 65, icon: SiKubernetes, color: "text-blue-600" },
        { name: "AWS (EC2, S3)", level: 72, icon: FaAws, color: "text-orange-400" },
        { name: "Git & Version Control", level: 88, icon: Code, color: "text-gray-600" },
        { name: "Python (ML Libraries)", level: 70, icon: FaPython, color: "text-yellow-400" },
        { name: "TensorFlow / Keras", level: 68, icon: SiTensorflow, color: "text-orange-500" },
      ]
    }
  };

  const tabs = [
    { id: "frontend", label: "Frontend", icon: Code },
    { id: "backend", label: "Backend", icon: Server },
    { id: "devops", label: "DevOps & AI/ML", icon: Brain },
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
          <div className="w-24 h-1 dark:bg-blue-900 mx-auto mb-6"></div>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            MERN Stack | DevOps | AI/ML
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
                  ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg" 
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

        {/* Skills Summary */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg">
              <Code className="w-12 h-12 text-blue-500 mx-auto mb-4" />
              <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Frontend</h4>
              <p className="text-gray-600 dark:text-gray-300">Modern React.js applications with responsive design</p>
            </div>
            <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg">
              <Server className="w-12 h-12 text-green-500 mx-auto mb-4" />
              <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Backend</h4>
              <p className="text-gray-600 dark:text-gray-300">Scalable APIs and database management</p>
            </div>
            <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg">
              <Brain className="w-12 h-12 text-purple-500 mx-auto mb-4" />
              <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">DevOps & AI</h4>
              <p className="text-gray-600 dark:text-gray-300">Cloud deployment and machine learning integration</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SkillsSection;
