
import { motion } from "framer-motion";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">EM</span>
              </div>
              <span className="text-xl font-bold">EmailMaster</span>
            </div>
            <p className="text-gray-400 mb-4">
              The most powerful email marketing platform for growing businesses.
            </p>
            <div className="flex space-x-4">
              {["twitter", "facebook", "linkedin", "instagram"].map((social) => (
                <motion.a
                  key={social}
                  href="#"
                  whileHover={{ scale: 1.2, color: "#3b82f6" }}
                  className="text-gray-400 hover:text-blue-400 transition-colors"
                >
                  <div className="w-6 h-6 bg-gray-600 rounded"></div>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {[
            {
              title: "Product",
              links: ["Features", "Templates", "Automation", "Analytics", "Integrations"]
            },
            {
              title: "Resources",
              links: ["Documentation", "Help Center", "Blog", "Case Studies", "Webinars"]
            },
            {
              title: "Company",
              links: ["About Us", "Careers", "Press", "Partners", "Contact"]
            }
          ].map((section, index) => (
            <motion.div
              key={section.title}
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <h3 className="text-lg font-semibold mb-4">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link}>
                    <motion.a
                      href="#"
                      whileHover={{ x: 5, color: "#3b82f6" }}
                      className="text-gray-400 hover:text-blue-400 transition-all duration-200"
                    >
                      {link}
                    </motion.a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center"
        >
          <p className="text-gray-400 text-sm">
            © {currentYear} EmailMaster. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            {["Privacy Policy", "Terms of Service", "Cookie Policy"].map((link) => (
              <motion.a
                key={link}
                href="#"
                whileHover={{ color: "#3b82f6" }}
                className="text-gray-400 hover:text-blue-400 text-sm transition-colors"
              >
                {link}
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
