import { useContext, useState, useEffect } from 'react';
import AuthContext from '../../context/AuthContext';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import { ToastContainer, toast } from 'react-toastify';
import AddDebt from './AddDebt';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import InputAdornment from '@mui/material/InputAdornment';
import Box from '@mui/material/Box';

function debts() {
  const user = useContext(AuthContext);
  const user_id = user.user.user_id;
  const [open, setOpen] = useState(false);
  const [debts, setDebts] = useState([]);
  const [payments, setPayments] = useState([]);
  const [paymentValue, setPaymentValue] = useState('');
  const [paymentValueValid, setPaymentValueValid] = useState(true);
  const [paymentDate, setPaymentDate] = useState(new Date().toISOString().slice(0, 10));
  const validAmount = new RegExp('^\\$?(([1-9](\\d*|\\d{0,2}(,\\d{3})*))|0)(\\.\\d{1,2})?$');

  useEffect(() => {
    getDebts();
    getPayments();
    return () => {
      setDebts([]);
    };
  }, []);

  useEffect(() => {
    validAmount.test(paymentValue) ? setPaymentValueValid(true) : setPaymentValueValid(false);
  }, [paymentValue]);

  const getDebts = async () => {
    try {
      const response = await axios.get(`/api/debts`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.authTokens.access}`
        }
      });
      setDebts(response.data);
      console.log(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const getPayments = async () => {
    try {
      const response = await axios.get(`/api/debts/payments`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.authTokens.access}`
        }
      });
      setPayments(response.data);
      console.log(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const addPayment = async (e, debt_id) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        '/api/debts/payments',
        JSON.stringify({
          user: user_id,
          dlug: debt_id,
          kwota: paymentValue,
          data_splaty: paymentDate
        }),
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${user.authTokens.access}`
          }
        }
      );
      console.log(response.data);
      e.target.reset();
      setPaymentValue('');
      getPayments();
      toast.success('Dodano wpłatę');
    } catch (err) {
      toast.error(err.response.data.non_field_errors[0]);
      // console.log(err.response.data);
      // toast.error('Wystąpił błąd');
    }
  };

  const getTotalPayments = (debt) => {
    return payments
      .filter((payment) => payment.dlug === debt.id)
      .reduce((acc, payment) => acc + parseFloat(payment.kwota), 0)
      .toFixed(2);
  };

  const openModal = () => setOpen(true);
  const closeModal = () => setOpen(false);

  return (
    <>
      <ToastContainer position="bottom-center" autoClose={2000} />
      <Button variant="contained" onClick={openModal}>
        Dodaj dłużnika
      </Button>
      <AddDebt open={open} closeModal={closeModal} getDebts={getDebts} />
      <Container>
        <h1>Lista długów</h1>
        <Box className="dlugi">
          {debts.map((debt) => (
            <div key={debt.id} className="dlug">
              <ul key={debt.id}>
                <li className="nazwa_dluznika">{debt.nazwa_dluznika}</li>
                <li className="cel">{debt.cel}</li>
                <li className="kwota_do_splaty">
                  {debt.splacony ? debt.kwota_do_splaty : getTotalPayments(debt)}
                  &nbsp;/&nbsp;{debt.kwota_do_splaty}
                </li>
                {debt.splacony && <li className="splacony">Splacony</li>}
              </ul>
              <div className="splaty">
                {payments
                  .filter((payment) => payment.dlug === debt.id)
                  .map((payment) => (
                    <ul className="splata" key={payment.id}>
                      <li className="kwota">{payment.kwota}</li>
                      <li className="data_splaty">{payment.data_splaty}</li>
                    </ul>
                  ))}
              </div>
              <form onSubmit={(e) => addPayment(e, debt.id)}>
                <TextField
                  type="number"
                  className="input"
                  id="kwota"
                  required
                  label="Kwota wpłaty"
                  error={!paymentValueValid}
                  onChange={(e) => setPaymentValue(e.target.value)}
                  InputProps={{
                    inputProps: {
                      // max: 100,
                      inputMode: 'numeric'
                    },
                    endAdornment: <InputAdornment position="end">PLN</InputAdornment>
                  }}
                />
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="Basic example"
                    className="input"
                    inputFormat="DD/MM/YYYY"
                    value={paymentDate}
                    onChange={(newValue) => {
                      setPaymentDate(
                        newValue.$y + '-' + parseInt(newValue.$M + 1) + '-' + newValue.$D
                      );
                    }}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>
                <Button variant="contained" type="submit">
                  Dodaj wpłatę
                </Button>
              </form>
            </div>
          ))}
        </Box>
      </Container>
    </>
  );
}

export default debts;
