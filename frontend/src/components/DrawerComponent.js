import { useContext, useState } from "react";
import AuthContext from "../context/AuthContext";
import { Link } from "react-router-dom";
import EarbudsIcon from "@mui/icons-material/Earbuds";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Drawer from "@mui/material/Drawer";
import { isBrowser } from "react-device-detect";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export const mainMenuPagesArrayGuest = [{ link: "/login", name: "Zaloguj się" }];

export const mainMenuPagesArrayUser = [
  { link: "/", name: "Strona główna" },
  { link: "/accounts", name: "Konta" },
  { link: "/incomes", name: "Przychody" },
  { link: "/expenses", name: "Wydatki" },
  { link: "/debtors", name: "Dłużnicy" },
  { link: "/categories", name: "Kategorie" },
];

export default function DrawerComponent() {
  const { user, logoutUser } = useContext(AuthContext);
  const [isNavExpanded, setIsNavExpanded] = useState(false);
  const [selectedMenuItem, setSelectedMenuItem] = useState(window.location.pathname);
  return (
    <Drawer
      variant={isBrowser ? "permanent" : "temporary"}
      open={isNavExpanded}
      onClose={() => setIsNavExpanded(false)}
      onOpen={() => setIsNavExpanded(true)}
      className="boczne-menu">
      <Box className="boczne-menu-naglowek-tlo" onClick={() => setIsNavExpanded(!isNavExpanded)}>
        <Typography variant="h2" className="boczne-menu-naglowek">
          e-Budget
        </Typography>
      </Box>
      <List>
        {user
          ? mainMenuPagesArrayUser.map((page, index) => (
              <ListItem key={index} disablePadding selected={selectedMenuItem === page.link}>
                <Link
                  key={index}
                  to={page.link}
                  onClick={() => {
                    setIsNavExpanded(false);
                    setSelectedMenuItem(page.link);
                  }}
                  className="boczne-menu-link">
                  <ListItemButton sx={{ justifyContent: "center" }}>
                    <ListItemIcon>
                      <EarbudsIcon sx={selectedMenuItem === page.link ? { color: "lime" } : {}} />
                    </ListItemIcon>
                    <ListItemText primary={page.name} />
                  </ListItemButton>
                </Link>
              </ListItem>
            ))
          : mainMenuPagesArrayGuest.map((page, index) => (
              <Link key={index} to={page.link} onClick={() => setIsNavExpanded(false)} className="boczne-menu-link">
                <ListItem key={index} disablePadding selected={selectedMenuItem === page.link}>
                  <ListItemButton sx={{ justifyContent: "center" }}>
                    <ListItemIcon>
                      <EarbudsIcon sx={selectedMenuItem === page.link ? { color: "lime" } : {}} />
                    </ListItemIcon>
                    <ListItemText primary={page.name} />
                  </ListItemButton>
                </ListItem>
              </Link>
            ))}
        {user && (
          <ListItem disablePadding onClick={logoutUser}>
            <ListItemButton sx={{ justifyContent: "center" }} onClick={() => setIsNavExpanded(false)}>
              <ListItemIcon>
                <EarbudsIcon />
              </ListItemIcon>
              <ListItemText primary="Wyloguj się" />
            </ListItemButton>
          </ListItem>
        )}
      </List>
    </Drawer>
  );
}
