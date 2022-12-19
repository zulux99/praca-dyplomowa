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
import { GetAllBills } from "../bills/GetAllBills";
import { GetAllCategories } from "../categories/GetAllCategoriesRequest";
import { toast, ToastContainer } from "react-toastify";
import { AddTransaction } from "../transactions/AddTransactionRequest";
import IconButton from "@mui/material/IconButton";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import AddCategoryForm from "../categories/AddCategoryForm";
import Box from "@mui/material/Box";

export default function AddIncomeForm() {
  const user = useContext(AuthContext);
  const [bills, setBills] = useState([]);
  const [billId, setBillId] = useState("");
  const [category, setCategory] = useState(null);
  const [categoryList, setCategoryList] = useState([]);
  const [description, setDescription] = useState("");
  const [paymentDate, setPaymentDate] = useState(new Date().toISOString().slice(0, 10));
  const [paymentValue, setPaymentValue] = useState(0);
  const [paymentValueValid, setPaymentValueValid] = useState(true);
  const [inputValue, setInputValue] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    GetAllBills(user).then((response) => {
      if (response === -1) {
        toast.error("Nie udało się pobrać listy rachunków");
      } else {
        setBills(response);
        const defaultBill = response.find((bill) => bill.domyslne === true);
        setBillId(defaultBill.id);
      }
    });
    GetAllCategories(user).then((response) => {
      if (response === -1) {
        toast.error("Nie udało się pobrać listy kategorii");
      } else {
        setCategoryList(
          response.filter((category) => category.przychod === true).sort((a, b) => (a.nazwa > b.nazwa ? 1 : -1))
        );
      }
    });
  }, [user]);

  useEffect(() => {
    const validAmount = new RegExp("^\\$?(([1-9](\\d*|\\d{0,2}(,\\d{3})*))|0)(\\.\\d{1,2})?$");
    validAmount.test(paymentValue) ? setPaymentValueValid(true) : setPaymentValueValid(false);
    if (paymentValue === "") {
      setPaymentValueValid(true);
    }
  }, [paymentValue]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (paymentValueValid) {
      AddTransaction(user, paymentValue, paymentDate, billId, category.id, true, description).then((response) => {
        if (response === -1) {
          toast.error("Nie udało się dodać przychodu");
        } else {
          toast.success("Dodano przychód");
          e.target.reset();
          setInputValue("");
          setCategory(null);
          setDescription("");
        }
      });
    } else {
      toast.error("Niepoprawna kwota");
    }
  };

  const closeModalAddCategory = () => {
    setOpen(false);
  };

  return (
    <>
      <ToastContainer position="bottom-center" autoClose={2000} />
      {/* <div>{`categoryID: ${category !== null ? `'${category.id}'` : "null"}`}</div>
      <div>{`categoryName: ${category !== null ? `'${category.nazwa}'` : "null"}`}</div>
      <div>{`inputValue: '${inputValue}'`}</div> */}
      <form onSubmit={handleSubmit}>
        <TextField
          autoComplete="off"
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
            label="Data"
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
          {bills.map((bill) => (
            <MenuItem key={bill.id} value={bill.id}>
              {bill.nazwa}
            </MenuItem>
          ))}
        </TextField>
        <Box
          sx={{
            display: "flex",
          }}>
          <Autocomplete
            className="input"
            options={categoryList}
            disablePortal
            autoHighlight
            clearOnBlur
            freeSolo
            getOptionLabel={(option) => option.nazwa}
            value={category}
            onChange={(e, newValue) => setCategory(newValue)}
            inputValue={inputValue}
            onInputChange={(e, newInputValue) => setInputValue(newInputValue)}
            renderInput={(params) => <TextField {...params} label="Kategoria" />}
            sx={{
              width: "100%",
            }}
          />
          <IconButton onClick={() => setOpen(true)}>
            <AddCircleOutlineIcon
              style={{
                fontSize: "2rem",
              }}
            />
          </IconButton>
        </Box>
        <TextField
          className="input"
          label="Opis"
          multiline
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          helperText={`${description.length}/500`}
          inputProps={{ maxLength: 500 }}
        />
        <Button variant="contained" type="submit" color="success">
          Dodaj przychód
        </Button>
      </form>
      <Modal className="modal" open={open} onClose={closeModalAddCategory} aria-labelledby="Dodaj kategorię">
        <Fade in={open}>
          <Box className="modal-box">
            <AddCategoryForm
              user={user}
              categoryList={categoryList}
              setCategoryList={setCategoryList}
              isIncome={true}
              open={open}
              setOpen={setOpen}
            />
          </Box>
        </Fade>
      </Modal>
    </>
  );
}
