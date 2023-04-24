import { Card, CardActions, CardContent, Container, IconButton } from "@mui/material";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { AirlineAllDetails } from "../../models/AirlineAllDetails";
import { BACKEND_API_URL } from "../../constants";

export const AirlineDetail = () => {
    const { airlineId} = useParams();
    const [airline, serAirline] = useState<AirlineAllDetails>();

    useEffect(() => {
        const fetchAirline =async () => {
            const response = await fetch(`${BACKEND_API_URL}/read-airline/${airlineId}/`);
            const airline = await response.json();
            serAirline(airline);
            console.log(airline);
        };
        fetchAirline();
    }, [airlineId]);

    return (
        <Container>
        <Card>
            <CardContent>
                <IconButton component={Link} sx={{ mr: 3 }} to={`/list-airline`}>
                    <ArrowBackIcon />
                </IconButton>{" "}
                <h1 style={{textAlign:"center"}}> Airline Details</h1>
                <p style={{textAlign:"left"}}>Name: {airline?.name}</p>
                <p style={{textAlign:"left"}}>Headquarters: {airline?.headquarters}</p>
                <p style={{textAlign:"left"}}>website: {airline?.website}</p>
                <p style={{textAlign:"left"}}> Established Date: {airline?.established_date ? new Date(airline.established_date).toLocaleDateString() : "Unknown"}</p>
                <p style={{textAlign:"left"}}>Revenue: {airline?.revenue}</p>
                <p style={{textAlign:"left"}}>Employee Count: {airline?.num_employees}</p>
                <p style={{textAlign:"left"}}>Aircraft List:</p>
                <ul>
                    {airline?.aircraft_list?.map((aircraft) => (
                        <li style={{textAlign:"left"}} key={aircraft.id}> Aircraft model: {aircraft.model} </li>
                    ))}
                </ul>
                <p style={{textAlign:"left"}}>Departure FLights:</p>
            </CardContent>
            <CardActions>
                <IconButton component={Link} sx={{ mr: 3 }} to={`/update-airline/${airlineId}`}>
                    <EditIcon />
                </IconButton>

                <IconButton component={Link} sx={{ mr: 3 }} to={`/delete-airport/${airlineId}`}>
                    <DeleteForeverIcon sx={{ color: "red" }} />
                </IconButton>
            </CardActions>
        </Card>
    </Container>
    );
};