import { useState, useEffect, useContext } from "react";
import Typography from "@mui/material/Typography";
import Container from "@mui/system/Container";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import AuthContext from "../context/AuthContext";

function Login() {
  const { loginUser } = useContext(AuthContext);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    setErrMsg("");
  }, [username, password]);

  return (
    <>
      <Container align="center">
        <form onSubmit={loginUser}>
          <Typography variant="h4">Logowanie</Typography>
          <TextField
            type="text"
            fullWidth
            required
            variant="outlined"
            label="Nazwa użytkownika"
            autoComplete="username"
            name="username"
            id="username"
            margin="normal"
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            type="password"
            fullWidth
            required
            variant="outlined"
            label="Hasło"
            name="password"
            autoComplete="current-password"
            id="current-password"
            margin="normal"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button type="submit" variant="contained">
            Zaloguj się
          </Button>
        </form>
      </Container>
    </>
  );
}

export default Login;
