import { Header } from "@/components/layout/Header";
import { HeroSection } from "@/components/sections/HeroSection";
import { AboutSection } from "@/components/sections/AboutSectionNew";
import { EducationSection } from "@/components/sections/EducationSection";
import { SkillsSection } from "@/components/sections/SkillsSection";
import { ProjectsSection } from "@/components/sections/ProjectsSectionNew";
import { ContactSection } from "@/components/sections/ContactSection";
import { AnimatedBackground } from "@/components/ui/animated-background";

const Index = () => {
  return (
    <div className="min-h-screen bg-background relative">
      <AnimatedBackground />
      <div className="relative z-10">
        <Header />
        <main className="pt-20">
          <section id="home" className="animate-fade-in-up">
            <HeroSection />
          </section>
          <section id="about" className="animate-fade-in-up">
            <AboutSection />
          </section>
          <section id="education" className="animate-fade-in-up">
            <EducationSection />
          </section>
          <section id="skills" className="animate-fade-in-up">
            <SkillsSection />
          </section>
          <section id="portfolio" className="animate-fade-in-up">
            <ProjectsSection />
          </section>
          <section id="contact" className="animate-fade-in-up">
            <ContactSection />
          </section>
        </main>
      </div>
    </div>
  );
};

export default Index;
