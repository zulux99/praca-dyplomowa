import { useNavigate, Navigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { useState, useEffect, useContext } from "react";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";

function Register() {
  const navigate = useNavigate();
  const user = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [usernameExists, setUsernameExists] = useState(false);
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [email, setEmail] = useState("");
  const [emailExists, setEmailExists] = useState(false);
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [firstName, setFirstName] = useState("");

  useEffect(() => {
    if (user.user) {
      return <Navigate to="/" />;
    }
  }, []);

  useEffect(() => {
    password !== password2 && password2 !== "" ? setPasswordMatch(false) : setPasswordMatch(true);
  }, [password, password2]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("first name: ", firstName);
    if (passwordMatch) {
      try {
        const response = await axios.post(
          "/api/register/",
          JSON.stringify({ username, password, email, first_name: firstName }),
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        console.log(response.data);
        navigate("/");
      } catch (err) {
        err.response.data.email ? setEmailExists(true) : setEmailExists(false);
        err.response.data.username ? setUsernameExists(true) : setUsernameExists(false);
      }
    }
  };

  return (
    <Box className="tlo">
      <form onSubmit={handleSubmit}>
        <Typography variant="h1">Załóż konto</Typography>
        <Typography variant="h2">Zacznij korzystać już teraz!</Typography>
        <TextField
          className="textField"
          type="text"
          autoComplete="name"
          variant="outlined"
          label="Imię (opcjonalne)"
          color="success"
          id="name"
          onChange={(e) => setFirstName(e.target.value)}
          margin="dense"
          size="small"
          fullWidth
        />
        <TextField
          className="textField"
          required
          type="text"
          error={usernameExists ? true : false}
          helperText={usernameExists ? "Użytkownik o tej nazwie już istnieje" : ""}
          autoComplete="username"
          color="success"
          variant="outlined"
          label="Nazwa użytkownika"
          id="username"
          onChange={(e) => setUsername(e.target.value)}
          margin="dense"
          size="small"
          fullWidth
        />
        <TextField
          className="textField"
          required
          variant="outlined"
          color="success"
          type="password"
          label="Hasło"
          id="password"
          autoComplete="new-password"
          onChange={(e) => setPassword(e.target.value)}
          margin="dense"
          size="small"
          fullWidth
        />
        <TextField
          className="textField"
          color="success"
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
          size="small"
          fullWidth
        />
        <TextField
          className="textField"
          color="success"
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
          size="small"
          fullWidth
        />
        <Button type="submit" variant="contained" fullWidth color="success">
          Załóż konto
        </Button>
        <Box className="adnotacja">
          <Typography variant="h3">Masz już konto?</Typography>
          <Link to="/login">
            <Typography variant="h3">&nbsp;Zaloguj się</Typography>
          </Link>
        </Box>
      </form>
    </Box>
  );
}
export default Register;
