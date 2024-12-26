import React from "react";
import "../Styles/Header.css";
import { FaPlus } from "react-icons/fa";
import { FaCalendarAlt } from "react-icons/fa";

const Header = () => {
  return (
    <header>
      <div className="Header">
        <div className="breadcrumb">
          <span>Portal</span>
          <span className="separator">&gt;</span>
          <span>Dashboard</span>
        </div>

        <div className="actions">
          <button className="action-btn">
            <FaPlus className="icon" />
            Add widget
          </button>
          <button className="action-btn">
            <FaCalendarAlt className="icon" />
            18 - 22 November
          </button>
          <button className="add-report-btn">Add report</button>
        </div>
      </div>
      <span className="greeting">Good morning Jhon</span>
    </header>
  );
};

export default Header;
