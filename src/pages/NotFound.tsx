import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { ModernHeader } from "@/components/ui/modern-header";
import { FloatingTechIcons } from "@/components/ui/floating-tech-icons";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 relative overflow-hidden">
      <FloatingTechIcons />
      <ModernHeader />
      
      <div className="flex items-center justify-center min-h-screen relative z-10">
        <div className="text-center">
          <h1 className="text-6xl font-bold mb-4 text-white">404</h1>
          <p className="text-xl text-slate-300 mb-8">Oops! Page not found</p>
          <a href="/" className="inline-block px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-2xl transition-colors duration-300 font-medium">
            Return to Home
          </a>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
