import AuthContext from "../context/AuthContext";
import { useState } from "react";
import axios from "axios";
import { useContext } from "react";
import { Button, TextField } from "@mui/material";
import { Box, Container } from "@mui/system";

function Bills() {
  const user = useContext(AuthContext);
  const [nazwa, setNazwa] = useState("");
  const user_id = user.user.user_id;
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/rachunek/create", JSON.stringify({ user: user.user.user_id, nazwa }), {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.authTokens.access}`,
        },
      });
    } catch (err) {
      console.log(err);
      console.log(err.response.data);
    }
  };
  return (
    <>
      <div>
        <p>Tutaj są twoje rachunki</p>
      </div>
      <Container align="center">
        <form onSubmit={handleSubmit}>
          <TextField
            type="text"
            variant="outlined"
            label="Nazwa rachunku"
            fullWidth
            id="nazwa"
            margin="normal"
            onChange={(e) => setNazwa(e.target.value)}
          />
          <Button variant="contained" type="submit">
            Dodaj rachunek
          </Button>
        </form>
      </Container>
    </>
  );
}

export default Bills;
