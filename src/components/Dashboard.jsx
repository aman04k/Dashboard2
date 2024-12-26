import React from 'react';
import '../Styles/Dashboard.css';
import LeftSlide from '../components/LeftSlide.jsx';
import RightSlide from '../components/RightSlide.jsx';

function Dashboard() {
  return (
    <div className="dashboard-container">
      <div className="left-section">
        <LeftSlide />
      </div>
      <div className="right-section">
        <RightSlide />
      </div>
    </div>
  );
}

export default Dashboard;
