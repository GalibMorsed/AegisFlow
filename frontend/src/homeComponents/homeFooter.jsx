import React from "react";
import { Link } from "react-router-dom";

const HomeFooter = () => {
  return (
    <footer className="bg-blue-900 text-blue-100 py-4 px-8 mt-auto text-sm">
      <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
        <p>&copy; {new Date().getFullYear()} AegisFlow. All rights reserved.</p>
        <div className="flex gap-6">
          <Link to="/" className="hover:text-white transition-colors">
            Help
          </Link>
          <Link to="/" className="hover:text-white transition-colors">
            Contact
          </Link>
          <Link to="/" className="hover:text-white transition-colors">
            Privacy
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default HomeFooter;
