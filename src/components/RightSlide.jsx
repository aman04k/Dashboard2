import React from "react";
import "../Styles/RightSlide.css";
import { MdNotifications } from "react-icons/md";
import { MdMail } from "react-icons/md";
import { AiOutlineFile } from "react-icons/ai";
import { FaRegCreditCard } from "react-icons/fa";

function RightSlide() {
  const salaryData = [
    {
      name: "Syafaniah San",
      amount: "$2,540.00",
      date: "Today",
      status: "Waiting",
      image:
        "https://th.bing.com/th?id=OIP.YEDuC6ywRWcqLDgL5MZ7RAHaQD&w=161&h=350&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2",
    },
    {
      name: "Devon Lane",
      amount: "$2,540.00",
      date: "Today",
      status: "Done",
      image: "https://wallpapercave.com/wp/wp7479342.jpg",
    },
    {
      name: "Marvin McKinney",
      amount: "$2,540.00",
      date: "Yesterday",
      status: "Done",
      image: "https://wallpapercave.com/wp/wp4857059.jpg",
    },
    {
      name: "Devon Lane",
      amount: "$2,540.00",
      date: "Yesterday",
      status: "Done",
      image: "https://wallpapercave.com/wp/wp4338796.jpg",
    },
    {
      name: "Eleanor Pena",
      amount: "$2,540.00",
      date: "Yesterday",
      status: "Failed",
      image: "https://wallpapercave.com/wp/wp4338791.jpg",
    },
  ];

  return (
    <div className="salary-incentive-container">
      <div className="header">
        <input type="text" placeholder="Search..." className="search-bar" />
        <div className="icons">
          <i className="icon bell-icon">
            <MdNotifications />
          </i>
          <i className="icon message-icon">
            <MdMail />
          </i>
          <img
            src="https://th.bing.com/th/id/OIP.PpYMOa5o6qERDYS_c1avxgHaEK?w=273&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7"
            alt="Profile"
            className="profile-pic"
          />
        </div>
      </div>

      <div className="salary-section">
        <h2>Payout monthly</h2>
        <h3>Salaries and Incentive</h3>

        <div className="salary-list">
          {salaryData.map((item, index) => (
            <div
              key={index}
              className={`salary-item ${
                item.status === "Waiting"
                  ? "waiting"
                  : item.status === "Done"
                  ? "done"
                  : "failed"
              }`}
            >
              <div className="avatar">
                <img src={item.image} alt={item.name} className="avatar-img" />
              </div>
              <div className="details">
                <h4>{item.name}</h4>
                <p>{item.amount}</p>
                <p>{item.date}</p>
              </div>
              <div className={`status ${item.status.toLowerCase()}`}>
                {item.status}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="card">
        <div className="section basic-salary">
          <span>Basic salary</span>
          <span>$2,040</span>
        </div>
        <div className="performance-section">
          <div className="section performance">
            <span>Perform</span>
            <span>$300</span>
          </div>
          <div className="payment">Payment</div>
        </div>
        <div className="section-bonus">
          <div className="section gift">
            <span>Gift</span>
            <span>$200</span>
          </div>
          <p>100%</p>
        </div>
        <div className="payment-section">
          <div className="take-home">Take home pay</div>
        </div>
        <div className="icons">
          <div className="icon1"><AiOutlineFile/></div>
          <div className="icon2"><FaRegCreditCard/></div>
          <div className="icon-salary">$2,540.00</div>
        </div>
      </div>
    </div>
  );
}

export default RightSlide;
