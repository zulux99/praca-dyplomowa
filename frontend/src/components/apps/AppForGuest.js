import CssBaseline from "@mui/material/CssBaseline";
import { useLocation } from "react-router-dom";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import "../../css/Guest.css";
import Login from "../Login";
import Register from "../Register";
import { isMobile, isBrowser } from "react-device-detect";
import StartingPage from "../StartingPage";

export default function AppForGuest() {
  const location = useLocation();

  if (isMobile) {
    return (
      <>
        <Container className="startowa-mobile">
          <CssBaseline />
          {location.pathname === "/login" && <Login />}
          {location.pathname === "/register" && <Register />}
          {location.pathname !== "/login" && location.pathname !== "/register" && <StartingPage />}
        </Container>
      </>
    );
  }

  if (isBrowser) {
    return (
      <>
        <CssBaseline />
        <Container className="startowa-browser">
          <Box className="strona">
            <StartingPage />
            {location.pathname === "/register" ? <Register /> : <Login />}
          </Box>
        </Container>
      </>
    );
  }
}
