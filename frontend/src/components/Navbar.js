import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import EarbudsIcon from "@mui/icons-material/Earbuds";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import Divider from "@mui/material/Divider";
import { ListItemText, SwipeableDrawer } from "@mui/material";
function Navbar() {
  const { user, logoutUser } = useContext(AuthContext);
  const [isNavExpanded, setIsNavExpanded] = useState(false);
  const navBarPagesArray = [
    { link: "/", name: "Strona główna" },
    { link: "/bills", name: "Rachunki" },
    { link: "/register", name: "Zarejestruj się" },
    { link: "/login", name: "Zaloguj się" },
  ];
  const handleMenu = () => {};
  return (
    <>
      <Box>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="medium"
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={() => setIsNavExpanded(!isNavExpanded)}>
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              <Link to="/" underline="none" style={{ textDecoration: "none", color: "black" }}>
                Budżet domowy
              </Link>
            </Typography>
            <IconButton
              size="large"
              aria-label="konto aktualnego użytkownika"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              align="right"
              onClick={handleMenu}
              color="inherit">
              {user ? (
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                  {user.username}
                </Typography>
              ) : (
                <AccountCircle />
              )}
            </IconButton>
          </Toolbar>
        </AppBar>
        <SwipeableDrawer
          open={isNavExpanded}
          onClose={() => setIsNavExpanded(false)}
          onOpen={() => setIsNavExpanded(true)}>
          <Box onClick={() => setIsNavExpanded(!isNavExpanded)} sx={{ justifyContent: "right" }}>
            <IconButton>
              <ArrowBackIcon />
            </IconButton>
          </Box>
          <Divider />
          <List>
            {navBarPagesArray.map((page, index) => (
              <ListItem key={index} disablePadding>
                <ListItemButton sx={{ justifyContent: "center" }}>
                  <ListItemIcon>
                    <EarbudsIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary={page.name}
                    style={isNavExpanded ? { display: "block" } : { display: "none" }}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </SwipeableDrawer>
      </Box>
    </>
  );
}

export default Navbar;
