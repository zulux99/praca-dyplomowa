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
          <Link to="/register">
            <Button variant="contained" color="success" size="large" fullWidth>
              Zarejestruj się
            </Button>
          </Link>
          <Link to="/login">
            <Button variant="contained" color="success" size="large" fullWidth>
              Zaloguj się
            </Button>
          </Link>
        </Box>
      )}
    </Box>
  );
}
