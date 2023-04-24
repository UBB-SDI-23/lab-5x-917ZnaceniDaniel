import { Button, Card, CardActions, CardContent, Container, IconButton, TextField } from "@mui/material";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import axios from "axios";
import { Airline } from "../../models/Airline";
import { BACKEND_API_URL } from "../../constants";

export const AirlineCreate = () => {
    const navigate = useNavigate();
    const [airline, setAirline] = useState({
        name:"",
        headquarters :"",
        website:"",
        established_date:"",
        revenue :0,
        num_employees:0,
    });

    const createAirline =async (event: { preventDefault: () => void}) => {
        event.preventDefault();
        try {
            await axios.post(`${BACKEND_API_URL}/create-airline/`, airline);
            navigate("/list-airline/");
        } catch (error) {
            console.log(error);
        }
    };
	const check_where = () =>{
		console.log('here');
	}

    return (
        <Container>
			<Card>
				<CardContent>
					<IconButton  component={Link} sx={{ mr: 3 }} to={`/list-airline/`}>
						<ArrowBackIcon />
					</IconButton>{" "}
					<form onSubmit={createAirline}>
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
						<Button type="submit">Add Airline</Button>
					</form>
				</CardContent>
				<CardActions></CardActions>
			</Card>
		</Container>
    );
}