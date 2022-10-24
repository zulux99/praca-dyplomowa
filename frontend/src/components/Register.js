import React from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { useState, useEffect } from "react";
import Container from "@mui/system/Container";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [usernameExists, setUsernameExists] = useState(false);
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [email, setEmail] = useState("");
  const [emailExists, setEmailExists] = useState(false);
  // const [showPassword, setShowPassword] = useState(false);
  const [passwordMatch, setPasswordMatch] = useState(true);

  useEffect(() => {
    password !== password2 && password2 !== "" ? setPasswordMatch(false) : setPasswordMatch(true);
  }, [password, password2]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (passwordMatch) {
      try {
        const response = await axios.post("/api/register", JSON.stringify({ username, password, email }), {
          headers: {
            "Content-Type": "application/json",
          },
        });
        console.log(response.data);
        navigate("/");
      } catch (err) {
        err.response.data.email ? setEmailExists(true) : setEmailExists(false);
        err.response.data.username ? setUsernameExists(true) : setUsernameExists(false);
      }
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
              type="text"
              error={usernameExists ? true : false}
              helperText={usernameExists ? "Użytkownik o tej nazwie już istnieje" : ""}
              autoComplete="username"
              variant="outlined"
              label="Nazwa użytkownika"
              id="username"
              onChange={(e) => setUsername(e.target.value)}
              margin="dense"
            />
            <TextField
              fullWidth
              className="textField"
              required
              variant="outlined"
              type="password"
              label="Hasło"
              id="password"
              autoComplete="new-password"
              onChange={(e) => setPassword(e.target.value)}
              margin="dense"
            />
            <TextField
              fullWidth
              className="textField"
              required
              error={passwordMatch ? false : true}
              helperText={passwordMatch ? false : "Hasła się nie zgadzają"}
              variant="outlined"
              type="password"
              label="Potwierdź hasło"
              id="password2"
              autoComplete="new-password"
              onChange={(e) => setPassword2(e.target.value)}
              margin="dense"
            />
            <TextField
              fullWidth
              className="textField"
              required
              error={emailExists ? true : false}
              helperText={emailExists ? "Ten email jest już zarejestrowany" : ""}
              variant="outlined"
              label="Email"
              type="email"
              autoComplete="email"
              id="email"
              onChange={(e) => setEmail(e.target.value)}
              margin="dense"
            />
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
