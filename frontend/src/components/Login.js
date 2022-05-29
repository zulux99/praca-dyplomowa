import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Container from "@mui/system/Container";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axios from "axios";

function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    setErrMsg("");
  }, [username, password]);

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      // const response = await axios.post("/api/token", JSON.stringify({email, password}))
    } catch {
      
    }
  };

  return (
    <>
      <Container align="center">
        <form onSubmit={handleSubmit}>
          <Typography variant="h4">Logowanie</Typography>
          <TextField
            type="email"
            fullWidth
            required
            variant="outlined"
            label="Email"
            autoComplete="email"
            id="email"
            margin="normal"
            onChange={setEmail(e.target.value)}
          />
          <TextField
            type="password"
            fullWidth
            required
            variant="outlined"
            label="Password"
            autoComplete="current-password"
            id="current-password"
            margin="normal"
            onChange={setPassword(e.target.value)}
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
