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
  import { Airline } from "../../models/Airline";
  
  export const PassengerUpdate = () => {
    const navigate = useNavigate();
    const { passengerId } = useParams();
  
    const [loading, setLoading] = useState(true);
    const [passenger, setPassenger] = useState({
        first_name :"",
        last_name:"",
        email :"",
        phone_number :"",
        citizenship :"",
        description :"",
    });
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    
    useEffect(() => {
      const fetchPassenger = async () => {
        const response = await fetch(
          `${BACKEND_API_URL}/update-passenger/${passengerId}/`
        );
        const passenger = await response.json();
        setPassenger({
          first_name: passenger.first_name,
          last_name: passenger.last_name,
          email: passenger.email,
          phone_number: passenger.phone_number,
          citizenship: passenger.citizenship,
          description: passenger.description,
        });
        setLoading(false);
        console.log(passenger);
      };
      fetchPassenger();
    }, [passengerId]);
  
    const updatePassenger = async (event: { preventDefault: () => void }) => {
      event.preventDefault();
      try {
        await axios.post(
          `${BACKEND_API_URL}/update-passenger/${passengerId}/`,
          passenger
        );
        navigate(`/list-passenger/`);
      } catch (error) {
        console.log(error);
      }
    };
  
    return (
      <Container>
        <Card>
          <CardContent>
            <IconButton component={Link} sx={{ mr: 3 }} to={`/list-passenger`}>
              <ArrowBackIcon />
            </IconButton>{" "}
            <form onSubmit={updatePassenger}>
            <TextField
							id="first_name"
							label="first name"
							variant="outlined"
							fullWidth
							sx={{ mb: 2 }}
							onChange={(event) => setPassenger({ ...passenger, first_name: event.target.value })}
						/>
						<TextField
							id="last_name"
							label="last name"
							variant="outlined"
							fullWidth
							sx={{ mb: 2 }}
							onChange={(event) => setPassenger({ ...passenger, last_name: event.target.value })}
						/>

                        <TextField
							id="email"
							label="email"
							variant="outlined"
							fullWidth
							sx={{ mb: 2 }}
							onChange={(event) => setPassenger({ ...passenger, email: event.target.value })}
						/>

                        <TextField
							id="phone_number"
							label="phone number"
							variant="outlined"
							fullWidth
							sx={{ mb: 2 }}
							onChange={(event) => setPassenger({ ...passenger, phone_number: event.target.value })}
						/>

                        <TextField
							id="citizenship"
							label="citizenship"
							variant="outlined"
							fullWidth
							sx={{ mb: 2 }}
							onChange={(event) => setPassenger({ ...passenger, citizenship: event.target.value})}
						/>

						 <TextField
							id="description"
							label="description"
							variant="outlined"
							fullWidth
							sx={{ mb: 2 }}
							onChange={(event) => setPassenger({ ...passenger, description: event.target.value})}
						/>
  
              <Button type="submit">Update Passenger</Button>
            </form>
          </CardContent>
          <CardActions></CardActions>
        </Card>
      </Container>
    );
  };
  