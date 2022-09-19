import AuthContext from "../context/AuthContext";
import { useState } from "react";
import axios from "axios";
import { useContext } from "react";
import { Button, IconButton, InputLabel, List, ListItem, TextField } from "@mui/material";
import { Box, Container, width } from "@mui/system";
import { useEffect } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Check from "@mui/icons-material/Check";

function Bills() {
  const user = useContext(AuthContext);
  const [nazwa, setNazwa] = useState("");
  const [bills, setBills] = useState([]);
  const [billAlreadyExists, setBillAlreadyExists] = useState(false);
  const [billsEditingNow, setBillsEditingNow] = useState([]);
  const user_id = user.user.user_id;

  useEffect(() => {
    showBills();
    return () => {
      setBills([]);
    };
  }, []);
  useEffect(() => {
    bills.find((bill) => bill.nazwa === nazwa) ? setBillAlreadyExists(true) : setBillAlreadyExists(false);
  }, [nazwa, bills]);

  const showBills = async () => {
    try {
      const response = await axios.get(`/api/bills`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.authTokens.access}`,
          id: user_id,
        },
      });
      setBills(response.data);
      console.log(bills);
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
            id: user_id,
          },
        }
      );
      console.log(response.data);
      showBills();
    } catch (err) {
      console.log(err.response.data);
    }
  };

  const deleteBill = async (id) => {
    try {
      const response = await axios.delete(`/api/bills/delete/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.authTokens.access}`,
          id: user_id,
        },
      });
      showBills();
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!billAlreadyExists) {
      try {
        const response = await axios.post("/api/bills", JSON.stringify({ user: user_id, nazwa }), {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.authTokens.access}`,
          },
        });
        e.target.reset();
        setNazwa("");
        showBills();
      } catch (err) {
        console.log(err.response.data);
      }
    }
  };
  return (
    <>
      <Container align="center">
        <List>
          {bills.map((bill, index) => (
            <Box key={index}>
              <ListItem key={index}>
                <TextField
                  defaultValue={bill.nazwa}
                  variant="standard"
                  sx={{ display: billsEditingNow.find((id) => id === index + 1) ? "block" : "none" }}
                  onChange={(e) => ((bills[index].nazwa = e.target.value), console.log(bills))}
                />
                <InputLabel
                  sx={{
                    display: billsEditingNow.find((id) => id === index + 1) ? "none" : "block",
                    border: "1px solid black",
                  }}>
                  {bill.nazwa}
                </InputLabel>
                <Box sx={{ display: billsEditingNow.find((id) => id === index + 1) ? "none" : "block" }}>
                  <IconButton onClick={() => setBillsEditingNow(billsEditingNow.concat(index + 1))}>
                    <EditIcon color="info" />
                  </IconButton>
                </Box>
                <Box sx={{ display: billsEditingNow.find((id) => id === index + 1) ? "block" : "none" }}>
                  <IconButton onClick={() => changeBillName(bill)}>
                    <Check color="success" />
                  </IconButton>
                </Box>
                <IconButton onClick={() => deleteBill(bill.id)}>
                  <DeleteIcon color="error" />
                </IconButton>
              </ListItem>
            </Box>
          ))}
        </List>
        <form onSubmit={handleSubmit}>
          <TextField
            type="text"
            variant="outlined"
            label="Nowa nazwa rachunku"
            error={billAlreadyExists ? true : false}
            helperText={billAlreadyExists ? "Rachunek o tej nazwie już istnieje" : ""}
            fullWidth
            id="nazwa"
            margin="normal"
            onChange={(e) => {
              setNazwa(e.target.value);
              setBillAlreadyExists(false);
            }}
          />
          <Button variant="contained" type="submit" disabled={nazwa == "" ? true : false}>
            Dodaj rachunek
          </Button>
        </form>
      </Container>
    </>
  );
}

export default Bills;
