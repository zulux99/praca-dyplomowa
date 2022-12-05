import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { isBrowser } from "react-device-detect";
import { mainMenuPagesArrayUser, mainMenuPagesArrayGuest } from "./DrawerComponent";

function ToolbarComponent() {
  let location = useLocation();
  const [currentPath, setCurrentPath] = useState(location.pathname);

  useEffect(() => {
    setCurrentPath(location.pathname);
  }, [location]);

  return (
    <>
      <Box>
        <Toolbar className="pasek-gorny-zawartosc" sx={{ marginLeft: isBrowser && "256px" }}>
          <Typography className="pasek-gorny-tytul" variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {mainMenuPagesArrayUser.map((item) => {
              if (item.link === currentPath) {
                return item.name;
              }
            })}
            {mainMenuPagesArrayGuest.map((item) => {
              if (item.link === currentPath) {
                return item.name;
              }
            })}
          </Typography>
        </Toolbar>
      </Box>
    </>
  );
}

export default ToolbarComponent;
