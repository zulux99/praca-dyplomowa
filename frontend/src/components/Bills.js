import AuthContext from "../context/AuthContext";
import { useState } from "react";
import axios from "axios";
import { useContext } from "react";
import { Button, IconButton, TextField } from "@mui/material";
import { Box, Container } from "@mui/system";
import { useEffect } from "react";
import DeleteIcon from "@mui/icons-material/Delete";

function Bills() {
  const user = useContext(AuthContext);
  const [nazwa, setNazwa] = useState("");
  const [bills, setBills] = useState([]);
  const [billAlreadyExists, setBillAlreadyExists] = useState(false);
  const user_id = user.user.user_id;

  useEffect(() => {
    showBills();
    return () => {};
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
        const response = await axios.post("/api/bills", JSON.stringify({ user: user.user.user_id, nazwa }), {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.authTokens.access}`,
          },
        });
        showBills();
        e.target.reset();
        setNazwa("");
      } catch (err) {
        console.log(err.response.data);
      }
    }
  };

  return (
    <>
      <Container align="center">
        {bills.map((bill, index) => (
          <Box key={index}>
            <p>
              {bill.nazwa}
              <IconButton onClick={() => deleteBill(bill.id)}>
                <DeleteIcon />
              </IconButton>
            </p>
          </Box>
        ))}
        <form onSubmit={handleSubmit}>
          <TextField
            type="text"
            variant="outlined"
            label="Nazwa rachunku"
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
