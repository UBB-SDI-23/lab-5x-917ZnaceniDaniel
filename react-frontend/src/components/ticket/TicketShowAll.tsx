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
import { Ticket } from "../../models/Ticket";
import ReadMoreIcon from "@mui/icons-material/ReadMore";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import AddIcon from "@mui/icons-material/Add";
import { Link } from "react-router-dom";
import { BACKEND_API_URL } from "../../constants";
import { Paginator } from "../pagination/pagination";

export const TicketShowAll = () => {
  const [loading, setLoading] = useState(true);
  const [tickets, setTickets] = useState([]);
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

  const fetchTickets = async () => {
    setLoading(true);
    const response = await fetch(
      `${BACKEND_API_URL}/list-ticket/?page=${page}&page_size=${pageSize}`
    );
    const { count, next, previous, results } = await response.json();
    setTickets(results);
    setLoading(false);

    setTotalRows(count);
    setIsLastPage(!next);
  };

  useEffect(() => {
    fetchTickets();
  }, [page]);

  console.log(tickets);

  // const sortAircrafts = () => {
  //     const sortedAircrafts = [...tickets].sort((a: Aircraft, b:Aircraft) => {
  //         if (a.wing_span < b.wing_span) {
  //             return -1;
  //         }
  //         if (a.wing_span > b.wing_span) {
  //             return 1;
  //         }
  //         return 0;
  //     });
  //     console.log(sortedAircrafts);
  //     setTickets(sortedAircrafts);
  // }

  return (
    <Container>
      <h1>All Tickets</h1>
      {loading && <CircularProgress />}

      {!loading && tickets.length == 0 && <div>No tickets found!</div>}

      {!loading && (
        <IconButton component={Link} sx={{ mr: 3 }} to={`../create-ticket/`}>
          <Tooltip title="Add a new ticket" arrow>
            <AddIcon color="primary" />
          </Tooltip>
        </IconButton>
      )}

      {/* {!loading && (
            <Button sx={{color:"red"}} onClick={sortAircrafts}>
                Sort Aircrafts
            </Button>
        )} */}

      {!loading && tickets.length > 0 && (
        <>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 900 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>#</TableCell>
                  <TableCell align="center">Flight</TableCell>
                  <TableCell align="center">Passenger</TableCell>
                  <TableCell align="center">Seat Number</TableCell>
                  <TableCell align="center">Booking Date</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {tickets.map((ticket: Ticket, index) => (
                  <TableRow key={ticket.id}>
                    <TableCell component="th" scope="row">
                      {index + current}
                    </TableCell>
                    <TableCell align="center">
                      {ticket.flight.call_sign}
                    </TableCell>
                    <TableCell align="center">
                      {ticket.passenger.first_name} {ticket.passenger.last_name}
                    </TableCell>
                    <TableCell align="center">{ticket.seat_number}</TableCell>
                    <TableCell align="center">
                      {ticket.booking_date.toLocaleString()}
                    </TableCell>
                    <TableCell align="right">
                      <IconButton
                        component={Link}
                        sx={{ mr: 3 }}
                        to={`/read-ticket/${ticket.id}`}
                      >
                        <Tooltip title="View Ticket  details" arrow>
                          <ReadMoreIcon color="primary" />
                        </Tooltip>
                      </IconButton>

                      <IconButton
                        component={Link}
                        sx={{ mr: 3 }}
                        to={`../update-ticket/${ticket.id}/`}
                      >
                        <EditIcon />
                      </IconButton>

                      <IconButton
                        component={Link}
                        sx={{ mr: 3 }}
                        to={`../delete-ticket/${ticket.id}/`}
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
            disabled={tickets.length < pageSize}
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
