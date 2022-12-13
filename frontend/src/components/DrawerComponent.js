import { useContext, useState } from "react";
import AuthContext from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
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

export const mainMenuPagesArrayUser = [
  { link: "/", name: "Panel" },
  { link: "/incomes", name: "Przychody" },
  { link: "/expenses", name: "Wydatki" },
  { link: "/categories", name: "Kategorie" },
  { link: "/accounts", name: "Konta" },
  { link: "/debtors", name: "Dłużnicy" },
];

export default function DrawerComponent(props) {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [selectedMenuItem, setSelectedMenuItem] = useState(window.location.pathname);
  return (
    <Drawer
      variant={isBrowser ? "permanent" : "temporary"}
      open={props.open}
      onClose={() => props.setOpen(false)}
      className="boczne-menu">
      <Box
        className="boczne-menu-naglowek-tlo"
        onClick={() => {
          navigate("/");
          props.setOpen(false);
        }}
        sx={{ cursor: "pointer" }}>
        <ListItemButton sx={{ justifyContent: "center" }}>
          <Typography variant="h2" className="boczne-menu-naglowek">
            e-Budget
          </Typography>
        </ListItemButton>
      </Box>
      <List>
        {user &&
          mainMenuPagesArrayUser.map((page, index) => (
            <ListItem key={index} disablePadding selected={window.location.pathname === page.link}>
              <Link
                key={index}
                to={page.link}
                onClick={() => {
                  props.setOpen(false);
                  setSelectedMenuItem(page.link);
                }}
                className="boczne-menu-link">
                <ListItemButton sx={{ justifyContent: "center" }}>
                  <ListItemIcon>
                    <EarbudsIcon sx={window.location.pathname === page.link ? { color: "lime" } : {}} />
                  </ListItemIcon>
                  <ListItemText primary={page.name} />
                </ListItemButton>
              </Link>
            </ListItem>
          ))}
      </List>
    </Drawer>
  );
}
