import { Box, AppBar, Toolbar, IconButton, Typography, Button } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import LocalAirportIcon from '@mui/icons-material/LocalAirport';
import FlightLandIcon from '@mui/icons-material/FlightLand';
import AirlinesIcon from '@mui/icons-material/Airlines';
import ConnectingAirportsIcon from '@mui/icons-material/ConnectingAirports';
import HailIcon from '@mui/icons-material/Hail';
import AirplaneTicketIcon from '@mui/icons-material/AirplaneTicket';

export const AppMenu = () => {
    const location = useLocation();
    const path = location.pathname;
    return (
<Box sx={{ flexGrow: 1 }}>
			<AppBar position="static" sx={{ marginBottom: "20px" }}>
				<Toolbar>
					<IconButton
						component={Link}
						to="/"
						size="large"
						edge="start"
						color="inherit"
						aria-label="school"
						sx={{ mr: 2 }}>
						<FlightLandIcon />
					</IconButton>
					<Typography variant="h6" component="div" sx={{ mr: 5 }}>
						Airport management
					</Typography>
					<Button
						variant={path.startsWith("/list-airport") ? "outlined" : "text"}
						to="/list-airport"
						component={Link}
						color="inherit"
						sx={{ mr: 5 }}
						startIcon={<LocalAirportIcon />}>
						Airports
					</Button>

					<Button
						variant={path.startsWith("/list-airline") ? "outlined" : "text"}
						to="/list-airline"
						component={Link}
						color="inherit"
						sx={{ mr: 5 }}
						startIcon={<ConnectingAirportsIcon />}>
						Airlines
					</Button>

					<Button
						variant={path.startsWith("/list-aircraft") ? "outlined" : "text"}
						to="/list-aircraft"
						component={Link}
						color="inherit"
						sx={{ mr: 5 }}
						startIcon={<LocalAirportIcon />}>
						Aircrafts
					</Button>

					<Button
						variant={path.startsWith("/list-flight") ? "outlined" : "text"}
						to="/list-flight"
						component={Link}
						color="inherit"
						sx={{ mr: 5 }}
						startIcon={<ConnectingAirportsIcon />}>
						Flights
					</Button>

					<Button
						variant={path.startsWith("/list-passenger") ? "outlined" : "text"}
						to="/list-passenger"
						component={Link}
						color="inherit"
						sx={{ mr: 5 }}
						startIcon={<HailIcon />}>
						Passengers
					</Button>

					<Button
						variant={path.startsWith("/list-ticket") ? "outlined" : "text"}
						to="/list-ticket"
						component={Link}
						color="inherit"
						sx={{ mr: 5 }}
						startIcon={<AirplaneTicketIcon />}>
						Tickets
					</Button>

					<Button
						variant={path.startsWith("/airline-stats") ? "outlined" : "text"}
						to="/airline-stats"
						component={Link}
						color="inherit"
						sx={{ mr: 5 }}
						startIcon={<AirlinesIcon />}>
						Top 3 Airlines ordered by their anual revenue
					</Button>
				</Toolbar>
			</AppBar>
		</Box>
	);
};