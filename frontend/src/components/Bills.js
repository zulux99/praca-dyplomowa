import React from "react";
import AuthContext from "../context/AuthContext";
import { useState } from "react";
import axios from "axios";
import { useContext } from "react";
import { Button, IconButton, InputAdornment, InputLabel, List, ListItem, TextField } from "@mui/material";
import { Box, Container } from "@mui/system";
import { useEffect } from "react";
import { Doughnut } from "react-chartjs-2";
import { BarElement } from "chart.js";
import { Chart, ArcElement, Legend, Title, CategoryScale, LinearScale } from "chart.js";
Chart.register(ArcElement, BarElement, Legend, Title, CategoryScale, LinearScale);
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Check from "@mui/icons-material/Check";

function Bills() {
  const user = useContext(AuthContext);
  const [nazwa, setNazwa] = useState("");
  const [bills, setBills] = useState([]);
  const [billAlreadyExists, setBillAlreadyExists] = useState(false);
  const [billsEditingNow, setBillsEditingNow] = useState([]);
  const [amount, setAmount] = useState(0);
  const [isAmountValid, setIsAmountValid] = useState(true);
  const user_id = user.user.user_id;
  const validAmount = new RegExp("^\\$?(([1-9](\\d*|\\d{0,2}(,\\d{3})*))|0)(\\.\\d{1,2})?$");

  useEffect(() => {
    validAmount.test(amount) ? setIsAmountValid(true) : setIsAmountValid(false);
  }, [amount]);

  useEffect(() => {
    showBills();
    return () => {
      setBills([]);
    };
  }, []);
  useEffect(() => {
    bills.find((bill) => bill.nazwa === nazwa) ? setBillAlreadyExists(true) : setBillAlreadyExists(false);
  }, [nazwa, bills]);

  const addBill = async (e) => {
    e.preventDefault();
    if (!billAlreadyExists) {
      try {
        await axios.post("/api/bills", JSON.stringify({ user: user_id, nazwa, kwota: amount }), {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.authTokens.access}`,
          },
        });
        e.target.reset();
        setNazwa("");
        showBills();
      } catch (err) {
        err.response.data.kwota ? setIsAmountValid(false) : setIsAmountValid(true);
      }
    }
  };

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
      await axios.delete(`/api/bills/delete/${id}`, {
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
  return (
    <>
      <Container align="center">
        <Box sx={{ height: 300 }}>
          <Doughnut
            options={{
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  display: true,
                  position: "bottom",
                },
                title: {
                  display: true,
                  text: "Rachunki",
                },
              },
            }}
            data={{
              labels: bills.map((bill) => bill.nazwa),
              datasets: [
                {
                  label: "Rachunki",
                  data: bills.map((bill) => bill.kwota),
                  backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
                },
              ],
            }}
          />
        </Box>
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
                  }}>
                  {bill.nazwa + " "}
                </InputLabel>
                <InputLabel
                  sx={{
                    display: billsEditingNow.find((id) => id === index + 1) ? "none" : "block",
                  }}>
                  {bill.kwota} zł
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
        <form onSubmit={addBill}>
          <TextField
            type="text"
            variant="outlined"
            label="Nowa nazwa rachunku"
            error={billAlreadyExists ? true : false}
            helperText={billAlreadyExists && "Rachunek o tej nazwie już istnieje"}
            fullWidth
            id="nazwa"
            margin="normal"
            onChange={(e) => {
              setNazwa(e.target.value);
              setBillAlreadyExists(false);
            }}
          />
          <TextField
            type="text"
            variant="outlined"
            label="Kwota"
            fullWidth
            id="kwota"
            error={isAmountValid ? false : true}
            helperText={isAmountValid ? "" : "Niepoprawna kwota"}
            margin="normal"
            value={amount}
            pattern="^\\$?(([1-9](\\d*|\\d{0,2}(,\\d{3})*))|0)(\\.\\d{1,2})?$"
            onChange={(e) => setAmount(e.target.value)}
            onFocus={(e) => e.target.value == 0 && setAmount("")}
            InputProps={{
              endAdornment: <InputAdornment position="end">PLN</InputAdornment>,
            }}
          />
          <Button variant="contained" type="submit" disabled={nazwa == "" || !isAmountValid ? true : false}>
            Dodaj rachunek
          </Button>
        </form>
      </Container>
    </>
  );
}

export default Bills;
