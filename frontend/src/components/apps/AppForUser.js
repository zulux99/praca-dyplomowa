import { useContext, useState } from "react";
import AuthContext from "../../context/AuthContext";
import Container from "@mui/material/Container";
import ToolbarComponent from "../ToolbarComponent";
import CssBaseline from "@mui/material/CssBaseline";
import BottomMenu from "../menus/BottomMenu";
import { MobileView, isMobile, isBrowser } from "react-device-detect";
import MyRoutes from "../MyRoutes";
import DrawerComponent from "../DrawerComponent";
import AppForGuest from "./AppForGuest";

export default function AppForUser() {
  const user = useContext(AuthContext);
  const [openDrawer, setOpenDrawer] = useState(false);

  if (user.authTokens === null) {
    return (
      <>
        <AppForGuest />
      </>
    );
  }
  return (
    <>
      <CssBaseline />
      <ToolbarComponent open={openDrawer} setOpen={setOpenDrawer} />
      <DrawerComponent open={openDrawer} setOpen={setOpenDrawer} />
      <Container
        className="main"
        maxWidth={false}
        sx={{
          marginLeft: isBrowser && "256px",
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
    </>
  );
}
