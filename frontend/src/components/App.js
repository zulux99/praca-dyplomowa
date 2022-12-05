import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "../context/AuthContext";
import "react-toastify/dist/ReactToastify.css";
import "../css/Main.css";
import Container from "@mui/material/Container";
import ToolbarComponent from "./ToolbarComponent";
import CssBaseline from "@mui/material/CssBaseline";
import BottomMenu from "./BottomMenu";
import { MobileView, isMobile, isBrowser } from "react-device-detect";
import MyRoutes from "./MyRoutes";
import OfflinePage from "./OfflinePage";
import DrawerComponent from "./DrawerComponent";

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
            <ToolbarComponent />
            <DrawerComponent />
          </div>
          <Container
            className="main"
            maxWidth={false}
            sx={{
              marginLeft: isBrowser && "256px",
              padding: "16px",
              marginBottom: isMobile ? "56px" : "0",
              width: isMobile ? "100%" : "calc(100% - 256px)",
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
