import { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import AuthContext from '../../context/AuthContext';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import { ToastContainer, toast } from 'react-toastify';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { FormControlLabel } from '@mui/material';

function AddPayment(props) {
  const user = useContext(AuthContext);
  const user_id = user.user.user_id;
  const [paymentValue, setPaymentValue] = useState('');
  const [paymentDate, setPaymentDate] = useState(new Date().toISOString().slice(0, 10));
  const [fullPayment, setFullPayment] = useState(false);
  const [paymentValueValid, setPaymentValueValid] = useState(true);
  const validAmount = new RegExp('^\\$?(([1-9](\\d*|\\d{0,2}(,\\d{3})*))|0)(\\.\\d{1,2})?$');

  useEffect(() => {
    validAmount.test(paymentValue) ? setPaymentValueValid(true) : setPaymentValueValid(false);
    paymentValue === '' ? setPaymentValueValid(true) : null;
  }, [paymentValue]);

  const getValueLeftToPay = (debt_id) => {
    const payments = props.payments.filter((payment) => payment.dlug === debt_id);
    const paymentsSum = payments.reduce((acc, payment) => acc + parseFloat(payment.kwota), 0);
    const debt = props.debts.filter((debt) => debt.id === debt_id);
    const debtValue = debt[0].kwota_do_splaty;
    console.log(debtValue - paymentsSum);
    return debtValue - paymentsSum;
  };

  const addPayment = async (e, debt_id) => {
    e.preventDefault();
    console.log('user: ' + user_id);
    console.log('dlug: ' + debt_id);
    console.log('kwota: ' + paymentValue);
    console.log('data_splaty: ' + paymentDate);
    console.log('fullPayment: ' + fullPayment);
    // try {
    //   const response = await axios.post(
    //     '/api/debts/payments',
    //     JSON.stringify({
    //       user: user_id,
    //       dlug: debt_id,
    //       kwota: paymentValue,
    //       data_splaty: paymentDate
    //     }),
    //     {
    //       headers: {
    //         'Content-Type': 'application/json',
    //         Authorization: `Bearer ${user.authTokens.access}`
    //       }
    //     }
    //   );
    //   console.log(response.data);
    //   e.target.reset();
    //   setPaymentValue('');
    //   props.getPayments();
    //   props.closeModal();
    //   toast.success('Dodano wpłatę');
    // } catch (err) {
    //   toast.error(err.response.data.non_field_errors[0]);
    // }
  };

  const handleChange = () => {
    if (!fullPayment) {
      setPaymentValue(getValueLeftToPay(props.debtId));
      setFullPayment(true);
    } else {
      setPaymentValue('');
      setFullPayment(false);
    }
  };

  return (
    <>
      <ToastContainer position="bottom-center" autoClose={2000} />
      <Modal
        className="modal"
        open={props.open}
        onClose={() => {
          props.closeModal();
          setPaymentValue('');
          setFullPayment(false);
        }}>
        <Fade in={props.open}>
          <Box className="modal-box">
            <form onSubmit={(e) => addPayment(e, props.debtId)}>
              <TextField
                type="number"
                className="input"
                required
                disabled={fullPayment}
                label="Kwota wpłaty"
                error={!paymentValueValid}
                value={paymentValue}
                onChange={(e) => setPaymentValue(e.target.value)}
                InputProps={{
                  inputProps: {
                    inputMode: 'numeric'
                  },
                  endAdornment: <InputAdornment position="end">PLN</InputAdornment>
                }}
              />
              <FormControlLabel
                control={<Checkbox checked={fullPayment} onChange={() => handleChange()} />}
                label="Pełna kwota"
              />
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Data spłaty"
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
          </Box>
        </Fade>
      </Modal>
    </>
  );
}

export default AddPayment;
