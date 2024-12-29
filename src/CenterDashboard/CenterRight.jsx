import React from "react";
import "../Styles/CenterRight.css";
import MatchGraph from "../CenterDashboard/MatchGraph.jsx";
import { FaArrowRight } from "react-icons/fa";
import { RiAdminLine } from "react-icons/ri";
import { IoVideocam } from "react-icons/io5";
import "../Styles/TeamTracker.css";

const TeamTracker = () => {
  const totalMembers = 120;
  const teamData = [
    { role: "Designer", count: 48, color: "#5DB075" },
    { role: "Developer", count: 27, color: "#3D75B0" },
    { role: "Project manager", count: 18, color: "#B0B0B0" },
  ];

  const totalCount = teamData.reduce((acc, data) => acc + data.count, 0);
  let currentAngle = 0;

  return (
    <div className="team-tracker-container">
      <header className="team-tracker-header">
        <span>Total employees</span>
        <button className="team-tracker-btn">
          <FaArrowRight />
        </button>
      </header>

      <h2 className="team-tracker-title">Track your team</h2>

      <div className="team-tracker-chart">
        <div className="team-tracker-arc">
          {teamData.map((data, index) => {
            const percentage = (data.count / totalCount) * 100;
            const angle = (percentage / 100) * 360;

            const segmentStyle = {
              backgroundColor: data.color,
              transform: `rotate(${currentAngle}deg)`,
              zIndex: teamData.length - index,
              clipPath: "polygon(50% 50%, 0 0, 100% 0)",
              transformOrigin: "100% 50%",
            };

            currentAngle += angle;

            return (
              <div
                key={index}
                className="team-tracker-arc-segment"
                style={segmentStyle}
              ></div>
            );
          })}
        </div>
        <div className="team-tracker-center">
          <p className="team-tracker-total">{totalMembers}</p>
          <span className="team-tracker-label">Total members</span>
        </div>
      </div>

      <ul className="team-tracker-legend">
        {teamData.map((data, index) => (
          <li key={index} className="team-tracker-legend-item">
            <span
              className="team-tracker-legend-color"
              style={{ backgroundColor: data.color }}
            ></span>
            {data.role} - {data.count} members
          </li>
        ))}
      </ul>
    </div>
  );
};

const CenterRight = () => {
  return (
    <div className="center-side">
      <div className="hours-chart">
        <div className="chart-container-center">
          <div className="avg-hours">
            <div className="avg-hours-header">
              <h1>46.5</h1>
              <span className="percentage">+0.5%</span>
            </div>
            <p>avg hours / week</p>
          </div>
          <div className="hours-dots">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="dot"></div>
            ))}
          </div>
        </div>
        {/* <div className="extra-info">
          <div className="team-info">
            <div className="team-percentage">
              <div className="admin-icon">
                <RiAdminLine />
              </div>
              <h2>2.3%</h2>
            </div>
            <div className="team-type">
              <span>
                <b>80%</b> Onsite team
              </span>
              <span>
                <b>20%</b> Remote team
              </span>
            </div>
          </div>
        </div> */}


<div className="team-stats-container">
      {/* Onsite Team */}
      <div className="team-card onsite-team">
        <div className="team-header">
          <div className="team-icon">
            <span role="img" aria-label="onsite-icon">
              👤
            </span>
          </div>
          <div className="team-change">
            <span className="change-value positive">+2.6%</span>
            <span className="change-icon down">⬇️</span>
          </div>
        </div>
        <div className="team-percentage">
        <div className="team-percentage">80%</div>
        <div className="team-label">Onsite team</div>
        </div>
        
      </div>

      {/* Remote Team */}
      <div className="team-card remote-team">
        <div className="team-header">
          <div className="team-icon">
            <span role="img" aria-label="remote-icon">
              🌐
            </span>
          </div>
          <div className="team-change">
            <span className="change-value positive">+2.6%</span>
            <span className="change-icon up">⬆️</span>
          </div>
        </div>
        <div className="team-percentage">
          <div className="team-percentage">20%</div>
          <div className="team-label">Remote team</div>
        </div>
      </div>
    </div>



      </div>

      <div className="grafh-container">
        <TeamTracker />
        <div className="hiring-statistics">
          <h3>Talent recruitment</h3>
          <div className="talent-profiles">
            <img
              src="https://th.bing.com/th/id/OIP.PpYMOa5o6qERDYS_c1avxgHaEK?rs=1&pid=ImgDetMain"
              alt="Talent"
            />
            <img
              src="https://img.onmanorama.com/content/dam/mm/en/web-stories/sports/images/2023/5/24/msd3.jpg"
              alt="Talent"
            />
            <div className="join-call-btn">
              <span className="join-call-icon">
                <IoVideocam />
              </span>
              <button> Join Call</button>
            </div>
          </div>
          <div className="talent-summary">
            <p>T20 Talent</p>
            <p>80 Talent</p>
          </div>
          <MatchGraph />
        </div>
      </div>
    </div>
  );
};

export default CenterRight;
