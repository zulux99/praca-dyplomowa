import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Drawer from "@mui/material/Drawer";
import { isBrowser } from "react-device-detect";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import DashboardIcon from "@mui/icons-material/Dashboard";
import WalletIcon from "@mui/icons-material/Wallet";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import CategoryIcon from "@mui/icons-material/Category";
import GroupsIcon from "@mui/icons-material/Groups";

export const mainMenuPagesArrayUser = [
  { link: "/", name: "Panel", icon: <DashboardIcon /> },
  { link: "/incomes", name: "Przychody", icon: <AddCircleIcon /> },
  { link: "/expenses", name: "Wydatki", icon: <RemoveCircleIcon /> },
  { link: "/categories", name: "Kategorie", icon: <CategoryIcon /> },
  { link: "/accounts", name: "Konta", icon: <WalletIcon /> },
  { link: "/debtors", name: "Dłużnicy", icon: <GroupsIcon /> },
];

export default function DrawerComponent(props) {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
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
            <ListItem
              key={index}
              disablePadding
              selected={window.location.pathname === page.link}
              className={window.location.pathname === page.link ? "boczne-menu-link-aktywny" : ""}>
              <Link
                key={index}
                to={page.link}
                onClick={() => {
                  props.setOpen(false);
                }}
                className="boczne-menu-link">
                <ListItemButton sx={{ justifyContent: "center" }}>
                  <ListItemIcon>{page.icon && page.icon}</ListItemIcon>
                  <ListItemText primary={page.name} />
                </ListItemButton>
              </Link>
            </ListItem>
          ))}
      </List>
    </Drawer>
  );
}
