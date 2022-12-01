import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "../context/AuthContext";
import "react-toastify/dist/ReactToastify.css";
import "../css/Main.css";
import Container from "@mui/material/Container";
import Navbar from "./Navbar";
import CssBaseline from "@mui/material/CssBaseline";
import BottomMenu from "./BottomMenu";
import { MobileView, isMobile } from "react-device-detect";
import MyRoutes from "./MyRoutes";
import OfflinePage from "./OfflinePage";

function App() {
  if (navigator.onLine) {
  } else {
    return <OfflinePage />;
  }
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <div>
            <CssBaseline />
            <Navbar />
          </div>
          <Container
            className="main"
            maxWidth={false}
            sx={{
              marginTop: "64px",
              padding: "16px",
              marginBottom: isMobile ? "56px" : "0",
            }}>
            <MyRoutes />
            <footer>
              <MobileView>
                <BottomMenu />
              </MobileView>
            </footer>
          </Container>
        </AuthProvider>
      </BrowserRouter>
    </>
  );
}
export default App;
