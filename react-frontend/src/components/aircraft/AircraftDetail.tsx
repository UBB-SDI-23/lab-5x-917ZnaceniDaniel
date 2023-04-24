import { Card, CardActions, CardContent, Container, IconButton } from "@mui/material";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { AircraftAllDetails } from "../../models/AircraftAllDetails";
import { BACKEND_API_URL } from "../../constants";

export const AircraftDetail = () => {
    const { aircraftId} = useParams();
    const [aircraft, setAircraft] = useState<AircraftAllDetails>();

    useEffect(() => {
        const fetchAircraft =async () => {
            const response = await fetch(`${BACKEND_API_URL}/read-aircraft/${aircraftId}/`);
            const aircraft = await response.json();
            setAircraft(aircraft);
            console.log(aircraft);
        };
        fetchAircraft();
    }, [aircraftId]);

    return (
        <Container>
        <Card>
            <CardContent>
                <IconButton component={Link} sx={{ mr: 3 }} to={`/list-aircraft`}>
                    <ArrowBackIcon />
                </IconButton>{" "}
                <h1 style={{textAlign:"center"}}> Aircraft Details</h1>
                <p style={{textAlign:"left"}}>Name: {aircraft?.name}</p>
                <p style={{textAlign:"left"}}>Manufacturer: {aircraft?.manufacturer}</p>
                <p style={{textAlign:"left"}}>Model: {aircraft?.model}</p>
                <p style={{textAlign:"left"}}>Max Speed: {aircraft?.max_speed}</p>
                <p style={{textAlign:"left"}}>Seating Capacity: {aircraft?.seating_capacity}</p>
                <p style={{textAlign:"left"}}>Fuel Capacity: {aircraft?.fuel_capacity}</p>
                <p style={{textAlign:"left"}}>Wing Span: {aircraft?.wing_span}</p>
                <p style={{textAlign:"left"}}>Length: {aircraft?.length}</p>
                <p style={{textAlign:"left"}}>No of Engines: {aircraft?.no_engines}</p>
                <p style={{textAlign:"left"}}>Airline Name: {aircraft?.airline_name.name}</p>
                <p style={{textAlign:"left"}}>Opperated Flights:</p>
                <ul>
                    {aircraft?.operated_flights?.map((operated_flights) => (
                        <li style={{textAlign:"left"}} key={operated_flights.id}> flight {operated_flights.call_sign} </li>
                    ))}
                </ul>
            </CardContent>
            <CardActions>
                <IconButton component={Link} sx={{ mr: 3 }} to={`/update-aircraft/${aircraftId}`}>
                    <EditIcon />
                </IconButton>

                <IconButton component={Link} sx={{ mr: 3 }} to={`/delete-aircraft/${aircraftId}`}>
                    <DeleteForeverIcon sx={{ color: "red" }} />
                </IconButton>
            </CardActions>
        </Card>
    </Container>
    );
};