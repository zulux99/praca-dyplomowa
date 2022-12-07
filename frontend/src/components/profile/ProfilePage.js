import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";

export default function ProfilePage() {
  return (
    <>
      <h1>Twój profil</h1>
      <List>
        <ListItem>Imię: </ListItem>
        <ListItem>Nazwisko: </ListItem>
        <ListItem>Email: </ListItem>
        <ListItem>Hasło: </ListItem>
      </List>
    </>
  );
}
