import Home from "@mui/icons-material/Home";
import Menu from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import AppBar from "@mui/material/AppBar";
import Typography from "@mui/material/Typography";
import CssBaseline from "@mui/material/CssBaseline";

import useStyles from "./styles";

function MaterialUI() {
  const classes = useStyles();
  return (
    <>
      <AppBar position="relative">
        <Toolbar>
          <CssBaseline />
          <Home  />
          <Typography variant="h5">Strona główna</Typography>
          <Menu />
        </Toolbar>
      </AppBar>
    </>
  );
}

export default MaterialUI;
