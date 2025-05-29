
import { Mail, Users, BarChart3, Zap, Shield, Globe } from "lucide-react";
import { motion } from "framer-motion";

const features = [
  {
    icon: Mail,
    title: "Drag & Drop Builder",
    description: "Create stunning emails with our intuitive visual editor. No coding required.",
    color: "blue"
  },
  {
    icon: Users,
    title: "Advanced Segmentation",
    description: "Target the right audience with powerful segmentation and personalization tools.",
    color: "green"
  },
  {
    icon: BarChart3,
    title: "Real-time Analytics",
    description: "Track opens, clicks, and conversions with detailed reporting and insights.",
    color: "purple"
  },
  {
    icon: Zap,
    title: "Automation Workflows",
    description: "Set up automated email sequences that nurture leads and drive sales.",
    color: "yellow"
  },
  {
    icon: Shield,
    title: "Deliverability Excellence",
    description: "Ensure your emails reach the inbox with our premium delivery infrastructure.",
    color: "red"
  },
  {
    icon: Globe,
    title: "Global Scale",
    description: "Send millions of emails worldwide with 99.9% uptime and lightning speed.",
    color: "indigo"
  }
];

const FeaturesSection = () => {
  return (
    <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Everything You Need to <span className="text-blue-600">Succeed</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Powerful features designed to help you create, send, and optimize email campaigns that drive real results.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="group bg-gradient-to-br from-gray-50 to-white p-8 rounded-2xl border border-gray-200 hover:border-blue-200 hover:shadow-xl transition-all duration-300"
            >
              <div className={`w-16 h-16 bg-gradient-to-r from-${feature.color}-500 to-${feature.color}-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <feature.icon className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
