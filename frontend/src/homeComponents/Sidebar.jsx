import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="sidebar flex justify-center items-center text-2xl bg-blue-200 p-6">
      <ul>
        <li>
          <Link to="/home">Home</Link>
        </li>
        <li>
          <Link to="/main">Main</Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
