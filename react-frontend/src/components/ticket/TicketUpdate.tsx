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
  
  import { Passenger } from "../../models/Passenger";
  import { BACKEND_API_URL } from "../../constants";
  import { debounce } from "lodash";
  import { Ticket } from "../../models/Ticket";
  import { Flight } from "../../models/Flight";
  
  export const TicketUpdate = () => {
    const navigate = useNavigate();
    const { ticketId } = useParams();
  
    const [loading, setLoading] = useState(true);
    const [ticket, setTicket] = useState({
        flight: 1,
        passenger: 1,
        seat_number: 1,
        booking_date: "",
    });
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [flights, setFlight] = useState<Flight[]>([]);
    const [passengers, setPassenger] = useState<Passenger[]>([]);
  
    const fetchSuggestionsFlight = async (query: string) => {
        try {
          let url = `${BACKEND_API_URL}/flightOrderedName/${query}/?page=${page}&page_size=${pageSize}`;
          const response = await fetch(url);
          const { count, next, previous, results } = await response.json();
          setFlight(results);
          console.log(results);
        } catch (error) {
          console.error("Error fetching suggestions:", error);
        }
      };
      const fetchSuggestionsPassenger = async (query: string) => {
        try {
          let url = `${BACKEND_API_URL}/passengerOrderedName/${query}/?page=${page}&page_size=${pageSize}`;
          const response = await fetch(url);
          const { count, next, previous, results } = await response.json();
          setPassenger(results);
          console.log(results);
        } catch (error) {
          console.error("Error fetching suggestions:", error);
        }
      };
    
      const debouncedFetchSuggestionsFlight = useCallback(
        debounce(fetchSuggestionsFlight, 500),
        []
      );
      const debouncedFetchSuggestionsPassenger = useCallback(
        debounce(fetchSuggestionsPassenger, 500),
        []
      );
    
      useEffect(() => {
        return () => {
          debouncedFetchSuggestionsFlight.cancel();
        };
      }, [debouncedFetchSuggestionsFlight]);
    
      useEffect(() => {
        return () => {
          debouncedFetchSuggestionsPassenger.cancel();
        };
      }, [debouncedFetchSuggestionsPassenger]);
    
      const handleInputChangeFlight = (event: any, value: any, reason: any) => {
        console.log("input", value, reason);
        if (reason === "input") {
          debouncedFetchSuggestionsFlight(value);
        }
      };
      const handleInputChangePassenger = (event: any, value: any, reason: any) => {
        console.log("input", value, reason);
        if (reason === "input") {
          debouncedFetchSuggestionsPassenger(value);
        }
      };
    
    useEffect(() => {
      const fetchTicket = async () => {
        const response = await fetch(
          `${BACKEND_API_URL}/update-ticket/${ticketId}/`
        );
        const ticket = await response.json();
        setTicket({
          flight: ticket.flight,
          passenger: ticket.passenger,
          seat_number: ticket.seat_number,
          booking_date: ticket.booking_date,
        });
        setLoading(false);
        console.log(ticket);
      };
      fetchTicket();
    }, [ticketId]);
  
    const updateTicket = async (event: { preventDefault: () => void }) => {
      event.preventDefault();
      try {
        await axios.post(
          `${BACKEND_API_URL}/update-ticket/${ticketId}/`,
          ticket
        );
        navigate(`/list-ticket/`);
      } catch (error) {
        console.log(error);
      }
    };
  
    return (
      <Container>
        <Card>
          <CardContent>
            <IconButton component={Link} sx={{ mr: 3 }} to={`/list-ticket`}>
              <ArrowBackIcon />
            </IconButton>{" "}
            <form onSubmit={updateTicket}>
            <TextField
                id="seat_number"
                label="Seat number"
                variant="outlined"
                fullWidth
                sx={{ mb: 2 }}
                onChange={(event) =>
                  setTicket({ ...ticket, seat_number: Number(event.target.value) })
                }
              />
              <TextField
                id="booking_date"
                label="booking date"
                variant="outlined"
                fullWidth
                sx={{ mb: 2 }}
                onChange={(event) =>
                  setTicket({ ...ticket, booking_date: event.target.value })
                }
              />
  
              
              <Autocomplete
                id="flight"
                options={flights}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Flights"
                    variant="outlined"
                  />
                )}
                getOptionLabel={(option) => `${option.call_sign}`}
                filterOptions={(options, state) =>
                  options.filter((option) =>
                    option.call_sign
                      .toLowerCase()
                      .includes(state.inputValue.toLowerCase())
                  )
                }
                onInputChange={handleInputChangeFlight}
                onChange={(event, value) => {
                  if (value) {
                    console.log(value);
                    setTicket({ ...ticket, flight: value.id });
                  }
                }}
              />
  
              <Autocomplete
                id="passenger"
                options={passengers}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Passengers"
                    variant="outlined"
                  />
                )}
                getOptionLabel={(option) => `${option.first_name} {option.last_name} `}
                filterOptions={(options, state) =>
                  options.filter((option) =>
                    option.last_name
                      .toLowerCase()
                      .includes(state.inputValue.toLowerCase())
                  )
                }
                onInputChange={handleInputChangePassenger}
                onChange={(event, value) => {
                  if (value) {
                    console.log(value);
                    setTicket({ ...ticket, passenger: value.id });
                  }
                }}
              />
              <Button type="submit">Update Ticket</Button>
            </form>
          </CardContent>
          <CardActions></CardActions>
        </Card>
      </Container>
    );
  };
  