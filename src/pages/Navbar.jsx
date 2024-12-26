import React, { useState } from "react";
import { PiFlowerFill } from "react-icons/pi";
import "../Styles/Navbar.css";

function Navbar() {
  const [activeTab, setActiveTab] = useState("Dashboard");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <span className="logo-icon"><PiFlowerFill /></span>
      </div>

      <button className="navbar-toggle" onClick={toggleMenu}>
        ☰
      </button>

      <ul className={`navbar-menu ${isMenuOpen ? "open" : ""}`}>
        <li
          className={`menu-item ${activeTab === "Dashboard" ? "active" : ""}`}
          onClick={() => setActiveTab("Dashboard")}
        >
          Dashboard
        </li>
        <li
          className={`menu-item ${activeTab === "Calendar" ? "active" : ""}`}
          onClick={() => setActiveTab("Calendar")}
        >
          Calendar
        </li>
        <li
          className={`menu-item ${activeTab === "Projects" ? "active" : ""}`}
          onClick={() => setActiveTab("Projects")}
        >
          Projects
        </li>
        <li
          className={`menu-item ${activeTab === "Team" ? "active" : ""}`}
          onClick={() => setActiveTab("Team")}
        >
          Team
        </li>
        <li
          className={`menu-item ${activeTab === "Documents" ? "active" : ""}`}
          onClick={() => setActiveTab("Documents")}
        >
          Documents
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
