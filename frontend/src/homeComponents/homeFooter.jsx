import React from "react";

const Footer = () => {
  return (
    <footer className="bg-blue-900 text-white py-8 mt-6 flex flex-col sm:flex-row justify-around items-center gap-4">
      <p>© 2025 AegisFlow. All rights reserved.</p>
      <div className="flex gap-6">
        <button className="hover:text-yellow-300 transition-colors">
          Help
        </button>
        <button className="hover:text-yellow-300 transition-colors">
          Contact
        </button>
        <button className="hover:text-yellow-300 transition-colors">
          Privacy
        </button>
      </div>
    </footer>
  );
};

export default Footer;
