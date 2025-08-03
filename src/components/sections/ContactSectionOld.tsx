import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { motion } from "framer-motion";
import { 
  Mail, 
  Phone, 
  MessageSquare,
  Send,
  Linkedin,
  Github,
  MapPin,
  Globe
} from "lucide-react";

export const ContactSection = () => {
  const [activeTab, setActiveTab] = useState("talk");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const contactMethods = [
    {
      title: "Talk to Me",
      methods: [
        {
          icon: Linkedin,
          label: "LinkedIn",
          value: "linkedin.com/in/dineshpriyantha",
          link: "https://linkedin.com/in/dineshpriyantha",
          color: "text-blue-600"
        },
        {
          icon: Mail,
          label: "Email",
          value: "dinesh.priyantha@example.com",
          link: "mailto:dinesh.priyantha@example.com",
          color: "text-red-500"
        },
        {
          icon: Globe,
          label: "Medium",
          value: "medium.com/@dineshpriyantha",
          link: "https://medium.com/@dineshpriyantha",
          color: "text-gray-700"
        }
      ]
    }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
    // Reset form
    setFormData({ name: "", email: "", message: "" });
  };

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
            CONNECT WITH <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">ME</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mb-6"></div>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Get in Touch
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Methods */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Talk to Me</h3>
                <div className="space-y-6">
                  {contactMethods[0].methods.map((method, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <Card className="p-6 hover:shadow-lg transition-all duration-300 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-white dark:bg-gray-700 rounded-full flex items-center justify-center shadow-md">
                            <method.icon className={`w-6 h-6 ${method.color}`} />
                          </div>
                          <div className="flex-1">
                            <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                              {method.label}
                            </h4>
                            <a 
                              href={method.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300"
                            >
                              {method.value}
                            </a>
                          </div>
                        </div>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Contact Me</h3>
              <Card className="p-8 shadow-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                      Name
                    </label>
                    <Input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Your full name"
                      className="w-full bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                      Email
                    </label>
                    <Input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="your.email@example.com"
                      className="w-full bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                      Your Message
                    </label>
                    <Textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Tell me about your project or just say hello..."
                      rows={5}
                      className="w-full bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400 resize-none"
                      required
                    />
                  </div>

                  <Button 
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-3 px-6 shadow-lg transform hover:scale-105 transition-all duration-300"
                  >
                    <Send className="w-5 h-5 mr-2" />
                    Send Message
                  </Button>
                </form>
              </Card>
            </div>
          </motion.div>
        </div>

        {/* Footer */}
        <motion.div
          className="mt-20 pt-12 border-t border-gray-200 dark:border-gray-700"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {/* About */}
            <div>
              <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                Dinesh Priyantha
              </h4>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Full-Stack Developer | AI Enthusiast | Open Source Contributor
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                Quick Links
              </h4>
              <div className="space-y-2">
                <button 
                  onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
                  className="block text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300 text-sm"
                >
                  About
                </button>
                <button 
                  onClick={() => document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' })}
                  className="block text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300 text-sm"
                >
                  Portfolio
                </button>
                <button 
                  onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                  className="block text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300 text-sm"
                >
                  Contact
                </button>
              </div>
            </div>

            {/* Follow Me */}
            <div>
              <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                Follow Me
              </h4>
              <div className="flex justify-center space-x-4">
                <a 
                  href="https://linkedin.com/in/dineshpriyantha" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-200 dark:bg-gray-700 hover:bg-blue-600 dark:hover:bg-blue-600 text-gray-600 dark:text-gray-300 hover:text-white rounded-full flex items-center justify-center transition-all duration-300"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
                <a 
                  href="https://github.com/dineshpriyantha" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-200 dark:bg-gray-700 hover:bg-gray-800 dark:hover:bg-gray-600 text-gray-600 dark:text-gray-300 hover:text-white rounded-full flex items-center justify-center transition-all duration-300"
                >
                  <Github className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700 text-center">
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              © 2025 DineshPriyantha. All rights reserved.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
