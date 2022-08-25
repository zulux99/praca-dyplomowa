import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";

import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";

import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";
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
      <Box sx={{ flexGrow: 1 }}>
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
              Photos
            </Typography>
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
          </Toolbar>
        </AppBar>
      </Box>
      <div className="main">
        {user && <a onClick={logoutUser}>Logout</a>}
        <div
          className="closing_side_bar"
          style={isNavExpanded ? { display: "block" } : { display: "none" }}
          onClick={() => setIsNavExpanded(false)}></div>
        <nav className="nav">
          <a href="#" className="brand">
            Budżet domowy
          </a>
          <ul className="nav_menu">
            {navBarPagesArray.map((item, index) => {
              return (
                <div className="nav_link" key={index}>
                  <li key={index}>
                    <Link to={item.link}>{item.name}</Link>
                  </li>
                </div>
              );
            })}
          </ul>
          <div
            className="nav_toggler"
            onClick={() => {
              isNavExpanded ? setIsNavExpanded(false) : setIsNavExpanded(true);
            }}>
            {[...Array(3)].map((x, index) => (
              <div className={isNavExpanded ? "line line2" : "line"} key={index}></div>
            ))}
          </div>
        </nav>
        <div className="side_nav" style={isNavExpanded ? { width: "60%" } : { right: "-70%" }}>
          <div className="side_nav_list">
            <ul>
              {navBarPagesArray.map((item, index) => {
                return (
                  <div className="side_nav_link" onClick={() => setIsNavExpanded(false)} key={index}>
                    <li key={index}>
                      <Link to={item.link}>{item.name}</Link>
                    </li>
                  </div>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
