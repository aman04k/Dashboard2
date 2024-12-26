import React from "react";
import CenterRight from "../CenterDashboard/CenterRight.jsx";
import CenterLeft from "../CenterDashboard/CenterLeft.jsx";
import "../Styles/CenterDashboard.css";

function CenterDashboard() {
  return (
    <div className="center-dashboard">
      <div className="center-left-dashboard">
        <CenterLeft />
      </div>
      <div className="center-right-dashboard">
        <CenterRight />
      </div>
    </div>
  );
}

export default CenterDashboard;
