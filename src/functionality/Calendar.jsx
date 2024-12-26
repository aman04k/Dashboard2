import React, { useState, useEffect } from "react";
import CalendarView from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "../functionality/Calendar.css";
import Navbar from "../pages/Navbar";

const Calendar = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [eventName, setEventName] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [events, setEvents] = useState([]);
  const [timers, setTimers] = useState({});
  const [showPopup, setShowPopup] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessages, setErrorMessages] = useState({});

  const handleDateClick = (date) => {
    const today = new Date();
    if (date < new Date(today.setHours(0, 0, 0, 0))) {
      alert("You cannot select past dates.");
      return;
    }
    setSelectedDate(date);
    setShowPopup(true);
    setErrorMessages({});
  };

  const handleAddEvent = () => {
    const errors = {};

    if (!eventName.trim()) {
      errors.eventName = "Event name is required.";
    }

    if (!startTime) {
      errors.startTime = "Start time is required.";
    }

    if (!endTime) {
      errors.endTime = "End time is required.";
    }

    if (startTime && endTime && endTime <= startTime) {
      errors.timeValidation = "End time must be greater than start time.";
    }

    setErrorMessages(errors);

    if (Object.keys(errors).length > 0) {
      return;
    }

    const localDate = selectedDate.toLocaleDateString("en-CA");

    const newEvent = {
      date: localDate,
      name: eventName,
      startTime: startTime,
      endTime: endTime,
    };

    setEvents((prevEvents) => [...prevEvents, newEvent]);
    setEventName("");
    setStartTime("");
    setEndTime("");
    setShowPopup(false);
    setSuccessMessage("Event added successfully!");

    setTimeout(() => {
      setSuccessMessage("");
    }, 2000);
    alert("Event added successfully!");
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const updatedTimers = {};

      events.forEach((event) => {
        const now = new Date();
        const startDateTime = new Date(`${event.date}T${event.startTime}`).getTime();
        const endDateTime = new Date(`${event.date}T${event.endTime}`).getTime();
        const currentTime = now.getTime();

        if (currentTime < startDateTime) {
          updatedTimers[event.date + event.startTime] = "Event not started yet";
        } else if (currentTime >= startDateTime && currentTime <= endDateTime) {
          const timeDiff = endDateTime - currentTime;

          const hours = Math.floor((timeDiff / (1000 * 60 * 60)) % 24);
          const minutes = Math.floor((timeDiff / (1000 * 60)) % 60);
          const seconds = Math.floor((timeDiff / 1000) % 60);

          updatedTimers[event.date + event.startTime] = `${hours
            .toString()
            .padStart(2, "0")}h ${minutes.toString().padStart(2, "0")}m ${seconds
            .toString()
            .padStart(2, "0")}s remaining`;
        } else {
          updatedTimers[event.date + event.startTime] = "Event ended";
        }
      });

      setTimers(updatedTimers);
    }, 1000);

    return () => clearInterval(interval);
  }, [events]);

  const renderEventTime = (date, time) => {
    const formattedTime = new Date(`${date}T${time}`).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    });
    return formattedTime;
  };

  const highlightEventDates = ({ date }) => {
    const formattedDate = date.toLocaleDateString("en-CA");
    return events.some((event) => event.date === formattedDate)
      ? "highlighted-date"
      : null;
  };

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

        <div className="events-list">
          <h2>Upcoming Events</h2>
          <ul>
            {events
              .sort((a, b) => new Date(a.date) - new Date(b.date))
              .map((event, index) => (
                <li key={index} className="event-item">
                  <strong>{event.name}</strong> - {new Date(event.date).toDateString()}
                  <br />
                  Time: {renderEventTime(event.date, event.startTime)} to{" "}
                  {renderEventTime(event.date, event.endTime)}
                  <br />
                  {timers[event.date + event.startTime] || "Loading countdown..."}
                </li>
              ))}
          </ul>
        </div>

        {showPopup && (
          <div className="popup-overlay">
            <div className="popup-content">
              <h2>Add Event</h2>
              <p>Selected Date: {selectedDate.toDateString()}</p>
              <input
                type="text"
                placeholder="Add the event name"
                value={eventName}
                onChange={(e) => setEventName(e.target.value)}
                className="name-input"
              />
              {errorMessages.eventName && (
                <p className="error-message">{errorMessages.eventName}</p>
              )}

              <textarea
                placeholder="Add the event description"
                className="description-input"
              ></textarea>

              <label className="start-label" htmlFor="start-time">
                Start Time
              </label>
              <input
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="time-input"
              />
              {errorMessages.startTime && (
                <p className="error-message">{errorMessages.startTime}</p>
              )}

              <label className="end-label" htmlFor="end-time">
                End Time
              </label>
              <input
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                className="time-input"
              />
              {errorMessages.endTime && (
                <p className="error-message">{errorMessages.endTime}</p>
              )}
              {errorMessages.timeValidation && (
                <p className="error-message">{errorMessages.timeValidation}</p>
              )}

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
