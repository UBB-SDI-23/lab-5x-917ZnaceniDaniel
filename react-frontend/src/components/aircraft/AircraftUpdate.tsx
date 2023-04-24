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
import { Airline } from "../../models/Airline";

export const AircraftUpdate = () => {
  const navigate = useNavigate();
  const { aircraftId } = useParams();

  const [loading, setLoading] = useState(true);
  const [aircraft, setAircraft] = useState({
    name: "",
    manufacturer: "",
    model: "",
    max_speed: 0,
    seating_capacity: 0,
    fuel_capacity: 0,
    wing_span: 0,
    length: 0,
    no_engines: 0,
    airline_name: 1,
  });
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [airlines, setAirlines] = useState<Airline[]>([]);

  const fetchSuggestions = async (query: string) => {
    try {
      let url = `${BACKEND_API_URL}/airlineOrderedName/${query}/?page=${page}&page_size=${pageSize}`;
      const response = await fetch(url);
      const { count, next, previous, results } = await response.json();
      setAirlines(results);
      console.log(results);
    } catch (error) {
      console.error("Error fetching suggestions:", error);
    }
  };

  const debouncedFetchSuggestions = useCallback(
    debounce(fetchSuggestions, 500),
    []
  );

  useEffect(() => {
    return () => {
      debouncedFetchSuggestions.cancel();
    };
  }, [debouncedFetchSuggestions]);

  const handleInputChange = (event: any, value: any, reason: any) => {
    console.log("input", value, reason);
    if (reason === "input") {
      debouncedFetchSuggestions(value);
    }
  };

  useEffect(() => {
    const fetchAircraft = async () => {
      const response = await fetch(
        `${BACKEND_API_URL}/update-aircraft/${aircraftId}/`
      );
      const aircraft = await response.json();
      setAircraft({
        name: aircraft.name,
        manufacturer: aircraft.nanufacturer,
        model: aircraft.model,
        max_speed: aircraft.max_speed,
        seating_capacity: aircraft.seating_capacity,
        fuel_capacity: aircraft.fuel_capacity,
        wing_span: aircraft.wing_span,
        length: aircraft.length,
        no_engines: aircraft.no_engines,
        airline_name: aircraft.airline_name,
      });
      setLoading(false);
      console.log(aircraft);
    };
    fetchAircraft();
  }, [aircraftId]);

  const updateAircraft = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    try {
      await axios.post(
        `${BACKEND_API_URL}/update-aircraft/${aircraftId}/`,
        aircraft
      );
      navigate(`/list-aircraft/`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container>
      <Card>
        <CardContent>
          <IconButton component={Link} sx={{ mr: 3 }} to={`/list-aircraft`}>
            <ArrowBackIcon />
          </IconButton>{" "}
          <form onSubmit={updateAircraft}>
            <TextField
              id="name"
              label="name"
              variant="outlined"
              fullWidth
              sx={{ mb: 2 }}
              onChange={(event) =>
                setAircraft({ ...aircraft, name: event.target.value })
              }
            />
            <TextField
              id="manufacturer"
              label="manufacturer"
              variant="outlined"
              fullWidth
              sx={{ mb: 2 }}
              onChange={(event) =>
                setAircraft({ ...aircraft, manufacturer: event.target.value })
              }
            />

            <TextField
              id="model"
              label="model"
              variant="outlined"
              fullWidth
              sx={{ mb: 2 }}
              onChange={(event) =>
                setAircraft({ ...aircraft, model: event.target.value })
              }
            />

            <TextField
              id="max_speed"
              label="maximum speed"
              variant="outlined"
              fullWidth
              sx={{ mb: 2 }}
              onChange={(event) =>
                setAircraft({
                  ...aircraft,
                  max_speed: Number(event.target.value),
                })
              }
            />

            <TextField
              id="seating_capacity"
              label="seating capacity"
              variant="outlined"
              fullWidth
              sx={{ mb: 2 }}
              onChange={(event) =>
                setAircraft({
                  ...aircraft,
                  seating_capacity: Number(event.target.value),
                })
              }
            />

            <TextField
              id="fuel_capacity"
              label="fuel capacity"
              variant="outlined"
              fullWidth
              sx={{ mb: 2 }}
              onChange={(event) =>
                setAircraft({
                  ...aircraft,
                  fuel_capacity: Number(event.target.value),
                })
              }
            />

            <TextField
              id="wing_span"
              label="wing span"
              variant="outlined"
              fullWidth
              sx={{ mb: 2 }}
              onChange={(event) =>
                setAircraft({
                  ...aircraft,
                  wing_span: Number(event.target.value),
                })
              }
            />
            <TextField
              id="length"
              label="length"
              variant="outlined"
              fullWidth
              sx={{ mb: 2 }}
              onChange={(event) =>
                setAircraft({ ...aircraft, length: Number(event.target.value) })
              }
            />
            <TextField
              id="no_engines"
              label="no of engines"
              variant="outlined"
              fullWidth
              sx={{ mb: 2 }}
              onChange={(event) =>
                setAircraft({
                  ...aircraft,
                  no_engines: Number(event.target.value),
                })
              }
            />
            <Autocomplete
              id="airline_name"
              options={airlines}
              renderInput={(params) => (
                <TextField {...params} label="Airline" variant="outlined" />
              )}
              getOptionLabel={(option) => `${option.name}`}
              filterOptions={(options, state) =>
                options.filter((option) =>
                  option.name
                    .toLowerCase()
                    .includes(state.inputValue.toLowerCase())
                )
              }
              onInputChange={handleInputChange}
              onChange={(event, value) => {
                if (value) {
                  console.log(value);
                  setAircraft({ ...aircraft, airline_name: value.id });
                }
              }}
            />

            <Button type="submit">Update Aircraft</Button>
          </form>
        </CardContent>
        <CardActions></CardActions>
      </Card>
    </Container>
  );
};
