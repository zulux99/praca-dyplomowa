import { useState, useEffect, useContext } from "react";
import AuthContext from "../../context/AuthContext";
import TextField from "@mui/material/TextField";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Autocomplete from "@mui/material/Autocomplete";
import { toast } from "react-toastify";
import { AddTransaction } from "../transactions/AddTransactionRequest";
import IconButton from "@mui/material/IconButton";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import AddCategoryForm from "../categories/AddCategoryForm";
import Box from "@mui/material/Box";

export default function AddExpenseForm(props) {
  const user = useContext(AuthContext);
  const [category, setCategory] = useState(null);
  const [description, setDescription] = useState("");
  const [paymentDate, setPaymentDate] = useState(new Date().toISOString().slice(0, 10));
  const [paymentValue, setPaymentValue] = useState(0);
  const [paymentValueValid, setPaymentValueValid] = useState(true);
  const [inputValue, setInputValue] = useState("");
  const [open, setOpen] = useState(false);

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
      AddTransaction(user, paymentValue, paymentDate, props.billId, category.id, false, description).then(
        (response) => {
          if (response === -1) {
            toast.error("Nie udało się dodać wydatku");
          } else {
            props.setTransactions((prevTransactions) => {
              const newTransactions = [...prevTransactions, response];
              newTransactions.sort((a, b) => (a.data > b.data ? -1 : 1));
              return newTransactions;
            });
            toast.success("Dodano wydatek");
            e.target.reset();
            setInputValue("");
            setCategory(null);
            setDescription("");
            props.closeModalAddTransaction();
          }
        }
      );
    } else {
      toast.error("Niepoprawna kwota");
    }
  };

  const closeModalAddCategory = () => {
    setOpen(false);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <h2>Dodaj wydatek</h2>
        <TextField
          className="input"
          autoComplete="off"
          variant="outlined"
          label="Kwota"
          color="success"
          required
          onChange={(e) => setPaymentValue(e.target.value)}
          error={!paymentValueValid}
          InputProps={{
            inputProps: {
              inputMode: "numeric",
            },
          }}
        />
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pl">
          <DatePicker
            label="Data"
            className="input"
            inputFormat="DD/MM/YYYY"
            value={paymentDate}
            onChange={(newValue) => {
              setPaymentDate(newValue.$y + "-" + parseInt(newValue.$M + 1) + "-" + newValue.$D);
            }}
            renderInput={(params) => <TextField color="success" {...params} />}
          />
        </LocalizationProvider>
        <TextField
          className="input"
          select
          required
          color="success"
          label="Konto"
          InputLabelProps={{ shrink: true }}
          value={props.billId}
          onChange={(e) => props.setBillId(e.target.value)}>
          {props.bills.map((bill) => (
            <MenuItem key={bill.id} value={bill.id}>
              {bill.nazwa}
            </MenuItem>
          ))}
        </TextField>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            width: "100%",
            marginLeft: "16px",
            marginRight: "16px",
          }}>
          <Autocomplete
            options={props.categoryList}
            disablePortal
            autoHighlight
            clearOnBlur
            freeSolo
            getOptionLabel={(option) => option.nazwa}
            value={category}
            onChange={(e, newValue) => setCategory(newValue)}
            inputValue={inputValue}
            onInputChange={(e, newInputValue) => setInputValue(newInputValue)}
            renderInput={(params) => <TextField color="success" {...params} label="Kategoria" />}
            sx={{
              width: "calc(100% - 80px)",
            }}
          />
          <IconButton onClick={() => setOpen(true)}>
            <AddCircleOutlineIcon
              style={{
                fontSize: "32px",
              }}
            />
          </IconButton>
        </Box>
        <TextField
          className="input"
          label="Opis"
          multiline
          autoComplete="off"
          color="success"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          helperText={`${description.length}/500`}
          inputProps={{ maxLength: 500 }}
        />
        <Button variant="contained" type="submit" color="success" size="large">
          Dodaj wydatek
        </Button>
      </form>
      <Modal className="modal" open={open} onClose={closeModalAddCategory} aria-labelledby="Dodaj kategorię">
        <Fade in={open}>
          <Box className="modal-box">
            <AddCategoryForm
              user={user}
              categoryList={props.categoryList}
              setCategoryList={props.setCategoryList}
              isIncome={false}
              open={open}
              setOpen={setOpen}
            />
          </Box>
        </Fade>
      </Modal>
    </>
  );
}
