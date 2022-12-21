import { useState } from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { DeleteTransaction } from "../transactions/DeleteTransactionRequest";
import { toast, ToastContainer } from "react-toastify";

function Menu3Dots(props) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDelete = () => {
    DeleteTransaction({ id: props.income.id, user: props.user }).then((response) => {
      if (response === -1) {
        console.log("error");
      } else {
        props.setIncomes(props.incomes.filter((income) => income.id !== props.income.id));
        toast.success("Usunięto transakcję");
      }
    });
  };

  return (
    <Box sx={{ display: "block" }}>
      <ToastContainer position="bottom-center" autoClose={2000} />
      <IconButton onClick={handleClick}>
        <MoreVertIcon />
      </IconButton>
      <Menu id="simple-menu" anchorEl={anchorEl} open={open} onClose={handleClose}>
        <MenuItem
          onClick={() => {
            handleClose();
          }}>
          Edytuj
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleDelete();
            handleClose();
          }}>
          Usuń
        </MenuItem>
      </Menu>
    </Box>
  );
}

export default Menu3Dots;
