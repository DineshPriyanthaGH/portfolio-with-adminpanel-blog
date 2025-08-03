import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { LocationTimeDisplay } from "@/components/ui/location-time-display";

const Header = () => {
  const [activeNav, setActiveNav] = useState("Home");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const navItems = [
    { label: "Home", id: "home" },
    { label: "About", id: "about" },
    { label: "Skills", id: "skills" },
    { label: "Portfolio", id: "portfolio" },
    { label: "Contact", id: "contact" }
  ];

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
      setActiveNav(sectionId);
      setIsMobileMenuOpen(false);
    }
  };

  const handleBlogClick = () => {
    navigate('/blog');
    setIsMobileMenuOpen(false);
  };

  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border shadow-sm"
    >
      <div className="container mx-auto px-6 py-4">
        <nav className="flex items-center justify-between">
          {/* Logo */}
          <motion.div 
            className="flex items-center space-x-2"
            whileHover={{ scale: 1.05 }}
          >
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">DP</span>
            </div>
            <span className="text-xl font-bold text-foreground">
              
            </span>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              {navItems.map((item) => (
                <Button
                  key={item.id}
                  variant={activeNav === item.id ? "default" : "ghost"}
                  className={`font-medium px-4 py-2 transition-all duration-200 ${
                    activeNav === item.id 
                      ? "bg-primary text-primary-foreground shadow-sm" 
                      : "text-muted-foreground hover:text-foreground hover:bg-accent"
                  }`}
                  onClick={() => scrollToSection(item.id)}
                >
                  {item.label}
                </Button>
              ))}
              
              {/* Blog Button */}
              <Button
                variant="outline"
                className="font-medium px-4 py-2 border border-border text-foreground hover:bg-accent transition-all duration-200"
                onClick={handleBlogClick}
              >
                Blog
              </Button>
            </div>

            {/* Location & Theme */}
            <div className="flex items-center space-x-4 ml-4 pl-4 border-l border-border">
              <LocationTimeDisplay className="hidden lg:block" />
              <ThemeToggle />
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            <ThemeToggle />
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="professional-button"
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </nav>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden mt-4 py-4 border-t border-border"
          >
            <div className="flex flex-col space-y-2">
              <div className="mb-4 pb-4 border-b border-border">
                <LocationTimeDisplay />
              </div>
              
              {navItems.map((item) => (
                <Button
                  key={item.id}
                  variant={activeNav === item.id ? "default" : "ghost"}
                  className={`w-full justify-start font-medium py-3 ${
                    activeNav === item.id 
                      ? "bg-primary text-primary-foreground" 
                      : "text-muted-foreground hover:text-foreground hover:bg-accent"
                  }`}
                  onClick={() => scrollToSection(item.id)}
                >
                  {item.label}
                </Button>
              ))}
              <Button
                variant="outline"
                className="w-full justify-start font-medium py-3 border border-border text-foreground hover:bg-accent"
                onClick={handleBlogClick}
              >
                Blog
              </Button>
            </div>
          </motion.div>
        )}
      </div>
    </motion.header>
  );
};

export { Header };