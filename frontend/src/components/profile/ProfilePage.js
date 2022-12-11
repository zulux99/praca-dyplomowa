import { useState, useEffect } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

export default function ProfilePage() {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("user"));
    if (data) {
      setUserData(data);
    }
  }, []);

  return (
    <>
      <h1>Twój profil</h1>
      <Box component="span" fullWidth className="profil-akcja">
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#f5f5f5",
            color: "#000000",
          }}
          color="inherit">
          Anuluj
        </Button>
        <Button variant="contained" color="success">
          Zapisz
        </Button>
      </Box>
      {userData && (
        <List>
          <ListItem>Imię:</ListItem>
          <TextField variant="standard" value={userData.first_name && userData.first_name} />

          <ListItem>Nazwisko: </ListItem>
          <TextField variant="standard" value={userData.last_name && userData.last_name} />
          <ListItem>Email: {userData.email}</ListItem>
          <ListItem>Nazwa użytkownika: {userData.username}</ListItem>
          <ListItem>
            Hasło:
            <Button variant="contained" color="success">
              Zmień hasło
            </Button>
          </ListItem>
        </List>
      )}
    </>
  );
}
