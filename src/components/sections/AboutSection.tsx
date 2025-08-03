"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import {
  User,
  Target,
  Code,
  Mail,
  MapPin,
  GraduationCap,
  Github,
  Linkedin,
  Download,
} from "lucide-react";

export const AboutSection = () => {
  const infoCards = [
    {
      icon: User,
      color: "text-blue-500",
      bgColor: "bg-blue-50 dark:bg-blue-950",
      title: "About Me",
      description:
        "I am an undergraduate student currently pursuing a Bachelor's degree in Computing and Information Systems at Sabaragamuwa University of Sri Lanka. My academic journey has provided me with a solid foundation in full-stack development, data analysis, and cloud technologies.",
    },
    {
      icon: Target,
      color: "text-emerald-500",
      bgColor: "bg-emerald-50 dark:bg-emerald-950",
      title: "Goals",
      description:
        "I'm focused on enhancing my skills in web development, AI/ML, and cloud computing, with a goal of building innovative and impactful digital solutions.",
    },
    {
      icon: Code,
      color: "text-orange-500",
      bgColor: "bg-orange-50 dark:bg-orange-950",
      title: "Expertise",
      description:
        "MERN Stack, DevOps, and AI/ML technologies. Passionate about learning and applying new technologies to solve real-world challenges.",
    },
    {
      icon: Mail,
      color: "text-violet-500",
      bgColor: "bg-violet-50 dark:bg-violet-950",
      title: "Contact",
      description:
        "dinesh.priyantha@example.com • +94 123 456 789 • linkedin.com/in/dineshpriyantha",
    },
    {
      icon: MapPin,
      color: "text-red-500",
      bgColor: "bg-red-50 dark:bg-red-950",
      title: "Location",
      description:
        "Based in Sabaragamuwa, Sri Lanka. Available for remote work opportunities.",
    },
    {
      icon: GraduationCap,
      color: "text-teal-500",
      bgColor: "bg-teal-50 dark:bg-teal-950",
      title: "Education",
      description:
        "BSc(Hons) Computing and Information Systems, Sabaragamuwa University of Sri Lanka (2023 - Present). High School, Royal College Polonnaruwa (2019 - 2021).",
    },
  ];

  const socialLinks = [
    {
      icon: Linkedin,
      href: "https://linkedin.com/in/dineshpriyantha",
      label: "LinkedIn",
    },
    {
      icon: Github,
      href: "https://github.com/dineshpriyantha",
      label: "GitHub",
    },
    {
      icon: Mail,
      href: "mailto:dinesh@example.com",
      label: "Email",
    },
  ];

  return (
    <section className="py-20 bg-white dark:bg-gray-900 relative">
      <div className="container mx-auto px-6">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            ABOUT{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              ME
            </span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mb-6"></div>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Hello, I'm Dinesh
          </p>
          <p className="text-base text-gray-500 dark:text-gray-400 max-w-3xl mx-auto mt-4">
            I am passionate about learning and applying new technologies to solve real-world challenges.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Profile and Social */}
          <motion.div
            className="lg:col-span-1 flex flex-col items-center"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="w-80 h-80 rounded-2xl overflow-hidden shadow-xl bg-gradient-to-br from-blue-600 to-purple-600 p-2 mb-6">
              <div className="w-full h-full bg-gray-200 dark:bg-gray-700 rounded-xl flex items-center justify-center">
                <User className="w-32 h-32 text-gray-400" />
              </div>
            </div>

            <div className="flex space-x-4 mb-6">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  className="w-12 h-12 bg-gray-100 dark:bg-gray-800 hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600 text-gray-600 dark:text-gray-400 hover:text-white rounded-full flex items-center justify-center transition-all duration-300 shadow-lg"
                  aria-label={social.label}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>

            <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold px-8 py-3 shadow-lg transform hover:scale-105 transition-all duration-300">
              <Download className="w-5 h-5 mr-2" />
              DOWNLOAD CV
            </Button>
          </motion.div>

          {/* Info Cards */}
          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
            {infoCards.map((card, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="p-6 h-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                  <div className="flex items-start space-x-4">
                    <div className={`w-12 h-12 ${card.bgColor} rounded-full flex items-center justify-center flex-shrink-0`}>
                      <card.icon className={`w-6 h-6 ${card.color}`} />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                        {card.title}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                        {card.description}
                      </p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
