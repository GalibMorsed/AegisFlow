import React, { useState } from "react";
import { FaInstagram, FaLinkedin, FaGithub } from "react-icons/fa";
import { Link } from "react-router-dom";

const BodyFooter = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return;

    console.log("Subscribed with:", email);
    setSubmitted(true);

    window.alert(
      "Thanks for subscribing! You will receive updates at " + email
    );
    setEmail("");

    setTimeout(() => setSubmitted(false), 8000);
  };

  const year = new Date().getFullYear();

  return (
    <footer className="bg-slate-950 text-slate-300 pt-12 pb-8 px-6 border-t border-slate-800">
      <div className="max-w-6xl mx-auto">
        {/* Newsletter Section */}
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-semibold text-white mb-3">
            Stay updated with <span className="text-blue-500">AegisFlow</span>
          </h2>
          <p className="text-slate-400 mb-6 max-w-2xl mx-auto text-sm">
            Get product updates, feature launches, and practical safety insights
            to make your spaces smarter and safer.
          </p>

          <div className="flex justify-center">
            {submitted ? (
              <div className="rounded-full bg-emerald-500/15 border border-emerald-500/70 text-emerald-200 px-6 py-3 text-xs sm:text-sm font-medium">
                Thanks for subscribing! 🎉
              </div>
            ) : (
              <form
                onSubmit={handleSubscribe}
                className="flex flex-col sm:flex-row items-center gap-3"
              >
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-72 sm:w-96 px-4 py-3 rounded-full bg-slate-900 border border-slate-700 text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                />
                <button
                  type="submit"
                  className="bg-blue-600 text-white font-semibold px-6 py-3 rounded-full text-sm hover:bg-blue-500 transition-all shadow-sm"
                >
                  Subscribe
                </button>
              </form>
            )}
          </div>
        </div>

        <hr className="border-slate-800 mb-8" />

        {/* Bottom Section */}
        <div className="flex flex-col sm:flex-row justify-between items-center text-xs sm:text-sm gap-6">
          {/* Left Side */}
          <div className="text-center sm:text-left">
            <h3 className="text-lg font-semibold text-white">AegisFlow</h3>
            <div className="flex justify-center sm:justify-start gap-5 mt-2">
              <Link
                to="/privacy"
                className="text-slate-400 hover:text-slate-100 transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                to="/about"
                className="text-slate-400 hover:text-slate-100 transition-colors"
              >
                About Us
              </Link>
            </div>
          </div>

          {/* Middle: Social Links */}
          <div className="flex justify-center gap-5 text-xl">
            <a
              href="#"
              className="text-slate-400 hover:text-blue-500 transition-colors"
              aria-label="Instagram"
            >
              <FaInstagram />
            </a>
            <a
              href="https://www.linkedin.com/in/galib-morsed"
              target="_blank"
              rel="noreferrer"
              className="text-slate-400 hover:text-blue-500 transition-colors"
              aria-label="LinkedIn"
            >
              <FaLinkedin />
            </a>
            <a
              href="https://github.com/GalibMorsed"
              target="_blank"
              rel="noreferrer"
              className="text-slate-400 hover:text-blue-500 transition-colors"
              aria-label="GitHub"
            >
              <FaGithub />
            </a>
          </div>

          {/* Right Side */}
          <div className="text-slate-500 text-center sm:text-right">
            <p>© {year} AegisFlow. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default BodyFooter;
