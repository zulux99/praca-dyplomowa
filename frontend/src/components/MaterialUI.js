import Home from "@mui/icons-material/Home";
import Menu from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import AppBar from "@mui/material/AppBar";
import Typography from "@mui/material/Typography";
import CssBaseline from "@mui/material/CssBaseline";
import useStyles from "./styles";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { Box, Button, FormControl } from "@mui/material";

function MaterialUI() {
  const classes = useStyles();
  return (
    <>
      <AppBar position="relative">
        <Toolbar>
          <CssBaseline />
          <Home />
          <Typography variant="h5">Strona główna</Typography>
          <Menu />
        </Toolbar>
      </AppBar>
      <FormControl>
        <Container main align="center">
          <AccountCircle />
          <TextField
            fullWidth
            className="textField"
            required
            variant="outlined"
            label="Nazwa użytkownika"
            margin=""></TextField>
          <TextField
            fullWidth
            className="textField"
            required
            variant="outlined"
            label="Hasło"
            margin="dense"></TextField>
          <TextField
            fullWidth
            className="textField"
            required
            variant="outlined"
            label="Email"
            margin="dense"></TextField>
          <TextField
            fullWidth
            className="textField"
            multiline
            variant="outlined"
            label="Opis"
            margin="dense"></TextField>
          <Button variant="contained" size="large">Załóż konto</Button>
        </Container>
      </FormControl>
    </>
  );
}

export default MaterialUI;
