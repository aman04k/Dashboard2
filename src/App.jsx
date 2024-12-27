import { useState } from "react";
import "./App.css";
import Dashboard from "./components/Dashboard";
import Calendar from "./functionality/Calendar";
import Events from "./functionality/Events";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  // Shared state to manage events
  const [events, setEvents] = useState([]);

  // Function to add a new event
  const handleAddEvent = (newEvent) => {
    setEvents((prevEvents) => [...prevEvents, newEvent]);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        {/* Pass handleAddEvent and events to Calendar */}
        <Route
          path="/calendar"
          element={<Calendar onAddEvent={handleAddEvent} events={events} />}
        />
        {/* Pass events to Events */}
        <Route path="/events" element={<Events events={events} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
