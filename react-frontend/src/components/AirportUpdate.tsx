import {
  Button,
  Card,
  CardActions,
  CardContent,
  CircularProgress,
  Container,
  IconButton,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import axios from "axios";

import { Airport } from "../models/Airport";
import { BACKEND_API_URL } from "../constants";

export const AirportUpdate = () => {
  const navigate = useNavigate();
  const { airportId } = useParams();

  const [loading, setLoading] = useState(true);
  const [airport, setAirport] = useState({
    name: "",
    city: "",
    country: "",
    timezone: "",
    elevation: 0,
    capacity: 0,
    noGates: 0,
    noTerminals: 0,
  });

  useEffect(() => {
    const fetchAirport = async () => {
      const response = await fetch(
        `${BACKEND_API_URL}/update-airport/${airportId}/`
      );
      const airport = await response.json();
      setAirport({
        name: airport.name,
        city: airport.city,
        country: airport.country,
        timezone: airport.timezone,
        elevation: airport.elevation,
        capacity: airport.capacity,
        noGates: airport.noGates,
        noTerminals: airport.noTerminals,
      });
      setLoading(false);
      console.log(airport);
    };
    fetchAirport();
  }, [airportId]);

  const updateAirport = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    try {
      await axios.post(
        `${BACKEND_API_URL}/update-airport/${airportId}/`,
        airport
      );
      navigate(`/list-airport/`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container>
      <Card>
        <CardContent>
          <IconButton component={Link} sx={{ mr: 3 }} to={`/list-airport`}>
            <ArrowBackIcon />
          </IconButton>{" "}
          <form onSubmit={updateAirport}>
            <TextField
              id="name"
              label="Airport name"
              variant="outlined"
              fullWidth
              sx={{ mb: 2 }}
              onChange={(event) =>
                setAirport({ ...airport, name: event.target.value })
              }
            />
            <TextField
              id="city"
              label="City name"
              variant="outlined"
              fullWidth
              sx={{ mb: 2 }}
              onChange={(event) =>
                setAirport({ ...airport, city: event.target.value })
              }
            />

            <TextField
              id="country"
              label="Country name"
              variant="outlined"
              fullWidth
              sx={{ mb: 2 }}
              onChange={(event) =>
                setAirport({ ...airport, country: event.target.value })
              }
            />

            <TextField
              id="timezone"
              label="Airport timezone"
              variant="outlined"
              fullWidth
              sx={{ mb: 2 }}
              onChange={(event) =>
                setAirport({ ...airport, timezone: event.target.value })
              }
            />

            <TextField
              id="elevation"
              label="Airport elevation "
              variant="outlined"
              fullWidth
              sx={{ mb: 2 }}
              onChange={(event) =>
                setAirport({
                  ...airport,
                  elevation: Number(event.target.value),
                })
              }
            />

            <TextField
              id="capacity"
              label="Airport capacity"
              variant="outlined"
              fullWidth
              sx={{ mb: 2 }}
              onChange={(event) =>
                setAirport({ ...airport, capacity: Number(event.target.value) })
              }
            />

            <TextField
              id="noGates"
              label="Number of Gates"
              variant="outlined"
              fullWidth
              sx={{ mb: 2 }}
              onChange={(event) =>
                setAirport({ ...airport, noGates: Number(event.target.value) })
              }
            />
            <TextField
              id="noTerminals"
              label="Number of Terminals"
              variant="outlined"
              fullWidth
              sx={{ mb: 2 }}
              onChange={(event) =>
                setAirport({
                  ...airport,
                  noTerminals: Number(event.target.value),
                })
              }
            />

            <Button type="submit">Update Airport</Button>
          </form>
        </CardContent>
        <CardActions></CardActions>
      </Card>
    </Container>
  );
};
