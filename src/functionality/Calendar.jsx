import React, { useState, useEffect } from "react";
import CalendarView from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "../functionality/Calendar.css";
import Navbar from "../pages/Navbar";

const Calendar = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [eventName, setEventName] = useState("");
  const [events, setEvents] = useState([]);
  const [timers, setTimers] = useState({});
  const [showPopup, setShowPopup] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  // Handle date selection
  const handleDateClick = (date) => {
    const today = new Date();
    if (date < new Date(today.setHours(0, 0, 0, 0))) {
      alert("You cannot select past dates.");
      return;
    }
    setSelectedDate(date);
    setShowPopup(true);
  };

  // Add an event
  const handleAddEvent = () => {
    if (!eventName) {
      alert("Please enter an event name.");
      return;
    }

    const localDate = selectedDate.toLocaleDateString("en-CA");
    const currentDate = new Date().toLocaleDateString("en-CA");

    if (localDate < currentDate) {
     
     return;
    }

    const newEvent = { date: localDate, name: eventName };

    // Add the event to the list
    setEvents((prevEvents) => [...prevEvents, newEvent]);
    setEventName("");
    setShowPopup(false);
    setSuccessMessage("Event added successfully!");

    // Hide the success message after 2 seconds
    setTimeout(() => {
      setSuccessMessage("");
    }, 2000);
    alert("Event added successfully!");
  };

  // Update timers for all events
  useEffect(() => {
    const interval = setInterval(() => {
      const updatedTimers = {};

      events.forEach((event) => {
        const eventTime = new Date(`${event.date}T23:59:59`).getTime();
        const now = new Date().getTime();
        const timeDiff = eventTime - now;

        if (timeDiff <= 0) {
          updatedTimers[event.date] = "00h 00m 00s remaining";
        } else {
          const day = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
          const hours = Math.floor((timeDiff / (1000 * 60 * 60)) % 24);
          const minutes = Math.floor((timeDiff / (1000 * 60)) % 60);
          const seconds = Math.floor((timeDiff / 1000) % 60);

          updatedTimers[event.date] = `${day}d ${hours
            .toString()
            .padStart(2, "0")}h ${minutes
            .toString()
            .padStart(2, "0")}m ${seconds
            .toString()
            .padStart(2, "0")}s remaining`;
        }
      });

      setTimers(updatedTimers);
    }, 1000);

    return () => clearInterval(interval); 
  }, [events]);

  // Highlight dates with events
  const highlightEventDates = ({ date }) => {
    const formattedDate = date.toLocaleDateString("en-CA");
    return events.some((event) => event.date === formattedDate)
      ? "highlighted-date"
      : null;
  };

  // Display event names on the calendar
  const renderTileContent = ({ date }) => {
    const formattedDate = date.toLocaleDateString("en-CA");
    const event = events.find((event) => event.date === formattedDate);
    return event ? (
      <div className="event-indicator">
        <span className="event-name">{event.name}</span>
      </div>
    ) : null;
  };

  return (
    <div>
      <Navbar />

      <div className="calendar-container">
        <h1 className="calendar-title">Event Countdown Calendar</h1>

        {/* Calendar view */}
        <div className="calendar-view">
          <CalendarView
            className="react-calendar"
            onClickDay={handleDateClick}
            tileClassName={highlightEventDates}
            tileContent={renderTileContent}
            tileDisabled={({ date }) => {
              const today = new Date();
              return date < new Date(today.setHours(0, 0, 0, 0));
            }}
          />
        </div>

        {/* Events list */}
        <div className="events-list">
          <h2>Upcoming Events</h2>
          <ul>
            {events
              .sort((a, b) => new Date(a.date) - new Date(b.date)) 
              .map((event, index) => (
                <li key={index} className="event-item">
                  <strong>{event.name}</strong> - {new Date(event.date).toDateString()}
                  <br />
                  {timers[event.date] || "Loading countdown..."}
                </li>
              ))}
          </ul>
        </div>

        {/* Popup for adding an event */}
        {showPopup && (
          <div className="popup-overlay">
            <div className="popup-content">
              <h2>Add Event</h2>
              <p>Selected Date: {selectedDate.toDateString()}</p>
              <input
                type="text"
                placeholder="Event Name"
                value={eventName}
                onChange={(e) => setEventName(e.target.value)}
                className="name-input"
              />
              <div className="popup-actions">
                <button onClick={handleAddEvent} className="add-event-btn">
                  Add Event
                </button>
                <button
                  onClick={() => setShowPopup(false)}
                  className="cancel-btn"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Success message popup */}
        {successMessage && (
          <div className="success-popup">
            <p>{successMessage}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Calendar;
