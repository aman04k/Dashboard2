import React, { useEffect, useState } from "react";
import Navbar from "../pages/Navbar";
import "../functionality/Events.css";

function Events({ events }) {
  const [categorizedEvents, setCategorizedEvents] = useState({
    all: [],
    ongoing: [],
    future: [],
    closed: [],
  });

  const [countdowns, setCountdowns] = useState({});

  // Categorize events into all, ongoing, future, and closed
  const categorizeEvents = () => {
    const now = new Date();

    const all = [...events];
    const ongoing = events.filter((event) => {
      const startDateTime = new Date(`${event.date}T${event.startTime}`);
      const endDateTime = new Date(`${event.date}T${event.endTime}`);
      return now >= startDateTime && now <= endDateTime;
    });
    const future = events.filter((event) => {
      const startDateTime = new Date(`${event.date}T${event.startTime}`);
      return now < startDateTime;
    });
    const closed = events.filter((event) => {
      const endDateTime = new Date(`${event.date}T${event.endTime}`);
      return now > endDateTime;
    });

    setCategorizedEvents({ all, ongoing, future, closed });
  };

  useEffect(() => {
    categorizeEvents();

    // Re-categorize events every second
    const interval = setInterval(categorizeEvents, 1000);
    return () => clearInterval(interval);
  }, [events]);

  useEffect(() => {
    // Update countdowns
    const interval = setInterval(() => {
      const now = new Date();
      const updatedCountdowns = {};

      events.forEach((event) => {
        const startDateTime = new Date(`${event.date}T${event.startTime}`);
        const endDateTime = new Date(`${event.date}T${event.endTime}`);
        let timeLeft;

        if (now < startDateTime) {
          
          timeLeft = startDateTime - now;
        } else if (now >= startDateTime && now <= endDateTime) {
          timeLeft = endDateTime - now;
        } else {
          timeLeft = null;
        }

        if (timeLeft > 0) {
          const day = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
          const hours = Math.floor((timeLeft / (1000 * 60 * 60)) % 24);
          const minutes = Math.floor((timeLeft / (1000 * 60)) % 60);
          const seconds = Math.floor((timeLeft / 1000) % 60);


          updatedCountdowns[event.name] = `${day}d  ${hours}h ${minutes}m ${seconds}s`;
        } else {
          updatedCountdowns[event.name] = null;
        }
      });

      setCountdowns(updatedCountdowns);
    }, 1000);

    return () => clearInterval(interval);
  }, [events]);

  const renderEventList = (title, eventList) => (
    <div>
      <h2>{title}</h2>
      {eventList.length > 0 ? (
        <ul>
          {eventList.map((event, index) => (
            <li key={index}>
              <strong>{event.name}</strong> - {new Date(event.date).toDateString()}{" "}
              ({event.startTime} to {event.endTime})
              <div>
                {countdowns[event.name] !== null
                  ? `Countdown: ${countdowns[event.name] || "Loading..."}`
                  : title === "Closed Events"
                  ? "Event Ended"
                  : ""}
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No {title.toLowerCase()}.</p>
      )}
    </div>
  );

  return (
    <div>
      <Navbar />
      <div className="allEvents">
        {renderEventList("All Events", categorizedEvents.all)}
        {renderEventList("Ongoing Events", categorizedEvents.ongoing)}
        {renderEventList("Future Events", categorizedEvents.future)}
        {renderEventList("Closed Events", categorizedEvents.closed)}
      </div>
    </div>
  );
}

export default Events;
