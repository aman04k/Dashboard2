import { useState } from "react";
import "./App.css";
import Dashboard from "./components/Dashboard";
import Calendar from "./functionality/Calendar";
import Events from "./functionality/Events";
import Team from "./functionality/Team";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  // Shared state to manage events
  const [events, setEvents] = useState([]);

  // Function to add a new event
  const handleAddEvent = (newEvent) => {
    setEvents((prevEvents) => [...prevEvents, newEvent]);
  };

  //Shared state to manage form visibility or using the context api and show the data one to onther componet



  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route
          path="/calendar"
          element={<Calendar onAddEvent={handleAddEvent} events={events} />}
        />
        <Route path="/events" element={<Events events={events} />} />
        <Route path="/team" element={<Team />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
