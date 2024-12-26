import React from "react";
import { FaPhoneAlt } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";
import "../Styles/CenterLeft.css";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const CenterLeft = () => {
  const events = [
    { name: "Team Meeting", date: "2024-12-25" },
    { name: "Project Deadline", date: "2024-12-31" },
  ];

  const data = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri"],
    datasets: [
      {
        label: "Hours",
        data: [6, 8, 8, 10, 10],
        fill: false,
        borderColor: "#007bff",
        tension: 0.1,
      },
    ],
  };

  return (
    <div className="user-stats-container">
      <div className="profile-card">
        <div className="profile-info">
          <div className="experience-badge">4+ years experience</div>
        </div>
        <div className="profile-actions">
          <div>
            <h3>Chris Jonathan</h3>
            <p>General Manager</p>
          </div>
          <div>
            <button className="call-btn">
              <FaPhoneAlt />
            </button>
            <button className="email-btn">
              <IoMdMail />
            </button>
          </div>
        </div>
      </div>

      <div className="work-stats">
        <div className="work-header">
          <h3>Average work time</h3>
          <span className="work-increase">+0.5%</span>
        </div>
        <h1>46 hours</h1>
        <div className="chart-container">
          <Line data={data} />
        </div>
        <p className="extra-info">Total work hours include extra hours</p>
      </div>
    </div>
  );
};

export default CenterLeft;
