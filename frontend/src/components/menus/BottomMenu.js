import { useContext, useState, useEffect } from "react";
import AuthContext from "../../context/AuthContext";
import AppBar from "@mui/material/AppBar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import { Link } from "react-router-dom";

function BottomMenu() {
  const user = useContext(AuthContext);
  const [menuItems, setMenuItems] = useState([]);

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

  return (
    <>
      <AppBar className="bottom_menu" position="fixed" sx={{ bottom: 0, top: "auto" }} color="success">
        <List
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around",
            alignItems: "center",
            width: "100%",
          }}>
          {menuItems.map((item, index) => (
            <ListItem
              button
              key={index}
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
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
