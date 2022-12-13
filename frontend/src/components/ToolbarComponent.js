import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { isBrowser, BrowserView } from "react-device-detect";
import { mainMenuPagesArrayUser } from "./DrawerComponent";
import IconButton from "@mui/material/IconButton";
import PersonIcon from "@mui/icons-material/Person";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ProfileMenu from "./menus/ProfileMenu";
import MenuIcon from "@mui/icons-material/Menu";

function ToolbarComponent(props) {
  let location = useLocation();
  const [currentPath, setCurrentPath] = useState(location.pathname);
  const [name, setName] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => {
    setCurrentPath(location.pathname);
  }, [location]);

  useEffect(() => {
    const data = localStorage.getItem("user");
    if (JSON.parse(data).first_name !== "") {
      setName(JSON.parse(data).first_name);
    } else {
      setName(JSON.parse(data).username);
    }
  }, []);

  useEffect(() => {
    console.log("open: ", props.open);
  }, [props.open]);

  const clickOnProfile = (event) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <>
      <Box>
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
