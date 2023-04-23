import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  CircularProgress,
  Container,
  IconButton,
  Tooltip,
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AirlineRevenue } from "../../models/AirlineRevenue";
import { BACKEND_API_URL } from "../../constants";

export const AirlineRevenueStatistics = () => {
  const [loading, setLoading] = useState(true);
  const [airlineRevenues, setAirlineRevenue] = useState([]);

  useEffect(() => {
    fetch(`${BACKEND_API_URL}/airline-stats/`)
      .then((response) => response.json())
      .then((data) => {
        setAirlineRevenue(data);
        setLoading(false);
      });
  }, []);

  console.log(airlineRevenues);

  return (
    <Container>
      <h1>Top 3 Airlines sorted by their anual revenue</h1>
      {loading && <CircularProgress />}

      {!loading && airlineRevenues.length == 0 && <div>NO Airlines found!</div>}

      {!loading && airlineRevenues.length > 0 && (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 900 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>#</TableCell>
                <TableCell align="center">Airline Name</TableCell>
                <TableCell align="center">Anual Revenue</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {airlineRevenues.map((airline_revenue: AirlineRevenue, index) => (
                <TableRow key={airline_revenue.id}>
                  <TableCell component="th" scope="row">
                    {index + 1}
                  </TableCell>
                  <TableCell align="center">
                    {airline_revenue.airline_name}
                  </TableCell>
                  <TableCell align="center">
                    {airline_revenue.revenue}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Container>
  );
};
