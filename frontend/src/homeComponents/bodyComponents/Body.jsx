import React from "react";
import { useNavigate } from "react-router-dom";
import {
  FiVideo,
  FiGrid,
  FiPlusCircle,
  FiShield,
  FiLogIn,
  FiEye,
} from "react-icons/fi";
import { motion } from "framer-motion";
import BodyFooter from "./bodyFooter";

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.2 } },
};

const Body = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-gray-50 text-gray-800 overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-500 via-indigo-700 to-blue-900 text-white overflow-hidden">
        {/* Floating animated blobs */}
        <motion.div
          className="absolute top-20 left-10 w-72 h-72 bg-blue-400 rounded-full mix-blend-overlay filter blur-3xl opacity-40"
          animate={{ y: [0, 30, 0], scale: [1, 1.05, 1] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-10 right-20 w-96 h-96 bg-indigo-500 rounded-full mix-blend-overlay filter blur-3xl opacity-40"
          animate={{ y: [0, -30, 0], scale: [1, 1.05, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />

        <motion.div
          className="text-center space-y-8 px-4 relative z-10"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          <motion.h1
            className="text-4xl md:text-6xl font-extrabold tracking-tight drop-shadow-lg"
            variants={fadeInUp}
          >
            Welcome to <span className="text-yellow-300">AegisFlow</span>
          </motion.h1>

          <motion.p
            className="text-lg md:text-xl text-blue-100 max-w-2xl mx-auto"
            variants={fadeInUp}
          >
            The all-in-one solution for managing and monitoring your security
            cameras. Streamline your surveillance workflow with ease and
            efficiency.
          </motion.p>

          <motion.button
            onClick={() => navigate("/home")}
            className="bg-yellow-400 text-blue-900 font-bold px-8 py-4 rounded-full shadow-xl hover:bg-yellow-300 hover:scale-110 transition-transform duration-300 text-lg"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            variants={fadeInUp}
          >
            Get Started 🚀
          </motion.button>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <motion.div
          className="container mx-auto px-6 text-center"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.h2
            className="text-3xl md:text-4xl font-bold text-blue-900 mb-4"
            variants={fadeInUp}
          >
            Unified Camera Management
          </motion.h2>
          <motion.p
            className="text-gray-600 max-w-3xl mx-auto mb-12"
            variants={fadeInUp}
          >
            AegisFlow provides a robust platform to connect, view, and manage
            all your cameras from a single, intuitive dashboard.
          </motion.p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <FiPlusCircle />,
                title: "Add Any Camera",
                text:
                  "Easily connect various camera types including CCTV, IP Cameras, Webcams, and more.",
              },
              {
                icon: <FiVideo />,
                title: "Live Footage",
                text:
                  "View real-time footage from all your connected cameras in a clean, grid-based layout.",
              },
              {
                icon: <FiGrid />,
                title: "Central Dashboard",
                text:
                  "Manage settings, locations, and camera details all from one centralized interface.",
              },
              {
                icon: <FiShield />,
                title: "Secure & Reliable",
                text:
                  "Your data and streams are handled securely, ensuring privacy and uninterrupted service.",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                className="p-6 bg-gray-100 rounded-xl shadow-md hover:shadow-lg hover:-translate-y-2 transition-all duration-300"
                variants={fadeInUp}
              >
                <div className="text-4xl text-blue-600 mb-4 flex justify-center">
                  {item.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-blue-50">
        <motion.div
          className="container mx-auto px-6 text-center"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.h2
            className="text-3xl md:text-4xl font-bold text-blue-900 mb-12"
            variants={fadeInUp}
          >
            Get Started in 3 Simple Steps
          </motion.h2>

          <div className="flex flex-col lg:flex-row justify-center text-center items-center gap-12 md:gap-16">
            {[
              {
                num: 1,
                icon: <FiLogIn />,
                title: "Create Account",
                text: "Sign up for a free account to get started.",
              },
              {
                num: 2,
                icon: <FiPlusCircle />,
                title: "Add Your Cameras",
                text: "Use our simple form to add and configure your cameras.",
              },
              {
                num: 3,
                icon: <FiEye />,
                title: "Monitor & Manage",
                text:
                  "Watch live feeds and manage your devices from the dashboard.",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                className="text-center max-w-xs bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
                variants={fadeInUp}
              >
                <div className="bg-blue-600 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                  {item.num}
                </div>
                <div className="text-4xl text-blue-700 mx-auto mb-3">
                  {item.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* CTA Section */}
      <section className="bg-white py-24">
        <motion.div
          className="container mx-auto px-6 text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <motion.h2
            className="text-3xl md:text-4xl font-bold text-blue-900 mb-4"
            variants={fadeInUp}
          >
            Ready to Streamline Your Surveillance?
          </motion.h2>
          <motion.p
            className="text-gray-600 max-w-2xl mx-auto mb-8"
            variants={fadeInUp}
          >
            Join AegisFlow today and take control of your camera network like
            never before.
          </motion.p>
          <motion.button
            onClick={() => navigate("/signup")}
            className="bg-blue-600 text-white font-bold px-8 py-4 rounded-full shadow-lg hover:bg-blue-700 hover:scale-110 transition-all duration-300 text-lg"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            Start Using for Free
          </motion.button>
        </motion.div>
      </section>

      {/* Footer */}
      <BodyFooter />
    </div>
  );
};

export default Body;
