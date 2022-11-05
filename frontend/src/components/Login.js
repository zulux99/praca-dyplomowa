import { useContext } from 'react';
import Typography from '@mui/material/Typography';
import Container from '@mui/system/Container';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Link, Navigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

function Login() {
  const { loginUser } = useContext(AuthContext);
  const user = useContext(AuthContext);

  if (user.user) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <Container align="center">
        <form onSubmit={loginUser}>
          <Typography variant="h4">Logowanie</Typography>
          <TextField
            type="text"
            required
            variant="outlined"
            label="Nazwa użytkownika"
            autoComplete="username"
            name="username"
            id="username"
            margin="normal"
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
          />
          <Button type="submit" variant="contained">
            Zaloguj się
          </Button>
        </form>
        Nie masz jeszcze konta?
        <Link to="/register">
          <Typography variant="h6">Zarejestruj się</Typography>
        </Link>
      </Container>
    </>
  );
}

export default Login;
