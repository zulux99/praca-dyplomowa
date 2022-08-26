import { useContext, useState } from "react";
import { Link } from "react-router-dom";
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
import AuthContext from "../context/AuthContext";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import { Button } from "@mui/material";
function Navbar() {
  const { user, logoutUser } = useContext(AuthContext);
  const [isNavExpanded, setIsNavExpanded] = useState(false);
  const navBarPagesArray = [
    { link: "/", name: "Strona główna" },
    { link: "/rachunki", name: "Rachunki" },
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
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={() => setIsNavExpanded(!isNavExpanded)}>
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              <Link to="/">Budżet domowy</Link>
            </Typography>
            {user ? (
              <IconButton
                size="large"
                aria-label="konto aktualnego użytkownika"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                align="right"
                onClick={handleMenu}
                color="inherit">
                <AccountCircle />
              </IconButton>
            ) : (
              <Button sx={{ height: "100%" }}>
                <Typography variant="h6" component="div">
                  <Link to="/login" className="link">
                    Zaloguj się
                  </Link>
                </Typography>
              </Button>
            )}
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
                <Link key={index} to={page.link} onClick={() => setIsNavExpanded(false)}>
                  <ListItemButton sx={{ justifyContent: "center" }}>
                    <ListItemIcon>
                      <EarbudsIcon />
                    </ListItemIcon>
                    <ListItemText primary={page.name} />
                  </ListItemButton>
                </Link>
              </ListItem>
            ))}
            <ListItem disablePadding onClick={logoutUser}>
              <ListItemButton sx={{ justifyContent: "center" }} onClick={() => setIsNavExpanded(false)}>
                <ListItemIcon>
                  <EarbudsIcon />
                </ListItemIcon>
                <ListItemText primary="Wyloguj się" />
              </ListItemButton>
            </ListItem>
          </List>
        </SwipeableDrawer>
      </Box>
    </>
  );
}

export default Navbar;
