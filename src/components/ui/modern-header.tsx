import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

export const ModernHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { label: "Home", path: "/" },
    { label: "About", path: "/about" },
    { label: "Education", path: "/education" },
    { label: "Skills", path: "/skills" },
    { label: "Portfolio", path: "/portfolio" },
    { label: "Contact", path: "/contact" }
  ];

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActiveRoute = (path: string) => location.pathname === path;

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        backgroundColor: `rgba(15, 23, 42, ${Math.min(scrollY / 100, 0.95)})`,
        backdropFilter: `blur(${Math.min(scrollY / 10, 20)}px)`,
      }}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="container mx-auto px-6 py-4">
        <nav className="flex items-center justify-between">
          {/* Modern Logo */}
          <motion.div
            className="flex items-center space-x-3"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="relative">
              <motion.div
                className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-xl flex items-center justify-center shadow-lg"
                animate={{
                  boxShadow: [
                    "0 0 20px rgba(59, 130, 246, 0.3)",
                    "0 0 30px rgba(59, 130, 246, 0.5)",
                    "0 0 20px rgba(59, 130, 246, 0.3)",
                  ],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <span className="text-white font-bold text-xl">DP</span>
              </motion.div>
              
              {/* Rotating Ring */}
              <motion.div
                className="absolute inset-0 border-2 border-blue-400/30 rounded-xl"
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              />
            </div>
            
            <div className="hidden md:block">
              <motion.h1
                className="text-xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                Dinesh Priyantha
              </motion.h1>
            </div>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-2">
            {navItems.map((item, index) => (
              <Link key={item.path} to={item.path}>
                <motion.div
                  className={`px-4 py-2 rounded-xl transition-all duration-300 ${
                    isActiveRoute(item.path)
                      ? "bg-blue-500/20 border border-blue-500/30 text-white shadow-lg"
                      : "text-slate-300 hover:text-white hover:bg-white/10"
                  }`}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 + 0.5, duration: 0.4 }}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {item.label}
                  
                  {/* Active Indicator */}
                  {isActiveRoute(item.path) && (
                    <motion.div
                      className="w-1 h-1 bg-blue-400 rounded-full mx-auto mt-1"
                      layoutId="activeIndicator"
                      animate={{
                        scale: [1, 1.2, 1],
                      }}
                      transition={{ duration: 1, repeat: Infinity }}
                    />
                  )}
                </motion.div>
              </Link>
            ))}
            
            {/* Blog Button */}
            <motion.button
              onClick={() => navigate('/blog')}
              className="px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-xl text-white font-medium shadow-lg hover:shadow-xl transition-all duration-300"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8, duration: 0.4 }}
            >
              Blog
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            className="md:hidden p-2 rounded-xl bg-white/10 backdrop-blur-sm text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.button>
        </nav>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div
            className="md:hidden mt-4 p-4 bg-slate-900/90 backdrop-blur-xl rounded-2xl border border-slate-700/50"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="space-y-2">
              {navItems.map((item, index) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <motion.div
                    className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-300 ${
                      isActiveRoute(item.path)
                        ? "bg-blue-500/20 border border-blue-500/30 text-white"
                        : "text-slate-300 hover:text-white hover:bg-white/10"
                    }`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.3 }}
                    whileHover={{ x: 5 }}
                  >
                    {item.label}
                  </motion.div>
                </Link>
              ))}
              
              <motion.button
                onClick={() => {
                  navigate('/blog');
                  setIsMenuOpen(false);
                }}
                className="w-full text-left px-4 py-3 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-xl text-white font-medium mt-4"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: navItems.length * 0.1, duration: 0.3 }}
                whileHover={{ x: 5 }}
              >
                Blog
              </motion.button>
            </div>
          </motion.div>
        )}
      </div>
    </motion.header>
  );
};