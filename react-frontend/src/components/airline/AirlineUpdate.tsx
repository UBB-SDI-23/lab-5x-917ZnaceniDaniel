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
  
  import { Airline } from "../../models/Airline";
  import { BACKEND_API_URL } from "../../constants";
  
  export const AirlineUpdate = () => {
    const navigate = useNavigate();
    const { airlineId } = useParams();
  
    const [loading, setLoading] = useState(true);
    const [airline, setAirline] = useState({
        name:"",
        headquarters :"",
        website:"",
        established_date:"",
        revenue :0,
        num_employees:0,
    });
  
    useEffect(() => {
      const fetchAirline = async () => {
        const response = await fetch(
          `${BACKEND_API_URL}/update-airline/${airlineId}/`
        );
        const airline = await response.json();
        setAirline({
          name: airline.name,
          headquarters : airline.headquarters,
          website: airline.website,
          established_date: airline.established_date,
          revenue : airline.revenue,
          num_employees:airline.num_employees,
        });
        setLoading(false);
        console.log(airline);
      };
      fetchAirline();
    }, [airlineId]);
  
    const updateAirline = async (event: { preventDefault: () => void }) => {
      event.preventDefault();
      try {
        await axios.post(
          `${BACKEND_API_URL}/update-airline/${airlineId}/`,
          airline
        );
        navigate(`/list-airline/`);
      } catch (error) {
        console.log(error);
      }
    };
  
    return (
      <Container>
        <Card>
          <CardContent>
            <IconButton component={Link} sx={{ mr: 3 }} to={`/list-airline`}>
              <ArrowBackIcon />
            </IconButton>{" "}
            <form onSubmit={updateAirline}>
            <TextField
							id="name"
							label="Airline name"
							variant="outlined"
							fullWidth
							sx={{ mb: 2 }}
							onChange={(event) => setAirline({ ...airline, name: event.target.value })}
						/>
						<TextField
							id="headquarters"
							label="Airline Headquarters"
							variant="outlined"
							fullWidth
							sx={{ mb: 2 }}
							onChange={(event) => setAirline({ ...airline, headquarters: event.target.value })}
						/>

                        <TextField
							id="website"
							label="Airline Website"
							variant="outlined"
							fullWidth
							sx={{ mb: 2 }}
							onChange={(event) => setAirline({ ...airline, website: event.target.value })}
						/>

                        <TextField
							id="established_date"
							label="Airline established date"
							variant="outlined"
							fullWidth
							sx={{ mb: 2 }}
							onChange={(event) => setAirline({ ...airline, established_date: event.target.value })}
						/>

                        <TextField
							id="revenue"
							label="Airline revenue "
							variant="outlined"
							fullWidth
							sx={{ mb: 2 }}
							onChange={(event) => setAirline({ ...airline, revenue: Number(event.target.value)})}
						/>

						 <TextField
							id="num_employees"
							label="Airline employee count"
							variant="outlined"
							fullWidth
							sx={{ mb: 2 }}
							onChange={(event) => setAirline({ ...airline, num_employees: Number(event.target.value)})}
						/>
  
              <Button type="submit">Update Airline</Button>
            </form>
          </CardContent>
          <CardActions></CardActions>
        </Card>
      </Container>
    );
  };
  