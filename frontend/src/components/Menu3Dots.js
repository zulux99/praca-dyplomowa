import { useState } from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";

function Menu3Dots(props) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ display: "block" }}>
      <IconButton onClick={handleClick}>
        <MoreVertIcon />
      </IconButton>
      <Menu id="simple-menu" anchorEl={anchorEl} open={open} onClose={handleClose}>
        {props.deleteBill && (
          <MenuItem
            onClick={() => {
              props.deleteBill(props.id);
              handleClose();
            }}>
            Usuń
          </MenuItem>
        )}
        {props.makeDefault && (
          <MenuItem
            onClick={() => {
              props.makeDefault(props.bill);
              handleClose();
            }}>
            Ustaw jako dymyślne
          </MenuItem>
        )}
      </Menu>
    </Box>
  );
}

export default Menu3Dots;
