import { useState, useEffect } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";

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
      <Box
        className="box"
        sx={{
          padding: "16px",
        }}>
        <span
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            margin: "16px 0",
          }}>
          <h1>Twój profil</h1>
        </span>
        {userData && (
          <List>
            <ListItem>
              <h3
                style={{
                  margin: "0",
                }}>
                Imię
              </h3>
            </ListItem>
            <ListItem>{userData.first_name && userData.first_name}</ListItem>
            <Divider />
            <ListItem>
              <h3
                style={{
                  margin: "0",
                }}>
                E-mail
              </h3>
            </ListItem>
            <ListItem>{userData.email}</ListItem>
            <Divider />
            <ListItem>
              <h3
                style={{
                  margin: "0",
                }}>
                Nazwa użytkownika
              </h3>
            </ListItem>
            <ListItem>{userData.username}</ListItem>
          </List>
        )}
      </Box>
    </>
  );
}
