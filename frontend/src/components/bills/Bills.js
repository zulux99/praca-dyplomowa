import AuthContext from "../../context/AuthContext";
import AddBill from "./AddBill";
import DoughnutChart from "./DoughnutChart";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import IconButton from "@mui/material/IconButton";
import InputLabel from "@mui/material/InputLabel";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Check from "@mui/icons-material/Check";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Menu3Dots from "../Menu3Dots";

function Bills() {
  const user = useContext(AuthContext);
  const [bills, setBills] = useState([]);
  const [billEditing, setBillEditing] = useState(-1);
  const user_id = user.user.user_id;

  useEffect(() => {
    getBills();
    return () => {
      setBills([]);
    };
  }, []);

  const getBills = async () => {
    try {
      const response = await axios.get(`/api/bills/`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.authTokens.access}`,
        },
      });
      setBills(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const changeBillName = async (bill) => {
    try {
      const response = await axios.put(
        `/api/bills/update/${bill.id}`,
        JSON.stringify({ user: user_id, nazwa: bill.nazwa }),
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.authTokens.access}`,
          },
        }
      );
      console.log(response.data);
      getBills();
      setBillEditing(-1);
    } catch (err) {
      console.log(err.response.data);
    }
  };

  const deleteBill = async (id) => {
    try {
      await axios.delete(`/api/bills/delete/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.authTokens.access}`,
        },
      });
      getBills();
    } catch (err) {
      console.log(err);
    }
  };
  const makeDefault = async (bill) => {
    if (bill.domyślne === 1) {
      return;
    }
    try {
      await axios.put(
        `/api/bills/update/${bill.id}`,
        JSON.stringify({ user: user_id, nazwa: bill.nazwa, domyslne: true }),
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.authTokens.access}`,
            id: user_id,
          },
        }
      );
      getBills();
    } catch (err) {
      alert("Nie udało się ustawić domyślnego konta");
    }
  };

  return (
    <>
      <Container align="center">
        <Box>
          <DoughnutChart bills={bills} />
        </Box>
        <List>
          {bills.map((bill, index) => (
            <Box key={index}>
              <ListItem key={index}>
                <form onSubmit={(e) => e.preventDefault()}>
                  <TextField
                    defaultValue={bill.nazwa}
                    variant="standard"
                    onChange={(e) => ((bills[index].nazwa = e.target.value), console.log(bills))}
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        changeBillName(bills[index]);
                        e.target.blur();
                      }
                    }}
                  />
                </form>
                <Box className="konto" sx={bill.domyslne ? { backgroundColor: "lightgreen" } : null}>
                  <Box className="konto_nazwa_kwota">
                    <InputLabel className="konto_nazwa">{bill.nazwa + " "}</InputLabel>
                    <InputLabel className="konto_kwota">{bill.kwota} zł</InputLabel>
                  </Box>
                  <Box className="konto_edytuj" onClick={() => setBillEditing(bill.id)}>
                    <IconButton>
                      <EditIcon color="info" />
                    </IconButton>
                  </Box>
                  <Box
                    className="konto_zatwierdz"
                    sx={billEditing == bill.id ? { display: "block" } : { display: "none" }}>
                    <IconButton onClick={() => changeBillName(bill)}>
                      <Check color="success" />
                    </IconButton>
                  </Box>
                  <Box>
                    <IconButton onClick={() => deleteBill(bill.id)}>
                      <DeleteIcon color="error" />
                    </IconButton>
                  </Box>
                  <Menu3Dots bill={bill} id={bill.id} makeDefault={makeDefault} deleteBill={deleteBill} />
                </Box>
              </ListItem>
            </Box>
          ))}
        </List>
        <AddBill bills={bills} user={user} getBills={getBills} />
      </Container>
    </>
  );
}

export default Bills;
