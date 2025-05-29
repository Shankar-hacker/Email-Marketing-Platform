
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const stats = [
  { number: 50000, suffix: "+", label: "Active Users" },
  { number: 98.7, suffix: "%", label: "Delivery Rate" },
  { number: 2.5, suffix: "M+", label: "Emails Sent Monthly" },
  { number: 150, suffix: "+", label: "Countries Served" }
];

const CountUp = ({ end, suffix }: { end: number; suffix: string }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const stepValue = end / steps;
    const stepTime = duration / steps;

    let current = 0;
    const timer = setInterval(() => {
      current += stepValue;
      if (current >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [end]);

  return (
    <span>
      {end < 100 ? count.toFixed(1) : count.toLocaleString()}{suffix}
    </span>
  );
};

const StatsSection = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-blue-700">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Trusted by Businesses Worldwide
          </h2>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Join thousands of successful businesses that rely on our platform to grow their audience and increase revenue.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                <CountUp end={stat.number} suffix={stat.suffix} />
              </div>
              <div className="text-blue-100 font-medium">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
