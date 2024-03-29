import { Card, CardActions, CardContent, Container, IconButton } from "@mui/material";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { FlightAllDetails } from "../../models/FlightAllDetails";
import { BACKEND_API_URL } from "../../constants";

export const FlightDetail = () => {
    const { flightId } = useParams();
    const [flight, setFlight] = useState<FlightAllDetails>();

    useEffect(() => {
        const fetchFlight =async () => {
            const response = await fetch(`${BACKEND_API_URL}/read-flight/${flightId}/`);
            const flight = await response.json();
            setFlight(flight);
            console.log(flight);
        };
        fetchFlight();
    }, [flightId]);

    return (
        <Container>
        <Card>
            <CardContent>
                <IconButton component={Link} sx={{ mr: 3 }} to={`/list-flight`}>
                    <ArrowBackIcon />
                </IconButton>{" "}
                <h1 style={{textAlign:"center"}}> Flight Details</h1>
                <p style={{textAlign:"left"}}>Departure airport: {flight?.departure_airport.name}</p>
                <p style={{textAlign:"left"}}>Arrival airport: {flight?.arrival_airport.name}</p>
                <p style={{textAlign:"left"}}>call sign: {flight?.call_sign}</p>
                <p style={{textAlign:"left"}}>Departure Time: {flight?.departure_time.toLocaleString()}</p>
                <p style={{textAlign:"left"}}>Arrival time: {flight?.arrival_time.toLocaleString()}</p>
                <p style={{textAlign:"left"}}>duration: {flight?.duration}</p>
                <p style={{textAlign:"left"}}>Status: {flight?.status}</p>
                <p style={{textAlign:"left"}}>Price: {flight?.price}</p>
                <p style={{textAlign:"left"}}>Available Seats: {flight?.seats_available}</p>
                <p style={{textAlign:"left"}}>Operating Aircraft: {flight?.operating_aircraft.name}</p>
                <p style={{textAlign:"left"}}>Tickets:</p>
                <ul>
                {flight?.passengers?.map((passengers) => (
                        <li style={{textAlign:"left"}} key={passengers.id}> passenger{passengers.first_name} {passengers.last_name} </li>
                    ))}
                </ul>
            </CardContent>
            <CardActions>
                <IconButton component={Link} sx={{ mr: 3 }} to={`/update-flight/${flightId}`}>
                    <EditIcon />
                </IconButton>

                <IconButton component={Link} sx={{ mr: 3 }} to={`/delete-flight/${flightId}`}>
                    <DeleteForeverIcon sx={{ color: "red" }} />
                </IconButton>
            </CardActions>
        </Card>
    </Container>
    );
};