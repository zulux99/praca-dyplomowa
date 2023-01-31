import { useEffect, useState, useContext } from "react";
import AuthContext from "../context/AuthContext";
import { useLocation } from "react-router-dom";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { isBrowser, isMobile, BrowserView } from "react-device-detect";
import { mainMenuPagesArrayUser } from "./DrawerComponent";
import IconButton from "@mui/material/IconButton";
import PersonIcon from "@mui/icons-material/Person";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ProfileMenu from "./menus/ProfileMenu";
import MenuIcon from "@mui/icons-material/Menu";

function ToolbarComponent(props) {
  let location = useLocation();
  const user = useContext(AuthContext);
  const [currentPath, setCurrentPath] = useState(location.pathname);
  const [name, setName] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => {
    setCurrentPath(location.pathname);
  }, [location]);

  useEffect(() => {
    const data = localStorage.getItem("user");
    if (data === null) {
      return;
    }
    if (JSON.parse(data).first_name !== "") {
      setName(JSON.parse(data).first_name);
    } else {
      setName(JSON.parse(data).username);
    }
  }, [user]);

  const clickOnProfile = (event) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <>
      <Box
        sx={{
          position: isMobile && "fixed",
          width: "100%",
          zIndex: isMobile && 1000,
        }}>
        <Toolbar className="pasek-gorny-zawartosc" sx={{ marginLeft: isBrowser && "256px" }}>
          <IconButton
            className="pasek-gorny-menu"
            sx={{ display: isBrowser && "none" }}
            onClick={() => props.setOpen(true)}>
            <MenuIcon />
          </IconButton>
          <BrowserView>
            <Typography className="pasek-gorny-tytul" variant="h6" component="div" sx={{ flexGrow: 1 }}>
              {mainMenuPagesArrayUser.map((item) => {
                if (item.link === currentPath) {
                  return item.name;
                }
              })}
            </Typography>
          </BrowserView>
          {/* <IconButton>
            <SearchIcon />
          </IconButton>
          <IconButton>
            <NotificationsIcon />
          </IconButton> */}
          <Box className="profil" sx={{ cursor: "pointer" }} onClick={clickOnProfile}>
            <IconButton>
              <PersonIcon />
            </IconButton>
            <Typography className="pasek-gorny-tytul" variant="h6" component="div" sx={{ flexGrow: 1 }}>
              {name}
            </Typography>
            <ExpandMoreIcon />
          </Box>
          <ProfileMenu anchorEl={anchorEl} setAnchorEl={setAnchorEl} />
        </Toolbar>
      </Box>
    </>
  );
}

export default ToolbarComponent;
