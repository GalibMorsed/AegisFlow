import React from "react";
import { useNavigate } from "react-router-dom";
import {
  FiCamera,
  FiActivity,
  FiMapPin,
  FiBell,
  FiCpu,
  FiGrid,
  FiArrowRight,
  FiShield,
  FiTrendingUp,
  FiGitBranch,
} from "react-icons/fi";
import { motion } from "framer-motion";
import BodyFooter from "./bodyFooter";

const fadeIn = (delay = 0) => ({
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay, ease: "easeOut" },
  },
});

const Body = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-slate-950 text-slate-100 overflow-hidden">
      {/* HERO SECTION */}
      <section className="relative min-h-[88vh] flex flex-col items-center justify-center text-center px-4 sm:px-6 overflow-hidden bg-gradient-to-b from-blue-950 via-slate-900 to-slate-950">
        {/* Soft animated blobs */}
        <motion.div
          className="absolute top-10 left-0 w-72 h-72 bg-blue-500/20 blur-3xl rounded-full"
          animate={{ y: [0, 30, 0], opacity: [0.2, 0.1, 0.2] }}
          transition={{ duration: 12, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-10 right-0 w-96 h-96 bg-blue-600/15 blur-[80px] rounded-full"
          animate={{ y: [0, -40, 0], opacity: [0.2, 0.05, 0.2] }}
          transition={{ duration: 14, repeat: Infinity }}
        />

        <motion.div
          initial="hidden"
          animate="visible"
          variants={{ visible: { transition: { staggerChildren: 0.15 } } }}
          className="relative z-10 max-w-3xl mx-auto"
        >
          <motion.h1
            className="text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight text-slate-50"
            variants={fadeIn()}
          >
            Welcome to{" "}
            <span className="text-blue-500 font-bold drop-shadow-sm">
              AegisFlow
            </span>
          </motion.h1>

          <motion.p
            className="text-sm sm:text-base text-slate-300 mt-4 max-w-xl mx-auto leading-relaxed"
            variants={fadeIn(0.15)}
          >
            AI-powered camera management and real-time crowd intelligence.
            Monitor, analyze, and make confident safety decisions — with clarity
            like never before.
          </motion.p>

          <motion.button
            onClick={() => navigate("/home")}
            className="mt-8 inline-flex items-center gap-2 bg-blue-600 text-white px-6 sm:px-7 py-3 rounded-full shadow-lg shadow-blue-600/20 hover:bg-blue-500 transition-all text-sm sm:text-base"
            variants={fadeIn(0.25)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.93 }}
          >
            Get Started
            <FiArrowRight className="text-lg" />
          </motion.button>
        </motion.div>
      </section>

      {/* FEATURES SECTION */}
      <section className="py-16 md:py-20 bg-slate-50 text-slate-900 border-t border-slate-200">
        <motion.div
          className="max-w-6xl mx-auto px-4 sm:px-6 text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={{ visible: { transition: { staggerChildren: 0.2 } } }}
        >
          <motion.h2
            className="text-2xl md:text-3xl font-semibold text-slate-900 mb-3 flex items-center justify-center gap-3"
            variants={fadeIn()}
          >
            Intelligent Security — All in One Platform
          </motion.h2>

          <motion.p
            className="text-slate-600 max-w-2xl mx-auto mb-10 md:mb-12 text-sm sm:text-base"
            variants={fadeIn(0.1)}
          >
            AegisFlow unifies live video, AI-based alerts, crowd flow analytics,
            and location-aware insights — giving you unmatched situational
            awareness.
          </motion.p>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-7 mt-2">
            {[
              {
                icon: <FiCamera />,
                title: "Live Multi-Camera Feed",
                text:
                  "Monitor high-quality video streams from all your cameras in real time.",
              },
              {
                icon: <FiBell />,
                title: "Smart Alerts",
                text:
                  "Instant notifications for motion, anomalies, crowd surges, and risk patterns.",
              },
              {
                icon: <FiActivity />,
                title: "Crowd Flow Analysis",
                text:
                  "AI-powered density & movement detection for safer decision-making.",
              },
              {
                icon: <FiMapPin />,
                title: "Map-Based Monitoring",
                text:
                  "Visualize exact camera positions and region-based activity on an interactive map.",
              },
              {
                icon: <FiCpu />,
                title: "AI Suggestions",
                text:
                  "Risk-aware action suggestions during alerts, generated by our AI engine.",
              },
              {
                icon: <FiGrid />,
                title: "Central Dashboard",
                text:
                  "All your cameras, alerts, tasks, and analytics in one unified interface.",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                variants={fadeIn(i * 0.05)}
                className="p-6 bg-white border border-slate-200/80 rounded-2xl shadow-sm hover:shadow-md hover:-translate-y-1 transition-all"
              >
                <div className="text-2xl text-blue-500 mb-3 flex sm:block justify-center">
                  {item.icon}
                </div>
                <h3 className="text-base md:text-lg font-semibold text-slate-900">
                  {item.title}
                </h3>
                <p className="text-slate-600 mt-2 text-sm">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* HOW IT WORKS SECTION */}
      <section className="py-16 md:py-20 bg-slate-100 text-slate-900 border-t border-slate-200">
        <motion.div
          className="max-w-6xl mx-auto px-4 sm:px-6 text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
        >
          <motion.h2
            className="text-2xl md:text-3xl font-semibold text-slate-900 mb-4"
            variants={fadeIn()}
          >
            Set Up AegisFlow in Minutes
          </motion.h2>

          <motion.p
            className="text-slate-600 max-w-2xl mx-auto mb-10 text-sm sm:text-base"
            variants={fadeIn(0.1)}
          >
            No complex setup. No heavy hardware. Just connect your cameras and
            go.
          </motion.p>

          {/* Steps */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-6">
            {[
              {
                icon: <FiGitBranch />,
                step: "1",
                title: "Create Your Account",
                text:
                  "Sign up securely and get instant access to your dashboard.",
              },
              {
                icon: <FiCamera />,
                step: "2",
                title: "Add Your Cameras",
                text:
                  "Use our smart form or map to register CCTV, IP cams, or device cameras.",
              },
              {
                icon: <FiTrendingUp />,
                step: "3",
                title: "Start Monitoring",
                text:
                  "View live feeds, receive alerts, and analyze movement instantly.",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                variants={fadeIn(i * 0.1 + 0.1)}
                className="bg-white border border-slate-200/80 rounded-2xl shadow-sm p-6 hover:shadow-md transition-all"
              >
                <div className="w-14 h-14 rounded-full bg-blue-500/10 text-blue-500 flex items-center justify-center mx-auto text-2xl">
                  {item.icon}
                </div>
                <div className="mt-4 w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center mx-auto text-base font-semibold">
                  {item.step}
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mt-4">
                  {item.title}
                </h3>
                <p className="text-slate-600 text-sm mt-2">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-20 bg-white text-slate-900 border-t border-slate-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl md:text-3xl font-semibold text-slate-900 mb-4 flex items-center justify-center gap-3">
            <FiShield className="text-blue-500 hidden sm:inline" />
            Ready to Unlock AI-Powered Security?
          </h2>
          <p className="text-slate-600 max-w-xl mx-auto text-sm sm:text-base mb-6">
            Join smart campuses, organizations, and surveillance teams using
            AegisFlow.
          </p>

          <button
            onClick={() => navigate("/signup")}
            className="bg-blue-600 text-white px-10 py-3 rounded-full shadow-lg shadow-blue-600/20 hover:bg-blue-500 hover:scale-105 transition-all text-sm sm:text-base"
          >
            Start Using For Free
          </button>
        </div>
      </section>

      <BodyFooter />
    </div>
  );
};

export default Body;
