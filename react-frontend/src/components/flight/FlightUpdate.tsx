import {
  Autocomplete,
  Button,
  Card,
  CardActions,
  CardContent,
  CircularProgress,
  Container,
  IconButton,
  TextField,
} from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import axios from "axios";

import { Aircraft } from "../../models/Aircraft";
import { BACKEND_API_URL } from "../../constants";
import { debounce } from "lodash";
import { Airport } from "../../models/Airport";
import { Flight } from "../../models/Flight";

export const FlightUpdate = () => {
  const navigate = useNavigate();
  const { flightId } = useParams();

  const [loading, setLoading] = useState(true);
  const [flight, setFlight] = useState({
    departure_airport: 1,
    arrival_airport: 1,
    call_sign: "",
    departure_time: "",
    arrival_time: "",
    duration: 0,
    status: "",
    price: 0,
    seats_available: 0,
    operating_aircraft: 1,
  });
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [airports, setAirport] = useState<Airport[]>([]);
  const [aircrafts, setAircraft] = useState<Aircraft[]>([]);

  const fetchSuggestionsAirport = async (query: string) => {
    try {
      let url = `${BACKEND_API_URL}/airportOrderedName/${query}/?page=${page}&page_size=${pageSize}`;
      const response = await fetch(url);
      const { count, next, previous, results } = await response.json();
      setAirport(results);
      console.log(results);
    } catch (error) {
      console.error("Error fetching suggestions:", error);
    }
  };
  const fetchSuggestionsAircraft = async (query: string) => {
    try {
      let url = `${BACKEND_API_URL}/aircraftOrderedName/${query}/?page=${page}&page_size=${pageSize}`;
      const response = await fetch(url);
      const { count, next, previous, results } = await response.json();
      setAircraft(results);
      console.log(results);
    } catch (error) {
      console.error("Error fetching suggestions:", error);
    }
  };

  const debouncedFetchSuggestionsAirport = useCallback(
    debounce(fetchSuggestionsAirport, 500),
    []
  );
  const debouncedFetchSuggestionsAircraft = useCallback(
    debounce(fetchSuggestionsAircraft, 500),
    []
  );

  useEffect(() => {
    return () => {
      debouncedFetchSuggestionsAirport.cancel();
    };
  }, [debouncedFetchSuggestionsAirport]);

  useEffect(() => {
    return () => {
      debouncedFetchSuggestionsAircraft.cancel();
    };
  }, [debouncedFetchSuggestionsAircraft]);

  const handleInputChangeAirport = (event: any, value: any, reason: any) => {
    console.log("input", value, reason);
    if (reason === "input") {
      debouncedFetchSuggestionsAirport(value);
    }
  };
  const handleInputChangeAircraft = (event: any, value: any, reason: any) => {
    console.log("input", value, reason);
    if (reason === "input") {
      debouncedFetchSuggestionsAircraft(value);
    }
  };

  useEffect(() => {
    const fetchFlight = async () => {
      const response = await fetch(
        `${BACKEND_API_URL}/update-flight/${flightId}/`
      );
      const flight = await response.json();
      setFlight({
        departure_airport: flight.departure_airport,
        arrival_airport: flight.arrival_airport,
        call_sign: flight.call_sign,
        departure_time: flight.departure_time,
        arrival_time: flight.arrival_time,
        duration: flight.duration,
        status: flight.status,
        price: flight.price,
        seats_available: flight.seats_available,
        operating_aircraft: flight.operating_aircraft
      });
      setLoading(false);
      console.log(flight);
    };
    fetchFlight();
  }, [flightId]);

  const updateFlight = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    try {
      await axios.post(
        `${BACKEND_API_URL}/update-flight/${flightId}/`,
        flight
      );
      navigate(`/list-flight/`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container>
      <Card>
        <CardContent>
          <IconButton component={Link} sx={{ mr: 3 }} to={`/list-flight`}>
            <ArrowBackIcon />
          </IconButton>{" "}
          <form onSubmit={updateFlight}>
          <TextField
              id="call_sign"
              label="call sign"
              variant="outlined"
              fullWidth
              sx={{ mb: 2 }}
              onChange={(event) =>
                setFlight({ ...flight, call_sign: event.target.value })
              }
            />
            <TextField
              id="departure_time"
              label="departure time"
              variant="outlined"
              fullWidth
              sx={{ mb: 2 }}
              onChange={(event) =>
                setFlight({ ...flight, departure_time: event.target.value })
              }
            />

            <TextField
              id="arrival_time"
              label="arrival time"
              variant="outlined"
              fullWidth
              sx={{ mb: 2 }}
              onChange={(event) =>
                setFlight({ ...flight, arrival_time: event.target.value })
              }
            />

            <TextField
              id="duration"
              label="duration"
              variant="outlined"
              fullWidth
              sx={{ mb: 2 }}
              onChange={(event) =>
                setFlight({ ...flight, duration: Number(event.target.value) })
              }
            />

            <TextField
              id="status"
              label="status"
              variant="outlined"
              fullWidth
              sx={{ mb: 2 }}
              onChange={(event) =>
                setFlight({ ...flight, status: event.target.value })
              }
            />

            <TextField
              id="price"
              label="price"
              variant="outlined"
              fullWidth
              sx={{ mb: 2 }}
              onChange={(event) =>
                setFlight({ ...flight, price: Number(event.target.value) })
              }
            />

            <TextField
              id="seats_available"
              label="available seats"
              variant="outlined"
              fullWidth
              sx={{ mb: 2 }}
              onChange={(event) =>
                setFlight({
                  ...flight,
                  seats_available: Number(event.target.value),
                })
              }
            />
            <Autocomplete
              id="departure_airport"
              options={airports}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Deparute Airports"
                  variant="outlined"
                />
              )}
              getOptionLabel={(option) => `${option.name}`}
              filterOptions={(options, state) =>
                options.filter((option) =>
                  option.name
                    .toLowerCase()
                    .includes(state.inputValue.toLowerCase())
                )
              }
              onInputChange={handleInputChangeAirport}
              onChange={(event, value) => {
                if (value) {
                  console.log(value);
                  setFlight({ ...flight, departure_airport: value.id });
                }
              }}
            />

            <Autocomplete
              id="arrival_airport"
              options={airports}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Arrival Airports"
                  variant="outlined"
                />
              )}
              getOptionLabel={(option) => `${option.name}`}
              filterOptions={(options, state) =>
                options.filter((option) =>
                  option.name
                    .toLowerCase()
                    .includes(state.inputValue.toLowerCase())
                )
              }
              onInputChange={handleInputChangeAirport}
              onChange={(event, value) => {
                if (value) {
                  console.log(value);
                  setFlight({ ...flight, arrival_airport: value.id });
                }
              }}
            />
            <Autocomplete
              id="operating_aircraft"
              options={aircrafts}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Operated Aircraft"
                  variant="outlined"
                />
              )}
              getOptionLabel={(option) => `${option.name}`}
              filterOptions={(options, state) =>
                options.filter((option) =>
                  option.name
                    .toLowerCase()
                    .includes(state.inputValue.toLowerCase())
                )
              }
              onInputChange={handleInputChangeAircraft}
              onChange={(event, value) => {
                if (value) {
                  console.log(value);
                  setFlight({ ...flight, arrival_airport: value.id });
                }
              }}
            />

            <Button type="submit">Update Flight</Button>
          </form>
        </CardContent>
        <CardActions></CardActions>
      </Card>
    </Container>
  );
};
