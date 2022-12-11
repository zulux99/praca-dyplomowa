import { useState, useEffect, useContext } from "react";
import AuthContext from "../../context/AuthContext";
import TextField from "@mui/material/TextField";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Autocomplete from "@mui/material/Autocomplete";
import { GetDefaultBill } from "../bills/GetDefaultBill";
import { GetAllCategories } from "../categories/GetAllCategoriesRequest";
import { toast } from "react-toastify";
import { AddIncome } from "./AddIncomeRequest";

export default function AddIncomeForm() {
  const user = useContext(AuthContext);
  const [billId, setBillId] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [categoryList, setCategoryList] = useState([]);
  const [paymentDate, setPaymentDate] = useState(new Date().toISOString().slice(0, 10));
  const [paymentValue, setPaymentValue] = useState(0);
  const [paymentValueValid, setPaymentValueValid] = useState(true);
  const validAmount = new RegExp("^\\$?(([1-9](\\d*|\\d{0,2}(,\\d{3})*))|0)(\\.\\d{1,2})?$");

  useEffect(() => {
    GetDefaultBill(user).then((bill) => {
      if (bill.domyslne) {
        setBillId(bill.id);
      }
    });
    GetAllCategories(user).then((response) => {
      if (response === -1) {
        toast.error("Nie udało się pobrać listy kategorii");
      } else {
        setCategoryList(response);
      }
    });
  }, []);

  useEffect(() => {
    validAmount.test(paymentValue) ? setPaymentValueValid(true) : setPaymentValueValid(false);
    if (paymentValue === "") {
      setPaymentValueValid(true);
    }
  }, [paymentValue]);

  useEffect(() => {
    if (categoryId) {
      console.log("categoryId: " + categoryId);
    } else if (categoryId === "") {
      console.log("categoryId: null");
    }
  }, [categoryId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // if (paymentValueValid) {
    //   AddIncome(user, paymentValue, paymentDate, billId, categoryId).then((response) => {
    //     if (response === -1) {
    //       toast.error("Nie udało się dodać przychodu");
    //     } else {
    //       toast.success("Dodano przychód");
    //     }
    //   });
    // }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <TextField
          variant="outlined"
          label="Kwota"
          type="number"
          required
          onChange={(e) => setPaymentValue(e.target.value)}
          error={!paymentValueValid}
          InputProps={{
            inputProps: {
              inputMode: "numeric",
            },
          }}
        />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Data spłaty"
            className="input"
            inputFormat="DD/MM/YYYY"
            value={paymentDate}
            onChange={(newValue) => {
              setPaymentDate(newValue.$y + "-" + parseInt(newValue.$M + 1) + "-" + newValue.$D);
            }}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
        <TextField
          className="input"
          select
          required
          label="Konto"
          InputLabelProps={{ shrink: true }}
          value={billId}
          onChange={(e) => setBillId(e.target.value)}>
          <MenuItem value={0}>Wybierz konto</MenuItem>
          <MenuItem value={1}>Konto 1</MenuItem>
          <MenuItem value={2}>Konto 2</MenuItem>
          <MenuItem value={3}>Konto 3</MenuItem>
        </TextField>
        <Autocomplete
          className="input"
          options={categoryList}
          freeSolo
          getOptionLabel={(option) => option.nazwa}
          onChange={(e, value) => (value ? setCategoryId(value.id) : setCategoryId(""))}
          renderInput={(params) => <TextField {...params} label="Kategoria" />}
        />
        <Button variant="contained" type="submit" color="success">
          Dodaj przychód
        </Button>
      </form>
    </>
  );
}
