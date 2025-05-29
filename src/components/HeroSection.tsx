
import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";
import { motion } from "framer-motion";

const HeroSection = () => {
  return (
    <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-6"
          >
            <span className="inline-block px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-4">
              🚀 The Future of Email Marketing is Here
            </span>
          </motion.div>

          <motion.h1
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight"
          >
            Create <span className="bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">Stunning</span> Email Campaigns
          </motion.h1>

          <motion.p
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed"
          >
            Design, send, and track beautiful email campaigns that convert. 
            Join 50,000+ businesses growing their audience with our powerful platform.
          </motion.p>

          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
          >
            <motion.div 
              whileHover={{ scale: 1.05 }} 
              whileTap={{ scale: 0.95 }}
            >
              <Button size="lg" className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-4 text-lg shadow-xl">
                Start Free Trial
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </motion.div>
            
            <motion.div 
              whileHover={{ scale: 1.05 }} 
              whileTap={{ scale: 0.95 }}
            >
              <Button variant="outline" size="lg" className="border-2 border-blue-200 hover:border-blue-300 px-8 py-4 text-lg">
                <Play className="mr-2 h-5 w-5" />
                Watch Demo
              </Button>
            </motion.div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="text-sm text-gray-500"
          >
            No credit card required • Free 14-day trial • Cancel anytime
          </motion.p>
        </div>

        {/* Hero Image/Dashboard Preview */}
        <motion.div
          initial={{ y: 100, opacity: 0, scale: 0.8 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 1.2, ease: "easeOut" }}
          className="relative"
        >
          <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-4">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-white/30 rounded-full"></div>
                <div className="w-3 h-3 bg-white/30 rounded-full"></div>
                <div className="w-3 h-3 bg-white/30 rounded-full"></div>
              </div>
            </div>
            <div className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl">
                  <div className="text-3xl font-bold text-blue-600 mb-2">2,847</div>
                  <div className="text-gray-600">Active Subscribers</div>
                </div>
                <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl">
                  <div className="text-3xl font-bold text-green-600 mb-2">94.2%</div>
                  <div className="text-gray-600">Delivery Rate</div>
                </div>
                <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-xl">
                  <div className="text-3xl font-bold text-purple-600 mb-2">$12,847</div>
                  <div className="text-gray-600">Revenue This Month</div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: "85%" }}
                    transition={{ duration: 2, delay: 2 }}
                    className="h-full bg-gradient-to-r from-blue-500 to-blue-600"
                  ></motion.div>
                </div>
                <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: "65%" }}
                    transition={{ duration: 2, delay: 2.2 }}
                    className="h-full bg-gradient-to-r from-green-500 to-green-600"
                  ></motion.div>
                </div>
                <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: "90%" }}
                    transition={{ duration: 2, delay: 2.4 }}
                    className="h-full bg-gradient-to-r from-purple-500 to-purple-600"
                  ></motion.div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
