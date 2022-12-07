import { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Link } from "react-router-dom";

export default function ProfileMenu(props) {
  const { logoutUser } = useContext(AuthContext);
  const open = Boolean(props.anchorEl);

  const menuItems = [
    {
      name: "Profil",
      link: "/profile",
    },
    {
      name: "Wyloguj się",
      link: "/profile",
      onClick: logoutUser,
    },
  ];

  const handleClose = () => {
    props.setAnchorEl(null);
  };
  return (
    <Menu
      id="simple-menu"
      anchorEl={props.anchorEl}
      open={open}
      onClose={handleClose}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
      sx={{ marginTop: "10px" }}>
      {menuItems.map((item, index) => (
        <MenuItem key={index} onClick={item.onClick ? item.onClick : handleClose} component={Link} to={item.link}>
          {item.name}
        </MenuItem>
      ))}
    </Menu>
  );
}
