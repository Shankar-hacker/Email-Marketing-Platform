
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

const CTASection = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800">
      <div className="container mx-auto max-w-4xl text-center">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Transform Your Email Marketing?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of successful businesses and start creating email campaigns that actually convert.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-12">
            <motion.div 
              whileHover={{ scale: 1.05 }} 
              whileTap={{ scale: 0.95 }}
            >
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold shadow-xl">
                Start Your Free Trial
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </motion.div>
            
            <motion.div 
              whileHover={{ scale: 1.05 }} 
              whileTap={{ scale: 0.95 }}
            >
              <Button variant="outline" size="lg" className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 text-lg">
                Schedule Demo
              </Button>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-blue-100">
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="flex items-center justify-center"
            >
              <CheckCircle className="h-5 w-5 mr-2" />
              <span>No Credit Card Required</span>
            </motion.div>
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="flex items-center justify-center"
            >
              <CheckCircle className="h-5 w-5 mr-2" />
              <span>14-Day Free Trial</span>
            </motion.div>
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              viewport={{ once: true }}
              className="flex items-center justify-center"
            >
              <CheckCircle className="h-5 w-5 mr-2" />
              <span>Cancel Anytime</span>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
