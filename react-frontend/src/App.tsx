import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AirportShowAll } from "./components/airport/AirportShowAll";
import { AppMenu } from "./components/AppMenu";
import { AppHome } from "./components/AppHome";
import { AirportCreate } from "./components/airport/AirportCreate";
import { AirportDelete } from "./components/airport/AirportDelete";
import { AirportUpdate } from "./components/airport/AirportUpdate";
import { AirlineRevenueStatistics } from "./components/statistics/AirlineRevenueStatistics";
import { AirportDetail } from "./components/airport/AirportDetail";
import { AirlineShowAll } from "./components/airline/AirlineShowAll";
import { AirlineCreate } from "./components/airline/AirlineCreate";
import { AirlineDelete } from "./components/airline/AirlineDelete";
import { AirlineUpdate } from "./components/airline/AirlineUpdate";
import { AirlineDetail } from "./components/airline/AirlineDetail";
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
          <Route path="read-airport/:airportId" element={<AirportDetail />} />
          <Route path="/airline-stats/" element={< AirlineRevenueStatistics/>} />


          <Route path="/list-airline/" element={<AirlineShowAll />} />
          <Route path="/create-airline/" element={<AirlineCreate />} />
          <Route
            path="/delete-airline/:airlineId"
            element={<AirlineDelete />}
          />
          <Route path="update-airline/:airlineId" element={<AirlineUpdate />} />
          <Route path="read-airline/:airlineId" element={<AirlineDetail />} />
        </Routes>
      </Router>
    </React.Fragment>
  );
}

export default App;
