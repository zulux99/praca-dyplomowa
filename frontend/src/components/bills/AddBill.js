import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import InputAdornment from "@mui/material/InputAdornment";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Box from "@mui/material/Box";

function AddBill(props) {
  const [nazwa, setNazwa] = useState("");
  const [billAlreadyExists, setBillAlreadyExists] = useState(false);
  const [isAmountValid, setIsAmountValid] = useState(true);
  const [amount, setAmount] = useState(0);
  const [open, setOpen] = useState(false);
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
        props.getBills();
        closeModalAddBill();
      } catch (err) {
        err.response.data.kwota ? setIsAmountValid(false) : setIsAmountValid(true);
      }
    }
  };

  const closeModalAddBill = () => {
    props.setOpen(false);
    setNazwa("");
    setAmount(0);
    setIsAmountValid(true);
    setBillAlreadyExists(false);
  };

  return (
    <>
      <Modal className="modal" open={props.open} onClose={closeModalAddBill} aria-labelledby="Dodaj kategorię">
        <Fade in={props.open}>
          <Box className="modal-box">
            <form onSubmit={addBill}>
              <h2
                id="Dodaj kategorię"
                style={{
                  display: "flex",
                  justifyContent: "center",
                }}>
                Dodaj konto
              </h2>
              <TextField
                className="input"
                type="text"
                variant="outlined"
                label="Nazwa konta"
                error={billAlreadyExists ? true : false}
                helperText={billAlreadyExists && "Konto o tej nazwie już istnieje"}
                color="success"
                id="nazwa"
                margin="normal"
                onChange={(e) => {
                  setNazwa(e.target.value);
                  setBillAlreadyExists(false);
                }}
              />
              <TextField
                className="input"
                type="number"
                variant="outlined"
                label="Kwota"
                id="kwota"
                error={isAmountValid ? false : true}
                helperText={isAmountValid ? "" : "Niepoprawna kwota"}
                margin="normal"
                color="success"
                value={amount}
                pattern="^\\$?(([1-9](\\d*|\\d{0,2}(,\\d{3})*))|0)(\\.\\d{1,2})?$"
                onChange={(e) => setAmount(e.target.value)}
                onFocus={(e) => parseInt(e.target.value) === 0 && setAmount("")}
                inputProps={{
                  inputMode: "numeric",
                }}
                InputProps={{
                  endAdornment: <InputAdornment position="end">PLN</InputAdornment>,
                }}
              />
              <Button
                variant="contained"
                type="submit"
                disabled={nazwa == "" || !isAmountValid ? true : false}
                size="large"
                color="success">
                Dodaj konto
              </Button>
            </form>
          </Box>
        </Fade>
      </Modal>
    </>
  );
}

export default AddBill;
