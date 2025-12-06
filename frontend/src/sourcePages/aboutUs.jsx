import React from "react";
import Nav from "../homeComponents/Nav";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut", delay },
  viewport: { once: true, amount: 0.25 },
});

const scaleIn = (delay = 0) => ({
  initial: { opacity: 0, scale: 0.96 },
  whileInView: { opacity: 1, scale: 1 },
  transition: { duration: 0.55, ease: "easeOut", delay },
  viewport: { once: true, amount: 0.25 },
});

const AboutPage = () => {
  const currentYear = new Date().getFullYear();

  return (
    <>
      <Nav />

      {/* overall page background */}
      <div className="min-h-screen bg-gradient-to-b from-slate-50 via-slate-50 to-emerald-50/40 text-slate-800 flex flex-col">
        {/* HERO SECTION */}
        <section className="relative overflow-hidden">
          {/* very soft background glow */}
          <motion.div
            className="pointer-events-none absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            <div className="absolute -left-32 -top-40 h-64 w-64 rounded-full bg-emerald-200/25 blur-3xl" />
            <div className="absolute right-[-4rem] top-10 h-72 w-72 rounded-full bg-sky-200/25 blur-3xl" />
          </motion.div>

          <div className="relative max-w-6xl mx-auto px-4 pt-12 pb-16 md:pt-16 md:pb-20">
            <div className="grid gap-10 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] items-center">
              {/* Left: Text */}
              <motion.div {...fadeUp(0.05)} className="space-y-4 md:space-y-5">
                <p className="text-[11px] uppercase tracking-[0.2em] text-emerald-600/90 mb-1">
                  ABOUT AEGISFLOW
                </p>
                <motion.h1
                  className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight text-slate-900"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, ease: "easeOut" }}
                >
                  Building safer, smarter spaces with{" "}
                  <span className="text-emerald-500">
                    AI-powered crowd insight.
                  </span>
                </motion.h1>
                <p className="mt-2 text-sm md:text-base text-slate-600 max-w-xl leading-relaxed">
                  AegisFlow is an intelligent crowd management and camera
                  coordination platform designed for campuses, public spaces,
                  and organizations that need real-time awareness and calm,
                  structured response when it matters most.
                </p>

                <motion.div
                  className="mt-6 grid gap-4 sm:grid-cols-3 max-w-md text-xs md:text-[13px]"
                  {...fadeUp(0.15)}
                >
                  {[
                    {
                      title: "24/7 visibility",
                      desc:
                        "Bring cameras, staff, and events into a single live operational view.",
                      textColor: "text-emerald-600",
                    },
                    {
                      title: "Human + AI insight",
                      desc:
                        "Combine structured workflows with AI-driven analysis and guidance.",
                      textColor: "text-sky-600",
                    },
                    {
                      title: "Designed for teams",
                      desc:
                        "Built for coordinators, staff, and security teams to stay aligned.",
                      textColor: "text-slate-700",
                    },
                  ].map((card) => (
                    <motion.div
                      key={card.title}
                      className="rounded-xl border border-slate-200/80 bg-white/70 backdrop-blur-sm px-3 py-3 shadow-sm"
                      whileHover={{
                        y: -3,
                        scale: 1.01,
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 220,
                        damping: 18,
                      }}
                    >
                      <p className={`${card.textColor} font-semibold text-sm`}>
                        {card.title}
                      </p>
                      <p className="mt-1 text-slate-600">{card.desc}</p>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>

              {/* Right: Info card */}
              <motion.div
                {...scaleIn(0.15)}
                className="rounded-2xl border border-slate-200/80 bg-white/80 backdrop-blur-md p-5 md:p-6 shadow-lg shadow-emerald-100/70"
              >
                <p className="text-xs font-medium text-slate-500">Our focus</p>
                <p className="mt-2 text-sm md:text-[15px] text-slate-800 leading-relaxed">
                  AegisFlow originated as a research-led initiative to answer a
                  simple question:{" "}
                  <span className="text-emerald-600">
                    “How do we give humans better tools in complex, crowded
                    environments?”
                  </span>{" "}
                  From there, we designed a platform that makes cameras more
                  meaningful, staff more coordinated, and responses more
                  thoughtful.
                </p>

                <div className="mt-5 grid grid-cols-3 gap-3 text-center text-[11px] md:text-xs">
                  {[
                    {
                      label: "Core modules",
                      value: "3+",
                      color: "text-emerald-500",
                    },
                    {
                      label: "Operational view",
                      value: "Real-time",
                      color: "text-sky-500",
                    },
                    {
                      label: "Design approach",
                      value: "People-first",
                      color: "text-slate-800",
                    },
                  ].map((item) => (
                    <motion.div
                      key={item.label}
                      className="rounded-lg border border-slate-200 bg-slate-50/80 py-3"
                      whileHover={{ y: -2, scale: 1.01 }}
                      transition={{
                        type: "spring",
                        stiffness: 240,
                        damping: 18,
                      }}
                    >
                      <p
                        className={`text-lg md:text-xl font-semibold ${item.color}`}
                      >
                        {item.value}
                      </p>
                      <p className="text-slate-500 mt-1">{item.label}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* MISSION / VISION / WHAT WE DO */}
        <section className="bg-slate-50/80 border-t border-slate-200/70">
          <div className="max-w-6xl mx-auto px-4 py-10 md:py-12 space-y-8">
            <motion.div
              className="grid gap-6 md:grid-cols-3"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={{
                hidden: {},
                visible: {
                  transition: { staggerChildren: 0.12 },
                },
              }}
            >
              {[
                {
                  label: "Our mission",
                  color: "text-emerald-600/90",
                  text:
                    "To give organizations a calm, unified view of their spaces so that they can react faster, collaborate better, and keep people safer—without overwhelming the humans at the center.",
                },
                {
                  label: "Our vision",
                  color: "text-sky-600/90",
                  text:
                    "A world where cameras and data streams don't just record events—they help teams anticipate risk, guide response, and create smoother, safer experiences in real time.",
                },
                {
                  label: "What we build",
                  color: "text-slate-500",
                  textList: [
                    "A central dashboard for cameras, events, and staff management.",
                    "Task and alert flows that match how teams actually work.",
                    "AI-assisted analysis layers to surface what matters.",
                  ],
                },
              ].map((block) => (
                <motion.div
                  key={block.label}
                  variants={fadeUp().initial}
                  whileInView={fadeUp().whileInView}
                  transition={fadeUp().transition}
                  viewport={fadeUp().viewport}
                  className="rounded-2xl border border-slate-200/80 bg-white/80 p-5 md:p-6 shadow-sm"
                >
                  <p
                    className={`text-[11px] font-semibold uppercase tracking-[0.2em] ${block.color}`}
                  >
                    {block.label}
                  </p>
                  {block.text && (
                    <p className="mt-3 text-sm md:text-[15px] text-slate-700 leading-relaxed">
                      {block.text}
                    </p>
                  )}
                  {block.textList && (
                    <ul className="mt-3 space-y-2 text-xs md:text-[13px] text-slate-600 leading-relaxed">
                      {block.textList.map((t) => (
                        <li key={t}>• {t}</li>
                      ))}
                    </ul>
                  )}
                </motion.div>
              ))}
            </motion.div>

            {/* VALUES */}
            <motion.div className="mt-4" {...fadeUp(0.1)}>
              <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-slate-500 mb-3">
                Our principles
              </p>
              <div className="grid gap-4 md:grid-cols-4 text-xs md:text-[13px]">
                {[
                  {
                    title: "Human-centered",
                    desc:
                      "Tools should reduce noise, not add more dashboards or stress.",
                  },
                  {
                    title: "Responsible AI",
                    desc:
                      "We treat AI as an assistant to human judgment, not a replacement.",
                  },
                  {
                    title: "Operational clarity",
                    desc:
                      "Every feature must make daily operations simpler and more reliable.",
                  },
                  {
                    title: "Privacy & respect",
                    desc:
                      "We design with privacy, governance, and clear accountability in mind.",
                  },
                ].map((val) => (
                  <motion.div
                    key={val.title}
                    className="rounded-xl border border-slate-200/80 bg-white/80 p-4 shadow-sm"
                    whileHover={{ y: -3, scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 230, damping: 18 }}
                  >
                    <p className="font-semibold text-slate-800 mb-1">
                      {val.title}
                    </p>
                    <p className="text-slate-600">{val.desc}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* PRODUCT SNAPSHOT / STACKED LAYOUT */}
        <section className="bg-emerald-50/40 border-t border-emerald-100">
          <div className="max-w-6xl mx-auto px-4 py-10 md:py-12 grid gap-8 md:grid-cols-[minmax(0,1.5fr)_minmax(0,1.2fr)] items-start">
            {/* Left: product story */}
            <motion.div {...fadeUp(0.05)} className="space-y-4">
              <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-emerald-600/90">
                The AegisFlow platform
              </p>
              <h2 className="text-xl md:text-2xl font-semibold text-slate-900">
                A single surface for cameras, staff, and crowd awareness.
              </h2>
              <p className="text-sm md:text-[15px] text-slate-700 leading-relaxed">
                AegisFlow connects your key operational pieces into a single,
                structured experience. From a central dashboard, teams can:
              </p>
              <ul className="space-y-1.5 text-xs md:text-[13px] text-slate-700 leading-relaxed">
                <li>
                  • Track active cameras and their locations with clear context.
                </li>
                <li>
                  • Log events and incidents in an organized, searchable way.
                </li>
                <li>• Assign staff to specific zones and responsibilities.</li>
                <li>
                  • Run tasks from start to completion with status clarity.
                </li>
              </ul>

              <p className="text-xs md:text-[13px] text-slate-500 mt-3">
                The result is a calm, high-fidelity view of what&apos;s
                happening now—and what needs attention next.
              </p>
            </motion.div>

            {/* Right: stats / timeline */}
            <motion.div {...fadeUp(0.1)} className="space-y-4">
              <motion.div
                className="rounded-2xl border border-emerald-100 bg-white/90 p-5 shadow-sm"
                {...scaleIn(0.1)}
              >
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">
                  How we got here
                </p>
                <div className="mt-3 space-y-3 text-xs md:text-[13px] text-slate-600">
                  {[
                    {
                      color: "bg-emerald-400/80",
                      title: "Concept & research",
                      text:
                        "Started as a project exploring how AI and structured workflows can support crowd management scenarios.",
                    },
                    {
                      color: "bg-sky-400/80",
                      title: "Operational dashboard",
                      text:
                        "Evolved into a unified platform with camera, task, event, and staff modules working together.",
                    },
                    {
                      color: "bg-slate-300/80",
                      title: "AI-augmented future",
                      text:
                        "The next steps: deeper AI insights to help detect patterns, highlight anomalies, and recommend actions in real time.",
                    },
                  ].map((step) => (
                    <div key={step.title} className="flex gap-3">
                      <span
                        className={`mt-0.5 h-5 min-w-[2px] rounded-full ${step.color}`}
                      />
                      <div>
                        <p className="font-semibold text-slate-800">
                          {step.title}
                        </p>
                        <p className="text-slate-600">{step.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Small metrics row */}
              <motion.div
                className="grid grid-cols-3 gap-3 text-center text-[11px] md:text-xs"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={{
                  hidden: { opacity: 0, y: 12 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { staggerChildren: 0.1 },
                  },
                }}
              >
                {[
                  {
                    label: "Designed in layers",
                    value: "Modular",
                    color: "text-emerald-500",
                  },
                  {
                    label: "Built for operations",
                    value: "Focused",
                    color: "text-sky-500",
                  },
                  {
                    label: "Actively improving",
                    value: "Evolving",
                    color: "text-slate-800",
                  },
                ].map((metric) => (
                  <motion.div
                    key={metric.label}
                    className="rounded-xl border border-emerald-100 bg-white/90 py-3 shadow-sm"
                    whileHover={{ y: -3, scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 230, damping: 18 }}
                  >
                    <p
                      className={`text-lg md:text-xl font-semibold ${metric.color}`}
                    >
                      {metric.value}
                    </p>
                    <p className="text-slate-500 mt-1">{metric.label}</p>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* CALL TO ACTION */}
        <section className="bg-slate-50 border-t border-slate-200/80">
          <motion.div
            className="max-w-6xl mx-auto px-4 py-10 md:py-12"
            {...fadeUp(0.05)}
          >
            <motion.div
              className="rounded-2xl border border-slate-200 bg-white/90 p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-5 shadow-md shadow-slate-200/60"
              whileHover={{
                boxShadow: "0 12px 40px rgba(148, 163, 184, 0.30)",
              }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              <div>
                <p className="text-[11px] uppercase tracking-[0.25em] text-emerald-600/90 mb-2">
                  Work with AegisFlow
                </p>
                <h2 className="text-xl md:text-2xl font-semibold text-slate-900">
                  Turning complex spaces into clear, manageable systems.
                </h2>
                <p className="mt-2 text-xs md:text-[13px] text-slate-600 max-w-xl leading-relaxed">
                  If you&apos;re exploring how to modernize crowd management,
                  improve camera operations, or support your on-ground teams
                  with better tools, AegisFlow is built for that journey.
                </p>
              </div>
              <div className="flex gap-3 w-full md:w-auto">
                <Link
                  to="/contact"
                  className="flex-1 md:flex-none inline-flex items-center justify-center rounded-lg bg-emerald-500 px-4 py-2 text-xs font-medium text-white hover:bg-emerald-400 transition-colors"
                >
                  Talk to us
                </Link>
                <Link
                  to="/help"
                  className="flex-1 md:flex-none inline-flex items-center justify-center rounded-lg border border-slate-300 px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-100 hover:border-slate-400 transition-colors"
                >
                  Explore how it works
                </Link>
              </div>
            </motion.div>

            <div className="text-center mt-8 text-[11px] text-slate-500">
              © {currentYear} AegisFlow — Intelligent Crowd Management Platform.
              All rights reserved.
            </div>
          </motion.div>
        </section>
      </div>
    </>
  );
};

export default AboutPage;
