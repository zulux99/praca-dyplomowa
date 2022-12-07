import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { isBrowser } from "react-device-detect";
import { mainMenuPagesArrayUser } from "./DrawerComponent";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsIcon from "@mui/icons-material/Notifications";
import PersonIcon from "@mui/icons-material/Person";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

function ToolbarComponent() {
  let location = useLocation();
  const [currentPath, setCurrentPath] = useState(location.pathname);
  const [name, setName] = useState(null);

  useEffect(() => {
    setCurrentPath(location.pathname);
  }, [location]);

  useEffect(() => {
    // get user data from localStorage
    const data = localStorage.getItem("user");
    if (JSON.parse(data).first_name !== null) {
      setName(JSON.parse(data).first_name);
    } else {
      setName(JSON.parse(data).username);
    }
  }, []);

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
          </Typography>
          <IconButton>
            <SearchIcon />
          </IconButton>
          <IconButton>
            <NotificationsIcon />
          </IconButton>
          <Box className="profil" onClick={() => console.log("klik")} sx={{ cursor: "pointer" }}>
            <IconButton>
              <PersonIcon />
            </IconButton>
            <Typography className="pasek-gorny-tytul" variant="h6" component="div" sx={{ flexGrow: 1 }}>
              {name}
            </Typography>
            <ExpandMoreIcon />
          </Box>
        </Toolbar>
      </Box>
    </>
  );
}

export default ToolbarComponent;
