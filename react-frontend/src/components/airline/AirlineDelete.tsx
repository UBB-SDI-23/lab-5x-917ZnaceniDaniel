import { Container, Card, CardContent, IconButton, CardActions, Button } from "@mui/material";
import { Link, useNavigate, useParams } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import axios from "axios";
import { BACKEND_API_URL } from "../../constants";

export const AirlineDelete = () => {
    const {airlineId} = useParams();
	console.log(airlineId);
    const navigate = useNavigate();

    const handleDelete = async(event: {preventDefault: () => void}) => {
		console.log(`Deleting airline with ID: ${airlineId}`);
        event.preventDefault();
        await axios.delete(`${BACKEND_API_URL}/delete-airline/${airlineId}/`);
        navigate("/list-airline");
    };

    const handleCancel = (event: {preventDefault: () => void}) => {
        event.preventDefault();
        navigate("/list-airline");
    }

    return (
		<Container>
			<Card>
				<CardContent>
					<IconButton component={Link} sx={{ mr: 3 }} to={`/list-airline`}>
						<ArrowBackIcon />
					</IconButton>{" "}
					Are you sure you want to delete this airline? This cannot be undone!
				</CardContent>
				<CardActions>
					<Button onClick={handleDelete}>Delete airline</Button>
					<Button onClick={handleCancel}>Cancel</Button>
				</CardActions>
			</Card>
		</Container>
	);
}