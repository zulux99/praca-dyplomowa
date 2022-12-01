import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import InputAdornment from "@mui/material/InputAdornment";

function AddBill(props) {
  const [nazwa, setNazwa] = useState("");
  const [billAlreadyExists, setBillAlreadyExists] = useState(false);
  const [isAmountValid, setIsAmountValid] = useState(true);
  const [amount, setAmount] = useState(0);
  const validAmount = new RegExp("^\\$?(([1-9](\\d*|\\d{0,2}(,\\d{3})*))|0)(\\.\\d{1,2})?$");
  const user_id = props.user.user.user_id;

  useEffect(() => {
    validAmount.test(amount) ? setIsAmountValid(true) : setIsAmountValid(false);
  }, [amount]);

  useEffect(() => {
    props.bills.find((bill) => bill.nazwa === nazwa) ? setBillAlreadyExists(true) : setBillAlreadyExists(false);
  }, [nazwa, props.bills]);

  const addBill = async (e) => {
    e.preventDefault();
    if (!billAlreadyExists) {
      try {
        await axios.post("/api/bills/", JSON.stringify({ user: user_id, nazwa, kwota: amount }), {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${props.user.authTokens.access}`,
          },
        });
        e.target.reset();
        setNazwa("");
        setAmount(0);
        props.getBills();
      } catch (err) {
        err.response.data.kwota ? setIsAmountValid(false) : setIsAmountValid(true);
      }
    }
  };
  return (
    <form onSubmit={addBill}>
      <TextField
        type="text"
        variant="outlined"
        label="Nowa nazwa rachunku"
        error={billAlreadyExists ? true : false}
        helperText={billAlreadyExists && "Rachunek o tej nazwie już istnieje"}
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
        id="kwota"
        error={isAmountValid ? false : true}
        helperText={isAmountValid ? "" : "Niepoprawna kwota"}
        margin="normal"
        value={amount}
        pattern="^\\$?(([1-9](\\d*|\\d{0,2}(,\\d{3})*))|0)(\\.\\d{1,2})?$"
        onChange={(e) => setAmount(e.target.value)}
        onFocus={(e) => e.target.value == 0 && setAmount("")}
        inputProps={{
          inputMode: "numeric",
        }}
        InputProps={{
          endAdornment: <InputAdornment position="end">PLN</InputAdornment>,
        }}
      />
      <Button variant="contained" type="submit" disabled={nazwa == "" || !isAmountValid ? true : false}>
        Dodaj rachunek
      </Button>
    </form>
  );
}

export default AddBill;
