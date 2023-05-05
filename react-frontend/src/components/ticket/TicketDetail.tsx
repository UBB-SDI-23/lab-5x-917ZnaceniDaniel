import { Card, CardActions, CardContent, Container, IconButton } from "@mui/material";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { Ticket } from "../../models/Ticket";
import { BACKEND_API_URL } from "../../constants";

export const TicketDetail = () => {
    const { ticketId } = useParams();
    const [ticket, setTicket] = useState<Ticket>();

    useEffect(() => {
        const fetchTicket =async () => {
            const response = await fetch(`${BACKEND_API_URL}/read-ticket/${ticketId}/`);
            const ticket = await response.json();
            setTicket(ticket);
            console.log(ticket);
        };
        fetchTicket();
    }, [ticketId]);

    return (
        <Container>
        <Card>
            <CardContent>
                <IconButton component={Link} sx={{ mr: 3 }} to={`/list-ticket`}>
                    <ArrowBackIcon />
                </IconButton>{" "}
                <h1 style={{textAlign:"center"}}> Ticket Details</h1>
                <p style={{textAlign:"left"}}>Flight call sing: {ticket?.flight.call_sign}</p>
                <p style={{textAlign:"left"}}>passenger: {ticket?.passenger.first_name} {ticket?.passenger.last_name}</p>
                <p style={{textAlign:"left"}}>seat number: {ticket?.seat_number}</p>
                <p style={{textAlign:"left"}}>booking date: {ticket?.booking_date.toLocaleString()}</p>
            </CardContent>
            <CardActions>
                <IconButton component={Link} sx={{ mr: 3 }} to={`/update-ticket/${ticketId}`}>
                    <EditIcon />
                </IconButton>

                <IconButton component={Link} sx={{ mr: 3 }} to={`/delete-ticket/${ticketId}`}>
                    <DeleteForeverIcon sx={{ color: "red" }} />
                </IconButton>
            </CardActions>
        </Card>
    </Container>
    );
};