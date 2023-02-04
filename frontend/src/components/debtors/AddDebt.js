import AuthContext from "../../context/AuthContext";
import { useContext, useState, useEffect } from "react";
import axios from "axios";
import TextField from "@mui/material/TextField";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import InputAdornment from "@mui/material/InputAdornment";
import Button from "@mui/material/Button";
import { toast } from "react-toastify";
import { GetDefaultBill } from "../bills/GetDefaultBill";

function AddDebt(props) {
  const user = useContext(AuthContext);
  const [debtorName, setDebtorName] = useState("");
  const [debtValue, setDebtValue] = useState("");
  const [debtValueValid, setDebtValueValid] = useState(true);
  const [debtPurpose, setDebtPurpose] = useState("");
  const [bills, setBills] = useState([]);
  const [billId, setBillId] = useState("");
  const validAmount = new RegExp("^\\$?(([1-9](\\d*|\\d{0,2}(,\\d{3})*))|0)(\\.\\d{1,2})?$");
  const user_id = user.user.user_id;

  useEffect(() => {
    GetDefaultBill(user).then((bill) => {
      if (bill.domyslne) {
        setBillId(bill.id);
      }
    });
    getBills();
  }, []);

  useEffect(() => {
    if (validAmount.test(debtValue) || debtValue === "") {
      setDebtValueValid(true);
    } else {
      setDebtValueValid(false);
    }
  }, [debtValue]);

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

  const addDebt = async (e) => {
    e.preventDefault();
    if (debtValue == 0) return toast.error("Kwota musi być większa od 0");
    if (!debtValueValid) return toast.error("Kwota jest nieprawidłowa");
    try {
      const response = await axios.post(
        "/api/debts/",
        JSON.stringify({
          user: user_id,
          nazwa_dluznika: debtorName,
          kwota_do_splaty: debtValue,
          cel: debtPurpose,
          rachunek: billId,
        }),
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.authTokens.access}`,
          },
        }
      );
      e.target.reset();
      setDebtorName("");
      props.getDebts();
      toast.success("Dodano dług");
      props.closeModal();
    } catch (err) {
      console.log(err.response.data);
      toast.error("Nie udało się dodać długu");
    }
  };

  return (
    <>
      <Modal className="modal" open={props.open} onClose={props.closeModal} aria-labelledby="Dodaj dług">
        <Fade in={props.open}>
          <Box className="modal-box">
            <form onSubmit={addDebt}>
              <h2>Dodaj dług</h2>
              <TextField
                className="input"
                label="Nazwa dłużnika"
                autoComplete="name"
                required
                color="success"
                variant="outlined"
                value={debtorName}
                onChange={(e) => setDebtorName(e.target.value)}
              />
              <TextField
                type="text"
                className="input"
                label="Pożyczona kwota"
                autoComplete="off"
                required
                color="success"
                error={!debtValueValid}
                variant="outlined"
                value={debtValue}
                onChange={(e) => setDebtValue(e.target.value)}
                inputProps={{
                  inputMode: "numeric",
                }}
                InputProps={{
                  endAdornment: <InputAdornment position="end">PLN</InputAdornment>,
                }}
              />
              <TextField
                className="input"
                select
                required
                label="Konto"
                color="success"
                value={billId}
                onChange={(e) => setBillId(e.target.value)}>
                {bills.map((bill) => (
                  <MenuItem key={bill.id} value={bill.id}>
                    {bill.nazwa}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                className="input"
                id="cel"
                autoComplete="goal"
                color="success"
                variant="outlined"
                label="Cel (opcjonalne)"
                value={debtPurpose}
                placeholder="np. zakup samochodu"
                onChange={(e) => setDebtPurpose(e.target.value)}
              />
              <Button
                variant="contained"
                type="submit"
                disabled={debtorName == "" || debtValue == ""}
                color="success"
                size="large">
                Dodaj
              </Button>
              <Button
                variant="contained"
                color="error"
                onClick={() => {
                  setDebtorName("");
                  setDebtValue("");
                  setDebtPurpose("");
                }}
                size="large"
                disabled={debtorName == "" && debtValue == "" && debtPurpose == ""}>
                Wyczyść
              </Button>
            </form>
          </Box>
        </Fade>
      </Modal>
    </>
  );
}

export default AddDebt;
