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
import { AircraftDetail } from "./components/aircraft/AircraftDetail";
import { AircraftUpdate } from "./components/aircraft/AircraftUpdate";
import { AircraftCreate } from "./components/aircraft/AircraftCreate";
import { AircraftShowAll } from "./components/aircraft/AircraftShowAll";
import { AircraftDelete } from "./components/aircraft/AircraftDelete";
import { FlightShowAll } from "./components/flight/FlightShowAll";
import { FlightCreate } from "./components/flight/FlightCreate";
import { FlightDelete } from "./components/flight/FlightDelete";
import { FlightUpdate } from "./components/flight/FlightUpdate";
import { FlightDetail } from "./components/flight/FlightDetail";
import { PassengerShowAll } from "./components/passenger/PassengerShowAll";
import { PassengerCreate } from "./components/passenger/PassengerCreate";
import { PassengerDelete } from "./components/passenger/PassengerDelete";
import { PassengerUpdate } from "./components/passenger/PassengerUpdate";
import { PassengerDetail } from "./components/passenger/PassengerDetail";
import { TicketShowAll } from "./components/ticket/TicketShowAll";
import { TicketCreate } from "./components/ticket/TicketCreate";
import { TicketUpdate } from "./components/ticket/TicketUpdate";
import { TicketDetail } from "./components/ticket/TicketDetail";
import { TicketDelete } from "./components/ticket/TicketDelete";
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


          <Route path="/list-aircraft/" element={<AircraftShowAll />} />
          <Route path="/create-aircraft/" element={<AircraftCreate />} />
          <Route
            path="/delete-aircraft/:aircraftId"
            element={<AircraftDelete />}
          />
          <Route path="update-aircraft/:aircraftId" element={<AircraftUpdate />} />
          <Route path="read-aircraft/:aircraftId" element={<AircraftDetail />} />


          <Route path="/list-flight/" element={<FlightShowAll />} />
          <Route path="/create-flight/" element={<FlightCreate />} />
          <Route
            path="/delete-flight/:flightId"
            element={<FlightDelete />}
          />
          <Route path="update-flight/:flightId" element={<FlightUpdate />} />
          <Route path="read-flight/:flightId" element={<FlightDetail />} />



          <Route path="/list-passenger/" element={<PassengerShowAll />} />
          <Route path="/create-passenger/" element={<PassengerCreate />} />
          <Route
            path="/delete-passenger/:passengerId"
            element={<PassengerDelete />}
          />
          <Route path="update-passenger/:passengerId" element={<PassengerUpdate />} />
          <Route path="read-passenger/:passengerId" element={<PassengerDetail />} />

          <Route path="/list-ticket/" element={<TicketShowAll />} />
          <Route path="/create-ticket/" element={<TicketCreate />} />
          <Route
            path="/delete-ticket/:ticketId"
            element={<TicketDelete />}
          />
          <Route path="update-ticket/:ticketId" element={<TicketUpdate />} />
          <Route path="read-ticket/:ticketId" element={<TicketDetail />} />

        </Routes>
      </Router>
    </React.Fragment>
  );
}

export default App;
