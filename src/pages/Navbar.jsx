import React, { useState } from "react";
import { PiFlowerFill } from "react-icons/pi";
import "../Styles/Navbar.css";
import { Link } from "react-router-dom";

function Navbar() {
  const [activeTab, setActiveTab] = useState("Dashboard");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  React.useEffect(() => {
    const path = location.pathname;
    if (path === "/") {
      setActiveTab("Dashboard");
    } else if (path === "/Calendar") {
    setActiveTab("Calendar");
    }
    else if (path === "/Events") {
      setActiveTab("Events");
    }
  }, [location]);

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

          <Link to="/">Dashboard</Link>
        </li>
        <li
          className={`menu-item ${activeTab === "Calendar" ? "active" : ""}`}
          onClick={() => setActiveTab("Calendar")} 
        >
          <Link to="/Calendar">Calendar</Link>

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
          className={`menu-item ${activeTab === "Events" ? "active" : ""}`}
          onClick={() => setActiveTab("Events")}
        >
          <Link to="/Events">Events</Link>
          
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
