import { Autocomplete, Button, Card, CardActions, CardContent, Container, IconButton, TextField } from "@mui/material";
import { useCallback, useEffect, useState, useRef} from "react";
import { Link, useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import axios from "axios";
import { Passenger } from "../../models/Passenger";
import { BACKEND_API_URL } from "../../constants";
import { debounce } from "lodash";

export const PassengerCreate = () => {
    const navigate = useNavigate();
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

    const createPassenger =async (event: { preventDefault: () => void}) => {
		console.log('arrived here');
        event.preventDefault();
        try {
            await axios.post(`${BACKEND_API_URL}/create-passenger/`, passenger);
			console.log(passenger)
            navigate("/list-passenger/");
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
					<IconButton  component={Link} sx={{ mr: 3 }} to={`/list-passenger/`}>
						<ArrowBackIcon />
					</IconButton>{" "}
					<form onSubmit={createPassenger}>
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
						<Button type="submit">Add Passenger</Button>
					</form>
				</CardContent>
				<CardActions></CardActions>
			</Card>
		</Container>
    );
}