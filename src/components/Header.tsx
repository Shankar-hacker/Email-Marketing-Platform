
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <motion.header 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-blue-100 shadow-sm"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="flex items-center space-x-2"
          >
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">EM</span>
            </div>
            <span className="text-xl font-bold text-gray-900">EmailMaster</span>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {["Features", "Pricing", "Templates", "Analytics", "Support"].map((item) => (
              <motion.a
                key={item}
                href={`#${item.toLowerCase()}`}
                whileHover={{ scale: 1.05, color: "#2563eb" }}
                className="text-gray-600 hover:text-blue-600 transition-colors duration-300 font-medium"
              >
                {item}
              </motion.a>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" className="text-gray-600 hover:text-blue-600">
              Sign In
            </Button>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg">
                Start Free Trial
              </Button>
            </motion.div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden border-t border-gray-200 mt-2 pt-4 pb-4"
            >
              <nav className="flex flex-col space-y-4">
                {["Features", "Pricing", "Templates", "Analytics", "Support"].map((item, index) => (
                  <motion.a
                    key={item}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: index * 0.1 }}
                    href={`#${item.toLowerCase()}`}
                    className="text-gray-600 hover:text-blue-600 transition-colors py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item}
                  </motion.a>
                ))}
                <div className="pt-4 space-y-2">
                  <Button variant="ghost" className="w-full justify-start">
                    Sign In
                  </Button>
                  <Button className="w-full bg-gradient-to-r from-blue-600 to-blue-700">
                    Start Free Trial
                  </Button>
                </div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
};

export default Header;
