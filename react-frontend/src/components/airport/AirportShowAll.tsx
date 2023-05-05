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
  Button,
} from "@mui/material";

import { useEffect, useState } from "react";
import { Airport } from "../../models/Airport";
import ReadMoreIcon from "@mui/icons-material/ReadMore";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import AddIcon from "@mui/icons-material/Add";
import { Link } from "react-router-dom";
import { BACKEND_API_URL } from "../../constants";
import { Paginator } from "../pagination/pagination";

export const AirportShowAll = () => {
  const [loading, setLoading] = useState(true);
  const [airports, setAirport] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const current = (page - 1) * pageSize + 1;
  const [isLastPage, setIsLastPage] = useState(false);
  const [totalRows, setTotalRows] = useState(0);

  const setCurrentPage = (newPage: number) => {
    setPage(newPage);
  };

  const goToNextPage = () => {
    if (isLastPage) {
      return;
    }

    setPage(page + 1);
  };

  const goToPrevPage = () => {
    if (page === 1) {
      return;
    }

    setPage(page - 1);
  };

  // {console.log(BACKEND_API_URL)}
  const fetchAirports = async () => {
    setLoading(true);
    const response = await fetch(
      `${BACKEND_API_URL}/list-airport/?page=${page}&page_size=${pageSize}`
    );
    const { count, next, previous, results } = await response.json();
    setAirport(results);
    setLoading(false);

    setTotalRows(count);
    setIsLastPage(!next);
  };

  useEffect(() => {
    fetchAirports();
  }, [page]);

  console.log(airports);

  const sortAirports = () => {
    const sortedAirports = [...airports].sort((a: Airport, b: Airport) => {
      if (a.no_terminals < b.no_terminals) {
        return -1;
      }
      if (a.no_terminals > b.no_terminals) {
        return 1;
      }
      return 0;
    });
    console.log(sortedAirports);
    setAirport(sortedAirports);
  };

  return (
    <Container>
      <h1>All Airports</h1>
      {loading && <CircularProgress />}

      {!loading && airports.length == 0 && <div>No airports found!</div>}

      {!loading && (
        <IconButton component={Link} sx={{ mr: 3 }} to={`../create-airport/`}>
          <Tooltip title="Add a new airport" arrow>
            <AddIcon color="primary" />
          </Tooltip>
        </IconButton>
      )}

      {!loading && (
        <Button sx={{ color: "red" }} onClick={sortAirports}>
          Sort Airports
        </Button>
      )}

      {!loading && airports.length > 0 && (
        <>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 900 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>#</TableCell>
                  <TableCell align="center">Name</TableCell>
                  <TableCell align="center">City</TableCell>
                  <TableCell align="center">Country</TableCell>
                  <TableCell align="center">Timezone</TableCell>
                  <TableCell align="center">Elevation</TableCell>
                  <TableCell align="center">Capacity</TableCell>
                  <TableCell align="center">noGates</TableCell>
                  <TableCell align="center">noTerminals</TableCell>
                  <TableCell align="center">countDeparting</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {airports.map((airport: Airport, index) => (
                  <TableRow key={airport.id}>
                    <TableCell component="th" scope="row">
                      {index + current}
                    </TableCell>
                    <TableCell align="center">{airport.name}</TableCell>
                    <TableCell align="center">{airport.city}</TableCell>
                    <TableCell align="center">{airport.country}</TableCell>
                    <TableCell align="center">{airport.timezone}</TableCell>
                    <TableCell align="center">{airport.elevation}</TableCell>
                    <TableCell align="center">{airport.capacity}</TableCell>
                    <TableCell align="center">{airport.no_gates}</TableCell>
                    <TableCell align="center">{airport.no_terminals}</TableCell>
                    <TableCell align="center">{airport.no_departing}</TableCell>
                    <TableCell align="right">
                      <IconButton
                        component={Link}
                        sx={{ mr: 3 }}
                        to={`/read-airport/${airport.id}`}
                      >
                        <Tooltip title="View airport  details" arrow>
                          <ReadMoreIcon color="primary" />
                        </Tooltip>
                      </IconButton>

                      <IconButton
                        component={Link}
                        sx={{ mr: 3 }}
                        to={`../update-airport/${airport.id}/`}
                      >
                        <EditIcon />
                      </IconButton>

                      <IconButton
                        component={Link}
                        sx={{ mr: 3 }}
                        to={`../delete-airport/${airport.id}/`}
                      >
                        <DeleteForeverIcon sx={{ color: "red" }} />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          {/* <Button disabled={page === 1} onClick={() => setPage(page - 1)}>
            Previous
          </Button>
          <Button
            disabled={airports.length < pageSize}
            onClick={() => setPage(page + 1)}
          >
            Next
          </Button> */}
          <Paginator
            rowsPerPage={pageSize}
            totalRows={totalRows}
            currentPage={page}
            isFirstPage={page === 1}
            isLastPage={isLastPage}
            setPage={setCurrentPage}
            goToNextPage={goToNextPage}
            goToPrevPage={goToPrevPage}
          />
        </>
      )}
    </Container>
  );
};
