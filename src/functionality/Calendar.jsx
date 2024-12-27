import React, { useState } from "react";
import CalendarView from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "../functionality/Calendar.css";
import Navbar from "../pages/Navbar";
import { Navigate } from "react-router-dom";

const Calendar = ({ onAddEvent, events }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [eventName, setEventName] = useState("");
  const [description, setDescription] = useState(""); // State for description
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [errorMessages, setErrorMessages] = useState({});
  const [showPopup, setShowPopup] = useState(false);
  const [redirectToEvents, setRedirectToEvents] = useState(false); // State for redirection

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
    if (!eventName.trim()) errors.eventName = "Event name is required.";
    if (!description.trim()) errors.description = "Description is required."; // Description validation
    if (!startTime) errors.startTime = "Start time is required.";
    if (!endTime) errors.endTime = "End time is required.";
    if (startTime && endTime && endTime <= startTime) {
      errors.timeValidation = "End time must be greater than start time.";
    }

    setErrorMessages(errors);
    if (Object.keys(errors).length > 0) return;

    const newEvent = {
      date: selectedDate.toLocaleDateString("en-CA"),
      name: eventName,
      description, // Include description
      startTime,
      endTime,
    };

    onAddEvent(newEvent);
    setEventName("");
    setDescription(""); // Clear description
    setStartTime("");
    setEndTime("");
    setShowPopup(false);

    alert("Event added successfully!");
    setRedirectToEvents(true); // Set redirect state to true
  };

  const handleCancel = () => {
    setShowPopup(false);
    setEventName("");
    setDescription(""); // Clear description
    setStartTime("");
    setEndTime("");
    setErrorMessages({});
  };

  if (redirectToEvents) {
    return <Navigate to="/Events" />; // Redirect to the events page
  }

  return (
    <div>
      <Navbar />
      <h1 className="calendar-title">Event Calendar</h1>
      <div className="calendar-container">
        <CalendarView
          onClickDay={handleDateClick}
          tileDisabled={({ date }) => date < new Date().setHours(0, 0, 0, 0)}
        />
      </div>
      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-content">
            <h2>Add Event</h2>
            <p>Selected Date: {selectedDate?.toDateString()}</p>
            <input
              type="text"
              placeholder="Event Name"
              value={eventName}
              onChange={(e) => setEventName(e.target.value)}
            />
            {errorMessages.eventName && (
              <p className="error-message">{errorMessages.eventName}</p>
            )}
            <textarea
              placeholder="Event Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
            {errorMessages.description && (
              <p className="error-message">{errorMessages.description}</p>
            )}
            <div className="time-inputs">
              <label className="start-label" htmlFor="startTime">
                Start Time:
              </label>
              <input
                id="startTime"
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
              />
              {errorMessages.startTime && (
                <p className="error-message">{errorMessages.startTime}</p>
              )}
            </div>
            <div className="time-inputs">
              <label className="end-label" htmlFor="endTime">
                End Time:
              </label>
              <input
                id="endTime"
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
              />
              {errorMessages.endTime && (
                <p className="error-message">{errorMessages.endTime}</p>
              )}
              {errorMessages.timeValidation && (
                <p className="error-message">{errorMessages.timeValidation}</p>
              )}
            </div>
            <div className="popup-actions">
              <button className="add-event-btn" onClick={handleAddEvent}>
                Add Event
              </button>
              <button className="cancel-btn" onClick={handleCancel}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Calendar;
