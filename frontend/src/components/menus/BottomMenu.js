import { useContext, useState, useEffect } from "react";
import AuthContext from "../../context/AuthContext";
import AppBar from "@mui/material/AppBar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import { Link } from "react-router-dom";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import IconButton from "@mui/material/IconButton";
import BottomMenuAdd from "./BottomMenuAdd";

function BottomMenu(props) {
  const user = useContext(AuthContext);
  const [menuItems, setMenuItems] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => {
    if (user.authTokens) {
      setMenuItems([
        { name: "Przychody", link: "/incomes" },
        { name: "Wydatki", link: "/expenses" },
        { name: "Dłużnicy", link: "/debtors" },
        { name: "Profil", link: "/profile" },
      ]);
    }
  }, [user]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <>
      <BottomMenuAdd anchorEl={anchorEl} setAnchorEl={setAnchorEl} />
      <AppBar className="bottom_menu" position="fixed" sx={{ bottom: 0, top: "auto" }} color="success">
        <List
          sx={{
            display: "flex",
            height: "56px",
            padding: "0",
          }}>
          {menuItems.map((item, index) => (
            <ListItem
              key={index}
              sx={{
                padding: "0",
                justifyContent: "center",
                backgroundColor: window.location.pathname === item.link && "success.light",
              }}>
              <Link to={item.link}>{item.name}</Link>
            </ListItem>
          ))}
        </List>
      </AppBar>
    </>
  );
}

export default BottomMenu;
