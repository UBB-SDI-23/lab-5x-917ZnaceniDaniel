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
import { Passenger } from "../../models/Passenger";
import ReadMoreIcon from "@mui/icons-material/ReadMore";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import AddIcon from "@mui/icons-material/Add";
import { Link } from "react-router-dom";
import { BACKEND_API_URL } from "../../constants";
import { Paginator } from "../pagination/pagination";

export const PassengerShowAll = () => {
  const [loading, setLoading] = useState(true);
  const [passengers, setPassenger] = useState([]);
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
  const fetchPassengers = async () => {
    setLoading(true);
    const response = await fetch(
      `${BACKEND_API_URL}/list-passenger/?page=${page}&page_size=${pageSize}`
    );
    const { count, next, previous, results } = await response.json();
    setPassenger(results);
    setLoading(false);

    setTotalRows(count);
    setIsLastPage(!next);
  };

  useEffect(() => {
    fetchPassengers();
  }, [page]);

  console.log(passengers);

  // const sortAirports = () => {
  //     const sortedAirports = [...passengers].sort((a: Airport, b:Airport) => {
  //         if (a.no_terminals < b.no_terminals) {
  //             return -1;
  //         }
  //         if (a.no_terminals > b.no_terminals) {
  //             return 1;
  //         }
  //         return 0;

  //     })
  //     console.log(sortedAirports);
  //     setPassenger(sortedAirports);
  // }

  return (
    <Container>
      <h1>All Passengers</h1>
      {loading && <CircularProgress />}

      {!loading && passengers.length == 0 && <div>No passenger found!</div>}

      {!loading && (
        <IconButton component={Link} sx={{ mr: 3 }} to={`../create-passenger/`}>
          <Tooltip title="Add a new passenger" arrow>
            <AddIcon color="primary" />
          </Tooltip>
        </IconButton>
      )}

      {/* {!loading && (
            <Button sx={{color:"red"}} onClick={sortAirports}>
                Sort Airports
            </Button>
        )} */}

      {!loading && passengers.length > 0 && (
        <>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 900 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>#</TableCell>
                  <TableCell align="center">First Name</TableCell>
                  <TableCell align="center">Last Name</TableCell>
                  <TableCell align="center">Email</TableCell>
                  <TableCell align="center">Phone Number</TableCell>
                  <TableCell align="center">Citizenship</TableCell>
                  <TableCell align="center">Description</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {passengers.map((passenger: Passenger, index) => (
                  <TableRow key={passenger.id}>
                    <TableCell component="th" scope="row">
                      {index + current}
                    </TableCell>
                    <TableCell align="center">{passenger.first_name}</TableCell>
                    <TableCell align="center">{passenger.last_name}</TableCell>
                    <TableCell align="center">{passenger.email}</TableCell>
                    <TableCell align="center">
                      {passenger.phone_number}
                    </TableCell>
                    <TableCell align="center">
                      {passenger.citizenship}
                    </TableCell>
                    <TableCell align="center">
                      {passenger.description}
                    </TableCell>
                    <TableCell align="right">
                      <IconButton
                        component={Link}
                        sx={{ mr: 3 }}
                        to={`/read-passenger/${passenger.id}`}
                      >
                        <Tooltip title="View passenger  details" arrow>
                          <ReadMoreIcon color="primary" />
                        </Tooltip>
                      </IconButton>

                      <IconButton
                        component={Link}
                        sx={{ mr: 3 }}
                        to={`../update-passenger/${passenger.id}/`}
                      >
                        <EditIcon />
                      </IconButton>

                      <IconButton
                        component={Link}
                        sx={{ mr: 3 }}
                        to={`../delete-passenger/${passenger.id}/`}
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
            disabled={passengers.length < pageSize}
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
