import { Card, CardActions, CardContent, Container, IconButton } from "@mui/material";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { PassengerAllDetails } from "../../models/PassengerAllDetails";
import { BACKEND_API_URL } from "../../constants";

export const PassengerDetail = () => {
    const { passengerId} = useParams();
    const [passenger, setPassenger] = useState<PassengerAllDetails>();

    useEffect(() => {
        const fetchPassenger =async () => {
            const response = await fetch(`${BACKEND_API_URL}/read-passenger/${passengerId}/`);
            const passenger = await response.json();
            setPassenger(passenger);
            console.log(passenger);
        };
        fetchPassenger();
    }, [passengerId]);

    return (
        <Container>
        <Card>
            <CardContent>
                <IconButton component={Link} sx={{ mr: 3 }} to={`/list-passenger`}>
                    <ArrowBackIcon />
                </IconButton>{" "}
                <h1 style={{textAlign:"center"}}> Passenger Details</h1>
                <p style={{textAlign:"left"}}>First Name: {passenger?.first_name}</p>
                <p style={{textAlign:"left"}}>Last Name: {passenger?.last_name}</p>
                <p style={{textAlign:"left"}}>Email: {passenger?.email}</p>
                <p style={{textAlign:"left"}}>Phone Number: {passenger?.phone_number}</p>
                <p style={{textAlign:"left"}}>Citizenship: {passenger?.citizenship}</p>
                <p style={{textAlign:"left"}}>Description: {passenger?.description}</p>
                <p style={{textAlign:"left"}}>Flights:</p>
                <ul>
                    {passenger?.flights?.map((upcoming_flights) => (
                        <li style={{textAlign:"left"}} key={upcoming_flights.id}> flight from {upcoming_flights.departure_airport.city} to  {upcoming_flights.arrival_airport.city} </li>
                    ))}
                </ul>
            </CardContent>
            <CardActions>
                <IconButton component={Link} sx={{ mr: 3 }} to={`/update-passenger/${passengerId}`}>
                    <EditIcon />
                </IconButton>

                <IconButton component={Link} sx={{ mr: 3 }} to={`/delete-passenger/${passengerId}`}>
                    <DeleteForeverIcon sx={{ color: "red" }} />
                </IconButton>
            </CardActions>
        </Card>
    </Container>
    );
};