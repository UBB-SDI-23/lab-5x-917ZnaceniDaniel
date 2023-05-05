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
import { Airline } from "../../models/Airline";
import ReadMoreIcon from "@mui/icons-material/ReadMore";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import AddIcon from "@mui/icons-material/Add";
import { Link } from "react-router-dom";
import { BACKEND_API_URL } from "../../constants";
import { Paginator } from "../pagination/pagination";

export const AirlineShowAll = () => {
  const [loading, setLoading] = useState(true);
  const [airlines, setAirlines] = useState([]);
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
  const fetchAirlines = async () => {
    setLoading(true);
    const response = await fetch(
      `${BACKEND_API_URL}/list-airline/?page=${page}&page_size=${pageSize}`
    );
    const { count, next, previous, results } = await response.json();
    setAirlines(results);
    setLoading(false);

    setTotalRows(count);
    setIsLastPage(!next);
  };

  useEffect(() => {
    fetchAirlines();
  }, [page]);

  console.log(airlines);

  const sortAirlines = () => {
    const sortedAirlines = [...airlines].sort((a: Airline, b: Airline) => {
      if (a.revenue < b.revenue) {
        return -1;
      }
      if (a.revenue > b.revenue) {
        return 1;
      }
      return 0;
    });
    console.log(sortedAirlines);
    setAirlines(sortedAirlines);
  };

  return (
    <Container>
      <h1>All Airlines</h1>
      {loading && <CircularProgress />}

      {!loading && airlines.length == 0 && <div>No airlines found!</div>}

      {!loading && (
        <IconButton component={Link} sx={{ mr: 3 }} to={`../create-airline/`}>
          <Tooltip title="Add a new airline" arrow>
            <AddIcon color="primary" />
          </Tooltip>
        </IconButton>
      )}

      {!loading && (
        <Button sx={{ color: "red" }} onClick={sortAirlines}>
          Sort Airlines
        </Button>
      )}

      {!loading && airlines.length > 0 && (
        <>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 900 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>#</TableCell>
                  <TableCell align="center">Name</TableCell>
                  <TableCell align="center">Headquarters</TableCell>
                  <TableCell align="center">Website</TableCell>
                  <TableCell align="center">Established Date</TableCell>
                  <TableCell align="center">Revenue</TableCell>
                  <TableCell align="center">Employee Count</TableCell>
                  <TableCell align="center">count Aircrafts</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {airlines.map((airline: Airline, index) => (
                  <TableRow key={airline.id}>
                    <TableCell component="th" scope="row">
                      {index + current}
                    </TableCell>
                    <TableCell align="center">{airline.name}</TableCell>
                    <TableCell align="center">{airline.headquarters}</TableCell>
                    <TableCell align="center">{airline.website}</TableCell>
                    <TableCell align="center">
                      {airline.established_date.toLocaleString()}
                    </TableCell>
                    <TableCell align="center">{airline.revenue}</TableCell>
                    <TableCell align="center">
                      {airline.num_employees}
                    </TableCell>
                    <TableCell align="center">{airline.no_aircrafts}</TableCell>
                    <TableCell align="right">
                      <IconButton
                        component={Link}
                        sx={{ mr: 3 }}
                        to={`/read-airline/${airline.id}`}
                      >
                        <Tooltip title="View airline  details" arrow>
                          <ReadMoreIcon color="primary" />
                        </Tooltip>
                      </IconButton>

                      <IconButton
                        component={Link}
                        sx={{ mr: 3 }}
                        to={`../update-airline/${airline.id}/`}
                      >
                        <EditIcon />
                      </IconButton>

                      <IconButton
                        component={Link}
                        sx={{ mr: 3 }}
                        to={`../delete-airline/${airline.id}/`}
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
            disabled={airlines.length < pageSize}
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
