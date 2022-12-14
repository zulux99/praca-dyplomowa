import { useState, useEffect } from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useNavigate } from "react-router-dom";

export default function BottomMenuAdd(props) {
  const open = Boolean(props.anchorEl);
  const navigate = useNavigate();
  const [componentIndex, setComponentIndex] = useState(null);
  const handleClose = () => {
    props.setAnchorEl(null);
  };

  return (
    <>
      <Menu
        id="simple-menu"
        anchorEl={props.anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        transformOrigin={{ vertical: "top", horizontal: "center" }}>
        <MenuItem onClick={() => setComponentIndex(0)}>Przychód</MenuItem>
        <MenuItem onClick={() => setComponentIndex(1)}>Wydatek</MenuItem>
      </Menu>
    </>
  );
}
