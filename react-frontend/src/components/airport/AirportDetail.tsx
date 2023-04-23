import { Card, CardActions, CardContent, Container, IconButton } from "@mui/material";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
// import { TennisPlayer } from "../../models/TennisPlayer";
// import { TennisPlayerFull} from "../../models/TennisPlayerFull";
// import { BACKEND_API_URL } from "../../constants";
import { AirportAllDetails } from "../../models/AirportAllDetails";
import { BACKEND_API_URL } from "../../constants";

export const AirportDetail = () => {
    const {airportId} = useParams();
    const [airport, setAirport] = useState<AirportAllDetails>();

    useEffect(() => {
        const fetchAirport =async () => {
            const response = await fetch(`${BACKEND_API_URL}/read-airport/${airportId}/`);
            const airport = await response.json();
            setAirport(airport);
            console.log(airport);
        };
        fetchAirport();
    }, [airportId]);

    return (
        <Container>
        <Card>
            <CardContent>
                <IconButton component={Link} sx={{ mr: 3 }} to={`/list-airport`}>
                    <ArrowBackIcon />
                </IconButton>{" "}
                <h1 style={{textAlign:"center"}}> Airport Details</h1>
                <p style={{textAlign:"left"}}>Name: {airport?.name}</p>
                <p style={{textAlign:"left"}}>City: {airport?.city}</p>
                <p style={{textAlign:"left"}}>Country: {airport?.country}</p>
                <p style={{textAlign:"left"}}>Timezone: {airport?.timezone}</p>
                <p style={{textAlign:"left"}}>Elevation: {airport?.elevation}</p>
                <p style={{textAlign:"left"}}>capacity: {airport?.capacity}</p>
                <p style={{textAlign:"left"}}>No of Gates: {airport?.no_gates}</p>
                <p style={{textAlign:"left"}}>No of Terminal: {airport?.no_terminals}</p>
                <p style={{textAlign:"left"}}>Arrival Flights:</p>
                <ul>
                    {airport?.arrival_flights?.map((arrival_flight) => (
                        <li style={{textAlign:"left"}} key={arrival_flight.id}> flights arriving at: {arrival_flight.arrival_time.toLocaleString()}</li>
                    ))}
                </ul>
                <p style={{textAlign:"left"}}>Departure FLights:</p>
                <ul>
                    {airport?.departure_flights?.map((departure_flight) => (
                        <li style={{textAlign:"left"}} key={departure_flight.id}>flight arriving at: {departure_flight.departure_time.toLocaleString()}</li>
                    ))}
                </ul>
            </CardContent>
            <CardActions>
                <IconButton component={Link} sx={{ mr: 3 }} to={`/update-airport/${airportId}`}>
                    <EditIcon />
                </IconButton>

                <IconButton component={Link} sx={{ mr: 3 }} to={`/delete-airport/${airportId}`}>
                    <DeleteForeverIcon sx={{ color: "red" }} />
                </IconButton>
            </CardActions>
        </Card>
    </Container>
    );
};