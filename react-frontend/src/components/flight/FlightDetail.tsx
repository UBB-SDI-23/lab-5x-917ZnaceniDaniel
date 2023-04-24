import { Card, CardActions, CardContent, Container, IconButton } from "@mui/material";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { FlightAllDetails } from "../../models/FlightAllDetails";
import { BACKEND_API_URL } from "../../constants";

export const FlightDetail = () => {
    const { flighId} = useParams();
    const [flight, setFlight] = useState<FlightAllDetails>();

    useEffect(() => {
        const fetchFlight =async () => {
            const response = await fetch(`${BACKEND_API_URL}/read-flight/${flighId}/`);
            const flight = await response.json();
            setFlight(flight);
            console.log(flight);
        };
        fetchFlight();
    }, [flighId]);

    return (
        <Container>
        <Card>
            <CardContent>
                <IconButton component={Link} sx={{ mr: 3 }} to={`/list-flight`}>
                    <ArrowBackIcon />
                </IconButton>{" "}
                <h1 style={{textAlign:"center"}}> Flight Details</h1>
                <p style={{textAlign:"left"}}>Departure airport: {flight?.departure_airport.toLocaleString()}</p>
                <p style={{textAlign:"left"}}>Arrival airport: {flight?.arrival_airport.toLocaleString()}</p>
                <p style={{textAlign:"left"}}>call sign: {flight?.call_sign}</p>
                <p style={{textAlign:"left"}}>Departure Time: {flight?.departure_time.toLocaleString()}</p>
                <p style={{textAlign:"left"}}>Arrival time: {flight?.arrival_time.toLocaleString()}</p>
                <p style={{textAlign:"left"}}>duration: {flight?.duration}</p>
                <p style={{textAlign:"left"}}>Status: {flight?.status}</p>
                <p style={{textAlign:"left"}}>Price: {flight?.price}</p>
                <p style={{textAlign:"left"}}>Available Seats: {flight?.seats_available}</p>
                <p style={{textAlign:"left"}}>Operating Aircraft: {flight?.operating_aircraft.toLocaleString()}</p>
                <p style={{textAlign:"left"}}>Tickets:</p>
                <ul>
                    {flight?.tickets?.map((tickets) => (
                        <li style={{textAlign:"left"}} key={tickets.id}> ticket booked on {tickets.booking_date.toLocaleString()} </li>
                    ))}
                </ul>
            </CardContent>
            <CardActions>
                <IconButton component={Link} sx={{ mr: 3 }} to={`/update-flight/${flighId}`}>
                    <EditIcon />
                </IconButton>

                <IconButton component={Link} sx={{ mr: 3 }} to={`/delete-flight/${flighId}`}>
                    <DeleteForeverIcon sx={{ color: "red" }} />
                </IconButton>
            </CardActions>
        </Card>
    </Container>
    );
};