import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import loginBackground from "../loginBackground.jpg";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { isMobile } from "react-device-detect";

export default function StartingPage() {
  return (
    <Box
      className="zdjecie"
      sx={{
        backgroundImage: `url(${loginBackground})`,
      }}>
      <Typography variant="h1">e-Budget</Typography>
      <Typography variant="h2">Pieniądze pod kontrolą</Typography>
      <Typography variant="h3">Zarejestruj się już dziś i miej kontrolę nad finansami!</Typography>
      {isMobile && (
        <Box className="buttons">
          <Button variant="contained" color="success" href="/register" size="large" fullWidth>
            <Link to="/register">Zarejestruj się</Link>
          </Button>
          <Button variant="contained" color="success" size="large" fullWidth>
            <Link to="/login">Zaloguj się</Link>
          </Button>
        </Box>
      )}
    </Box>
  );
}
