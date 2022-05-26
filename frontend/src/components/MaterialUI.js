import { useState } from "react";
import Home from "@mui/icons-material/Home";
import Menu from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import AppBar from "@mui/material/AppBar";
import Typography from "@mui/material/Typography";
import CssBaseline from "@mui/material/CssBaseline";
import useStyles from "./styles";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { Box, Button, FormControl } from "@mui/material";

function MaterialUI() {
  const classes = useStyles();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    registerUser(username, password, password2);
  };

  const registerUser = async (username, password, password2) => {
    const response = await fetch("/api/register",
    {
      method: "POST",
      headers: {
        body: JSON.stringify({
          username,
          password,
          password2,
        }),
        'content-type': 'application/json'
      },
    });
    if (response.status == 201) {
      console.log("Zarejestrowano");
    } else {
      console.log(response);
    }
  };

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
          <form onSubmit={handleSubmit}>
            <AccountCircle />
            <TextField
              fullWidth
              className="textField"
              required
              variant="outlined"
              label="Nazwa użytkownika"
              onChange={e => setUsername(e.target.value)}
              margin="dense"></TextField>
            <TextField
              fullWidth
              className="textField"
              required
              variant="outlined"
              type="password"
              label="Hasło"
              onChange={e => setPassword(e.target.value)}
              margin="dense"></TextField>
            <TextField
              fullWidth
              className="textField"
              required
              variant="outlined"
              type="password"
              label="Potwierdź hasło"
              onChange={e => setPassword2(e.target.value)}
              margin="dense"></TextField>
            <TextField
              fullWidth
              className="textField"
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
            <Button type="submit" variant="contained" size="large">
              Załóż konto
            </Button>
            <p>{password2 !== password ? "Hasła się nie zgadzają" : ""}</p>
          </form>
        </Container>
      </FormControl>
    </>
  );
}

export default MaterialUI;
