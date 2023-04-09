import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AirportShowAll } from "./components/AirportShowAll";
import { AppMenu } from "./components/AppMenu";
import { AppHome } from "./components/AppHome";
import { AirportCreate } from "./components/AirportCreate";
import { AirportDelete } from "./components/AirportDelete";
import { AirportUpdate } from "./components/AirportUpdate";
import { AirlineRevenueStatistics } from "./components/AirlineRevenueStatistics";
function App() {
  const [count, setCount] = useState(0);

  return (
    <React.Fragment>
      <Router>
        <AppMenu />
        <Routes>
          <Route path="/home" element={<AppHome />} />
          <Route path="/list-airport/" element={<AirportShowAll />} />
          <Route path="/create-airport/" element={<AirportCreate />} />
          <Route
            path="/delete-airport/:airportId"
            element={<AirportDelete />}
          />
          <Route path="update-airport/:airportId" element={<AirportUpdate />} />
          <Route path="/airline-stats/" element={< AirlineRevenueStatistics/>} />
        </Routes>
      </Router>
    </React.Fragment>
  );
}

export default App;
