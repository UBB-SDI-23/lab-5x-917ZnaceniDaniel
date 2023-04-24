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
import { Aircraft } from "../../models/Aircraft";
import ReadMoreIcon from "@mui/icons-material/ReadMore";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import AddIcon from "@mui/icons-material/Add";
import { Link } from "react-router-dom";
import { BACKEND_API_URL } from "../../constants";

export const AircraftShowAll = () => {
    const [loading, setLoading] = useState(true);
    const [aircrafts, setAircrafts] = useState([]);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const current = (page - 1) * pageSize + 1;

    const fetchAircrafts = async() => {
        setLoading(true);
        const response = await fetch(
            `${BACKEND_API_URL}/list-aircraft/?page=${page}&page_size=${pageSize}`
        );
        const {count, next, previous, results} = await response.json();
        setAircrafts(results);
        setLoading(false);
    };
    
    useEffect(() => {
        fetchAircrafts();
    }, [page]);

    console.log(aircrafts);

    const sortAircrafts = () => {
        const sortedAircrafts = [...aircrafts].sort((a: Aircraft, b:Aircraft) => {
            if (a.wing_span < b.wing_span) {
                return -1;
            }
            if (a.wing_span > b.wing_span) {
                return 1;
            }
            return 0;
        });
        console.log(sortedAircrafts);
        setAircrafts(sortedAircrafts);
    }

  
    return (
        <Container>
        <h1>All Aircrafts</h1>
        {loading && <CircularProgress />}

        {!loading && aircrafts.length == 0 && <div>No aircrafts found!</div>}

        {!loading && (
            <IconButton component={Link} sx={{ mr: 3 }} to={`../create-aircraft/`}>
                        <Tooltip title="Add a new aircraft" arrow>
                            <AddIcon color="primary" />
                        </Tooltip>
                    </IconButton>
        )}

        {!loading && (
            <Button sx={{color:"red"}} onClick={sortAircrafts}>
                Sort Aircrafts
            </Button>
        )}

        {!loading && aircrafts.length > 0 && (
            <>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 900 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>#</TableCell>
                            <TableCell align="center">Name</TableCell>
                            <TableCell align="center">Manufacturer</TableCell>
                            <TableCell align="center">Model</TableCell>
                            <TableCell align="center">Maximum Speed</TableCell>
                            <TableCell align="center">Seating Capacity</TableCell>
                            <TableCell align="center">Fuel Capacity</TableCell>
                            <TableCell align="center">Wing Span</TableCell>
                            <TableCell align="center">Length</TableCell>
                            <TableCell align="center">No of Engines</TableCell>
                            <TableCell align="center">Count Flights</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {aircrafts.map((aircraft:Aircraft, index) => (
                            <TableRow key={aircraft.id}>
                                <TableCell component="th" scope="row">
                                    {index + current}
                                </TableCell>
                                <TableCell align="center">{aircraft.name}</TableCell>
                                <TableCell align="center">{aircraft.manufacturer}</TableCell>
                                <TableCell align="center">{aircraft.model}</TableCell>
                                <TableCell align="center">{aircraft.max_speed}</TableCell>
                                <TableCell align="center">{aircraft.seating_capacity}</TableCell>
                                <TableCell align="center">{aircraft.fuel_capacity}</TableCell>
                                <TableCell align="center">{aircraft.wing_span}</TableCell>
                                <TableCell align="center">{aircraft.length}</TableCell>
                                <TableCell align="center">{aircraft.no_engines}</TableCell>
                                <TableCell align="center">{aircraft.no_flights}</TableCell>
                                <TableCell align="right">
										<IconButton
											component={Link}
											sx={{ mr: 3 }}
											to={`/read-aircraft/${aircraft.id}`}>
											<Tooltip title="View aircraft  details" arrow>
												<ReadMoreIcon color="primary" />
											</Tooltip>
										</IconButton>

										<IconButton component={Link} sx={{ mr: 3 }} to={`../update-aircraft/${aircraft.id}/`}>
											<EditIcon />
										</IconButton>

										<IconButton component={Link} sx={{ mr: 3 }} to={`../delete-aircraft/${aircraft.id}/`}>
											<DeleteForeverIcon sx={{ color: "red" }} />
										</IconButton>
									</TableCell>
                            </TableRow>
                        ))}
                </TableBody>
                </Table>
            </TableContainer>
            <Button disabled={page === 1} onClick={() => setPage(page-1)}>Previous</Button>
            <Button disabled={aircrafts.length < pageSize} onClick={() => setPage(page + 1)}>Next</Button>
            </>
        )}
    </Container>
    );
  };