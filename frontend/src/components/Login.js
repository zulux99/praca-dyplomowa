import { useContext } from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Link, Navigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";

function Login() {
  const { loginUser } = useContext(AuthContext);
  const user = useContext(AuthContext);

  if (user.user) {
    return <Navigate to="/" />;
  }

  return (
    <Box className="tlo">
      <form onSubmit={loginUser}>
        <Typography variant="h1">Witaj!</Typography>
        <Typography variant="h2">Podaj dane, aby zalogować się do aplikacji</Typography>
        <TextField
          type="text"
          required
          variant="outlined"
          label="Nazwa użytkownika"
          autoComplete="username"
          name="username"
          id="username"
          margin="normal"
          size="small"
          fullWidth
        />
        <TextField
          type="password"
          required
          variant="outlined"
          label="Hasło"
          name="password"
          autoComplete="current-password"
          id="current-password"
          margin="normal"
          size="small"
          fullWidth
        />
        <Button type="submit" variant="contained" fullWidth margin="normal">
          Zaloguj się
        </Button>
      </form>
      <Box className="adnotacja">
        <Typography variant="h3">Nie masz jeszcze konta?</Typography>
        <Link to="/register">
          <Typography variant="h3">&nbsp;Zarejestruj się</Typography>
        </Link>
      </Box>
    </Box>
  );
}

export default Login;
