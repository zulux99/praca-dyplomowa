import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { useRef, useState, useEffect } from "react";
import Container from "@mui/system/Container";

function Register() {
  const [username, setUsername] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");

  const [user, setUser] = useState("");

  const confirmPassword = (password2) => {
    password1 !== password2 ? Error : "";
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/register", JSON.stringify({ username, password }), {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(response.data);
    } catch (err) {
      console.log(err.response.data);
    }
  };

  return (
    <>
      <div>
        <Container align="center">
          <form onSubmit={handleSubmit}>
            <Typography variant="h4">Rejestracja</Typography>
            <TextField
              fullWidth
              className="textField"
              required
              autoComplete="off"
              variant="outlined"
              label="Nazwa użytkownika"
              id="username"
              onChange={(e) => setUsername(e.target.value)}
              margin="dense"></TextField>
            <TextField
              fullWidth
              className="textField"
              required
              variant="outlined"
              type="password"
              label="Hasło"
              id="password"
              onChange={(e) => setPassword1(e.target.value)}
              margin="dense"></TextField>
            <TextField
              fullWidth
              className="textField"
              required
              error
              variant="outlined"
              type="password"
              label="Potwierdź hasło"
              id="password2"
              onChange={e => confirmPassword(e.target.value)}
              margin="dense"></TextField>
            <TextField
              fullWidth
              required
              className="textField"
              variant="outlined"
              label="Email"
              margin="dense"></TextField>
            <Button type="submit" variant="contained">
              Załóż konto
            </Button>
          </form>
        </Container>
      </div>
    </>
  );
}
export default Register;
