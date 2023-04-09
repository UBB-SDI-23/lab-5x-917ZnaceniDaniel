import { Box, AppBar, Toolbar, IconButton, Typography, Button } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import LocalAirportIcon from '@mui/icons-material/LocalAirport';
import FlightLandIcon from '@mui/icons-material/FlightLand';
import AirlinesIcon from '@mui/icons-material/Airlines';

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