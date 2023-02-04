import axios from "axios";
import { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import { useState, useEffect } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import CircularProgress from "@mui/material/CircularProgress";
import { toast } from "react-toastify";

export default function ProfilePage() {
  const user = useContext(AuthContext);
  const { logoutUser } = useContext(AuthContext);
  const [userData, setUserData] = useState(null);
  const [password, setPassword] = useState(null);
  const [loadingDelete, setLoadingDelete] = useState(false);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("user"));
    if (data) {
      setUserData(data);
    }
  }, []);

  const handleDelete = async (e) => {
    e.preventDefault();
    setLoadingDelete(true);
    // check if password is correct
    if (password) {
      try {
        const response = await axios.post(
          "/api/token/",
          JSON.stringify({ username: user.user.username, password: password }),
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (response.status === 200) {
          deleteUser();
        }
      } catch (err) {
        console.log(err.response);
        if (err.response.status === 401) {
          toast.error("Niepoprawne hasło");
        } else {
          if (err.response.status !== 200) {
            console.log(err);
          }
        }
      }
    }
    setLoadingDelete(false);
  };

  const deleteUser = async () => {
    try {
      const response = await axios.delete("/api/user/" + user.user.user_id + "/", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.authTokens.access}`,
        },
      });
      if (response.status === 204) {
        toast.success("Konto zostało usunięte");
        setTimeout(() => {
          logoutUser();
        }, 2000);
      }
    } catch (err) {
      console.log(err.response);
      if (err.response.status !== 204) {
        console.log(err);
      }
    }

    setLoadingDelete(false);
  };

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
                Nazwa użytkownika
              </h3>
            </ListItem>
            <ListItem>{userData.username}</ListItem>
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
                Usuwanie konta
              </h3>
            </ListItem>
            <ListItem>Aby usunąć konto wpisz aktualne hasło</ListItem>
            <form
              onSubmit={handleDelete}
              style={{
                display: "flex",
                alignItems: "flex-start",
                flexDirection: "row",
                flexWrap: "wrap",
              }}>
              <input value={user.user.username} disabled hidden autoComplete="username" />
              <TextField
                className="input"
                id="outlined-basic"
                label="Hasło"
                variant="outlined"
                type="password"
                autoComplete="current-password"
                onChange={(e) => setPassword(e.target.value)}
                color="success"
                size="small"
                sx={{
                  ml: 2,
                  mb: 2,
                }}
              />
              {loadingDelete ? (
                <CircularProgress
                  color="error"
                  sx={{
                    ml: 2,
                  }}
                />
              ) : (
                <Button
                  variant="contained"
                  color="error"
                  type="submit"
                  sx={{
                    ml: 2,
                  }}>
                  Usuń konto
                </Button>
              )}
            </form>
          </List>
        )}
      </Box>
    </>
  );
}
