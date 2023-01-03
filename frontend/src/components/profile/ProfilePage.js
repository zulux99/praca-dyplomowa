import { useState, useEffect } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";

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
      {userData && (
        <List>
          <ListItem>
            Imię:
            {userData.first_name && userData.first_name}
          </ListItem>
          <Divider />
          <ListItem>Email: {userData.email}</ListItem>
          <Divider />
          <ListItem>Nazwa użytkownika: {userData.username}</ListItem>
          <Divider />
          <ListItem>Zmiana hasła</ListItem>
        </List>
      )}
    </>
  );
}
