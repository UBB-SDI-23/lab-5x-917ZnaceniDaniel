import {
	TableContainer,
	Paper,
	Table,
	TableHead,
	TableRow,
	TableCell,
	TableBody,
	CircularProgress,
	Container,
	IconButton,
	Tooltip,
    Button
} from "@mui/material";

import { useEffect, useState } from "react";
import { Flight } from "../../models/Flight";
import ReadMoreIcon from "@mui/icons-material/ReadMore";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import AddIcon from "@mui/icons-material/Add";
import { Link } from "react-router-dom";
import { BACKEND_API_URL } from "../../constants";



export const FlightShowAll = () => {
    const [loading, setLoading] = useState(true);
    const [flights, setFlights] = useState([]);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const current = (page - 1) * pageSize + 1;

    // {console.log(BACKEND_API_URL)}
    const feetchFlights = async() => {
        setLoading(true);
        const response = await fetch(
            `${BACKEND_API_URL}/list-flight/?page=${page}&page_size=${pageSize}`
        );
        const {count, next, previous, results} = await response.json();
        setFlights(results);
        setLoading(false);
    };
    
    useEffect(() => {
        feetchFlights();
    }, [page]);

    console.log(flights);

    const sortFlights = () => {
        const sortedFlights = [...flights].sort((a: Flight, b:Flight) => {
            if (a.price < b.price) {
                return -1;
            }
            if (a.price > b.price) {
                return 1;
            }
            return 0;

        })
        console.log(sortedFlights);
        setFlights(sortedFlights);
    }

  
    return (
        <Container>
        <h1>All Flights</h1>
        {loading && <CircularProgress />}

        {!loading && flights.length == 0 && <div>No flights found!</div>}

        {!loading && (
            <IconButton component={Link} sx={{ mr: 3 }} to={`../create-flight/`}>
                        <Tooltip title="Add a new flight" arrow>
                            <AddIcon color="primary" />
                        </Tooltip>
                    </IconButton>
        )}

        {!loading && (
            <Button sx={{color:"red"}} onClick={sortFlights}>
                Sort Flights
            </Button>
        )}

        {!loading && flights.length > 0 && (
            <>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 900 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>#</TableCell>
                            <TableCell align="center">Departure Airport</TableCell>
                            <TableCell align="center">Arrival Airport</TableCell>
                            <TableCell align="center">CallSign</TableCell>
                            <TableCell align="center">Departure Time</TableCell>
                            <TableCell align="center">Arrival Time</TableCell>
                            <TableCell align="center">Duration</TableCell>
                            <TableCell align="center">Status</TableCell>
                            <TableCell align="center">Price</TableCell>
                            <TableCell align="center">Available Seats</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {flights.map((flight:Flight, index) => (
                            <TableRow key={flight.id}>
                                <TableCell component="th" scope="row">
                                    {index + current}
                                </TableCell>
                                <TableCell align="center">{flight.departure_airport.toLocaleString()}</TableCell>
                                <TableCell align="center">{flight.arrival_airport.toLocaleString()}</TableCell>
                                <TableCell align="center">{flight.call_sign}</TableCell>
                                <TableCell align="center">{flight.departure_time.toLocaleString()}</TableCell>
                                <TableCell align="center">{flight.arrival_time.toLocaleString()}</TableCell>
                                <TableCell align="center">{flight.duration}</TableCell>
                                <TableCell align="center">{flight.status}</TableCell>
                                <TableCell align="center">{flight.price}</TableCell>
                                <TableCell align="center">{flight.seats_available}</TableCell>
                                <TableCell align="right">
										<IconButton
											component={Link}
											sx={{ mr: 3 }}
											to={`/read-flight/${flight.id}`}>
											<Tooltip title="View flight  details" arrow>
												<ReadMoreIcon color="primary" />
											</Tooltip>
										</IconButton>

										<IconButton component={Link} sx={{ mr: 3 }} to={`../update-flight/${flight.id}/`}>
											<EditIcon />
										</IconButton>

										<IconButton component={Link} sx={{ mr: 3 }} to={`../delete-flight/${flight.id}/`}>
											<DeleteForeverIcon sx={{ color: "red" }} />
										</IconButton>
									</TableCell>
                            </TableRow>
                        ))}
                </TableBody>
                </Table>
            </TableContainer>
            <Button disabled={page === 1} onClick={() => setPage(page-1)}>Previous</Button>
            <Button disabled={flights.length < pageSize} onClick={() => setPage(page + 1)}>Next</Button>
            </>
        )}
    </Container>
    );
  };