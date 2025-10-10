import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { GraduationCap, Award, Users, Calendar } from "lucide-react";

export const EducationSection = () => {
  const [activeTab, setActiveTab] = useState("education");

  const tabData = {
    education: [
      {
        degree: "BSc(Hons) Computing and Information Systems",
        institution: "Sabaragamuwa University of Sri Lanka",
        location: "Belihuloya, Sri Lanka", 
        duration: "2023 - Present",
        status: "Pursuing",
        borderColor: "border-l-blue-500",
        badgeColor: "bg-blue-500",
        keyCourses: [
          "Full-Stack Development", 
          "Data Structures & Algorithms", 
          "Database Systems", 
          "Software Engineering", 
          "Cloud Computing", 
          "AI/ML Fundamentals"
        ],
        achievements: [
          "Solid foundation in full-stack development",
          "Strong focus on data analysis and cloud technologies",
          "Active participation in coding competitions"
        ]
      },
      
    ],
    experience: [
  {
    title: "Tech Support Intern",
    company: "GAOTek Inc.",
    location: "Remote",
    duration: "Oct 2023 - Jan 2024",
    type: "Internship",
    borderColor: "border-l-blue-500",
    badgeColor: "bg-blue-500",
    responsibilities: [
      "Practiced web development with the Bootstrap framework, strengthening front-end design and improving user experience",
      "Collaborated with cross-functional teams to enhance communication and teamwork skills",
      "Troubleshot and resolved technical issues to ensure smooth customer support and system stability",
      "Prepared documentation and contributed to system process optimization"
    ],
    technologies: [
      "Bootstrap", "HTML", "CSS", "JavaScript", "Teamwork Tools", "Problem-Solving"
    ]
  }
],

volunteering: [
  {
    role: "Technical Activities Committee Volunteer",
    organization: "IEEE WIE SL SAC, IEEE WIE Sri Lanka Section",
    location: "Sabaragamuwa University",
    duration: "2023 - Present",
    borderColor: "border-l-orange-500",
    badgeColor: "bg-orange-500",
    activities: [
      "Organized and coordinated technical workshops and events for university students",
      "Promoted STEM outreach and technology awareness through campus and IEEE events",
      "Mentored new members and facilitated knowledge sharing within the student branch",
      "Actively contributed to IEEE WIE Student Branch Affinity Group of SUSL"
    ],
    impact: "Supported 50+ students in developing technical skills and engaging in tech community activities"
  },
  {
    role: "Volunteer",
    organization: "IEEE Student Branch and IEEE WIE Student Branch Affinity Group of SUSL",
    location: "Sabaragamuwa University",
    duration: "2023 - Present",
    borderColor: "border-l-orange-500",
    badgeColor: "bg-orange-500",
    activities: [
      "Supported and participated in organizing technical events and workshops for university students",
      "Collaborated with fellow members to promote STEM fields and technology awareness within the campus",
      "Mentored and assisted peers in academic and tech-related pursuits",
      "Actively contributed to the IEEE WIE community and student branch initiatives"
    ],
    impact: "Engaged more than 50 students in tech activities and fostered a collaborative learning environment"
  }
]
  };

  const tabs = [
    { id: "education", label: "Education", icon: GraduationCap },
    { id: "experience", label: "Experience", icon: Award },
    { id: "volunteering", label: "Volunteering", icon: Users },
  ];

  return (
    <section className="py-20 bg-background relative">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            QUALIFICATION
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto mb-6"></div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            My personal journey
          </p>
        </motion.div>

        {/* Tab Navigation */}
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
                  ? "bg-primary text-primary-foreground shadow-lg" 
                  : "text-foreground hover:text-primary border-2 border-border hover:border-primary/50"
              }`}
              onClick={() => setActiveTab(tab.id)}
            >
              <tab.icon className="w-5 h-5 mr-2" />
              {tab.label}
            </Button>
          ))}
        </motion.div>

        {/* Tab Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <div className="space-y-8">
            {tabData[activeTab]?.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className={`p-6 shadow-lg hover:shadow-xl transition-all duration-300 bg-transparent hover:bg-white/5 dark:hover:bg-gray-900/20 border border-gray-200/20 dark:border-gray-700/30 border-l-4 ${item.borderColor} backdrop-blur-sm`}>
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <Badge className={`text-white ${item.badgeColor}`}>
                          {item.status || item.type || "Active"}
                        </Badge>
                        <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm">
                          <Calendar className="w-4 h-4 mr-1" />
                          {item.duration}
                        </div>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                        {item.degree || item.title || item.role}
                      </h3>
                      <p className="text-blue-600 dark:text-blue-400 font-semibold">
                        {item.institution || item.company || item.organization}
                      </p>
                      <p className="text-gray-500 dark:text-gray-400 text-sm">
                        {item.location}
                      </p>
                    </div>
                  </div>

                  {/* Key Courses/Responsibilities/Activities */}
                  {(item.keyCourses || item.responsibilities || item.activities) && (
                    <div className="mb-4">
                      <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                        {item.keyCourses ? "Key Courses" : item.responsibilities ? "Responsibilities" : "Activities"}
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {(item.keyCourses || item.responsibilities || item.activities)?.map((course, courseIndex) => (
                          <Badge 
                            key={courseIndex} 
                            variant="secondary" 
                            className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                          >
                            {course}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Technologies */}
                  {item.technologies && (
                    <div className="mb-4">
                      <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Technologies</h4>
                      <div className="flex flex-wrap gap-2">
                        {item.technologies.map((tech, techIndex) => (
                          <Badge 
                            key={techIndex} 
                            className="bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300"
                          >
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Achievements/Impact */}
                  {(item.achievements || item.impact) && (
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                        {item.achievements ? "Achievements" : "Impact"}
                      </h4>
                      {item.achievements ? (
                        <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-1">
                          {item.achievements.map((achievement, achIndex) => (
                            <li key={achIndex}>{achievement}</li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-gray-600 dark:text-gray-300">{item.impact}</p>
                      )}
                    </div>
                  )}
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <p className="text-lg text-muted-foreground mb-6">
            Ready to start your next project?
          </p>
            <Button 
            className="professional-button px-8 py-3 shadow-lg transform hover:scale-105 transition-all duration-300"
            onClick={() => {
              window.location.href = '/contact';
            }}
            >
            Get In Touch
            </Button>
        </motion.div>
      </div>
    </section>
  );
};
